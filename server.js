const http = require('node:http');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { createProvider } = require('./provider');

const MAX_MESSAGE_LENGTH = 1000;
const knowledge = JSON.parse(readFileSync(resolve(__dirname, 'fixtures/knowledge.json'), 'utf8'));

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(payload);
}

function answerFor(message, mode = 'representative') {
  const normalized = message.toLowerCase();
  if (/ignore .*instruction|system prompt|private os|filesystem|secret|api key/.test(normalized)) {
    return { answer: 'Insufficient evidence in the approved public knowledge set to answer that reliably.', citations: [], evidence_status: 'insufficient_evidence', error_code: 'insufficient_evidence' };
  }
  const match = [...knowledge.answers].sort((a, b) => Math.max(...b.keywords.map((keyword) => keyword.length)) - Math.max(...a.keywords.map((keyword) => keyword.length))).find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  if (!match) return { answer: 'Insufficient evidence in the approved public knowledge set to answer that reliably.', citations: [], evidence_status: 'insufficient_evidence', error_code: 'insufficient_evidence' };
  const result = { answer: match.answer, citations: match.citations, evidence_status: match.evidence_status };
  if (mode === 'analyst') result.analysis = { scope: 'approved public knowledge fixture', unknowns: match.evidence_status === 'insufficient_evidence' ? ['No supporting public evidence'] : [] };
  return result;
}

function createServer(provider = createProvider({ answer: answerFor })) {
  return http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') return json(res, 200, { status: 'ok', provider: provider.name, persistent_history: false });
    if (req.method !== 'POST' || req.url !== '/api/chat') return json(res, 404, { error: 'Not found' });
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; if (raw.length > 10000) req.destroy(); });
    req.on('end', () => {
      try {
        const body = JSON.parse(raw || '{}');
        if (typeof body.message !== 'string' || body.message.trim().length === 0) return json(res, 400, { error: 'message must be a non-empty string' });
        if (body.message.length > MAX_MESSAGE_LENGTH) return json(res, 413, { error: `message exceeds ${MAX_MESSAGE_LENGTH} characters` });
        if (body.history !== undefined) return json(res, 400, { error: 'persistent conversation history is not supported', error_code: 'invalid_request' });
        const mode = body.mode || 'representative';
        if (!['representative', 'analyst'].includes(mode)) return json(res, 400, { error: 'mode must be representative or analyst', error_code: 'invalid_request' });
        return Promise.resolve(provider.answer({ message: body.message, mode })).then((result) => json(res, 200, { mode, provider: provider.name, ...result })).catch(() => json(res, 503, { error: 'provider unavailable', error_code: 'provider_unavailable' }));
      } catch { return json(res, 400, { error: 'request body must be valid JSON' }); }
    });
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3001);
  createServer().listen(port, () => console.log(`AI reliability lab listening on port ${port}`));
}

module.exports = { MAX_MESSAGE_LENGTH, answerFor, createServer };
