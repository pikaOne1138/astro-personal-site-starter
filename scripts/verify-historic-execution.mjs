import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const ledger=JSON.parse(readFileSync('docs/quality/HISTORIC-REGRESSIONS.json','utf8'));
const named={
 W1:['scripts/test-learner-document-safety.mjs','QA_DOCUMENT_SAFETY'],
 W2:['scripts/test-learner-document-safety.mjs','QA_DOCUMENT_SAFETY'],
 W13:['scripts/test-learner-document-safety.mjs','QA_DOCUMENT_SAFETY'],
 W14:['scripts/test-learner-document-safety.mjs','QA_DOCUMENT_SAFETY'],
 W5:['scripts/test-theme-contrast-roles.mjs','QA_THEME_CONTRAST'],
 N15:['scripts/test-theme-contrast-roles.mjs','QA_THEME_CONTRAST'],
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
 N12:['scripts/test-starter-route-contracts.mjs','QA_STARTER_ROUTES'],
 N13:['scripts/test-starter-route-contracts.mjs','QA_STARTER_ROUTES'],
 N19:['scripts/test-starter-route-contracts.mjs','QA_STARTER_ROUTES'],
 N20:['scripts/test-canonical-student-prompt.mjs','QA_CANONICAL_PROMPT'],
 W12:['scripts/test-onboarding-skill-structure.mjs','QA_ONBOARDING_STRUCTURE'],
 N5:['scripts/test-generated-link-audit.mjs','QA_LINK_AUDIT'],
 F06:['scripts/test-generated-link-audit.mjs','QA_LINK_AUDIT'],
 W3:['scripts/qa-interview-download.mjs','QA_INTERVIEW_ZIP'],
 W8:['scripts/qa-live-chinese-search.mjs','QA_LIVE_SEARCH'],
 W9:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT'],
 W11:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT'],
 N10:['scripts/test-editorial-overlap-regressions.mjs','QA_EDITORIAL_OVERLAP'],
 N11:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT'],
 N17:['scripts/qa-blocks-effects.mjs','QA_BLOCK_EFFECT'],
 N18:['scripts/qa-all-editorial-recipes.mjs','QA_ALL_RECIPES'],
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
const draftProofPath='qa-artifacts/quality/draft-regression-cases.json';
const draftProof=existsSync(draftProofPath)?JSON.parse(readFileSync(draftProofPath,'utf8')):null;
const proofAtCurrentSha=draftProof?.status==='PASS'&&draftProof?.sha===process.env.GITHUB_SHA;
const linkProofPath='qa-artifacts/quality/link-regression-cases.json';
const linkProof=existsSync(linkProofPath)?JSON.parse(readFileSync(linkProofPath,'utf8')):null;
const linkProofAtCurrentSha=linkProof?.status==='PASS'&&linkProof?.sha===process.env.GITHUB_SHA;
const routeProofPath='qa-artifacts/quality/starter-route-regression-cases.json';
const routeProof=existsSync(routeProofPath)?JSON.parse(readFileSync(routeProofPath,'utf8')):null;
const routeProofAtCurrentSha=routeProof?.status==='PASS'&&routeProof?.sha===process.env.GITHUB_SHA;
const additionalProofs=[
 {path:'qa-artifacts/quality/editorial-overlap-case.json',cases:['N10']},
 {path:'qa-artifacts/quality/navigation-regression-cases.json',cases:['W7','F01','F02']},
 {path:'qa-artifacts/quality/editorial-fault-cases.json',cases:['N7','N8','N9','F08','F14']}
].map(p=>({...p,data:existsSync(p.path)?JSON.parse(readFileSync(p.path,'utf8')):null}));

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
 if(proofAtCurrentSha&&evidence?.outcome==='success'){
  const direct=draftProof.cases.filter(x=>x.pass&&new RegExp('\\b'+id+'\\b').test(x.name));
  if(direct.length)evidence.directCurrentShaChecks=direct.map(x=>({name:x.name,expected:x.expected,exitCode:x.exitCode,signature:x.signature,diagnosticMatched:x.signatureMatches}));
 }
 if(linkProofAtCurrentSha&&evidence?.outcome==='success'&&(id==='N5'||id==='F06')){
  const direct=linkProof.cases.filter(x=>x.id===id&&x.pass===true);
  if(direct.length>=2)evidence.directCurrentShaChecks=direct.map(x=>({name:x.caseName,expected:x.caseName.includes('rejected')?'REJECT':'PASS',diagnostic:x.diagnostic}));
 }
 if(routeProofAtCurrentSha&&evidence?.outcome==='success'){
  const direct=routeProof.cases.filter(c=>c.passed===true&&(c.id===id||new RegExp('\\b'+id+'\\b').test(c.name)));
  if(direct.length)evidence.directCurrentShaChecks=direct.map(c=>({name:c.name,expected:c.expected,exitCode:c.exitCode??null,diagnostic:c.diagnostic||null}));
 }
 for(const proof of additionalProofs){
  if(proof.cases.includes(id)&&proof.data?.sha===process.env.GITHUB_SHA&&proof.data?.status==='PASS'&&evidence?.outcome==='success'){
    const direct=proof.data.cases.filter(c=>c.id===id&&c.passed===true);
    if(direct.length)evidence.directCurrentShaChecks=direct.map(c=>({name:c.name,expected:c.expected,exitCode:c.exitCode,diagnostic:c.diagnostic,metrics:c.metrics||null}));
  }
 }
 if(['W9','W11','N11','N17','F10b'].includes(id)&&evidence?.outcome==='success'){
  const path='qa-artifacts/quality/block-effect-browser.json';
  if(existsSync(path)){
   const result=JSON.parse(readFileSync(path,'utf8'));
   if(result.sha===process.env.GITHUB_SHA&&result.failed===0){
    const direct=result.historicalCases?.find(x=>x.id===id&&x.passed===true);
    if(direct)evidence.directCurrentShaChecks=[{name:direct.name,expected:'PASS',observations:direct.observations}];
   }
  }
 }

 if(evidence?.outcome==='success'){
  const readProof=(filename)=>{const path='qa-artifacts/quality/'+filename;return existsSync(path)?JSON.parse(readFileSync(path,'utf8')):null};
  const current=p=>p?.status==='PASS'&&(p.sha===process.env.GITHUB_SHA||p.headSha===process.env.GITHUB_SHA||p.checkoutSha===process.env.GITHUB_SHA);
  let direct=null;
  if(['W1','W2','W13','W14'].includes(id)){
   const p=readProof('learner-document-safety.json');
   const assertions=p?.assertions?.filter(x=>x.id===id&&x.status==='PASS')||[];
   const faults=p?.faults?.filter(x=>x.id===id&&x.catches===true)||[];
   if(current(p)&&assertions.length&&faults.length&&assertions.length===faults.length)direct={name:id+' documentation safety contract',assertions:assertions.length,destructiveFixturesCaught:faults.length,limitation:'This proves document content, not old Preview URL HTTP or Cloudflare permission state'};
  }
  if(['W5','N15'].includes(id)){
   const p=readProof('theme-contrast-roles.json');
   if(current(p)&&p.checks?.length===8&&p.checks.every(x=>x.pass)&&p.botanicalChecks?.length===3&&p.botanicalChecks.every(x=>x.pass)&&p.negativeTest?.detected===true)
    direct={name:id+' foreground theme role ratios and negative pale-text fixture',themeCount:8,botanicalChecks:p.botanicalChecks,mutationDetected:true,limitation:'Token pairs are not all computed DOM color states'};
  }
  if(id==='W3'){
   const p=readProof('interview-zip-consistency.json');
   if(current(p)&&p.files?.length===7&&p.files.every(x=>x.exact===true)&&p.errors?.length===0)
    direct={name:'W3 seven browser-downloaded interview files byte-identical',files:p.files.length,limitation:'Byte equality is not AI answer correctness'};
  }
  if(id==='W8'){
   const p=readProof('live-chinese-search.json');
   if(current(p)&&p.rows?.length===4&&p.rows.every(x=>x.matched&&x.count>0&&!x.pageErrors.length))
    direct={name:'W8 four theme Chinese live search result checks',queries:p.rows.map(x=>({theme:x.theme,term:x.term,count:x.count})),limitation:'Not full indexing/exclusion ranking approval'};
  }
  if(['W4','N1','N14','N16'].includes(id)){
   const p=readProof('planner-interaction-cases.json');
   const field={W4:['editFocused','labelUpdated'],N1:['reorderFocus'],N14:['customPathPresent'],N16:['previewFocusable']}[id];
   if(current(p)&&p.records?.length===2&&p.records.every(x=>[1440,390].includes(x.width)&&field.every(key=>x[key]===true)))
    direct={name:id+' real planner browser interaction',measurements:p.records.map(x=>({width:x.width,verified:Object.fromEntries(field.map(k=>[k,x[k]]))}))};
  }
  if(id==='W12'){
   const p=readProof('onboarding-structure.json');
   if(current(p)&&p.checks?.length===3&&p.checks[0].status==='PASS'&&p.checks.slice(1).every(x=>x.status==='EXPECTED FAIL'&&x.errors?.length))
    direct={name:'W12 nine-step onboarding numbering plus two malformed fixtures',checks:p.checks.map(x=>({name:x.name,status:x.status}))};
  }
  if(id==='N18'){
   const p=readProof('editorial-recipes-browser.json');
   if(current(p)&&p.h01Checks?.length===4&&p.h01Checks.every(x=>x.passed&&x.links===1&&x.inert===1&&x.noFakeHref&&x.customCaption))
    direct={name:'N18 H01 actual link, inert rail and configurable image caption at four widths',checks:p.h01Checks};
  }
  if(id==='N20'){
   const p=readProof('canonical-student-prompt.json');
   if(current(p)&&p.sourceContract==='PASS'&&p.bundledZip==='PASS'&&p.errors?.length===0)
    direct={name:'N20 guide, START-HERE, README canonical text and actual bundled ZIP',zip:p.bundledZip};
  }
  if(id==='F07'){
   const p=readProof('home-mobile-overflow-regression.json');
   if(current(p)&&p.checks?.length===2&&p.checks.every(x=>x.pass)&&p.checks[1].measurement.overflow)
    direct={name:'F07 390px normal width fits and injected 520px width overflows',checks:p.checks};
  }
  if(direct)evidence.directCurrentShaChecks=[direct];
 }
 rows[id]={requirement:requirement.note,ledgerStatus:requirement.status,observed,evidence};
}
for(const id of Object.keys(named))if(!ledger.defects[id])problems.push('Named evidence map references missing case '+id);
const namedExecuted=Object.values(rows).filter(x=>x.observed==='NAMED TEST EXECUTED').length;
const directCaseEvidence=Object.values(rows).filter(x=>x.evidence?.directCurrentShaChecks?.length).length;
const result={schemaVersion:1,prHeadSha:process.env.PR_HEAD_SHA||null,executionSha:process.env.GITHUB_SHA||null,
 tracked:Object.keys(rows).length,namedSourceCases:Object.keys(named).length,namedExecuted,
 notExecuted:Object.keys(rows).length-namedExecuted,withoutDirectCaseEvidence:Object.keys(rows).length-directCaseEvidence,
 directCaseEvidence,fullyHistoricallyVerified:0,verificationComplete:false,problems,rows,invalidExcluded:ledger.excludedFaults,
 countingRules:'Named execution means workflow step success; direct proof means a case-level current SHA assertion; neither establishes historical before-fix evidence or full verification.'};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/historic-execution-evidence.json',JSON.stringify(result,null,2)+'\n');
const md=['# Historical W/N/F evidence reconciliation','',
 'Total '+result.tracked+'; named source cases '+result.namedSourceCases+'; executed this run '+namedExecuted+'; direct case proofs '+directCaseEvidence+'; still without direct case evidence '+result.withoutDirectCaseEvidence,
 '','**EXECUTED is not historical VERIFIED, and must not promote source ledger entries to PASS.**','',
 ...Object.entries(rows).map(([id,x])=>'- '+id+': '+x.observed+(x.evidence?' ('+x.evidence.path+')':'')),...problems.map(x=>'FAIL '+x)].join('\n')+'\n';
writeFileSync('qa-artifacts/quality/historic-execution-evidence.md',md);
if(process.env.GITHUB_STEP_SUMMARY)writeFileSync(process.env.GITHUB_STEP_SUMMARY,md,{flag:'a'});
console.log('Historical source-to-run evidence: '+namedExecuted+'/'+result.tracked+' named checks observed; '+result.directCaseEvidence+' direct case-level output proofs; '+problems.length+' invalid mappings');
if(problems.length){problems.forEach(x=>console.error('FAIL '+x));process.exitCode=1;}
