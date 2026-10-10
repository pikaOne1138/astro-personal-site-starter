---
name: astro-page-management
description: Add, revise, hide, move or retire pages in an existing independent Astro website with shared navigation consistency, route checks, redirects, SEO and safe PR previews.
---
# Astro Page Management｜既有網站的頁面管理

## 適用時機
學員說「新增一個頁面」「將某頁加入主選單／子選單」「修改頁面」「隱藏／刪除頁面」「把頁面網址改掉」，或發現「新頁面只有部分頁面的導航更新」時使用。

**針對學員自己的獨立 Astro Repo，不是重新執行整站匯出器。** 先讀學員 Repo 的 `AGENTS.md`、實際路由、Layout、導覽元件、網站設定、`package.json`、已配置的部署方式；不能硬套研究展示站的檔案路徑。必要時參閱 `astro-site-maintenance`、`astro-layout-craft`、`astro-ui-craft`、`astro-navigation-tree-test` 和 `astro-pr-preview`。

## 核心原則：一個導航來源，整站一致
新增頁面不代表應自動出現在主選單。先與學員確認頁面應為「主選單／某選單的子頁／只有內部連結／不公開」。但**一旦決定加入導航，所有應顯示該導航的頁面都必須同步**。

1. 盤點首頁、文章列表、文章內頁、服務頁、關於頁、404、行動選單及使用不同 Layout 的頁面。檢查是否各有硬編碼的 Header／Nav。
2. 找到導航真正來源（配置檔、Content Collection 或 shared SiteHeader／SiteNav）。**優先統一資料來源，並由每頁共同 Layout 消費**。若存在多組語意不同的選單（主選單、頁尾、文章目錄），不要把它們硬變成同一組；各有一份明確的 source of truth。
3. 更改導覽資料後，要確認**每個既有頁面**的 Desktop Header、Mobile Menu（含展開狀態）、子選單、頁尾內部連結（適用時）、麵包屑、當前頁 aria-current，以及新舊路由連結均一致。
4. 不要只檢查新增頁面，尤其要抽測至少「首頁 + 一個舊內頁 + 文章內頁或服務內頁 + 新頁面」，若存在更多不同的 Layout，逐類各測一個。必要時用瀏覽器遍歷整個 sitemap 取樣每類路由。
5. **一致性不等於所有頁面必須長一樣。** 文章內頁的目錄和頁面內次導覽可以不同；比較的是網站共用的主選單資料／URL／階層，不應把個別頁面側欄當成缺陷。
6. 以 Chrome/Chromium 1440、1280、768、390px 驗證；手機選單需實際點開。每一頁的同一套主導覽項目/順序/目的地應一致；不能只靠 Build 通過。

## 工作流程 A｜新增頁面
1. 先確認目的、讀者、預定網址 slug、內容是否齊全，以及要不要出現在主選單。確認相似頁面是否已存在。
2. 使用目前站點的真實 Astro 路由方式新增頁面（`src/pages/` 或由 Content Collection 生成）；使用**共享 Layout／Header／Nav**，沿用現有 Tokens、可重用 Blocks／Section Patterns。新增 Block 前先查 `src/data/blocks.registry.json` 或學員站自有 registry，避免重複造。
3. 若要加入選單，只修改 canonical nav source，不要在每個頁面再貼一次選單。導覽有父子層級時檢查父頁仍可開啟、鍵盤與觸控都能到子頁。
4. 建立頁面內容、正確標題/description、canonical、內部連結、需要時的 breadcrumb 和 sitemap；不應憑空創造證照、服務價格、客戶見證或可用的預約/訂閱。
5. 如果是獨立站點的靜態 Sitemap 生成器，確認新路由確實進入 sitemap；不能因為有導航連結就推定 Sitemap 自動更新。
6. 完成下方一致性與發布閘門。

## 工作流程 B｜修改／隱藏／移動／刪除
- **修改內容／版面：** 最小修改，維持現有 URL、選單和既有品牌。對共用元件的變動，逐一檢查其他使用頁面。
- **從選單隱藏：** 先確認是僅從導航隱藏，還是取消公開；前者不等於頁面下線，也不等於不會被搜尋引擎收錄。
- **改名但不改網址：** 更新標題、導航、內部連結（適用時），保留 canonical 與舊連結。
- **更改 slug／移動路徑：** 先列出舊→新 URL 表，確認外部連結、SEO、RSS、Sitemap、社群分享影響；如託管平台支援，設真正可測的 301/308 轉址。GitHub Pages 與 Cloudflare Pages 的轉址能力不同，不能假稱伺服器轉址已生效。
- **刪除頁面／取消公開：** 刪除任何真實內容前需使用者明確同意，保留可復原版本；清理導航、Sitemap、內鏈、相關文章和舊網址處理。私人/機密內容不得單靠 robots 或 noindex 保護。

## 自動化輔助（仍需人工瀏覽器驗收）
若從最新版工作坊 ZIP 取得 `scripts/verify-student-navigation.mjs`，AI 可在已具備 Playwright/Chromium 的工作環境啟動學員自己的 Astro Preview，執行 `node <ZIP_DIR>/scripts/verify-student-navigation.mjs --url http://127.0.0.1:4321/ --paths /,/about/,/new-page/`。它需要明確傳入 `--expect-links /,/about/,/new-page/`（必須來自網站的預期導航設定，不能直接抄測試結果），在 1440/390px 比對各頁主導覽和桌機／手機差異、實際打開所有同站導航目的地確認非 404，並輸出 `qa-artifacts/navigation/results.json`。**先根據學員真實路由和 NAV DOM 調整測試選擇器；未涵蓋的下拉子選單、平板、交互與視覺仍必須另測，不能把執行成功當成全部導航驗收完成。**

## 交付前自我驗證：不接受推定 PASS
- 對應的自動化驗證必須包含正向案例和故障注入案例：較長文章目錄不得誤判成主選單；所有手機頁面同步缺項必須 FAIL；選單目的地 404 必須 FAIL；重複路由輸入必須 FAIL。驗證器本身未通過回歸測試則禁止交付。
- 以實際網站導航設定當作預期值；每一個新增頁面要驗證主導航、網址、Sitemap、內鏈、麵包屑及手機操作。任何不能驗證的部分標 `NOT TESTED` 或 `BLOCKED`，不能寫 `PASS`。
- 每次修正後重新執行受影響範圍與既有頁面的回歸；保留命令、執行結果、Commit SHA 與遠端 Preview URL。只證明程式編譯成功不代表功能驗收完成。

## 強制 QA｜Navigation Consistency Gate
1. `npm run build` 成功，沒有新破圖、404、孤兒頁或失效的選單連結。
2. 實際瀏覽器對照多頁的**主選單**（label、href、排序、父子關係）、手機選單的相同資料，以及點擊後真實可達的目的地；記錄路由×視口矩陣與失敗明細。
3. 如有新子選單，測 Tab、Enter、Space、Escape（依元件行為）、Focus、觸控操作、aria-expanded／aria-current。
4. Sitemap／Canonical／Breadcrumbs／footer 連結（適用時）與新增頁一致。內部相對連結需支援網站的 `BASE_URL`，不能把測試路徑硬寫到正式站。
5. 從 Feature Branch 開 PR，對**真實可開啟且與 PR Head SHA 一致**的 Preview 進行四尺寸及至少四類頁面 QA；若無 Preview，要報 BLOCKED，不能以 artifact 冒充。
6. 回報「新增／變更頁面、共用導航來源、受影響的所有頁面、實際測試矩陣與剩餘風險」。沒有學員明確同意不得 Merge、發布、覆蓋 main。

## 給學員的自然語言提示詞
> 幫我在現有網站新增「＿＿」頁，內容目的是＿＿，請先確認它適合放在主選單、子選單還是只當內部連結。不要重做整個網站。請使用現有共用導航，並檢查首頁、所有舊內頁、新頁面、文章/服務頁的桌機與手機選單有沒有同步。建 PR 和可開啟的 Preview，做四種寬度測試；先給我看，未經我同意不要合併或發布。
