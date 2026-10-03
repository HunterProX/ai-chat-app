const test = require('node:test');
const assert = require('node:assert/strict');
const { createProvider } = require('../provider');

test('deterministic provider implements the provider boundary', async () => {
  const provider = createProvider({ answer: async () => ({ answer: 'ok', citations: [], evidence_status: 'developing' }) });
  assert.equal(provider.name, 'deterministic');
  assert.deepEqual(await provider.answer({ message: 'hello', mode: 'representative' }), { answer: 'ok', citations: [], evidence_status: 'developing' });
});

test('unsupported providers fail closed', () => {
  assert.throws(() => createProvider({ name: 'openai', answer: () => ({}) }), /Unsupported provider/);
});
