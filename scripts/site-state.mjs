import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';

// site-state.json holds process state and evidence references only (stage, approval record, publish path,
// capability report). Content and service data stay in site.config.json and the source; nothing here is the
// single proof of a person's consent or of the platform's real settings, and pendingFields is derived by the gates.
export const STAGES=['preview','approved','released'];
export const PLATFORMS=['cloudflare-pages','cloudflare-workers','github-pages'];
export const emptyState=()=>({version:1,stage:'preview'});
export function readState(root='.'){
 const p=join(resolve(root),'site-state.json');
 if(!existsSync(p))return {state:null,error:null};
 try{return {state:JSON.parse(readFileSync(p,'utf8')),error:null};}catch(e){return {state:null,error:'site-state.json is not valid JSON'};}
}
export function writeState(root,state){
 const problems=validateState(state);
 if(problems.length)throw Error('Invalid site-state: '+problems.join('; '));
 writeFileSync(join(resolve(root),'site-state.json'),JSON.stringify(state,null,2)+'\n');
}
const sha40=/^[0-9a-f]{40}$/;
export function validateState(s){
 const p=[];
 if(!s||typeof s!=='object')return ['state must be an object'];
 if(s.stage&&!STAGES.includes(s.stage))p.push('stage must be one of '+STAGES.join('/'));
 for(const k of ['previewSha','approvedSha','prHeadSha','mergedSha'])if(s[k]!=null&&!sha40.test(s[k]))p.push(k+' must be a full 40-character SHA or null');
 if(s.approvedSha&&!(s.approvalBasis&&String(s.approvalBasis).trim()))p.push('approvedSha requires approvalBasis (the learner\'s own words or the message approved)');
 if(s.deploy){
  if(s.deploy.platform&&!PLATFORMS.includes(s.deploy.platform))p.push('deploy.platform must be one of '+PLATFORMS.join('/'));
  if(s.deploy.autoDeployProduction!=null&&typeof s.deploy.autoDeployProduction!=='boolean')p.push('deploy.autoDeployProduction must be boolean when known');
 }
 return p;
}
