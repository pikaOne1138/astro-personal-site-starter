import {readFileSync,writeFileSync,renameSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
const plan=JSON.parse(readFileSync('qa-artifacts/quality/props-render-fixture-plan.json','utf8'));
const dir=process.env.QA_PROPS_DIST||'qa-dist';
function verify(){
 const errors=[],rows=[];
 for(const item of plan.rows){
  const path=resolve(dir,'__qa_props__',item.id,'index.html');
  if(!existsSync(path)){errors.push(item.id+': missing built Astro fixture HTML');rows.push({...item,status:'FAIL',reason:'missing built HTML'});continue}
  const html=readFileSync(path,'utf8'),match=html.match(/<main\\b[^>]*data-props-fixture="([^"]+)"[^>]*>([\\s\\S]*?)<\\/main>/i);
  const content=(match?.[2]||'').replace(/<[^>]*>/g,' ').replace(/\\s+/g,' ').trim();
  const passed=match?.[1]===item.id&&content.length>0;
  if(!passed)errors.push(item.id+': missing component-rendered content or fixture ID');
  rows.push({...item,status:passed?'PASS':'FAIL',visibleTextLength:content.length});
 }
 return {errors,rows};
}
if(plan.components!==110||plan.props<400)throw Error('Props fixture plan is unexpectedly incomplete');
const normal=verify();
if(normal.errors.length)throw Error('Nominal Astro Props fixture failure:\\n'+normal.errors.slice(0,15).join('\\n'));
const first=resolve(dir,'__qa_props__',plan.rows[0].id,'index.html'),missing=first+'.fault';
renameSync(first,missing);let negative;
try{negative=verify();if(negative.errors.length!==1||!negative.errors[0].includes(plan.rows[0].id+': missing built Astro fixture HTML'))throw Error('Wrong validator rejected missing fixture: '+negative.errors.join('; '))}
finally{renameSync(missing,first)}
const restored=verify();if(restored.errors.length)throw Error('Failed to restore generated fixture after fault injection');
mkdirSync('qa-artifacts/quality',{recursive:true});
const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',componentCount:restored.rows.length,nominalPropValues:plan.props,rows:restored.rows,negativeCase:{id:plan.rows[0].id,expected:'missing built Astro fixture HTML',observed:negative.errors[0],passed:true},limitations:'One representative nominal value per declared Prop; invalid inputs, individual state changes, keyboard and cross-theme/layout combinations remain NOT TESTED'};
writeFileSync('qa-artifacts/quality/all-component-props-render.json',JSON.stringify(report,null,2)+'\\n');
console.log('PASS '+report.componentCount+' Astro component independent nominal Props render fixtures; '+report.nominalPropValues+' Props values; correct negative validator diagnostic');
