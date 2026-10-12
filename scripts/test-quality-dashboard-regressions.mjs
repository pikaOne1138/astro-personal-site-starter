import {mkdtempSync,mkdirSync,cpSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=mkdtempSync(join(tmpdir(),'quality-dashboard-test-'));
const dst=join(root,'scripts');mkdirSync(dst,{recursive:true});
mkdirSync(join(root,'qa-artifacts/quality'),{recursive:true});
cpSync('scripts/finalize-quality-dashboard.mjs',join(dst,'finalize-quality-dashboard.mjs'));
const out=join(root,'qa-artifacts/quality');
const set=(name,obj)=>writeFileSync(join(out,name),JSON.stringify(obj));
const run=()=>spawnSync(process.execPath,['scripts/finalize-quality-dashboard.mjs'],{cwd:root,encoding:'utf8',env:{...process.env,GITHUB_STEP_SUMMARY:'',GITHUB_SHA:'a'.repeat(40),QA_REGISTRY:'success',QA_COMPILE:'success',QA_COVERAGE:'success',QA_HISTORY:'success',QA_BUILD:'success',QA_STARTER:'success',QA_DRAFTS:'success',QA_NAV:'success',QA_PLANNER:'success',QA_EDITORIAL:'success',QA_LAYOUTS:'success',QA_BLOCK_EFFECT:'success',QA_GUIDE:'success',QA_GUIDE_ZIP:'success',QA_DEPLOYMENT:'success'}});
const read=()=>JSON.parse(readFileSync(join(out,'quality-results.json'),'utf8'));
try{
 const item={group:'blocks',id:'button',type:'contract',status:'NOT TESTED',evidence:'scripts/verify-registry-contract.mjs'};
 set('quality-results.json',{items:[item],assertions:{'NOT TESTED':1,PASS:0}});
 set('external-preview.json',{status:'NOT TESTED'});
 let proc=run(),doc=read();
 if(proc.status!==0||doc.gates.G5.checks.deployment.status!=='NOT TESTED'||doc.assetCoverage.items[0].status!=='NOT TESTED'||doc.assetCoverage.structuralRegistrationAndSyntax[0].status!=='PASS')throw Error('False green: deployment missing or component contract wrongly promoted');
 console.log('Missing deployment remains NOT TESTED; syntax PASS does not promote Block functional contract: PASS');
 set('quality-results.json',{items:[item],assertions:{'NOT TESTED':1,PASS:0}});
 set('external-preview.json',{status:'FAIL',errors:['404']});
 proc=run();doc=read();
 if(proc.status===0||doc.releaseStatus!=='FAIL'||doc.gates.G5.checks.deployment.status!=='FAIL')throw Error('Failed external preview was not reflected in release failure');
 console.log('Broken deployed Preview propagates FAIL despite successful shell step: PASS');
}finally{rmSync(root,{recursive:true,force:true})}
