import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string().min(1),
    tags: z.array(z.string()).default([]),
    readingMinutes: z.number().int().positive().default(5),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    canonicalURL: z.string().url().optional(),
  }).refine(data => !data.cover || Boolean(data.coverAlt), {
    message: '提供封面圖片時，必須設定 coverAlt。',
  }),
});

export const collections = { articles };
