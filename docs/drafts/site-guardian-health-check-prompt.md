# 網站健康檢查｜學員可複製提示詞（暫存，未接入正式指南）

> 此檔為暫存提案，不是現有 `START-MAINTENANCE-PROMPT.txt` 的替代品。完整系統規格以 [ai-workbench Astro Site Guardian](https://github.com/pikaOne1138/ai-workbench/blob/docs/astro-site-guardian-spec/projects/atp-starter/specs/astro-site-guardian.md) 為 SSOT，經 MyCollections 試點驗證後再評估學員資料包整合。

我想對已上線的網站進行一次額外的安全與健康檢查。請先讀取我自己網站 GitHub Repository 的 `AGENTS.md`、`PROJECT.md`、現有維護 Skills 與 `site-guardian.config.json`（若存在），以及最新 GitHub Actions、Dependabot Alerts、Issues、PR、部署紀錄。

請檢查：
1. 正式網站可用性、HTTPS、首頁、重要內頁、404、導航、文章、搜尋與圖片。
2. npm 依賴及 Node.js 的版本、安全警示與必要更新，區分已知漏洞和單純的新版本。
3. Sitemap、robots、RSS、Canonical 及外部連結（適用時）。
4. 最近的 PR／部署有沒有影響原本功能；受保護路由是否仍維持存取控制（適用時）。
5. 自動巡檢是否有如期執行，失敗是否已有 Issue 或 PR 追蹤。
6. 已知正常的 Commit、備份及復原資訊。

請用繁體中文列出 PASS／FAIL／BLOCKED／NOT TESTED、證據連結與日期，說明風險程度及我需要決定的事情。不得將 Build 成功當成已完成瀏覽器或正式站 QA，沒有實際驗證不得寫 PASS。

這次**只讀取、檢查和報告**；不修改檔案、不新增 PR、不 Merge、不發布、不改 DNS、不回滾、不索取密碼或 Token。需要修復，先告訴我會改什麼、影響什麼、不動什麼，等我授權。
