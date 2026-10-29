---
name: astro-site-maintenance
description: Safely update, back up, recover and maintain beginner-owned Astro websites with GitHub branches, reviews, published-content checks and reproducible restores. Not for building a new site or redesigning one (use astro-site-from-zero or astro-ui-craft) and not for first-time hosting setup (use astro-starter-deploy).
---
# Astro Site Maintenance｜更新、備份與復原

## 學員的維護啟動儀式
學員用 `docs/student-builder-pack/START-MAINTENANCE-PROMPT.txt`（`/guide/` 第 07 步可複製，唯一正式版本）開新對話時，依序：(1) 先讀學員站的 `PROJECT.md`、狀態與真實工作樹，用白話報告「網站現在是什麼、網址、上次改了什麼」，讀不到就明說；(2) 一次問一個「這次要改什麼」；(3) 動手前複述「將修改 A、會影響 B、不會動 C」，學員說好才做；(4) 做完提供不影響正式站的預覽，並把變更寫回 `PROJECT.md`。學員已用具體文字說清楚、可逆的小修改（例如「價格改為 2,000 元」）可直接做並給預覽，不再索取相同授權；範圍不明或有連帶影響才補問。維護不重跑匯出器，也不受首次組站的 G-00 開工紀錄影響。正式發布仍需針對該版本的明確核准。

## 用途
學員說「改首頁、寫文章、上傳圖片、修壞網站、恢復昨天版本、換電腦」時使用。與 `astro-content-publishing`、`astro-pr-preview`、`astro-starter-deploy` 分工，不自建 CMS、資料庫或會員後台。

## 重要觀念
- Git 歷史不是完整備份：它只保存已提交的檔案，不包含外部預約／表單資料、第三方平台資料、憑證、未提交的本機檔案或 DNS 設定。
- Preview / Production 必須明確區分。看得到網頁不等於網站真的部署成功，也不等於提交後搜尋索引已更新。
- 回復到舊 Commit 可能會一起撤銷文章、安全修正與站點設定，不能只看漂亮的畫面。
- 任何會刪除文章、改網址、變更網域、強制推送或回滾正式站的操作，要先列出影響範圍並取得明確核准。

## 讀寫邊界與失敗上限
- 下面各流程的步驟前標有【讀】或【寫】：【讀】只做檢查、盤點、建置與測試，不改原始檔、不提交、不推送；【寫】才會改檔、提交、推送、合併或部署。做【寫】之前，該步需要的【讀】結果要已經在手；複審者與盤點者只做【讀】。
- **同一做法失敗兩次就停手**：不要第三次用同樣方式重試。寫下試過什麼、卡在哪、現在的檔案狀態，用白話告訴學員卡點與你建議的下一步，等學員決定。換一種做法算新的一次嘗試，但要先說明為何不同。

## 工作流程 A｜日常安全更新
1. 【讀】讀 `AGENTS.md`、網站 Repo 目前狀態與相關 Skill，先確認修改哪些頁面、資料和現有功能。
2. 【寫】從目前正常運作的分支建立變更 Branch；不要直接修改正式 main。新文章從 `src/content/articles/*.md` 進入，不要改 Derived Adapter。
3. 【寫】改動範圍維持最小，保留既有 URL、圖片授權和 SEO；外部表單及預約是否真實有效必須核對。
4. 【讀】執行 Build、程式測試及連結/搜尋檢查，PR Preview 的網址必須真的可打開。對視覺變更檢查桌機與手機。
5. 【寫】列出本次修改、可能影響、測試結果；等學員確認後合併，再驗證正式發布。

## 新增功能先查元件庫（不要先自己寫）
學員說「加一個 X」（輪播、篩選、手風琴、新卡片排法等）時，先照 `AGENTS.md` 的強制盤點查本站 `.ai/library/`：registry 在 `.ai/library/data/`、元件在 `.ai/library/components/`，那是跟著本站交付的備用零件架。架上有合用的，依 `.ai/library/README.md` 的步驟複製進 `src/components/`、補上需要的 CSS 再使用；架上和 `src/` 都查無，才自己寫，並在回報裡說明查過哪些地方、為何不能用。不要直接從 `.ai/library/` import。

## 工作流程 B｜備份
1. 【讀】確認 Repo 所有應納入備份的內容已 Commit／Push：程式、Markdown、設定、合法使用的圖片和 public 資產。
2. 【讀】建議使用 GitHub Repository 的完整 Git clone 或定期匯出封存作為第二份副本；備份位置應獨立於單一電腦，並有訪問權限管理。
3. 【讀】記錄建置依賴版本、Node 版本、部署提供商、正式網域、必要 DNS 設定及外部服務列表。憑證僅記「存放位置與更新程序」，不可明文備份到 Repo。
4. 【讀】檢查外部系統另有無備份責任（LINE、電子報、Google Forms、預約服務等）；這些不屬於網站原始碼備份。
5. 【讀】每次重大變更前保留已知正常的 Commit SHA 和正式網址，記錄可恢復版本。

## 工作流程 C｜故障定位與復原
1. 【讀】先分類：Build 失敗、部署失敗、網址／DNS 錯誤、某篇文章／圖片壞掉、PR Preview 壞掉、搜尋／RSS 未更新。
2. 【讀】檢查 GitHub Actions 或部署平台實際 Log，確認哪個 Commit、哪次 Build、是否真的部署成功。不要先猜測是快取問題。
3. 【寫】優先在修復 Branch 提交最小修正；若需回到舊版，建議使用可稽核的 Revert PR，不預設 `git push --force` 或強制 Reset main。
4. 【寫】如果 Restore 需改動公開網址、DNS、已上線文章或外部服務，先提供影響摘要並等待確認。
5. 【讀】復原後重新執行 Build、首頁/文章/搜尋/404/訂閱/CTA 的實際驗證；告知恢復版本及尚未確認的部分。

## 完成標準
學員在 AI 協助下知道如何「修改 → 預覽 → 確認 → 發布 → 驗證」，以及如何找到上次正常版本並以審核過的 PR 恢復；不把 GitHub 視為外部服務的萬能備份。


## 維護任務路由與跨頁一致性
學員提需求時先讀學員**自己的** Repo。要用哪個 Skill，依專案 `AGENTS.md` 的任務對照表。任何修改都走 Branch → Build → 真實 PR Preview → QA → 明確核准 → Merge 的流程。
**特殊關卡：**新增頁面到選單、變更 Header/Footer、調整主/子導航時，必須跑 `astro-page-management` 的 Navigation Consistency Gate，不得只看新頁面成功就結案。

## Agent 自我驗證與交付證據（所有維護必經）
1. 先寫出「修改前預期行為、修改後預期行為、不能受影響的舊行為」；將需求轉為可執行測試，而非僅靠 LLM 自行宣布成功。
2. 建立故障注入／反例驗證：測試必須抓得到已知的錯誤（例如導航 404、手機漏項、草稿外洩、原本頁面被改壞）；若驗證器無法抓到，先修驗證器，不能發布。
3. 執行 Build、單元與整合測試、真實 Chromium 互動，以及需要時的 1440／1280／768／390 視覺檢查；由真實已部署 Preview 再測一次，核對 Head SHA。測試未跑、出錯或取不到證據，一律標 BLOCKED／NOT TESTED。
4. 原本已存在的功能必須回歸：頁面與主導航、文章列表、RSS／Sitemap／robots、既有可操作元件、鍵盤／觸控與替代文字。不可只看本次新功能。
5. 文章或較大的頁面文字，交給學員核准前另做獨立複審與宣稱清查（`.ai/astro-content-publishing/SKILL.md` 的 Workflow B2）；核准後檔案若有變動，核准即失效，由發布關卡比對並要求重新核准，不另建新機制。
6. 向學員回報逐項 PASS／FAIL／BLOCKED／NOT TESTED，附實際驗證證據與剩餘問題；**有已知高影響缺陷或驗證器漏報時不得宣稱完成交付**，也不能自動 Merge。

## 草稿隔離與發布
文章的草稿與公開來源、發布與撤回、外洩檢查，依 `.ai/astro-content-publishing/SKILL.md`。
