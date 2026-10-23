# Agent Instructions

Project goal: a beginner-editable Astro starter for two architectures:
- `knowledge`: knowledge/blog/personal publishing
- `helper`: helper/professional service

Visual themes are defined in code, not listed here: the demo pages use `themes` in `src/data.ts`; the `/starter/` planner uses `starterThemes` in `src/data/starter-config.ts`. Read them instead of assuming a number or a list.

This file is the entry point. It holds the standing rules and tells you which Skill to read for each kind of task. Detailed procedure lives in `.ai/*/SKILL.md`, not here.

## Standing rules

1. Do not turn the project into a SaaS dashboard or CRM.
2. Preserve static-first architecture unless the user explicitly requests a web app.
3. UI refinement means typography, spacing, hierarchy, image treatment, motion restraint, responsive behavior, and accessibility—not adding decorative effects.
4. Do not remove or rename existing public routes (demo pages under `/[kind]/[theme]/`, `/blocks/`, `/effects/`, `/layouts/`, `/section-patterns/`, `/templates/`, `/starter/`, `/guide/`) unless the user asks. The list of routes comes from `src/pages/` and the registries, not from this file.
5. Before designing or modifying UI, read `.ai/astro-ui-craft/SKILL.md` and its `references/component-library.md`; for article features also read `references/article-exploration.md`. Prioritize existing design tokens and spacing/type scales: **do not silently introduce arbitrary design values.**
6. Before writing a new section, inspect `COMPONENTS.md` and `src/data/blocks.registry.json`, and reuse components under `src/components/blocks/` where suitable.
7. Component names and Props are the interface for AI-assisted assembly; preserve backwards compatibility.
   - On a single student website, change the existing component to fit what the student needs rather than adding a near-duplicate beside it. Add a new component only when the student explicitly asks for one.
8. Run `npm run build` before declaring completion; follow the PR Preview Skill and ask for explicit approval before merging.
9. Always preserve every existing visual theme, keyboard navigation, `BASE_URL`, reduced-motion behavior and the GitHub PR preview workflow.

## External libraries and repositories are reference-only

Do not install an outside repository's Skills, packages, MCP servers or CLI, and do not copy its brand, photos, copy, paid effects or full UI implementation. Borrow abstract design principles, written in our own words. An open-source label (MIT, Apache) is not enough: check the license file by file, Astro suitability, performance, security and accessibility first, and note that a tool's license can differ from the license of the assets or effects it distributes. Any code port goes in its own branch and PR, with a static Astro build and 1440/1280/768/390 QA, and is not merged without the user's explicit confirmation. Existing lists of outside resources are `src/data/external-ui-libraries.json` and `src/data/external-motion-resources.json`.

## Never fake it

- No inactive `#` submission links. Do not pretend a booking, subscription or newsletter signup exists or succeeded; without a real service, do not show a success state.
- Do not invent a professional license, contact policy, client testimonial, crisis number, medical claim, or social account. Keep scope and informed consent clear in helper content.
- Do not claim a Preview is deployed, or merge a website PR, without confirming the real Preview URL, its commit, and explicit user approval.
- Do not claim verification you did not perform: screenshots, browser QA, motion QA. A demo or green CI is not evidence of production QA; green CI only proves the build.
- Do not fake content-readiness evidence, a human tree-test result or Google indexing status.
- Keep milestone/version markers in developer docs, not public-facing pages.

## Keep these files timeless

Do not put version numbers, PR numbers, branch names, milestone names, dates, or counts in `AGENTS.md`, `.ai/*/SKILL.md` or their file names (for example `…-v2.md`, "added in PR #20", "41 blocks"). They go stale and then mislead the next AI. State the rule, and point to the file that holds the current facts (a registry, a data file, `package.json`). History belongs in Git and in `docs/`.

## Which Skill to read

| Task | Read first |
|---|---|
| A student asks to build a site and the route is unclear (replica, Starter, or from scratch) | `.ai/astro-site-entry/SKILL.md` — it only routes; it picks one of the next three rows |
| Replicate or migrate an existing site the user owns or is authorized to use | `.ai/url-to-frontend-replica/SKILL.md` |
| Build from scratch by talking with the student, no planner first | `.ai/astro-site-from-zero/SKILL.md` |
| Interview the student, reference-site analysis, design direction, Design Brief | `.ai/astro-design-consultation/SKILL.md`; student-facing interview and intake prompts are in `docs/student-intake/` |
| Turn a validated Site Brief JSON into a standalone site | `.ai/astro-site-assembly/SKILL.md` |
| Design or modify UI, tokens, Blocks | `.ai/astro-ui-craft/SKILL.md` |
| GitHub PRs, previews, deployment, visual verification, merging | `.ai/astro-pr-preview/SKILL.md` — a dual-platform Skill: detect GitHub Pages, Cloudflare Pages or Cloudflare Workers from the student's own repository and actual deployment records. The showcase's GitHub Pages preview workflow is repository-specific, not a universal student requirement. |
| Maintaining THIS repo's own GitHub Pages preview pipeline (workflows, reconcile, recovery). Not for students. | `docs/github-pr-preview-setup.md` |
| Articles, Content Collections, SEO, Pagefind, RSS, sitemap, drafts, publication | `.ai/astro-content-publishing/SKILL.md` and its references |
| Interactive planner at `/starter/` | `src/data/starter-config.ts`, `src/pages/starter/index.astro`, `.ai/astro-starter-onboarding/SKILL.md` |
| Content readiness after choosing pages/Section Patterns | `.ai/astro-content-readiness/SKILL.md` |
| Menu labels and hierarchy | `.ai/astro-navigation-tree-test/SKILL.md` |
| After an actual independent site deployment | `.ai/astro-launch-health-check/SKILL.md` |
| Student-owned GitHub Pages / optional Cloudflare deployment | `.ai/astro-starter-deploy/SKILL.md` |
| Safe updates, backups, recovery | `.ai/astro-site-maintenance/SKILL.md` |
| Multi-block page sections, `/section-patterns/` | `.ai/astro-section-pattern-craft/SKILL.md` and `src/data/section-patterns.registry.json` |
| Maintaining THIS repo's layout definitions, adapters and readiness states. Not for students. | `docs/layout/layout-assembly.md` |
| Whole-page layout, section order, hero | `.ai/astro-layout-craft/SKILL.md` **and** `.ai/astro-editorial-layout-design/SKILL.md` |
| Motion, effects, animation | `.ai/astro-motion-craft/SKILL.md`, then `.ai/astro-motion-craft/library/README.md` |
| Add/change/hide/remove a page or navigation on an existing student site | `.ai/astro-page-management/SKILL.md` |

The three quality-gate Skills are procedural checks used **in addition to** the existing workflow, not implemented UI features. The planner exports a Site Brief, **not** a deployed or fully assembled independent site; layout selection, brand visual tokens and navigation plans must remain distinct. Deployment and maintenance Skills must not silently alter the research showcase deployment.

## Inventories are separate

Registries are the source of truth. **Do not hardcode their counts** in code, docs or this file; read them.

| Inventory | Source | Notes |
|---|---|---|
| Blocks (functional website content blocks) | `src/data/blocks.registry.json`, `COMPONENTS.md` | Gallery at `/blocks/`. Docs, registry and gallery must stay aligned. |
| Effects (motion) | `src/data/effects.registry.json` | Gallery at `/effects/`. Never add effects to `blocks.registry.json`. |
| Section Patterns | `src/data/section-patterns.registry.json` | Neither full-site Layouts nor single Blocks; do not count them in the Blocks Registry. |
| Layouts | `src/data/layout-directions.json` | Previews at `/layouts/`. Not registered as blocks. |
| Editorial recipes | `src/components/editorial-recipes/{heroes,sections,lists,rhythm,cta-trust}/` | Demoed at `/layouts/recipes/`. Distinct from blocks, effects and layouts. |

## Component and content rules

**Practical blocks**
- `MobileMenu`, `BookingLink`, `ContactActions`, `PricingDetails`, `TrustInfo` and `MediaEmbed` must be reachable in the functional block gallery and in actual demo pages.
- `SocialLinks.astro` is the canonical icon + platform link component, also used by `ContactActions`. The gallery uses preview-only icons with no fake profile URLs. Real site footers use verified project GitHub and project website links. Never replace configured profile URLs with brand home pages; preserve link labels, platform trademark guidelines and theme tokens.
- Article reading and sharing: article pages have `Breadcrumbs`, `ArticleNavigation` (previous/next), `ArticleShare` (LINE, Facebook, Email, clipboard) and `ReadingProgress` over the actual article region. Never use `SocialLinks` as article sharing.
- Resources and newsletter: `ResourceCard`, `ResourceLibrary`, `LeadMagnetCard`, `NewsletterSignup` take real configurable resource URLs. Without a newsletter service, never imply the form was submitted successfully.
- `BackToTop`: use `src/components/blocks/BackToTop.astro` through `src/layouts/DemoLayout.astro`; do not copy separate scroll handlers into pages. It is hidden near the top, appears after a threshold, respects `prefers-reduced-motion`, has an accessible label, a 44+ px touch target and uses theme tokens. Reuse it in any new top-level layout. It is not an effects-library item.

**Helper content**
- Source of truth for helper marketing and FAQ copy: `src/data/helper-content.ts`. It demonstrates distinct applications (for example bodywork, counseling, coaching and Reiki), each with its own content. Layout components stay theme-agnostic; do not reinsert vague generic filler.

**Articles and search**
- `src/content/articles/` is the source of truth; `src/data/articles-v2.ts` is a derived compatibility adapter, not a place to add articles.
- Research-site articles need frontmatter `title`, `description`, `publishedAt` and `category` (`tags` optional); `draft: true` keeps one out of public pages, RSS and the sitemap. The same article shown under several themes appears once in RSS. The demo articles are shared content, so a real site must choose its own canonical root.
- Article pages are canonical at `/[kind]/[theme]/articles/`. `ArticleArchive` combines list/cards/grid, query, tags, calendar and months; legacy `explore/` redirects, retaining query and hash.
- `ArticleViewSwitcher` is the canonical article archive renderer (list, cards, grid from the same data, real article links, optional filtering data attributes). Preserve working search and tag/calendar/month filters and responsive design.
- Navbar: one Articles entry, a distinct Search icon, and an icon-only mobile menu (with `aria-label`) with optional social links inside the dialog. Do not add a separate "find articles" toolbar link.
- Chinese full-text search must be verified in a real browser on the deployed Preview, not by checking that `dist/pagefind/` exists (see "Chinese full-text search" in `.ai/astro-content-publishing/SKILL.md`). A build with a non-root `ASTRO_BASE_PATH` must also work.
- Search is built by Pagefind from all rendered static HTML after `astro build` (see `package.json`). Avoid hardcoded metadata indexes. The global `SiteSearchDialog` loads Pagefind relative to `import.meta.env.BASE_URL` and must work on GitHub Pages PR preview subpaths.

## Motion and effects

- Motion work MUST use `.ai/astro-motion-craft/SKILL.md` and the library under `.ai/astro-motion-craft/library/` (`README.md`, then `effect-catalog.md` and the matching recipe: `reveal-and-stagger`, `pointer-interactions` or `content-interactions`). The recipes distinguish Manus v2 ZIP source behavior from our adaptation, and unimplemented references from actual components.
- Effects runtime lives under `src/components/effects/` (Reveal, StaggerGroup, MotionCard, ZoomImage, MagneticButton, UnderlineLink, MotionFAQ); CSS in `public/effects.css`.
- Manus effect APIs are reference-only until explicitly implemented; do not claim they shipped. Do not treat ZIP effects or Tailwind v4 as installed. Do not introduce duplicate observers, global theme overrides or unverified animation claims.
- Preserve no-JS visible content, reduced-motion/static fallbacks, pointer-fine-only 3D/spotlight/pan/magnetic effects, keyboard and touch behavior, and every existing theme.
- Update recipes and catalog when the motion runtime changes.

## Layout

- Follow `.ai/astro-layout-craft/SKILL.md` for information architecture, section order, hero proportion and structural compositions, together with `.ai/astro-editorial-layout-design/SKILL.md`. Never invent a generic hero/cards grid if original recipes exist.
- Layouts are structurally different native Astro homepage previews (knowledge/editorial and professional care). **Do not replace them with one template plus color variants.**
- Most concepts are adapted from the user's `astro-ten-site-directions.zip`; the rest are original extrapolations based on Claude research (not Claude-completed website source). Remote demo photos temporarily refer to user-published Manus assets; make content/licensing self-contained before selling templates.
- The two Claude example pages are `src/pages/layouts/reading-atlas/index.astro` and `src/pages/layouts/trust-path/index.astro`; their demonstration details are explicitly fictional. The original evidence, measurements and samples are preserved under `.ai/astro-editorial-layout-design/`. Always distinguish [OBS]/[MEAS] source facts from [INF]/[NEW] advice.
- Visual acceptance requires actual 1440/1280/768/390 screenshots in addition to the Astro build; do not claim this verification unless performed.
- A layout is `Starter Ready` only with an independent build, human visual review of exported desktop and phone pages, and working routes. Keep CI, the platform Preview SHA and URL, and human review as separate evidence; never reuse a previous head's green. Readiness is read from `src/data/layout-assembly/definitions.mjs`, not stated in docs.

## Learner maintenance (existing student websites)

When the user modifies an **existing student website**, inspect the student's actual repo and choose Skills by intent rather than rerunning the starter generator. The research repository is not the student's codebase; do not overwrite the student site with a newly exported scaffold.

- Add/change/hide/remove a page or navigation: `.ai/astro-page-management/SKILL.md` (mandatory whole-site desktop/mobile navigation consistency and destination checks).
- Local layout/section adjustment: `.ai/astro-layout-craft/SKILL.md`, `.ai/astro-editorial-layout-design/SKILL.md`.
- Add/revise a Block or component: `.ai/astro-ui-craft/SKILL.md` and the existing Blocks Registry before inventing code.
- Add/edit/draft/publish/unpublish articles: `.ai/astro-content-publishing/SKILL.md`.
- General maintenance/recovery: `.ai/astro-site-maintenance/SKILL.md`.

Always preserve existing URL/content and use Feature Branch → Build → real PR Preview → relevant page×viewport QA → learner approval → Merge/deploy. A single new page looking correct does not prove navigation was updated everywhere.
