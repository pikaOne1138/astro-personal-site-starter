import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const ledger=JSON.parse(readFileSync('docs/quality/HISTORIC-REGRESSIONS.json','utf8'));
const named={
 W4:['scripts/qa-starter-planner.mjs','QA_PLANNER'],
 N1:['scripts/qa-starter-planner.mjs','QA_PLANNER'],
 N14:['scripts/qa-starter-planner.mjs','QA_PLANNER'],
 N16:['scripts/qa-starter-planner.mjs','QA_PLANNER'],
 W7:['scripts/test-student-navigation-regressions.mjs','QA_NAV'],
 F01:['scripts/test-student-navigation-regressions.mjs','QA_NAV'],
 F02:['scripts/test-student-navigation-regressions.mjs','QA_NAV'],
 N7:['scripts/test-editorial-audit-faults.mjs','QA_EDITORIAL'],
 N8:['scripts/test-editorial-audit-faults.mjs','QA_EDITORIAL'],
 N9:['scripts/test-editorial-audit-faults.mjs','QA_EDITORIAL'],
 F08:['scripts/test-editorial-audit-faults.mjs','QA_EDITORIAL'],
 F14:['scripts/test-editorial-audit-faults.mjs','QA_EDITORIAL'],
 F07:['scripts/test-home-mobile-overflow.mjs','QA_HOME_OVERFLOW'],
 W10:['scripts/test-starter-route-contracts.mjs','QA_STARTER_ROUTES'],
 N2:['scripts/test-starter-route-contracts.mjs','QA_STARTER_ROUTES'],
 N3:['scripts/test-starter-route-contracts.mjs','QA_STARTER_ROUTES'],
 N4:['scripts/test-starter-route-contracts.mjs','QA_STARTER_ROUTES'],
 W3:['scripts/qa-interview-download.mjs','QA_INTERVIEW_ZIP'],
 W8:['scripts/qa-live-chinese-search.mjs','QA_LIVE_SEARCH'],
 W9:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT'],
 W11:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT'],
 N17:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT'],
 F00:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F03:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F04:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F05:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F13:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 W6:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 N6:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F09:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F11:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F12:['scripts/test-draft-leakage-regressions.mjs','QA_DRAFTS'],
 F10b:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT']
};
const problems=[],rows={};
for(const [id,requirement] of Object.entries(ledger.defects)){
 const match=named[id];
 let observed='NOT TESTED',evidence=null;
 if(match){
  const [path,key]=match;
  if(!existsSync(path))problems.push(id+': named test file missing '+path);
  else if(!readFileSync(path,'utf8').includes(id))problems.push(id+': test source lacks explicit case identifier '+path);
  else{
   const outcome=process.env[key]||'not-run';
   observed=outcome==='success'?'NAMED TEST EXECUTED':'NOT TESTED';
   evidence={path,workflowStep:key,outcome,prHeadSha:process.env.PR_HEAD_SHA||null,workflowRunId:process.env.GITHUB_RUN_ID||null,
    limitation:'The named test suite executed. Per-case negative/positive evidence and independent previous SHA remain required for full VERIFIED.'};
  }
 }
 rows[id]={requirement:requirement.note,ledgerStatus:requirement.status,observed,evidence};
}
for(const id of Object.keys(named))if(!ledger.defects[id])problems.push('Named evidence map references missing case '+id);
const namedExecuted=Object.values(rows).filter(x=>x.observed==='NAMED TEST EXECUTED').length;
const result={schemaVersion:1,prHeadSha:process.env.PR_HEAD_SHA||null,executionSha:process.env.GITHUB_SHA||null,tracked:Object.keys(rows).length,namedSourceCases:Object.keys(named).length,namedExecuted,notCaseProven:Object.keys(rows).length-namedExecuted,verificationComplete:false,problems,rows,invalidExcluded:ledger.excludedFaults};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/historic-execution-evidence.json',JSON.stringify(result,null,2)+'\n');
const md=['# Historical W/N/F evidence reconciliation','',
 'Total '+result.tracked+'; named source cases '+result.namedSourceCases+'; executed this run '+namedExecuted+'; not individually proven '+result.notCaseProven,
 '','**EXECUTED is not historical VERIFIED, and must not promote source ledger entries to PASS.**','',
 ...Object.entries(rows).map(([id,x])=>'- '+id+': '+x.observed+(x.evidence?' ('+x.evidence.path+')':'')),...problems.map(x=>'FAIL '+x)].join('\n')+'\n';
writeFileSync('qa-artifacts/quality/historic-execution-evidence.md',md);
if(process.env.GITHUB_STEP_SUMMARY)writeFileSync(process.env.GITHUB_STEP_SUMMARY,md,{flag:'a'});
console.log('Historical source-to-run evidence: '+namedExecuted+'/'+result.tracked+' named checks observed; '+problems.length+' invalid mappings');
if(problems.length){problems.forEach(x=>console.error('FAIL '+x));process.exitCode=1;}
