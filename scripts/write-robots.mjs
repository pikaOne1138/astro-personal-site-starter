import { writeFileSync } from 'node:fs';

const site = new URL(process.env.ASTRO_SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:4321');
const base = process.env.ASTRO_BASE_PATH || '/';
const prefix = base.endsWith('/') ? base : base + '/';
const sitemap = new URL(prefix + 'sitemap.xml', site.origin).href;
writeFileSync(new URL('../dist/robots.txt', import.meta.url),
  'User-agent: *\nAllow: /\nSitemap: ' + sitemap + '\n');
console.log('robots.txt sitemap:', sitemap);
