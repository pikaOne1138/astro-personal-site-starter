#!/usr/bin/env node
// 殼版型變數掃描（audit-shell-vars.mjs）與宿主契約的測試：含對照組（故意放的未定義／休眠引用必須抓得到）。
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {classify,assertShellVars,declaredIn,referencesIn,stripOtherFamilyRules,TEMPORARY_B,KNOWN_B,temporaryUsed} from './audit-shell-vars.mjs';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const tokens=read('src/styles/tokens.css')+'\n:root{--brand-primary:#000;--brand-text:#111}';
const mk=(...texts)=>texts.map((text,i)=>({file:'f'+i+'.css',text,host:true}));

// 對照組 1：休眠啟用（A）——引用 Token 才有的變數，宿主沒定義
let r=classify(mk('a:hover{background:color-mix(in srgb,var(--color-content) 8%,transparent)}'),tokens);
assert.deepEqual(r.A.map(x=>x.name),['--color-content'],'A 類沒抓到休眠啟用');
assert.throws(()=>assertShellVars(r),/休眠啟用/);
// 對照組 2：宿主以契約變數宣告後不再是 A
r=classify(mk('a:hover{background:var(--student-nav-hover-bg)}',':root{--student-nav-hover-bg:transparent}'),tokens);
assert.deepEqual(r.A,[]);assertShellVars(r);
// 對照組 3：未定義引用（C）；有後備值且在白名單才放行
r=classify(mk('a{color:var(--nope)}'),tokens);
assert.deepEqual(r.C.map(x=>x.name),['--nope']);assert.throws(()=>assertShellVars(r),/仍未定義/);
r=classify(mk('img{object-fit:var(--owner-fit,cover)}'),tokens);assertShellVars(r);
r=classify(mk('img{object-fit:var(--owner-fit)}'),tokens);assert.throws(()=>assertShellVars(r),/仍未定義/,'白名單名稱若沒有後備值也要擋');
r=classify(mk('p{width:var(--other-optional,1px)}'),tokens);assert.throws(()=>assertShellVars(r),/仍未定義/,'不在白名單的有後備值引用也要擋');
// 對照組 4：同名碰撞（B）——白名單內放行，白名單外擋下
r=classify(mk('body{--ink:#111}'),tokens);assert.deepEqual(r.B.map(x=>x.name),['--ink']);assertShellVars(r);
r=classify(mk('body{--space-2:3px}'),tokens);assert.deepEqual(r.B.map(x=>x.name),['--space-2']);assert.throws(()=>assertShellVars(r),/同名碰撞/);
// 對照組 5：別的家族的專屬規則不算引用（本站選不到），本站自己的家族規則與一般規則照算
const famCss='.family-page[data-design-family="reading-atlas"]{--fp-bg:var(--color-surface-alt)}@media(max-width:600px){.x[data-story-family="coach"] h1{font-family:var(--color-content)}}.family-page[data-design-family="mine"]{color:var(--color-primary)}.plain{background:var(--color-surface)}';
const stripped=stripOtherFamilyRules(famCss,'mine');
assert.ok(!stripped.includes('reading-atlas')&&!stripped.includes('coach')&&stripped.includes('mine')&&stripped.includes('.plain'),'家族規則剝除錯誤：'+stripped);
r=classify(mk(famCss),tokens,{slug:'mine'});assert.deepEqual(r.A.map(x=>x.name),['--color-primary','--color-surface'],'只該剩本站與一般規則的引用');
r=classify(mk(famCss),tokens,{});assert.ok(r.A.length>=4,'不帶 slug 時不剝除（保守）');
// 暫時白名單不得永久保留：每個暫時項目必須在 KNOWN_B 內、帶追蹤編號，且會被列出
for(const [n,ref] of Object.entries(TEMPORARY_B)){assert.ok(KNOWN_B[n],'暫時項目 '+n+' 不在 KNOWN_B');assert.match(ref,/^pikaOne1138\/ai-workbench#\d+$/,'暫時項目 '+n+' 缺追蹤編號');}
assert.deepEqual(temporaryUsed(classify(mk('.pattern-slot{--text:#222;--muted:#333}'),tokens)),['--muted → '+TEMPORARY_B['--muted'],'--text → '+TEMPORARY_B['--text']],'暫時項目要被列出');
// 解析器
assert.deepEqual([...declaredIn('a{--x:1;color:red}b{--y :2}')].sort(),['--x','--y']);
assert.equal(referencesIn('a{c:var(--a)}b{c:var(--b,1)}').get('--a').fallback,false);

// 宿主契約：共用元件只准引用 --student-* 元件變數，不得直接引用全域 Token；兩個宿主檔必須宣告同一組、且涵蓋元件用到的全部。
const nav=read('src/components/student/StudentNavigation.astro');
const exporter=read('scripts/export-starter.mjs');
const patternsSrc=(exporter.split('\n').find(l=>l.startsWith("assets['src/components/SelectedPatterns.astro']="))||'');
assert.ok(patternsSrc.length>500,'找不到 SelectedPatterns 內嵌來源');
const tokenRef=/var\(\s*--(?:color|font|radius|space|width|shadow)-|var\(\s*--image-filter/;
assert.ok(!tokenRef.test(nav),'StudentNavigation 不得直接引用全域 Token，請改用 --student-nav-* 契約變數');
assert.ok(!tokenRef.test(patternsSrc.replace(/\.skip:focus[^}]*\}/,'')),'SelectedPatterns 不得直接引用全域 Token，請改用 --student-pattern-*／--student-footer-* 契約變數');
assert.ok(tokenRef.test('a{b:var(--color-primary)}'),'契約檢查的 regex 對照組');
// 共用的家族元件（prototype 的 selected 元件；殼在文章列表／內頁會用到）：字族與強調色一律走 --student-family-*，不得直接引用 --brand-*
const family=['ArticleArchive','ArticleDetail','DesignInterior','ServiceSections','AboutSections'].map(n=>read('src/data/layout-assembly/'+n+'.astro')).join('\n');
assert.ok(!/var\(\s*--brand-/.test(family),'家族元件不得直接引用 --brand-*，請改用 --student-family-* 契約變數');
assert.ok(/var\(\s*--brand-/.test('a{b:var(--brand-primary)}'),'契約檢查的 regex 對照組');
const used=new Set([...(nav+patternsSrc+family).matchAll(/var\(\s*(--student-[a-z-]+)/g)].map(m=>m[1]));
const proto=declaredIn(read('src/styles/component-contract.css')),shell=declaredIn(read('src/data/art-direction-adapters/shared/component-contract.css'));
assert.ok(used.size>=10,'共用元件應該用到 ≥10 個契約變數：'+used.size);
for(const n of used){assert.ok(proto.has(n),'prototype 宿主契約缺 '+n);assert.ok(shell.has(n),'殼宿主契約缺 '+n);}
assert.deepEqual([...proto].sort(),[...shell].sort(),'兩個宿主契約檔宣告的名稱必須一致');
for(const n of proto)assert.ok(used.has(n),'契約宣告了沒人用的變數 '+n);
// 殼宿主的值必須是「無效果」的中性值（階段 1：值等於現況，不是新設計）
const neutral=/^(transparent|inherit|none|Georgia,serif|system-ui,sans-serif|var\(--brand\))$/;  // 後三者＝殼目前的實際效果（字族後備值、body 上的殼變數）
for(const m of read('src/data/art-direction-adapters/shared/component-contract.css').matchAll(/(--student-[a-z-]+)\s*:\s*([^;}]+)/g))assert.ok(neutral.test(m[2].trim()),'殼宿主契約的 '+m[1]+' 必須是中性值或殼現況的等值，實際：'+m[2]);
console.log('shell vars: PASS（掃描分類 A／B／C 對照組、元件只引用契約變數、兩個宿主契約一致且殼宿主為中性值）');
