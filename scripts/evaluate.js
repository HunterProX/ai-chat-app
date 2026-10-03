const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { answerFor } = require('../server');

const cases = JSON.parse(readFileSync('evaluation/cases.json', 'utf8'));
for (const testCase of cases) {
  const result = answerFor(testCase.message, testCase.mode);
  assert.equal(result.evidence_status, testCase.status, `${testCase.id}: status`);
  assert.deepEqual(result.citations, testCase.citations, `${testCase.id}: citations`);
  if (testCase.mode === 'analyst' && testCase.status !== 'insufficient_evidence') assert.equal(result.analysis.scope, 'approved public knowledge fixture', `${testCase.id}: analyst scope`);
}
console.log(`EVALUATION PASS: ${cases.length} cases`);
