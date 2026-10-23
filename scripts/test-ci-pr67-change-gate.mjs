import assert from 'node:assert/strict';
import {isLedgerOnlyPaths} from './ci-pr67-change-gate.mjs';
const valid=[
 'scripts/phase2-canonical-ledger.mjs',
 'docs/student-journey/canonical-ledger.json',
 'docs/student-journey/PHASE2-GATE-REPORT.md'
];
assert.equal(isLedgerOnlyPaths(valid),true);
for(const p of ['src/pages/starter/index.astro','scripts/test-student-planner-draft.mjs',
 '.github/workflows/pr-preview.yml','package.json','docs/student-journey/PHASE2-RESET-EXECUTION-PLAN.md']){
 assert.equal(isLedgerOnlyPaths([...valid,p]),false,p+' must run full QA');
}
console.log('PR67 ledger-only allowlist tests passed');
