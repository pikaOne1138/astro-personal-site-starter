#!/usr/bin/env node
// Student-owned, local-only design decision workspace. This never deploys,
// merges, exports a Starter or changes the website's published source.
import {readFileSync,writeFileSync,existsSync,mkdirSync,renameSync,rmSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';

const HELP = `Usage: node scripts/design-session.mjs <command> [--key "value"]
  init     --site "..." --scope "..."          create local session (never overwrite)
  add      --id one --title "..." --first "..." --flow "..." --mobile "..." --tradeoff "..."
  choose   --id one --reason "student decision"
  reject   --id one --reason "student rejection"
  note     --type confirmed|rejected|pending --text "..."
  preserve --text "existing element or behavior"
  show                                          display current session
  handoff                                       print portable plain-language summary
Options: --root <student website directory> (default: current working directory)

The AI must obtain the student's real design decision before choose/reject,
and must never treat choosing a candidate as permission to merge or publish.`;

function argsMap(values) {
 const [command,...rest]=values;
 const opts={};
 for(let i=0;i<rest.length;i+=2){
  const k=rest[i];
  if(!/^--[a-z-]+$/.test(k)||i+1>=rest.length||rest[i+1].startsWith('--'))
   throw Error('Invalid argument near '+(k||'<missing>'));
  if(k.slice(2) in opts)throw Error('Duplicate argument '+k);
  opts[k.slice(2)]=rest[i+1];
 }
 return {command,opts};
}
const safeText=(value,label,max=400)=>{
 if(typeof value!=='string'||!value.trim())throw Error(label+' is required');
 const clean=value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,' ');
 if(clean.length>max)throw Error(label+' too long');
 return clean;
};
const legalId=value=>{
 const s=safeText(value,'id',64);
 if(!/^[a-z][a-z0-9-]*$/.test(s))throw Error('id must be a lowercase slug');
 return s;
};
const uniquePush=(arr,text)=>{if(!arr.includes(text))arr.push(text);};
function validateSession(s){
 if(s?.schemaVersion!==1||!Array.isArray(s.options)||!Array.isArray(s.preserve)
  ||!s.notes||!['confirmed','rejected','pending'].every(k=>Array.isArray(s.notes[k])))
  throw Error('Unsupported or invalid design session; refusing to overwrite');
 for(const option of s.options){
  if(!['proposed','chosen','rejected'].includes(option.status))throw Error('Invalid option status');
 }
 if(s.options.filter(o=>o.status==='chosen').length>1)throw Error('Multiple chosen options');
}
export function sessionPath(root=process.cwd()){return join(resolve(root),'.ai','design-session.json');}
export function loadSession(root=process.cwd()){
 const file=sessionPath(root);
 if(!existsSync(file))throw Error('No design session yet; run init first');
 const s=JSON.parse(readFileSync(file,'utf8'));
 validateSession(s);
 return s;
}
function saveSession(root,session,{create=false}={}){
 validateSession(session);
 const file=sessionPath(root);
 if(create && existsSync(file))throw Error('Session already exists; refusing to replace existing decisions');
 mkdirSync(dirname(file),{recursive:true});
 const tmp=file+'.tmp-'+process.pid;
 try{
  writeFileSync(tmp,JSON.stringify(session,null,2)+'\n',{flag:'wx',mode:0o600});
  if(create && existsSync(file))throw Error('Session already exists');
  renameSync(tmp,file);
 }finally{if(existsSync(tmp))rmSync(tmp,{force:true});}
}
export function applyCommand(root,command,opts={}){
 if(command==='init'){
  const session={
   schemaVersion:1,site:safeText(opts.site,'site'),scope:safeText(opts.scope,'scope'),
   preserve:[],options:[],notes:{confirmed:[],rejected:[],pending:[]},
   selectedId:null,publicationApproved:false
  };
  saveSession(root,session,{create:true});return session;
 }
 const s=loadSession(root);
 if(command==='add'){
  const id=legalId(opts.id);
  if(s.options.some(x=>x.id===id))throw Error('Option already exists: '+id);
  s.options.push({id,title:safeText(opts.title,'title'),firstScreen:safeText(opts.first,'first'),
   sectionFlow:safeText(opts.flow,'flow'),mobileFlow:safeText(opts.mobile,'mobile'),
   tradeoff:safeText(opts.tradeoff,'tradeoff'),status:'proposed',reason:null});
 }else if(command==='choose'||command==='reject'){
  const id=legalId(opts.id),option=s.options.find(x=>x.id===id);
  if(!option)throw Error('Unknown option: '+id);
  const reason=safeText(opts.reason,'reason');
  if(command==='choose'){
   if(option.status==='rejected')throw Error('Rejected option cannot be chosen without a new user-approved proposal');
   for(const other of s.options)if(other.status==='chosen')other.status='proposed';
   option.status='chosen';option.reason=reason;s.selectedId=id;
  }else{
   option.status='rejected';option.reason=reason;
   if(s.selectedId===id)s.selectedId=null;
  }
 }else if(command==='note'){
  const type=opts.type;
  if(!['confirmed','rejected','pending'].includes(type))throw Error('type must be confirmed/rejected/pending');
  uniquePush(s.notes[type],safeText(opts.text,'text'));
 }else if(command==='preserve'){
  uniquePush(s.preserve,safeText(opts.text,'text'));
 }else throw Error('Unknown command: '+command);
 saveSession(root,s);
 return s;
}
const list=values=>values.length?values.map(v=>'- '+v).join('\n'):'- 尚無紀錄';
export function renderHandoff(s){
 validateSession(s);
 const chosen=s.options.find(x=>x.id===s.selectedId && x.status==='chosen');
 return [
  '# 網站設計交接摘要',
  '網站：'+s.site,
  '本次範圍：'+s.scope,
  '',
  '## 已確認',
  list([...s.notes.confirmed,...(chosen?['選用方案：'+chosen.title+'（'+chosen.id+'）；理由：'+chosen.reason]:[])]),
  '',
  '## 已否決（含理由）',
  list([...s.notes.rejected,...s.options.filter(x=>x.status==='rejected').map(x=>x.title+'：'+x.reason)]),
  '',
  '## 待確認',
  list([...s.notes.pending,...s.options.filter(x=>x.status==='proposed').map(x=>x.title+'（候選，尚未確認）')]),
  '',
  '## 不修改的部分',
  list(s.preserve),
  '',
  '## 候選構圖',
  ...s.options.map(x=>'### '+x.title+' ['+x.status+']\n首屏：'+x.firstScreen+'\n區段：'+x.sectionFlow+'\n手機：'+x.mobileFlow+'\n取捨：'+x.tradeoff),
  '',
  '此文件只紀錄設計決策；不是 Astro 修改、Build、Preview 或發布的證據。',
  '這份紀錄未授權合併／正式發布；長期確認的規則仍需由 AI 核對後寫入 PROJECT.md。'
 ].join('\n')+'\n';
}
export function runCli(argv=process.argv.slice(2)){
 try{
  const {command,opts}=argsMap(argv);
  if(!command||command==='help'){process.stdout.write(HELP);return 0;}
  const root=opts.root||process.cwd();
  const s=command==='show'||command==='handoff'?loadSession(root):applyCommand(root,command,opts);
  process.stdout.write(command==='show'?JSON.stringify(s,null,2)+'\n':command==='handoff'?renderHandoff(s):'Saved local design session ('+command+'); no website files changed.\n');
  return 0;
 }catch(e){process.stderr.write('Design session: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname))process.exitCode=runCli();
