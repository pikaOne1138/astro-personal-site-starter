import {readFileSync,writeFileSync,mkdirSync,cpSync,rmSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import expansion from '../src/data/layout-assembly/expansion-directions.json' with {type:'json'};
const sources=new URL('../src/data/layout-assembly/expanded/',import.meta.url);
const put=(root,path,text)=>{mkdirSync(dirname(join(root,path)),{recursive:true});writeFileSync(join(root,path),text)};
const page=(route,body='<Page route={route}/>')=>`---\nimport config from '../../site.config.json';\nimport SiteLayout from '../layouts/SiteLayout.astro';\nimport Page from '../components/layouts/expanded/Page.astro';\nconst route=${JSON.stringify(route)};\n---\n<SiteLayout title={route==='about'?'關於':config.brand.name}>${body}</SiteLayout>\n`;
export function composeNative(root,settings){
 settings.nativeLayout=true;
 settings.layoutAdapter.visualReview='pending';
 settings.artDirection.explicitPageIds=[...new Set([...settings.artDirection.explicitPageIds,'about'])];
 put(root,'site.config.json',JSON.stringify(settings,null,2)+'\n');
 put(root,'src/components/layouts/expanded/Page.astro',readFileSync(new URL(settings.layoutSlug+'/Page.astro',sources),'utf8'));
 put(root,'src/components/layouts/expanded/content.mjs',readFileSync(new URL('content.mjs',sources),'utf8'));
 for(const [path,route] of [['src/pages/index.astro',''],['src/pages/about.astro','about']])put(root,path,page(route));
 put(root,'src/pages/about/index.astro',page('about').replaceAll("'../../site.config.json'","'../../../site.config.json'").replaceAll("'../layouts/","'../../layouts/").replaceAll("'../components/","'../../components/"));rmSync(join(root,'src/pages/about.astro'));
 if(settings.kind==='knowledge'){
  put(root,'src/pages/articles/index.astro',page('articles').replaceAll("'../../site.config.json'","'../../../site.config.json'").replaceAll("'../layouts/","'../../layouts/").replaceAll("'../components/","'../../components/"));
  put(root,'src/pages/articles/[slug].astro',`---\nimport {getCollection,render} from 'astro:content';\nimport SiteLayout from '../../layouts/SiteLayout.astro';\nimport Page from '../../components/layouts/expanded/Page.astro';\nexport async function getStaticPaths(){const entries=(await getCollection('articles',({data})=>!data.draft)).sort((a,b)=>b.data.publishedAt-a.data.publishedAt);return entries.map((entry,i)=>({params:{slug:entry.id},props:{entry,previous:entries[i+1],next:entries[i-1]}}));}\nconst {entry,previous,next}=Astro.props;const {Content}=await render(entry);const base=import.meta.env.BASE_URL;\n---\n<SiteLayout title={entry.data.title} description={entry.data.description}><Page route={'articles/'+entry.id} entry={entry}><Content/><nav aria-label="其他文章">{previous&&<a href={base+'articles/'+previous.id+'/'}>← {previous.data.title}</a>}{next&&<a href={base+'articles/'+next.id+'/'}>{next.data.title} →</a>}</nav></Page></SiteLayout>\n`);
 }else{
  rmSync(join(root,'src/pages/services.astro'),{force:true});
  put(root,'src/pages/services/index.astro',page('services').replaceAll("'../../site.config.json'","'../../../site.config.json'").replaceAll("'../layouts/","'../../layouts/").replaceAll("'../components/","'../../components/"));
  put(root,'src/pages/services/[slug].astro',`---\nimport config from '../../../site.config.json';\nimport SiteLayout from '../../layouts/SiteLayout.astro';\nimport Page from '../../components/layouts/expanded/Page.astro';\nexport function getStaticPaths(){return config.services.filter(s=>s.published===true).map(service=>({params:{slug:service.slug},props:{service}}));}\nconst {service}=Astro.props;\n---\n<SiteLayout title={service.title} description={service.summary}><Page route={'services/'+service.slug}>{service.body.map(p=><p>{p}</p>)}</Page></SiteLayout>\n`);
 }

 // Helper families can also publish real collection articles on the same canvas.
 if(settings.kind==='helper'){
  put(root,'src/pages/articles/index.astro',`---\nimport {getCollection} from 'astro:content';\nimport SiteLayout from '../../layouts/SiteLayout.astro';\nimport Page from '../../components/layouts/expanded/Page.astro';\nconst posts=(await getCollection('articles',({data})=>!data.draft)).sort((a,b)=>b.data.publishedAt-a.data.publishedAt);const base=import.meta.env.BASE_URL;\n---\n<SiteLayout title="文章"><Page route="extra" extra={true}><section data-article-count={posts.length}><h1>文章</h1>{posts.length?posts.map(p=><article><h2><a href={base+'articles/'+p.id+'/'}>{p.data.title}</a></h2><p>{p.data.description}</p></article>):<p>目前沒有公開文章。</p>}</section></Page></SiteLayout>\n`);
  put(root,'src/pages/articles/[slug].astro',`---\nimport {getCollection,render} from 'astro:content';\nimport SiteLayout from '../../layouts/SiteLayout.astro';\nimport Page from '../../components/layouts/expanded/Page.astro';\nexport async function getStaticPaths(){return (await getCollection('articles',({data})=>!data.draft)).map(entry=>({params:{slug:entry.id},props:{entry}}));}const {entry}=Astro.props;const {Content}=await render(entry);\n---\n<SiteLayout title={entry.data.title} description={entry.data.description}><Page route="extra" extra={true}><article class="prose"><h1>{entry.data.title}</h1><p>{entry.data.description}</p><Content/><a href={import.meta.env.BASE_URL+'articles/'}>回文章索引</a></article></Page></SiteLayout>\n`);
 }
 // Preserve the selected native canvas around search, FAQ, contact, privacy and
 // custom owner pages as well; shared functional renderers stay unchanged.
 for(const path of ['src/pages/search.astro','src/pages/search/index.astro','src/pages/faq.astro','src/pages/contact.astro','src/pages/privacy.astro','src/pages/[...page].astro','src/pages/404.astro','src/pages/topics/index.astro','src/pages/topics/[slug].astro']){
  if(!existsSync(join(root,path)))continue;
  let source=readFileSync(join(root,path),'utf8');
  const prefix=path.includes('/topics/')||path.endsWith('/search/index.astro')?'../../':'../';
  source=source.replace('---\n',`---\nimport Page from '${prefix}components/layouts/expanded/Page.astro';\n`);
  source=source.replace(/(<SiteLayout[^>]*>)/,'$1<Page route="extra" extra={true}>').replace('</SiteLayout>','</Page></SiteLayout>');
  put(root,path,source);
 }
 // Real service detail routes participate in sitemap; no prototype fixed slug.
 const file=join(root,'src/pages/sitemap.xml.js');let xml=readFileSync(file,'utf8');xml=xml.replace("const paths=['',...config.navigation.map(x=>x.path??x.id+'/')];","const paths=['',...config.navigation.map(x=>x.path??x.id+'/')];for(const s of config.services??[])if(s.published===true)paths.push('services/'+s.slug+'/');");writeFileSync(file,xml);
 const layout=join(root,'src/layouts/SiteLayout.astro');let html=readFileSync(layout,'utf8');html=html.replace('<header class="site-header">','{!config.nativeLayout&&<header class="site-header">').replace('</header><main','</header>}<main');html=html.replace('{config.sectionPatterns?.some','{!config.nativeLayout&&(config.sectionPatterns?.some').replace('</footer>}</body>','</footer>)}</body>');writeFileSync(layout,html);
}
export const nativeLayoutAdapters=expansion.filter(d=>d.engine==='native-expansion').map(d=>({slug:d.slug,kind:d.kind,version:1,requiredPages:d.kind==='knowledge'?['/','/articles/','/articles/[slug]/','/about/']:['/','/services/','/services/[slug]/','/about/']}));
