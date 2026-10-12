import {mkdirSync,writeFileSync} from 'node:fs';
const dir='qa-artifacts/quality';mkdirSync(dir,{recursive:true});
const repo=process.env.GITHUB_REPOSITORY||'';
const token=process.env.GITHUB_TOKEN||'';
const report={schemaVersion:1,source:'GitHub Actions workflow runs, not individual defect findings',status:'NOT TESTED',repository:repo,workflow:'verify-cloudflare-ssg.yml',lookback:25,sha:process.env.PR_HEAD_SHA||null,runs:[],metrics:{completed:0,success:0,failure:0,cancelled:0,successRate:null,flakyTests:'NOT TESTED',reintroducedDefects:'NOT TESTED',faultDetectionRate:'NOT TESTED',coverageTrend:'NOT TESTED'},limitations:['Workflow-level success is not Release QA approval','Cancelled superseded commits do not imply test failures','Per-defect trends require structured historical assertions across runs']};
try{
 if(!token||!repo.includes('/'))throw Error('Missing read-only GitHub API context');
 const url='https://api.github.com/repos/'+repo+'/actions/workflows/verify-cloudflare-ssg.yml/runs?per_page=25&branch=feat%2Flearner-site-maintenance-skills';
 const res=await fetch(url,{headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+token,'User-Agent':'Astro-Workshop-QA-Trend'},signal:AbortSignal.timeout(15000)});
 if(!res.ok)throw Error('Workflow runs API '+res.status);
 const json=await res.json();
 report.runs=(json.workflow_runs||[]).map(r=>({runId:r.id,headSha:r.head_sha,event:r.event,status:r.status,conclusion:r.conclusion,createdAt:r.created_at,updatedAt:r.updated_at,htmlUrl:r.html_url}));
 const completed=report.runs.filter(r=>r.status==='completed');
 report.metrics.completed=completed.length;
 for(const outcome of ['success','failure','cancelled'])report.metrics[outcome]=completed.filter(r=>r.conclusion===outcome).length;
 const decided=report.metrics.success+report.metrics.failure;
 report.metrics.successRate=decided?Number((report.metrics.success/decided).toFixed(4)):null;
 report.status='PASS';
}catch(err){report.status='BLOCKED';report.error=String(err);}
writeFileSync(dir+'/quality-trend.json',JSON.stringify(report,null,2)+'\n');
console.log('Quality CI trend: '+report.status+'; '+report.metrics.completed+' completed, '+report.metrics.success+' success, '+report.metrics.failure+' failure, '+report.metrics.cancelled+' cancelled');
