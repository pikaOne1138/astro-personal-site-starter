import { writeFileSync } from 'node:fs';

const site = new URL(process.env.ASTRO_SITE_URL || 'https://pikaOne1138.github.io');
const base = process.env.ASTRO_BASE_PATH || '/astro-personal-site-starter';
const prefix = base.endsWith('/') ? base : base + '/';
const sitemap = new URL(prefix + 'sitemap.xml', site.origin).href;
writeFileSync(new URL('../dist/robots.txt', import.meta.url),
  'User-agent: *\nAllow: /\nSitemap: ' + sitemap + '\n');
console.log('robots.txt sitemap:', sitemap);
