#!/usr/bin/env node
// Scope contract for all six student design-improvement modes.
// Uses real Git differences to block unintended edits. Does not run AI or publish.
import {execFileSync} from 'node:child_process';
import {existsSync,mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {MODES} from '../.ai/astro-site-maintenance/references/design-review-evidence.mjs';

const git=(cwd,...args)=>execFileSync('git',args,{cwd,encoding:'utf8'}).trim();
const slug=s=>typeof s==='string'&&/^[a-z][a-z0-9-]{0,39}$/.test(s);
const safePath=s=>typeof s==='string'&&s!==''&&!s.startsWith('/')&&!s.includes('\\')&&
 !s.split('/').some(p=>p==='..'||p==='.'||p==='')&&!s.includes('\0');
const forbidden=s=>/^(AGENTS\.md|PROJECT\.md|site-state\.json|\.git\/|\.github\/|\.env|qa-artifacts\/)/.test(s);
const confPath=(cwd,id)=>join(cwd,'qa-artifacts','design-task-'+id+'.json');
function requireRepo(root){
 const cwd=resolve(root||process.cwd());
 if(resolve(git(cwd,'rev-parse','--show-toplevel'))!==cwd)throw Error('Run from repository root');
 if(['main','master'].includes(git(cwd,'branch','--show-current')))throw Error('Do not change the production branch');
 return cwd;
}
const changes=(cwd,base)=>{
 const committed=git(cwd,'diff','--name-only',base,'HEAD').split('\n').filter(Boolean);
 const working=git(cwd,'status','--porcelain','--untracked-files=all').split('\n').filter(Boolean)
  .map(line=>line.slice(3)).filter(p=>!p.startsWith('qa-artifacts/')&&p!=='.ai/design-session.json');
 return [...new Set([...committed,...working])];
};
export function startDesignTask({root,id,mode,scope,paths,pages,preserved}){
 const cwd=requireRepo(root);
 if(!slug(id)||!MODES.includes(mode))throw Error('Unknown design id or mode');
 if(typeof scope!=='string'||!scope.trim())throw Error('Describe the intended change');
 if(!Array.isArray(paths)||!paths.length||new Set(paths).size!==paths.length||paths.some(p=>!safePath(p)||forbidden(p)))
  throw Error('Explicit, unique, safe file paths required');
 if(!Array.isArray(pages)||!pages.length||pages.some(p=>!p.startsWith('/')))throw Error('At least one affected page is required');
 if(typeof preserved!=='string'||!preserved.trim())throw Error('Describe what must remain unchanged');
 if(changes(cwd,'HEAD').length)throw Error('Uncommitted work exists; do not use it as a hidden baseline');
 const file=confPath(cwd,id);
 if(existsSync(file))throw Error('Task already exists, do not overwrite past review evidence');
 const record={schemaVersion:1,id,mode,scope:scope.trim(),paths,pages,preserved:preserved.trim(),
  sourceCommit:git(cwd,'rev-parse','HEAD'),branch:git(cwd,'branch','--show-current'),
  humanVisualReview:'NOT TESTED',deployment:'NOT VERIFIED',releaseApproved:false};
 mkdirSync(join(cwd,'qa-artifacts'),{recursive:true});
 writeFileSync(file,JSON.stringify(record,null,2)+'\n',{flag:'wx'});
 return record;
}
export function reviewDesignTask({root,id}){
 const cwd=requireRepo(root);
 if(!slug(id))throw Error('Invalid task id');
 const file=confPath(cwd,id);
 if(!existsSync(file))throw Error('No saved design task');
 const record=JSON.parse(readFileSync(file,'utf8'));
 if(record.schemaVersion!==1||record.id!==id||!MODES.includes(record.mode))throw Error('Invalid task record');
 if(record.branch!==git(cwd,'branch','--show-current'))throw Error('Review must run on the original task branch');
 const base=git(cwd,'merge-base',record.sourceCommit,'HEAD');
 if(base!==record.sourceCommit)throw Error('Task baseline is no longer an ancestor; manual review needed');
 const changed=changes(cwd,record.sourceCommit);
 const outside=changed.filter(p=>!record.paths.includes(p));
 const protectedChanges=changed.filter(forbidden);
 return {...record,currentCommit:git(cwd,'rev-parse','HEAD'),changed,unexpected:outside,
  status:outside.length||protectedChanges.length?'FAIL':changed.length?'SCOPE_PASS':'NOT TESTED',
  note:'This checks Git file scope only, not rendered appearance or release approval.'};
}
export function runCli(argv=process.argv.slice(2)){
 try{
  const [command,...parts]=argv,options={};
  for(let i=0;i<parts.length;i+=2){if(!parts[i]?.startsWith('--')||i+1>=parts.length)throw Error('Expected paired --key value');options[parts[i].slice(2)]=parts[i+1];}
  const root=options.root,id=options.id;
  let result;
  if(command==='start')result=startDesignTask({root,id,mode:options.mode,scope:options.scope,
   paths:options.paths?.split(','),pages:options.pages?.split(','),preserved:options.preserved});
  else if(command==='review')result=reviewDesignTask({root,id});
  else throw Error('Usage: design-scope.mjs start --id slug --mode local-ui --scope "..." --paths src/file.astro --pages / --preserved "..." | review --id slug');
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
  return result.status==='FAIL'?1:0;
 }catch(e){process.stderr.write('Design scope: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
