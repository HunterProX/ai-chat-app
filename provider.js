function createProvider({ answer, name = process.env.AI_PROVIDER || 'deterministic' }) {
  if (name !== 'deterministic') throw new Error(`Unsupported provider: ${name}`);
  return {
    name,
    async answer(input) {
      return answer(input.message, input.mode);
    },
  };
}

module.exports = { createProvider };
