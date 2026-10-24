import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,join,relative} from 'node:path';

export function inspectRelease({root='.',env=process.env,approvalRequired=true}={}){
 const errors=[],manual=[];
 const dir=resolve(root), dist=join(dir,'dist');
 const config=JSON.parse(readFileSync(join(dir,'site.config.json'),'utf8'));
 const raw=env.SITE_URL||env.CF_PAGES_URL||config.site;
 let url;
 try{url=new URL(raw);if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||url.pathname!=='/'||url.port)throw Error('not a clean HTTPS origin');
 const host=url.hostname.toLowerCase();
 if(host==='example.com'||host.endsWith('.example.com')||host==='localhost'||host.endsWith('.localhost')||host.endsWith('.invalid')||host.endsWith('.test')||host.endsWith('.example')||host==='127.0.0.1'||host==='0.0.0.0')throw Error('placeholder or local domain');
 }catch{errors.push('RELEASE_URL: set SITE_URL or site.config.json site to the real HTTPS production origin');}
 const base=env.ASTRO_BASE_PATH||config.base||'/';
 if(!base.startsWith('/')||!base.endsWith('/')||base.includes('//')||base.includes('..'))errors.push('BASE_URL: invalid base path');
 const expected=url?new URL(base,url).href:null;
 if(env.CF_PAGES==='1'&&(!env.CF_PAGES_BRANCH||env.CF_PAGES_BRANCH!==(env.CF_PAGES_PRODUCTION_BRANCH||'main')))errors.push('PREVIEW: Cloudflare preview branch is not production');
 if(!existsSync(dist))errors.push('DIST: run npm run build with production SITE_URL/ASTRO_BASE_PATH first');
 const read=p=>{try{return readFileSync(join(dist,p),'utf8')}catch{errors.push('DIST: missing '+p);return ''}};
 const html=[];
 const visit=p=>{if(!existsSync(p))return;for(const e of readdirSync(p,{withFileTypes:true})){const f=join(p,e.name);if(e.isDirectory())visit(f);else if(e.name.endsWith('.html'))html.push(f)}};
 visit(dist);
 if(!html.length)errors.push('DIST: no HTML emitted');
 const canonicalUrls=new Set();
 for(const file of html){
  const name=relative(dist,file).replaceAll('\\','/');
  const head=readFileSync(file,'utf8').match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]||'';
  const canonical=head.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0].match(/href=["']([^"']+)["']/i)?.[1];
  if(!canonical){errors.push('CANONICAL: missing '+name);continue}
  let parsed;
  try{parsed=new URL(canonical)}catch{errors.push('CANONICAL: invalid '+name);continue}
  if(expected&&!parsed.href.startsWith(expected))errors.push('CANONICAL: wrong site/base '+name);
  canonicalUrls.add(parsed.href);
  const og=head.match(/<meta\b[^>]*property=["']og:url["'][^>]*>/i)?.[0].match(/content=["']([^"']+)["']/i)?.[1];
  if(!og)errors.push('OG_URL: missing og:url '+name);
  else if(og!==canonical)errors.push('OG_URL: mismatch '+name);
  const robots=head.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0].match(/content=["']([^"']+)["']/i)?.[1]||'';
  if(env.SITE_INDEXABLE==='true' && /noindex/i.test(robots))errors.push('INDEXING: indexable production page has noindex '+name);
  if(env.SITE_INDEXABLE!=='true'&&!/noindex/i.test(robots))errors.push('INDEXING: private release missing noindex '+name);
 }
 const robots=read('robots.txt');
 const sitemap=read('sitemap.xml');
 const rss=read('rss.xml');
 if(expected){
  if(!robots.includes('Sitemap: '+expected+'sitemap.xml'))errors.push('ROBOTS: sitemap URL mismatch');
  if(!sitemap.includes(expected))errors.push('SITEMAP: site URL mismatch');
  if(!rss.includes(expected))errors.push('RSS: site URL mismatch');
  const links=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&'));
  if(!links.length)errors.push('SITEMAP: no entries');
  for(const loc of links)if(!loc.startsWith(expected))errors.push('SITEMAP: foreign URL '+loc);
  for(const href of canonicalUrls)if(!links.includes(href)&&!href.endsWith('/404/'))errors.push('SITEMAP: canonical not listed '+href);
 }
 if(!/^User-agent: \*$/m.test(robots))errors.push('ROBOTS: missing user agent');
 if(env.SITE_INDEXABLE==='true'){
  if(!/^Allow: \/$/m.test(robots)||/^Disallow: \/$/m.test(robots))errors.push('INDEXING: robots.txt blocks production');
 }else{
  if(!/^Disallow: \/$/m.test(robots))errors.push('INDEXING: nonindexable release must disallow crawling');
 }
 // There is no reliable way to infer that a third-party booking or contact endpoint works.
 const values=[config.serviceFacts?.contact,config.primaryCta?.url,config.bookingUrl,config.contactUrl,config.formUrl].filter(Boolean);
 for(const value of values)if(typeof value==='string'&&/example\.com|localhost|^#$|TODO|待設定/i.test(value))errors.push('SERVICE: placeholder contact/booking endpoint '+value);
 manual.push('Confirm that contact, booking, forms and newsletter links are configured and truly submit to owned services; any unavailable feature must be hidden or clearly labeled.');
 manual.push('Review real content, qualifications, prices, testimonials, licensing, privacy, media permissions and responsive behavior. None of these are proven by this script.');
 manual.push('Verify hosting platform Production/Preview branch policies and an independent live Preview. Cloudflare Git connection can deploy before this command runs.');
 if(approvalRequired){
  const sha=env.RELEASE_SHA||'';
  const approved=env.RELEASE_APPROVED_SHA||'';
  const approvedUrl=env.RELEASE_APPROVED_URL||'';
  if(!/^[0-9a-f]{40}$/.test(sha)||approved!==sha)errors.push('APPROVAL: require RELEASE_SHA (full current commit SHA) and matching RELEASE_APPROVED_SHA');
  if(!expected||approvedUrl!==expected)errors.push('APPROVAL: RELEASE_APPROVED_URL must match production site/base URL');
  manual.push('The declared SHA/URL match is machine-checked, but a human owner must independently approve this exact version and publication impact. CI cannot authenticate consent.');
 }
 return {ok:errors.length===0,errors,manual,site:expected,indexable:env.SITE_INDEXABLE==='true'};
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname)){
 const result=inspectRelease({root:process.argv[2]||'.'});
 for(const note of result.manual)console.log('MANUAL REVIEW REQUIRED:',note);
 if(result.errors.length){for(const err of result.errors)console.error('RELEASE FAIL:',err);process.exitCode=1}
 else console.log('RELEASE TECHNICAL GATE PASS (human review still required):',result.site);
}
