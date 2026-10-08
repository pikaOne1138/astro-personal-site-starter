# Article authoring reference

Use the latest `src/content.config.ts` as the schema authority. Example (demonstration content only, not a claimed real author or date):

```md
---
title: "我的第一篇文章"
description: "介紹這篇文章要回答的問題"
publishedAt: 2026-10-08
category: "生活筆記"
tags: ["日常", "觀察"]
readingMinutes: 4
draft: true
---

這裡寫自己的文章，不要沿用未授權的第三方內容。

## 第一個小節

描述真實內容與讀者需要知道的資訊。
```

- File path: `src/content/articles/my-first-post.md`. Keep the ID/slug stable.
- For edits to an already published article, preserve `publishedAt`, update `updatedAt` when appropriate.
- For cover images, configure `cover` and a descriptive `coverAlt` together.
- Existing starter demos reuse six teaching articles across eight presentations; they are examples, not a full production content catalog.
- `src/data/articles-v2.ts` derives its compatibility list from the collection. Do not add a duplicate literal list of articles.
- On a new learner site, do not retain generic Demo article component showcases unless explicitly requested.
