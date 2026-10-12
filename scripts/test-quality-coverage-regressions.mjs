import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,cpSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=mkdtempSync(join(tmpdir(),'qa-coverage-fixture-'));
const copy=p=>{const dst=join(root,p);mkdirSync(dirname(dst),{recursive:true});cpSync(p,dst)};
try {
 for(const p of ['scripts/verify-quality-coverage.mjs','docs/quality/ASSET-COVERAGE.json','src/data/blocks.registry.json','src/data/effects.registry.json','src/data/layout-directions.json','src/data/section-patterns.registry.json'])copy(p);
 const run=()=>spawnSync(process.execPath,['scripts/verify-quality-coverage.mjs'],{cwd:root,encoding:'utf8'});
 const expect=(label,shouldPass)=>{const result=run();if((result.status===0)!==shouldPass)throw Error(label+': expected '+(shouldPass?'PASS':'FAIL')+'; exit '+result.status+'; stdout '+result.stdout+'; stderr '+result.stderr);console.log(label+': '+(shouldPass?'PASS':'rejected'));};
 const blocksPath=join(root,'src/data/blocks.registry.json');
 const manifestPath=join(root,'docs/quality/ASSET-COVERAGE.json');
 const originalBlocks=readFileSync(blocksPath,'utf8'),originalManifest=readFileSync(manifestPath,'utf8');
 expect('baseline registered assets',true);
 const blocks=JSON.parse(originalBlocks);blocks.push({...blocks[0],id:'qa-undeclared-new-block'});
 writeFileSync(blocksPath,JSON.stringify(blocks));expect('new Block missing coverage mapping',false);
 writeFileSync(blocksPath,originalBlocks);
 const m=JSON.parse(originalManifest);delete m.blocks[blocks[0].id];
 writeFileSync(manifestPath,JSON.stringify(m));expect('removed coverage row',false);
 m.blocks[blocks[0].id]={...JSON.parse(originalManifest).blocks[blocks[0].id]};
 m.blocks['qa-stale-asset']=m.blocks[blocks[0].id];
 writeFileSync(manifestPath,JSON.stringify(m));expect('stale coverage row',false);
 writeFileSync(manifestPath,originalManifest);
 const fake=JSON.parse(originalManifest);fake.blocks[blocks[0].id].contract={status:'PASS',evidence:'does-not-exist.mjs'};
 writeFileSync(manifestPath,JSON.stringify(fake));expect('PASS without existing source evidence',false);
} finally {rmSync(root,{recursive:true,force:true});}
