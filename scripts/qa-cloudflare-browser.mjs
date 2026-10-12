import {chromium} from 'playwright';
import {existsSync,readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const baseDir='qa-artifacts/quality',imagesDir='qa-artifacts/preview';
mkdirSync(baseDir,{recursive:true});mkdirSync(imagesDir,{recursive:true});
const input=existsSync(join(baseDir,'external-preview.json'))?JSON.parse(readFileSync(join(baseDir,'external-preview.json'),'utf8')):null;
const report={schemaVersion:1,headSha:process.env.PR_HEAD_SHA||null,previewUrl:input?.previewUrl||null,status:'NOT TESTED',rows:[],errors:[],humanVisualReview:'NOT TESTED',limitations:['Chromium automated screenshots and objective visibility/overflow only','Human design/composition acceptance remains NOT TESTED']};
let browser;
try{
 if(!input||input.status!=='PASS'||!input.previewUrl||input.headSha!==report.headSha){
  report.status='BLOCKED';report.errors.push('Exact-SHA Cloudflare HTTP verification missing or not PASS');
 }else{
  browser=await chromium.launch({headless:true});
  for(const route of ['','guide/','blocks/','effects/']){
   for(const width of [1440,390]){
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    let response;
    try{
     response=await page.goto(new URL(route,input.previewUrl).href,{waitUntil:'domcontentloaded',timeout:25000});
     await page.waitForTimeout(250);
     const state=await page.evaluate(()=>{
      const h=document.querySelector('h1'),main=document.querySelector('main');
      return{overflow:document.documentElement.scrollWidth>innerWidth+2,hasMain:!!main,hasHeadline:!!h?.textContent?.trim(),
       hiddenHeadline:!h||getComputedStyle(h).visibility==='hidden'||Number(getComputedStyle(h).opacity)<0.95};
     });
     const filename=(route?route.replaceAll('/','-'):'home')+'-'+width+'.jpg';
     await page.screenshot({path:join(imagesDir,filename),fullPage:true,type:'jpeg',quality:64,animations:'disabled',timeout:20000});
     const row={route:'/'+route,width,status:response?.status(),...state,jsErrors:errors,screenshot:filename};
     report.rows.push(row);
     if(row.status!==200||row.overflow||!row.hasMain||!row.hasHeadline||row.hiddenHeadline||errors.length)report.errors.push(row.route+'/'+width+': '+JSON.stringify(row));
    }catch(err){report.errors.push(route+'/'+width+': '+String(err));report.rows.push({route:'/'+route,width,error:String(err)})}
    await page.close();
   }
  }
  report.status=report.errors.length?'FAIL':'PASS';
 }
}catch(err){report.status='BLOCKED';report.errors.push(String(err))}
finally{await browser?.close();}
writeFileSync(join(baseDir,'external-preview-browser.json'),JSON.stringify(report,null,2)+'\n');
console.log('Actual Cloudflare Chromium Preview '+report.status+': '+report.rows.length+' viewport checks; '+report.errors.length+' errors; human design review NOT TESTED');
for(const error of report.errors)console.error('PREVIEW_QA '+error);
if(report.status==='FAIL')process.exitCode=1;
