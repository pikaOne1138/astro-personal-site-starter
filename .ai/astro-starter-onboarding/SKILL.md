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
4. **進階導覽**：簡單學員沿用既有頁面與單層選單；有規劃能力者可新增自訂頁面並使用第二層選單。`StarterNavigationItem.parentId` 指向已啟用的第一層頁面，不支援第三層；父選單仍保留自己的目的頁，子頁必須有真實路由。桌機下拉、手機展開都要實測。
5. Ask which pages are really needed. Use the available `starterPages` list; permit changes to menu labels, order and enabled state. Require CTA to point to a selected page. Missing content should not become fake published pages or dead links.
6. Download or copy Site Brief JSON. Its `StarterPlan` contract includes kind, layoutSlug, visualTheme, brand, navigation and primaryCta. Validate using `checkStarterPlan`; treat student text and URLs as unverified until reviewed.
7. **Section Patterns（選配，不是學員必經關卡）**：學員若主動選了 Pattern，檢查 Pattern ID、目標頁、插入位置與真實內容；若沒選，由 AI 根據 Layout、Site Brief 及頁面目的判斷是否需要，且不得強制要求學員瀏覽 `/section-patterns/`。只有實際使用 Pattern 時才讀 `.ai/astro-section-pattern-craft/SKILL.md` 和 Registry。空陣列或缺省皆合法，不應阻擋組站。
8. AI developer reads Site Brief and existing registries, writes actual pages/sections using Layout → optional Section Patterns → Blocks → optional Effects. **`/starter/` 已能將 `sectionPatterns` 包含在 JSON；請驗證 `patternId`、`targetPage` 與位置，並依真實資料完成最後的視覺適配。** Keep original layout distinctions; don't only swap colors. Check `astro-ui-craft` and `astro-content-publishing` skills.
9. Branch + PR, build and preview, verify links, four responsive widths, CSS tokens and keyboard access. User explicitly approves before merge.

## 下一步：匯出獨立 Starter
當學員已下載 Site Brief JSON，請改讀 `.ai/astro-site-assembly/SKILL.md` 並執行 `node scripts/export-starter.mjs <plan.json> <empty-output-directory>`。它只建立可執行的獨立 Astro 骨架，尚須依 Layout Library 真正移植構圖、補文章與服務內容並通過視覺 QA；不能宣稱選好 12 款之一就已完工。

## Honest scope
The planner is a working selection and JSON export UI, **not** a complete Starter export tool. It does not create GitHub repos, deploy a site, auto-apply brand tokens to production pages, or guarantee all 12 homepages have completed inner pages. Those are separate subsequent engineering tasks. The research showcase's demo routes must remain untouched.

## Safety
Never invent bios, licenses, prices, testimonials, booking confirmations, forms or unpublished content. Preserve URLs. No WordPress migration, CRM, CMS or backend scope.
