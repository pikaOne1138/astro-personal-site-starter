import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {validateDesignReview,MODES,REQUIRED_WIDTHS} from '../.ai/astro-site-maintenance/references/design-review-evidence.mjs';
const read=p=>readFileSync(p,'utf8');
const shared=read('.ai/astro-site-maintenance/references/design-improvement.md');
const links=[
 ['astro-design-consultation',['設計健檢','參考網站改造','多種設計候選']],
 ['astro-layout-craft',['多方案比較','候選']],
 ['astro-editorial-layout-design',['健檢','截圖']],
 ['astro-ui-craft',['局部精修','品牌視覺']],
 ['astro-motion-craft',['動態精修','prefers-reduced-motion']]
];
const errors=[];
for(const [skill,terms] of links){
 const path='.ai/'+skill+'/SKILL.md',content=read(path);
 if(!content.includes('design-improvement.md'))errors.push(skill+' missing shared workflow');
 for(const term of terms)if(!content.includes(term))errors.push(skill+' missing '+term);
}
for(const name of ['設計健檢','參考網站改造','多種設計候選','局部區塊微調','品牌視覺改造','互動與動態精修'])if(!shared.includes(name))errors.push('missing mode '+name);
assert.deepEqual(errors,[],'six-mode Skill linkage');

const entry=read('.ai/astro-site-entry/SKILL.md');
const handoff=read('.ai/SHARED-DESIGN-HANDOFF.md');
assert.ok(entry.includes('不預先展開第二層細項'),'first menu must remain compact');
assert.ok(entry.includes('不要另創第三份選單'),'avoid choice overload');
assert.ok(handoff.includes('不是秘密、也不是禁語'),'Skill terminology is public, not prohibited');
assert.ok(handoff.includes('不要把理解這些名稱當作操作前提'),'no jargon prerequisite');
assert.ok(shared.includes('簡單線框'),'structural comparison has visual fallback');
assert.ok(shared.includes('已確認')&&shared.includes('已否決（含理由）')&&shared.includes('待確認'),'portable decision handoff');

const base={
 mode:'local-ui',site:'https://example.test',scope:'首頁第二段圖片',
 preserved:'文章 URL、表單目的地、主導航',
 findings:[{observation:'實際截圖顯示圖片偏小',visitorImpact:'閱讀焦點不明',hypothesis:'欄比過窄',change:'調整局部圖片欄比',verification:'四尺寸同路徑比較'}],
 qa:{build:'PASS',preview:'NOT TESTED',visual:'NOT TESTED'},merged:false
};
for(const mode of MODES){assert.deepEqual(validateDesignReview({...base,mode}),[],'valid draft '+mode);}
const invalid=[
 [{...base,mode:'wrong'},'unknown improvement mode'],
 [{...base,qa:{...base.qa,preview:'PASS'}},'preview PASS requires'],
 [{...base,qa:{...base.qa,visual:'PASS'}},'visual PASS requires'],
 [{...base,merged:true},'merge forbidden'],
 [{...base,findings:[{...base.findings[0],observation:''}]},'observation required']
];
for(const [value,expected] of invalid){
 assert.ok(validateDesignReview(value).some(x=>x.includes(expected)),'must reject '+expected);
}
const verified={...base,qa:{build:'PASS',preview:'PASS',visual:'PASS'},previewUrl:'https://preview.example.test',headSha:'a'.repeat(40),visualEvidence:REQUIRED_WIDTHS.map(width=>({width,before:'before-'+width+'.png',after:'after-'+width+'.png',reviewedBy:'human-reviewer'}))};
assert.deepEqual(validateDesignReview(verified),[],'complete evidence contract');
assert.ok(validateDesignReview({...verified,visualEvidence:verified.visualEvidence.slice(1)}).some(x=>x.includes('1440px')),'missing viewport blocked');
const zip='public/AI-建站資料包.zip';
if(existsSync(zip)){
 const bytes=readFileSync(zip);
 for(const p of ['.ai/astro-site-maintenance/references/design-improvement.md','.ai/astro-site-maintenance/references/design-review-evidence.mjs']){
  assert.ok(bytes.includes(Buffer.from(p)),'student ZIP missing '+p);
 }
 console.log('PASS student ZIP includes shared flow and validation helper');
}
console.log('PASS six workflows linked; evidence contract valid/negative fixtures tested');
console.log('NOT TESTED actual model responses, human visual review and real student-site modifications');
