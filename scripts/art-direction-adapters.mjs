import {readFileSync,writeFileSync,mkdirSync,cpSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {nativeLayoutAdapters,composeNative} from './native-layout-adapters.mjs';
const sources=new URL('../src/data/art-direction-adapters/',import.meta.url);
const put=(root,path,body)=>{const target=join(root,path);mkdirSync(join(target,'..'),{recursive:true});writeFileSync(target,body)};
export const artDirectionAdapters = [
 {slug:'subject-atlas',kind:'knowledge',version:1,requiredAssets:[],requiredPages:['/','/articles/','/articles/[slug]/','/topics/','/topics/[slug]/','/about/','/search/','/rss.xml','/404/']},
 {slug:'practice-compass',kind:'helper',version:1,requiredAssets:[],requiredPages:['/','/services/','/about/','/faq/','/contact/','/privacy/','/search/','/404/']},
...nativeLayoutAdapters,
].map(adapter=>({...adapter,compose(root,settings){
 settings.layoutSlug=adapter.slug;settings.layoutDefinitionVersion=1;
 settings.layoutAdapter={id:adapter.slug,version:adapter.version,assemblyStatus:'in-progress',visualReview:'deferred',supportedPages:adapter.requiredPages};
 put(root,'site.config.json',JSON.stringify(settings,null,2)+'\n');
 // Generated sources use only local imports, never the research repository.
 cpSync(new URL('shared/',sources),join(root,'src'),{recursive:true,filter:source=>!String(source).endsWith('/site.css')});
 if(['subject-atlas','practice-compass'].includes(adapter.slug))cpSync(new URL(adapter.slug+'/',sources),join(root,'src'),{recursive:true,filter:source=>!String(source).endsWith('/Home.astro')});
 if(['subject-atlas','practice-compass'].includes(adapter.slug))put(root,'src/components/layouts/'+adapter.slug+'/Home.astro',readFileSync(new URL(adapter.slug+'/Home.astro',sources),'utf8'));
 put(root,'src/pages/index.astro',`---\nimport config from '../../site.config.json';\nimport SiteLayout from '../layouts/SiteLayout.astro';\nimport Home from '../components/layouts/${adapter.slug}/Home.astro';\n---\n<SiteLayout title={config.brand.name}><Home /></SiteLayout>\n`);
 if(nativeLayoutAdapters.some(a=>a.slug===adapter.slug)){
  if(settings.kind==='knowledge')cpSync(new URL('subject-atlas/pages/topics/',sources),join(root,'src/pages/topics'),{recursive:true});
  else cpSync(new URL('practice-compass/pages/',sources),join(root,'src/pages'),{recursive:true});
 }
 // Explicit static pages take precedence over the legacy catch-all.
 put(root,'src/pages/[...page].astro',readFileSync(new URL('shared/pages/[...page].astro',sources),'utf8'));
 put(root,'src/content.config.ts',`import {defineCollection,z} from 'astro:content';\nimport {glob} from 'astro/loaders';\nexport const collections={articles:defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/articles'}),schema:z.object({title:z.string(),description:z.string(),publishedAt:z.coerce.date(),draft:z.boolean().default(false),image:z.string().optional(),tags:z.array(z.string()).default([]),topics:z.array(z.string()).default([])})})};\n`);
 for(const name of ['FeaturedWorkSection','TrustServiceSection'])put(root,'src/components/patterns/'+name+'.astro',readFileSync(new URL('../src/components/patterns/'+name+'.astro',import.meta.url),'utf8'));
 for(const name of ['FeatureGrid','ServiceFit','TrustInfo','CTASection','Button'])put(root,'src/components/blocks/'+name+'.astro',readFileSync(new URL('../src/components/blocks/'+name+'.astro',import.meta.url),'utf8'));
 const css=readFileSync(new URL('shared/site.css',sources),'utf8');put(root,'public/site.css',css);
 // Preserve the existing full-text build and safety gates; add real discovered topic routes.
 const sitemap=readFileSync(join(root,'src/pages/sitemap.xml.js'),'utf8');
 put(root,'src/pages/sitemap.xml.js',sitemap.replace("const paths=['',...config.navigation.map(x=>x.path??x.id+'/')];","const paths=['',...config.navigation.map(x=>x.path??x.id+'/')];\n if(config.kind==='knowledge') for(const topic of config.artDirection.topics) paths.push((config.navigation.find(x=>x.id==='topics')?.path??'topics/')+topic.slug+'/');"));
 put(root,'START-HERE.md',`# ${settings.brand.name}\n\n這是 ${adapter.slug} 的獨立 Astro 網站，組裝狀態為 in-progress；本輪未做截圖驗收，尚未獲視覺核准。\n\n1. npm install\n2. npm run dev\n3. npm run build && npm run verify\n\n修改 site.config.json 的 brand、content、artDirection、pageContent 與 navigation。新增文章放在 src/content/articles/，未公開稿放 src/content/drafts/。topics 對應文章 frontmatter 的 topics 陣列。不要重新執行匯出器覆蓋已編輯的網站。\n\n正式上線前設定實際 site/base、真實資格／費用／聯絡方式，並取得持有人核准。搜尋使用 Pagefind；預設 noindex。\n`);
 if(nativeLayoutAdapters.some(a=>a.slug===adapter.slug))composeNative(root,settings);
 // Optional helper articles can retain the seed archive. Its old placeholder
 // renderer must not run beside the owning canvas's real ContentPatterns slot.
 const archivePath=join(root,'src/pages/articles/index.astro');
 if(existsSync(archivePath)){const archive=readFileSync(archivePath,'utf8').replace(/import SelectedPatterns from [^;]+;\n/g,'').replace(/<SelectedPatterns page="articles"\s*\/>/g,'');
 put(root,'src/pages/articles/index.astro',archive);}
 // This source root is packaging-only, not an imported extra homepage.
}}));
