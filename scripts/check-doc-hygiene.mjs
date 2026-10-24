#!/usr/bin/env node
// 檢查 AI 會讀的文件是否又累積了歷程、版本號、寫死的數量，或指向不存在的路徑。
// 規則來源：AGENTS.md 的「Keep these files timeless」。
// 例外請寫在 scripts/doc-hygiene-allowlist.json（每筆要有理由）。
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

// 會被 AI 讀、或隨學員資料包出貨的文件
const roots = ['AGENTS.md', 'COMPONENTS.md', '.ai', 'docs/student-builder-pack', 'docs/student-intake'];
// 原始來源快照、範例輸出與量測資料不是「規則文件」
const skip = [
  /\/source-snapshots\//,
  /^\.ai\/astro-editorial-layout-design\/examples\//,
  /^\.ai\/astro-editorial-layout-design\/references\/(site-analysis|measurements)\//,
  /^\.ai\/astro-editorial-layout-design\/recipes\/code\//,
];
const exts = /\.(md|txt)$/;

function walk(p, out = []) {
  const abs = join(root, p);
  if (!existsSync(abs)) return out;
  if (statSync(abs).isDirectory()) {
    for (const f of readdirSync(abs)) walk(join(p, f), out);
  } else if (exts.test(p) && !skip.some((r) => r.test(p))) out.push(p);
  return out;
}

const allow = existsSync(join(root, 'scripts/doc-hygiene-allowlist.json'))
  ? JSON.parse(readFileSync(join(root, 'scripts/doc-hygiene-allowlist.json'), 'utf8'))
  : [];
const allowed = (file, rule, text) =>
  allow.some((a) => a.file === file && a.rule === rule && (!a.match || text.includes(a.match)));

const rules = [
  ['pr-number', /(?<![A-Za-z])PR ?#?\d{2,}/, 'PR 編號'],
  ['branch-name', /\b(?:feat|fix|chore|claude)\/[\w.-]+/, '分支名稱'],
  ['version-marker', /(?<![\w.-])[vV]\d+(?:\.\d+)+\b|(?<![\w/.-])V[2-9]\b/, '版本號'],
  ['hardcoded-count', /(?<![\d.])\d{2,3}\s*(?:個|款|種|項|條)?\s*(?:Blocks?|blocks?|區塊元件|功能區塊|特效|Effects?|Section Patterns?|版型|Layouts?)\b/, '寫死的數量'],
];

const problems = [];
const files = roots.flatMap((r) => walk(r));

for (const file of files) {
  if (/(?:^|[-_./])(?:v\d+(?:[-_.]\d+)*|pr\d+)(?:[-_./]|$)/i.test(basename(file))) {
    if (!allowed(file, 'filename', '')) problems.push([file, 0, 'filename', '檔名含版本號或 PR 編號']);
  }
  const lines = readFileSync(join(root, file), 'utf8').split('\n');
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) inFence = !inFence;
    for (const [id, re, label] of rules) {
      const m = line.match(re);
      if (m && !allowed(file, id, line)) problems.push([file, i + 1, id, `${label}：${m[0]}`]);
    }
    // 反引號內的 repo 路徑必須存在
    for (const m of line.matchAll(/`((?:src|docs|scripts|public|\.ai)\/[^`\s]+)`/g)) {
      const p = m[1].replace(/[),.;:]+$/, '');
      if (/[<>*\[\]{}$]|\.\.\.|…/.test(p)) continue;
      if (!existsSync(join(root, p)) && !allowed(file, 'missing-path', p)) {
        problems.push([file, i + 1, 'missing-path', `路徑不存在：${p}`]);
      }
    }
  });
}

// Public page copy must not name a PR either: a visitor sees it, and it goes stale.
const walkSrc = (p, out = []) => {
  const abs = join(root, p);
  if (!existsSync(abs)) return out;
  if (statSync(abs).isDirectory()) readdirSync(abs).forEach((f) => walkSrc(join(p, f), out));
  else if (/\.(astro|ts)$/.test(p)) out.push(p);
  return out;
};
const srcFiles = walkSrc('src');
for (const file of srcFiles) {
  readFileSync(join(root, file), 'utf8').split('\n').forEach((line, i) => {
    const m = line.match(rules[0][1]);
    if (m && !allowed(file, 'pr-number', line)) problems.push([file, i + 1, 'pr-number', `PR 編號：${m[0]}`]);
  });
}

if (problems.length) {
  for (const [f, l, id, msg] of problems) console.log(`${f}${l ? ':' + l : ''} [${id}] ${msg}`);
  console.log(`\n${problems.length} 個問題（掃描 ${files.length} 份文件、${srcFiles.length} 份原始碼）`);
  process.exit(1);
}
console.log(`doc hygiene OK（掃描 ${files.length} 份文件、${srcFiles.length} 份原始碼）`);
