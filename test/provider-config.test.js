const test = require('node:test');
const assert = require('node:assert/strict');
const { loadProviderConfig } = require('../provider-config');

test('provider config defaults to disabled deterministic mode', () => {
  assert.deepEqual(loadProviderConfig({}), { provider: 'deterministic', enabled: false, external_call_enabled: false });
});

test('external providers fail closed before any network call', () => {
  assert.throws(() => loadProviderConfig({ AI_PROVIDER: 'openai', AI_PROVIDER_ENABLED: 'true' }), /Unsupported provider/);
});
