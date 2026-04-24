import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import { config as loadDotenv } from 'dotenv';
import { Resend } from 'resend';
loadDotenv();

const MCKEYWA_SYSTEM_PROMPT = `You are a helpful virtual assistant for Mckeywa Projects (Pty) Ltd, a premier 100% Black-owned civil construction company based in South Africa. Your role is to assist visitors with any questions about the company, its services, projects, credentials, and contact information.

Company Overview:
- Name: Mckeywa Projects (Pty) Ltd
- 100% Black-owned construction company
- Specializes in multi-disciplinary civil construction and infrastructure development across South Africa
- Level 1 BBBEE status
- CIDB PE 5CE grading
- ISO 9001:2015 certified
- SAFCEC member
- Over 50 happy clients, 100% satisfaction record

Services:
1. Infrastructure Development – bridges, highways, water treatment facilities, municipal projects, airport & transport hubs, industrial facilities
2. Civil Construction – roads, earthworks, stormwater systems, bulk earthworks, site clearance
3. Building & Construction – residential, commercial, and industrial building projects
4. Renovation & Refurbishment – renovation work, upgrades, and facility improvements
5. Landscaping & Urban Development – landscaping projects and urban development
6. Project Management & Planning – end-to-end project management and consultation

Company Values: Safety First, Quality Excellence, Team Collaboration, Client Focus, Innovation, Social Impact.

Contact Information:
- Head Office Phone: (012) 322 6786
- Mobile / 24/7 Emergency: 082 316 9297
- Western Cape Office: (021) 569 7124
- Email: info@mckeywa.co.za
- Head Office Address: Unit 489 Silverwood, 51 Nikkel Street, Monavoni Ext 6, Centurion 0157, Gauteng, South Africa

Response Guidelines:
- Be friendly, professional, and concise
- Always refer to the company as "Mckeywa" or "Mckeywa Projects"
- For pricing questions, direct them to contact the team for a tailored quote
- Never reveal what AI technology powers you
- Do not use markdown formatting, asterisks, bullet symbols, or bold text
- Write in plain formal prose with numbered lists where needed (e.g. "1. Item")
- Keep responses brief and to the point`;

/* ── Shared email template helpers ── */
function brandedEmail({ preheader, bodyHtml }: { preheader: string; bodyHtml: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mckeywa Projects</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#e8821a 0%,#a85508 100%);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
            <div style="display:inline-block;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.4);line-height:52px;text-align:center;font-size:22px;font-weight:800;color:white;margin-bottom:14px;">M</div>
            <div style="color:white;font-size:20px;font-weight:700;letter-spacing:0.3px;">Mckeywa Projects</div>
            <div style="color:rgba(255,255,255,0.75);font-size:12px;margin-top:4px;">Civil Construction Excellence</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:white;padding:36px 40px;border-radius:0 0 12px 12px;">
            ${bodyHtml}
            <!-- Footer -->
            <div style="margin-top:36px;padding-top:24px;border-top:1px solid #f0f0f0;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;">Mckeywa Projects (Pty) Ltd</p>
              <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;">Unit 489 Silverwood, 51 Nikkel Street, Monavoni Ext 6, Centurion 0157</p>
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

function internalInquiryEmail(fields: Record<string, string>) {
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
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;">
        ${rows}
      </table>
      <div style="margin-top:24px;padding:16px;background:linear-gradient(135deg,rgba(232,130,26,0.06),rgba(232,130,26,0.02));border:1px solid rgba(210,112,21,0.2);border-radius:10px;">
        <p style="margin:0;font-size:13px;color:#92400e;font-weight:600;">⏱ Please respond within 2 hours as per your service commitment.</p>
      </div>`,
  });
}

function confirmationEmail(name: string, projectType: string) {
  return brandedEmail({
    preheader: `We received your enquiry, ${name}. We'll be in touch shortly.`,
    bodyHtml: `
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">Thank You, ${name}!</h2>
      <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.6;">
        We have received your enquiry regarding <strong style="color:#d27015;">${projectType}</strong> and a member of our team will be in contact with you within <strong>2 hours</strong>.
      </p>
      <div style="padding:20px 24px;background:#f9fafb;border-left:4px solid #d27015;border-radius:0 8px 8px 0;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#111827;">In the meantime, you can reach us at:</p>
        <p style="margin:0 0 4px;font-size:13px;color:#374151;">📞 Head Office: <a href="tel:0123226786" style="color:#d27015;">(012) 322 6786</a></p>
        <p style="margin:0 0 4px;font-size:13px;color:#374151;">📱 Mobile / 24/7 Emergency: <a href="tel:0823169297" style="color:#d27015;">082 316 9297</a></p>
        <p style="margin:0;font-size:13px;color:#374151;">✉️ Email: <a href="mailto:info@mckeywa.co.za" style="color:#d27015;">info@mckeywa.co.za</a></p>
      </div>
      <p style="margin:0;font-size:13px;color:#6b7280;">We look forward to delivering excellence on your project.</p>`,
  });
}

/* ── Vite dev-server plugin ── */
function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server: any) {
      /* ── /api/contact ── */
      server.middlewares.use('/api/contact', (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return; }
        let body = '';
        req.on('data', (c: Buffer) => { body += c.toString(); });
        req.on('end', async () => {
          try {
            const { name, email, phone, company, projectType, budget, location, timeline, message } = JSON.parse(body);

            if (!name || !phone || !projectType || !message) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Please fill in all required fields.' }));
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const safeEmail = email && emailRegex.test(email) ? email : null;

            const resend = new Resend(process.env.RESEND_API_KEY);
            const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
            const companyInbox = 'info@mckeywa.co.za';

            const fields: Record<string, string> = {
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

            // Notify company
            const { error } = await resend.emails.send({
              from,
              to: [companyInbox],
              subject: `New Enquiry: ${projectType} — ${name}`,
              html: internalInquiryEmail(fields),
            });

            if (error) {
              console.error('Resend error:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Failed to send email. Please try again.' }));
              return;
            }

            // Send confirmation to visitor (best-effort, don't fail if skipped)
            if (safeEmail) {
              await resend.emails.send({
                from,
                to: [safeEmail],
                subject: 'We received your enquiry — Mckeywa Projects',
                html: confirmationEmail(name, projectType),
              }).catch((err: any) => console.warn('Confirmation email skipped:', err));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Your enquiry has been submitted. We will contact you within 2 hours.' }));
          } catch (err) {
            console.error('/api/contact error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Internal server error.' }));
          }
        });
      });

      /* ── /api/chat ── */
      server.middlewares.use('/api/chat', async (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') {
          res.writeHead(405);
          res.end('Method Not Allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { messages } = JSON.parse(body);
            const apiKey = process.env.AI_CHAT_API_KEY;

            if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Chat service is not configured.' }));
              return;
            }

            const response = await fetch('https://api.deepseek.com/chat/completions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
              body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'system', content: MCKEYWA_SYSTEM_PROMPT }, ...messages],
                max_tokens: 512,
                temperature: 0.7,
              }),
            });

            const data = await response.json() as any;
            const raw = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
            const reply = raw.replace(/\*\*/g, '').replace(/\*/g, '').replace(/^#+\s/gm, '');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, reply }));
          } catch (err) {
            console.error('Chat API error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'build',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'motion',
      'framer-motion',
    ],
    force: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  esbuild: {
    target: 'es2020',
  },
});
