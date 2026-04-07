const {
  authRateMap,
  createAccessToken,
  enforceRateLimit,
  getClientKey,
  getEnv,
  readJsonBody,
  sendJson,
} = require('../_lib/security');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
  }

  const clientKey = getClientKey(req);
  if (!enforceRateLimit(authRateMap, clientKey, 10)) {
    return sendJson(res, 429, { ok: false, error: 'Too many attempts. Try again later.' });
  }

  try {
    const body = await readJsonBody(req);
    const secret = String(body.secret || '').trim();
    if (!secret) {
      return sendJson(res, 400, { ok: false, error: 'Secret is required.' });
    }

    const expectedSecret = getEnv('BOT_ACCESS_SECRET');
    if (secret !== expectedSecret) {
      return sendJson(res, 401, { ok: false, error: 'Invalid access secret.' });
    }

    return sendJson(res, 200, {
      ok: true,
      token: createAccessToken(),
    });
  } catch (error) {
    return sendJson(res, 400, { ok: false, error: error.message || 'Unable to verify access.' });
  }
};
