import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const entry=readFileSync('.ai/astro-site-entry/SKILL.md','utf8');
const prompt=readFileSync('docs/student-builder-pack/START-MAINTENANCE-PROMPT.txt','utf8');
const student=readFileSync('docs/student-builder-pack/STUDENT-AGENTS.md','utf8');
const pack=readFileSync('scripts/build-student-pack.mjs','utf8');
const guide=readFileSync('src/pages/guide/index.astro','utf8');
const checks=[
 ['T1 explicit request skips menu', /具體需求直接進任務/.test(entry) && /已經說清楚，直接處理/.test(prompt) && /局部 UI/.test(entry)],
 ['T2 two-layer navigation', /第一層/.test(entry) && /第二層/.test(entry) && /建立新網站/.test(entry) && /改善目前的網站/.test(entry) && /維護與處理問題/.test(entry)],
 ['T3 switch from design to publishing', /改說「先新增文章」/.test(entry) && /astro-content-publishing/.test(entry) && /保存原本確認/.test(entry)],
 ['T4 existing-site protection', /不得執行 Starter 匯出器/.test(entry) && /不得重跑 Starter 匯出器/.test(prompt) && /PROJECT.md/.test(student)],
 ['T5 six improvement routes', ['設計健檢','參考網站改造','多種設計候選','局部區塊微調','品牌視覺改造','互動與動態精修'].every(x=>entry.includes(x))],
 ['negative: no repeated question and unknown choice', /已知資訊不重問/.test(entry) && /不知道／先看看／跳過/.test(entry)],
 ['negative: multi-intent and no false Skill claims', /同時觸發設計諮詢/.test(entry) && /不得宣稱使用/.test(entry)],
 ['A/B/C original technical mapping', /技術路線 \*\*C\*\*/.test(entry) && /技術路線 \*\*B\*\*/.test(entry) && /技術路線 \*\*A\*\*/.test(entry)],
 ['pack includes skills and canonical prompt', /'\.ai'/.test(pack) && /'docs'/.test(pack) && /'docs\/student-builder-pack\/STUDENT-AGENTS.md'/.test(pack)],
 ['guide imports maintenance source', /START-MAINTENANCE-PROMPT\.txt/.test(guide) && /startMaintenancePrompt/.test(guide)],
 ['publication requires approval', /沒有我明確同意，(?:不要|不得)合併或發布/.test(prompt)],
];
for(const [name,ok] of checks){console.log((ok?'PASS':'FAIL')+' '+name);}
assert.ok(checks.every(([,ok])=>ok),'Companion route contract check failed');
console.log('Static contract only: no model dialogue, actual ZIP extraction, real Preview or human QA verified.');
