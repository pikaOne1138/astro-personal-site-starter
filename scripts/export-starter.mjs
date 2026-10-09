import {readFileSync,writeFileSync,mkdirSync,existsSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
const [input,dest]=process.argv.slice(2);
if(!input||!dest)throw Error('Usage: node scripts/export-starter.mjs plan.json output-dir');
const plan=JSON.parse(readFileSync(resolve(input),'utf8'));
const layouts=JSON.parse(readFileSync(new URL('../src/data/layout-directions.json',import.meta.url),'utf8'));
const patterns=JSON.parse(readFileSync(new URL('../src/data/section-patterns.registry.json',import.meta.url),'utf8'));
const allowed={knowledge:['articles','topics','start-here','about','resources'],helper:['services','first-visit','about','faq','articles','booking']};
const nav=(plan.navigation||[]).filter(x=>x.enabled);
if(plan.version!==1||!allowed[plan.kind]||!layouts.some(l=>l.kind===plan.kind&&l.slug===plan.layoutSlug)||!['paper','morning','studio','botanical','ocean','sand','slate','lavender'].includes(plan.visualTheme)||!/^#[0-9a-fA-F]{6}$/.test(plan.brand?.primaryColor||'')||!plan.brand?.name?.trim()||nav.length<2||nav.length>20||nav.filter(x=>!x.parentId).length>12||nav.some(x=>(!allowed[plan.kind].includes(x.id)&&!/^page-[a-z0-9-]{1,32}$/.test(x.id))||!x.label?.trim())||nav.some(x=>x.parentId&&(!nav.some(parent=>parent.id===x.parentId&&!parent.parentId)||x.parentId===x.id))||nav.some(x=>x.parentId&&nav.filter(y=>y.parentId===x.parentId).length>10)||new Set(nav.map(x=>x.id)).size!==nav.length||!nav.some(x=>x.id===plan.primaryCta?.pageId))throw Error('Invalid StarterPlan');
const selections=plan.sectionPatterns||[];
if(!Array.isArray(selections))throw Error('Invalid sectionPatterns');
if(selections.filter(x=>x.patternId?.startsWith('footer-')).length>1)throw Error('Only one footer pattern is allowed');
if(selections.some(x=>{
 const definition=patterns.find(p=>p.id===x.patternId);
 return !definition||!definition.kind.includes(plan.kind)||!x.insertAfter?.trim()||x.insertAfter.length>180||
 (x.patternId.startsWith('footer-')?x.targetPage!=='site-wide':!(x.targetPage==='/'||nav.some(n=>n.id===x.targetPage)));
})||new Set(selections.map(x=>x.patternId+'@'+x.targetPage)).size!==selections.length)throw Error('Invalid pattern selection or target route');
if(plan.brand?.palette){const colors=plan.brand.palette;if(['primary','secondary','accent','background','text'].some(key=>!/^#[0-9a-fA-F]{6}$/.test(colors[key]||''))||colors.primary.toUpperCase()!==plan.brand.primaryColor.toUpperCase())throw Error('Invalid five-color brand palette');}
const root=resolve(dest);
if(existsSync(root)&&readdirSync(root).length)throw Error('Output directory must be empty');
const settings={version:1,kind:plan.kind,layoutSlug:plan.layoutSlug,visualTheme:plan.visualTheme,brand:plan.brand,navigation:nav,primaryCta:plan.primaryCta,sectionPatterns:selections,site:'https://example.com',base:'/'};
const put=(path,body)=>{const p=join(root,path);mkdirSync(join(p,'..'),{recursive:true});writeFileSync(p,body,'utf8')};
put('site.config.json',JSON.stringify(settings,null,2)+'\n');
const assets={"package.json":"{\n  \"name\": \"student-astro-site\",\n  \"type\": \"module\",\n  \"private\": true,\n  \"scripts\": {\n    \"dev\": \"astro dev\",\n    \"build\": \"astro build\",\n    \"preview\": \"astro preview\"\n  },\n  \"dependencies\": {\n    \"astro\": \"^5.14.0\"\n  }\n}","astro.config.mjs":"import {defineConfig} from 'astro/config';\nimport config from './site.config.json' with {type:'json'};\nexport default defineConfig({site:process.env.SITE_URL||config.site,base:process.env.ASTRO_BASE_PATH||config.base,output:'static',trailingSlash:'always'});\n","src/content.config.ts":"import {defineCollection,z} from 'astro:content';\nimport {glob} from 'astro/loaders';\nexport const collections={articles:defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/articles'}),schema:z.object({title:z.string(),description:z.string(),publishedAt:z.coerce.date(),draft:z.boolean().default(false),tags:z.array(z.string()).default([])})})};\n","src/content/articles/.gitkeep":"","src/layouts/SiteLayout.astro":"---\nimport config from '../../site.config.json';\nconst {title,description=config.brand.tagline}=Astro.props;\nconst base=import.meta.env.BASE_URL;\n---\n<!doctype html><html lang=\"zh-Hant\"><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/><title>{title}｜{config.brand.name}</title><meta name=\"description\" content={description}/><link rel=\"canonical\" href={new URL(Astro.url.pathname,Astro.site??Astro.url).href}/><link rel=\"stylesheet\" href={base+'site.css'}/></head>\n<body><a href=\"#main\" class=\"skip\">跳到主要內容</a><header><a class=\"brand\" href={base}>{config.brand.name}</a><nav aria-label=\"主要導覽\">{config.navigation.map(x=><a href={base+x.id+'/'}>{x.label}</a>)}</nav><a class=\"button\" href={base+config.primaryCta.pageId+'/'}>{config.primaryCta.label}</a></header><main id=\"main\"><slot/></main><footer>© {new Date().getFullYear()} {config.brand.name}</footer></body></html>","src/pages/index.astro":"---\nimport config from '../../site.config.json';\nimport SiteLayout from '../layouts/SiteLayout.astro';\nconst base=import.meta.env.BASE_URL;\n---\n<SiteLayout title={config.brand.name}><section class:list={['hero','layout-'+config.layoutSlug]}><p class=\"eyebrow\">{config.kind==='knowledge'?'閱讀與內容':'專業服務'}</p><h1>{config.brand.name}</h1><p>{config.brand.tagline}</p><a class=\"button\" href={base+config.primaryCta.pageId+'/'}>{config.primaryCta.label} →</a></section><section class=\"interior\"><h2>從這裡開始</h2><div class=\"links\">{config.navigation.map((x,i)=><a href={base+x.id+'/'}><span>{String(i+1).padStart(2,'0')}</span><strong>{x.label}</strong><span>→</span></a>)}</div></section></SiteLayout>","src/pages/[page].astro":"---\nimport config from '../../site.config.json';\nimport SiteLayout from '../layouts/SiteLayout.astro';\nexport function getStaticPaths(){return config.navigation.filter(x=>x.id!=='articles').map(item=>({params:{page:item.id},props:{item}}))}\nconst {item}=Astro.props;\n---\n<SiteLayout title={item.label}><section class=\"interior\"><h1>{item.label}</h1><p>這裡尚未填入個人的正式內容，請先完成內容與設計驗收再公開。</p></section></SiteLayout>","src/pages/articles/index.astro":"---\nimport config from '../../../site.config.json';\nimport SiteLayout from '../../layouts/SiteLayout.astro';\nimport {getCollection} from 'astro:content';\nexport function getStaticPaths(){return config.navigation.some(x=>x.id==='articles')?[{params:{}}]:[]}\nconst articles=(await getCollection('articles',({data})=>!data.draft)).sort((a,b)=>b.data.publishedAt.getTime()-a.data.publishedAt.getTime());\nconst base=import.meta.env.BASE_URL;\n---\n<SiteLayout title=\"文章\"><section class=\"interior\"><h1>文章</h1>{articles.length?<div class=\"links\">{articles.map(x=><a href={base+'articles/'+x.id+'/'}>{x.data.title} →</a>)}</div>:<p>目前沒有公開文章。</p>}</section></SiteLayout>","src/pages/articles/[slug].astro":"---\nimport config from '../../../site.config.json';\nimport SiteLayout from '../../layouts/SiteLayout.astro';\nimport {getCollection,render} from 'astro:content';\nexport async function getStaticPaths(){if(!config.navigation.some(x=>x.id==='articles'))return [];return (await getCollection('articles',({data})=>!data.draft)).map(entry=>({params:{slug:entry.id},props:{entry}}))}\nconst {entry}=Astro.props;\nconst {Content}=await render(entry);\n---\n<SiteLayout title={entry.data.title} description={entry.data.description}><article class=\"interior prose\"><h1>{entry.data.title}</h1><p>{entry.data.description}</p><Content/></article></SiteLayout>","src/pages/404.astro":"---\nimport SiteLayout from '../layouts/SiteLayout.astro';\nconst base=import.meta.env.BASE_URL;\n---\n<SiteLayout title=\"找不到這個頁面\"><section class=\"interior\"><h1>找不到這個頁面</h1><a href={base}>返回首頁 →</a></section></SiteLayout>","public/site.css":":root{--brand:BRAND_HEX;--ink:#28231f;--bg:#f7f5f0;--line:#dad4c9}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.8 system-ui,\"Noto Sans TC\",sans-serif}a{color:inherit}a:focus-visible{outline:3px solid var(--brand);outline-offset:3px}.skip{position:absolute;left:-9999px}.skip:focus{top:8px;left:8px;background:#fff;padding:6px}header{display:flex;gap:24px;flex-wrap:wrap;align-items:center;padding:20px 4vw;border-bottom:1px solid var(--line)}header nav{margin-left:auto;display:flex;gap:20px;flex-wrap:wrap}.brand{font-weight:700;font-size:23px}.button{border:2px solid var(--brand);padding:10px 20px;border-radius:8px;font-weight:700;text-decoration:none}.hero{padding:clamp(60px,8vw,120px) 6vw;max-width:1200px;margin:auto}.hero h1{font-size:clamp(40px,7vw,90px);line-height:1.15}.eyebrow{font-size:13px;letter-spacing:.15em}.interior{max-width:1060px;padding:40px 24px 100px;margin:auto}.links{display:grid;gap:12px}.links a{display:flex;justify-content:space-between;text-decoration:none;border-bottom:1px solid var(--line);padding:16px 0}.prose{max-width:780px}footer{border-top:1px solid var(--line);padding:36px 4vw}.layout-radio-letter{background:#29251f;color:white}.layout-reading-atlas,.layout-field-notes,.layout-clinician{border-left:5px solid var(--brand)}.layout-coach,.layout-essayist{font-size:1.3em}.layout-companion,.layout-somatic{text-align:center}.layout-curator,.layout-collective{background:#eae4dc}.layout-learning-lab,.layout-trust-path{border-top:5px solid var(--brand)}@media(max-width:650px){header nav{margin-left:0;width:100%}}","README.md":"# 學員獨立 Astro Starter（第一階段）\n\n此匯出功能只提供**可建置的網站骨架**。版型仍須由 AI 根據原始 Layout Library 做真實構圖移植，不可聲稱已完成 12 款版型的視覺還原。\n\n- `npm install` → `npm run dev` → `npm run build`\n- 發布前修改 `site.config.json` 的 `site`、`base`，填寫真實內容。\n- 若使用 GitHub Pages 專案站，需要正確的 BASE_URL；Cloudflare 根網域通常使用 `/`。\n- 使用 astro-site-assembly、astro-starter-deploy、astro-site-maintenance Skills。\n- 未設定的服務、預約、文章不要假裝已經完成。\n"};
assets['.github/workflows/deploy.yml']=[
'name: Publish student Astro site',
'on:',
'  push:',
'    branches: [main]',
'  workflow_dispatch:',
'permissions:',
'  contents: read',
'  pages: write',
'  id-token: write',
'concurrency:',
'  group: github-pages',
'  cancel-in-progress: false',
'jobs:',
'  deploy:',
'    runs-on: ubuntu-latest',
'    environment:',
'      name: github-pages',
'      url: \u0024{{ steps.deploy.outputs.page_url }}',
'    steps:',
'      - uses: actions/checkout@v4',
'      - uses: actions/setup-node@v4',
'        with:',
'          node-version: "22"',
'      - run: npm install',
'      - run: npm run build',
'      - uses: actions/upload-pages-artifact@v3',
'        with:',
'          path: dist',
'      - id: deploy',
'        uses: actions/deploy-pages@v4'
].join('\n')+'\n';
// PR checks are intentionally read-only. A public Preview URL needs an actual
// Cloudflare Pages branch deployment or a separately configured safe Pages workflow.
assets['.github/workflows/pr-check.yml']=[
'name: Student PR build verification',
'on:',
'  pull_request:',
'  workflow_dispatch:',
'permissions:',
'  contents: read',
'jobs:',
'  verify:',
'    runs-on: ubuntu-latest',
'    steps:',
'      - uses: actions/checkout@v4',
'      - uses: actions/setup-node@v4',
'        with:',
'          node-version: "22"',
'      - run: npm install --no-audit --no-fund',
'      - run: npm run build',
'      - uses: actions/upload-artifact@v4',
'        with:',
'          name: student-pr-build',
'          path: dist'
].join('\\n')+'\\n';
assets['src/pages/index.astro']=assets['src/pages/index.astro'].replace("import SiteLayout from '../layouts/SiteLayout.astro';","import SiteLayout from '../layouts/SiteLayout.astro';\nimport SelectedPatterns from '../components/SelectedPatterns.astro';").replace('</SiteLayout>','<SelectedPatterns page="/" /></SiteLayout>');
assets['src/pages/[page].astro']=assets['src/pages/[page].astro'].replace("import SiteLayout from '../layouts/SiteLayout.astro';","import SiteLayout from '../layouts/SiteLayout.astro';\nimport SelectedPatterns from '../components/SelectedPatterns.astro';").replace('</SiteLayout>','<SelectedPatterns page={item.id} /></SiteLayout>');
assets['src/pages/articles/index.astro']=assets['src/pages/articles/index.astro'].replace("import SiteLayout from '../../layouts/SiteLayout.astro';","import SiteLayout from '../../layouts/SiteLayout.astro';\nimport SelectedPatterns from '../../components/SelectedPatterns.astro';").replace('</SiteLayout>','<SelectedPatterns page="articles" /></SiteLayout>');
assets['src/layouts/SiteLayout.astro']=assets['src/layouts/SiteLayout.astro'].replace("import config from '../../site.config.json';","import config from '../../site.config.json';\nimport SelectedPatterns from '../components/SelectedPatterns.astro';").replace('<footer>© {new Date().getFullYear()} {config.brand.name}</footer>',"{config.sectionPatterns?.some(x=>x.patternId.startsWith('footer-'))?<SelectedPatterns page=\"site-wide\" />:<footer>© {new Date().getFullYear()} {config.brand.name}</footer>}");
assets['src/components/StudentNavigation.astro']="---\nimport config from '../../site.config.json';\nconst base=import.meta.env.BASE_URL;\nconst roots=config.navigation.filter(x=>!x.parentId);\n---\n<nav class=\"student-navigation\" aria-label=\"主要導覽\">\n {roots.map(item=>{\n  const children=config.navigation.filter(x=>x.parentId===item.id);\n  return children.length?<details class=\"student-navigation__group\">\n    <summary>{item.label}<span aria-hidden=\"true\">⌄</span></summary>\n    <div class=\"student-navigation__submenu\">\n      <a href={base+item.id+'/'}>查看全部{item.label}</a>\n      {children.map(child=><a href={base+child.id+'/'}>{child.label}</a>)}\n    </div>\n   </details>:<a href={base+item.id+'/'}>{item.label}</a>\n })}\n</nav>\n<style>\n.student-navigation{display:flex;align-items:center;gap:4px 12px;flex-wrap:wrap;min-width:0}\n.student-navigation>a,.student-navigation summary{padding:9px 11px;display:flex;align-items:center;gap:8px;cursor:pointer;text-decoration:none;list-style:none;border-radius:6px;min-height:44px}\n.student-navigation summary::-webkit-details-marker{display:none}\n.student-navigation__group{position:relative}\n.student-navigation__submenu{position:absolute;z-index:30;min-width:210px;max-width:320px;top:100%;left:0;display:grid;gap:2px;padding:8px;background:var(--bg,#fff);color:var(--ink,#222);border:1px solid var(--line,#ddd);box-shadow:0 14px 28px rgba(0,0,0,.09);border-radius:10px}\n.student-navigation__group:not([open]) .student-navigation__submenu{display:none}\n.student-navigation__submenu a{display:block;padding:10px 12px;border-radius:6px;text-decoration:none;min-height:44px}\n.student-navigation a:hover,.student-navigation summary:hover{background:rgba(120,120,120,.1)}\n.student-navigation :is(a,summary):focus-visible{outline:3px solid var(--brand);outline-offset:2px}\n@media(max-width:740px){.student-navigation{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px}.student-navigation__submenu{position:static;min-width:0;max-width:none;box-shadow:none;margin-top:3px}.student-navigation__group{min-width:0}.student-navigation>a,.student-navigation summary{overflow-wrap:anywhere}}\n</style>\n";
assets['src/components/SelectedPatterns.astro']="---\nimport settings from '../../site.config.json';\ninterface Props {page:string}\nconst {page}=Astro.props;\nconst chosen=(settings.sectionPatterns||[]).filter(x=>x.targetPage===page);\nconst isFooter=chosen.some(x=>x.patternId.startsWith('footer-'));\nconst links=settings.navigation;\n---\n{chosen.map(choice=>\n  choice.patternId==='featured-work'?<section class=\"student-pattern\" aria-label=\"精選作品\">\n    <p class=\"pattern-label\">SELECTED WORK / 待完成</p><h2>代表作品與文章</h2><p>已選用作品展示組合樣板。請提供真實作品名稱、介紹與連結後，再由 AI 完成此區段。</p>\n    <p class=\"pattern-note\">規劃位置：{choice.insertAfter}</p>\n  </section>:choice.patternId==='trust-service-path'?<section class=\"student-pattern\" aria-label=\"服務適合度\">\n    <p class=\"pattern-label\">TRUST AND SERVICE / 待完成</p><h2>服務與合作方式</h2><p>已選用服務信任組合樣板。請提供實際服務、適合與不適合情況、必要政策，再由 AI 完成此區段。</p>\n    <p class=\"pattern-note\">規劃位置：{choice.insertAfter}</p>\n  </section>:choice.patternId.startsWith('footer-')?<footer class:list={['student-footer','student-footer--'+choice.patternId]}>\n    <div class=\"student-footer__main\"><div><p class=\"pattern-label\">PERSONAL WEBSITE</p><strong>{settings.brand.name}</strong><p>{settings.brand.tagline}</p></div>\n    <nav aria-label=\"頁腳導覽\"><h2>網站導覽</h2><div class=\"student-footer__links\">{links.map(x=><a href={import.meta.env.BASE_URL+x.id+'/'}>{x.label}</a>)}</div></nav></div>\n    <div class=\"student-footer__bottom\"><small>© {new Date().getFullYear()} {settings.brand.name}</small><span>法律及隱私權連結：尚未設定，不顯示假連結</span></div>\n  </footer>:null\n)}\n<style>\n.student-pattern{margin:clamp(32px,5vw,70px) auto;max-width:1060px;padding:clamp(24px,4vw,48px);background:var(--bg,#f7f5f0);border-top:3px solid var(--brand)}\n.student-pattern h2{font-size:clamp(26px,3vw,40px);margin:.3em 0}\n.student-pattern>p:not(.pattern-label){max-width:62ch}\n.pattern-note,.pattern-label{font-size:13px;letter-spacing:.04em}\n.student-footer{display:grid;gap:35px;padding:clamp(30px,6vw,72px) clamp(22px,5vw,80px);border-top:2px solid var(--brand)}\n.student-footer__main{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:32px}\n.student-footer__main strong{font-size:clamp(25px,4vw,44px)}\n.student-footer__main h2{font-size:17px}\n.student-footer__links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 18px}\n.student-footer__bottom{border-top:1px solid currentColor;padding-top:20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px}\n.student-footer--footer-editorial{background:#eee8dd}\n.student-footer--footer-professional{background:#292722;color:#fff}\n.student-footer--footer-minimal{background:#f7f5f0}\n@media(max-width:720px){.student-footer__main{grid-template-columns:1fr}}\n</style>\n";
assets['src/layouts/SiteLayout.astro']=assets['src/layouts/SiteLayout.astro']
 .replace("import config from '../../site.config.json';","import config from '../../site.config.json';\nimport StudentNavigation from '../components/StudentNavigation.astro';")
 .replace(/<nav aria-label="主要導覽">\{config\.navigation\.map\(x=><a href=\{base\+x\.id\+'\/'\}>\{x\.label\}<\/a>\)\}<\/nav>/,'<StudentNavigation />');
// Generated SEO endpoints belong to the learner website, not the research demo.
assets['src/pages/rss.xml.js'] = `import {getCollection} from 'astro:content';
import config from '../../site.config.json';
const esc=(value)=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
export async function GET({site}) {
 const origin=site||new URL(config.site||'https://example.com');
 const base=import.meta.env.BASE_URL;
 const items=config.navigation.some(x=>x.id==='articles')?(await getCollection('articles',({data})=>!data.draft)).sort((a,b)=>b.data.publishedAt-a.data.publishedAt):[];
 const url=(path)=>new URL(base+path,origin).href;
 const body='<?xml version="1.0" encoding="UTF-8"?>'+'<rss version="2.0"><channel><title>'+esc(config.brand.name)+'</title><link>'+esc(url(''))+'</link><description>'+esc(config.brand.tagline)+'</description>'+items.map(x=>'<item><title>'+esc(x.data.title)+'</title><link>'+esc(url('articles/'+x.id+'/'))+'</link><guid>'+esc(url('articles/'+x.id+'/'))+'</guid><pubDate>'+x.data.publishedAt.toUTCString()+'</pubDate><description>'+esc(x.data.description)+'</description></item>').join('')+'</channel></rss>';
 return new Response(body,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
`;
assets['src/pages/sitemap.xml.js'] = `import {getCollection} from 'astro:content';
import config from '../../site.config.json';
const esc=(value)=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;');
export async function GET({site}) {
 const origin=site||new URL(config.site||'https://example.com');
 const base=import.meta.env.BASE_URL;
 const paths=['',...config.navigation.map(x=>x.id+'/')];
 if(config.navigation.some(x=>x.id==='articles')) {
  const entries=await getCollection('articles',({data})=>!data.draft);
  for(const x of entries)paths.push('articles/'+x.id+'/');
 }
 const urls=[...new Set(paths)].map(path=>'<url><loc>'+esc(new URL(base+path,origin).href)+'</loc></url>').join('');
 return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls+'</urlset>',{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
`;
assets['src/pages/robots.txt.js'] = `export async function GET({site}) {
 const origin=site||new URL('https://example.com');
 const base=import.meta.env.BASE_URL;
 const demo=origin.hostname==='example.com'||origin.hostname.endsWith('.invalid');
 const body='User-agent: *\\n'+(demo?'Disallow: /':'Allow: /')+'\\nSitemap: '+new URL(base+'sitemap.xml',origin).href+'\\n';
 return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
`;
for(const [path,body] of Object.entries(assets)){
  if(path.startsWith('src/pages/articles/')&&!nav.some(x=>x.id==='articles'))continue;
  let actual=path==='public/site.css'?body.replace('BRAND_HEX',settings.brand.primaryColor):body;
  if(path==='public/site.css'&&settings.brand.palette){
    const colors=settings.brand.palette;
    actual=actual.replace('--ink:#28231f','--ink:'+colors.text).replace('--bg:#f7f5f0','--bg:'+colors.background).replace('--line:#dad4c9','--line:color-mix(in srgb, '+colors.text+' 20%, '+colors.background+')');
    actual+='\n:root{--brand-primary:'+colors.primary+';--brand-secondary:'+colors.secondary+';--brand-accent:'+colors.accent+';--brand-background:'+colors.background+';--brand-text:'+colors.text+';}\n';
  }
  if(path==='src/pages/articles/index.astro')actual=actual.replace(/export function getStaticPaths\(\)\{return config\.navigation\.some\(x=>x\.id==='articles'\)\?\[\{params:\{\}\}\]:\[\]\}\n/,'');
  put(path,actual);
}
console.log('Generated independent Astro scaffold:',root,'pages:',nav.map(x=>x.id));
