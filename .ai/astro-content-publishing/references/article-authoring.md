# Article authoring reference

Use the latest `src/content.config.ts` as the schema authority. Example (demonstration content only, not a claimed real author or date):

```md
---
title: "我的第一篇文章"
description: "介紹這篇文章要回答的問題"
publishedAt: 2026-10-08
tags: ["日常", "觀察"]
draft: true
---

這裡寫自己的文章，不要沿用未授權的第三方內容。

## 第一個小節

描述真實內容與讀者需要知道的資訊。
```

- File path: `src/content/articles/my-first-post.md`. Keep the ID/slug stable.
- For edits to a published article, preserve `publishedAt`. Add `updatedAt` **only if the learner site's actual schema supports it**; the basic export does not require this field.
- For cover images, add `cover` with descriptive `coverAlt` **only after extending the learner site's content schema** and providing a licensed image.
- Research-site demo articles are examples, not a learner production catalog. The standalone learner export has its own minimal article schema: `title`, `description`, `publishedAt`, `draft`, and `tags`.
- Only the research showcase uses `src/data/articles-v2.ts`; it is **not** a required file or compatibility adapter in a generated learner project. Do not create duplicate literal article catalogs.
- On a new learner site, do not retain generic Demo article component showcases unless explicitly requested.
