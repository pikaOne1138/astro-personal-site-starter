import {readFileSync,writeFileSync,mkdtempSync,existsSync,readdirSync,renameSync,rmSync,lstatSync,cpSync,mkdirSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {artDirectionAdapters} from './art-direction-adapters.mjs';
const args=process.argv.slice(2),strict=args.includes('--require-ready'),allowed=args.includes('--allow-in-progress');
const positional=args.filter(x=>!x.startsWith('--'));
if(args.some(x=>x.startsWith('--')&&!['--require-ready','--allow-in-progress'].includes(x))||positional.length!==2)throw Error('Usage: node scripts/export-art-direction-starter.mjs plan.json empty-output-dir --allow-in-progress');
const [input,dest]=positional;const plan=JSON.parse(readFileSync(resolve(input),'utf8'));
const adapter=artDirectionAdapters.find(a=>a.slug===plan.layoutSlug&&a.kind===plan.kind);
if(!adapter)throw Error('Unsupported Art Direction slug/kind');
if(strict||!allowed)throw Error('Assembly in Progress: visual review is deferred, not Starter Ready. Explicit --allow-in-progress required.');
const text=(s,label,max=5000)=>{if(typeof s!=='string'||s.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s))throw Error('Invalid '+label);return s};
const list=(v,label)=>{if(v===undefined)return [];if(!Array.isArray(v)||v.length>50)throw Error('Invalid '+label);return v.map(s=>text(s,label))};
const https=(v,label)=>{if(!v)return '';text(v,label,2000);let u;try{u=new URL(v)}catch{throw Error('Invalid '+label)}if(u.protocol!=='https:'||u.username||u.password)throw Error('HTTPS URL without credentials required: '+label);return u.href};
if(plan.brand?.heroImagePath||plan.brand?.logoPath||plan.brand?.heroImageDataUrl||plan.brand?.logoDataUrl)throw Error('These text-first adapters do not yet support image asset inputs');
if(plan.brand?.typography&&!['editorial-serif','clear-sans','balanced'].includes(plan.brand.typography))throw Error('Invalid typography preset');
const supplied=plan.artDirection||{};
const data={...supplied,serviceFacts:{scope:plan.serviceFacts?.scope,credentials:plan.serviceFacts?.qualification,format:plan.serviceFacts?.method,duration:plan.serviceFacts?.duration,price:plan.serviceFacts?.price,cancellation:plan.serviceFacts?.cancellation,...supplied.serviceFacts}};const content={headline:text(plan.content?.headline||'','headline'),intro:text(plan.content?.intro||'','intro')};
const topics=data.topics===undefined?[]:data.topics;
if(!Array.isArray(topics)||topics.length>50||topics.some(t=>!t||!/^([a-z0-9]+-)*[a-z0-9]+$/.test(t.slug)||t.slug.length>64)||new Set(topics.map(t=>t.slug)).size!==topics.length)throw Error('Invalid or duplicate topic slug');
const normalizedTopics=topics.map(t=>({slug:t.slug,title:text(t.title,'topic title',120),description:text(t.description||'','topic description')}));
const facts={};for(const k of ['scope','credentials','format','duration','price','cancellation'])facts[k]=text(data.serviceFacts?.[k]||'',k);
const faq=data.faq||[];if(!Array.isArray(faq)||faq.length>50)throw Error('Invalid faq');
const questions=faq.map(q=>({question:text(q.question,'question',300),answer:text(q.answer,'answer')}));
const rawVisitorIntents=data.visitorIntents??[];
if(!Array.isArray(rawVisitorIntents)||rawVisitorIntents.length>6)throw Error('Invalid visitorIntents: expected up to six visitor reading entries');
const allowedIntentTargets=new Set(['fit','services','faq']);
const visitorIntents=rawVisitorIntents.map((intent,i)=>{if(!intent||!allowedIntentTargets.has(intent.target))throw Error('Invalid visitorIntent target '+i);return {title:text(intent.title,'visitorIntent title',140),detail:text(intent.detail,'visitorIntent detail',500),target:intent.target}});

const email=data.contact?.email||'';if(email&&(!/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)||email.length>254))throw Error('Invalid contact email');
const contact={email,url:https(data.contact?.url,'contact URL'),bookingUrl:https(data.contact?.bookingUrl,'booking URL')};
const pageContent=Object.create(null);for(const [key,value] of Object.entries(plan.pageContent||{}))pageContent[key]=list(value,'page paragraphs');
if(!pageContent.about?.length)pageContent.about=['bio','purpose','approach','background'].map(k=>plan.about?.[k]).filter(v=>typeof v==='string'&&v.trim()).map(v=>text(v,'about paragraph'));
// Essential routes are explicit and cannot be silently disabled or moved.
const essentials=plan.kind==='knowledge'?[['articles','文章','articles/'],['topics','主題','topics/'],['about','關於','about/'],['page-search','搜尋','search/']]:[['services','服務說明','services/'],['about','關於','about/'],['faq','FAQ','faq/'],['page-contact','聯絡','contact/'],['page-privacy','隱私','privacy/'],['page-search','搜尋','search/']];
const navigation=Array.isArray(plan.navigation)?structuredClone(plan.navigation):[];
for(const [id,label,path] of essentials){const existing=navigation.find(x=>x.id===id);if(existing){if(existing.enabled===false||existing.parentId||(existing.path&&existing.path!==path))throw Error('Essential route must stay enabled at '+path);existing.path=path;existing.enabled=true}else navigation.push({id,label,path,enabled:true});}
for(const item of navigation)if(item.enabled){item.path=item.path??item.id+'/';if(essentials.some(([id,,path])=>item.id!==id&&item.path===path))throw Error('Reserved essential route collision');if(item.path==='topics/'&&plan.kind==='helper')throw Error('Topics route requires knowledge adapter');}
if(plan.kind==='helper'&&navigation.some(x=>x.enabled&&x.path.startsWith('topics/')))throw Error('Helper adapter has no topic renderer');
if(navigation.some(x=>x.enabled&&x.path.startsWith('topics/')&&x.path!=='topics/'))throw Error('Topic detail paths are reserved');
if((plan.sectionPatterns||[]).some(p=>!p.patternId?.startsWith('footer-')))throw Error('Only the site-wide footer extension is supported in these adapters; non-footer patterns need an explicit composition integration.');
const root=resolve(dest);if(existsSync(root)&&(!lstatSync(root).isDirectory()||lstatSync(root).isSymbolicLink()))throw Error('Output must be a normal empty directory');if(existsSync(root)&&readdirSync(root).length)throw Error('Output directory must be empty; edited student websites are never overwritten');
const workspace=mkdtempSync(join(tmpdir(),'art-direction-export-'));
try{
 const inherited={...plan,brand:{...plan.brand,tagline:text(plan.brand?.tagline||'','tagline')},navigation,layoutSlug:plan.kind==='knowledge'?'field-notes':'clinician'};
 // Reuse the reviewed scaffold/security implementation; the selected surrogate is never shipped.
 const seed=join(workspace,'seed.json'),generated=join(workspace,'site');writeFileSync(seed,JSON.stringify(inherited));
 const run=spawnSync(process.execPath,[new URL('./export-starter.mjs',import.meta.url).pathname,seed,generated],{encoding:'utf8'});if(run.status!==0)throw Error('Starter scaffold validation failed: '+run.stderr);
 const settings=JSON.parse(readFileSync(join(generated,'site.config.json'),'utf8'));
 settings.content=content;settings.pageContent=pageContent;
 settings.artDirection={topics:normalizedTopics,scope:{suitable:list(data.scope?.suitable,'suitable'),notSuitable:list(data.scope?.notSuitable,'notSuitable')},serviceFacts:facts,faq:questions,visitorIntents,contact,explicitPageIds:plan.kind==='knowledge'?['articles','topics','page-search']:['services','faq','page-contact','page-privacy','page-search']};
 adapter.compose(generated,settings);
 // Local source inputs only: copy Markdown from an explicitly supplied sibling directory.
 if(plan.contentDirectory){
  const relativeContent=text(plan.contentDirectory,'contentDirectory',2000);
  if(relativeContent.startsWith('/')||relativeContent.includes('\\')||relativeContent.split('/').some(x=>!x||x==='.'||x==='..'))throw Error('contentDirectory must be a relative descendant of the Site Brief folder');
  const parent=dirname(resolve(input));const source=resolve(parent,relativeContent);
  if(!existsSync(source)||!lstatSync(source).isDirectory())throw Error('Configured contentDirectory does not exist');
  let checked=parent;for(const segment of relativeContent.split('/')){checked=join(checked,segment);if(existsSync(checked)&&lstatSync(checked).isSymbolicLink())throw Error('Content directory symlinks are not supported');}
  for(const folder of ['articles','drafts']){const directory=join(source,folder);if(!existsSync(directory))continue;
   if(lstatSync(directory).isSymbolicLink())throw Error('Content directory symlinks are not supported');
   const names=readdirSync(directory);if(names.length>500)throw Error('Too many content files');
   for(const name of names){if(!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)||!lstatSync(join(directory,name)).isFile()||lstatSync(join(directory,name)).isSymbolicLink())throw Error('Only flat Markdown article files are supported');if(lstatSync(join(directory,name)).size>1024*1024)throw Error('Content file too large');cpSync(join(directory,name),join(generated,'src/content',folder,name));}
  }
 }
 const pkg=JSON.parse(readFileSync(join(generated,'package.json'),'utf8'));pkg.scripts.build=pkg.scripts.build.replace('node scripts/audit-generated-links.mjs dist','node scripts/verify-navigation.mjs');writeFileSync(join(generated,'package.json'),JSON.stringify(pkg,null,2)+'\n');
 writeFileSync(join(generated,'scripts/verify-navigation.mjs'),`import {auditLinks} from './audit-generated-links.mjs';\nimport config from '../site.config.json' with {type:'json'};\nconst result=auditLinks('dist',process.env.ASTRO_BASE_PATH||config.base||'/');\nif(result.failures.length)throw Error(result.failures.join('\\n'));\nconsole.log('Independent internal routes PASS:',result.pages);\n`);
 // A build-time route validates configured topic references before generating any public content.
 if(plan.kind==='knowledge'){
  writeFileSync(join(generated,'src/pages/topics/index.astro'),readFileSync(join(generated,'src/pages/topics/index.astro'),'utf8').replace("const posts=await getCollection('articles',({data})=>!data.draft);","const posts=await getCollection('articles',({data})=>!data.draft);for(const entry of posts)for(const topic of entry.data.topics)if(!config.artDirection.topics.some(t=>t.slug===topic))throw Error('Unknown topic '+topic+' in '+entry.id);"));
 }
 mkdirSync(dirname(root),{recursive:true});if(existsSync(root))rmSync(root,{recursive:true});renameSync(generated,root);
 console.log('Independent Art Direction adapter exported:',adapter.slug,root,'Assembly in Progress; screenshots deferred');
}finally{rmSync(workspace,{recursive:true,force:true})}
