const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { sendHtmlMail, getMailFrom } = require('./lib/contactMail.cjs');
const { loadJsonState, saveJsonState } = require('./lib/sqliteState.cjs');

const { extractAssistantReply, parseDeepSeekHttpError } = require('./lib/deepseekChatResponse.cjs');

const app = express();
const PORT = process.env.PORT || 3002;
/** Bind API only on loopback when paired with nginx in Docker (see docker-entrypoint.sh). */
const BIND_HOST = process.env.BIND_HOST || '0.0.0.0';
const DASHBOARD_DB_PATH = path.join(__dirname, 'data', 'dashboard.sqlite');
const DASHBOARD_STATE_KEY = 'dashboard_store';
const DASHBOARD_ADMIN_TOKEN = process.env.DASHBOARD_ADMIN_TOKEN || '';
const TAKEOVER_TIMEOUT_MINUTES = Number(process.env.TAKEOVER_TIMEOUT_MINUTES || 15);
const CHAT_RETENTION_DAYS = Number(process.env.CHAT_RETENTION_DAYS || 30);

app.use(cors());
app.use(express.json());

function defaultDashboardStore() {
  return {
    totals: {
      enquiries: 0,
      chatbotLeads: 0,
      websiteLeads: 0,
      chatSessions: 0,
      chatMessages: 0,
      chatbotContactCaptures: 0,
    },
    enquiries: [],
    chatbotContacts: [],
    chatActivity: [],
    conversations: [],
    liveSessions: {},
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

function readDashboardStore() {
  const parsed = loadJsonState(DASHBOARD_DB_PATH, DASHBOARD_STATE_KEY, defaultDashboardStore);
  return {
    ...defaultDashboardStore(),
    ...parsed,
    totals: { ...defaultDashboardStore().totals, ...(parsed.totals || {}) },
    enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
    chatbotContacts: Array.isArray(parsed.chatbotContacts) ? parsed.chatbotContacts : [],
    chatActivity: Array.isArray(parsed.chatActivity) ? parsed.chatActivity : [],
    conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [],
    liveSessions: parsed.liveSessions && typeof parsed.liveSessions === 'object' ? parsed.liveSessions : {},
  };
}

function writeDashboardStore(store) {
  const retentionCutoff = Date.now() - CHAT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const withRetention = {
    ...store,
    conversations: (Array.isArray(store.conversations) ? store.conversations : []).filter((entry) => {
      const ts = new Date(entry.createdAt || 0).getTime();
      return Number.isFinite(ts) && ts >= retentionCutoff;
    }),
    liveSessions: Object.fromEntries(
      Object.entries(store.liveSessions || {}).map(([sessionId, session]) => {
        const adminMessages = (Array.isArray(session.adminMessages) ? session.adminMessages : []).filter((msg) => {
          const ts = new Date(msg.createdAt || 0).getTime();
          return Number.isFinite(ts) && ts >= retentionCutoff;
        });
        return [sessionId, { ...session, adminMessages }];
      }),
    ),
  };

  const updated = {
    ...withRetention,
    meta: {
      ...(withRetention.meta || {}),
      updatedAt: new Date().toISOString(),
    },
  };
  saveJsonState(DASHBOARD_DB_PATH, DASHBOARD_STATE_KEY, updated);
}

function recordEnquiry({
  source,
  name,
  email,
  phone,
  company,
  projectType,
  budget,
  location,
  timeline,
  message,
}) {
  const safeSource = source === 'chatbot' ? 'chatbot' : 'website-form';
  const store = readDashboardStore();
  const enquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    source: safeSource,
    name: name || '',
    email: email || '',
    phone: phone || '',
    company: company || '',
    projectType: projectType || '',
    budget: budget || '',
    location: location || '',
    timeline: timeline || '',
    message: message || '',
    createdAt: new Date().toISOString(),
  };

  store.enquiries.unshift(enquiry);
  store.enquiries = store.enquiries.slice(0, 500);
  store.totals.enquiries += 1;
  if (safeSource === 'chatbot') store.totals.chatbotLeads += 1;
  if (safeSource === 'website-form') store.totals.websiteLeads += 1;

  writeDashboardStore(store);
}

function extractContactFromText(text) {
  if (!text || typeof text !== 'string') return null;
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi);
  const phoneMatch = text.match(/(?:\+?\d[\d\s()-]{7,}\d)/g);
  const emails = (emailMatch || []).map((entry) => entry.trim());
  const phones = (phoneMatch || [])
    .map((entry) => entry.trim())
    .filter((entry) => entry.replace(/[^\d]/g, '').length >= 9);

  if (emails.length === 0 && phones.length === 0) return null;
  return { emails, phones };
}

function recordChatActivity(messages, replyOk, options = {}) {
  const store = readDashboardStore();
  const userMessages = messages.filter((m) => m && m.role === 'user' && typeof m.content === 'string');
  const latestUserMessage = userMessages[userMessages.length - 1] || null;
  const sessionId = typeof options.sessionId === 'string' && options.sessionId.trim()
    ? options.sessionId.trim()
    : 'anonymous';
  const assistantReply = typeof options.assistantReply === 'string' ? options.assistantReply : '';

  store.totals.chatSessions += 1;
  store.totals.chatMessages += latestUserMessage ? 1 : 0;
  store.chatActivity.unshift({
    id: `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    sessionId,
    userMessageCount: latestUserMessage ? 1 : 0,
    success: Boolean(replyOk),
    createdAt: new Date().toISOString(),
  });
  store.chatActivity = store.chatActivity.slice(0, 1000);

  if (latestUserMessage) {
    store.conversations.unshift({
      id: `conv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      sessionId,
      userMessage: latestUserMessage.content,
      assistantReply,
      success: Boolean(replyOk),
      createdAt: new Date().toISOString(),
    });
  }
  store.conversations = store.conversations.slice(0, 2000);

  userMessages.forEach((msg) => {
    const extracted = extractContactFromText(msg.content);
    if (!extracted) return;
    store.totals.chatbotContactCaptures += 1;
    store.chatbotContacts.unshift({
      id: `cbc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      message: msg.content.slice(0, 240),
      emails: extracted.emails,
      phones: extracted.phones,
      createdAt: new Date().toISOString(),
    });
  });
  store.chatbotContacts = store.chatbotContacts.slice(0, 500);

  writeDashboardStore(store);
}

function buildDashboardPayload() {
  const store = readDashboardStore();
  const recentEnquiries = store.enquiries.slice(0, 100);
  const recentChatbotContacts = store.chatbotContacts.slice(0, 100);
  const recentChatActivity = store.chatActivity.slice(0, 200);
  const recentConversations = store.conversations.slice(0, 500);
  const successfulSessions = recentChatActivity.filter((entry) => entry.success).length;
  const failedSessions = recentChatActivity.length - successfulSessions;
  const averageUserMessagesPerSession = recentChatActivity.length
    ? Number(
      (recentChatActivity.reduce((sum, entry) => sum + Number(entry.userMessageCount || 0), 0) / recentChatActivity.length).toFixed(2),
    )
    : 0;

  return {
    success: true,
    stats: {
      ...store.totals,
      successfulSessions,
      failedSessions,
      averageUserMessagesPerSession,
      lastUpdatedAt: store.meta.updatedAt,
    },
    leads: {
      total: store.totals.enquiries,
      chatbot: store.totals.chatbotLeads,
      websiteForm: store.totals.websiteLeads,
    },
    formEnquiries: recentEnquiries,
    chatbotContacts: recentChatbotContacts,
    chatActivity: recentChatActivity,
    conversations: recentConversations,
    liveSessions: store.liveSessions || {},
  };
}

function isAuthorizedDashboardRequest(req) {
  if (!DASHBOARD_ADMIN_TOKEN) return true;
  const token = req.headers['x-dashboard-token'];
  return typeof token === 'string' && token === DASHBOARD_ADMIN_TOKEN;
}

function ensureLiveSession(store, sessionId) {
  const safeId = sessionId && typeof sessionId === 'string' ? sessionId : 'anonymous';
  if (!store.liveSessions[safeId]) {
    store.liveSessions[safeId] = {
      takeoverActive: false,
      adminName: '',
      adminMessages: [],
      lastAdminActivityAt: '',
      updatedAt: new Date().toISOString(),
    };
  }
  const timeoutMs = TAKEOVER_TIMEOUT_MINUTES * 60 * 1000;
  const activityTs = new Date(store.liveSessions[safeId].lastAdminActivityAt || 0).getTime();
  if (
    store.liveSessions[safeId].takeoverActive &&
    Number.isFinite(activityTs) &&
    activityTs > 0 &&
    Date.now() - activityTs > timeoutMs
  ) {
    store.liveSessions[safeId].takeoverActive = false;
  }
  return { safeId, session: store.liveSessions[safeId] };
}

// ── Email template helpers ──────────────────────────────────────────────────

function brandedEmail({ preheader, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#e8821a 0%,#a85508 100%);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
            <div style="display:inline-block;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.4);line-height:52px;text-align:center;font-size:22px;font-weight:800;color:white;margin-bottom:14px;">M</div>
            <div style="color:white;font-size:20px;font-weight:700;">Mckeywa Projects</div>
            <div style="color:rgba(255,255,255,0.75);font-size:12px;margin-top:4px;">Civil Construction Excellence</div>
          </td>
        </tr>
        <tr>
          <td style="background:white;padding:36px 40px;border-radius:0 0 12px 12px;">
            ${bodyHtml}
            <div style="margin-top:36px;padding-top:24px;border-top:1px solid #f0f0f0;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;">Mckeywa Projects (Pty) Ltd &nbsp;|&nbsp; Unit 489 Silverwood, 51 Nikkel Street, Monavoni Ext 6, Centurion 0157</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                <a href="tel:0123226786" style="color:#d27015;text-decoration:none;">(012) 322 6786</a> &nbsp;|&nbsp;
                <a href="mailto:info@mckeywa.co.za" style="color:#d27015;text-decoration:none;">info@mckeywa.co.za</a>
              </p>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function internalInquiryEmail(fields) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `
      <tr>
        <td style="padding:8px 12px;background:#f9fafb;border:1px solid #f0f0f0;font-size:13px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">${k}</td>
        <td style="padding:8px 12px;border:1px solid #f0f0f0;font-size:13px;color:#111827;vertical-align:top;">${v}</td>
      </tr>`).join('');

  return brandedEmail({
    preheader: `New enquiry from ${fields['Name']}`,
    bodyHtml: `
      <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#111827;">New Project Enquiry</h2>
      <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">A visitor has submitted an enquiry via the Mckeywa website.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
      <div style="margin-top:24px;padding:16px;background:rgba(232,130,26,0.06);border:1px solid rgba(210,112,21,0.2);border-radius:10px;">
        <p style="margin:0;font-size:13px;color:#92400e;font-weight:600;">⏱ Please respond within 2 hours as per your service commitment.</p>
      </div>`,
  });
}

function confirmationEmail(name, projectType) {
  return brandedEmail({
    preheader: `We received your enquiry, ${name}. We'll be in touch shortly.`,
    bodyHtml: `
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">Thank You, ${name}!</h2>
      <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.6;">
        We have received your enquiry regarding <strong style="color:#d27015;">${projectType}</strong> and a member of our team will contact you within <strong>2 hours</strong>.
      </p>
      <div style="padding:20px 24px;background:#f9fafb;border-left:4px solid #d27015;border-radius:0 8px 8px 0;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#111827;">In the meantime, you can reach us at:</p>
        <p style="margin:0 0 4px;font-size:13px;color:#374151;">📞 Head Office: <a href="tel:0123226786" style="color:#d27015;">(012) 322 6786</a></p>
        <p style="margin:0 0 4px;font-size:13px;color:#374151;">📱 24/7 Emergency: <a href="tel:0823169297" style="color:#d27015;">082 316 9297</a></p>
        <p style="margin:0;font-size:13px;color:#374151;">✉️ <a href="mailto:info@mckeywa.co.za" style="color:#d27015;">info@mckeywa.co.za</a></p>
      </div>
      <p style="margin:0;font-size:13px;color:#6b7280;">We look forward to delivering excellence on your project.</p>`,
  });
}

// ── /api/contact ────────────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, projectType, budget, location, timeline, message, source } = req.body;

    if (!name || !phone || !projectType || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const safeEmail = email && emailRegex.test(email) ? email : null;

    // SMTP (Nodemailer): MAIL_FROM must be allowed by your mail provider. See .env.example.
    const from = getMailFrom();
    // Comma-separated for multiple inboxes (e.g. info@, ops@).
    const companyInbox = process.env.CONTACT_TO_EMAIL || 'info@mckeywa.co.za';
    const companyRecipients = Array.from(
      new Set(companyInbox.split(',').map((s) => s.trim()).filter(Boolean)),
    );

    const fields = {
      'Name': name,
      'Phone': phone,
      ...(safeEmail ? { 'Email': safeEmail } : {}),
      ...(company ? { 'Company': company } : {}),
      'Project Type': projectType,
      ...(budget ? { 'Budget': budget } : {}),
      ...(location ? { 'Location': location } : {}),
      ...(timeline ? { 'Timeline': timeline } : {}),
      'Message': message,
    };

    let sendResult;
    try {
      sendResult = await sendHtmlMail({
        from,
        to: companyRecipients,
        subject: 'Client Enquiry Received',
        html: internalInquiryEmail(fields),
      });
    } catch (err) {
      console.error('SMTP configuration error:', err);
      return res.status(500).json({ success: false, message: 'Email is not configured on the server.' });
    }

    if (sendResult.error) {
      console.error('SMTP send error:', sendResult.error);
      return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
    }

    if (safeEmail) {
      sendHtmlMail({
        from,
        to: safeEmail,
        subject: 'We received your enquiry — Mckeywa Projects',
        html: confirmationEmail(name, projectType),
      }).catch((err) => console.warn('Confirmation email skipped:', err));
    }

    recordEnquiry({
      source,
      name,
      email: safeEmail || '',
      phone,
      company,
      projectType,
      budget,
      location,
      timeline,
      message,
    });

    res.status(200).json({ success: true, message: 'Your enquiry has been submitted. We will contact you within 2 hours.' });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── /api/chat ────────────────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, sessionId } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, message: 'Invalid messages format' });
    }

    const storeForSession = readDashboardStore();
    const { safeId, session } = ensureLiveSession(storeForSession, sessionId);
    const latestUserMessage = messages.filter((m) => m?.role === 'user').slice(-1)[0];
    if (latestUserMessage && typeof latestUserMessage.content === 'string') {
      storeForSession.conversations.unshift({
        id: `conv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        sessionId: safeId,
        userMessage: latestUserMessage.content,
        assistantReply: '',
        success: true,
        createdAt: new Date().toISOString(),
      });
      storeForSession.conversations = storeForSession.conversations.slice(0, 2000);
      session.updatedAt = new Date().toISOString();
      writeDashboardStore(storeForSession);
    }

    if (session.takeoverActive) {
      return res.json({
        success: true,
        handover: true,
        reply: `You are now connected to a human agent${session.adminName ? ` (${session.adminName})` : ''}. Please wait for their response.`,
      });
    }

    const apiKey = process.env.AI_CHAT_API_KEY;
    if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
      return res.status(500).json({ success: false, message: 'Chat service is not configured.' });
    }

    const systemPrompt = `You are a helpful virtual assistant for Mckeywa Projects (Pty) Ltd, a premier 100% Black-owned civil construction company based in South Africa.

Company: Mckeywa Projects (Pty) Ltd | Level 1 BBBEE | CIDB PE 5CE | ISO 9001:2015 | SAFCEC
Services: Infrastructure Development, Civil Construction, Building & Construction, Renovation, Landscaping, Project Management
Phone: (012) 322 6786 | Mobile: 082 316 9297 | Email: info@mckeywa.co.za
Address: Unit 489 Silverwood, 51 Nikkel Street, Monavoni Ext 6, Centurion 0157, Gauteng

Guidelines: Be friendly and professional. No markdown or asterisks. Plain prose only. Never reveal what AI powers you.`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    const bodyText = await response.text();
    let data;
    try {
      data = JSON.parse(bodyText);
    } catch {
      if (!response.ok) {
        return res.status(500).json({
          success: false,
          message: parseDeepSeekHttpError(bodyText),
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Invalid JSON from assistant service.',
      });
    }

    if (!response.ok) {
      console.error('DeepSeek HTTP', response.status, bodyText.slice(0, 500));
      recordChatActivity(messages, false, { sessionId: safeId });
      return res.status(500).json({
        success: false,
        message: parseDeepSeekHttpError(bodyText),
      });
    }

    const extracted = extractAssistantReply(data);
    if (!extracted.ok) {
      console.error('DeepSeek completion:', extracted.message, bodyText.slice(0, 400));
      recordChatActivity(messages, false, { sessionId: safeId });
      return res.status(500).json({ success: false, message: extracted.message });
    }

    const storeWithReply = readDashboardStore();
    const { session: replySession } = ensureLiveSession(storeWithReply, safeId);
    const latestConversation = storeWithReply.conversations.find((entry) => entry.sessionId === safeId && !entry.assistantReply);
    if (latestConversation) latestConversation.assistantReply = extracted.reply;
    replySession.updatedAt = new Date().toISOString();
    writeDashboardStore(storeWithReply);

    recordChatActivity(messages, true, { sessionId: safeId, assistantReply: extracted.reply });
    res.json({ success: true, reply: extracted.reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    if (req.body && Array.isArray(req.body.messages)) {
      recordChatActivity(req.body.messages, false, { sessionId: req.body.sessionId });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/chat/session/:sessionId', (req, res) => {
  const store = readDashboardStore();
  const { safeId, session } = ensureLiveSession(store, req.params.sessionId);
  const conversations = store.conversations
    .filter((entry) => entry.sessionId === safeId)
    .slice(0, 30);
  res.json({
    success: true,
    sessionId: safeId,
    takeoverActive: Boolean(session.takeoverActive),
    adminName: session.adminName || '',
    adminMessages: Array.isArray(session.adminMessages) ? session.adminMessages : [],
    conversations,
  });
});

app.post('/api/dashboard/takeover', (req, res) => {
  if (!isAuthorizedDashboardRequest(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized dashboard action' });
  }
  const { sessionId, active, adminName } = req.body || {};
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ success: false, message: 'sessionId is required' });
  }
  const store = readDashboardStore();
  const { session } = ensureLiveSession(store, sessionId);
  session.takeoverActive = Boolean(active);
  session.adminName = adminName || session.adminName || 'Agent';
  session.lastAdminActivityAt = new Date().toISOString();
  session.updatedAt = new Date().toISOString();
  writeDashboardStore(store);
  return res.json({ success: true, sessionId, takeoverActive: session.takeoverActive });
});

app.post('/api/dashboard/reply', (req, res) => {
  if (!isAuthorizedDashboardRequest(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized dashboard action' });
  }
  const { sessionId, message, adminName } = req.body || {};
  if (!sessionId || typeof sessionId !== 'string' || !message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'sessionId and message are required' });
  }
  const store = readDashboardStore();
  const { session } = ensureLiveSession(store, sessionId);
  session.takeoverActive = true;
  session.adminName = adminName || session.adminName || 'Agent';
  session.lastAdminActivityAt = new Date().toISOString();
  session.adminMessages = Array.isArray(session.adminMessages) ? session.adminMessages : [];
  session.adminMessages.unshift({
    id: `adm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    message: message.trim(),
    adminName: session.adminName,
    createdAt: new Date().toISOString(),
  });
  session.adminMessages = session.adminMessages.slice(0, 100);
  session.updatedAt = new Date().toISOString();

  store.conversations.unshift({
    id: `conv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    sessionId,
    userMessage: '',
    assistantReply: message.trim(),
    success: true,
    byAdmin: true,
    adminName: session.adminName,
    createdAt: new Date().toISOString(),
  });
  store.conversations = store.conversations.slice(0, 2000);
  writeDashboardStore(store);
  return res.json({ success: true });
});

app.get('/api/dashboard', (req, res) => {
  res.json(buildDashboardPayload());
});

app.get('/api/dashboard/auth', (req, res) => {
  if (!isAuthorizedDashboardRequest(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized dashboard action' });
  }
  return res.json({ success: true });
});

// ── Health check ─────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, BIND_HOST, () => {
  console.log(`Server is running on http://${BIND_HOST}:${PORT}`);
});
