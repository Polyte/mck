const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { name, email, phone, company, projectType, budget, location, timeline, message } = req.body;

    if (!name || !phone || !projectType || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const safeEmail = email && emailRegex.test(email) ? email : null;

    const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const companyInbox = process.env.COMPANY_EMAIL || 'info@mckeywa.co.za';

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

    const { error } = await resend.emails.send({
      from,
      to: [companyInbox],
      subject: `New Enquiry: ${projectType} — ${name}`,
      html: internalInquiryEmail(fields),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
    }

    if (safeEmail) {
      await resend.emails.send({
        from,
        to: [safeEmail],
        subject: 'We received your enquiry — Mckeywa Projects',
        html: confirmationEmail(name, projectType),
      }).catch((err) => console.warn('Confirmation email skipped:', err));
    }

    res.status(200).json({ success: true, message: 'Your enquiry has been submitted. We will contact you within 2 hours.' });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── /api/chat ────────────────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, message: 'Invalid messages format' });
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

    if (!response.ok) {
      return res.status(500).json({ success: false, message: 'Failed to get a response. Please try again.' });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    const reply = raw.replace(/\*\*/g, '').replace(/\*/g, '').replace(/^#+\s/gm, '');

    res.json({ success: true, reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ── Health check ─────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
