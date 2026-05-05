const { extractAssistantReply, parseDeepSeekHttpError } = require('../../lib/deepseekChatResponse.cjs');

const SYSTEM_PROMPT = `You are a helpful virtual assistant for Mckeywa Projects (Pty) Ltd, a premier 100% Black-owned civil construction company based in South Africa. Your role is to assist visitors with any questions about the company, its services, projects, credentials, and contact information.

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
- Write in plain formal prose with numbered lists where needed
- Keep responses brief and to the point`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body || '{}');
    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Invalid messages format' }),
      };
    }

    const apiKey = process.env.AI_CHAT_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Chat service is not configured.' }),
      };
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
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
        return {
          statusCode: 500,
          body: JSON.stringify({ success: false, message: parseDeepSeekHttpError(bodyText) }),
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Invalid JSON from assistant service.' }),
      };
    }

    if (!response.ok) {
      console.error('DeepSeek HTTP', response.status, bodyText.slice(0, 500));
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: parseDeepSeekHttpError(bodyText) }),
      };
    }

    const extracted = extractAssistantReply(data);
    if (!extracted.ok) {
      console.error('DeepSeek completion:', extracted.message, bodyText.slice(0, 400));
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: extracted.message }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, reply: extracted.reply }),
    };
  } catch (err) {
    console.error('Chat function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Internal server error' }),
    };
  }
};
