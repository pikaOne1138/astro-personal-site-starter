#!/usr/bin/env node
// Student project decision handoff: explicit, reviewable proposal for PROJECT.md.
// Does not approve a design change, alter website source, push, merge or deploy.
import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {loadSession} from './design-session.mjs';

const marker='## 9. 已確認的設計改善方向';
const safe=x=>String(x).replace(/[\r\n|<>]/g,' ').trim().slice(0,320);
const nonempty=x=>typeof x==='string'&&x.trim().length>0;
const git=(cwd,...args)=>execFileSync('git',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();

export function renderDecisionSection(session){
 const picked=session.options.find(x=>x.id===session.selectedId&&x.status==='chosen');
 if(!picked&&!session.notes.confirmed.length)throw Error('No confirmed decisions; proposals alone cannot update PROJECT.md');
 const rejected=[...session.notes.rejected,...session.options.filter(x=>x.status==='rejected').map(x=>x.title+'（'+x.reason+'）')];
 const confirmed=[...session.notes.confirmed,...(picked?[picked.title+'：'+picked.reason+'；首屏 '+picked.firstScreen+'；段落 '+picked.sectionFlow+'；手機 '+picked.mobileFlow]:[])];
 const list=values=>values.length?values.map(v=>'- '+safe(v)).join('\n'):'- 無';
 return [marker,'','> 以下是學員已確認的設計意圖與否決理由，並非已套用的網站版本、視覺驗收或發布核准。',
   '','### 已確認',list(confirmed),'','### 明確否決（保留理由）',list(rejected),
   '','### 必須保留不變',list(session.preserve),''].join('\n');
}
export function prepareSync({root,approval,apply=false}){
 const cwd=resolve(root||process.cwd());
 if(!nonempty(approval))throw Error('Student decision confirmation text required; never infer approval from a chosen candidate');
 const session=loadSession(cwd);
 const path=join(cwd,'PROJECT.md');
 if(!existsSync(path))throw Error('PROJECT.md missing; refusing to invent or overwrite student project context');
 const original=readFileSync(path,'utf8');
 if(!original.includes('# PROJECT.md')||!original.includes('## 6. 已確認的長期決策'))throw Error('Unrecognized PROJECT.md structure');
 if(original.includes(marker))throw Error('Existing design-decision section needs human reconciliation; no automatic overwrite');
 // Never overwrite uncommitted student edits, even if user has asked to update
 // confirmed decisions. An explicit staged commit or manual reconciliation is safer.
 try{
  const changes=git(cwd,'status','--porcelain','--','PROJECT.md');
  if(changes)throw Error('PROJECT.md contains uncommitted edits; preserve/review those first');
 }catch(e){if(e.message.startsWith('PROJECT.md contains'))throw e;throw Error('Cannot verify clean Git project context: '+e.message);}
 const section=renderDecisionSection(session);
 const text=original.replace(/\s*$/,'')+'\n\n'+section+
  '\n> 確認來源（學員原話）：'+safe(approval)+'\n';
 if(apply)writeFileSync(path,text,{flag:'w'});
 return {path,changed:apply,preview:text.slice(original.length),approval:safe(approval),publicationApproved:false};
}
export function runCli(argv=process.argv.slice(2)){
 try{
  const [cmd,...parts]=argv,opts={};
  for(let i=0;i<parts.length;i+=2){if(!parts[i]?.startsWith('--')||i+1>=parts.length)throw Error('Expected --root and --approval');opts[parts[i].slice(2)]=parts[i+1];}
  if(!['preview','apply'].includes(cmd))throw Error('Usage: design-project-sync.mjs preview|apply --approval "student confirmed..." [--root path]');
  const result=prepareSync({root:opts.root,approval:opts.approval,apply:cmd==='apply'});
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
  return 0;
 }catch(e){process.stderr.write('Design PROJECT sync: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
