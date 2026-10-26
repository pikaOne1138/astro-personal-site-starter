#!/usr/bin/env node
// CSS 結算層級稽核（audit-css-resolution.mjs）的靜態對照組與分類紀律測試。需要瀏覽器的動態對照組在 verify-starter-export（FULL）內執行。
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import assert from 'node:assert/strict';
import {levelOf,rulesOf,declsOf,varCalls,ingredientsOf,staticFindings,corpusFromDist,loadClassification,unclassified,staleEntries,CLASSIFICATION} from './audit-css-resolution.mjs';

// 層級：:root／html＝0，body（含屬性選擇器）＝1，其餘＝2
assert.equal(levelOf(':root'),0);assert.equal(levelOf('html'),0);assert.equal(levelOf(':root[data-x]'),0);
assert.equal(levelOf('body'),1);assert.equal(levelOf('body[data-site-family]'),1);assert.equal(levelOf('body[data-site-family][data-brand-palette="custom"]'),1);
assert.equal(levelOf('.pattern-slot'),2);assert.equal(levelOf('body .x'),2);assert.equal(levelOf('.layout-x[data-astro-cid-a]'),2);
// 解析
assert.deepEqual(rulesOf('@media(max-width:1px){.a{--x:1}}:root{--y:var(--z)}').map(r=>r.selector),['.a',':root']);
assert.deepEqual(declsOf('--a:color-mix(in srgb,var(--b) 10%,transparent);--c:1').map(d=>d.prop),['--a','--c']);
assert.deepEqual(varCalls('color-mix(in srgb,var(--a) 10%,var(--b,var(--c)))').map(v=>v.name),['--a','--b']);

// 原料：後備值裡的變數，只有前導變數在公式層或更高層沒有宣告時才算
assert.deepEqual(ingredientsOf('var(--p,var(--q))',()=>true),['--p']);
assert.deepEqual(ingredientsOf('var(--p,var(--q))',()=>false).sort(),['--p','--q']);

const tmp=mkdtempSync(join(tmpdir(),'css-res-test-'));
const corpus=(css,bodyStyle='')=>[{file:'/site.css',text:css},...(bodyStyle?[{file:'index.html<body style>',text:bodyStyle,inlineScope:'body'}]:[])];
const keys=list=>list.map(f=>f.formula+'⟵'+f.ingredient);
try{
  // 缺陷（殼階段 1 的 --line）：公式在 :root，原料由 <body style> 注入 → 必須抓到
  let f=staticFindings(corpus(':root{--ink:#242a24;--bg:#f4f1e8;--line:color-mix(in srgb,var(--ink) 25%,var(--bg))}','--ink:#1f2924;--bg:#f7f8f4'));
  assert.deepEqual(keys(f).sort(),['--line⟵--bg','--line⟵--ink'],'凍結的 --line 沒被抓到');
  // 修好：公式與原料同在 :root
  assert.deepEqual(staticFindings(corpus(':root{--ink:#1f2924;--bg:#f7f8f4;--line:color-mix(in srgb,var(--ink) 25%,var(--bg))}')),[]);
  // 公式在 body、原料在 :root：正常（公式層不高於原料的覆寫層）
  assert.deepEqual(staticFindings(corpus(':root{--a:#111}body{--b:var(--a)}')),[]);
  // 公式在 :root，某個元件區塊在本地覆寫原料（反白區塊換 content／surface）→ 抓到
  f=staticFindings(corpus(':root{--c:#111;--s:#eee;--line:color-mix(in srgb,var(--c) 20%,var(--s))}.inverse{--c:#eee;--s:#111}'));
  assert.deepEqual(keys(f).sort(),['--line⟵--c','--line⟵--s']);
  // 公式本身在元件層：原料在更高層不是問題
  assert.deepEqual(staticFindings(corpus(':root{--c:#111}.pattern-slot{--muted:color-mix(in srgb,var(--c) 70%,transparent)}')),[]);
  // 後備值不可達（前導變數在 :root 已宣告）：元件層的同名覆寫不影響結果 → 不列
  assert.deepEqual(staticFindings(corpus(':root{--brand-primary:#111;--x:var(--brand-primary,var(--brand))}.shell{--brand:#222}')),[]);
  // 後備值可達（前導變數沒有宣告）：列出
  assert.deepEqual(keys(staticFindings(corpus(':root{--x:var(--missing,var(--brand))}.shell{--brand:#222}'))),['--x⟵--brand']);
  // 純常數公式（沒有 var()）不是公式
  assert.deepEqual(staticFindings(corpus(':root{--a:color-mix(in srgb,#111 10%,#fff)}.x{--a:#000}')),[]);

  // 分類紀律：只收刻意固定／裝飾不存在，必須有理由與追蹤編號；沒有預設放行
  const cls=(entries)=>{const p=join(tmp,'cls.json');writeFileSync(p,JSON.stringify({entries}));return loadClassification(p);};
  assert.throws(()=>cls([{match:'x',class:'real-leak',reason:'這是真漏，不能登記',tracking:'pikaOne1138/ai-workbench#1'}]),/只能是/,'真漏不得登記');
  assert.throws(()=>cls([{match:'x',class:'intentional-fixed',reason:'短',tracking:'pikaOne1138/ai-workbench#1'}]),/理由/);
  assert.throws(()=>cls([{match:'x',class:'intentional-fixed',reason:'有理由但沒有追蹤編號',tracking:''}]),/追蹤編號/);
  const ok=cls([{match:'--zzz',class:'decoration-absent',reason:'這個裝飾在該宿主上不存在，等作者決定',tracking:'pikaOne1138/ai-workbench#17'}]);
  const sample=[{key:'--zzz|a|b'},{key:'--other|a|b'}];
  assert.deepEqual(unclassified(sample,ok).map(x=>x.key),['--other|a|b'],'沒被分類涵蓋的嫌疑必須列為未分類');
  assert.deepEqual(staleEntries([{key:'--other|a|b'}],ok).map(e=>e.match),['--zzz'],'過期的分類項目要被指出');
  // 真實分類檔本身要通過紀律檢查
  loadClassification(CLASSIFICATION);
}finally{rmSync(tmp,{recursive:true,force:true});}
console.log('css resolution: PASS（層級判定、公式／原料解析、凍結 --line 的靜態對照組、後備值可達性、分類紀律；動態對照組在 verify-starter-export）');
