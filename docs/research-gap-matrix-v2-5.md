# 跨 AI 研究 × Astro 35 元件缺口矩陣
> 2026-10-08｜規劃文件；**不是功能已完成的聲明**。公開網站不顯示 V1.5／V2／V2.5 字樣。

## 1. 範圍與資料可信度

比較基礎：
1. **現有程式事實**：`src/data/blocks.registry.json`，截至 PR #8 merge 共有 **35 個已登錄元件**；登錄不代表功能全面驗收。
2. **Arena Agent**：40 案例與 Pattern/Design Brief（`arenaAgent-04`、`05`、`06`），對導航、文章、CTA、助人者結構有較完整分類。
3. **Manus**：30 站研究，明言**沒有另行瀏覽驗證**，其結論建立在所收到的 30 站核查材料；不能把建議數值當作經獨立實測的原站數值。
4. **Claude、Gemini、Grok、Mistral、Perplexity、Tenbin 等其他報告**：用於交叉觀察主題是否重複出現；**重複提及不是獨立驗證**，尤其不同報告可能共享候選來源或研究框架。
5. 目前**尚未**對全部候選元件做逐頁 DOM、鍵盤與 375/390px 對照實測；QA 欄是待驗收條件，而非已通過。

研究原檔：專案提供的 `manus-AstroTmplateResearch.md`、`arenaAgent-04_Pattern分析_導航與首頁.md`、`arenaAgent-05_Pattern分析_CSS動畫CTA文章頁.md`、`arenaAgent-06_模板DesignBrief與融合建議.md`、`Claude-AstroTmplateResearch.md` 等。來源網址、個案不確定性以各研究原文為準。

## 2. 已有 35 個元件：能力與缺口（不能只看名稱）

| 目前能力 | 已有元件／實作 | 狀態 | 缺口與處置 |
|---|---|---|---|
| 網站導覽 | `SiteHeader`、`SiteFooter`、實站 `SiteNav` | **不完整** | 手機隱藏桌面文字鏈，目前未提供完整可用展開選單；優先補 MobileMenu |
| 全站快速搜尋 | `SiteSearchDialog` | **基礎可用／待驗證** | 目前是頁面、文章、服務 metadata 索引；不是內文全文搜尋；測 Ctrl/⌘K、Esc、焦點還原、搜尋正確性 |
| 文章探索 | `ArticleSearch`、`TagCloud`、`ArchiveMonths`、`PostCalendar` | **基礎可用／待驗證** | 依同一份示範文章 metadata 尋找；實際內容來源仍是 fixtures，需 Content Collections |
| 文章清單 | `PostCard`、`PostGrid`、`FeaturedPost`、`CategoryLinks` | **已有展示** | 缺真正的「分頁」、無圖版 editorial row、文章集合／專題資料化 |
| 閱讀排版 | `TableOfContents`、`AuthorBox`、`ArticleList`、`ArticleAccordion`、`ArticleGrid`、`ArticleCallout`、`ArticleComparison` | **已有基礎元件** | TOC 需驗證真實 heading 錨點；缺上一篇／下一篇、分享、可選閱讀進度、圖說／程式碼／註腳類型 |
| 延伸內容 | `RelatedArticles`、`ContentCarousel` | **已有** | 必須是真實 URL；輪播檢查按鈕、觸控與 reduced-motion |
| 首頁與共用區塊 | `Button`、`SectionHeading`、`HeroSplit`、`HeroCentered`、`HeroImage`、`ImageText`、`FeatureGrid`、`Stats`、`CTASection` | **已有** | 不是所有網站都應塞滿卡片／統計；缺免程式配置的「首頁區塊順序規格」 |
| 助人者服務信任 | `ServiceCard`、`AboutProfile`、`ProcessSteps`、`Testimonial`、`FAQ`、`ContactSection` | **展示層已有** | 服務費用與時長、資格資訊、聯絡入口與外部預約流程未完整資料化；示範表單不可誤稱可提交 |
| 頁面工程底座 | `site-map.ts`／靜態 Astro 路由 | **部分** | Content Collections、RSS、sitemap、OG、404、內容封面／圖片信用、基本 SEO 驗收須另列 |
| 四套視覺與 RWD | paper/morning/studio/botanical | **已有** | 新元件要逐一做手機、對比、焦點與字級檢查；不另造未核准 tokens |

**判讀原則**：「元件存在」≠「網站功能完成」；「第三方外連存在」≠「預約、訂閱、表單已成功串接」。

## 3. 缺口優先級：研究交叉證據 × 教學價值

研究證據欄採來源群組，不把相似報告當成獨立驗證。優先級是**本專案設計決策**，不是研究原文給的量化排名。

| 候選 | 證據依據（案例／模式） | 現狀 | 優先級 | V2.5 驗收完成定義 |
|---|---|---|---|---|
| **MobileMenu** | Arena 導覽 Pattern 04 §導航；Manus §3.1、§4.1/4.2；Claude／Tenbin 亦列漢堡 | 缺真實可操作 mobile drawer | **P0** | 375/390px 可開、關、跟隨真實路由；Esc／焦點移動／返回焦點／遮罩；無被卡住或透字 |
| **BookingLink / BookingEmbed** | Manus Beachy/Colette/Orka、§4.2；Arena 06 模板 B；跨研究預約反覆出現 | 假按鈕／示範入口多 | **P0** | 外部 Google Form／Cal.com／Tally **明示外開或嵌入**；未配置時只顯示說明，不冒充可預約 |
| **ContactActions** | Arena B 模板 LINE＋電話；Manus §4.2 聯絡分流；台灣工作坊需求 | `ContactSection` 偏展示 | **P0** | `mailto:`、`tel:`、LINE URL 均可設定及操作；沒有資料時隱藏，不留 # 假鏈結 |
| **PricingDetails** | Manus Jenani/Holistic/Orka；Arena B §服務頁 | `ServiceCard` 不等於費用說明 | **P0** | 可顯示費用、計價單位、時長、形式與備註；未知值不填；不呈現虛構服務價格 |
| **Breadcrumbs + PostNavigation** | Manus §3.6、§4.1；Arena 06 模板 A 文章規格 | 有返回列表連結，但非通用元件 | **P1** | 各層連到存在的頁；有上／下篇；第一／最後一篇邊界處理；保留 Astro BASE_URL |
| **NewsletterSignup** | Manus James Clear/Benedict/ONE、§4.1；Arena A 06；Claude/Mistral | 現有假表單及 CTA 示範 | **P1** | 外部可用訂閱服務或明確外連；成功／錯誤狀態由服務提供；未配置時不顯示假送出 |
| **CredentialList / ProfessionalProfile** | Manus Orka/Beachfront/Wyatt；Arena B 06 | `AboutProfile` 偏故事，無標準資格欄 | **P1** | 可放姓名、專長、專業資格／有效地區、工作方式與真實證照；不承諾療效 |
| **ServiceFit / ServiceFacts** | Manus §3.2／§4.2 適配、費用、遠距；Arena B 服務詳頁 | 部分敘述散落在頁面 | **P1** | 清楚區隔適合／不適合、線上／實體、費用與流程；不以空見證補位 |
| **MediaEmbed** | Manus PanSci/ONE/Deem、§4.1；Arena 媒體元件模式 | 無共用安全影音嵌入 | **P1** | YouTube no-cookie／外部影片清楚標示、比例 RWD、lazy loading、可存取標題 |
| **ShareBar** | Manus A Cup of Jo／PanSci、§3.6；Arena 文章頁 | 無可用分享元件 | **P1** | 複製網址後有成功提示；社群分享使用正確 URL 編碼，鍵盤可達 |
| **TopicCollection / Pagination** | Manus PanSci／StackBlitz；Arena A Content Collections／主題頁 | 類別資料模型仍示範化 | **P1/基礎設施** | 真實分類 slug 頁、分頁導航與 404；大量文章無須一次全載 |
| **ReadingProgress / SeriesNavigation** | Manus §3.6；Arena 05、06 文章頁 | 缺通用元件 | **P2** | 進度依文章內容計算、無跳動；系列文可上下導覽，只有相關內容才出現 |
| **ImageGallery + Caption / PullQuote** | Manus Meiwen/Deem、文章圖說；Arena 視覺研究 | `HeroImage` 非圖文內容圖庫 | **P2** | 圖片有 alt、caption、credit，RWD 比例合理；燈箱為進階選配 |
| **TherapistFilter / MiniMatchQuiz** | Manus Orka，Arena Mel Noakes | 單人網站暫不需要 | **P3／延後** | 只有多專業者／真實媒合需求才做；不採集敏感個資 |
| **評論、會員／金流、假即時預約** | Manus §4 不建議；Arena 明確排除 | 不應納入基本工作坊 | **不做** | 一律用可替換外部系統，不自建需要管理後端的服務 |

## 4. 建議 V2.5 實作範圍（**限 8 組，不盲目膨脹**）

**第一批四組（P0）**：`MobileMenu`、`BookingLink/Embed`、`ContactActions`、`PricingDetails`。優先解決目前 Demo 中明顯無法使用的「導覽、預約、聯絡、費用」。

**第二批四組（P1）**：`Breadcrumbs + PostNavigation`、`NewsletterSignup`、`ProfessionalProfile/CredentialList`、`ShareBar`。若時間不足，先用真實功能的四組完成驗收，不為衝元件數量硬加。

其餘 `MediaEmbed`、`TopicCollection/Pagination` 列下一輪；`ReadingProgress`、`ImageGallery` 可選。新增元件請同步 registry、`COMPONENTS.md`、Skill 的 `references`、元件庫展示，以及兩類實站真正能操作的 demo。

## 5. 工程底座是 V2.8，不只是「元件數」

- **Content Collections**：以正式文章內容取代 `articles-v2.ts` 六篇 fixture；欄位 `slug/title/description/publishedAt/updatedAt/category/tags/author/cover/alt`；保留 WordPress slug/permalink。
- **SEO 與發現性**：sitemap.xml、RSS、canonical URL、OG/meta、404、robots；文字文章可被搜尋引擎索引；圖片有 alt／壓縮／尺寸。
- **完整搜尋界線**：現有 SiteSearchDialog 與 ArticleSearch 是 metadata 搜尋。若要「全文搜尋」另外做 Astro build-time 索引，如 Pagefind，**不要用現有名稱對學員誤稱全文**。
- **外部串接**：報名／訂閱／預約需指向配置的服務；不要預設收敏感資料或假裝內建後端。
- **內容工作流**：GitHub PR Preview → 學員確認 → 合併部署；每個示範 URL 必須可實際訪問。

## 6. V3 啟動門檻（不是先做一個聊天機器人）

只有在以下條件通過後才做 AI 自動組裝：
1. 兩種網站各有一套**從零到發布、手機可用**的完整實例。
2. 元件 registry 對每個元件記載適用場景、必填 props、預設值、依賴、禁忌與實際 Demo URL。
3. V2.5 新增元件的功能都有真實操作，沒有假表單與死鏈。
4. 文章與服務有正式內容 schema，AI 生成頁面不依賴寫死範例資料。
5. 自動組裝只輸出 GitHub PR，**不自動合併**；可回退、可預覽、可用簡單指令換風格／調區塊。

**最小 V3 流程**：使用者選網站類型 → 填 6–8 個必要問題 → AI 根據 Skill/registry 選區塊 → 產生 Astro 頁面與內容 → PR Preview → 人工確認。避免額外建立 SaaS 後台、會員、資料庫或金流。

## 7. 研究衝突與不可照抄項目

- Manus／Arena 對建議 tokens 有不同數值與視覺方向；**不直接覆蓋專案既有四套 theme**，修改字級或間距須先經設計規範確認。
- Arena 有些敘述以「全部案例」「閉眼選它」表達共識；這是其案例歸納，不是所有網站的普遍法則。
- Manus 指明部份 FAQ／表單／預約頁為 placeholder 或未核實；**不能照搬成可用功能**。
- 助人者案例的證照、費用、療效、個資與緊急求助資訊需依實際專業與所在地驗證；不要照貼美國 911／988 到台灣站，亦不要把台灣號碼寫成所有助人者通用。
- 研究案例本身的圖片、商業字體、品牌字樣與原文需尊重授權。

## 8. 下一個 PR 的驗收清單

- [ ] PR 的範圍先限 MobileMenu、BookingLink/Embed、ContactActions、PricingDetails 四組
- [ ] 每組在 `/blocks/` 可找到**依功能分類**的展示
- [ ] 兩類實站都有真實入口，至少紙墨知識＋植感助人者做完整手機驗收
- [ ] 手機 375/390px 選單不遮內容，背景不透字，焦點與 Esc 正常
- [ ] 外部表單／LINE／電話提供明確網址配置與空值退場策略
- [ ] 延續既有 theme tokens、`prefers-reduced-motion`、BASE_URL
- [ ] 檢查 `npm run build` 與 GitHub Pages PR Preview Live URL
- [ ] 更新 `AGENTS.md`／`SKILL.md`／`references`、registry、`COMPONENTS.md`
- [ ] **經使用者預覽確認才合併**
