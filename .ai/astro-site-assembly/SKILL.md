---
name: astro-site-assembly
description: Convert a validated /starter/ Site Brief JSON into a standalone Astro website scaffold, integrate layout/brand/navigation/content, and verify before GitHub or Cloudflare deployment.
---
# Astro Site Assembly｜把學員規劃變成獨立網站

## Role
Follow `astro-starter-onboarding` for needs/layout/navigation, `astro-layout-craft` and `astro-editorial-layout-design` for structure, `astro-ui-craft` for tokens/Blocks, `astro-content-publishing` for articles, `astro-starter-deploy` for publication, and `astro-site-maintenance` for ongoing changes. Do **not** conflate design guidance with a runnable site.

## Inputs
1. Get the student's JSON from `/starter/`: `version`, `kind`, `layoutSlug`, `visualTheme`, `brand`, `navigation`, `primaryCta`.
2. Read `src/data/starter-config.ts`, `src/data/layout-directions.json` and existing Blocks Registry. Validate kind/slug association, HEX color, routes, CTA, navigation names and order.
3. Check content readiness: real brand name, copyright-safe image assets, real contact/booking addresses, bios/qualifications only if provided. Unconfigured external integrations stay hidden or explicitly unconfigured.
4. Confirm which layout prototype will be faithfully adapted. The twelve original directions are **homepage prototypes**; each now has a first-pass independent homepage adapter under `src/data/layout-assembly/<slug>/Home.astro`, but not twelve fully completed multi-page websites.

## Generator — phase 1
`node scripts/export-starter.mjs <site-brief.json> <output-directory>` generates a separate, runnable Astro site scaffold from approved JSON. It does **not** mutate the showcase. It generates valid homepage, only selected interior routes, shared navbar/mobile nav, branded CSS variables, article content collection, RSS/sitemap/robots and GitHub Pages workflow. Do not pretend this command perfectly ports the twelve original page compositions; phase 1 uses the matching layout-specific independent `Home.astro` when `adapter` is present. Preserve it and improve content/interior pages as needed; **do not replace it with a generic Hero or restart assembly**.

## Draft content and publication are the owner's decision

- **Draft/Preview:** DEMO labels, sample copy, clearly unconfigured fields, and unfinished contact pages may remain visible for layout review. Do not silently remove or hide them merely because they are unfinished. Keep any placeholder unambiguously labelled; do not invent real credentials, testimonials, bookings, health outcomes, prices or working forms.
- **Before publishing:** tell the student which exact pages or elements still show DEMO/sample/unconfigured content, and ask whether to (a) keep and publish as-is, (b) edit, or (c) hide specified elements. The student may explicitly choose (a). Do not equate content readiness with mandatory deletion.
- **Publication gate:** require explicit approval for the specific current version, scope and production action; preview and Build do not constitute that approval. Acknowledged placeholder content alone does not block a user-approved release.
- **Safety:** never expose secrets or third-party private data, and never depict unverified credentials or services as genuine. Explain public-preview exposure and protect sensitive materials even before production.

## Student-owned content is not decorative placeholder text

- Site Brief `about.bio`, `about.purpose`, `about.approach`, and `about.background` now drive all twelve About page compositions. Prefer these over homepage tagline/intro. Never fabricate qualification, case history, testimonials or awards.
- All six helper families accept `serviceFacts.scope`, `exclusions`, `method`, `firstVisit`, `duration`, `price`, `cancellation`, `qualification`, and `contact`; fields not supplied remain visibly unconfigured. A missing contact endpoint must not appear as a working booking form.
- Long CJK copy, absent media and variable article counts are normal student inputs. Keep family composition while adjusting responsive constraints; don't replace it with a generic template.
- The standalone export workflow's `student-visual-qa` artifact captures generated homepage/inner pages at 1440, 1280, 768, and 390. Review actual captures for art direction; passing a build or absence of overflow does not guarantee source-prototype fidelity.

## Existing full-site Design Family contract (PR #46)

The student exporter now includes the selected independent homepage AND family-specific interior components. Do not replace them with a generic hero or universal interior page.

- Home: `src/data/layout-assembly/<slug>/Home.astro` → exported `src/components/layouts/selected/Home.astro`.
- Article archive: `src/data/layout-assembly/ArticleArchive.astro`, six structurally distinct knowledge archive views; article data/query logic remains shared.
- Article detail: `src/data/layout-assembly/ArticleDetail.astro`, family-dependent structural reading compositions (only one `h1`, Content Collection body in a slot).
- Other ordinary interiors: `src/data/layout-assembly/DesignInterior.astro`.
- About: `src/data/layout-assembly/AboutSections.astro`.
- Helper service: `src/data/layout-assembly/ServiceSections.astro`.
- Navbar/Footer: `src/data/layout-assembly/DesignChrome.css`.

Preserve article collections, navigation data, SEO, RSS, sitemap, Pagefind and existing Blocks logic. Improve page-specific DOM/compositions where needed instead of recoloring generic cards. Unconfigured service, qualifications, pricing, and bookings must remain explicitly unconfigured. Current designs are first-pass, not all twelve source-faithful final multi-page sites.

## Required design adaptation — phase 2
1. Inspect the existing independent `src/data/layout-assembly/<slug>/Home.astro` and its definition first, then review original `src/pages/layouts/<slug>/index.astro` and `public/layout-library.css` for design intent. The generator already copies the matching independent homepage into the student's site.
2. Preserve its hierarchy, Hero proportions, content order, imagery treatment and mobile restacking; do not replace all 12 with the same hero and cards.
3. **先處理 Section Patterns**：讀 `.ai/astro-section-pattern-craft/SKILL.md`、`src/data/section-patterns.registry.json`。請學員列出想用的 Pattern ID、放置頁面、前後順序、真實資料；未選擇則不強制加入。StarterPlan v1 已可存放 Pattern 選擇；匯出器可呈現對應的待完善區段與不同頁腳樣式，但這仍是骨架，必須提供真實內容並按原始 Pattern 做完整視覺移植。
4. Map only needed Blocks from Registry into actual pages; navigation, article archive, contact/booking URLs must be real.
4. Map brand primary/accent/background/text/focus tokens while maintaining contrast (especially on buttons). Don't blindly recolor supplied prototype.
5. Link all selected pages; 404, RSS and sitemap should use actual site URLs. No fake submit/booking confirmation or invented testimonials.
6. Build and visually QA widths 1440,1280,768,390; compare reference layout screenshot against output, not just CI.

## Advanced student navigation
`StarterPlan.navigation` supports custom page IDs (`page-*`) and `parentId` for a second level. The exporter generates an accessible `<details>` based submenu; test desktop keyboard opening, phone tap, and parent/child routes. Do not treat the research site's flat `SiteNav` and `MobileMenu` as already upgraded. Large menus may need a distinct mega-menu pattern and separate visual QA; no third level by default.

## Delivery gates
- Generate into a **different** directory or student's own new repository. Never overwrite the research showcase or existing student files by default.
- Build standalone output and check correct canonical, URL base, internal links, selected menus and honest content placeholders.
- Preview then ask student for explicit confirmation before merging or publishing.
- For GitHub Pages and Cloudflare deployment, follow `astro-starter-deploy` and `astro-pr-preview`; verify each provider's real preview configuration.
- Report what is actually automatic vs what still requires editorial/UI adaptation, with screenshots and an outstanding-items list.

## Beginner prompt
「這是我從網站規劃器下載的 JSON。請用 astro-site-assembly Skill 幫我建立獨立 Astro 網站，先生成可運作的 Starter，再參考我選的 Layout 原型調整首頁，保留品牌色和選單。建立 PR 並提供預覽，我確認才發布。」

## Search component integration
When adding `SiteSearchDialog`, inspect its actual data contract before use. The learner ZIP ships `scripts/build-student-search-index.mjs`; generated independent sites copy it as `scripts/build-exact-search.mjs` and run it **after Astro build and Pagefind**, generating `dist/search/exact-zh.json` alongside `dist/pagefind/pagefind.js`. Pagefind remains the primary full-text index when configured; do not replace it with a hardcoded metadata search. Confirm the endpoint, search interaction and draft exclusion on the actual built site. Consult up-to-date Astro/Pagefind official documentation when interfaces differ.

## 自訂頁面網址
導航條目的 `id` 是穩定識別符；選填的 `path` 是人能閱讀的相對 URL（例如 `start-here/tools/`），不代表另建 CMS／後台。若有 `path`，頁面生成、共用導覽、麵包屑、Sitemap、輸出檢查應使用同一個網址；沒有則以 `id + '/'` 作預設。確認實際 HTML 與 Preview 路由一致，勿改動既有已發布網址而不考慮 redirect。

## Prototype-native optional owned content (PR #46)

- `collective` may accept `team: [{name, role, bio}]` and `events: [{title, description, date: "YYYY-MM-DD", url: "https://…"}]`. Only use owner-approved member identities and confirmed events. Empty arrays show pending states, never fictional rosters, availability or event dates.
- `trust-path` may accept `serviceTiming: [{label, minutes}]`. Positive integer minutes produce the proportional source timeline and real total; missing timing shows pending information instead of inventing a 50-minute session. These are optional page content fields, not a scheduling system or CRM.
- Five knowledge Home adapters use actual published Content Collection entries for recent/featured/learning/collection/program-note previews and exclude `draft: true`; Reading Atlas uses owner-supplied `reading.records` and `annualBook` in its month cells, book band and seasonal index.
- Do not re-add the removed decorative replacement panels to simulate original Prototype fidelity. Preserve the source-specific vertical learning path, collection drawers, stepped coaching cards, roster/event ledger and five-stop route.
