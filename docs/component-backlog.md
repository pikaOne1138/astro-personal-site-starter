# 元件待辦與評估準則

> 對象：維護這個研究展示 Repo 的人。**這份文件不會進學員 ZIP。** 它取代了兩份已執行完畢的規劃文件（Manus 元件對照矩陣與跨 AI 研究缺口矩陣，已封存在 `docs/archive/`）：它們規劃的 MobileMenu、BookingLink、ContactActions、PricingDetails、TrustInfo、MediaEmbed、Breadcrumbs、ArticleNavigation、ArticleShare、ReadingProgress、ResourceCard／ResourceLibrary、LeadMagnetCard、NewsletterSignup、PractitionerCard、ServiceFit 都已實作並登錄。現有元件以 `src/data/blocks.registry.json` 為準。

## 還沒做的候選

| 候選 | 為什麼還沒做／做的條件 |
|---|---|
| `Pagination`、`TopicCollection` | 需要真實的分類 slug 頁與靜態分頁路由，只做外觀會產生死連結；要隨 Content Collections 一起做 |
| `SeriesNavigation` | 只有真的有系列文章時才出現 |
| `ImageGallery`（含圖說與授權標示） | 每張圖要有 alt、caption、credit，比例合理；燈箱是進階選配 |
| `PullQuote` | 編輯式文章引言，等實際文章需要時再做 |
| `ProofStats` | 只有數據有可驗證的來源網址與有效期時才展示，未驗證不填 |
| `NewsletterArchive` | 有連續發刊的內容才需要，不做假的期數 |
| 文章 `ArticleHeader`／`ArticleMeta`／`ArticleBody` 的共用化 | 目前文章頁已有各自的實作；要共用時先對照現有資料契約，不要為名稱再建幾乎相同的元件 |
| `TherapistFilter`、`MiniMatchQuiz` | 單人網站不需要；多專業者或真實媒合需求才做，且不採集敏感個資 |

## 明確不做

- 留言系統：需要第三方、個資與審核規則。
- 會員、金流、自建預約或排程後端：一律用可替換的外部服務。
- 把任何表單做成看似可送出：沒有後端或外部服務時，只顯示明確的未設定狀態。

## 評估外部元件套件時

- **按功能比對，不按名稱。** 一個外部元件不代表必須新建同名元件；先看我們現有元件的 Props 與實際功能。
- **不要把外部套件覆蓋進 `src/components/blocks/`。** 外部專案有自己的 Astro 版本、鎖檔、CSS token 與路由，不能原樣搬入；用我們現有的主題 token、`BASE_URL`、元件分類、Skill 與 registry 重新整合。
- **外部示範資料不是事實。** 範例中的推薦、報價、資格、媒體 logo 都不能直接採用；表單與預約按鈕若沒有串接後端，不能搬成看似可用的功能。
- **外部元件的關鍵行為要實測。** 例如閱讀進度的計算在短文章與長頁面可能不準；分頁元件若不自動建立對應的靜態路由，就只是死連結。
- 外部研究的結論，重複被多份報告提到不等於獨立驗證。助人者案例的證照、費用、療效與緊急求助資訊要依實際專業與所在地驗證，不要照貼其他地區的緊急電話。

## 自動組裝（AI 依需求選區塊）的前提

只有在下列條件成立後才考慮：

1. 兩種網站各有一套從零到發布、手機可用的完整實例。
2. registry 對每個元件記載適用場景、必填 props、預設值、依賴、禁忌與實際 Demo 網址。
3. 所有元件的功能都有真實操作，沒有假表單與死連結。
4. 文章與服務有正式的內容 schema，生成頁面不依賴寫死的範例資料。
5. 自動組裝只輸出 GitHub PR，**不自動合併**，可回退、可預覽。

最小流程：使用者選網站類型 → 回答 6–8 個必要問題 → AI 依 Skill 與 registry 選區塊 → 產生 Astro 頁面與內容 → PR Preview → 人工確認。不建立 SaaS 後台、會員、資料庫或金流。（學員端的實際流程見 `.ai/astro-site-entry/SKILL.md`。）
