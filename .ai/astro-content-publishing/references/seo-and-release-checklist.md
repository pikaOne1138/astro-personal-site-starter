# SEO, content and release checklist

## Before publication
- [ ] Real author has approved page content, title, description and public/draft status
- [ ] Article slug is unique, stable and linked from an actual article list
- [ ] Images are authorized, include alt text, and links have meaningful accessible labels
- [ ] Canonical points to the correct **formal** site; student domain, site/base and path are verified
- [ ] Drafts or private data are not put into public build/PR preview
- [ ] Article structured data matches actual content; no fictional Person credentials or publisher
- [ ] Correct RSS feed URL is discoverable, and feed contains only intended published articles
- [ ] Sitemap contains only intended canonical public URLs; no orphan or missing routes
- [ ] 404 page works, without pretending a 404 means successful redirect
- [ ] Pagefind searches actual published HTML; older metadata-only index is not reintroduced

## Validation
- [ ] `npm run build` reports success and `scripts/verify-v2-8-output.mjs` passes
- [ ] PR build with real `ASTRO_BASE_PATH` reports success
- [ ] Verify production and preview meta/noindex separately
- [ ] Test article index: list/cards/grid, tag, month, calendar, full text, related, share
- [ ] Test published and `draft: true` behavior with a disposable test article
- [ ] Check 1440 / 1280 / 768 / 390 visual layouts when markup/styles change
- [ ] Verify actual PR Preview live URL; CI green alone does not verify visual quality
- [ ] Obtain explicit user approval before merge

## Scope
This skill does not implement WordPress automated conversion, complete 301 mapping, CMS dashboards, custom booking systems, databases or payment processing.
