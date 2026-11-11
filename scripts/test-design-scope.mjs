import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {MODES} from '../.ai/astro-site-maintenance/references/design-review-evidence.mjs';
import {startDesignTask,reviewDesignTask} from './design-scope.mjs';

const cwd=mkdtempSync(join(tmpdir(),'atp-scope-'));
const git=(...args)=>execFileSync('git',['-C',cwd,...args],{encoding:'utf8'}).trim();
try{
 git('init','-b','main');git('config','user.email','test@example.invalid');git('config','user.name','ATP');
 mkdirSync(join(cwd,'src'));
 writeFileSync(join(cwd,'src','index.astro'),'<h1>Original</h1>\n');
 writeFileSync(join(cwd,'src','services.astro'),'<h1>Services</h1>\n');
 git('add','.');git('commit','-m','baseline');git('checkout','-b','feat/design-fix');
 for(const mode of MODES){
  const id=mode.replace(/[^a-z0-9-]/g,'');
  const r=startDesignTask({root:cwd,id,mode,scope:'首頁文字順序',paths:['src/index.astro'],pages:['/'],preserved:'服務頁不動'});
  assert.equal(r.mode,mode);
  assert.equal(reviewDesignTask({root:cwd,id}).status,'NOT TESTED');
 }
 assert.throws(()=>startDesignTask({root:cwd,id:'bad',mode:'local-ui',scope:'x',paths:['PROJECT.md'],pages:['/'],preserved:'keep'}),/safe file paths/);
 writeFileSync(join(cwd,'src','index.astro'),'<h1>Updated</h1>\n');
 assert.equal(reviewDesignTask({root:cwd,id:'local-ui'}).status,'SCOPE_PASS');
 writeFileSync(join(cwd,'src','services.astro'),'<h1>Unexpected change</h1>\n');
 const result=reviewDesignTask({root:cwd,id:'local-ui'});
 assert.equal(result.status,'FAIL');
 assert.deepEqual(result.unexpected,['src/services.astro']);
 console.log('PASS all six modes, scoped modification, untouched baseline and unexpected route change detected');
 console.log('NOT TESTED human design judgment or real model end-to-end');
}finally{rmSync(cwd,{recursive:true,force:true});}
