import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const studentArg=process.argv.indexOf('--student-site');
if(studentArg!==-1){
 const root=process.argv[studentArg+1];
 if(!root)throw Error('Usage: --student-site /absolute/path/to/generated-site');
 const config=JSON.parse(readFileSync(join(root,'site.config.json'),'utf8'));
 const output=join(root,'dist');
 for(const path of ['index.html','404.html','rss.xml','sitemap.xml','robots.txt',...config.navigation.map(x=>x.id+'/index.html')])
  if(!existsSync(join(output,path)))throw Error('Student build missing: '+path);
 const read=path=>readFileSync(join(output,path),'utf8');
 const robots=read('robots.txt');
 if(!/^User-agent: \*$/m.test(robots)||!/^Sitemap: https?:\/\//m.test(robots)||robots.includes('\\n'))throw Error('Invalid student robots.txt lines');
 if(!read('rss.xml').includes('<rss version="2.0">')||!read('sitemap.xml').includes('<urlset'))throw Error('Invalid student feed/sitemap');
 console.log('Independent student output checks passed: routes, RSS, sitemap, robots lines. Visual/hosting verification remains required.');
 process.exit(0);
}

const dist = new URL('../dist/', import.meta.url);
const content = path => readFileSync(new URL(path, dist), 'utf8');
const required = ['index.html', 'robots.txt', 'rss.xml', 'sitemap.xml', '404.html', 'knowledge/paper/articles/homepage-is-a-lobby/index.html'];
for (const path of required) {
  if (!existsSync(new URL(path, dist))) throw new Error('Build output missing: ' + path);
}
const rss = content('rss.xml');
const robots = content('robots.txt');
const expectedOrigin = new URL(process.env.ASTRO_SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:4321').origin;
if (!robots.includes('Sitemap: ' + expectedOrigin + (process.env.ASTRO_BASE_PATH || '/').replace(/\/$/, '') + '/sitemap.xml')) throw new Error('robots.txt sitemap URL does not match build site/base');
if (!rss.includes(expectedOrigin)) throw new Error('RSS origin does not match build site');
if (!content('sitemap.xml').includes(expectedOrigin)) throw new Error('Sitemap origin does not match build site');
const sitemap = content('sitemap.xml');
const article = content('knowledge/paper/articles/homepage-is-a-lobby/index.html');
if (!rss.includes('<rss version="2.0">') || !rss.includes('homepage-is-a-lobby')) throw new Error('RSS missing article');
if (!sitemap.includes('<urlset') || !sitemap.includes('knowledge/paper/articles/homepage-is-a-lobby')) throw new Error('Sitemap missing canonical article');
if ((sitemap.match(/knowledge\/paper\/articles\/homepage-is-a-lobby\//g) ?? []).length !== 1) throw new Error('Duplicate article in sitemap');
if (!article.includes('rel="canonical"') || !article.includes('property="og:title"') || !article.includes('application/ld+json')) throw new Error('Missing article SEO metadata');
if (!article.includes('首頁只負責讓人知道下一步')) throw new Error('Markdown content was not rendered');
const preview = process.env.ASTRO_BASE_PATH?.includes('/pr-preview/');
if (preview && !article.includes('name="robots" content="noindex, nofollow, noarchive"')) throw new Error('Preview is missing noindex');
console.log('V2.8 output checks passed: RSS, Sitemap, article Markdown, canonical, OG, structured data' + (preview ? ', preview noindex' : ''));
