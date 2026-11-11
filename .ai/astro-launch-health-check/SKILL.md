---
name: astro-launch-health-check
description: Check a beginner-owned Astro site's public deployment, indexability and maintenance readiness without asserting Google indexing or search ranking. Not for pre-release builds or previews (use astro-pr-preview) or for promising search rankings.
---
# Astro Launch Health Check｜發布後健康檢查

## When to run
After an **actual** GitHub Pages or Cloudflare deployment is confirmed. Coordinate with `astro-starter-deploy`, `astro-content-publishing`, `astro-site-maintenance` and `astro-pr-preview`. A successful build alone is not a passed launch.

## Preconditions
Obtain the real production URL, repository, deployment provider and intended indexing policy. Do not use the workshop showcase URL as the student's website. Do not require Google Search Console when the site is intentionally private or non-indexed.

## Verification checklist
1. **Live site:** confirm HTTPS, correct custom domain or GitHub Pages base path, valid home and enabled interior routes, 404 behavior, mobile navigation, selected Patterns, contact links and image loads.
2. **Content reality:** check no unintended demo content, invented testimonials, unchecked professional claims, invalid booking/payment/forms, empty article cards, broken privacy links.
3. **Technical SEO:** inspect actual published HTML for title, description, canonical URL, robots rules, sitemap URL; for article sites verify article routes, RSS and post-build Pagefind indexing. Confirm the `site` / `base` and asset links reference the real deployed site, not localhost or PR Preview.
4. **Indexability:** explain Google Search Console ownership verification and sitemap submission as optional user-authorized steps. Site verified or sitemap submitted **does not mean indexed**; do not guarantee ranking or traffic.
5. **Operations:** identify the student's GitHub repo, documented deployment workflow, latest known-good commit SHA, recovery procedure, Git backup scope and non-Git external dependencies (forms, booking, newsletters). Check who owns the domain and has access.
6. **Cadence:** suggest checks after URL/content changes and periodic checks (e.g. monthly), plus release-specific smoke tests.
7. Record `PASS`, `FAIL`, `BLOCKED`, or `NOT TESTED` for every item with direct evidence/URL or reason; don't present a checklist as tests already executed.

## Stop conditions
Stop / seek explicit approval before merge, DNS changes, changing `robots`, destructive redirects, rollback, deleting content, or submitting ownership verification to services. Distinguish Preview and Production.

## Ready-to-copy student prompt
> 我的獨立 Astro 網站已發布在＿＿，GitHub Repository 是＿＿。請依 `astro-launch-health-check` 驗證正式網址、HTTPS、內頁、手機導航、內容真實性、Canonical、robots、sitemap、RSS／Pagefind（適用時），並提供 Search Console 可選設定步驟。最後列出備份、維護、復原的待辦與每項 PASS／FAIL／BLOCKED／NOT TESTED 的證據。沒有實際確認的項目不得標 PASS。

## 已上線網站的按需健康檢查（非自動巡檢）

學員詢問「網站正常嗎、有沒有漏洞、套件要不要更新」時，沿用本 Skill 的網站、SEO、部署、備份檢查，並依 `docs/student-builder-pack/HEALTH-CHECK-PROMPT.md` 增加**唯讀的版本與安全公告查證**。有 Repository 權限才讀實際 lockfile、GitHub Actions／Dependabot Alerts、部署 SHA，對照官方版本與安全公告受影響區間；只有 URL 時先檢查公開網站，套件狀況標資料不足，不推測漏洞。新版本不等於必須升級，無可用即時資料標 NOT TESTED 或 BLOCKED，不能宣稱零漏洞。輸出白話「現在處理／下次維護／暫時不動」與可追溯證據，沒有修改權限，也**不因這項檢查執行 GitHub Actions 安裝、依賴升級、Issue 建立、PR、Merge 或部署**。若使用者要自動每日／每週巡檢，屬 Astro Site Guardian 的另一個授權安裝任務，以 ai-workbench `projects/atp-starter/specs/astro-site-guardian.md` 為準，不在這個 Skill 複製自動排程機制。此檢查是網站持續維護的任務，不是重新首次發布驗收。
