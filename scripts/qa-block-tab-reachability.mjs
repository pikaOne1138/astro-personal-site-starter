import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';

const blocks=JSON.parse(readFileSync('src/data/blocks.registry.json','utf8'));
const widths=[1440,390],base='http://127.0.0.1:4393',rows=[],failures=[];
mkdirSync('qa-artifacts/quality',{recursive:true});
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4393','--strictPort','--ignore-lock'],{stdio:'ignore'});
let browser;
function missingExpected(expected,visited){const seen=new Set(visited);return expected.filter(x=>!seen.has(x.id))}
try{
 let ready=false;
 for(let i=0;i<50;i++){try{if((await fetch(base+'/blocks/')).ok){ready=true;break}}catch{}await wait(300)}
 if(!ready)throw Error('Blocks preview server did not start');
 browser=await chromium.launch({headless:true});
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const response=await page.goto(base+'/blocks/',{waitUntil:'domcontentloaded'});
  if(response?.status()!==200)throw Error('Blocks page HTTP '+response?.status());
  const expected=await page.evaluate(names=>{
   const demos=[...document.querySelectorAll('.ab-demo')];
   const output=[];let index=0;
   for(const name of names){
    for(const d of demos.filter(x=>x.querySelector('.ab-demo-label strong')?.textContent?.trim()===name)){
     for(const el of d.querySelectorAll('a[href],button,input:not([type="hidden"]),select,textarea,summary,[role="button"],[role="link"]')){
      const rect=el.getBoundingClientRect(),style=getComputedStyle(el);
      if(el.disabled||el.getAttribute('aria-hidden')==='true'||rect.width<1||rect.height<1||style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0||el.tabIndex<0)continue;
      const id=String(index++);el.setAttribute('data-qa-tab-id',id);
      output.push({id,component:name,tag:el.tagName.toLowerCase(),name:el.getAttribute('aria-label')||el.textContent?.trim()||el.getAttribute('title')||''});
     }
    }
   }
   return output;
  },blocks.map(x=>x.name));
  if(!expected.length)throw Error('No tabbable control fixtures; audit would be meaningless');
  const visited=[];const set=new Set();
  const maxSteps=Math.min(650,Math.max(100,expected.length+100));
  for(let i=0;i<maxSteps;i++){
   await page.keyboard.press('Tab');
   const focused=await page.evaluate(()=>document.activeElement?.getAttribute('data-qa-tab-id')||null);
   if(focused!==null&&!set.has(focused)){set.add(focused);visited.push(focused)}
   if(set.size===expected.length)break;
  }
  const missing=missingExpected(expected,visited);
  const broken=missingExpected(expected,visited.slice(1));
  if(!broken.length)failures.push('Validator mutation missed removed focus observation at '+width);
  if(missing.length)failures.push(width+': '+missing.length+' visible tabbable controls never reached by keyboard: '+missing.slice(0,20).map(x=>x.component+'/'+x.tag+'/'+x.id).join(', '));
  rows.push({width,expectedCount:expected.length,visitedCount:visited.length,missing,passed:missing.length===0,
    negativeMutationRejected:broken.length>0});
  await page.close();
 }
 const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:failures.length?'FAIL':'PASS',
  registeredBlocks:blocks.length,widths,rows,failures,
  scope:'Actual Chromium Tab traversal of currently visible, enabled, natively tabbable Block gallery controls. Does not cover closed dialogs, tabindex=-1 controls, custom focus traps, action activation, or full screen-reader/WCAG audit.'};
 writeFileSync('qa-artifacts/quality/block-tab-reachability.json',JSON.stringify(report,null,2)+'\n');
 console.log('Block keyboard Tab reachability '+report.status+': '+rows.map(x=>x.width+'px '+x.visitedCount+'/'+x.expectedCount).join('; ')+'; '+failures.length+' errors; injected missing visit detected');
 failures.forEach(x=>console.error('FAIL '+x));if(failures.length)process.exitCode=1;
}finally{await browser?.close();server.kill('SIGTERM')}
