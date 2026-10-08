# Manus Component Kit × 現有 Astro 元件庫｜V2.5 第二批決策矩陣

> 2026-10-08。資料來源：使用者上傳的 `manusCR-astro-component-kit.zip`（69 個 ZIP entries，44 個 `.astro` component files）、`manusCR-README.md`、`manusCR-COMPONENT_CATALOG.md`；對照本專案 `main` 的 `src/data/blocks.registry.json`（42 元件）。此外參考原始跨 AI 研究。**此文件是比對／工作規格，不代表 Manus Demo 站已通過瀏覽器驗收。**

## 1. 對照原則

- 按**功能而非名稱**比較：一個 Manus 元件不代表必須新建同名元件。本專案現有元件與 Props、預覽／真實功能也要分別檢視。
- 既有 42 元件與 Manus 44 元件有大量重疊，**42 + 44 ≠ 86**。第二批不要把 ZIP 覆蓋到 `src/components/blocks/`。
- Manus 套件 `package.json` 為其自有 Astro 工程；本專案 `package.json` 現為 Astro `^5.14.0`，README 寫 Manus 套件採 Astro 7，**不可直接把 Manus 鎖檔、CSS tokens、路由或 build config 原樣搬入**。用本專案現有 Theme tokens／BASE_URL、元件庫分類、Skill／Registry 與預覽程序重新整合。
- 原始 Manus README 明說 NewsletterForm／ContactForm **未串接後端**、AppointmentCTA 只是可配置 URL、推薦／報價／資格有示範假資料。**不得把 UI 當真實可提交／預約**。
- Manus 線上展示 URL `https://4321-iehycayw8pnqmtvzl96yh-b21de12f.sg2.manus.computer/`：本次外部讀取未能取得頁面內容（cache miss）。視覺與 RWD 仍需以可訪問瀏覽器實測，不能將 ZIP CSS 與展示文案視為視覺驗收完成。

## 2. 全部 44 個 Manus 元件分類（依 ZIP 原始檔案核對）

狀態定義：「已有」= 有同任務元件，不宣稱完全等效；「升級」= 已有相關功能但 Manus props/閱讀 UX 值得吸收；「新增」= 缺獨立組件／資料契約；「延後」= 不屬零基礎架站核心任務。

### A. 共用 11 個

| Manus 元件 | 我們的對應 | 建議 |
|---|---|---|
| SiteHeader | SiteHeader / SiteNav + MobileMenu + SiteSearchDialog | **已有**；本專案已整合社群圖示、手機導覽 |
| SplitHero | HeroSplit | **已有**；優化圖文比與 CTA 不需另造 |
| Button | Button | **已有** |
| SectionHeading | SectionHeading | **已有** |
| TrustStrip | TrustInfo / PricingDetails / Stats | **升級**：獨立精簡的服務「狀態帶／事實帶」，共享 TrustInfo 資料；不與 TrustInfo 重複造一套真相 |
| FAQAccordion | FAQ / ArticleAccordion | **已有**；檢查原生 details 與焦點 |
| CtaBand | CTASection | **已有** |
| NewsletterForm | 尚無可提交的 NewsletterSignup | **新增（P1）**：使用外部真實訂閱或明確未設定狀態，不能沿用 Manus `#demo` 表單 |
| SearchForm | ArticleSearch / SiteSearchDialog | **已有**，現行是 metadata 搜尋；不誤稱全文搜尋 |
| SocialLinks | SocialLinks（圖示版）/ ContactActions | **已有**；本專案現有圖示功能更完整 |
| SiteFooter | SiteFooter + Demo footers | **已有**；可完善社群／RSS／法務入口 |

### B. 知識／部落格 19 個

| Manus 元件 | 我們的對應 | 建議 |
|---|---|---|
| PostCard | PostCard | **已有** |
| PostGrid | PostGrid | **已有** |
| CategoryPills | CategoryLinks / TagCloud | **已有**；分類與標籤勿混為同一 URL |
| Pagination | 有示範索引，無可重用分頁元件 | **新增（V2.8 資料路由）**：需真實靜態分頁，不只外觀 |
| ArticleHeader | Demo article header, 尚無完整共享 block | **升級（P1）**：Breadcrumbs、H1、分類與日期組合可共用 |
| ArticleMeta | 文章 header/作者欄，無統一完整 schema | **升級（P1）**：發布／更新日期、作者、閱讀時間等採同資料契約 |
| ArticleBody | Demo article prose / ArticleCallout 等 | **升級（P1）**：窄閱讀欄、圖說、表格、code、blockquote 與 MDX CSS；不另複製 Manus 整套 CSS |
| TableOfContents | TableOfContents | **升級（P1）**：黏性、實際 heading IDs、手機降級，不重建同名 |
| ReadingProgress | 無 | **新增（P1）**：輕量長文進度、特定文章範圍、reduced-motion |
| AuthorCard | AuthorBox | **已有**；需要時增作者 slug/href |
| RelatedPosts | RelatedArticles | **已有** |
| ArticleNavigation | 現有零散上一篇／下一篇連結 | **新增/抽共用（P1）**：與 Breadcrumbs 協作，處理第一／最後一篇 |
| NewsletterArchive | ArchiveMonths（文章），非電子報期數 | **新增（P2 選配）**：有連續發刊內容才採用 |
| MediaCard | MediaEmbed（播放器），無統一媒體資源卡 | **新增（P1）**：影片、Podcast、書籍、PDF、工具的索引卡 |
| MediaGrid | FeatureGrid / ContentCarousel（不同語意） | **新增（P1）**：與 MediaCard 共用資料，形成 ResourceLibrary，不只是另一個一般 Grid |
| Callout | ArticleCallout | **已有**；保持編輯式細線，不恢復 AI 灰底卡 |
| ShareLinks | SocialLinks（帳號入口），非分享當前文章 | **新增（P1）**：Facebook/LINE/Email/複製當前網址，不能用 SocialLinks 代替 |
| CommentThread | 無留言後端／審核系統 | **延後（P3）**：若要實際留言須第三方與個資／審核規則 |
| LeadMagnetCard | CTASection / 資源頁示範 | **新增／升級（P1）**：可下載指南／免費工作單，必須真實資源連結 |

### C. 專業服務 10 個

| Manus 元件 | 我們的對應 | 建議 |
|---|---|---|
| ServiceCard | ServiceCard | **已有** |
| ServiceGrid | ServiceCard + FeatureGrid / service listing | **已有／升級**：只需補共用排列選項 |
| PractitionerCard | AboutProfile + TrustInfo（未整合專業者卡） | **新增（P1）**：姓名、職稱、已確認資格、地區、聯絡／詳細頁；不捏造可預約狀態 |
| FitChecklist | 無獨立適配區塊 | **新增（P1）**：適合／不適合、界線，對助人者很重要 |
| PricingList | PricingDetails | **已有**；可借其清單語意、非虛構費用 |
| TestimonialCard | Testimonial | **已有**；保持真實授權與來源 |
| TestimonialGrid | 多個 Testimonial | **已有／升級**；不為卡數新增重複 API |
| ProofStats | Stats + TrustInfo | **升級（P2）**：**可驗證來源 URL**與資料有效期；未驗證不填 |
| AppointmentCTA | BookingLink | **已有**；外部連結真可用，未設定明示 |
| ContactForm | ContactActions + BookingLink（非表單） | **不直接搬**：Manus 原始表單未連後端；若需一般諮詢表單，做外部 Google Form/Tally/安全服務的連結／嵌入；高敏感資料不進示範表單 |

### D. 微互動 4 個

| Manus 元件 | 我們的對應 | 建議 |
|---|---|---|
| Reveal | DemoLayout `data-reveal` / IntersectionObserver | **已有，改善工程品質**：多頁共用、no-JS 內容可見、reduced-motion |
| MotionCard | PostCard 等 hover 卡片 | **已有／選配**：不要每張卡都上浮 |
| ZoomImage | 既有圖片微互動、尚無獨立圖片包裝 | **可選 P2**：先保證 alt、固定比例／授權，再加 hover 效果 |
| UnderlineLink | 既有文字連結與 hover | **已有／升級**：風格一致、focus-visible，沒有必要增加無意義元件數 |

## 3. 第一批 vs 第二批：不遺漏原本的 V2.5 規劃

### 已完成的第一批（需持續 QA）

`MobileMenu`、`BookingLink`、`ContactActions`、`PricingDetails`、`TrustInfo`、`MediaEmbed`；另 `SocialLinks` 由 PR #11 合併。**登錄元件不等於真實整合全面驗收**。

### V2.5 第二批：依功能分成 3 個可分開驗收的 PR

**PR-A｜長文閱讀與分享（優先）**
1. `ArticleNavigation`（真正上一篇／下一篇 + 有效路由）
2. `Breadcrumbs`（首頁→主題／列表→文章）
3. `ArticleShare`（文章分享：Facebook、LINE、Email、複製網址，成功／失敗提示）
4. `ReadingProgress`（指定文章，手機／桌面皆適用）
5. **強化既有** `TableOfContents`、文章 `ArticleMeta` 與 CSS 排版，避免為名稱再建立 3 個幾乎相同元件。

**PR-B｜資源、影音與訂閱**
6. `ResourceCard` + `ResourceLibrary`（Manus `MediaCard/MediaGrid` 融合；影片、音訊、書、PDF、外連資源，共用資料 schema）
7. `LeadMagnetCard`（可配置下載與外部收件入口）
8. `NewsletterSignup`（**真實第三方串接或只有外部連結**，未配置不能提交）。
9. 有實際期刊／週刊資料才做 `NewsletterArchive`，不要硬加 Demo 假期數。

**PR-C｜助人者專業適配與信任**
10. `PractitionerCard`（單人／團隊，資格／服務範圍／地區／照片）
11. `ServiceFit`（Manus `FitChecklist`；適合／不適合／重要提醒）
12. **強化既有** `TrustInfo`、`PricingDetails`、`BookingLink`（共享真實資料契約、不造第二套證照與費用）
13. **選配** `ProofStats`（僅證據真實且有來源時才展示）

**V2.8／內容底座（承接而非遺忘）：** `Pagination` + `TopicCollection` + Astro Content Collections/MDX、文章分類與作者 slug、RSS、sitemap、SEO/OG、404、WordPress permalink/slug 遷移方案；研究案例中的 `SeriesNavigation` 與 `ImageGallery` 同樣保留在擴充池，不因 Manus 未做而移除。

## 4. 可驗收交付標準

1. 元件以現有 `src/components/blocks/` 實作；全部加入 registry、`/blocks/` 功能分類展示、`COMPONENTS.md`、`AGENTS.md` 與 `.ai/astro-ui-craft/` Skill。
2. 知識／助人者兩類網站各至少一個**完整可操作**內容範例；四個 theme 需確認 CSS 不互相污染，375px／390px 手機不得溢位。
3. `ArticleShare` 操作真實當頁網址，含 GitHub Pages `BASE_URL`；不混淆 `SocialLinks` 社群帳號連結與「分享這篇文章」。
4. `ArticleNavigation`／`Breadcrumbs`／`ResourceLibrary` 的連結都必須能開啟有效靜態頁或可確認外部 URL。
5. `NewsletterSignup`、聯絡／預約無後端不顯示假成功，若僅為 UI 展示需明顯註記。
6. 不直接採用 Manus 展示中的虛構推薦、報價、資格、媒體 logo；示範資料以「示範」標示，真實站應由網站主填入。
7. 視覺保持 editorial、能區分文章卡與服務卡；動畫僅作層級輔助，不強制覆蓋既有四套 theme tokens；支援鍵盤與 reduced-motion。
8. GitHub Actions PR Preview 成功 + 瀏覽器功能驗收後才請使用者決定是否合併。

## 5. Manus 原始碼值得學，但不該照搬的實例

- `blog/ReadingProgress.astro`：使用 passive scroll + `requestAnimationFrame`；值得借其效能思路，但其進度計算 `target.scrollHeight - window.innerHeight` 在小文章與長頁上下文需測試，不能保證所有版型正確。
- `blog/ShareLinks.astro`：有社群分享與 clipboard feedback；我們應補 LINE 與 clipboard 失敗 fallback，並使用每頁正確的 URL。
- `blog/Pagination.astro`：生成 `/page/N/`，但不自動建立對應的 Astro 靜態路由；應隨 Content Collections 實作，否則只有死連結。
- `services/FitChecklist.astro`：Props 乾淨，適合參考；文字要符合台灣助人者語境與專業服務界線。
- `common/NewsletterForm.astro` 與 `services/ContactForm.astro`：預設 demo 模式，**不能照搬成可提交成功的正式表單**。
- `effects/Reveal.astro`：小幅淡入與 reduced-motion 方向可借；我們已有 global reveal，無必要為每個 animation 再加包裝。
- Manus README 所稱 44 個可匯入元件屬檔案層級，不代表其所有頁面路由、內容來源或第三方功能已完成。

## 6. 本次研究交付狀態

本文件只新增比對與落地排序；**沒有把 ZIP 直接寫進正式站、沒有新增新元件、沒有自行合併實作 PR**。若開始 PR-A／PR-B／PR-C，須各自從 `main` 建立實作分支，保留獨立 Preview 與驗收。
