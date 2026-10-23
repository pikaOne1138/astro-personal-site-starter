#!/usr/bin/env node
// Gate only the already-reviewed PR #67 Phase-2 baseline. A site/config/test change,
// a base update, or missing Git history always falls back to full QA.
import {execFileSync} from 'node:child_process';
import {appendFileSync} from 'node:fs';
const baseline='8afd33c69bff8771648ad71908854bd8f98565d0';
const baseSha='369ef9f9a9605410fd6fc22a146c2b2f74e62180';
export const allowed=new Set([
 'scripts/phase2-canonical-ledger.mjs',
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
const api=(path)=>JSON.parse(execFileSync('gh',['api',path],{encoding:'utf8',env:{...process.env,GH_TOKEN:process.env.GH_TOKEN||process.env.GITHUB_TOKEN}}));
const requiredJobs=new Set(['preview-build','static-build','standalone-build','gallery']);
const requiredFlows=new Set(['PR Preview Build','Verify Cloudflare Static Assets','Standalone Starter Export Check','Template Gallery QA']);
function verifiedQaBaseline(head){
 if(!(process.env.GH_TOKEN||process.env.GITHUB_TOKEN)||!process.env.GITHUB_REPOSITORY)return null;
 const repo=process.env.GITHUB_REPOSITORY;
 const runs=api('repos/'+repo+'/actions/runs?branch=feat/student-planner-draft-recovery&event=pull_request&status=success&per_page=100').workflow_runs||[];
 const groups=new Map();
 for(const runInfo of runs){
  if(!requiredFlows.has(runInfo.name)||runInfo.conclusion!=='success')continue;
  const key=runInfo.head_sha;
  if(!groups.has(key))groups.set(key,new Set());
  groups.get(key).add(runInfo.name);
 }
 // Require four actual successful heavy JOBS on one exact revision.
 // A workflow whose classifier passed while its heavy job was skipped
 // is NOT valid QA evidence.
 for(const [sha,flows] of groups){
  if(flows.size!==requiredFlows.size||!/^[a-f0-9]{40}$/.test(sha))continue;
  try{
   run('merge-base','--is-ancestor',baseline,sha);
   run('merge-base','--is-ancestor',sha,head);
   const changed=run('diff','--name-only',sha,head).split('\\n').filter(Boolean);
   if(!isLedgerOnlyPaths(changed))continue;
   const checks=api('repos/'+repo+'/commits/'+sha+'/check-runs?per_page=100').check_runs||[];
   if([...requiredJobs].every(name=>checks.some(c=>c.name===name&&c.status==='completed'&&c.conclusion==='success'))){
    console.log('Verified reusable four-suite QA baseline:',sha);
    return sha;
   }
  }catch(e){console.error('QA baseline candidate rejected',sha,e.message);}
 }
 return null;
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
