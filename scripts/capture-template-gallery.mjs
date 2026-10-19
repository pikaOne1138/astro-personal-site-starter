import {chromium} from 'playwright';
import sharp from 'sharp';
import {readFileSync,mkdirSync,writeFileSync,existsSync,renameSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve,join} from 'node:path';
import {layoutDefinitions as layouts} from '../src/data/layout-assembly/definitions.mjs';

// The assembly registry owns all routes/assets; never maintain another slug list.
const origin=(process.env.TEMPLATE_CAPTURE_BASE || 'http://127.0.0.1:4321').replace(/\/$/,'');
const out=resolve('public/template-gallery');
const manifestPath='docs/template-gallery/captured.json';
const previous=existsSync(manifestPath)?JSON.parse(readFileSync(manifestPath,'utf8')):{records:[]};
const refresh=new Set((process.env.TEMPLATE_CAPTURE_REFRESH||'').split(',').filter(Boolean));
const sourceCommit=process.env.GITHUB_SHA||execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const records=[];
mkdirSync(out,{recursive:true});
try{
 if(new Set(layouts.map(x=>x.slug)).size!==layouts.length)throw Error('Duplicate layout slugs');
 for(const item of layouts){
  for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844]]){
   const route=item.sourcePrototype;
   const filename=item.screenshots[mode]?.replace(/^\//,'');
   if(!filename||filename!==`template-gallery/${item.slug}-${mode}.webp`)throw Error('Invalid screenshot path: '+item.slug);
   const path=resolve('public',filename);
   const old=previous.records.find(x=>x.slug===item.slug&&x.mode===mode);
   const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
   try{
    const response=await page.goto(origin+route,{waitUntil:'load',timeout:45000});
    if(!response?.ok()||new URL(page.url()).pathname!==new URL(origin+route).pathname)throw Error(`${item.slug} ${mode}: invalid route/HTTP ${response?.status()}`);
    await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));scrollTo(0,0);});
    const validation=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.textContent?.trim(),bodyCharacters:document.body.innerText.trim().length,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.currentSrc),horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1}));
    if(!validation.h1||validation.bodyCharacters<100||validation.brokenImages.length)throw Error(`${item.slug} ${mode}: invalid page ${JSON.stringify(validation)}`);
    let action='preserved';
    if(!existsSync(path)||refresh.has(item.slug)||refresh.has('all')){
     const png=await page.screenshot({type:'png',fullPage:true,animations:'disabled'});
     const bytes=await sharp(png).webp({quality:80,effort:4}).toBuffer();
     writeFileSync(path+'.tmp',bytes);renameSync(path+'.tmp',path);action=old?'recaptured':'created';
    }else if(!old||old.route!==route||sha(readFileSync(path))!==old.sha256){throw Error('Existing asset has no matching provenance: '+filename);}
    const bytes=readFileSync(path);
    const metadata=await sharp(bytes).metadata();
    await sharp(bytes).raw().toBuffer(); // Decode all pixels, not merely WebP headers.
    if(metadata.format!=='webp'||metadata.width!==width||metadata.height<height)throw Error('Invalid image dimensions: '+filename);
    const stats=await sharp(bytes).stats();
    if(stats.channels.every(c=>c.stdev<2))throw Error('Blank screenshot: '+filename);
    records.push({...old,slug:item.slug,title:item.title,kind:item.kind,mode,route,viewport:{width,height},image:{width:metadata.width,height:metadata.height},filename,sha256:sha(bytes),bytes:bytes.length,sourceCommit:action==='preserved'?(old.sourceCommit||previous.sourceCommit):sourceCommit,capturedAt:action==='preserved'?(old.capturedAt||previous.generatedAt):new Date().toISOString(),action,validation:{...validation,checkedAt:new Date().toISOString(),sourceCommit}});
    console.log(item.slug,mode,action);
   }finally{await page.close();}
  }
 }
 if(records.length!==layouts.length*2)throw Error('Incomplete capture');
 mkdirSync('docs/template-gallery',{recursive:true});
 writeFileSync(manifestPath,JSON.stringify({version:2,sourceCommit,origin,generatedAt:new Date().toISOString(),capture:'Playwright Chromium full-page; viewport dimensions are not output height',records},null,2)+'\n');
}finally{await browser.close();}
