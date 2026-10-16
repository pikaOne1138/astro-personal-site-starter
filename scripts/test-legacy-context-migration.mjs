import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {inspectLegacySite,migrateLegacySite} from './migrate-student-context.mjs';
function fixture(){
 const dir=mkdtempSync(join(tmpdir(),'atp-legacy-'));
 writeFileSync(join(dir,'site.config.json'),JSON.stringify({kind:'knowledge',layoutSlug:'field-notes',brand:{name:'舊筆記',tagline:'我的故事'},navigation:[],primaryCta:{label:'文章'},version:1}));
 writeFileSync(join(dir,'package.json'),JSON.stringify({scripts:{build:'astro build'}}));
 writeFileSync(join(dir,'article-original.md'),'學員未提交的文章');
 return dir;
}
test('legacy migration dry run leaves all content untouched',()=>{
 const root=fixture();try{
  const a=migrateLegacySite(root);assert.equal(a.status,'DRY_RUN');
  assert.ok(!existsSync(join(root,'PROJECT.md')));
  assert.equal(readFileSync(join(root,'article-original.md'),'utf8'),'學員未提交的文章');
 }finally{rmSync(root,{recursive:true,force:true})}
});
test('approved install preserves old content and package.json and refuses re-run',()=>{
 const root=fixture();try{
  const prior=readFileSync(join(root,'package.json'),'utf8');
  const r=migrateLegacySite(root,{apply:true});assert.equal(r.status,'INSTALLED');
  assert.ok(readFileSync(join(root,'PROJECT.md'),'utf8').includes('field-notes'));
  assert.ok(existsSync(join(root,'scripts/check-project-context.mjs')));
  assert.equal(readFileSync(join(root,'package.json'),'utf8'),prior);
  assert.equal(readFileSync(join(root,'article-original.md'),'utf8'),'學員未提交的文章');
  assert.equal(migrateLegacySite(root,{apply:true}).status,'BLOCKED');
 }finally{rmSync(root,{recursive:true,force:true})}
});
test('existing owned project context blocks migration without mutation',()=>{
 const root=fixture();try{
  writeFileSync(join(root,'PROJECT.md'),'# owner decisions');
  assert.equal(migrateLegacySite(root,{apply:true}).status,'BLOCKED');
  assert.equal(readFileSync(join(root,'PROJECT.md'),'utf8'),'# owner decisions');
 }finally{rmSync(root,{recursive:true,force:true})}
});
