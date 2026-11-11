import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {inspectCapture,summarizeEvidence} from './design-qa.mjs';
const root=mkdtempSync(join(tmpdir(),'atp-design-evidence-'));
const repo=join(root,'student');
const git=(...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8'}).trim();
try {
 mkdirSync(repo);mkdirSync(join(repo,'scripts'));
 git('init','-b','main');git('config','user.email','test@example.invalid');git('config','user.name','ATP Test');
 writeFileSync(join(repo,'site.config.json'),'{"kind":"knowledge"}\n');
 writeFileSync(join(repo,'scripts','qa-student-responsive.mjs'),'// placeholder for inspect-only test\n');
 git('add','.');git('commit','-m','student committed source');
 const source=inspectCapture({root:repo,id:'editorial',stage:'before',out:join(root,'evidence','before'),paths:['/','/services/']});
 assert.match(source.head,/^[0-9a-f]{40}$/);
 const qa={sourceCommit:source.head,rows:[]};
 for(const path of ['/','/services/'])for(const width of [1440,1280,768,390])qa.rows.push({
  path,width,status:200,overflow:false,brokenLocalImages:[],errors:[]
 });
 const complete=summarizeEvidence({source,qa});
 assert.equal(complete.technicalResult,'PASS');
 assert.equal(complete.humanVisualReview,'NOT TESTED');
 assert.equal(complete.publicPreview,'NOT VERIFIED');
 assert.equal(complete.results.length,8);
 const missing=summarizeEvidence({source,qa:{...qa,rows:qa.rows.slice(1)}});
 assert.equal(missing.results[0].status,'NOT TESTED');
 assert.equal(missing.technicalResult,'NOT TESTED');
 assert.throws(()=>summarizeEvidence({source,qa:{...qa,sourceCommit:'b'.repeat(40)}}),/source SHA/);
 assert.throws(()=>inspectCapture({root:repo,id:'../bad',stage:'after',out:join(root,'evidence','after')}),/candidate id/);
 assert.throws(()=>inspectCapture({root:repo,id:'a',stage:'before',out:join(repo,'src','overwrite')}),/qa-artifacts/);
 writeFileSync(join(repo,'site.config.json'),'{"kind":"helper"}\n');
 assert.throws(()=>inspectCapture({root:repo,id:'a',stage:'after',out:join(root,'other')}),/Commit or resolve/);
 console.log('PASS: committed snapshot, four-width route evidence, missing view and SHA mismatch guards');
 console.log('NOT TESTED: actual Playwright screenshot capture or Cloudflare Preview');
}finally{rmSync(root,{recursive:true,force:true});}
