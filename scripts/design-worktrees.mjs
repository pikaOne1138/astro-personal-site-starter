#!/usr/bin/env node
// Candidate worktrees for a student-owned Git repository. Creates isolated
// local design branches; does not generate layouts, push, deploy, or merge.
import {execFileSync} from 'node:child_process';
import {resolve,join,sep} from 'node:path';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const execute=(cwd,...args)=>execFileSync('git',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const requireSlug=(value)=>{
 if(typeof value!=='string'||!/^[a-z][a-z0-9-]{0,39}$/.test(value))throw Error('Candidate id must be a short lowercase slug');
 return value;
};
const ensureRepo=root=>{
 const repo=execute(root,'rev-parse','--show-toplevel');
 if(resolve(root)!==resolve(repo))throw Error('Run from the top of the student repository');
 return repo;
};
export function createSafeCandidate({root,slug,destination}){
 const repo=ensureRepo(root);
 const id=requireSlug(slug);
 if(!destination)throw Error('An explicit --dir is required');
 const target=resolve(repo,destination);
 if(target===repo||target.startsWith(repo+sep))throw Error('Worktree must live outside original repo');
 if(existsSync(target))throw Error('Destination already exists; refusing overwrite');
 const entries=execute(repo,'status','--porcelain','--untracked-files=all').split('\n').filter(Boolean);
 const unexpected=entries.filter(x=>!x.endsWith('.ai/design-session.json')&&!x.endsWith('.ai\\design-session.json'));
 if(unexpected.length)throw Error('Uncommitted changes in original site: '+unexpected.slice(0,5).join(', '));
 const branch='design/'+id;
 try{
  execute(repo,'show-ref','--verify','--quiet','refs/heads/'+branch);
  throw Error('Candidate branch already exists: '+branch);
 }catch(e){
  if(e.message.startsWith('Candidate branch already exists'))throw e;
  if(e.status!==1)throw Error('Unable to verify candidate branch: '+e.message);
 }
 execute(repo,'worktree','add','-b',branch,target,'HEAD');
 return {branch,path:target,base:execute(repo,'rev-parse','HEAD'),published:false};
}
export function listCandidates(root){
 const repo=ensureRepo(root);
 return execute(repo,'worktree','list','--porcelain').split('\n\n').filter(Boolean).map(block=>{
  const lines=block.split('\n');
  return {
   path:lines.find(x=>x.startsWith('worktree '))?.slice(9)||'',
   branch:lines.find(x=>x.startsWith('branch '))?.slice(7)||'',
   head:lines.find(x=>x.startsWith('HEAD '))?.slice(5)||''
  };
 }).filter(x=>x.branch.startsWith('refs/heads/design/'));
}
export function runCli(args=process.argv.slice(2)){
 try{
  const [command,...rest]=args,opts={};
  for(let i=0;i<rest.length;i+=2){
   if(!rest[i]?.startsWith('--')||i+1>=rest.length)throw Error('Expected --id, --dir, --root options');
   opts[rest[i].slice(2)]=rest[i+1];
  }
  const root=resolve(opts.root||process.cwd());
  if(command==='list')process.stdout.write(JSON.stringify(listCandidates(root),null,2)+'\n');
  else if(command==='create')process.stdout.write(JSON.stringify(createSafeCandidate({root,slug:opts.id,destination:opts.dir}),null,2)+'\n');
  else throw Error('Usage: design-worktrees.mjs create --id <slug> --dir <outside-repo-path> | list');
  return 0;
 }catch(e){process.stderr.write('Design candidate: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
