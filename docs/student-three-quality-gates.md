# 學員網站的三道品質關卡｜AI Skills 使用指南

本文件將三個 **程序性 QA Skills** 接到原有 Astro 工作坊，但不替代 Layout、Blocks、Section Patterns、Onboarding、Site Assembly、Deploy 等既有 Skills，也不新增功能性 UI。

## 使用順序

1. **規劃完成後：內容準備度** — `.ai/astro-content-readiness/SKILL.md`：依選定頁面及 Section Patterns 的 `required`／`optional` 資料，列出真實可用內容與缺口。可以先不上未完成的區段，不捏造文章、見證、服務資格。
2. **導航定稿前：導航可理解性** — `.ai/astro-navigation-tree-test/SKILL.md`：將第一／第二層導航轉成純文字樹，提供三個真實找資料任務；由真正不熟悉網站的人測試，另做鍵盤／觸控技術 QA。沒有真人測試結果不得標示已通過。
3. **網站真正公開後：發布健康檢查** — `.ai/astro-launch-health-check/SKILL.md`：驗證實際 Production URL、內容及連結、canonical／robots／sitemap、文章索引、可選 Search Console、備份與復原。Build 成功不代表已驗證發布，提交 Sitemap 不代表已收錄。

## 與正在開發的 PR #31 / #32 分工

- PR #31：學員 Starter 表單、Section Pattern 選取、導航、品牌色、匯出器，以及對應既有 Skill 文件。
- PR #32：元件庫外部 UI 套件研究目錄與 UI Craft 開發規則。
- 本 PR：三份可獨立執行的品質關卡 Skills，以及 `AGENTS.md` 的任務路由；**不修改 #31／#32 的實作或 Skill 文件**。

PR #31 尚未合併前，讀取 Site Brief 時請以當前 Branch schema 為準；如果無 `sectionPatterns` 或 `parentId` 等欄位，不得臆測該功能已存在。兩個開發 PR 合併後，應重新驗證三道關卡與完整端到端流程。

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
