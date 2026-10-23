#!/usr/bin/env node
// Gate only the already-reviewed PR #67 Phase-2 baseline. A site/config/test change,
// a base update, or missing Git history always falls back to full QA.
import {execFileSync} from 'node:child_process';
import {appendFileSync} from 'node:fs';
const baseline='8afd33c69bff8771648ad71908854bd8f98565d0';
const baseSha='369ef9f9a9605410fd6fc22a146c2b2f74e62180';
export const allowed=new Set([
 'scripts/phase2-canonical-ledger.mjs',
 '.github/workflows/phase2-ledger-import.yml',
 'docs/student-journey/canonical-ledger.json',
 'docs/student-journey/PHASE2-GATE-REPORT.md',
]);
export function isLedgerOnlyPaths(lines){return lines.every(p=>allowed.has(p));}
const allowedBaseChanges=new Set([
 'scripts/ci-pr67-change-gate.mjs',
 'scripts/test-ci-pr67-change-gate.mjs',
 '.github/workflows/pr-preview.yml',
 '.github/workflows/verify-cloudflare-ssg.yml',
 '.github/workflows/starter-export.yml',
 '.github/workflows/template-gallery-qa.yml',
 '.github/workflows/deploy-pages.yml'
]);
const run=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const api=(path)=>JSON.parse(execFileSync('gh',['api',path],{
 encoding:'utf8',maxBuffer:1024*1024,
 env:{...process.env,GH_TOKEN:process.env.GH_TOKEN||process.env.GITHUB_TOKEN}
}));
const evidenceSha='f0e0a7c9930f9128f3e9ca77a6ca71ddb6cf3713';
export const evidence=[
 {id:39922719683,flow:'Template Gallery QA',job:'gallery'},
 {id:39922719550,flow:'Verify Cloudflare Static Assets',job:'static-build'},
 {id:39922719659,flow:'PR Preview Build',job:'preview-build'},
 {id:39922719746,flow:'Standalone Starter Export Check',job:'standalone-build'}
];
export function validEvidenceItem(runInfo,jobs,expected){
 return runInfo?.id===expected.id &&
  runInfo?.name===expected.flow &&
  runInfo?.event==='pull_request' &&
  runInfo?.head_sha===evidenceSha &&
  runInfo?.status==='completed' &&
  runInfo?.conclusion==='success' &&
  Array.isArray(jobs) &&
  jobs.some(j=>j.name===expected.job&&j.status==='completed'&&j.conclusion==='success' &&
   // Job runner metadata may omit head_sha: if present it must match.
   (j.head_sha===undefined||j.head_sha===evidenceSha));
}
export function validateEvidenceBundle(items){
 return Array.isArray(items)&&items.length===evidence.length &&
  evidence.every(expected=>items.some(item=>validEvidenceItem(item.run,item.jobs,expected)));
}
function verifiedQaBaseline(head){
 if(!(process.env.GH_TOKEN||process.env.GITHUB_TOKEN)||!process.env.GITHUB_REPOSITORY)return null;
 const repo=process.env.GITHUB_REPOSITORY;
 // Pinned four runs, two bounded API calls per run; no unbounded history scan.
 const items=evidence.map(expected=>({
  run:api('repos/'+repo+'/actions/runs/'+expected.id),
  jobs:api('repos/'+repo+'/actions/runs/'+expected.id+'/jobs?per_page=30').jobs
 }));
 if(!validateEvidenceBundle(items))return null;
 run('merge-base','--is-ancestor',baseline,evidenceSha);
 run('merge-base','--is-ancestor',evidenceSha,head);
 const changed=run('diff','--name-only',evidenceSha,head).split('\n').filter(Boolean);
 if(!isLedgerOnlyPaths(changed))return null;
 console.log('Verified pinned four-suite QA baseline:',evidenceSha);
 return evidenceSha;
}
function classify(){
 if(process.env.PR_NUMBER!=='67')return 'full';
 const head=process.env.PR_HEAD_SHA;
 if(!/^[a-f0-9]{40}$/.test(head||''))return 'full';
 try{
  const currentBase=process.env.PR_BASE_SHA;
  if(!/^[a-f0-9]{40}$/.test(currentBase||''))return 'full';
  run('merge-base','--is-ancestor',baseSha,currentBase);
  const baseFiles=run('diff','--name-only',baseSha,currentBase).split('\n').filter(Boolean);
  if(!baseFiles.every(p=>allowedBaseChanges.has(p)))return 'full';
  run('merge-base','--is-ancestor',baseline,head);
  const lines=run('diff','--name-only',baseline,head).split('\n').filter(Boolean);
  if(isLedgerOnlyPaths(lines) && verifiedQaBaseline(head))return 'ledger_only';
 }catch(e){console.error('Fail closed: cannot verify baseline ancestry',e.message);}
 return 'full';
}
const mode=classify();
console.log('PR67 CI classification:',mode,'head',process.env.PR_HEAD_SHA||'none');
if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,'mode='+mode+'\n');
else console.log('mode='+mode);
