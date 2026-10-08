# Astro Blocks V2 — Article Discovery & Rich Content Reference

> This reference extends V1.5. Read `COMPONENTS.md`, `src/data/blocks.registry.json`, and actual component Props before assembly.

## Added capabilities (12 blocks)

### Article discovery
- `ArticleSearch` — GET form with query parameter `q`
- `TagCloud` — linkable tags with usage counts (`tag`)
- `ArchiveMonths` — months and article counts (`month`)
- `PostCalendar` — Monday-first calendar with clickable publication dates (`date`)

### Full-site search
- `SiteSearchDialog` — accessible native `dialog` modal. Magnifying-glass icon in navbar; keyboard shortcuts `Ctrl+K` and `⌘K`; Esc closes; searches current website's *page titles, descriptions, article metadata, and service names*. Results link to actual routes and preserve current theme/kind. It is **not full-text page-body search** and must never be described as such.
- Keep the dedicated `/[kind]/[theme]/explore/` page for article filters, tags, month and calendar. They serve different tasks.
- Search dialog must be opaque, keyboard-accessible and focus trapped by native `showModal()`. Use existing design tokens, do not put a translucent overlay in the sticky header.

### Article body
- `ArticleAccordion` — native accessible `details/summary` foldout with slot.
- `ArticleList` — numbered or bulleted list based on items.
- `ArticleGrid` — two-/three-column layouts for side-by-side explanations, using slots.
- `ArticleCallout` — note / tip / warning in an **editorial footnote/sidenote** treatment: subtle top/bottom rules, clear hierarchy, no generic gray filled rounded card or thick colored left rail. Meaning must be conveyed in text, not color alone.
- `ArticleComparison` — captioned comparison tables using headers and rows.
- `RelatedArticles` — genuine internal related-post links.
- `ContentCarousel` — horizontal scroll-snap cards with actual next/previous controls, keyboard scrolling and reduced-motion handling.

## Data contract

`src/data/articles-v2.ts` is the **single workshop sample dataset**, with:
- `slug` (unique stable URL identifier)
- `title`, `excerpt`
- `category` (one primary classification)
- `tags` (multiple)
- `publishedAt` (YYYY-MM-DD)
- `readingMinutes`

`src/site-map.ts` derives article route generation from it. The standalone library browsing interface is `/explore/`; each full demo also owns `/{kind}/{theme}/explore/` with links to its **own** article pages, displaying real links to the generated `/knowledge/paper/articles/:slug/` example route. The sample articles and publication dates are *fixtures*, not claims of genuine published posts.

Use one date/time convention per real site and distinguish published from updated dates. SEO canonical URLs and actual slug histories must be preserved when migrating WordPress content.

## Search/archives implementation

- Search is a **client-side index over metadata** (title, excerpt, category, tags), not yet a full-body or multilingual ranked search engine.
- `q`, `tag`, `month`, `date` are URL parameters for linkable discovery states.
- Month counts, tag counts, calendar dates and visible results all derive from the same data set.
- Static-first: no custom server, database, or account.
- For a real larger site, replace fixtures with Astro Content Collections and consider build-time full-content indexing (e.g. Pagefind) in a separate iteration rather than pretending fixture search is universal full-text search.

## Design constraints

Inherit the established four design personalities and type/spacing tokens. **優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。**

Avoid launching an external runtime, complex search backend, or article editor for beginner workshop users. On mobile, archives and calendar stack below the results. Use semantic headings, links and focusable date controls. Keep date navigation and search useful without fabricated links.

## QA

- Search q matches title/category/tags/summary and shows an empty state.
- Clicking a tag/month/calendar date selects exactly matching articles and updates result count.
- Month calendar aligns Monday first, correct number of days, only published dates clickable.
- Every article result opens a real generated article URL.
- PR-specific BASE_URL works for CSS and every internal link.
- Two site architectures × four design personalities and original V1.5 block gallery remain intact.
- Build succeeds; preview URL is verified before claiming success.

## Full-site demo integration
All eight `{knowledge,helper} × {paper,morning,studio,botanical}` demo sites use `/[kind]/[theme]/explore/`. The `SiteNav.astro` **找文章** link is real and visible on mobile. Each demo's article list links to theme-specific detail pages and its tag/date chips return to its own explorer. Article pages demonstrate accordion, list, callout, grid, comparison table, content carousel, and related articles. Demo data remains illustrative. Keep original routes and global `/explore/` working.

## Sticky navigation overlay rule
The V2 explorer scrolls below a sticky SiteNav. Each of the four themes **must have a fully opaque navigation backing** (including Botanical and Morning). Do not rely on transparent backgrounds or blurred translucent surfaces where search fields or page text can become visible behind nav labels. Verify screenshots at page top, halfway down, and scrolled with search field crossing navigation; confirm z-order and mobile CTA visibility.

## Practical website blocks (V2.5 internal milestone; do not put version tags on visitor pages)
- `MobileMenu`: native dialog; pass an array of real navigation links. Esc, backdrop click, focus return, keyboard access. Mobile displays hamburger; never show decorative MENU without working navigation.
- `BookingLink`: optional `href` (HTTPS external booking) or `embedUrl`; never pretend to submit unconfigured forms. Default is a clear unavailable state; always review external provider privacy.
- `ContactActions`: optional email, phone, LINE link. Validate and omit invalid/unconfigured options; show clear unavailable state instead of dead links.
- `PricingDetails`: cost, duration, mode and terms; do not invent amounts, cancellation policy, insurance or credentials.
- `TrustInfo`: verifiable credentials, regions, format, real privacy URL and service scope/limitations. Never invent testimonials or crisis resources; provide correct region-specific information only when configured.
- `MediaEmbed`: YouTube via youtube-nocookie and optional HTML audio; for podcasts or unsupported platforms use an explicit external link; all videos have title, lazy loading and responsive 16:9 layout. Avoid autoplay.
- Every new block stays inside functional categories in /blocks/, in `blocks.registry.json`, and appears in at least one real demo route; do not make disconnected showcase-only blocks. Keep theme tokens, RWD and screenreader focus behavior.

### SocialLinks component
- `SocialLinks` displays curated social identity links as icon-only or icon+label; can be placed under shared navigation/footers, about profiles or contact sections.
- Supported platform keys: instagram, facebook, threads, youtube, line, github, linkedin, x, tiktok, pinterest, discord, telegram, spotify, email, phone, website, rss.
- `items:[{platform,href,label?}]`, `showLabels`, `size`. `previewPlatforms` is only for the block gallery and must not pretend to contain real working profiles.
- Simple Icons pinned v16 SVG CDN (brand-specific trademark policies apply); contact/generic SVG is inlined. Never expose arbitrary off-domain URL schemes, do not fabricate accounts. For production privacy/reliability, optionally self-host selected brand icons.
