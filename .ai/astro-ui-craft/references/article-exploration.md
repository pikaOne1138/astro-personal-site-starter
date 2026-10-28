# 文章探索與閱讀元件

> 先讀 `COMPONENTS.md`、`src/data/blocks.registry.json` 與元件實際的 Props。這份只講文章探索、清單、搜尋與閱讀排版的設計與驗收準則。

## 文章探索

- `ArticleSearch`：GET 表單，查詢參數 `q`，比對標題、摘要、分類、標籤。
- `TagCloud`：可連結的標籤與使用次數（`tag`）。
- `ArchiveMonths`：月份與文章數（`month`）。
- `PostCalendar`：週一起算的月曆，只有有發文的日期可點（`date`）。
- `q`、`tag`、`month`、`date` 都是 URL 參數，讓每個探索狀態都能被連結。月份數、標籤數、日曆日期與可見結果，都要來自同一份資料。
- `ArticleViewSwitcher` 把同一組文章切換為列表、卡片、網格（用 `aria-pressed` 按鈕，在用戶端切換），保留 URL 篩選行為。不要把三種版面做成一樣的卡片網格。
- `ArticleArchive` 在 `/[kind]/[theme]/articles/` 組合上述元件；舊的 `explore/` 會轉址並保留查詢參數。

## 全站搜尋

`SiteSearchDialog` 是可存取的原生 `dialog`：導覽列的放大鏡圖示、`Ctrl+K`／`⌘K` 開啟、`Esc` 關閉，用 `showModal()` 取得焦點陷阱。搜尋由 Pagefind 在 `astro build` 後對公開靜態 HTML 建立的全文索引提供，所以 `astro dev` 沒有索引時要明確說明，不能假裝搜尋成功。要使用 `BASE_URL`，在 PR 預覽子路徑下也要能運作。搜尋對話框要不透明，用既有 tokens，不要在 sticky 導覽列放半透明遮罩。

## 資料

- 文章的唯一來源是 Astro Content Collection（`src/content/articles/`）；`src/data/articles-adapter.ts` 只是給既有 Demo 用的相容層，不是新增文章的地方。
- 示範用的文章與發文日期是教材，不代表真實的發文記錄。換成真實網站時，每個網站用一套日期慣例，區分發布日與更新日，並保留 SEO 的 canonical 網址與實際的 slug 歷史（遷移 WordPress 內容時尤其重要）。
- 靜態優先：不用自訂伺服器、資料庫或帳號。

## 文章內文元件

- `ArticleAccordion`：原生 `details/summary` 的摺疊，有 slot。
- `ArticleList`：依 items 產生編號或項目符號清單。
- `ArticleGrid`：兩欄或三欄並排說明，使用 slot。
- `ArticleCallout`：note／tip／warning，採**編輯式腳註／旁注**處理：細的上下線、清楚的層級；不要灰底圓角卡，也不要粗色左邊條；意思要用文字傳達，不能只靠顏色。
- `ArticleComparison`：有圖說、表頭與列的比較表。
- `RelatedArticles`：真實的站內相關連結。
- `ContentCarousel`：通用輪播。橫向 scroll-snap，有真正的上一個／下一個控制、鍵盤捲動，並處理 reduced-motion。內容有兩種給法：用 slot 自己放卡片，或用 `items` 傳入 `{title, href, image?, imageAlt?, excerpt?}` 由元件渲染（挑哪些文章由頁面層決定：最新、指定清單、某主題、有封面優先，都在頁面層組好陣列再傳入，元件不直接讀 Content Collection）。版型 `variant` 可選 `cards`（多卡橫滑）或 `hero`（單張大圖＋標題）；`arrows` 可選 `top`／`side`／`none`（舊 `sideArrows` 相容）；`dots` 顯示位置圓點（對應第一個可見項）；`loop` 決定到頭行為：預設停止並停用邊界箭頭，`loop` 時最後一項的下一個回到第一項。少於兩項時自動隱藏控制。

## 導覽列的遮罩規則

文章探索頁會在 sticky 導覽列下方捲動。四個主題的導覽列**都必須有完全不透明的底**（包含 Botanical 與 Morning）。不要依賴透明或模糊的半透明底，否則搜尋欄或頁面文字會透出到導覽標籤後面。要在頁面頂端、捲到一半、以及搜尋欄經過導覽列時截圖確認 z 軸順序與手機 CTA 可見。

## 設計限制

沿用既有的視覺人格與字級、間距 tokens。**優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。** 不要為初學者引入外部執行環境、複雜的搜尋後端或文章編輯器。手機上，歸檔與日曆堆疊在結果下方；用語意化的標題與連結，日期控制項要可聚焦；搜尋與日期導覽不能依賴假連結。

## 驗收

- 搜尋 `q` 會比對標題／分類／標籤／摘要，沒有結果時有空狀態。
- 點標籤、月份或日曆日期，會選出完全相符的文章並更新結果數。
- 月曆週一起算、天數正確、只有已發布的日期可點。
- 每個文章結果都開啟真實產生的文章網址。
- 在 PR 預覽的 `BASE_URL` 下，CSS 與每個站內連結都正常。
- 建置成功，並確認預覽網址後才宣稱成功。
