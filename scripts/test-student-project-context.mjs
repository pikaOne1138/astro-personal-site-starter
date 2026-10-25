import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderStudentProject, installProjectContext } from './student-project-context.mjs';

const template = readFileSync(new URL('../docs/student-builder-pack/PROJECT-TEMPLATE.md', import.meta.url), 'utf8');
const agents = readFileSync(new URL('../docs/student-builder-pack/STUDENT-AGENTS.md', import.meta.url), 'utf8');
const plan = {
  version: 1, kind: 'knowledge', layoutSlug: 'field-notes',
  brand: {name:'我的書房',tagline:'分享閱讀筆記'},
  navigation: [{id:'articles',label:'文章',enabled:true},{id:'about',label:'關於',enabled:true}],
  primaryCta: {pageId:'articles',label:'閱讀文章'}
};
test('brief initializes student context without inventing audience or deploying', () => {
  const output = renderStudentProject(template, plan);
  assert.match(output, /網站名稱：「我的書房」/);
  assert.match(output, /field-notes/);
  assert.match(output, /主要讀者／來訪者：待確認/);
  assert.match(output, /尚未完成發布與驗收/);
  assert.doesNotMatch(output, /網站名稱：待確認/);
});
test('helper plan and unsafe multiline user string remain safe', () => {
  const output = renderStudentProject(template, {...plan,kind:'helper',brand:{name:'諮詢|中心\n偽造章節',tagline:'安全服務'}});
  assert.match(output, /助人者／個人專業服務型/);
  assert.doesNotMatch(output,/諮詢\|中心\n偽造/);
});
test('context files remain immutable on repeated setup', () => {
  const root = mkdtempSync(join(tmpdir(), 'atp-context-'));
  try {
    installProjectContext(root, plan, { template, agents });
    assert.ok(existsSync(join(root,'PROJECT.md')));
    assert.ok(existsSync(join(root,'AGENTS.md')));
    writeFileSync(join(root,'PROJECT.md'), '# 學員真正的長期決策\n');
    assert.throws(() => installProjectContext(root,plan,{template,agents}),/Refusing to overwrite/);
    assert.equal(readFileSync(join(root,'PROJECT.md'),'utf8'),'# 學員真正的長期決策\n');
  } finally { rmSync(root,{recursive:true,force:true}); }
});
test('different AI handoff has project context and environment safeguards', () => {
  assert.match(agents,/本機/);
  assert.match(agents,/未提交/);
  assert.match(agents,/PR/);
  assert.match(agents,/明確核准/);
  assert.match(template,/換 AI、換電腦或開新對話/);
});

test('design-change contract tells the AI which layer to edit and forbids bypassing tokens', () => {
  assert.match(agents, /設計修改：先判斷改哪一層/);
  assert.match(agents, /優先修改設計 Token/);
  assert.match(agents, /禁止在不同元件中重複寫死主題值/);
  assert.match(agents, /不要手改 `public\/theme\.css`/);
  assert.match(agents, /行內樣式（`style=""`）、`!important` 或任意字面值/);
  assert.match(agents, /這次改了哪一層/);
  assert.match(agents, /受影響頁面清單/);
  assert.match(agents, /G-11/);
  assert.match(agents, /design-fixed/);
  for (const row of ['森林綠','更圓潤','卡片的陰影淡一點','首頁按鈕要大一點','另一種首頁排版','手機版選單','全域值只為全站需求而改','沒有合適的 Token','clear-sans']) assert.ok(agents.includes(row), 'missing layer mapping: ' + row);
});

test('interview contract asks only essential question, checks unknown risks and stops questioning', () => {
  assert.match(agents, /每輪只問一個最重要的問題/);
  assert.match(agents, /停止規則/);
  assert.match(agents, /未知的未知/);
  assert.match(agents, /關鍵字只是調查假設/);
  assert.match(agents, /API Key/);
  assert.match(agents, /不開長訪談/);
  assert.match(template, /需求訪談與理解狀態/);
  assert.match(template, /尚未經學員認可的假設/);
});
test('starter context retains open question without pretending it has been resolved', () => {
  const result = renderStudentProject(template, plan);
  assert.match(result, /最需要釐清的一個問題：待討論/);
  assert.match(result, /影響下一步實作的安全或內容風險：尚未評估/);
});

test('students may skip details or delegate reversible design without publication approval',()=>{
 assert.match(agents,/跳過/);
 assert.match(agents,/讓 AI 發揮/);
 assert.match(agents,/跳過不是確認/);
 assert.match(agents,/AI 發揮不是授權發布/);
 assert.match(agents,/S 小修改/);
 assert.match(agents,/H 高風險/);
 assert.match(template,/AI_PROPOSED/);
 assert.match(template,/SKIPPED/);
 assert.match(template,/MISSING/);
 assert.match(template,/DO_NOT_PUBLISH/);
 const result=renderStudentProject(template,plan);
 assert.match(result,/學員選擇跳過的問題/);
 assert.match(result,/明確不公開的內容/);
});
