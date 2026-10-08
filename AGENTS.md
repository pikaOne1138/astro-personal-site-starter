# Agent Instructions

Before designing or modifying UI, read `.ai/astro-ui-craft/SKILL.md` and use its references as the design authority.

For GitHub PRs, previews, deployment, visual verification, or merging: **read `.ai/astro-pr-preview/SKILL.md` first**. Never claim a preview is deployed or merge a website PR without confirming the workflow and explicit user approval.

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
