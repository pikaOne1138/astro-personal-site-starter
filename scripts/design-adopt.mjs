#!/usr/bin/env node
// Selectively apply an approved candidate's committed files on a feature branch.
// Never merges, pushes, deploys, edits main or changes unselected files.
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
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
 const patch=run(cwd,['diff','--binary',head,branch,'--',...paths]);
 if(!patch.trim())throw Error('Selected candidate files produce no changes');
 try{run(cwd,['apply','--check','--binary','-'],{input:patch});}catch{}
 // execFileSync with piped stdin below verifies the exact in-memory patch.
 const apply=argv=>execFileSync('git',argv,{cwd,encoding:'utf8',input:patch,stdio:['pipe','pipe','pipe']});
 apply(['apply','--check','--binary','-']);
 return {cwd,head,candidateHead,branch,paths,otherCandidateChanges:changed.filter(p=>!paths.includes(p)),patch,apply};
}
export function adoptCandidate({root,id,paths,approval,dryRun=true}){
 if(typeof approval!=='string'||!approval.trim())throw Error('Explicit student-approved scope required');
 const audit=inspectAdoption({root,id,paths});
 if(!dryRun)audit.apply(['apply','--binary','-']);
 return {status:dryRun?'READY_TO_REVIEW':'APPLIED_UNCOMMITTED',source:audit.branch,
  base:audit.head,candidateSha:audit.candidateHead,paths:audit.paths,omitted:audit.otherCandidateChanges,
  instruction:'Review git diff and run Build/QA; no commit, PR, merge or deploy was performed.'};
}
export function runCli(argv=process.argv.slice(2)){
 try{
  const [command,...parts]=argv,options={};
  for(let i=0;i<parts.length;i+=2){if(!parts[i]?.startsWith('--')||i+1>=parts.length)throw Error('Expected --id --paths --approval');options[parts[i].slice(2)]=parts[i+1];}
  if(!['inspect','apply'].includes(command))throw Error('Usage: design-adopt.mjs inspect|apply --id slug --paths src/foo.astro[,src/bar.css] --approval "student said..."');
  const paths=(options.paths||'').split(',').filter(Boolean);
  const result=adoptCandidate({root:options.root,id:options.id,paths,approval:options.approval,dryRun:command!=='apply'});
  process.stdout.write(JSON.stringify(result,null,2)+'\n');return 0;
 }catch(e){process.stderr.write('Design adoption: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
