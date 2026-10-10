---
name: astro-site-maintenance
description: Safely update, back up, recover and maintain beginner-owned Astro websites with GitHub branches, reviews, published-content checks and reproducible restores.
---
# Astro Site Maintenance｜更新、備份與復原

## 用途
學員說「改首頁、寫文章、上傳圖片、修壞網站、恢復昨天版本、換電腦」時使用。與 `astro-content-publishing`、`astro-pr-preview`、`astro-starter-deploy` 分工，不自建 CMS、資料庫或會員後台。

## 重要觀念
- Git 歷史不是完整備份：它只保存已提交的檔案，不包含外部預約／表單資料、第三方平台資料、憑證、未提交的本機檔案或 DNS 設定。
- Preview / Production 必須明確區分。看得到網頁不等於網站真的部署成功，也不等於提交後搜尋索引已更新。
- 回復到舊 Commit 可能會一起撤銷文章、安全修正與站點設定，不能只看漂亮的畫面。
- 任何會刪除文章、改網址、變更網域、強制推送或回滾正式站的操作，要先列出影響範圍並取得明確核准。

## 工作流程 A｜日常安全更新
1. 讀 `AGENTS.md`、網站 Repo 目前狀態與相關 Skill，先確認修改哪些頁面、資料和現有功能。
2. 從目前正常運作的分支建立變更 Branch；不要直接修改正式 main。新文章從 `src/content/articles/*.md` 進入，不要改 Derived Adapter。
3. 改動範圍維持最小，保留既有 URL、圖片授權和 SEO；外部表單及預約是否真實有效必須核對。
4. 執行 Build、程式測試及連結/搜尋檢查，PR Preview 的網址必須真的可打開。對視覺變更檢查桌機與手機。
5. 列出本次修改、可能影響、測試結果；等學員確認後合併，再驗證正式發布。

## 工作流程 B｜備份
1. 確認 Repo 所有應納入備份的內容已 Commit／Push：程式、Markdown、設定、合法使用的圖片和 public 資產。
2. 建議使用 GitHub Repository 的完整 Git clone 或定期匯出封存作為第二份副本；備份位置應獨立於單一電腦，並有訪問權限管理。
3. 記錄建置依賴版本、Node 版本、部署提供商、正式網域、必要 DNS 設定及外部服務列表。憑證僅記「存放位置與更新程序」，不可明文備份到 Repo。
4. 檢查外部系統另有無備份責任（LINE、電子報、Google Forms、預約服務等）；這些不屬於網站原始碼備份。
5. 每次重大變更前保留已知正常的 Commit SHA 和正式網址，記錄可恢復版本。

## 工作流程 C｜故障定位與復原
1. 先分類：Build 失敗、部署失敗、網址／DNS 錯誤、某篇文章／圖片壞掉、PR Preview 壞掉、搜尋／RSS 未更新。
2. 檢查 GitHub Actions 或部署平台實際 Log，確認哪個 Commit、哪次 Build、是否真的部署成功。不要先猜測是快取問題。
3. 優先在修復 Branch 提交最小修正；若需回到舊版，建議使用可稽核的 Revert PR，不預設 `git push --force` 或強制 Reset main。
4. 如果 Restore 需改動公開網址、DNS、已上線文章或外部服務，先提供影響摘要並等待確認。
5. 復原後重新執行 Build、首頁/文章/搜尋/404/訂閱/CTA 的實際驗證；告知恢復版本及尚未確認的部分。

## 教學用復原演練
- 先完成第一次發布並記錄正常 Commit。
- 修改一段首頁文案 → 建立 PR → 確認預覽 → 合併發布。
- 模擬修改錯誤：另建 PR 還原特定更動，驗證結果，再由學員同意合併。
- 假設換電腦：從 Repo Clone、`npm install`、`npm run build`，核對圖片與文章。
- 故障演練僅在專用測試 Repo／分支執行，不對正式網站故意破壞資料。

## 完成標準
學員在 AI 協助下知道如何「修改 → 預覽 → 確認 → 發布 → 驗證」，以及如何找到上次正常版本並以審核過的 PR 恢復；不把 GitHub 視為外部服務的萬能備份。


## 維護任務路由與跨頁一致性
學員提需求時先讀學員**自己的** Repo（不要把老師研究展示路徑當成學員實際結構）。新增/移動/刪除頁面選 `astro-page-management`；局部版面變更選 `astro-layout-craft` + `astro-editorial-layout-design`；元件新增/修改選 `astro-ui-craft` 並查 Block Registry；文章增修、草稿、發布或撤回選 `astro-content-publishing`。任何修改仍共用 Branch → Build → 真實 PR Preview → QA → 明確核准 → Merge 流程。
**特殊關卡：**新增頁面到選單、變更 Header/Footer、調整主/子導航時，必須跑 Navigation Consistency Gate，抽測首頁、既有內頁、新頁與文章/服務頁的桌機與手機主選單一致性，不得只看新頁面成功就結案。

## Agent 自我驗證與交付證據（所有維護必經）
1. 先寫出「修改前預期行為、修改後預期行為、不能受影響的舊行為」；將需求轉為可執行測試，而非僅靠 LLM 自行宣布成功。
2. 建立故障注入／反例驗證：測試必須抓得到已知的錯誤（例如導航 404、手機漏項、草稿外洩、原本頁面被改壞）；若驗證器無法抓到，先修驗證器，不能發布。
3. 執行 Build、單元與整合測試、真實 Chromium 互動，以及需要時的 1440／1280／768／390 視覺檢查；由真實已部署 Preview 再測一次，核對 Head SHA。測試未跑、出錯或取不到證據，一律標 BLOCKED／NOT TESTED。
4. 原本已存在的功能必須回歸：頁面與主導航、文章列表、RSS／Sitemap／robots、既有可操作元件、鍵盤／觸控與替代文字。不可只看本次新功能。
5. 向學員回報逐項 PASS／FAIL／BLOCKED／NOT TESTED，附實際驗證證據與剩餘問題；**有已知高影響缺陷或驗證器漏報時不得宣稱完成交付**，也不能自動 Merge。
