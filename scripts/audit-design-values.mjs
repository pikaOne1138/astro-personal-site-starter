#!/usr/bin/env node
// D-T1 盤點：逐版型掃描設計字面值（色值／字體／圓角／陰影）與 Token 消費。
// 唯讀報告工具；掃描器本體在 design-scan.mjs，與 G-11 關卡、試點守門共用（不另建平行掃描器）。
// 百分比圓角（50%、40% 40% 12% 12%）視為形狀幾何，不算主題圓角；半透明純黑／純白疊色不算主題色。
// 用法：node scripts/audit-design-values.mjs [--json out.json] [--md out.md]
import {readFileSync,readdirSync,statSync,existsSync,writeFileSync} from 'node:fs';
import {join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {layoutDefinitions} from '../src/data/layout-assembly/definitions.mjs';

const root=fileURLToPath(new URL('..',import.meta.url)).replace(/\/$/,'');

import {scanCss,extractCss} from './design-scan.mjs';
export {scanCss,extractCss};

const walk=(p,out=[])=>{const abs=join(root,p);if(!existsSync(abs))return out;
 if(statSync(abs).isDirectory())for(const f of readdirSync(abs).sort())walk(join(p,f),out);
 else if(/\.(astro|css)$/.test(p))out.push(p);return out;};

function scanFiles(files,{onlyLines}={}){
 const distinct=new Set();
 const agg={distinct,files:files.length,colorLiteralInUse:0,colorLiteralInLocalToken:0,colorFallback:0,fontLiteral:0,radiusLiteral:0,shadowLiteral:0,varRefs:{},localTokenDefs:{},declarations:0,samples:[]};
 for(const f of files){
  const text=readFileSync(join(root,f),'utf8');
  for(const part of extractCss(f,text)){
   const s=scanCss(part.text);
   for(const k of ['colorLiteralInUse','colorLiteralInLocalToken'])agg[k]+=s[k].reduce((n,x)=>n+x.n,0);
   for(const k of ['fontLiteral','radiusLiteral','shadowLiteral'])agg[k]+=s[k].length;
   for(const x of s.colorLiteralInUse)for(const c of x.colors||[])distinct.add(c);
   agg.colorFallback+=s.colorFallback;agg.declarations+=s.declarations;
   for(const k of ['varRefs','localTokenDefs'])for(const [a,b] of Object.entries(s[k]))agg[k][a]=(agg[k][a]||0)+b;
   if(agg.samples.length<3)for(const x of s.colorLiteralInUse.slice(0,3-agg.samples.length))agg.samples.push(f+' '+x.prop+':'+x.value);
  }
 }
 agg.distinctColorsInUse=distinct.size;delete agg.distinct;
 return agg;
}

function layoutFiles(def){
 const slug=def.slug,eng=def.engine||def.adapter?.engine;
 const proto=walk('src/pages/layouts/'+slug);
 let exported;
 if(eng==='art-direction')exported=[...walk('src/data/art-direction-adapters/'+slug),...walk('src/data/art-direction-definitions').filter(()=>false)];
 else if(eng==='native-expansion')exported=walk('src/data/layout-assembly/expanded/'+slug);
 else exported=walk('src/data/layout-assembly/'+slug);
 return {proto,exported,engine:eng||'prototype-adapter'};
}

// DesignChrome.css 內屬於某版型的規則（body[data-site-family="slug"]）另列為 chrome。
function chromeFor(slug){
 const css=readFileSync(join(root,'src/data/layout-assembly/DesignChrome.css'),'utf8');
 const lines=css.split('\n').filter(l=>l.includes('data-site-family="'+slug+'"'));
 return scanCss(lines.join('\n'));
}

export function inventory(){
 const rows=[];
 for(const def of layoutDefinitions){
  const {proto,exported,engine}=layoutFiles(def);
  const ex=scanFiles(exported),pr=scanFiles(proto),ch=chromeFor(def.slug);
  rows.push({slug:def.slug,kind:def.kind,engine,exportedFiles:exported,prototypeFiles:proto,
   exported:ex,prototype:pr,chrome:{colorLiteralInUse:ch.colorLiteralInUse.reduce((n,x)=>n+x.n,0),colorLiteralInLocalToken:ch.colorLiteralInLocalToken.reduce((n,x)=>n+x.n,0),varRefs:ch.varRefs,localTokenDefs:ch.localTokenDefs}});
 }
 const sharedFiles=['src/data/layout-assembly/DesignInterior.astro','src/data/layout-assembly/ServiceSections.astro','src/data/layout-assembly/AboutSections.astro','src/data/layout-assembly/ArticleArchive.astro','src/data/layout-assembly/ArticleDetail.astro','src/data/layout-assembly/DesignChrome.css','src/styles/editorial-tokens.css','src/layouts/DirectionLayout.astro',...walk('src/data/art-direction-adapters/shared'),...walk('src/components/blocks').filter(f=>/FAQ|BackToTop/.test(f))].filter(f=>existsSync(join(root,f)));
 const shared=sharedFiles.map(f=>({file:f,...scanFiles([f])}));
 const siteCssText=(()=>{try{const src=readFileSync(join(root,'scripts/export-starter.mjs'),'utf8');const m=src.match(/"public\/site\.css":("(?:[^"\\]|\\.)*")/);return m?JSON.parse(m[1]):null;}catch{return null;}})();
 const siteCss=siteCssText?scanCss(siteCssText):null;
 return {rows,shared,exporterSiteCss:siteCss&&{bytes:siteCssText.length,declarations:siteCss.declarations,colorLiteralInUse:siteCss.colorLiteralInUse.reduce((n,x)=>n+x.n,0),colorLiteralInLocalToken:siteCss.colorLiteralInLocalToken.reduce((n,x)=>n+x.n,0),fontLiteral:siteCss.fontLiteral.length,radiusLiteral:siteCss.radiusLiteral.length,shadowLiteral:siteCss.shadowLiteral.length,varRefs:siteCss.varRefs,localTokenDefs:siteCss.localTokenDefs}};
}

const sum=o=>Object.values(o).reduce((a,b)=>a+b,0);
const fmtNs=o=>Object.entries(o).sort().map(([k,v])=>k+':'+v).join(' ')||'—';

export function renderMarkdown(inv){
 const L=[];
 L.push('| # | 版型 | 類型 | 引擎 | 匯出檔數 | 寫死色(直接用) | 不同色數 | 區域 Token 內的色 | 寫死字體 | 寫死圓角 | 寫死陰影 | 消費共用 Token(次) | 區域 Token 定義(個) | chrome 版型專屬字面色 | 示例 |');
 L.push('| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |');
 inv.rows.forEach((r,i)=>{const e=r.exported;
  const shared=Object.entries(e.varRefs).filter(([k])=>!k.startsWith('local:')&&k!=='other').reduce((a,[,v])=>a+v,0);
  L.push(`| ${i+1} | ${r.slug} | ${r.kind} | ${r.engine} | ${e.files} | ${e.colorLiteralInUse} | ${e.distinctColorsInUse} | ${e.colorLiteralInLocalToken} | ${e.fontLiteral} | ${e.radiusLiteral} | ${e.shadowLiteral} | ${shared} | ${sum(e.localTokenDefs)} | ${r.chrome.colorLiteralInUse+r.chrome.colorLiteralInLocalToken} | ${e.samples.slice(0,1).map(x=>'`'+x.replace(/\|/g,'/')+'`').join('')} |`);});
 return L.join('\n');
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 const inv=inventory();
 const arg=n=>{const i=process.argv.indexOf(n);return i>0?process.argv[i+1]:null;};
 if(arg('--json'))writeFileSync(arg('--json'),JSON.stringify(inv,null,1)+'\n');
 const md=renderMarkdown(inv);
 if(arg('--md'))writeFileSync(arg('--md'),md+'\n');else console.log(md);
}
