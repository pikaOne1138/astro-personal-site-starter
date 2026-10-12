import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join,resolve,dirname,relative,extname} from 'node:path';
import {pathToFileURL} from 'node:url';

export function auditLinks(dist,base='/'){
 const root=resolve(dist),failures=[];
 const pages=[];
 function walk(dir){for(const e of readdirSync(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith('.html'))pages.push(p)}}
 walk(root);
 for(const page of pages){
  const html=readFileSync(page,'utf8');
  const re=/<(?:a|link|script|img|source)\b[^>]*?\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  for(const match of html.matchAll(re)){
   const raw=match[1].replace(/&amp;/g,'&');
   if(!raw||raw.startsWith('#')||/^(?:https?:|mailto:|tel:|data:|blob:|javascript:|\/\/)/i.test(raw))continue;
   const from='/' + relative(root,page).replaceAll('\\','/');
   let dest;
   try{dest=new URL(raw,'https://site.invalid'+from).pathname}catch{failures.push(from+' invalid URL '+raw);continue}
   if(base!=='/'&&dest.startsWith(base))dest=dest.slice(base.length-1);
   if(!dest.startsWith('/'))dest='/'+dest;
   const clean=decodeURIComponent(dest);
   const target=resolve(root,'.'+clean);
   if(target!==root&&!target.startsWith(root+'/')){failures.push(from+' unsafe URL '+raw);continue}
   const candidates=extname(clean)?[target]:[join(target,'index.html'),target+'.html',target];
   if(!candidates.some(p=>existsSync(p)&&statSync(p).isFile()))failures.push(from+' -> '+raw+' (missing '+clean+')');
  }
 }
 return {pages:pages.length,failures};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const dist=process.argv[2]||'dist',base=process.argv[3]||'/';
 const result=auditLinks(dist,base);
 if(result.failures.length){console.error('Broken internal links ('+result.failures.length+'):\n'+result.failures.join('\n'));process.exitCode=1}
 else console.log('Internal link audit PASS: '+result.pages+' HTML pages');
}
