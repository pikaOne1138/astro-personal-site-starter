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
const run=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
function classify(){
 if(process.env.PR_NUMBER!=='67'||process.env.PR_BASE_SHA!==baseSha)return 'full';
 const head=process.env.PR_HEAD_SHA;
 if(!/^[a-f0-9]{40}$/.test(head||''))return 'full';
 try{
  run('merge-base','--is-ancestor',baseline,head);
  const lines=run('diff','--name-only',baseline,head).split('\n').filter(Boolean);
  if(isLedgerOnlyPaths(lines))return 'ledger_only';
 }catch(e){console.error('Fail closed: cannot verify baseline ancestry',e.message);}
 return 'full';
}
const mode=classify();
console.log('PR67 CI classification:',mode,'head',process.env.PR_HEAD_SHA||'none');
if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,'mode='+mode+'\n');
else console.log('mode='+mode);
