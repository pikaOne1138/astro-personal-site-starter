# Phase 2｜動效／UI supporting references C2

凍結 `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`，保存原始 Blob 和精確行號，原文不改，並非完整子條款語義審核。

## `.ai/astro-ui-craft/references/04-visual-systems.md`

Blob `c5d449625c209d361bdb18a209f0c84d397d9c2e` · 13 lines · 0 candidates.

| Source | Exact original | State |
|---|---|---|


## `.ai/astro-ui-craft/references/05-motion.md`

Blob `e527efaaee21ce3df533c6d30848a077bf040b6b` · 17 lines · 0 candidates.

| Source | Exact original | State |
|---|---|---|


## `.ai/astro-ui-craft/references/06-cta-content.md`

Blob `0ed86766ced3dfa843858ab400fa0a5984fe834e` · 16 lines · 0 candidates.

| Source | Exact original | State |
|---|---|---|


## `.ai/astro-ui-craft/references/07-article-service-pages.md`

Blob `f39fe940ad3da7f4a77496796f65e6e76ece1443` · 10 lines · 1 candidates.

| Source | Exact original | State |
|---|---|---|
| [L9](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/07-article-service-pages.md#L9) | For helper sites, clarity reduces anxiety. Do not hide basic process information merely to force contact. | NEEDS_REVIEW |

## `.ai/astro-ui-craft/references/08-responsive-accessibility.md`

Blob `888cf83b56c439e2f7bc9df65b33f49f6eebaf08` · 11 lines · 1 candidates.

| Source | Exact original | State |
|---|---|---|
| [L7](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/08-responsive-accessibility.md#L7) | - Sticky/fixed CTA must not cover content. | NEEDS_REVIEW |

## `.ai/astro-ui-craft/references/09-quality-gates.md`

Blob `93237c5d3a78dd3e879d511bb2a68cf24c8aadfc` · 13 lines · 1 candidates.

| Source | Exact original | State |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/09-quality-gates.md#L3) | Before handoff: | NEEDS_REVIEW |

## `.ai/astro-ui-craft/references/article-exploration-v2.md`

Blob `999d857a3a774bb429d7eb2ae1294d94e876634b` · 102 lines · 20 candidates.

| Source | Exact original | State |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L3) | > This reference extends V1.5. Read `COMPONENTS.md`, `src/data/blocks.registry.json`, and actual component Props before assembly. | NEEDS_REVIEW |
| [L14](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L14) | - `SiteSearchDialog` — accessible native `dialog` modal. Magnifying-glass icon in navbar; keyboard shortcuts `Ctrl+K` and `⌘K`; Esc closes; searches current website's *page titles, descriptions, article metadata, and service names*. Results link to actual routes and preserve current theme/kind. It is **not full-text page-body search** and must never be described as such. | NEEDS_REVIEW |
| [L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L16) | - Search dialog must be opaque, keyboard-accessible and focus trapped by native `showModal()`. Use existing design tokens, do not put a translucent overlay in the sticky header. | NEEDS_REVIEW |
| [L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L22) | - `ArticleCallout` — note / tip / warning in an **editorial footnote/sidenote** treatment: subtle top/bottom rules, clear hierarchy, no generic gray filled rounded card or thick colored left rail. Meaning must be conveyed in text, not color alone. | NEEDS_REVIEW |
| [L39](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L39) | Use one date/time convention per real site and distinguish published from updated dates. SEO canonical URLs and actual slug histories must be preserved when migrating WordPress content. | NEEDS_REVIEW |
| [L51](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L51) | Inherit the established four design personalities and type/spacing tokens. **優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。** | NEEDS_REVIEW |
| [L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L63) | - Build succeeds; preview URL is verified before claiming success. | NEEDS_REVIEW |
| [L69](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L69) | The V2 explorer scrolls below a sticky SiteNav. Each of the four themes **must have a fully opaque navigation backing** (including Botanical and Morning). Do not rely on transparent backgrounds or blurred translucent surfaces where search fields or page text can become visible behind nav labels. Verify screenshots at page top, halfway down, and scrolled with search field crossing navigation; confirm z-order and mobile CTA visibility. | NEEDS_REVIEW |
| [L72](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L72) | - `MobileMenu`: native dialog; pass an array of real navigation links. Esc, backdrop click, focus return, keyboard access. Mobile displays hamburger; never show decorative MENU without working navigation. | NEEDS_REVIEW |
| [L73](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L73) | - `BookingLink`: optional `href` (HTTPS external booking) or `embedUrl`; never pretend to submit unconfigured forms. Default is a clear unavailable state; always review external provider privacy. | NEEDS_REVIEW |
| [L75](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L75) | - `PricingDetails`: cost, duration, mode and terms; do not invent amounts, cancellation policy, insurance or credentials. | NEEDS_REVIEW |
| [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L76) | - `TrustInfo`: verifiable credentials, regions, format, real privacy URL and service scope/limitations. Never invent testimonials or crisis resources; provide correct region-specific information only when configured. | NEEDS_REVIEW |
| [L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L78) | - Every new block stays inside functional categories in /blocks/, in `blocks.registry.json`, and appears in at least one real demo route; do not make disconnected showcase-only blocks. Keep theme tokens, RWD and screenreader focus behavior. | NEEDS_REVIEW |
| [L83](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L83) | - `items:[{platform,href,label?}]`, `showLabels`, `size`. `previewPlatforms` is only for the block gallery and must not pretend to contain real working profiles. | NEEDS_REVIEW |
| [L84](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L84) | - Simple Icons pinned v16 SVG CDN (brand-specific trademark policies apply); contact/generic SVG is inlined. Never expose arbitrary off-domain URL schemes, do not fabricate accounts. For production privacy/reliability, optionally self-host selected brand icons. | NEEDS_REVIEW |
| [L89](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L89) | 文章頁 Breadcrumbs、上一篇／下一篇、LINE／Facebook／Email／剪貼簿分享、實際文章區域的閱讀進度。不能將 SocialLinks 當成文章分享。 | NEEDS_REVIEW |
| [L90](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L90) | Components are configurable Astro blocks, no heavy frontend framework dependency. Required: real route targets or explicit unconfigured state, keyboard focus, 375/390px responsive layout, SSR-readable content, reduced-motion, external-service transparency. Article URL handling must respect GitHub Pages BASE_URL. | NEEDS_REVIEW |
| [L93](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L93) | Add ResourceCard、ResourceLibrary、LeadMagnetCard、NewsletterSignup. 可設定真實資源網址；沒有電子報服務不得假裝表單已成功送出。 Preserve Astro static build, four theme tokens, BASE_URL, actual links, keyboard focus, mobile and reduced-motion. Keep functional block gallery and registry aligned; no automatic merge or fabricated user-facing content. | NEEDS_REVIEW |
| [L97](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L97) | `src/data/helper-content.ts` defines distinct demos for bodywork, counseling psychology, coaching and Reiki. These are content profiles, not restrictions on design themes. Never invent credentials or medical claims. `PractitionerCard` and `ServiceFit` are registered reusable blocks. | NEEDS_REVIEW |
| [L101](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/article-exploration-v2.md#L101) | `ArticleViewSwitcher` accepts `items` (article records with slug/title/excerpt/category/tags/publishedAt/readingMinutes), `articleBase`, `exploreBase`, `defaultView` and `filterable`. Use for both `/[kind]/[theme]/articles/` and `/explore/`, retaining URL-based search/filter behavior. Do not style all three as the same grid of identical cards. Accessible aria-pressed buttons switch list/cards/grid client-side. The reading/search dialog remains separate from the archive page. | NEEDS_REVIEW |

## `.ai/astro-ui-craft/references/component-library-v1.5.md`

Blob `281bcddef7bb4385a143d38b4a21ff6a95e913b3` · 67 lines · 6 candidates.

| Source | Exact original | State |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/component-library-v1.5.md#L3) | > The actual component interfaces are maintained in `COMPONENTS.md`, `src/data/blocks.registry.json`, and `src/components/blocks/*.astro`. This is a **design and assembly reference** for the `astro-ui-craft` Skill; never treat this file as a substitute for verifying the current source. | NEEDS_REVIEW |
| [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/component-library-v1.5.md#L35) | **優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。** | NEEDS_REVIEW |
| [L38](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/component-library-v1.5.md#L38) | - Spacing steps: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`. Do not mistake these spacing steps for a typography scale. | NEEDS_REVIEW |
| [L41](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/component-library-v1.5.md#L41) | - Do not invent intermediate font sizes (for example, `15px`) just for a small visual tweak; if a genuinely new token is needed, document reason and ask before modifying design system. | NEEDS_REVIEW |
| [L49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/component-library-v1.5.md#L49) | 3. Assemble Astro pages and provide meaningful content and real hrefs. Do not publish `#` placeholders as functional booking/forms or synthetic testimonials as real endorsements. | NEEDS_REVIEW |
| [L52](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/component-library-v1.5.md#L52) | 6. Run build; send GitHub PR preview for human review before merge, as described by `.ai/astro-pr-preview/SKILL.md`. | NEEDS_REVIEW |

Phase 2 IN PROGRESS; Phase 3/4 BLOCKED.
