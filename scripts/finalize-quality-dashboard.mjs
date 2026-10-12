import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const dir='qa-artifacts/quality';mkdirSync(dir,{recursive:true});
const read=file=>existsSync(dir+'/'+file)?JSON.parse(readFileSync(dir+'/'+file,'utf8')):null;
const map={G1:{registry:'QA_REGISTRY',compile:'QA_COMPILE',allComponents:'QA_ALL_COMPONENTS',coverage:'QA_COVERAGE',historic:'QA_HISTORY',skillSource:'QA_SKILL_SOURCE',documentSafety:'QA_DOCUMENT_SAFETY'},G2:{build:'QA_BUILD',starter:'QA_STARTER',drafts:'QA_DRAFTS'},G3:{navigation:'QA_NAV',planner:'QA_PLANNER',liveSearch:'QA_LIVE_SEARCH'},G4:{sharedComponents:'QA_SHARED_COMPONENTS',allRecipes:'QA_ALL_RECIPES',allPatterns:'QA_ALL_PATTERNS',editorial:'QA_EDITORIAL',layouts:'QA_LAYOUTS',guide:'QA_GUIDE',blockEffects:'QA_BLOCK_EFFECT',blockEvidence:'QA_BLOCK_EVIDENCE',homeOverflow:'QA_HOME_OVERFLOW',themeContrast:'QA_THEME_CONTRAST'},G5:{guideZip:'QA_GUIDE_ZIP',interviewZip:'QA_INTERVIEW_ZIP',deployment:'QA_DEPLOYMENT',remoteBrowser:'QA_REMOTE_BROWSER'}};
const state=v=>v==='success'?'PASS':v==='failure'?'FAIL':v==='cancelled'?'BLOCKED':'NOT TESTED';
const gates={};
for(const [key,inputs] of Object.entries(map)){
 const checks=Object.fromEntries(Object.entries(inputs).map(([name,variable])=>[name,{status:state(process.env[variable]),githubOutcome:process.env[variable]||'not-run'}]));
 const values=Object.values(checks).map(x=>x.status);
 gates[key]={status:values.includes('FAIL')?'FAIL':'NOT TESTED',observedChecks:values.filter(x=>x==='PASS').length,declaredChecks:values.length,checks,coverageNote:'CI subset is not complete v2.0 gate acceptance'};
}
const externalPreview=read('external-preview.json');
if(externalPreview&&gates.G5?.checks.deployment){
 const value=['PASS','FAIL','BLOCKED','NOT TESTED'].includes(externalPreview.status)?externalPreview.status:'NOT TESTED';
 gates.G5.checks.deployment.status=value;
 gates.G5.checks.deployment.detail='Actual HTTP checks: '+(externalPreview.previewUrl||'no matched deployment');
 gates.G5.observedChecks=Object.values(gates.G5.checks).filter(x=>x.status==='PASS').length;
 gates.G5.status=Object.values(gates.G5.checks).some(x=>x.status==='FAIL')?'FAIL':'NOT TESTED';
}
const externalBrowser=read('external-preview-browser.json');
if(externalBrowser&&gates.G5?.checks.remoteBrowser){
 gates.G5.checks.remoteBrowser.status=['PASS','FAIL','BLOCKED','NOT TESTED'].includes(externalBrowser.status)?externalBrowser.status:'NOT TESTED';
 gates.G5.observedChecks=Object.values(gates.G5.checks).filter(x=>x.status==='PASS').length;
 gates.G5.status=Object.values(gates.G5.checks).some(x=>x.status==='FAIL')?'FAIL':'NOT TESTED';
}
const assetCoverage=read('quality-results.json');
const structuralSteps={blocks:['registry','compile'],effects:['compile'],layouts:['registry'],patterns:['registry','compile'],skills:['coverage'],recipes:['compile']};
if(assetCoverage && gates.G1){
 const structural=[];
 for(const item of assetCoverage.items||[]){
  if(item.type!=='contract')continue;
  const needs=structuralSteps[item.group]||[];
  structural.push({group:item.group,id:item.id,status:needs.length&&needs.every(name=>gates.G1.checks[name]?.status==='PASS')?'PASS':'NOT TESTED',
   scope:'Registry presence / Astro syntax only; Props, behavior and integration not covered',steps:needs,sha:process.env.GITHUB_SHA||null});
 }
 assetCoverage.structuralRegistrationAndSyntax=structural;
 assetCoverage.evidenceNote='Structural checks have separate PASS evidence. Functional contract, behavior, integration and visual assertions remain NOT TESTED until their own tests execute.';
 assetCoverage.assertions=Object.fromEntries(['PASS','FAIL','NOTICE','BLOCKED','NOT TESTED'].map(status=>[status,(assetCoverage.items||[]).filter(x=>x.status===status).length]));
}
// Execution evidence is a narrower claim than historically VERIFIED. Preserve the source
// ledger's NOT TESTED until pre-fix and post-fix evidence are all independently linked.
const historic=read('historic-regressions.json');
const observedHistory={};
const evidenceRules={
 W8:{step:'liveSearch',file:'live-chinese-search.json',predicate:x=>x?.status==='PASS'&&x?.rows?.length===4&&x.rows.every(r=>r.count>0)},
 W3:{step:'interviewZip',file:'interview-zip-consistency.json',predicate:x=>x?.status==='PASS'&&x?.files?.length===7&&x.files.every(y=>y.exact)},
 W9:{step:'blockEffects',file:'block-effect-browser.json',predicate:x=>x?.failed===0&&x?.rows?.filter(r=>r.kind==='blocks').some(r=>r.mobileMenuInteracted)},
 W11:{step:'blockEffects',file:'block-effect-browser.json',predicate:x=>x?.failed===0&&x?.rows?.filter(r=>r.kind==='blocks').every(r=>r.featureGrid?.linked===1&&r.featureGrid?.unlinked===2)},
 N17:{step:'blockEffects',file:'block-effect-browser.json',predicate:x=>x?.failed===0&&x?.rows?.filter(r=>r.kind==='blocks').length===4},
 F10b:{step:'blockEffects',file:'block-effect-browser.json',predicate:x=>x?.failed===0&&x?.rows?.filter(r=>r.kind==='blocks').some(r=>r.mobileMenuInteracted)},
 F09:{step:'drafts',file:null,predicate:()=>true},
 F11:{step:'drafts',file:null,predicate:()=>true}
};
for(const [id,rule] of Object.entries(evidenceRules)){
 const gate=rule.step==='blockEffects'?'G4':rule.step==='interviewZip'?'G5':rule.step==='liveSearch'?'G3':'G2';
 const check=gates[gate]?.checks?.[rule.step];
 const artifact=rule.file?read(rule.file):null;
 observedHistory[id]={status:check?.status==='PASS'&&rule.predicate(artifact)?'OBSERVED PASS':'NOT TESTED',
  evidence:{sha:process.env.GITHUB_SHA||null,workflowRunId:process.env.GITHUB_RUN_ID||null,file:rule.file||'scripts/test-draft-leakage-regressions.mjs',step:rule.step},
  limitation:'Partial latest-run assertion; this does not satisfy all historical VERIFIED requirements'};
}
if(historic)historic.latestRunObservations=observedHistory;
const report={schemaVersion:1,prHeadSha:process.env.PR_HEAD_SHA||null,checkoutSha:process.env.GITHUB_SHA||null,workflowRunId:process.env.GITHUB_RUN_ID||null,releaseReady:false,releaseStatus:Object.values(gates).some(x=>x.status==='FAIL')?'FAIL':'NOT TESTED',gates,assetCoverage,allAstroComponents:read('all-astro-components.json'),editorialRecipesBrowser:read('editorial-recipes-browser.json'),sectionPatternsBrowser:read('section-patterns-browser.json'),blockEffectBrowser:read('block-effect-browser.json'),guideZipDownload:read('guide-zip-download.json'),interviewZipDownload:read('interview-zip-consistency.json'),externalPreview,externalPreviewBrowser:externalBrowser,historicalRegressions:historic,historicalExecutionEvidence:read('historic-execution-evidence.json'),skillSourceContracts:read('skill-contracts.json'),documentSafety:read('learner-document-safety.json'),themeContrastRoles:read('theme-contrast-roles.json'),sharedComponentsBrowser:read('shared-components-browser.json'),liveChineseSearch:read('live-chinese-search.json'),qualityTrend:read('quality-trend.json'),notTested:['Complete Block behavior/Props/render tests','Cross-theme and cross-Layout integration','Historical defects requiring pre-fix and post-fix evidence per row','Student-owned GitHub PR CI for both kinds','Full human visual and accessibility acceptance']};
writeFileSync(dir+'/quality-results.json',JSON.stringify(report,null,2)+'\n');
const lines=['# Astro Workshop v2.0 CI Quality Dashboard','',`**Release: ${report.releaseStatus}; NOT APPROVED**`,'',`PR head: ${report.prHeadSha||'unknown'}; CI checkout: ${report.checkoutSha||'unknown'}`,'','Pull-request checkout may be a synthetic merge commit; this is not deployment SHA verification.','','| Gate | Observed PASS | Declared checks | Gate status |','|---|---:|---:|---|',...Object.entries(gates).map(([k,v])=>`| ${k} | ${v.observedChecks} | ${v.declaredChecks} | ${v.status} |`),'','## Checks'];
for(const [gate,v] of Object.entries(gates))lines.push('### '+gate,...Object.entries(v.checks).map(([k,x])=>`- ${k}: ${x.status} (${x.githubOutcome})`));
if(report.qualityTrend)lines.push('','## Recent CI history', 'Trend collection: '+report.qualityTrend.status, 'Completed '+report.qualityTrend.metrics.completed+'; success '+report.qualityTrend.metrics.success+'; failure '+report.qualityTrend.metrics.failure+'; cancelled '+report.qualityTrend.metrics.cancelled, 'Per-defect recurrence and flakiness: NOT TESTED');
lines.push('','## Explicitly NOT TESTED',...report.notTested.map(x=>'- '+x),'','No automatic merge approval.');
const md=lines.join('\n')+'\n';writeFileSync(dir+'/release-dashboard.md',md);
if(process.env.GITHUB_STEP_SUMMARY)writeFileSync(process.env.GITHUB_STEP_SUMMARY,md,{flag:'a'});
console.log('Release: '+report.releaseStatus+'; '+Object.entries(gates).map(([g,v])=>`${g} ${v.observedChecks}/${v.declaredChecks}`).join(', '));
if(report.releaseStatus==='FAIL')process.exitCode=1;
