# 新增十三款的正式 Starter 接線

這是既有 AI Builder Pack／主 Starter Export 的擴充，不是新產生器。`src/data/layout-assembly/definitions.mjs` 合併原十二款與 `expansion-directions.json` 的十三款。新增十三款為 **in-progress Adapter**，不是 Ready；`--require-ready` 仍拒絕它們。

## 主流程與來源

AI 讀取學員的 Site Brief，使用 `scripts/export-starter.mjs <brief.json> <empty-output> --require-assembled`。主入口按 registry 委派既有 art-direction exporter；新增十一款由 `scripts/native-layout-adapters.mjs` 複製各自的 `expanded/<slug>/Page.astro`，不再輸出代用的 field-notes／clinician 首頁。

學員仍走規劃器 → JSON → 既有 Builder Pack ZIP → 官方提示詞 → AI 建自己的 Repository → Preview → 核准部署，不需要親自執行以上指令。

| 原型契約 | 正式 Site Brief／輸出 |
|---|---|
| siteName | `brand.name` |
| primaryCta.label／pageId | 新十一款原生 Navbar 與首頁主要行動，依 navigation 的實際 path 解析；兩款既有 Adapter 保留其 Header 行動。巢狀自訂頁及 BASE_URL 不改成原型固定網址 |
| headline、intro | `content.headline`、`content.intro` |
| about | `about.bio/purpose/approach/background`；缺 bio 時接受 `pageContent.about` |
| articles[] | 正式來源是 `src/content/articles/*.md`；`contentDirectory` 可指定 Brief 旁的內容子目錄；不另建文章 JSON |
| article published | Markdown `draft: true` 不公開，其餘依正式 Collection；網址保留真正檔案 slug |
| article date、tag、image | frontmatter `publishedAt`、`tags`、`image`；選用站長自有圖片 |
| services[] | Brief `services[]`：`slug/title/summary/body/fit/format/duration/price/scope/credential/image/bookingUrl/published` |
| questions[] | `artDirection.faq[]`，亦接受 `questions[]`；每筆 question／answer |
| 既有服務資訊 | `serviceFacts` 繼續保留；兩款 #47 Adapter 轉入 `artDirection.serviceFacts`，新增十一款缺服務時仍顯示已提供的基本資訊 |
| 正式聯絡／預約 | `artDirection.contact.email/url/bookingUrl`；個別服務亦可有 bookingUrl。網址必須 HTTPS、不得含帳密；僅導向正式外部服務，沒有假成功回覆 |

服務必須有唯一有效 slug 與明確 published boolean。未公開服務不產生頁面、索引連結或 Sitemap 項目。缺資格、費用、照片與服務內容維持待設定／待核實，不補虛構案例。舊原型固定 `services/individual/`／sample article 不作正式網站 slug；新網站用資料指定的實際網址。

原型專用補充段落可由 `layoutContent.copy.pN` 覆寫，這些是 AI 依該版型 Page 原始碼對位的選填文字，不是學員必填表單。未提供就保持空白，不把研究原型的示範經歷當成學員文案。

## 十二款既有與新增十三款的界線

- 原十二款維持原有 Home／Archive／Article／About／Service 及 Blocks／Section Patterns 功能。
- 新增十三款支援 featured-work、helper 專用 trust-service-path，以及 site-wide footer；首頁開場後／指定頁內容後依 [SECTION-PATTERNS.md](SECTION-PATTERNS.md) 的明確插槽與真實資料組裝。未知位置或無效資料會拒絕匯出；未準備的選填 Pattern 可先取消，空網站仍可 Build。
- 新增十三款均支援自有 Logo／主視覺，仍由既有本地檔案或 assets 驗證並複製。具體角色見 [包內圖片位置與標題契約](OWNED-MEDIA.md)；文字型首頁不為了放圖而改成通用照片 Hero。
- 新十一款保留各自原生多頁 DOM／CSS；首頁、索引、詳情與 About 不套同一個 Home。FAQ／聯絡／搜尋／主題功能頁及 optional helper articles 保留原生外框與導覽，閱讀內容功能共用；這些頁面的進一步 Art Direction 仍須目視核可。
- 新增十一款色彩與 display 字體已接既有品牌變數；CI 加入深色配色／clear-sans 的實際 Build 與 Home／About 四尺寸計算樣式檢查。`brand.imageFit`／`imagePosition` 與 `layoutContent.headings` 已接線，允許 key 見 `src/data/layout-assembly/expanded/heading-fields.json`。圖片裁切、持有人文案及 0／1／多筆時的留白品質仍須用真實學員資料驗收。Build 或四尺寸零溢出不等於 Ready。

## 既有驗證入口

- `verify-starter-export.mjs`：FULL 模式匯出 25 款、安裝／Build／verify、四尺寸真實 Chromium 截圖；新增十一款另驗 0／1／多篇、草稿、撤回後網址／RSS／Sitemap／搜尋，以及服務 0／1／多項。
- 真實 Pagefind 瀏覽器查詢須在公開文章存在時命中測試 token、移除最後一篇後零命中，不只比對 JSON。
- `verify-student-pack.mjs`：解壓既有 ZIP，使用包內主匯出器跑全部 25 款，核對 Guide／ZIP manifest；FULL 模式保留 knowledge／helper 完整安裝與 Build。
- `verify-art-direction-export.mjs`：涵蓋原兩款獨立、安全網址、子路徑、草稿、Pattern 及可攜 ZIP 回歸。

四尺寸為 1440／1280／768／390。截圖與 CI 的精確 SHA、逐款狀態、未完成事項記在 PR46 整合交接及 PR 說明；新增十三款未獲最終視覺核可前不得改 Ready。

## 選用的內容區段

新增十三款可組裝非 footer Patterns；須先補真實 content 與明確插槽，依 [SECTION-PATTERNS.md](./SECTION-PATTERNS.md) 操作。規劃器單純選取 Pattern 不代表內容已備妥。
