import {readFileSync,writeFileSync,mkdirSync,existsSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
const [input,dest]=process.argv.slice(2);
if(!input||!dest)throw Error('Usage: node scripts/export-starter.mjs plan.json output-dir');
const plan=JSON.parse(readFileSync(resolve(input),'utf8'));
const layouts=JSON.parse(readFileSync(new URL('../src/data/layout-directions.json',import.meta.url),'utf8'));
const allowed={knowledge:['articles','topics','start-here','about','resources'],helper:['services','first-visit','about','faq','articles','booking']};
const nav=(plan.navigation||[]).filter(x=>x.enabled);
if(plan.version!==1||!allowed[plan.kind]||!layouts.some(l=>l.kind===plan.kind&&l.slug===plan.layoutSlug)||!['paper','morning','studio','botanical'].includes(plan.visualTheme)||!/^#[0-9a-fA-F]{6}$/.test(plan.brand?.primaryColor||'')||!plan.brand?.name?.trim()||nav.length<2||nav.length>6||nav.some(x=>!allowed[plan.kind].includes(x.id)||!x.label?.trim())||new Set(nav.map(x=>x.id)).size!==nav.length||!nav.some(x=>x.id===plan.primaryCta?.pageId))throw Error('Invalid StarterPlan');
const root=resolve(dest);
if(existsSync(root)&&readdirSync(root).length)throw Error('Output directory must be empty');
const settings={version:1,kind:plan.kind,layoutSlug:plan.layoutSlug,visualTheme:plan.visualTheme,brand:plan.brand,navigation:nav,primaryCta:plan.primaryCta,site:'https://example.com',base:'/'};
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
].join('\\n')+'\\n';
for(const [path,body] of Object.entries(assets)){
  if(path.startsWith('src/pages/articles/')&&!nav.some(x=>x.id==='articles'))continue;
  let actual=path==='public/site.css'?body.replace('BRAND_HEX',settings.brand.primaryColor):body;
  if(path==='src/pages/articles/index.astro')actual=actual.replace(/export function getStaticPaths\(\)\{return config\.navigation\.some\(x=>x\.id==='articles'\)\?\[\{params:\{\}\}\]:\[\]\}\n/,'');
  put(path,actual);
}
console.log('Generated independent Astro scaffold:',root,'pages:',nav.map(x=>x.id));
