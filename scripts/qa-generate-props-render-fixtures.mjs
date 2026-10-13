import {readFileSync,mkdirSync,writeFileSync,readdirSync,rmSync} from 'node:fs';
import {join,relative} from 'node:path';
const inventory=JSON.parse(readFileSync('qa-artifacts/quality/all-component-props-inventory.json','utf8'));
if(inventory.status!=='PASS'||inventory.componentCount!==110||inventory.items.length!==110)throw Error('Props fixture generator requires complete current-source inventory');
const dir='src/pages/__qa_props__';
rmSync(dir,{recursive:true,force:true});mkdirSync(dir,{recursive:true});
const sample={id:'sample',slug:'sample',title:'QA 中文標題',label:'測試選項',name:'範例名稱',description:'測試敘述',excerpt:'測試摘要',answer:'常見問題答案',question:'這是問題嗎？',href:'#main',url:'https://example.org/sample',src:'/effects-sample.svg',image:'/effects-sample.svg',alt:'示意圖片',date:'2026-10-13',month:'2026-10',count:1,meta:'測試資料',value:'測試數值',role:'專業服務',bio:'真實測試範例，不代表正式資格',price:'待設定',duration:'60 分鐘',format:'線上',note:'Demo fixture',category:'知識',publishedAt:'2026-10-13',tags:['示範'],items:[],posts:[],articles:[],links:[],columns:2,rows:[['甲','乙']],headers:['欄位甲','欄位乙'],text:'QA 測試',init:'QA',k:'測試',v:'值',t:'QA title',d:'QA description',you:'示範對象',need:'來源待設定'};
function value(prop){
 const n=prop.name.toLowerCase(),t=prop.type.trim();
 if(n==='kind')return 'knowledge';
 if(n==='theme'||n==='visualtheme')return 'paper';
 if(n==='page')return 'about';
 if(n==='current')return t.includes("'layouts'")?'layouts':'about';
 if(n==='root')return '/';
 if(n.includes('image')||n==='src')return '/effects-sample.svg';
 if(n==='url'||n.includes('url')||n.includes('embed'))return 'https://example.org/example';
 if(n.includes('href')||n==='link')return '/about/';
 if(n==='month')return '2026-10';
 if(n==='date')return '2026-10-13';
 if(n==='tags')return ['示範'];
 if(n==='headers')return ['欄位甲','欄位乙'];
 if(n==='rows')return t.includes('[][]')?[['甲','乙']]:[sample];
 if(n==='phrases')return ['一句測試文案'];
 if(n==='dates')return ['2026-10-13'];
 if(n==='suitable'||n==='unsuitable')return ['示範條件'];
 if(n==='sociallinks')return [];
 if(t==='boolean')return true;
 if(t==='number')return 2;
 const literals=[...t.matchAll(/'([^']+)'/g)].map(x=>x[1]);
 if(literals.length&&!t.includes('{'))return literals[0];
 if(t.includes('[][]'))return [['甲','乙']];
 if(t.includes('string[]'))return ['測試項目'];
 if(t.includes('number[]'))return [1];
 if(t.includes('[]')||t.startsWith('Array<'))return [sample];
 if(t.startsWith('{'))return sample;
 if(/^(Article|Item|Crumb|Resource|SocialLink)\[\]$/.test(t))return [sample];
 if(t==='Kind')return 'knowledge';
 if(t==='Theme')return 'paper';
 if(t==='PageId')return 'about';
 if(t==='string'||t.includes('string'))return 'QA 中文測試內容';
 return sample;
}
const rows=[];
for(let i=0;i<inventory.items.length;i++){
 const entry=inventory.items[i],id='c'+String(i).padStart(3,'0');
 const source=relative(dir,entry.path).replaceAll('\\','/');
 const importPath=source.startsWith('.')?source:'./'+source;
 const props=Object.fromEntries(entry.props.map(prop=>[prop.name,value(prop)]));
 const page=`---
import Component from '${importPath}';
const props=${JSON.stringify(props)};
---
<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Component QA fixture</title></head><body><main id="main" data-props-fixture="${id}"><Component {...props}>QA Slot 可讀內容</Component></main></body></html>
`;
 writeFileSync(join(dir,id+'.astro'),page);
 rows.push({id,path:entry.path,sourcePropCount:entry.props.length,props:Object.keys(props),route:'/__qa_props__/'+id+'/',expectedFile:'qa-dist/__qa_props__/'+id+'/index.html',status:'NOT TESTED'});
}
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/props-render-fixture-plan.json',JSON.stringify({schemaVersion:1,checkoutSha:process.env.GITHUB_SHA||null,components:rows.length,props:rows.reduce((n,x)=>n+x.sourcePropCount,0),rows,scope:'One generated nominal Props value per declared Prop; no invalid Props or integrated theme acceptance'},null,2)+'\n');
console.log('Generated '+rows.length+' independent Astro Pages with '+rows.reduce((n,x)=>n+x.sourcePropCount,0)+' Props fixture values');
