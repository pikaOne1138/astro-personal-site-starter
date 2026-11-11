#!/usr/bin/env node
// Selectively apply an approved candidate's committed files on a feature branch.
// Never merges, pushes, deploys, edits main or changes unselected files.
import {execFileSync} from 'node:child_process';
import {resolve,join} from 'node:path';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {loadSession} from './design-session.mjs';

const run=(cwd,args,extra={})=>execFileSync('git',args,{cwd,encoding:extra.encoding||'utf8',
 stdio:['ignore','pipe','pipe'],maxBuffer:16*1024*1024});
const trim=(cwd,...args)=>run(cwd,args).trim();
const pathValid=p=>typeof p==='string'&&p.length>0&&!p.startsWith('/')&&!p.includes('\\')&&
 !p.split('/').some(s=>s==='..'||s==='.'||s==='')&&!p.includes('\0');
const protectedPath=p=>/^(?:AGENTS\.md|PROJECT\.md|site-state\.json|\.github\/|\.env|\.ai\/design-session\.json)/.test(p);
export function inspectAdoption({root,id,paths}){
 const cwd=resolve(root||process.cwd());
 const top=resolve(trim(cwd,'rev-parse','--show-toplevel'));
 if(cwd!==top)throw Error('Run at the student repository root');
 if(trim(cwd,'branch','--show-current')==='main'||trim(cwd,'branch','--show-current')==='master')
  throw Error('Create a non-production feature branch before adopting');
 const dirty=trim(cwd,'status','--porcelain','--untracked-files=all').split('\n').filter(x=>x&&!x.endsWith('.ai/design-session.json')&&!x.endsWith('.ai\\design-session.json'));
 if(dirty.length)throw Error('Original site has unsaved changes; review before adopting');
 const session=loadSession(cwd),candidate=session.options.find(x=>x.id===id);
 if(!candidate||candidate.status!=='chosen'||session.selectedId!==id)throw Error('Candidate not explicitly selected in design session');
 const branch='design/'+id;
 try{trim(cwd,'show-ref','--verify','refs/heads/'+branch);}catch{throw Error('Missing committed candidate branch '+branch);}
 const head=trim(cwd,'rev-parse','HEAD'),candidateHead=trim(cwd,'rev-parse',branch);
 if(trim(cwd,'merge-base',head,branch)!==head)throw Error('Candidate is not based on current feature branch HEAD');
 const changed=trim(cwd,'diff','--name-only','--diff-filter=ACMRTD',head,branch).split('\n').filter(Boolean);
 if(!changed.length)throw Error('Candidate has no committed changes');
 if(!Array.isArray(paths)||!paths.length||new Set(paths).size!==paths.length)throw Error('List exact approved paths, do not adopt an entire worktree implicitly');
 for(const p of paths){
  if(!pathValid(p)||protectedPath(p))throw Error('Unsafe or protected path '+p);
  if(!changed.includes(p))throw Error('Path is not a candidate change: '+p);
 }
 const changes=trim(cwd,'diff','--name-status',head,branch,'--',...paths).split('\n').filter(Boolean);
 if(changes.some(line=>/^[ADR]/.test(line)))throw Error('Added, deleted and renamed files require separate review; selective adoption handles tracked modifications only');
 const patch=run(cwd,['diff','--binary',head,branch,'--',...paths]);
 if(!patch.trim())throw Error('Selected candidate files produce no changes');
 // execFileSync with piped stdin below verifies the exact in-memory patch.
 const apply=argv=>execFileSync('git',argv,{cwd,encoding:'utf8',input:patch,stdio:['pipe','pipe','pipe']});
 apply(['apply','--check','--binary','-']);
 return {cwd,head,candidateHead,branch,paths,otherCandidateChanges:changed.filter(p=>!paths.includes(p)),patch,apply};
}
export function adoptCandidate({root,id,paths,approval,dryRun=true}){
 if(typeof approval!=='string'||!approval.trim())throw Error('Explicit student-approved scope required');
 const audit=inspectAdoption({root,id,paths});
 if(!dryRun){
  const manifest=join(audit.cwd,'qa-artifacts','design-adoption-'+id+'.json');
  if(existsSync(manifest))throw Error('An uncommitted adoption record already exists; review or undo it first');
  audit.apply(['apply','--binary','-']);
  const applied=run(audit.cwd,['diff','--binary',audit.head,'--',...paths]);
  mkdirSync(join(audit.cwd,'qa-artifacts'),{recursive:true});
  writeFileSync(manifest,JSON.stringify({id,base:audit.head,candidateSha:audit.candidateHead,
   paths,patchSha256:createHash('sha256').update(applied).digest('hex'),
   approval:approval.trim().slice(0,400),status:'APPLIED_UNCOMMITTED'},null,2)+'\n',{flag:'wx'});
 }
 return {status:dryRun?'READY_TO_REVIEW':'APPLIED_UNCOMMITTED',source:audit.branch,
  base:audit.head,candidateSha:audit.candidateHead,paths:audit.paths,omitted:audit.otherCandidateChanges,
  instruction:'Review git diff and run Build/QA; no commit, PR, merge or deploy was performed.'};
}
export function undoAdoption({root,id}){
 const cwd=resolve(root||process.cwd());
 if(!/^[a-z][a-z0-9-]{0,39}$/.test(id||''))throw Error('Invalid candidate id');
 const file=join(cwd,'qa-artifacts','design-adoption-'+id+'.json');
 if(!existsSync(file))throw Error('No adoption record found for '+id);
 const record=JSON.parse(readFileSync(file,'utf8'));
 if(record.id!==id||record.status!=='APPLIED_UNCOMMITTED'||!Array.isArray(record.paths)||!record.paths.every(pathValid))throw Error('Invalid adoption record');
 if(trim(cwd,'branch','--show-current')==='main'||trim(cwd,'branch','--show-current')==='master')throw Error('Refusing rollback on production branch');
 if(trim(cwd,'rev-parse','HEAD')!==record.base)throw Error('HEAD changed since adoption; manual review required');
 if(trim(cwd,'rev-parse','design/'+id)!==record.candidateSha)throw Error('Candidate changed since adoption');
 const dirty=trim(cwd,'status','--porcelain','--untracked-files=all').split('\n').filter(x=>x&&!x.endsWith('.ai/design-session.json')&&!x.includes('qa-artifacts/'));
 if(dirty.some(line=>!record.paths.includes(line.slice(3))))throw Error('Other uncommitted changes exist; refusing rollback');
 const current=run(cwd,['diff','--binary',record.base,'--',...record.paths]);
 const hash=createHash('sha256').update(current).digest('hex');
 if(hash!==record.patchSha256)throw Error('Selected files changed after adoption; refusing rollback');
 const patch=run(cwd,['diff','--binary',record.base,record.candidateSha,'--',...record.paths]);
 const apply=argv=>execFileSync('git',argv,{cwd,input:patch,encoding:'utf8',stdio:['pipe','pipe','pipe']});
 apply(['apply','--reverse','--check','--binary','-']);
 apply(['apply','--reverse','--binary','-']);
 record.status='REVERTED_UNCOMMITTED';
 writeFileSync(file,JSON.stringify(record,null,2)+'\n');
 return {status:record.status,paths:record.paths,committed:false,published:false};
}
export function runCli(argv=process.argv.slice(2)){
 try{
  const [command,...parts]=argv,options={};
  for(let i=0;i<parts.length;i+=2){if(!parts[i]?.startsWith('--')||i+1>=parts.length)throw Error('Expected --id --paths --approval');options[parts[i].slice(2)]=parts[i+1];}
  if(!['inspect','apply','undo'].includes(command))throw Error('Usage: design-adopt.mjs inspect|apply|undo --id slug --paths src/foo.astro --approval "student said..."');
  const paths=(options.paths||'').split(',').filter(Boolean);
  const result=command==='undo'?undoAdoption({root:options.root,id:options.id}):adoptCandidate({root:options.root,id:options.id,paths,approval:options.approval,dryRun:command!=='apply'});
  process.stdout.write(JSON.stringify(result,null,2)+'\n');return 0;
 }catch(e){process.stderr.write('Design adoption: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
