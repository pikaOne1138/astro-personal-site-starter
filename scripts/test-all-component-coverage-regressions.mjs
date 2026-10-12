import {readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const base=JSON.parse(readFileSync('docs/quality/COMPONENT-COVERAGE.json','utf8'));
const dir=mkdtempSync(join(tmpdir(),'component-coverage-'));
const fixture=join(dir,'manifest.json');
try{
 const run=(label,mutate,pass)=>{
  const clone=structuredClone(base);mutate(clone);
  writeFileSync(fixture,JSON.stringify(clone));
  const child=spawnSync(process.execPath,['scripts/verify-all-astro-components.mjs'],{
   encoding:'utf8',env:{...process.env,QA_COMPONENT_MANIFEST:fixture},timeout:45000,maxBuffer:10*1024*1024
  });
  const actual=child.status===0;
  if(actual!==pass)throw Error(label+': expected '+(pass?'PASS':'FAIL')+', got '+child.status+' '+(child.stderr||child.stdout).slice(-1000));
  console.log((pass?'PASS ':'CORRECTLY REJECTED ')+label);
 };
 run('all components registered, Astro compiled',()=>{},true);
 const first=Object.keys(base.components)[0];
 run('component added without QA ownership',m=>delete m.components[first],false);
 run('stale component manifest row',m=>m.components['src/components/ghost.astro']=m.components[first],false);
 run('missing behavior responsibility',m=>delete m.components[first].behavior,false);
 run('unsupported static PASS without execution',m=>m.components[first].behavior.status='PASS',false);
}finally{rmSync(dir,{recursive:true,force:true});}
