---
name: astro-content-publishing
description: Create and maintain real Markdown articles, Astro Content Collections, SEO metadata, RSS, sitemap, Pagefind and safe preview publishing for the beginner personal-site workshop.
---

# Astro Content Publishing

Apply this skill when adding, editing, importing manually, hiding, publishing, or troubleshooting articles; when changing article lists, tags, archives, dates, RSS, sitemap, canonical URLs, SEO metadata, or static full-text search. Use this with `astro-pr-preview` for GitHub publication and `astro-ui-craft` for layout changes.

## Mission and boundaries

Help a person with no coding background publish and maintain their own knowledge/blog or helper/professional-service website using AI. **The user supplies the words, identity, URLs, images, and professional facts.** Never invent article history, qualifications, testimonials, prices, contacts, newsletter success, or booked appointments.

This skill does **not** implement WordPress migration, a CMS, a database, subscriptions, payment processing, an application backend or a hosted publishing SaaS. Someone with an old site may provide approved exported text/media for a separate, carefully reviewed rebuild; never promise automatic URL preservation or seamless migration.

## Source of truth and mandatory reading

1. `src/content.config.ts`: actual Content Collection schema, loader and draft filtering.
2. `src/content/articles/*.md`: article frontmatter and real body content.
3. `src/data/articles-v2.ts`: compatibility **derived adapter** for existing cards, archives, tags and calendars; do not add article records here.
4. `src/site-map.ts`, `src/pages/[kind]/[theme]/articles/[slug].astro`, `src/components/ArticleArchive.astro`: actual routes, reading and browse behavior.
5. `src/layouts/DemoLayout.astro`, `src/pages/rss.xml.ts`, `src/pages/sitemap.xml.ts`, `public/robots.txt`: canonical/metadata, feed and crawl outputs.
6. `package.json`, `scripts/verify-v2-8-output.mjs`: build and output verification.
7. `.ai/astro-pr-preview/SKILL.md` before changing PR/deploy settings or publishing. Consult `.ai/astro-ui-craft/SKILL.md` for visual changes.

**Current repository files and generated routes outrank this document.** Inspect them before editing. Any fixed counts, paths or example domains here describe the workshop repository; when students clone it, parameterize for their repository and custom domain. Do not add hardcoded production URLs into general-purpose components.

## Workflow A — create or edit an article

1. Ask for the content/goal only when it cannot be derived; do not invent an author's story. Confirm the intended slug and public/draft status when publishing details are uncertain.
2. Inspect the schema and existing IDs. Create `src/content/articles/<slug>.md` with unique, stable ASCII slug. Do not modify generated `dist/`, Pagefind index, or the adapter manually.
3. Required frontmatter: `title`, `description`, `publishedAt`, `category`. Optional: `updatedAt`, `tags`, `readingMinutes`, `draft`, `cover` plus mandatory `coverAlt` when a cover is set, `canonicalURL` if needed.
4. Put the actual article in the Markdown body, with accessible headings, meaningful link text, licensed images and image alt. Do not inject fake examples or generic component demonstrations into an ordinary article.
5. For an existing post, keep the slug unchanged unless the user approves a URL-change plan. Set `updatedAt` when a meaningful published update occurs; do not silently rewrite `publishedAt`.
6. Use `draft: true` for unpublished articles. Verify that drafts are absent from public list, archive, feed, sitemap and static-search output. **A PR preview can still expose previewed content; don't put confidential drafts in public repository or publicly deployed previews.**
7. If users need additional rich content (callouts, tables, embeds), first inspect the available components/registry, then choose a supported representation. Don't rebuild an article renderer by duplicating component logic.

Example frontmatter and body: see `references/article-authoring.md`.

## Workflow B — site discovery and technical SEO

1. Verify `title` and `description` are accurate per page; never make eight Demo variants look like eight independent originals.
2. Check canonical on **production** and **PR preview**. The workshop's shared Demo article canonical currently resolves to the knowledge/paper article; a student's real site must select its own canonical root.
3. Ensure Open Graph and Twitter text are relevant; add an OG image only if an image has actually been configured. Do not invent social image files or author metadata. If structured data is used, its claims must reflect visible real content.
4. Inspect `sitemap.xml`, `rss.xml`, `robots.txt`, `404.html` in the built output. Links must point to real site URLs; RSS should not duplicate all eight thematic appearances of one article.
5. Preserve Pagefind's HTML-based build index (`astro build && pagefind --site dist --root-selector main`). Do **not** add another hardcoded metadata-only full-site search.
6. Maintain correct `import.meta.env.BASE_URL` for site links/assets and `ASTRO_BASE_PATH` for PR builds. Prevent PR preview pages from being indexed; don't assume robots.txt alone can isolate a preview subpath.
7. For each student deployment, check `astro.config.mjs` site/base and all absolute feed, sitemap and canonical links. The repository's `pikaOne1138.github.io` URLs are **not** universal defaults.

See `references/seo-and-release-checklist.md`.

## Workflow C — quality gate and release

1. Build the production configuration and the actual PR-specific `ASTRO_BASE_PATH` when possible. `npm run build` runs Pagefind and output smoke checks; inspect any failures, don't bypass checks to make CI green.
2. Verify generated Markdown content, no missing routes, actual list/tag/month/calendar/related links and search behavior; also verify article share, breadcrumbs and navigation.
3. Inspect the emitted RSS/Sitemap XML and canonical values; pay special attention to copied demo content or changed slugs. If a feature isn't covered by automated checks, report it as unverified rather than declaring success.
4. Use a feature branch + PR and await the **actual** GitHub Pages preview deployment and its verification. Verify 1440 / 1280 / 768 / 390 widths when UI changes, plus keyboard/phone interaction.
5. Hand off with changed files, example article path, public/draft status, actual checks and remaining risks. **Never merge without explicit user approval.**

## Definition of done

An authorized new article can be created as one Markdown file without editing TypeScript arrays, and a published article appears on an existing public URL, in article views, tags and dates, related links and site search. RSS, sitemap, metadata and preview index policy remain consistent. The article is readable and correctly routed at desktop and mobile sizes; no fictional claims or simulated publishing success.

If changes to an article's public URL, legal/medical content or data ownership are required, surface the tradeoff before implementation rather than silently choosing for the user.
