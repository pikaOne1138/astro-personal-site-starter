/**
 * Browser black-box for a first-time workshop learner.
 * Checks planner interaction, truthful content and self-contained local media
 * without requiring a production backend or a deployed repository.
 */
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const out=resolve('.preview-qa/learner-journey');
mkdirSync(out,{recursive:true});
const server=spawn('python3',['-m','http.server','4477','--bind','127.0.0.1','--directory',resolve('dist')],{stdio:'ignore'});
let browser;
const results=[];
const must=(ok,label)=>{if(!ok)throw Error('Learner journey failed: '+label);results.push(label);};
async function downloadPlan(page){
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#save-plan').click()]);
 return JSON.parse(readFileSync(await download.path(),'utf8'));
}
try{
 for(let i=0;i<40;i++){
  try{let r=await fetch('http://127.0.0.1:4477/starter/');if(r.ok)break;}catch{}
  await new Promise(r=>setTimeout(r,250));
 }
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1280,height:900},acceptDownloads:true});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4477/starter/',{waitUntil:'domcontentloaded'});
 await page.locator('input[name="layout"][value="reading-atlas"]').check();
 await page.locator('#home-headline').fill('讀我自己的書單');
 await page.locator('#home-intro').fill('今年的真實閱讀筆記。');
 await page.locator('#reading-title').fill('一本真的讀過的書');
 await page.locator('#reading-note').fill('自己的真實心得。');
 await page.locator('#annual-title').fill('我選的一本年度書');
 await page.locator('#annual-note').fill('因為這本書改變了我看問題的方式。');
 // Browser-only image is embedded into the downloadable JSON, never uploaded.
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg==','base64');
 await page.locator('#hero-upload').setInputFiles({name:'my-photo.png',mimeType:'image/png',buffer:png});
 await page.waitForFunction(()=>document.querySelector('[name="heroImagePath"]')?.value==='/images/hero-image.png');
 let plan=await downloadPlan(page);
 must(plan.layoutSlug==='reading-atlas','Reading Atlas selected in downloaded plan');
 must(plan.reading.records[0].title==='一本真的讀過的書'&&plan.reading.annualBook.title==='我選的一本年度書','Reading Atlas content survives');
 must(plan.content.headline==='讀我自己的書單'&&plan.content.intro==='今年的真實閱讀筆記。','All-layout hero copy survives');
 must(plan.assets?.[0]?.base64===png.toString('base64')&&plan.brand.heroImagePath==='/images/hero-image.png','Owned local image embedded in plan');
 await page.locator('input[name="kind"][value="helper"]').check();
 await page.locator('input[name="layout"][value="trust-path"]').check();
 await page.locator('#fact-price').fill('請向站長確認');
 await page.locator('#fact-qualification').fill('待提供可查證資料');
 plan=await downloadPlan(page);
 must(plan.layoutSlug==='trust-path'&&plan.serviceFacts.price==='請向站長確認','Trust Path facts survive');
 await page.locator('input[name="kind"][value="knowledge"]').check();
 await page.locator('input[name="layout"][value="radio-letter"]').check();
 await page.locator('#episode-text').fill('實際且已授權的節目逐字稿。');
 await page.locator('#episode-time').fill('00:00');
 plan=await downloadPlan(page);
 must(plan.layoutSlug==='radio-letter'&&plan.media.episodeTranscript[0].text==='實際且已授權的節目逐字稿。','Radio Letter transcript survives');
 must(errors.length===0,'No browser JavaScript errors: '+errors.join('; '));
 await page.screenshot({path:resolve(out,'planner-final.jpg'),type:'jpeg',quality:75,fullPage:true});
 writeFileSync(resolve(out,'results.json'),JSON.stringify({checkedAt:new Date().toISOString(),checks:results,errors},null,2)+'\n');
 console.log('Learner planner end-to-end passed: '+results.length+' checks');
 await page.close();
}finally{
 if(browser)await browser.close();
 server.kill('SIGTERM');
}
