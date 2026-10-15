import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
export function siteStatus(cwd=process.cwd()){
 const git=(args)=>{const p=spawnSync('git',args,{cwd,encoding:'utf8'});return p.status===0?p.stdout.trim():null;};
 const top=git(['rev-parse','--show-toplevel']);
 if(!top)return {git:false,stopBeforeEdit:false,reason:'No Git repository; inspect existing files before modifying'};
 const lines=(git(['status','--porcelain=v1','-z'])||'').split('\0').filter(Boolean);
 const conflicts=lines.filter(s=>/^(UU|AA|DD|AU|UA|DU|UD)/.test(s));
 const branch=git(['branch','--show-current'])||'DETACHED';
 const upstream=git(['rev-parse','--abbrev-ref','--symbolic-full-name','@{upstream}']);
 const remote=git(['remote','-v'])||'';
 const workflow=existsSync(resolve(cwd,'.git','rebase-merge'))||existsSync(resolve(cwd,'.git','MERGE_HEAD'));
 return {git:true,branch,head:git(['rev-parse','HEAD']),upstream,hasRemote:!!remote,dirtyCount:lines.length,dirtyPaths:lines.map(x=>x.slice(3)),conflicts:conflicts.length,mergeOrRebase:workflow,stopBeforeEdit:workflow||conflicts.length>0,reviewBeforeEdit:lines.length>0,productionPushApprovalRequired:branch==='main'||branch==='master',note:'Dirty changes require overlap review, not automatic global blocking; never reset, discard or force push.'};
}
if(process.argv[1]?.endsWith('site-status.mjs'))console.log(JSON.stringify(siteStatus(),null,2));
