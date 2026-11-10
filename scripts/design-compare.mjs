#!/usr/bin/env node
// Compare *actual* browser QA screenshots from two independently rendered builds.
// This cannot create candidates, simulate screenshots, or assert aesthetic quality.
import {readFileSync,writeFileSync,mkdirSync,copyFileSync,existsSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const REQUIRED_WIDTHS=[1440,1280,768,390];
const fail=message=>{throw Error(message);};
const text=(value,name)=>{
 if(typeof value!=='string'||!value.trim())fail(name+' required');
 return value.trim();
};
const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const keyFor=p=>(p.replace(/^\\//,'')||'home').replace(/[^a-z0-9-]/g,'-').slice(0,100);
const screenshot=(folder,p,width)=>join(folder,keyFor(p)+'-'+width+'.png');
function pngDimensions(file,width){
 if(!existsSync(file))fail('Missing screenshot: '+file);
 const b=readFileSync(file);
 if(b.length<24||b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')fail('Invalid PNG screenshot: '+file);
 const w=b.readUInt32BE(16),h=b.readUInt32BE(20);
 if(w!==width||h<1)fail('Screenshot dimensions mismatch: '+file+' actual '+w+'x'+h);
 return {width:w,height:h,sha256:createHash('sha256').update(b).digest('hex')};
}
function loadQa(folder){
 const file=join(folder,'results.json');
 if(!existsSync(file))fail('No browser QA results.json in '+folder);
 const qa=JSON.parse(readFileSync(file,'utf8'));
 if(!Array.isArray(qa.rows)||!qa.rows.length)fail('Missing actual browser QA rows in '+file);
 return qa;
}
const isGood=row=>row.status===200&&!row.overflow&&!(row.brokenLocalImages||[]).length&&!(row.errors||[]).length;
export function compareBrowserEvidence({before,after,out,widths=REQUIRED_WIDTHS,paths=null}){
 const target=resolve(out),beforeRoot=resolve(before),afterRoot=resolve(after);
 if(existsSync(target))fail('Output already exists; use a new directory to preserve evidence');
 if([beforeRoot,afterRoot].some(p=>target===p||target.startsWith(p+sep)))fail('Output must not be inside source QA evidence');
 const first=loadQa(before),second=loadQa(after);
 const a=new Map(first.rows.map(r=>[r.path+'@'+r.width,r]));
 const b=new Map(second.rows.map(r=>[r.path+'@'+r.width,r]));
 const selected=paths?new Set(paths):null;
 if(selected&&selected.size===0)fail('No routes selected');
 const pairs=[];
 for(const [id,original] of a){
  if(!widths.includes(original.width)||selected&&!selected.has(original.path))continue;
  const updated=b.get(id);
  if(!updated)continue;
  // A browser QA run can exist with failures; retain them in the comparison
  // rather than pretending that a screenshot means the page passed.
  const originalPng=screenshot(before,original.path,original.width);
  const updatedPng=screenshot(after,updated.path,updated.width);
  const originalMeta=pngDimensions(originalPng,original.width);
  const updatedMeta=pngDimensions(updatedPng,updated.width);
  pairs.push({path:original.path,width:original.width,before:originalMeta,after:updatedMeta,
   beforeQa:isGood(original)?'PASS':'FAIL',afterQa:isGood(updated)?'PASS':'FAIL',
   from:originalPng,to:updatedPng});
 }
 if(!pairs.length)fail('No matching rendered routes and widths between runs');
 if(selected){
  for(const path of selected){
   for(const width of widths)
    if(!pairs.some(p=>p.path===path&&p.width===width))
     fail('Selected route missing before/after '+path+' @ '+width+'px');
  }
 }
 mkdirSync(out,{recursive:true});
 const list=[];
 for(const [i,p] of pairs.entries()){
  const stem='pair-'+String(i+1).padStart(3,'0')+'-'+createHash('sha256').update(p.path+'@'+p.width).digest('hex').slice(0,8);
  const original=stem+'-before.png',updated=stem+'-after.png';
  copyFileSync(p.from,join(out,original));copyFileSync(p.to,join(out,updated));
  list.push({...p,beforeFile:original,afterFile:updated});
 }
 const summary={
  schemaVersion:1,beforeCommit:first.sourceCommit||'unknown',afterCommit:second.sourceCommit||'unknown',
  beforeQaResults:resolve(before,'results.json'),afterQaResults:resolve(after,'results.json'),
  screenshots:list.map(({path,width,before,after,beforeQa,afterQa,beforeFile,afterFile})=>({
   path,width,before,after,beforeQa,afterQa,beforeFile,afterFile
  })),
  aestheticReview:'NOT TESTED',reviewedBy:null,
  warning:'Paired screenshots and existing browser QA results; no aesthetic or human visual review inferred.'
 };
 writeFileSync(join(out,'comparison.json'),JSON.stringify(summary,null,2)+'\n');
 const sections=list.map(p=>`<section><h2>${esc(p.path)} · ${p.width}px</h2><p>Browser QA: before ${p.beforeQa}, after ${p.afterQa} · Pixel content ${p.before.sha256===p.after.sha256?'identical':'different'}; aesthetic review NOT TESTED</p><div class="pair"><figure><img loading="lazy" alt="Before: ${esc(p.path)}" src="${p.beforeFile}"/><figcaption>Before · ${esc(first.sourceCommit||'unknown')}</figcaption></figure><figure><img loading="lazy" alt="After: ${esc(p.path)}" src="${p.afterFile}"/><figcaption>After · ${esc(second.sourceCommit||'unknown')}</figcaption></figure></div></section>`).join('\n');
 const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ATP 設計修改前後比對</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:1400px;margin:auto;padding:24px;background:#fafafa;color:#222}section{border-top:2px solid #aaa;margin:32px 0;padding-top:20px}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}figure{margin:0;min-width:0}img{display:block;max-width:100%;height:auto;border:1px solid #aaa}figcaption{padding:8px 0} @media(max-width:700px){.pair{grid-template-columns:1fr}}</style></head><body><h1>網站設計修改前後比對</h1><p>所有圖片取自真實瀏覽器 QA 截圖；畫面品質及設計判斷仍待人工檢視。此報告不代表獲准合併或發布。</p>${sections}</body></html>`;
 writeFileSync(join(out,'index.html'),html);
 return summary;
}
export function runCli(args=process.argv.slice(2)){
 try{
  const opts={};
  for(let i=0;i<args.length;i+=2){
   const key=args[i];
   if(!key?.startsWith('--')||!args[i+1])fail('Expected --before DIR --after DIR --out DIR [--paths /,/articles/]');
   opts[key.slice(2)]=args[i+1];
  }
  const before=resolve(text(opts.before,'--before')),after=resolve(text(opts.after,'--after')),out=resolve(text(opts.out,'--out'));
  if(out===before||out===after)fail('Output directory must differ from QA input directories');
  const paths=opts.paths?opts.paths.split(',').map(p=>text(p,'path')):null;
  const result=compareBrowserEvidence({before,after,out,paths});
  process.stdout.write('Paired real browser screenshots: '+result.screenshots.length+'; visual judgment NOT TESTED.\n');
  return 0;
 }catch(e){process.stderr.write('Design compare: '+e.message+'\n');return 1;}
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))process.exitCode=runCli();
