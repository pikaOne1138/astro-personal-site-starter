import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {inspectStartRecord,sheetHash,normalizeSheet} from './check-start-record.mjs';

const sheet=['> 1. 定位：給焦慮者的個人諮商站','> 2. 訪客的主要行動：預約初談','> 3. 頁面：首頁、服務、關於','> 4. 已確認：服務對象','> 5. AI 建議（未同意）：版型','> 6. 還缺：價格，先空著不會編'].join('\n');
const rec=(over={})=>{
 const f={route:'C',status:'已確認',basis:'學員回覆「對，可以開始」',at:'2026-10-25',sheet,hash:'',...over};
 return ['# PROJECT','','## 5. 需求訪談與理解狀態','','### 需求理解確認紀錄','',
  '- 入口路線：'+f.route,'- 狀態：'+f.status,'- 確認依據：'+f.basis,'- 確認時間：'+f.at,
  ...(f.hash?['- 確認單雜湊：'+f.hash]:[]),'- 確認單全文：',f.sheet,'','## 6. 已確認的長期決策','後面不屬於紀錄'].join('\n');
};
// missing section blocks with the learner message
let r=inspectStartRecord('# PROJECT\n\n沒有紀錄');
assert.equal(r.ok,false);assert.equal(r.blocking,true);assert.match(r.learnerMessage,/先完成訪談確認/);
// template default (unconfirmed) blocks
r=inspectStartRecord(readFileSync('docs/student-builder-pack/PROJECT-TEMPLATE.md','utf8'));
assert.equal(r.ok,false,'untouched template must not pass');
// valid record passes and quotes the date
r=inspectStartRecord(rec());assert.equal(r.ok,true,r.errors.join(';'));assert.equal(r.route,'C');assert.equal(r.confirmedAt,'2026-10-25');
// every route can qualify
for(const route of ['A','B'])assert.equal(inspectStartRecord(rec({route})).ok,true);
// invalid route / status / empty basis
assert.equal(inspectStartRecord(rec({route:'Z'})).ok,false);
assert.equal(inspectStartRecord(rec({status:'好像可以'})).ok,false);
assert.equal(inspectStartRecord(rec({basis:'待確認'})).ok,false);
// sheet missing a field
assert.equal(inspectStartRecord(rec({sheet:'> 1. 定位：x'})).ok,false);
// explicit skip must quote the learner
assert.equal(inspectStartRecord(rec({status:'學員明確略過',basis:'學員要求跳過',sheet:'尚無'})).ok,false);
r=inspectStartRecord(rec({status:'學員明確略過',basis:'學員說「照範本做就好」',sheet:'尚無'}));
assert.equal(r.ok,true,r.errors.join(';'));assert.equal(r.recordStatus,'學員明確略過');
// hash: matching passes, edited sheet after confirmation fails
const h=sheetHash(sheet);
assert.equal(inspectStartRecord(rec({hash:h})).ok,true);
r=inspectStartRecord(rec({hash:h,sheet:sheet.replace('預約初談','寫文章')}));
assert.equal(r.ok,false);assert.match(r.errors.join(),/hash mismatch/);
assert.equal(sheetHash(sheet),sheetHash(normalizeSheet(sheet)),'hash ignores quoting markers');
// exporter gate: no record -> blocked before anything is written; record -> not blocked by G-00
const tmp=mkdtempSync(join(tmpdir(),'start-record-'));
try{
 const plan=join(tmp,'plan.json');writeFileSync(plan,'{}');
 const none=join(tmp,'NOTES.md');writeFileSync(none,'# notes\n');
 let run=spawnSync(process.execPath,['scripts/export-starter.mjs',plan,join(tmp,'out'),'--require-start-record',none],{encoding:'utf8'});
 assert.notEqual(run.status,0);assert.match(run.stderr,/G-00 開工紀錄 FAIL/);
 const good=join(tmp,'PROJECT.md');writeFileSync(good,rec());
 run=spawnSync(process.execPath,['scripts/export-starter.mjs',plan,join(tmp,'out2'),'--require-start-record',good],{encoding:'utf8'});
 assert.match(run.stdout,/G-00 開工紀錄 PASS/);assert.doesNotMatch(run.stderr,/G-00/,'a valid record must pass the start gate (later plan validation may still fail on the empty fixture plan)');
 // CLI wording
 run=spawnSync(process.execPath,['scripts/check-start-record.mjs',none],{encoding:'utf8'});
 assert.equal(run.status,1);assert.match(run.stderr,/G-00 開工紀錄 FAIL/);
 run=spawnSync(process.execPath,['scripts/check-start-record.mjs',good],{encoding:'utf8'});
 assert.equal(run.status,0);assert.match(run.stdout,/不證明真人同意/);
}finally{rmSync(tmp,{recursive:true,force:true});}
console.log('G-00 start record tests PASS (fixtures only; no human consent is proven)');
