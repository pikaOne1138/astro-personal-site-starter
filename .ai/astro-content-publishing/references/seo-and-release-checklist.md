# SEO, content and release checklist

## Before publication
- [ ] Real author has approved page content, title, description and public/draft status
- [ ] Article slug is unique, stable and linked from an actual article list
- [ ] Images are authorized, include alt text, and links have meaningful accessible labels
- [ ] Canonical points to the correct **formal** site; student domain, site/base and path are verified
- [ ] Drafts or private data are not put into public build/PR preview
- [ ] If article structured data is configured, it must match real content; do not fabricate Person credentials or publisher details.
- [ ] Correct RSS feed URL is discoverable, and feed contains only intended published articles
- [ ] Sitemap contains only intended canonical public URLs; no orphan or missing routes
- [ ] 404 page works, without pretending a 404 means successful redirect
- [ ] If Pagefind was explicitly integrated, verify it indexes actual built HTML; the independent student scaffold does **not** include Pagefind by default. Do not claim search works before installation and a real build.

## Validation
- [ ] Run `npm run build` inside the independent student site. For the learner export, run `node <EXTRACTED_STUDENT_PACK>/scripts/verify-v2-8-output.mjs --student-site <STUDENT_SITE_DIR>`; the verifier's default mode tests the **research display site** and is not applicable to student sites.
- [ ] Validate learner config using `SITE_URL` and `ASTRO_BASE_PATH` (the exported project's supported variables), including a project subpath when publishing under GitHub Pages.
- [ ] Verify production and preview meta/noindex separately
- [ ] Test only article features **actually installed in the student site**: published list/details and drafts are baseline. List/cards/grid switching, tags, month, calendar, related, share, and Pagefind/full text are optional integrations; verify each only after it has been installed and configured.
- [ ] Test published and `draft: true` behavior with a disposable test article
- [ ] Check 1440 / 1280 / 768 / 390 visual layouts when markup/styles change
- [ ] Verify actual PR Preview live URL; CI green alone does not verify visual quality
- [ ] Obtain explicit user approval before merge

## Scope
This skill does not implement WordPress automated conversion, complete 301 mapping, CMS dashboards, custom booking systems, databases or payment processing.
