# 學員網站的三道品質關卡｜AI Skills 使用指南

本文件將三個 **程序性 QA Skills** 接到原有架站工作坊，但不替代 Layout、Blocks、Section Patterns、Onboarding、Site Assembly、Deploy 等既有 Skills，也不新增功能性 UI。

## 使用順序

1. **規劃完成後：內容準備度** — `.ai/astro-content-readiness/SKILL.md`：依選定頁面及 Section Patterns 的 `required`／`optional` 資料，列出真實可用內容與缺口。可以先不上未完成的區段，不捏造文章、見證、服務資格。
2. **導航定稿前：導航可理解性** — `.ai/astro-navigation-tree-test/SKILL.md`：將第一／第二層導航轉成純文字樹，提供三個真實找資料任務；由真正不熟悉網站的人測試，另做鍵盤／觸控技術 QA。沒有真人測試結果不得標示已通過。
3. **網站真正公開後：發布健康檢查** — `.ai/astro-launch-health-check/SKILL.md`：驗證實際 Production URL、內容及連結、canonical／robots／sitemap、文章索引、可選 Search Console、備份與復原。Build 成功不代表已驗證發布，提交 Sitemap 不代表已收錄。

## 已合併功能與品質關卡的分工（截至 2026-10-09）

- **PR #31（已合併）**：`/starter/` 的規劃器、Section Patterns、兩層導覽、八款配色預設與可編輯五色盤，以及 Site Brief JSON／獨立匯出流程。`sectionPatterns`、`navigation[].parentId`、`brand.palette` 現已存在於 `StarterPlan v1`，但匯出不是完整高保真網站。
- **PR #32（已合併）**：`/blocks/` 底部的外部 UI 資源與學員可複製的 AI 提問；外部工具並未安裝。
- **PR #33（已合併）**：三份品質關卡 Skills 與 `AGENTS.md` 的任務路由；這些是檢查程序，不是自動生成真人測試結果。
- **PR #34（已合併）**：`/effects/` 的外部動效參考及「什麼時候該動、什麼時候保持安靜」指引；未把第三方動畫套件直接裝進 Starter。

四支 PR 都已合併，下一步應使用 **最新 `main`** 跑完整學員流程。先檢查 Site Brief 的內容準備度、再測導覽名稱是否容易理解；PR Build 和實際四尺寸視覺／互動驗收分開記錄。只有正式網站發布後才做 Launch Health Check；沒有正式網址時標為 `NOT TESTED` 或 `BLOCKED`，不可假報通過。

## 任務交接格式

每道 QA 都應回報：

- 檢查目標（網站／頁面／功能）
- 狀態：PASS / FAIL / BLOCKED / NOT TESTED
- 證據：使用者提供內容、真實連結、工具檢查結果或使用者測試紀錄
- 發現問題／建議
- 負責人及下一步

**禁止**：只看 Demo 就宣稱學員網站已完成；以 AI 模擬結果充作真實使用者測試；未驗證卻宣稱搜尋索引成功；未獲同意擅自 Merge、發布或更動 DNS。

## 可以直接對 AI 下達的總控提示詞

> 請先讀專案 AGENTS.md 與相關既有 Skills，再依序讀 astro-content-readiness、astro-navigation-tree-test、astro-launch-health-check。用我的 Site Brief、真實文章／服務資料與預覽站作為檢查對象。先做內容準備度和導航樹測試規劃；只有我提供正式 Production URL 且網站已真正發布，才執行上線健康檢查。全部使用 PASS／FAIL／BLOCKED／NOT TESTED 與證據回報，不要虛構測試結果，不要自動合併或發布。
