import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const files = [];
function walk(dir) {
  for (const item of readdirSync(dir,{withFileTypes:true})) {
    const path=join(dir,item.name);
    if (item.isDirectory()) { if(item.name!=='pagefind' && item.name!=='pr-preview') walk(path); }
    else if(item.name==='index.html' || item.name.endsWith('.html')) files.push(path);
  }
}
walk(dist);
const decode=s=>s.replace(/&#(x[0-9a-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0].toLowerCase()==='x'?parseInt(v.slice(1),16):parseInt(v,10)))
  .replace(/&(amp|lt|gt|quot|apos|nbsp);/gi,(_,v)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '}[v]));
function content(html) {
  const match=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if(!match)return '';
  return decode(match[1].replace(/<(script|style|svg|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi,' ')
    .replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());
}
const base=process.env.ASTRO_BASE_PATH || '/astro-personal-site-starter';
const prefix=base.endsWith('/')?base:base+'/';
const docs=files.map(path=>{
  const html=readFileSync(path,'utf8');
  const text=content(html);
  if(!text)return null;
  const title=decode((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'網站頁面');
  const route=relative(dist,path).split(sep).join('/').replace(/index\.html$/,'');
  return {url:prefix+route,title,text};
}).filter(Boolean);
mkdirSync(join(dist,'search'),{recursive:true});
writeFileSync(join(dist,'search','exact-zh.json'),JSON.stringify({version:1,docs}));
const topic=docs.find(d=>d.url.endsWith('/knowledge/paper/topics/'));
if(!topic||!topic.text.includes('內容量長大'))throw Error('Chinese search regression: missing exact content in topics HTML');
if(!docs.some(d=>d.text.includes('內容量長大')))throw Error('No page contains target Chinese string');
console.log('Exact Chinese index verified:',docs.length,'HTML pages; topic phrase found');
