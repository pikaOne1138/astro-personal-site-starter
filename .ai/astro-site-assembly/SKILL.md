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
4. Confirm which layout prototype will be faithfully adapted. Existing twelve directions are **homepage prototypes**, not twelve independent multi-page starters.

## Generator — phase 1
`node scripts/export-starter.mjs <site-brief.json> <output-directory>` generates a separate, runnable Astro site scaffold from approved JSON. It does **not** mutate the showcase. It generates valid homepage, only selected interior routes, shared navbar/mobile nav, branded CSS variables, article content collection, RSS/sitemap/robots and GitHub Pages workflow. Do not pretend this command perfectly ports the twelve original page compositions; phase 1 uses a safe lightweight layout-specific treatment, and **a subsequent actual design-adaptation pass is mandatory** before claiming layout fidelity.

## Required design adaptation — phase 2
1. Review selected `src/pages/layouts/[slug].astro` actual direction, DOM and `public/layout-library.css`.
2. Preserve its hierarchy, Hero proportions, content order, imagery treatment and mobile restacking; do not replace all 12 with the same hero and cards.
3. Map only needed Blocks from Registry into actual pages; navigation, article archive, contact/booking URLs must be real.
4. Map brand primary/accent/background/text/focus tokens while maintaining contrast (especially on buttons). Don't blindly recolor supplied prototype.
5. Link all selected pages; 404, RSS and sitemap should use actual site URLs. No fake submit/booking confirmation or invented testimonials.
6. Build and visually QA widths 1440,1280,768,390; compare reference layout screenshot against output, not just CI.

## Delivery gates
- Generate into a **different** directory or student's own new repository. Never overwrite the research showcase or existing student files by default.
- Build standalone output and check correct canonical, URL base, internal links, selected menus and honest content placeholders.
- Preview then ask student for explicit confirmation before merging or publishing.
- For GitHub-only deployment follow `astro-starter-deploy`; Cloudflare is optional and requires verifying the provider configuration.
- Report what is actually automatic vs what still requires editorial/UI adaptation, with screenshots and an outstanding-items list.

## Beginner prompt
「這是我從網站規劃器下載的 JSON。請用 astro-site-assembly Skill 幫我建立獨立 Astro 網站，先生成可運作的 Starter，再參考我選的 Layout 原型調整首頁，保留品牌色和選單。建立 PR 並提供預覽，我確認才發布。」
