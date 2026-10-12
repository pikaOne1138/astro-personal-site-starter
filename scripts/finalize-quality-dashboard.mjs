import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const dir='qa-artifacts/quality';mkdirSync(dir,{recursive:true});
const read=file=>existsSync(dir+'/'+file)?JSON.parse(readFileSync(dir+'/'+file,'utf8')):null;
const map={G1:{registry:'QA_REGISTRY',compile:'QA_COMPILE',coverage:'QA_COVERAGE',historic:'QA_HISTORY'},G2:{build:'QA_BUILD',starter:'QA_STARTER',drafts:'QA_DRAFTS'},G3:{navigation:'QA_NAV',planner:'QA_PLANNER'},G4:{editorial:'QA_EDITORIAL',layouts:'QA_LAYOUTS',guide:'QA_GUIDE'},G5:{deployment:'QA_DEPLOYMENT'}};
const state=v=>v==='success'?'PASS':v==='failure'?'FAIL':v==='cancelled'?'BLOCKED':'NOT TESTED';
const gates={};
for(const [key,inputs] of Object.entries(map)){
 const checks=Object.fromEntries(Object.entries(inputs).map(([name,variable])=>[name,{status:state(process.env[variable]),githubOutcome:process.env[variable]||'not-run'}]));
 const values=Object.values(checks).map(x=>x.status);
 gates[key]={status:values.includes('FAIL')?'FAIL':'NOT TESTED',observedChecks:values.filter(x=>x==='PASS').length,declaredChecks:values.length,checks,coverageNote:'CI subset is not complete v2.0 gate acceptance'};
}
const report={schemaVersion:1,prHeadSha:process.env.PR_HEAD_SHA||null,checkoutSha:process.env.GITHUB_SHA||null,workflowRunId:process.env.GITHUB_RUN_ID||null,releaseReady:false,releaseStatus:Object.values(gates).some(x=>x.status==='FAIL')?'FAIL':'NOT TESTED',gates,assetCoverage:read('quality-results.json'),historicalRegressions:read('historic-regressions.json'),notTested:['Complete Block behavior/Props/render tests','Cross-theme and cross-Layout integration','Student ZIP black-box downloaded from deployed /guide/','Student-owned PR CI for both kinds','Independent Cloudflare Preview SHA/HTTP verification','Full visual and accessibility acceptance']};
writeFileSync(dir+'/quality-results.json',JSON.stringify(report,null,2)+'\n');
const lines=['# Astro Workshop v2.0 CI Quality Dashboard','',`**Release: ${report.releaseStatus}; NOT APPROVED**`,'',`PR head: ${report.prHeadSha||'unknown'}; CI checkout: ${report.checkoutSha||'unknown'}`,'','Pull-request checkout may be a synthetic merge commit; this is not deployment SHA verification.','','| Gate | Observed PASS | Declared checks | Gate status |','|---|---:|---:|---|',...Object.entries(gates).map(([k,v])=>`| ${k} | ${v.observedChecks} | ${v.declaredChecks} | ${v.status} |`),'','## Checks'];
for(const [gate,v] of Object.entries(gates))lines.push('### '+gate,...Object.entries(v.checks).map(([k,x])=>`- ${k}: ${x.status} (${x.githubOutcome})`));
lines.push('','## Explicitly NOT TESTED',...report.notTested.map(x=>'- '+x),'','No automatic merge approval.');
const md=lines.join('\n')+'\n';writeFileSync(dir+'/release-dashboard.md',md);
if(process.env.GITHUB_STEP_SUMMARY)writeFileSync(process.env.GITHUB_STEP_SUMMARY,md,{flag:'a'});
console.log('Release: '+report.releaseStatus+'; '+Object.entries(gates).map(([g,v])=>`${g} ${v.observedChecks}/${v.declaredChecks}`).join(', '));
if(report.releaseStatus==='FAIL')process.exitCode=1;
