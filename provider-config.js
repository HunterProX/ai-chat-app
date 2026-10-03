function loadProviderConfig(env = process.env) {
  const provider = env.AI_PROVIDER || 'deterministic';
  const enabled = env.AI_PROVIDER_ENABLED === 'true';
  if (!['deterministic'].includes(provider)) throw new Error(`Unsupported provider: ${provider}`);
  return { provider, enabled, external_call_enabled: false };
}

module.exports = { loadProviderConfig };
