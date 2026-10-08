/** Compatibility adapter for existing demos. The Astro Content Collection is the only article source of truth. */
import { getCollection } from 'astro:content';

export interface ArticleRecord {
  slug: string; title: string; excerpt: string; category: string; tags: string[];
  publishedAt: string; readingMinutes: number;
}
const entries = await getCollection('articles', ({ data }) => !data.draft);
export const articlesV2: ArticleRecord[] = entries
  .map(({ id, data }) => ({
    slug: id, title: data.title, excerpt: data.description,
    category: data.category, tags: data.tags,
    publishedAt: data.publishedAt.toISOString().slice(0, 10),
    readingMinutes: data.readingMinutes,
  }))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));

export const articleTags = Array.from(new Set(articlesV2.flatMap(a => a.tags)))
  .map(name => ({ name, count: articlesV2.filter(a => a.tags.includes(name)).length }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-Hant'));

export const articleMonths = Array.from(new Set(articlesV2.map(a => a.publishedAt.slice(0, 7))))
  .sort().reverse()
  .map(month => ({ month, count: articlesV2.filter(a => a.publishedAt.startsWith(month)).length }));
