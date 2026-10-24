import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readState,writeState,emptyState} from './site-state.mjs';

// G-08 environment preflight. Read-only: never pushes, deploys or writes anywhere except site-state.json when asked.
// What cannot be known without a credential or a destructive probe is reported as "unknown", never guessed.
const run=(cmd,args,cwd)=>{const r=spawnSync(cmd,args,{cwd,encoding:'utf8'});return r.status===0?r.stdout.trim():null;};
export function environmentId(root){
 return createHash('sha256').update([process.version,process.platform,process.arch,resolve(root)].join('|')).digest('hex').slice(0,16);
}
const nodeAtLeast=(range,have)=>{
 const m=String(range||'').match(/>=\s*(\d+)\.(\d+)\.(\d+)/);if(!m)return null;
 const need=m.slice(1).map(Number),cur=have.replace(/^v/,'').split('.').map(Number);
 for(let i=0;i<3;i++){if(cur[i]>need[i])return true;if(cur[i]<need[i])return false;}return true;
};
export function inspectEnvironment(root='.',{now=new Date()}={}){
 root=resolve(root);
 const gitDir=run('git',['rev-parse','--git-dir'],root);
 const gitVersion=run('git',['--version'],root);
 const remote=gitDir?run('git',['remote','get-url','origin'],root):null;
 const wfDir=join(root,'.github/workflows');
 const workflows=existsSync(wfDir)?readdirSync(wfDir).filter(f=>/\.ya?ml$/.test(f)):[];
 let engines=null;try{engines=JSON.parse(readFileSync(join(root,'package.json'),'utf8')).engines?.node||null;}catch{}
 const nodeOk=engines?nodeAtLeast(engines,process.version):null;
 const caps={
  git:Boolean(gitVersion),
  repoInitialized:Boolean(gitDir),
  remote:remote?'configured':gitDir?'none':'unknown',
  node:{version:process.version,required:engines,satisfied:nodeOk},
  workflowFilesPresent:workflows.length>0,
  // pushing .github/workflows needs a token scope; reading it safely is not possible without a destructive probe
  workflowPush:'unknown',
  deployConnected:'unknown'
 };
 const routes=[];
 if(!caps.git)routes.push({gap:'沒有 git',route:'走 snapshot 推送：由 AI 準備檔案，請學員用網頁上傳或授權工具推送，不要把 .git 資料夾放進 ZIP。'});
 else if(!caps.repoInitialized)routes.push({gap:'尚未是 git 倉庫',route:'先在學員自己的帳號建立倉庫並初始化；不要覆蓋任何既有檔案。'});
 if(caps.git&&caps.repoInitialized&&caps.remote==='none')routes.push({gap:'沒有遠端',route:'請學員提供或建立自己的 GitHub Repository，AI 不猜網址。'});
 if(nodeOk===false)routes.push({gap:'Node 版本過舊（需要 '+engines+'）',route:'請升級 Node，或改用有支援版本的雲端工作區建置。'});
 routes.push({gap:'能否推送 .github/workflows 未知',route:'若推送被拒（403），改產生三步手動指引讓學員在 GitHub 網頁建立檔案；不要用破壞性推送試權限。'});
 routes.push({gap:'部署平台連接未知',route:'請學員在平台畫面確認，或提供唯讀查詢結果；未確認前 G-07 列 NOT TESTED。'});
 return {checkedAt:now.toISOString(),environmentId:environmentId(root),capabilities:caps,routes};
}
export function needsRecheck(state,root='.'){
 const c=state?.capabilities;
 if(!c?.checkedAt||!c.environmentId)return {recheck:true,reason:'no capability report yet'};
 if(c.environmentId!==environmentId(root))return {recheck:true,reason:'environment changed since the last check'};
 return {recheck:false,reason:'same environment'};
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname)){
 const args=process.argv.slice(2);const root=args.find(a=>!a.startsWith('--'))||'.';
 const report=inspectEnvironment(root);
 console.log('G-08 環境能力報告（唯讀；unknown 代表查不到，不是通過）');
 console.log(JSON.stringify(report.capabilities,null,2));
 for(const r of report.routes)console.log('- '+r.gap+' → '+r.route);
 if(args.includes('--write')){
  const {state,error}=readState(root);
  if(error)throw Error(error);
  writeState(root,{...(state||emptyState()),capabilities:{checkedAt:report.checkedAt,environmentId:report.environmentId,...report.capabilities}});
  console.log('written to site-state.json (capabilities only)');
 }
}
