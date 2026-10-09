import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const content = path => readFileSync(new URL(path, dist), 'utf8');
const required = ['index.html', 'robots.txt', 'rss.xml', 'sitemap.xml', '404.html', 'knowledge/paper/articles/homepage-is-a-lobby/index.html'];
for (const path of required) {
  if (!existsSync(new URL(path, dist))) throw new Error('Build output missing: ' + path);
}
const rss = content('rss.xml');
const robots = content('robots.txt');
const expectedOrigin = new URL(process.env.ASTRO_SITE_URL || 'https://pikaOne1138.github.io').origin;
if (!robots.includes('Sitemap: ' + expectedOrigin + (process.env.ASTRO_BASE_PATH || '/astro-personal-site-starter').replace(/\/$/, '') + '/sitemap.xml')) throw new Error('robots.txt sitemap URL does not match build site/base');
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
