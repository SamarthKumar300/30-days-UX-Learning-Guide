module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    service: 'ux-mastery-api',
    message: 'Vercel serverless API is reachable.',
    timestamp: new Date().toISOString(),
    next_step: 'Add Gemini bot auth and chat routes.'
  });
};
