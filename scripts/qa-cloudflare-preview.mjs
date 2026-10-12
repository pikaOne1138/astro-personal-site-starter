import {readFileSync,writeFileSync,mkdirSync,existsSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';

const dir='qa-artifacts/quality';mkdirSync(dir,{recursive:true});
const sha=process.env.PR_HEAD_SHA||'';
const repo=process.env.GITHUB_REPOSITORY||'';
const token=process.env.GITHUB_TOKEN||'';
const report={schemaVersion:1,headSha:sha,checkoutSha:process.env.GITHUB_SHA||null,source:'GitHub Cloudflare Pages check-run for the exact PR head SHA',status:'NOT TESTED',routes:[],download:null,errors:[],notes:[]};
const save=()=>writeFileSync(dir+'/external-preview.json',JSON.stringify(report,null,2)+'\n');
try {
 if(!/^[0-9a-f]{40}$/i.test(sha)||!repo.includes('/')||!token){
  report.notes.push('PR head SHA, repository or read-only GitHub checks token unavailable');save();process.exit(0);
 }
 const api='https://api.github.com/repos/'+repo+'/commits/'+sha+'/check-runs?per_page=100';
 const answer=await fetch(api,{headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+token,'User-Agent':'Astro-Workshop-Quality-Gate'},signal:AbortSignal.timeout(15000)});
 if(!answer.ok)throw Error('GitHub checks API HTTP '+answer.status);
 const payload=await answer.json();
 const candidates=(payload.check_runs||[]).filter(x=>x.name==='Cloudflare Pages'&&x.head_sha===sha&&x.conclusion==='success');
 if(!candidates.length){report.notes.push('No successful Cloudflare Pages check exists for exact PR head; deployment cannot be claimed verified');save();process.exit(0)}
 const check=candidates.sort((a,b)=>Date.parse(b.completed_at||0)-Date.parse(a.completed_at||0))[0];
 const summary=check.output?.summary||'';
 const matches=[...summary.matchAll(/href=['"](https:\/\/[^'"]+\.personal-site-starter\.pages\.dev)['"]/g)].map(x=>x[1]);
 const address=matches.map(x=>new URL(x)).find(x=>x.hostname.endsWith('.personal-site-starter.pages.dev')&&x.hostname!=='personal-site-starter.pages.dev');
 if(!address){report.notes.push('Cloudflare check did not contain an approved immutable Pages Preview URL');save();process.exit(0)}
 const declared=summary.match(/Latest commit:[\s\S]*?<code>\s*([a-f0-9]{7,40})\s*<\/code>/i)?.[1];
 if(declared&&!sha.startsWith(declared))throw Error('Cloudflare check SHA prefix mismatch: '+declared);
 report.previewUrl=address.origin+'/';report.deploymentCheckId=check.id;
 for(const route of ['/','/guide/','/guide/prepare/','/starter/','/blocks/','/effects/','/robots.txt']){
  const url=new URL(route,address);
  try{
   const res=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(18000)});
   const body=await res.text();
   const valid=res.status===200&&(route==='/robots.txt'?/^User-agent:\s*\*/mi.test(body):/<html\b/i.test(body)&&/<title\b/i.test(body))&&(route==='/guide/'?body.includes('download-builder-zip'):true);
   report.routes.push({route,status:res.status,ok:valid,bytes:Buffer.byteLength(body)});
   if(!valid)report.errors.push(route+': HTTP '+res.status+' or missing expected content');
  }catch(err){report.routes.push({route,ok:false,error:String(err)});report.errors.push(route+': '+String(err))}
 }
 const zipUrl=new URL('/AI-建站資料包.zip',address);
 try{
  const res=await fetch(zipUrl,{redirect:'follow',signal:AbortSignal.timeout(30000)});
  const bytes=Buffer.from(await res.arrayBuffer());
  const digest=buffer=>createHash('sha256').update(buffer).digest('hex');
  const ok=res.status===200&&bytes.length>100000&&bytes.subarray(0,2).toString()==='PK';
  report.download={status:res.status,validZip:ok,bytes:bytes.length,sha256:digest(bytes)};
  if(!ok)report.errors.push('Public student package unavailable or not a valid ZIP');
  if(ok && process.env.QA_REMOTE_BLACKBOX==='1'){
   const work=mkdtempSync(join(tmpdir(),'remote-student-zip-'));
   try {
    const archive=join(work,'downloaded-student.zip');writeFileSync(archive,bytes);
    const child=spawnSync(process.execPath,['scripts/verify-student-pack.mjs'],{
     env:{...process.env,STUDENT_PACK_ARCHIVE:archive,FULL_STUDENT_PACK_BUILD:'1'},
     encoding:'utf8',timeout:240000,maxBuffer:20*1024*1024
    });
    report.download.blackBox={status:child.status===0?'PASS':'FAIL',exitCode:child.status,
     verification:'Downloaded Cloudflare ZIP extracted independently; all 12 layout plans exported; knowledge/helper sites installed, built and verified with their bundled scripts',
     logTail:(child.stdout||'').slice(-2500),errorTail:(child.stderr||'').slice(-1200)};
    console.log('Remote student ZIP black-box: '+report.download.blackBox.status);
    if(child.status!==0)report.errors.push('Remote ZIP independent student generation/build/verify failed: '+(child.error?.message||child.stderr||'exit '+child.status).slice(-450));
   }finally{rmSync(work,{recursive:true,force:true})}
  }else report.download.blackBox={status:'NOT TESTED',reason:'Release black-box disabled, or ZIP was not downloadable'};

  if(report.checkoutSha===sha&&existsSync('dist/AI-建站資料包.zip')){
   report.download.localChecksumMatches=report.download.sha256===digest(readFileSync('dist/AI-建站資料包.zip'));
   if(!report.download.localChecksumMatches)report.errors.push('External package does not match build at the same SHA');
  }else report.download.localChecksumMatches='NOT TESTED: PR checkout may be synthetic merge SHA';
 }catch(err){report.download={ok:false,error:String(err)};report.errors.push('ZIP: '+String(err))}
 report.status=report.errors.length?'FAIL':'PASS';
 report.notes.push('Remote HTTP, actual ZIP availability and optional extracted ZIP build; student-owned GitHub PR/browser E2E, visual review, production and release authorization remain NOT TESTED');
 save();
 console.log('Cloudflare immutable Preview '+report.status+': '+report.previewUrl+'; routes '+report.routes.filter(x=>x.ok).length+'/'+report.routes.length+'; ZIP '+(report.download?.bytes||0)+' bytes');
 for(const e of report.errors)console.error('FAIL '+e);
 if(report.errors.length)process.exitCode=1;
}catch(err){report.status='BLOCKED';report.notes.push('Unable to acquire trustworthy deployment evidence: '+String(err));save();console.warn('External preview BLOCKED: '+String(err));}
