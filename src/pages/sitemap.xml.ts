import type { APIRoute } from 'astro';
import { articlesV2 } from '../data/articles-v2';
import { kinds, themes } from '../data';
import { pageMap } from '../site-map';
import directions from '../data/layout-directions.json';

const escapeXML = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const GET: APIRoute = ({ site }) => {
  const base = new URL('/astro-personal-site-starter/', site?.origin ?? 'https://pikaone1138.github.io');
  const routes = new Set<string>([
    '', 'blocks/', 'effects/', 'layouts/', 'layouts/recipes/', 'explore/',
    ...['heroes', 'sections', 'lists', 'rhythm', 'cta-trust'].map(s => 'layouts/recipes/' + s + '/'),
    ...directions.map(d => 'layouts/' + d.slug + '/'),
  ]);
  for (const kind of kinds) for (const theme of themes) {
    const root = kind + '/' + theme + '/';
    routes.add(root);
    for (const page of pageMap[kind]) routes.add(root + page.id + '/');
    for (const article of articlesV2) routes.add(root + 'articles/' + encodeURIComponent(article.slug) + '/');
    if (kind === 'helper') for (const slug of ['first-conversation', 'deep-support']) routes.add(root + 'services/' + slug + '/');
  }
  const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    [...routes].map(route => '<url><loc>' + escapeXML(new URL(route, base).href) + '</loc></url>').join('') + '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
