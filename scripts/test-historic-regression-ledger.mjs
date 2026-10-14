import {mkdtempSync,mkdirSync,cpSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=mkdtempSync(join(tmpdir(),'qa-history-fixture-'));
try {
 for(const p of ['scripts/verify-historic-regressions.mjs','docs/quality/HISTORIC-REGRESSIONS.json']){
  mkdirSync(dirname(join(root,p)),{recursive:true});cpSync(p,join(root,p));
 }
 const path=join(root,'docs/quality/HISTORIC-REGRESSIONS.json');
 const original=readFileSync(path,'utf8');
 const run=()=>spawnSync(process.execPath,['scripts/verify-historic-regressions.mjs'],{cwd:root,encoding:'utf8'});
 const expect=(label,pass)=>{const r=run();if((r.status===0)!==pass)throw Error(label+' expected '+(pass?'PASS':'FAIL')+' got '+r.status+' '+r.stdout+' '+r.stderr);console.log(label+': '+(pass?'PASS':'correctly rejected'))};
 expect('baseline history ledger',true);
 const x=JSON.parse(original);delete x.defects.N6;writeFileSync(path,JSON.stringify(x));expect('missing N6',false);
 writeFileSync(path,original);
 const y=JSON.parse(original);y.defects.F10={gate:'G3',status:'NOT TESTED',evidence:''};writeFileSync(path,JSON.stringify(y));expect('invalid fault F10 included',false);
 writeFileSync(path,original);
 const z=JSON.parse(original);z.defects.W10={gate:'G2',status:'PASS',evidence:'missing-evidence.json'};writeFileSync(path,JSON.stringify(z));expect('unsupported PASS',false);
}finally{rmSync(root,{recursive:true,force:true});}
