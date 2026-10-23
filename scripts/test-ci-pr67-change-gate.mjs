import assert from 'node:assert/strict';
import {evidence,validateEvidenceBundle,validEvidenceItem,isLedgerOnlyPaths} from './ci-pr67-change-gate.mjs';
const sha='f0e0a7c9930f9128f3e9ca77a6ca71ddb6cf3713';
const good=evidence.map(e=>({run:{id:e.id,name:e.flow,event:'pull_request',head_sha:sha,status:'completed',conclusion:'success'},
 jobs:[{name:e.job,status:'completed',conclusion:'success'}]}));
assert.equal(validateEvidenceBundle(good),true,'four successful real heavy jobs');
for(const i of [0,1,2,3]){
 for(const bad of [
  x=>{x.run.conclusion='action_required'},x=>{x.run.status='in_progress'},
  x=>{x.run.head_sha='1'.repeat(40)},x=>{x.run.id=1},x=>{x.run.name='Other'},
  x=>{x.run.event='push'},x=>{x.jobs[0].conclusion='skipped'},
  x=>{x.jobs[0].conclusion='cancelled'},x=>{x.jobs[0].name='ci-change-classifier'},
  x=>{x.jobs[0].head_sha='2'.repeat(40)}
 ]){
  const copy=structuredClone(good);bad(copy[i]);
  assert.equal(validateEvidenceBundle(copy),false,'reject bad run/job '+i);
 }
}
assert.equal(validateEvidenceBundle(good.slice(0,3)),false,'reject missing run');
assert.equal(validateEvidenceBundle([...good,good[0]]),false,'reject extra run');
assert.equal(isLedgerOnlyPaths(['scripts/phase2-canonical-ledger.mjs']),true);
assert.equal(isLedgerOnlyPaths(['src/pages/starter/index.astro']),false);
console.log('PASS: pinned run evidence, statuses, SHA, jobs, missing entries, and path guards');
