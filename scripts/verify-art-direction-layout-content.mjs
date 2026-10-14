import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
 import {execFileSync} from 'node:child_process';
 import assert from 'node:assert/strict';
 const fixture='src/data/art-direction-layout-content.json';
 const original=readFileSync(fixture,'utf8');
 const initial=JSON.parse(original);
 const knowledge=['sidebar-journal','editorial-frontpage','card-journal','visual-stories','compact-dispatch','split-reader'];
 const helper=['portrait-profile','service-catalogue','studio-chapters','editorial-practice','question-led-practice'];
 const firstDetails={'sidebar-journal':'articles/first-note','editorial-frontpage':'articles/lead-story','card-journal':'articles/sample','visual-stories':'articles/sample','compact-dispatch':'articles/sample','split-reader':'articles/sample','portrait-profile':'services/individual','service-catalogue':'services/individual','studio-chapters':'services/individual','editorial-practice':'services/individual','question-led-practice':'services/individual'};
 let checks=0;
 function html(slug,route=''){const file=join('dist','layouts',slug,...(route?route.split('/'):[]),'index.html');assert.ok(existsSync(file),'missing '+file);return readFileSync(file,'utf8')}
 function build(name,data){writeFileSync(fixture,JSON.stringify(data,null,2)+'\n');execFileSync('npm',['run','build'],{stdio:'pipe',timeout:180000,maxBuffer:20*1024*1024});console.log('BUILD PASS',name)}
 function verifyBase(data){
 for(const slug of [...knowledge,...helper]){
  const kind=knowledge.includes(slug)?'knowledge':'helper';
  const group=data[kind];
  for(const route of ['',kind==='knowledge'?'articles':'services','about',firstDetails[slug]]){
   const body=html(slug,route);
   assert.ok(body.includes(group.siteName),'siteName missing '+slug+' '+route);
   checks++;
  }
  assert.ok(html(slug,'about').includes(group.about),'about field missing '+slug);
  checks++;
 }
 }
 try{
  build('default',initial);
  verifyBase(initial);
  const empty=structuredClone(initial);empty.knowledge.articles=[];empty.helper.services=[];empty.helper.questions=[];
  build('empty',empty);
  for(const slug of knowledge){assert.ok(html(slug).includes('目前沒有公開文章。'),'knowledge empty state '+slug);checks++}
  for(const slug of helper){assert.ok(html(slug).includes('尚未提供正式服務。'),'helper empty state '+slug);checks++}
  const multi=structuredClone(initial);multi.knowledge.articles[1].published=true;multi.knowledge.articles[1].title='第二篇文章驗證標題';
  multi.helper.services.push({...multi.helper.services[0],slug:'follow-up',title:'第二項服務驗證標題',published:true});
  build('multiple published',multi);
  for(const slug of knowledge){assert.ok(html(slug,'articles/second').includes('第二篇文章驗證標題'),'multi-article detail '+slug);checks++}
  for(const slug of helper){assert.ok(html(slug,'services/follow-up').includes('第二項服務驗證標題'),'multi-service detail '+slug);checks++}
  console.log('PASS',checks,'content contract route and fallback checks');
 }finally{writeFileSync(fixture,original)}
