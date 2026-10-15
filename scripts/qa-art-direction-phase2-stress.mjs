import {readFileSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const path='src/data/art-direction-layout-content.json',original=readFileSync(path,'utf8');
const source=JSON.parse(original);
const run=(command,args,env)=>{const p=spawnSync(command,args,{env:{...process.env,...env},stdio:'inherit',timeout:210000});if(p.status!==0)throw Error(command+' '+args.join(' ')+' failed '+p.status)};
const text='從日常的記錄重新整理個人知識與生活中的長期觀察'.repeat(7);
function configure(name){
 const c=structuredClone(source);
 if(name==='empty'){c.knowledge.articles=[];c.helper.services=[];c.helper.questions=[]}
 if(name==='single'){c.knowledge.articles=c.knowledge.articles.slice(0,1);c.helper.services=c.helper.services.slice(0,1);c.helper.questions=c.helper.questions.slice(0,1)}
 if(name==='long-cjk'){
   c.knowledge.headline=text;c.knowledge.about=text;c.knowledge.intro=text;
   c.helper.headline=text;c.helper.about=text;c.helper.intro=text;
   for(const item of c.knowledge.articles){item.title=text;item.summary=text;item.body=[text,text]}
   for(const item of c.helper.services){item.title=text;item.summary=text;item.body=[text,text]}
   for(const q of c.helper.questions){q.question=text;q.answer=text}
 }
 return c;
}
try{
 for(const scenario of ['empty','single','long-cjk']){
   writeFileSync(path,JSON.stringify(configure(scenario),null,2)+'\n');
   run('npm',['run','build']);
   run('node',['scripts/qa-art-direction-interiors.mjs'],{QA_SCENARIO:scenario,QA_VIEWPORTS:'1440,390'});
   console.log('SCENARIO PASS',scenario);
 }
}finally{writeFileSync(path,original)}
