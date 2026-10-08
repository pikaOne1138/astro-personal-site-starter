# Astro Blocks · V2

這是給 Astro 架站工作坊使用的可重用元件庫，**不是拖曳編輯器**。AI 應從 `src/components/blocks/` 引入元件，在 Astro 頁面裡自由組合。展示站：`/blocks/`。

## 版本邊界
- V1：23 個核心元件（共用 4、Hero 3、內容 4、部落格 6、助人者 6），可自由組裝
- V1.5：四套配色（paper / morning / studio / botanical）、多版型（3 種 Hero、2/3 欄特色、左右反轉）、簡約 hover/reveal 動畫、RWD、reduced motion
- V2 已加入：文章 metadata 搜尋、標籤雲、月份列表、文章日曆、輪播與進階文章元件；完整文章內文全文檢索尚未實作
- V3 未納入：AI 自動選元件的搜尋/推薦引擎；V1.5 僅提供供 AI 閱讀的 registry 和簡單組裝指引

## 元件展示分類原則

公開 `/blocks/` 以使用情境分類，而非開發版本：導覽與共用、首頁主視覺、內容呈現、文章探索與清單、文章閱讀與排版、服務與信任、完整範例。`SiteSearchDialog` 屬於導覽與共用；`ArticleSearch`、`TagCloud`、`ArchiveMonths`、`PostCalendar` 屬於文章探索；`TableOfContents`、`AuthorBox` 與文章排版元件屬於文章閱讀。元件版本只保留在 registry、文件或註解。

## 元件名錄
- **common**：`Button`、`SectionHeading`、`SiteHeader`、`SiteFooter`
- **hero**：`HeroSplit`、`HeroCentered`、`HeroImage`
- **content**：`ImageText`、`FeatureGrid`、`Stats`、`CTASection`
- **blog**：`PostCard`、`PostGrid`、`FeaturedPost`、`CategoryLinks`、`TableOfContents`、`AuthorBox`
- **professional**：`ServiceCard`、`AboutProfile`、`ProcessSteps`、`Testimonial`、`FAQ`、`ContactSection`

## 設計權威與共用規範
- 元件介面以本文件、元件索引與 `src/components/blocks/*.astro` 實作為準。
- 設計規格請參考 `.ai/astro-ui-craft/SKILL.md` 與 `.ai/astro-ui-craft/references/component-library-v1.5.md`；不得任意新增不在既有字級與間距系統中的數值。

## V2：文章探索（4 個）、進階文章（7 個）與全站搜尋（1 個）

- 文章探索：`ArticleSearch`、`TagCloud`、`ArchiveMonths`、`PostCalendar`
- 全站搜尋：`SiteSearchDialog`，可在導覽列使用放大鏡開啟、`Ctrl+K`／`⌘K` 呼叫、`Esc` 關閉；依當前 Demo 架構索引頁面、文章、助人者服務，搜尋頁面標題／摘要／分類／關鍵詞，不等同全文檢索。
- 進階文章：`ArticleAccordion`、`ArticleList`、`ArticleGrid`、`ArticleCallout`、`ArticleComparison`、`RelatedArticles`、`ContentCarousel`
- 範例：`/explore/`，可以搜尋標題、摘要、分類、標籤，並按月份與指定日期找文章。
- 完整網站整合：`/knowledge/{theme}/explore/` 與 `/helper/{theme}/explore/`，八款 Demo 導覽列都有「找文章」，並連到該風格的文章頁；文章內文示範 Accordion／List／Grid／Callout／Comparison／Carousel／RelatedArticles。
- 統一示範資料：`src/data/articles-v2.ts`，包括 slug、標題、摘要、分類、標籤、發文日期、閱讀時間。
- 所有月份、日曆日期、標籤數量和結果頁都以相同的文章資料產生；不存在的發文日期不可點。
- V2 示範文章與日期都是教材，不代表真實發文記錄。正式網站應接 Astro Content Collections 或匯入文章資料。
- AI 設計與使用契約：`.ai/astro-ui-craft/references/article-exploration-v2.md`。

## AI 組裝規範
1. 先看 `src/data/blocks.registry.json`，挑選用途相符的元件，再讀元件 `Props`。
2. 保留原本六個 Demo 路徑，並維護新增加的兩個植感 Demo 路徑（共八個）。第四套配色新增為 `knowledge/botanical/` 與 `helper/botanical/`。
3. 用現有 Astro Props 傳入資料；元件本身不包含 CMS、會員、資料庫、金流或真正的預約系統。
4. `PostGrid` 接收 `posts`；`FeatureGrid`、`Stats`、`ProcessSteps`、`FAQ` 接收 `items`。
5. `HeroSplit`、`ImageText` 使用 `reversed` 切換左右；`FeatureGrid` 使用 `columns={2}` 或 `columns={3}`。
6. 必須提供真實的連結和內容；展示用 `#` 連結以及示例見證不能作為正式內容發布。
7. 頁面讀取 `public/demo.css` 與 `public/blocks.css`；在 `<html data-theme="paper">` 切換配色。
8. 維持無障礙、手機版以及 `prefers-reduced-motion`。完成後必須執行 `npm run build`。

## 使用範例

```astro
---
import HeroSplit from '../components/blocks/HeroSplit.astro';
import ServiceCard from '../components/blocks/ServiceCard.astro';
import FAQ from '../components/blocks/FAQ.astro';
---
<HeroSplit
  title="讓專業被清楚看見"
  description="以溫柔而清楚的方式，介紹你提供的服務"
  action="了解服務"
  href="#services"
/>
<section id="services">
  <ServiceCard title="一對一服務" description="在安全的空間探索目前的需求。" href="#contact" />
</section>
<FAQ items={[{question:"如何開始？", answer:"可以先填寫聯絡表單。"}]} />
```

## 網站範例
- 知識／部落格：`/knowledge/{theme}/`
- 助人者／專業服務：`/helper/{theme}/`

兩種架構各有四種配色，共八個網址，沿用原有 Demo 的共用架構；展示站元件可逐步引入新的自訂頁面。

## 真正可使用的導覽、媒體與服務資訊元件

| 元件 | 用途與必要設定 |
|---|---|
| `MobileMenu` | 手機展開選單，`links:[{label,href}]`；Escape 關閉並返回焦點 |
| `BookingLink` | 外部排程 `href` 或支援 HTTPS 的 `embedUrl`；未設定時不假裝能預約 |
| `ContactActions` | 選配 `email`、`phone`、`lineUrl`；會略過無效網址 |
| `PricingDetails` | `items:[{name,price?,duration?,format?,note?}]` 與免責說明 |
| `TrustInfo` | 可驗證的身分／資格／服務地區／政策／隱私；不產生假數據 |
| `SocialLinks` | `items:[{platform,href,label?}]`；支援社群品牌圖示與 email／phone／website／RSS。`showLabels` 顯示文字，`previewPlatforms` 只顯示不可點擊圖示樣板；空網址不輸出連結。外部品牌圖示使用 Simple Icons v16（固定版本 CDN，需留意商標與個別授權）。 |
| `MediaEmbed` | `type:'youtube'|'audio'|'podcast'`、`url`、`title`、`caption`；YouTube/音訊直接嵌入、未支援 Podcast 提供外部連結 |

六個元件已依用途列入 `/blocks/`；最新 Registry 為 42 個。請在紙墨／晨光／靜室／植感、375/390px 手機尺寸與鍵盤操作下逐一驗收。

### 精緻導覽列（Header SocialLinks）

`SiteNav.astro` 已組合 `SiteSearchDialog`、細線分隔符、`SocialLinks`。`socialLinks` props 可以自訂平台與網址；預設 Demo 使用可查證的 GitHub 專案與展示網站，避免虛構個人 IG／YouTube。桌面視窗顯示小圖示，窄屏時收起社群列，保留手機導覽與搜尋。社群圖示使用 SVG mask 跟隨各 Theme 的前景色與 hover accent；不加上彩色社群方塊，也不使用假連結。可設定空陣列 `socialLinks={[]}` 完全隱藏。

手機導覽列的 `MobileMenu` 會接收相同 `socialLinks`，在彈出選單主連結後、分隔線下展示可點擊社群圖示，桌面版仍顯示在搜尋旁。兩端共用資料，不應維護兩份不同帳號設定。


## 本批新增元件（內部開發里程碑）

Breadcrumbs、ArticleNavigation、ArticleShare、ReadingProgress。

文章頁 Breadcrumbs、上一篇／下一篇、LINE／Facebook／Email／剪貼簿分享、實際文章區域的閱讀進度。不能將 SocialLinks 當成文章分享。

元件登錄至 `src/data/blocks.registry.json`（此 PR 分支共 46 個），在 `/blocks/` 依**功能與使用場景**展示，並接入八款 Demo 共用的實際頁面。請務必執行 GitHub PR Preview 驗收（手機 375／390px、鍵盤、連結與未設定狀態）。

## ResourceCard、ResourceLibrary、LeadMagnetCard、NewsletterSignup
可設定真實資源網址；沒有電子報服務不得假裝表單已成功送出。
皆已在 /blocks/ 功能分類展示、同步 registry，並接入 Demo 站。須以 GitHub PR Preview 測試手機與鍵盤。

## PractitionerCard、ServiceFit
讓專業者呈現服務資格、地區、合作方式與適合度；不虛構證照、資格、見證或危機資訊。
皆已在 /blocks/ 功能分類展示、同步 registry，並接入 Demo 站。須以 GitHub PR Preview 測試手機與鍵盤。


### 助人者四種示範內容（與主題解耦）

`src/data/helper-content.ts` 定義 `helperPractice[theme]` 示範資料：paper 身體工作、morning 諮商心理、studio 教練、botanical 靈氣。各自有首頁定位、專業服務卡、三步驟流程、FAQ、服務適配與界線、預約文案。元件依 Props 自由引用，不應把這四種專業固化成只能用某個設計主題。所有名稱、資格、費用、實際治療與預約需由網站持有人核實與設定。


## ArticleViewSwitcher：文章列表／卡片／網格

`ArticleViewSwitcher.astro` 是可重複使用的文章索引元件（本分支 Registry 53 個）。必填 `items`、`articleBase`；選配 `exploreBase`、`defaultView='list'|'cards'|'grid'`、`controls`、`filterable`。列表為細線編輯式清單；卡片為寬鬆兩欄；網格為三欄密集索引。三種共享同樣資料與文章 URL，手機降為單欄；搜尋／標籤／日期篩選在 explore 頁以 `data-article` 作用於同一組文章，切換排版不破壞篩選。頁面 JS 僅控制展開的視覺模式，不讀取後端。元件展示在 /blocks/ 的「文章探索與清單」。

導航列在手機寬度僅呈現漢堡圖示與全站搜尋放大鏡（含可存取名稱），「文章」作為主要導覽項目；進階篩選另列「文章探索」。原本額外的「找文章」文字控制已移除，CTA 留在手機選單內；社群連結保留於彈出選單最下方。
