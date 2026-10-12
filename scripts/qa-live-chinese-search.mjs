import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {mkdirSync,writeFileSync} from 'node:fs';

const port=4358,base='http://127.0.0.1:'+port,dir='qa-artifacts/quality';
mkdirSync(dir,{recursive:true});
const cases=[['paper','數位工具'],['morning','動畫與漫畫'],['studio','人際關係'],['botanical','城市散步']];
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});
let browser;
const rows=[],errors=[];
try{
 let ready=false;
 for(let i=0;i<50;i++){try{if((await fetch(base+'/knowledge/paper/')).ok){ready=true;break}}catch{}await wait(300)}
 if(!ready)throw Error('Search preview server unavailable');
 browser=await chromium.launch({headless:true});
 for(const [theme,term] of cases){
  const page=await browser.newPage({viewport:{width:1280,height:850}});
  const pageErrors=[];page.on('pageerror',e=>pageErrors.push(e.message));
  const response=await page.goto(base+'/knowledge/'+theme+'/',{waitUntil:'domcontentloaded',timeout:20000});
  if(response?.status()!==200)throw Error('Knowledge theme '+theme+' unavailable');
  const trigger=page.locator('[data-search-open]').first();await trigger.click();
  const dialog=page.locator('[data-site-search]').first();
  const input=dialog.locator('[data-site-query]');await input.fill(term);
  const list=dialog.locator('[data-search-results] a');
  let matched=false;
  try{await list.first().waitFor({state:'visible',timeout:18000});matched=true}catch{}
  const status=await dialog.locator('[data-search-status]').innerText();
  const count=await list.count(),hrefs=await list.evaluateAll(links=>links.slice(0,5).map(a=>a.getAttribute('href')));
  rows.push({theme,term,count,matched,status,hrefs,pageErrors});
  if(!matched||!count||/索引尚未載入|找不到符合/.test(status)||pageErrors.length)errors.push(theme+': failed real Chinese Pagefind/exact search: '+status+'; '+pageErrors.join('; '));
  if(theme==='paper'){
   await input.fill('');
   const clean=await dialog.locator('[data-search-status]').innerText();
   if(!clean.includes('輸入關鍵字'))errors.push('Search clear did not return empty-query instructions');
   await input.press('Escape');
   if(await dialog.evaluate(el=>el.open))errors.push('N17 first Escape did not close search');
  }
  await page.close();
 }
 const report={sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',rows,errors,scope:'Real browser query with built Pagefind and Chinese companion data in four themes; not full search ranking acceptance'};
 writeFileSync(dir+'/live-chinese-search.json',JSON.stringify(report,null,2)+'\n');
 console.log('W8 live Chinese search '+report.status+': '+rows.filter(r=>r.matched).length+'/'+cases.length+' themes with results');
 if(errors.length){errors.forEach(e=>console.error('FAIL '+e));process.exitCode=1}
} finally {await browser?.close();server.kill('SIGTERM')}
