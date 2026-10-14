# PR #47｜第一階段：11 款 Layout 的可編輯內容契約

更新：2026-10-14。此文件只涵蓋 **Art Direction 原型、布局專用內容欄位與交接接口**。不將此資料檔當成正式文章庫，不修改 #46 Gallery／主 Generator／主 Adapter，PR 維持 Draft。

## 單一可編輯資料來源

- `src/data/art-direction-layout-content.json`：兩客群共用的示範欄位，加上 11 個 slug 的 `headline`／`about` 覆寫入口。完整資料須由使用者自行填寫。
- `src/data/art-direction-content.ts`：資料正規化、空值 fallback、公開／未公開資料分離、文章／服務網址計算。
- `src/pages/layouts/<slug>/[...page].astro`：11 款保持各自構圖，首頁、索引、詳細頁、About 從同一個契約讀取資料。
- **正式知識網站文章來源仍然是 Astro Content Collections (`src/content/articles/`)**。這份 JSON 是 Layout Prototype / Adapter handoff 的編輯契約示例，**不是正式網站的新文章資料庫**。後續主資料接線應由 #46 消費契約，不可在主網站啟用兩套文章來源。

### Knowledge：6 款

欄位：`siteName`, `headline`, `intro`, `about`，`articles[]` 中每篇含 `slug`、`title`、`summary`、`body[]`、`date`、`tag`、`image`（可為 null）和 `published`。

`published:false` 的文章不產生閱讀連結；公開文章提供有實體靜態輸出頁面的網址。沒有文章時顯示「目前沒有公開文章」，而不是假造文章數量。可新增第二篇以上的公開文章，產生 `articles/<slug>/` 路由。首篇沿用各原型舊版詳細頁路由以保持既有 preview 連結。

| Slug | 資料如何進入構圖 |
|---|---|
| sidebar-journal | 日期筆記串流、作者介紹、單篇長文與追加文章 |
| editorial-frontpage | 第一篇頭條／其餘短文，關於及長文閱讀 |
| card-journal | 同權卡片、標籤摘要、文章內頁 |
| visual-stories | 圖文敘事列表；無照片時保留文字及說明 |
| compact-dispatch | 日期短箋閱讀流；無圖片需求 |
| split-reader | 主文與索引分欄，詳細頁保留主從關係 |

### Helper：5 款

欄位：`siteName`, `headline`, `intro`, `about`，`services[]` 每筆含 `slug`, `title`, `summary`, `body[]`, `fit`, `format`, `duration`, `price`, `scope`, `credential`, `bookingUrl`, `image`, `published`；`questions[]` 有 `question` / `answer`。

未填價格、執照、對象或形式時顯示「待設定／待核實」，不虛構服務或交易。無服務時顯示「尚未提供正式服務」。公開第二項服務以上產生 `services/<slug>/` 內頁；首筆沿用原型 `services/individual/`。

| Slug | 內容角色 |
|---|---|
| portrait-profile | 真實人物／背景主角；照片非必填；服務資訊與邊界 |
| service-catalogue | 比較服務條目、規格表、明細與追加服務 |
| studio-chapters | 服務資訊與 Q/A 轉為章節與目錄，服務詳細頁沿用章節閱讀 |
| editorial-practice | 觀點文章與服務側記；服務條目可配置 |
| question-led-practice | 問題與回答的長頁語法；服務條目與詳細頁分開處理 |

`bookingUrl` 在此原型契約中只是待配置欄位，**不會自動顯示預約成功**，也不代表正式串接。助人者資格、價格、醫療效果、見證一概不能假造。

## 狀態與限制

1. 本輪是原型頁的內容契約與 Source Data 接線。頁面主體仍保留為了 Art Direction 研究而存在的示範段落，不代表 44 條路由都已成為完整、可由 CMS 管理的最終學員網站。
2. 頁面有自己的 Layout DOM／CSS；資料契約**不**決定 Hero 欄比、文章格網或微動畫，不應破壞版型多樣性。
3. 圖片網址可空值，目前各原型使用明確占位，不能當成授權圖片或真正的個人照片。
4. `scripts/verify-art-direction-layout-content.mjs` 對 11 款做 **預設／空內容／第二篇文章和第二項服務** 三種完整 Astro 建置檢查；成功記錄以 GitHub Actions `Art Direction Layout Content Contract` 最新 Run 為準。未通過不可標為「全部完成」。
5. 已通過的既有 Subject Atlas / Practice Compass 獨立 Adapter 不因此變成 11 款已完成 Starter。正式輸出、主 Adapter 由 #46 接續。

## 後續階段（不屬本輪）
- 索引、詳細頁、About 的四尺寸人工 Art Direction QA、鍵盤／讀屏／對比驗收（第二階段）。
- Layout Definition 25 款整庫狀態、QA 證據、與 #46 的最終交接（第三階段）。
