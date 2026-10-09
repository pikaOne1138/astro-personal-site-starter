import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? 'https://pikaone1138.github.io';
  const root = new URL(import.meta.env.BASE_URL, origin);
  const posts = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
  const items = posts.map(({ id, data }) => {
    const link = new URL('knowledge/paper/articles/' + encodeURIComponent(id) + '/', root).href;
    return '<item><title>' + esc(data.title) + '</title><link>' + esc(link) +
      '</link><guid isPermaLink="true">' + esc(link) + '</guid><description>' +
      esc(data.description) + '</description><pubDate>' +
      data.publishedAt.toUTCString() + '</pubDate></item>';
  }).join('');
  const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<rss version="2.0"><channel><title>網站設計展示 · 文章</title><link>' +
    esc(root.href) + '</link><description>知識與個人網站的示範文章</description><language>zh-TW</language>' +
    items + '</channel></rss>';
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
