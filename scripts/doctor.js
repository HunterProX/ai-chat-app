const { readFileSync } = require('node:fs');
const { execSync } = require('node:child_process');
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const failures = [];
if (Number(process.versions.node.split('.')[0]) < 20) failures.push('Node.js 20 or newer is required.');
for (const script of ['start', 'test']) if (!pkg.scripts[script]) failures.push(`Missing npm script: ${script}`);
if (pkg.dependencies && Object.keys(pkg.dependencies).length) failures.push('Reliability lab should not require runtime provider dependencies by default.');
try { execSync('node -e "require(\'./fixtures/knowledge.json\')"', { stdio: 'ignore' }); } catch { failures.push('Knowledge fixture is not valid JSON.'); }
if (failures.length) { console.error(failures.map((failure) => `DOCTOR FAIL: ${failure}`).join('\n')); process.exit(1); }
console.log('DOCTOR PASS: deterministic provider, scripts, and fixture are aligned.');
