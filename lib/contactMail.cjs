/**
 * Contact form email delivery via SMTP (Nodemailer).
 * Configure SMTP_HOST, SMTP_USER, SMTP_PASS; optional SMTP_PORT (default 587), SMTP_SECURE.
 */
const nodemailer = require('nodemailer');

/** @type {import('nodemailer').Transporter | null} */
let cachedTransport = null;

function smtpPort() {
  const p = parseInt(process.env.SMTP_PORT || '587', 10);
  return Number.isFinite(p) && p > 0 ? p : 587;
}

function smtpSecure(port) {
  if (process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1') return true;
  if (process.env.SMTP_SECURE === 'false' || process.env.SMTP_SECURE === '0') return false;
  return port === 465;
}

function getTransport() {
  if (cachedTransport) return cachedTransport;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER ?? '';
  const pass = process.env.SMTP_PASS ?? '';

  if (!host || !user) {
    throw new Error('SMTP is not configured: set SMTP_HOST and SMTP_USER (and SMTP_PASS if required). See .env.example.');
  }

  const port = smtpPort();
  const secure = smtpSecure(port);

  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return cachedTransport;
}

/**
 * "From" header: MAIL_FROM, or legacy RESEND_FROM_EMAIL, or company default.
 */
function getMailFrom() {
  return (
    process.env.MAIL_FROM ||
    process.env.RESEND_FROM_EMAIL ||
    'Mckeywa Projects <info@mckeywa.co.za>'
  );
}

/**
 * @param {{ from: string; to: string | string[]; subject: string; html: string }} opts
 * @returns {Promise<{ error: Error | null }>}
 */
async function sendHtmlMail(opts) {
  try {
    const transport = getTransport();
    await transport.sendMail({
      from: opts.from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return { error: null };
  } catch (error) {
    return { error: /** @type {Error} */ (error) };
  }
}

module.exports = { sendHtmlMail, getMailFrom, getTransport };
