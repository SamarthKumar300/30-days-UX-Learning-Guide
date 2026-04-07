const { retrieveRelevantChunks } = require('../_lib/content');
const {
  chatRateMap,
  enforceRateLimit,
  getBearerToken,
  getClientKey,
  getEnv,
  readJsonBody,
  sendJson,
  verifyAccessToken,
} = require('../_lib/security');

async function callGemini(message, context, chunks, history) {
  const apiKey = getEnv('GEMINI_API_KEY');
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemInstruction = [
    'You are a private study assistant for the UX Mastery website.',
    'Answer only from the provided website curriculum context.',
    'If the context does not cover the answer, say so clearly and do not fabricate.',
    'Prefer concise, clear answers.',
    'Cite the relevant provided sources at the end in plain text.',
  ].join(' ');

  const contextBlock = chunks.map((chunk, index) => {
    const excerpt = chunk.text.slice(0, 2500);
    return `[Source ${index + 1}: ${chunk.label} | ${chunk.source}]\n${excerpt}`;
  }).join('\n\n');

  const transcript = history.map(item => `${item.role === 'assistant' ? 'Assistant' : 'User'}: ${item.text}`).join('\n');
  const userPrompt = [
    `Current page: ${context.page || 'index.html'}`,
    `Current week: ${context.week || 'n/a'}`,
    `Current day: ${context.day || 'n/a'}`,
    transcript ? `Recent chat:\n${transcript}` : '',
    `Website curriculum context:\n${contextBlock}`,
    `User question: ${message}`,
    'Respond with grounded guidance only.',
  ].filter(Boolean).join('\n\n');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 700,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Gemini request failed.');
  }

  const parts = data.candidates?.[0]?.content?.parts || [];
  const answer = parts.map(part => part.text || '').join('\n').trim();
  if (!answer) throw new Error('Gemini returned an empty response.');
  return answer;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  const clientKey = getClientKey(req);
  if (!enforceRateLimit(chatRateMap, clientKey, 24)) {
    return sendJson(res, 429, { error: 'Too many requests. Try again later.' });
  }

  const token = getBearerToken(req);
  if (!verifyAccessToken(token)) {
    return sendJson(res, 401, { error: 'Unauthorized.' });
  }

  try {
    const body = await readJsonBody(req);
    const message = String(body.message || '').trim();
    const page = String(body.page || 'index.html');
    const day = Number.isInteger(body.day) ? body.day : Number(body.day) || null;
    const week = Number.isInteger(body.week) ? body.week : Number(body.week) || null;
    const history = Array.isArray(body.chat_history) ? body.chat_history.slice(-8).map(item => ({
      role: item.role === 'assistant' ? 'assistant' : 'user',
      text: String(item.text || '').slice(0, 1500),
    })) : [];

    if (!message) {
      return sendJson(res, 400, { error: 'Message is required.' });
    }

    const chunks = retrieveRelevantChunks(message, { page, day, week });
    if (!chunks.length) {
      return sendJson(res, 200, {
        answer: 'I could not find matching curriculum content on the website for that question yet.',
        citations: [],
        grounded: false,
        fallback_reason: 'Topic not covered in indexed website content.',
      });
    }

    const answer = await callGemini(message, { page, day, week }, chunks, history);
    return sendJson(res, 200, {
      answer,
      citations: chunks.map(chunk => chunk.label),
      grounded: true,
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Unable to answer right now.' });
  }
};
