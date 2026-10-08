# Agent Instructions

Before designing or modifying UI, read `.ai/astro-ui-craft/SKILL.md` and use its references as the design authority.

For GitHub PRs, previews, deployment, visual verification, or merging: **read `.ai/astro-pr-preview/SKILL.md` first**. Never claim a preview is deployed or merge a website PR without confirming the workflow and explicit user approval.

For articles, Content Collections, SEO, Pagefind, RSS, sitemap, draft/publication rules or content updates: **read `.ai/astro-content-publishing/SKILL.md` first** and follow its references. `src/content/articles/` is the source of truth; `src/data/articles-v2.ts` is a derived compatibility adapter, not a place to add articles.

For the interactive student planner at `/starter/`, read `src/data/starter-config.ts`, `src/pages/starter/index.astro`, and `.ai/astro-starter-onboarding/SKILL.md`. Layout selection, brand visual tokens and navigation plans must remain distinct. The planner exports a Site Brief, **not** a deployed or fully assembled independent site.

For student-owned GitHub Pages or optional Cloudflare deployment, read `.ai/astro-starter-deploy/SKILL.md`. For safe updates, backups or recovery, read `.ai/astro-site-maintenance/SKILL.md`. These skills must not silently alter the research showcase deployment.

Project goal: a beginner-editable Astro starter for two architectures:
- `knowledge`: knowledge/blog/personal publishing
- `helper`: helper/professional service

Visual themes:
- `paper`
- `morning`
- `studio`
- `botanical`

Rules:
1. Do not turn the project into a SaaS dashboard or CRM.
2. Preserve static-first architecture unless the user explicitly requests a web app.
3. UI refinement means typography, spacing, hierarchy, image treatment, motion restraint, responsive behavior, and accessibility—not adding decorative effects.
4. Preserve all eight demo URLs (two architectures × four styles), plus the `/blocks/` gallery.
5. Before designing or modifying UI, read `.ai/astro-ui-craft/SKILL.md` and its `references/component-library-v1.5.md`; for V2 article features also read `references/article-exploration-v2.md`. Prioritize existing design tokens and spacing/type scales: **do not silently introduce arbitrary design values.**
6. Before writing a new section, inspect `COMPONENTS.md` and `src/data/blocks.registry.json`, and reuse components under `src/components/blocks/` where suitable.
7. Component names and Props are the interface for AI-assisted assembly; preserve backwards compatibility.
8. Run `npm run build` before declaring completion; follow the PR Preview Skill and ask for explicit approval before merging.


## Practical blocks and safety (V2.5 internal milestone)
Use `src/data/blocks.registry.json` (41 blocks), `COMPONENTS.md`, and `.ai/astro-ui-craft/references/article-exploration-v2.md` together. New `MobileMenu`, `BookingLink`, `ContactActions`, `PricingDetails`, `TrustInfo`, and `MediaEmbed` must be reachable in the functional block gallery and actual demo pages. Never create inactive `#` submission links, pretend a booking or subscription exists, invent a professional license, contact policy, client testimonial, or crisis number. Preserve existing four themes, keyboard navigation, BASE_URL, and GitHub PR preview workflow. Keep milestone/version markers in developer docs, not public-facing pages.

## Shared social icons
`SocialLinks.astro` is the canonical icon + platform link component (Registry 42), also used by `ContactActions`. The component gallery uses preview-only icons with no fake profile URLs. Real site footers use verified project GitHub and project website links, not fabricated social accounts. Never replace configured profile URLs with brand home pages, and preserve link labels, social platform trademark guidelines and theme tokens.


### feat/v2-5-reading-sharing
Added Breadcrumbs、ArticleNavigation、ArticleShare、ReadingProgress. 文章頁 Breadcrumbs、上一篇／下一篇、LINE／Facebook／Email／剪貼簿分享、實際文章區域的閱讀進度。不能將 SocialLinks 當成文章分享。 Docs, registry and gallery must stay aligned; do not merge without user approval.

## Practical component batch feat/v2-5-resources-newsletter
Add ResourceCard、ResourceLibrary、LeadMagnetCard、NewsletterSignup. 可設定真實資源網址；沒有電子報服務不得假裝表單已成功送出。 Preserve Astro static build, four theme tokens, BASE_URL, actual links, keyboard focus, mobile and reduced-motion. Keep functional block gallery and registry aligned; no automatic merge or fabricated user-facing content.

## Four distinct helper-site content demos
Source of truth for helper marketing and FAQ copy: `src/data/helper-content.ts`. It demonstrates four distinct applications across paper/bodywork, morning/counseling, studio/coaching and botanical/Reiki. Layout components stay theme-agnostic; do not reinsert vague generic filler. Maintain clear scope, informed consent, no unverified licenses/medical claims and no false booking flows.


## Article index views and compact mobile navigation
Use `ArticleViewSwitcher` as the canonical article archive renderer; it supports list, cards and grid from the same article fixtures/data, real article links and optional filtering data attributes. Always preserve working explore search, tag/calendar/month filters and responsive design. The website navbar should contain one Articles navigation entry, a distinct Search icon and an icon-only mobile menu (aria-label), with optional social links inside the dialog; avoid duplicating a separate 'find articles' toolbar link. Do not manually hardcode the registry count.


## Search, canonical articles and Motion Skill
Search is built from **all rendered static HTML** by Pagefind after `astro build` (see `package.json`). Avoid hardcoded metadata indexes: the global SiteSearchDialog loads Pagefind relative to `import.meta.env.BASE_URL` and must work on Github Pages PR preview subpaths. Article pages are canonical at `/[kind]/[theme]/articles/`, with ArticleArchive combining list/cards/grid, query, tags, calendar and months; legacy `explore/` redirects retaining query/hash. Motion work MUST use `.ai/astro-motion-craft/SKILL.md`, preserve four themes and reduced-motion/touch/keyboard behavior. Manus effect APIs are reference-only until explicitly implemented; don't claim they've shipped.


## Mandatory motion-reference library
For motion-related requests, first read `.ai/astro-motion-craft/SKILL.md` and `.ai/astro-motion-craft/library/README.md`. Next consult `library/effect-catalog.md` and the matching recipe (`reveal-and-stagger`, `pointer-interactions`, or `content-interactions`). The recipes distinguish Manus v2 ZIP source behavior from our adaptation, and unimplemented references from actual components. Do not treat ZIP effects or Tailwind v4 as installed; do not introduce duplicate observers, global theme overrides or unverified animation claims. Update recipes and catalog when motion runtime changes.


## Dedicated effects gallery
`/effects/` is a separate accessible motion library. Effects runtime lives under `src/components/effects/` (Reveal, StaggerGroup, MotionCard, ZoomImage, MagneticButton, UnderlineLink, MotionFAQ), CSS in `public/effects.css`, and effects inventory in `src/data/effects.registry.json`. The seven effects are distinct from 53 website content blocks, so don't add them to `blocks.registry.json`. Motion Skill and source-grounded recipes MUST guide any new animation. Preserve no-JS visible content, reduced-motion/static fallbacks, pointer-fine-only 3D/spotlight/pan/magnetic, keyboard focus and all four themes. Demo is not evidence of production QA until browser tested.


## BackToTop / return to top
Use `src/components/blocks/BackToTop.astro` through `src/layouts/DemoLayout.astro`; do not copy/paste separate scroll handlers into each page. The shared control is hidden near the top, appears after its threshold, respects `prefers-reduced-motion`, has an accessible button label, 44+ px touch target, and uses existing four-theme tokens. When adding a new top-level layout, reuse this component. Do not count BackToTop as an effects-library item.


## Distinct layout library (not theme permutations)
`/layouts/` contains 12 structurally different native Astro homepage previews, driven by `src/data/layout-directions.json`; six knowledge/editorial and six professional care. Follow `.ai/astro-layout-craft/SKILL.md` for information architecture, section order, hero proportion and structural compositions. **Do not replace all 12 with the same template plus color variants.** These layouts are distinct from 54 functional blocks and 7 effects and are not registered as blocks. Ten concepts are adapted from the user's `astro-ten-site-directions.zip`; two are original extrapolations based on Claude research (not Claude-completed website source). Remote demo photos temporarily refer to user-published Manus assets; make content/licensing self-contained before selling templates.

## New editorial design source of truth

For layout-related AI tasks, consult `.ai/astro-layout-craft/SKILL.md` AND `.ai/astro-editorial-layout-design/SKILL.md`; never invent a generic hero/cards grid if original recipes exist. Forty exact reusable Astro compositions (12 Hero, 8 Sections, 6 Lists, 6 Rhythm, 8 CTA/Trust) are stored in the editorial skill recipes/code and rendered at `/layouts/recipes/`. Evidence and QA rules are supplied in references and checklists. Inspect 1440,1280,768,390 screenshots; green CI only proves build. Reading Atlas and Trust Path now use the source Claude examples, with explicitly fictional demonstration details.


## Claude editorial design integration (PR #20)
Before new layouts or refactors, read `.ai/astro-editorial-layout-design/SKILL.md` together with `.ai/astro-layout-craft/SKILL.md`. Claude's 40 numbered composition recipes live in `src/components/editorial-recipes/{heroes,sections,lists,rhythm,cta-trust}/` and are demoed at `/layouts/recipes/`; they are distinct from existing block and motion inventories. The original evidence / measurements / sample sources are preserved under `.ai/astro-editorial-layout-design/`. The two Claude pages are `src/pages/layouts/reading-atlas/index.astro` and `src/pages/layouts/trust-path/index.astro`. Visual acceptance requires actual 1440/1280/768/390 screenshots in addition to Astro build; do not claim this verification unless performed. Always distinguish [OBS]/[MEAS] source facts from [INF]/[NEW] advice.
