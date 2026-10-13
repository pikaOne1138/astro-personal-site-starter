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
   const tag=match[0].match(/^<([a-z]+)/i)?.[1]?.toLowerCase()||'';
   const raw=match[1].replace(/&(?:#x([0-9a-f]+)|#([0-9]+)|amp|colon|tab|newline);?/gi,(entity,hex,dec)=>{
    if(hex||dec){const n=parseInt(hex||dec,hex?16:10);return n>0&&n<=0x10ffff?String.fromCodePoint(n):entity}
    const key=entity.replace(/^&|;$/g,'').toLowerCase();
    return ({amp:'&',colon:':',tab:'\t',newline:'\n'})[key]??entity;
   }).trim();
   const schemeProbe=raw.replace(/[\u0000-\u0020]/g,'');
   if(/^(?:javascript|vbscript|file):/i.test(schemeProbe)
    ||(tag==='a'&&(/^(?:data|blob):/i.test(schemeProbe)||raw.startsWith('//')))){
    failures.push('/'+relative(root,page).replaceAll('\\','/')+' unsafe '+tag+' URL '+raw.slice(0,120));continue;
   }
   if(!raw||raw.startsWith('#')||/^(?:https?:|mailto:|tel:|data:|blob:|\/\/)/i.test(raw))continue;
   const from='/' + relative(root,page).replaceAll('\\','/');
   let dest;
   try{dest=new URL(raw,'https://site.invalid'+from).pathname}catch{failures.push(from+' invalid URL '+raw);continue}
   if(base!=='/'&&dest.startsWith(base))dest=dest.slice(base.length-1);
   if(!dest.startsWith('/'))dest='/'+dest;
   let clean;
   try{clean=decodeURIComponent(dest)}catch{
    failures.push(from+' malformed percent-encoded URL '+raw.slice(0,120));continue;
   }
   if(/[\u0000-\u001f\u007f]/.test(clean)){
    failures.push(from+' unsafe control characters in URL '+raw.slice(0,120));continue;
   }
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
