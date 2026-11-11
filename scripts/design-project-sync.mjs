#!/usr/bin/env node
// Update the EXISTING student PROJECT.md long-term decisions table.
// Explicit student confirmation required; proposals or chat notes never publish.
import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {loadSession} from './design-session.mjs';

const section='## 6. 已確認的長期決策';
const safe=x=>String(x).replace(/[\r\n|<>]/g,' ').trim().slice(0,300);
const git=(cwd,...args)=>execFileSync('git',args,{cwd,encoding:'utf8'}).trim();
export function buildDecisionRows(session,approval){
 const picked=session.options.find(x=>x.id===session.selectedId&&x.status==='chosen');
 const choices=[
  ...session.notes.confirmed.map(x=>['CONFIRMED',x,'學員已確認的設計偏好']),
  ...session.notes.rejected.map(x=>['REJECTED',x,'學員明確否決，後續不得再次引入']),
  ...session.preserve.map(x=>['PRESERVE',x,'既有內容／功能需保留不動']),
  ...session.options.filter(x=>x.status==='rejected').map(x=>['REJECTED',x.title,x.reason]),
  ...(picked?[['CONFIRMED',picked.title,picked.reason+'；首屏：'+picked.firstScreen+'；區段：'+picked.sectionFlow+'；手機：'+picked.mobileFlow]]:[])
 ];
 if(!choices.some(x=>x[0]==='CONFIRMED'))throw Error('No confirmed design choice; cannot sync provisional ideas');
 const date=new Date().toISOString().slice(0,10);
 return choices.map(([state,choice,reason])=>{
  const hash=createHash('sha256').update(state+'\0'+choice+'\0'+reason).digest('hex').slice(0,12);
  return {id:'D-'+hash,row:'| D-'+hash+' | '+date+' | '+safe(choice)+' | '+safe(reason)+' | '+state+' | '+safe(approval)+' | — |'};
 });
}
export function prepareSync({root,approval,apply=false}){
 const cwd=resolve(root||process.cwd());
 if(typeof approval!=='string'||!approval.trim())throw Error('Student confirmation text is required');
 const session=loadSession(cwd);
 const file=join(cwd,'PROJECT.md');
 if(!existsSync(file))throw Error('PROJECT.md missing');
 const original=readFileSync(file,'utf8');
 const start=original.indexOf(section);
 const end=start<0?-1:original.indexOf('\n## ',start+section.length);
 if(!original.includes('# PROJECT.md')||start<0||end<0)throw Error('Unrecognized PROJECT.md long-term decision section');
 const modified=git(cwd,'status','--porcelain','--','PROJECT.md');
 if(modified)throw Error('PROJECT.md contains uncommitted edits; resolve them first');
 const rows=buildDecisionRows(session,approval).filter(x=>!original.includes('| '+x.id+' |'));
 if(!rows.length)throw Error('No new confirmed decisions; refusing duplicate entries');
 const before=original.slice(0,end).replace(/\s*$/,'');
 const after=original.slice(end);
 // Keep the original decision table and its existing entries, including history.
 // The starter placeholder is documentation, not a verified decision.
 const prefix=before.replace(/^\| D-001 \| 待確認 \| 尚無 \| 首次討論後新增 \| 待確認 \| 待確認 \| — \|\s*$/m,'');
 const result=prefix+'\n'+rows.map(x=>x.row).join('\n')+'\n'+after;
 if(apply)writeFileSync(file,result);
 return {path:file,changed:apply,ids:rows.map(x=>x.id),preview:rows.map(x=>x.row).join('\n'),publicationApproved:false};
}
export function runCli(argv=process.argv.slice(2)){
 try{
  const [command,...args]=argv,opts={};
  for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||i+1>=args.length)throw Error('Expected --root and --approval');opts[args[i].slice(2)]=args[i+1];}
  if(!['preview','apply'].includes(command))throw Error('Usage: design-project-sync.mjs preview|apply --approval "student confirmed decision" [--root path]');
  const result=prepareSync({root:opts.root,approval:opts.approval,apply:command==='apply'});
  process.stdout.write(JSON.stringify(result,null,2)+'\n');return 0;
 }catch(e){process.stderr.write('Design PROJECT sync: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
