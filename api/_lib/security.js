const crypto = require('crypto');

const WINDOW_MS = 60 * 1000;
const authRateMap = new Map();
const chatRateMap = new Map();

function getEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function getClientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function cleanup(map, now) {
  for (const [key, bucket] of map.entries()) {
    if ((now - bucket.startedAt) > WINDOW_MS) map.delete(key);
  }
}

function enforceRateLimit(map, key, limit) {
  const now = Date.now();
  cleanup(map, now);
  const bucket = map.get(key);
  if (!bucket || (now - bucket.startedAt) > WINDOW_MS) {
    map.set(key, { startedAt: now, count: 1 });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

function base64urlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function base64urlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signPayload(payload) {
  const secret = getEnv('BOT_ACCESS_SECRET');
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function createAccessToken() {
  const payload = JSON.stringify({
    exp: Date.now() + (12 * 60 * 60 * 1000),
  });
  const encoded = base64urlEncode(payload);
  const signature = signPayload(encoded);
  return `${encoded}.${signature}`;
}

function verifyAccessToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [encoded, signature] = token.split('.');
  const expected = signPayload(encoded);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length) return false;
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) return false;

  try {
    const payload = JSON.parse(base64urlDecode(encoded));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 20_000) {
        reject(new Error('Payload too large.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON payload.'));
      }
    });
    req.on('error', reject);
  });
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return '';
  return header.slice(7).trim();
}

function sendJson(res, statusCode, body) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(statusCode).json(body);
}

module.exports = {
  authRateMap,
  chatRateMap,
  createAccessToken,
  enforceRateLimit,
  getBearerToken,
  getClientKey,
  getEnv,
  readJsonBody,
  sendJson,
  verifyAccessToken,
};
