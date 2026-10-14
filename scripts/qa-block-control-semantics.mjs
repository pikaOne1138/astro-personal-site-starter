import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';

const blocks=JSON.parse(readFileSync('src/data/blocks.registry.json','utf8'));
const port=4392,base='http://127.0.0.1:'+port,viewports=[1440,390],rows=[],faults=[];
mkdirSync('qa-artifacts/quality',{recursive:true});
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});
let browser;
function findFailures(rows){
 return rows.flatMap(row=>row.controls.flatMap(c=>{
  const problems=[];
  if(!c.name)problems.push('no accessible-name candidate');
  if(c.focusOk===false)problems.push('not programmatically focusable');
  if(c.ariaControlsResolved===false)problems.push('aria-controls points to missing node');
  return problems.map(problem=>row.name+'/'+row.width+' '+c.tag+'['+c.index+']: '+problem);
 }));
}
try{
 let ready=false;
 for(let n=0;n<50;n++){try{if((await fetch(base+'/blocks/')).ok){ready=true;break}}catch{}await wait(300)}
 if(!ready)throw Error('Blocks gallery preview did not start');
 browser=await chromium.launch({headless:true});
 for(const width of viewports){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const res=await page.goto(base+'/blocks/',{waitUntil:'domcontentloaded'});
  if(res?.status()!==200)throw Error('Blocks gallery HTTP '+res?.status());
  const result=await page.evaluate(names=>{
    const demos=[...document.querySelectorAll('.ab-demo')];
    function label(el){
     const direct=el.getAttribute('aria-label')?.trim();
     if(direct)return direct;
     const ids=el.getAttribute('aria-labelledby')?.trim().split(/\s+/).filter(Boolean)||[];
     const referenced=ids.map(id=>document.getElementById(id)?.textContent?.trim()||'').filter(Boolean).join(' ');
     if(referenced)return referenced;
     const labelText=[...(el.labels||[])].map(x=>x.textContent?.trim()).filter(Boolean).join(' ');
     if(labelText)return labelText;
     const wrapped=el.closest('label')?.textContent?.trim();
     if(wrapped)return wrapped;
     const content=['INPUT','SELECT','TEXTAREA'].includes(el.tagName)?'':el.textContent?.trim();
     if(content)return content;
     const img=el.querySelector('img[alt]');
     if(img?.alt?.trim())return img.alt.trim();
     const value=el.getAttribute('value')?.trim();
     if(value&&['submit','button','reset'].includes(el.getAttribute('type')))return value;
     return el.getAttribute('title')?.trim()||'';
    }
    const unlabeledSelect=document.createElement('select');
    unlabeledSelect.appendChild(new Option('選項不是欄位名稱'));
    if(label(unlabeledSelect))throw Error('QA semantic false PASS: unlabeled select took its option text as accessible name');
    const placeholderInput=document.createElement('input');
    placeholderInput.setAttribute('placeholder','提示不是欄位標籤');
    if(label(placeholderInput))throw Error('QA semantic false PASS: placeholder accepted as an accessible name');
    return names.map(name=>{
     const matches=demos.filter(d=>d.querySelector('.ab-demo-label strong')?.textContent?.trim()===name);
     let index=0;
     const controls=matches.flatMap(d=>[...d.querySelectorAll('a[href],button,input:not([type="hidden"]),select,textarea,summary,[role="button"],[role="link"]')]).filter(el=>{
       const rect=el.getBoundingClientRect(),cs=getComputedStyle(el);
       return rect.width>0&&rect.height>0&&cs.display!=='none'&&cs.visibility!=='hidden'&&Number(cs.opacity)>0&&!el.disabled&&el.getAttribute('aria-hidden')!=='true';
     }).map(el=>{
       const name=label(el);
       const before=document.activeElement;
       const focusTested=el.tabIndex>=0;
       if(focusTested)el.focus({preventScroll:true});
       const focusOk=focusTested?document.activeElement===el:null;
       if(before instanceof HTMLElement)before.focus({preventScroll:true});
       const controls=el.getAttribute('aria-controls');
       return {index:index++,tag:el.tagName.toLowerCase(),name,focusTested,focusOk,
        ariaControlsResolved:controls?controls.split(/\s+/).every(id=>!!document.getElementById(id)):null};
     });
     return {name,examples:matches.length,controls};
    });
  },blocks.map(x=>x.name));
  rows.push(...result.map(x=>({...x,width})));
  await page.close();
 }
 const violations=findFailures(rows);
 const sample=rows.flatMap(x=>x.controls.map(c=>({row:x,control:c})))[0];
 if(!sample)throw Error('No interactive controls found for meaningful negative semantics mutation');
 const failName=structuredClone(rows);
 const first=failName.find(x=>x.controls.length);
 first.controls[0].name='';
 if(!findFailures(failName).some(x=>x.includes('no accessible-name candidate')))throw Error('Missing accessible name mutation was not rejected');
 const failFocus=structuredClone(rows);
 failFocus.find(x=>x.controls.length).controls[0].focusOk=false;
 if(!findFailures(failFocus).some(x=>x.includes('not programmatically focusable')))throw Error('Non-focusable mutation was not rejected');
 const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:violations.length?'FAIL':'PASS',
   registered:blocks.length,widths:viewports,measurements:rows.length,controlsObserved:rows.reduce((n,x)=>n+x.controls.length,0),
   violations,focusSkipped:rows.reduce((n,x)=>n+x.controls.filter(c=>!c.focusTested).length,0),negativeMutations:['missing accessible name rejected','not focusable rejected','unlabeled select option text rejected','input placeholder rejected'],rows,
   limitations:'Accessible-name DOM heuristic and programmatic focus, not full accessibility tree, actual Tab order or WCAG audit. No control in a static Block is valid.'};
 writeFileSync('qa-artifacts/quality/block-control-semantics.json',JSON.stringify(report,null,2)+'\n');
 console.log('Block control semantics '+report.status+': '+report.measurements+' per-Block viewports; '+report.controlsObserved+' controls; '+violations.length+' issues; two mutations rejected');
 violations.slice(0,80).forEach(x=>console.error('FAIL '+x));
 if(violations.length)process.exitCode=1;
}finally{await browser?.close();server.kill('SIGTERM')}
