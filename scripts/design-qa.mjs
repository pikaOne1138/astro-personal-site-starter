#!/usr/bin/env node
// Explicit browser evidence capture for a committed student-site snapshot.
// Uses existing build + responsive QA. Does not claim a deployed URL or human review.
import {execFileSync} from 'node:child_process';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {fileURLToPath} from 'node:url';

export const REQUIRED=[1440,1280,768,390];
const git=(cwd,...args)=>execFileSync('git',args,{cwd,encoding:'utf8'}).trim();
const validId=x=>typeof x==='string'&&/^[a-z][a-z0-9-]{0,39}$/.test(x);
const pathIsWithin=(parent,child)=>child===parent||child.startsWith(parent+sep);
export function inspectCapture({root,id,stage,out,paths}){
 const cwd=resolve(root||process.cwd());
 if(!validId(id))throw Error('Invalid candidate id');
 if(!['before','after'].includes(stage))throw Error('Stage must be before or after');
 if(!out)throw Error('Explicit --out directory is required');
 const output=resolve(cwd,out);
 if(pathIsWithin(cwd,output)&&!pathIsWithin(resolve(cwd,'qa-artifacts'),output))
  throw Error('Evidence output under site root must stay in qa-artifacts/');
 if(existsSync(output))throw Error('Output already exists; use a fresh folder to avoid overwriting evidence');
 const top=resolve(git(cwd,'rev-parse','--show-toplevel'));
 if(top!==cwd)throw Error('Capture must run from the student repository root');
 const head=git(cwd,'rev-parse','HEAD');
 const dirty=git(cwd,'status','--porcelain','--untracked-files=all').split('\n')
   .filter(x=>x&&!x.endsWith('.ai/design-session.json')&&!x.includes('qa-artifacts/'));
 if(dirty.length)throw Error('Commit or resolve student-site edits before claiming a versioned screenshot: '+dirty.slice(0,3).join(', '));
 if(!existsSync(join(cwd,'site.config.json')))throw Error('Expected student site.config.json');
 if(!existsSync(join(cwd,'scripts','qa-student-responsive.mjs')))throw Error('Student Playwright QA script missing');
 const routes=paths?.length?paths:['/'];
 for(const p of routes)if(typeof p!=='string'||!p.startsWith('/')||p.includes('..')||p.includes('?'))throw Error('Invalid route '+p);
 return {cwd,output,id,stage,head,routes};
}
export function summarizeEvidence({source,qa}){
 if(qa.sourceCommit!==source.head)throw Error('Browser QA source SHA does not match committed student code');
 if(!Array.isArray(qa.rows))throw Error('No browser observations');
 const findings=[];
 for(const path of source.routes)for(const width of REQUIRED){
  const row=qa.rows.find(r=>r.path===path&&r.width===width);
  if(!row){findings.push({path,width,status:'NOT TESTED',reason:'Viewport not sampled'});continue;}
  const pass=row.status===200&&!row.overflow&&!(row.errors||[]).length&&!(row.brokenLocalImages||[]).length;
  findings.push({path,width,status:pass?'PASS':'FAIL',
   reason:pass?'Browser technical checks only':'HTTP / overflow / broken image / runtime error'});
 }
 return {
  schemaVersion:1,siteCommit:source.head,branch:source.branch||null,
  mode:'DESIGN_SCREENSHOT',id:source.id,stage:source.stage,
  evidenceDirectory:source.output,
  results:findings,
  technicalResult:findings.every(x=>x.status==='PASS')?'PASS':findings.some(x=>x.status==='FAIL')?'FAIL':'NOT TESTED',
  humanVisualReview:'NOT TESTED',publicPreview:'NOT VERIFIED',
  note:'Screenshots from a real committed site; not confirmation of aesthetics, accessible controls or deployment.'
 };
}
export function capture({root,id,stage,out,paths}){
 const source=inspectCapture({root,id,stage,out,paths});
 source.branch=git(source.cwd,'branch','--show-current');
 mkdirSync(source.output,{recursive:true});
 const env={...process.env,ATP_QA_OUT:source.output,GITHUB_SHA:source.head};
 const run=(command,args)=>execFileSync(command,args,{cwd:source.cwd,env,stdio:'inherit',shell:process.platform==='win32'});
 // Build is deliberately performed on the exact candidate checkout that screenshots capture.
 run('npm',['run','build']);
 run('npm',['run','qa:responsive']);
 const file=join(source.output,'results.json');
 if(!existsSync(file))throw Error('Browser QA produced no results.json');
 const report=summarizeEvidence({source,qa:JSON.parse(readFileSync(file,'utf8'))});
 writeFileSync(join(source.output,'design-evidence.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 if(report.technicalResult!=='PASS')throw Error('Screenshot evidence incomplete or failed; report retained at '+source.output);
 return report;
}
export function runCli(argv=process.argv.slice(2)){
 try{
  const [command,...parts]=argv,opts={};
  for(let i=0;i<parts.length;i+=2){if(!parts[i]?.startsWith('--')||!parts[i+1])throw Error('Expected --id --stage --out [--paths]');opts[parts[i].slice(2)]=parts[i+1];}
  if(command!=='capture')throw Error('Usage: design-qa.mjs capture --id editorial --stage before|after --out path --paths /,/services/');
  const report=capture({root:opts.root,id:opts.id,stage:opts.stage,out:opts.out,paths:opts.paths?.split(',')});
  process.stdout.write(JSON.stringify(report,null,2)+'\n');return 0;
 }catch(e){process.stderr.write('Design capture: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
