> **已封存（2026-10-23）。** 某一輪 CI 與驗收的紀錄（Run、Artifact 編號與截圖連結已過期）。仍有效的契約已在 `docs/layout/layout-assembly.md`，學員端契約在 `docs/student-builder-pack/` 的 `EXPANDED-LAYOUTS.md`、`SECTION-PATTERNS.md`、`OWNED-MEDIA.md`。僅供歷史查閱，不再維護。

# PR46｜新增十三款非頁腳 Section Patterns

本輪沿用單一 Site Brief → Builder Pack → 既有匯出器流程，新增十三款維持 Adapter / in-progress。PR 保持 Draft；沒有 Merge、Production 或 DNS 變更。

## 組裝結果

- `featured-work` 在兩類站皆可用；`trust-service-path` 僅 helper。以既有 FeaturedWorkSection、TrustServiceSection、FeatureGrid、ServiceFit、TrustInfo、CTASection、Button 組成，不新增 Block 或 Registry 項目。
- 每款首頁第一區段後有 `after-intro` 插槽；`page-end` 在該頁原內容欄內、原 footer 前。首頁、About、內容索引、已啟用自訂頁均以 navigation id 與實際路徑對應。不是掛在共用 SiteLayout 外部的統一附錄。
- Sidebar 的 Pattern 留在文章欄，刊物接在 front 跨欄後，人物接在 hero 後，工作室接在 stage 後。其他各款接在原 intro／hero 後。原頁面構圖與路由保留。
- 主題、字體、邊線與背景繼承當款；嵌入 CSS 限縮在 pattern-slot，不修改 Gallery 或 Blocks 樣式。單一作品使用整欄，側欄版型窄尺寸將內容區段改為單欄。
- 選取的 footer 現在也會取代十一款 native 的原 footer，避免已允許選取卻被外框抑制。每頁只有一份 footer。

## 資料與失敗方式

`sectionPatterns[].content` 為實際資料；作品名稱／簡介、服務描述／適合與不適合情況不能缺少。沒有自動生成的資格、成果、政策或 CTA。未設定網址的作品呈現文字。

文章使用 articleSlugs，從當次 Build 的非草稿 Content Collections 取標題、摘要與路由。缺稿／下架直接排除，不複製舊資料。需啟用文章頁，避免 helper 沒有文章路由卻產生精選連結。外部作品 URL 僅接受無帳密 HTTPS；站內 CTA 使用啟用的 navigation id，支援子路徑。

現有規劃器預設「主要內容之後」轉為 page-end，既有首頁介紹／自介別名轉為 after-intro。未知位置、錯誤種類、未啟用頁、缺內容、重複選取、危險 URL 都會在交付目錄前拒絕，不忽略使用者選取。

包內 [SECTION-PATTERNS.md](../student-builder-pack/SECTION-PATTERNS.md) 提供完整 JSON 欄位、位置與編輯方式。新增 normalization 模組透過原 build-student-pack 白名單出貨，沒有第二套 ZIP。

## 驗證範圍與界線

- 主 Repo `npm run build`；既有十二款快查。
- Independent Adapter 回歸增加位置、必要資料、服務界線、URL、文章頁啟用、HTML 逃逸及 BASE_URL。實際匯出建置與 ZIP 出貨仍走原檢查。
- Standalone FULL 在十三款真正輸出中加入首頁開場、About、內容索引與多層自訂頁 Patterns；四尺寸檢查選取順序、原版型內容欄、開場插入點、鍵盤及 44px 連結。全部頁面檢查單一 footer。
- 既有文章移除測試繼續檢查 Homepage／索引／RSS／Sitemap／搜尋內容，涵蓋 Pattern 引用被移除的文章。原品牌與自有圖片情境也加入 page-end 插入。
- Actions 與人工目視結果以 PR 正文最新 SHA 的證據為準；本文不預先宣稱遠端成功或持有人設計核可。

仍待真實持有人內容與圖片、實機、Safari／Firefox／讀屏、PR47 小點擊目標分級及最終設計核准。此輪沒有把未填資料的規劃器 Brief 升格成完成網站。

## 截圖目視後的修正

067cbcea 的 1,736 張自動檢查全綠，但實際 CI 自訂頁畫面顯示舊 SelectedPatterns 佔位段落與真正 Pattern 並存；原測試只數 data-section-pattern 而漏掉舊 DOM。已移除 shared catch-all 及可選 helper archive 的舊渲染入口，保留全站 footer。新增 DOM／建置輸出檢查，禁止 .student-pattern 殘留，並在 helper 文章索引實測選用 Pattern。

同次目視亦發現 studio-chapters 的通用 extra 內容錯附服務資料表，已移除；正式服務索引與詳細頁的資訊表保留。新增自訂頁不得帶 native-service-facts 的檢查。

空網站不必填滿選填區段：資料未備時先取消該 Pattern，再照常匯出／Build；不是為了檢查而補造作品。四份由實際下載包產生、各自安裝依賴的網站（subject-atlas、practice-compass、sidebar-journal、service-catalogue）完成公開 → 草稿 → 刪除與每次 Build／verify，精選、路由及搜尋均無舊文殘留；先前共用依賴暫存測試的疑點未在隔離環境重現。

進一步目視 067cbcea 的深色品牌截圖，發現選用 editorial footer 沿用淺色固定底、文字卻繼承淺色品牌墨色。已以同一頁的 bg／ink 修正三種頁腳：minimal 同底、editorial 品牌色 10% 混合底、professional 反相。瀏覽器回歸現在實測選用 footer 中可見文字與實際背景的對比，低於 4.5 即 FAIL，包含既有深色品牌情境。未更動原十二款頁腳來源。
