import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const inventory=JSON.parse(readFileSync('docs/art-direction/pr47-layout-handoff-registry.json','utf8'));
const originals=JSON.parse(readFileSync('src/data/layout-directions.json','utf8'));
const cases=['sidebar-journal','editorial-frontpage','card-journal','visual-stories','compact-dispatch','split-reader','portrait-profile','service-catalogue','studio-chapters','editorial-practice','question-led-practice'];
const items=inventory.items;
assert.equal(items.length,25);
assert.equal(new Set(items.map(x=>x.slug)).size,25);
assert.equal(items.filter(x=>x.kind==='knowledge').length,13);
assert.equal(items.filter(x=>x.kind==='helper').length,12);
assert.equal(items.filter(x=>x.origin==='main-12').length,12);
assert.equal(items.filter(x=>x.origin==='pr47-existing-2').length,2);
assert.equal(items.filter(x=>x.origin==='pr47-new-11').length,11);
assert.deepEqual(items.filter(x=>x.origin==='main-12').map(x=>x.slug),originals.map(x=>x.slug));
let checks=0;
for(const item of items){
 assert.ok(item.name&&item.structuralIdentity&&item.prototype?.home);
 assert.notEqual(item.assemblyStatus,'ready');
 assert.ok(item.qa?.humanVisual==='pending');
 const route=item.prototype.home.replace(/^\//,'').replace(/\/$/,'');
 const directPath=item.origin==='pr47-new-11'?'src/pages/layouts/'+item.slug+'/[...page].astro':'src/pages/layouts/'+item.slug+'/index.astro';
 assert.ok(existsSync(directPath),'Missing '+directPath);
 checks++;
 if(item.origin==='pr47-new-11'){
  assert.ok(existsSync(item.renderer));
  for(const key of ['archive','detail','about'])assert.ok(item.prototype[key]&&item.prototype[key].startsWith(item.prototype.home));
  assert.equal(item.contentContract,'art-direction-layout-content-v1');
  checks+=4;
 }
 if(item.origin==='pr47-existing-2'){
  const definition=JSON.parse(readFileSync('src/data/art-direction-definitions/'+item.slug+'.json'));
  assert.equal(definition.slug,item.slug);
  assert.equal(definition.assemblyStatus,'in-progress');
  checks+=2;
 }
}
console.log('PR47 HANDOFF REGISTRY PASS',items.length,'directions,',checks,'checks');
