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
  assert.match(output, /網站名稱：我的書房/);
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
