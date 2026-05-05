'use strict';

const MAX_CLIENT_MESSAGE = 280;

function trimForClient(s) {
  const t = String(s ?? '').trim();
  if (t.length <= MAX_CLIENT_MESSAGE) return t;
  return `${t.slice(0, MAX_CLIENT_MESSAGE - 1)}…`;
}

function extractContentParts(content) {
  if (content == null) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object') {
          if (typeof part.text === 'string') return part.text;
          if (part.type === 'text' && typeof part.text === 'string') return part.text;
        }
        return '';
      })
      .join('');
  }
  return String(content);
}

function stripMarkdownLite(raw) {
  return raw.replace(/\*\*/g, '').replace(/\*/g, '').replace(/^#+\s/gm, '');
}

function topLevelApiError(data) {
  if (!data || typeof data !== 'object') return null;
  const err = data.error;
  if (!err || typeof err !== 'object') return null;
  const msg = err.message || err.code || err.type || 'DeepSeek API error';
  return typeof msg === 'string' ? msg : String(msg);
}

/**
 * @returns {{ ok: true, reply: string } | { ok: false, message: string }}
 */
function extractAssistantReply(data) {
  const apiErr = topLevelApiError(data);
  if (apiErr) {
    return { ok: false, message: trimForClient(apiErr) };
  }
  const choices = data?.choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    return {
      ok: false,
      message:
        'No reply from the assistant. Check your API key, account balance, and model name.',
    };
  }
  const choice = choices[0];
  const finish = choice?.finish_reason;
  const raw = extractContentParts(choice?.message?.content);
  const trimmed = typeof raw === 'string' ? raw.trim() : '';
  if (!trimmed) {
    return {
      ok: false,
      message: `Assistant returned no text${finish != null ? ` (finish_reason: ${finish})` : ''}.`,
    };
  }
  return { ok: true, reply: stripMarkdownLite(trimmed) };
}

/**
 * @param {string} bodyText
 */
function parseDeepSeekHttpError(bodyText) {
  const raw = String(bodyText ?? '').trim();
  if (!raw) return 'Request to the assistant service was rejected.';
  try {
    const j = JSON.parse(raw);
    const top = topLevelApiError(j);
    if (top) return trimForClient(top);
    if (j && typeof j.message === 'string') return trimForClient(j.message);
  } catch (_) {
    /* plain text body */
  }
  return trimForClient(raw);
}

module.exports = {
  extractAssistantReply,
  parseDeepSeekHttpError,
};
