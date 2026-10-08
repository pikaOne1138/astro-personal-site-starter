---
name: astro-starter-onboarding
description: Help beginner students select an Astro layout, configure brand colors and plan pages and navigation through the /starter/ planner, then hand a validated Site Brief to an AI developer.
---
# Astro Starter Onboarding

## Trigger
Use when the student wants to choose their site design, logo/brand colors, architecture, main menu or an initial plan. Read `src/data/starter-config.ts`, `src/data/layout-directions.json`, `src/pages/starter/index.astro` and `.ai/astro-layout-craft/SKILL.md`.

## Beginner workflow
1. Ask what the site is for: knowledge/blog or helping/professional services. Identify readers, main goal and truthful available content.
2. Direct to `/starter/`. The UI labels layouts A01–A06 (knowledge) and B01–B06 (helper). These are selection labels, **not stable API IDs**; only the slug in `layout-directions.json` is stable. Layout is homepage composition, not a complete multi-page site.
3. Choose paper/morning/studio/botanical as visual starting point. Let student pick their own primary HEX. Treat brand as a token override intention; do not recolor every layout automatically without contrast testing.
4. Ask which pages are really needed. Use the available `starterPages` list; permit changes to menu labels, order and enabled state. Require CTA to point to a selected page. Missing content should not become fake published pages or dead links.
5. Download or copy Site Brief JSON. Its `StarterPlan` contract includes kind, layoutSlug, visualTheme, brand, navigation and primaryCta. Validate using `checkStarterPlan`; treat student text and URLs as unverified until reviewed.
6. AI developer reads Site Brief and existing registry, writes actual pages/sections using Layout, Editorial composition and Blocks. Keep original layout distinctions; don't only swap colors. Check `astro-ui-craft` and `astro-content-publishing` skills.
7. Branch + PR, build and preview, verify links, four responsive widths, CSS tokens and keyboard access. User explicitly approves before merge.

## Honest scope
The planner is a working selection and JSON export UI, **not** a complete Starter export tool. It does not create GitHub repos, deploy a site, auto-apply brand tokens to production pages, or guarantee all 12 homepages have completed inner pages. Those are separate subsequent engineering tasks. The research showcase's demo routes must remain untouched.

## Safety
Never invent bios, licenses, prices, testimonials, booking confirmations, forms or unpublished content. Preserve URLs. No WordPress migration, CRM, CMS or backend scope.
