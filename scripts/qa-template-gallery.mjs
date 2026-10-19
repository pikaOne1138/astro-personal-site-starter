import {chromium} from 'playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
import {layoutDefinitions} from '../src/data/layout-assembly/definitions.mjs';
const base=(process.env.TEMPLATE_CAPTURE_BASE||'http://127.0.0.1:4321').replace(/\/$/,'');
const out='docs/template-gallery/qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const results=[];
try{
 for(const width of [1440,1280,768,390])for(const route of ['layouts','templates','starter']){
  const page=await browser.newPage({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'});
  await page.goto(`${base}/${route}/`,{waitUntil:'networkidle'});
  // Exercise lazy images, including hidden helper cards in Starter.
  if(route==='starter')await page.locator('input[name=kind][value=helper]').check();
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0);});
  const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.currentSrc)}));
  results.push({route,width,...result});
  await page.screenshot({path:`${out}/${route}-${width}.png`,fullPage:true,animations:'disabled'});
  if(route==='templates'){
   const group=page.locator('.template-controls').first();await group.locator('[data-view=mobile]').click();
   if(await group.locator('[data-view=mobile]').getAttribute('aria-pressed')!=='true')throw Error('Mobile toggle failed');
  }
  await page.close();
 }
 const page=await browser.newPage();
 for(const d of layoutDefinitions){
  await page.goto(`${base}/starter/?layout=${d.slug}&kind=${d.kind}`);
  await page.waitForFunction(slug=>document.querySelector('input[name=layout]:checked')?.value===slug,d.slug);
  const selection=await page.evaluate(()=>({layout:document.querySelector('input[name=layout]:checked').value,kind:document.querySelector('input[name=kind]:checked').value}));
  if(selection.kind!==d.kind)throw Error('Wrong kind '+d.slug);
  const brief=JSON.parse(await page.locator('#plan-preview').innerText());
  if(brief.layoutSlug!==d.slug||brief.kind!==d.kind)throw Error('Wrong Site Brief '+d.slug);
  results.push({slug:d.slug,selection,brief:true});
 }
 await page.close();
 writeFileSync(`${out}/results.json`,JSON.stringify({base,checkedAt:new Date().toISOString(),results},null,2)+'\n');
 if(results.some(r=>r.overflow||r.brokenImages?.length))throw Error('Gallery browser QA failed; see results.json');
 console.log('Three gallery surfaces × four widths; 25 Starter preselection + Site Brief checks passed');
}finally{await browser.close();}
