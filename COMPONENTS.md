# Astro Blocks · V2

這是給 Astro 架站工作坊使用的可重用元件庫，**不是拖曳編輯器**。AI 應從 `src/components/blocks/` 引入元件，在 Astro 頁面裡自由組合。展示站：`/blocks/`。

## 版本邊界
- V1：23 個核心元件（共用 4、Hero 3、內容 4、部落格 6、助人者 6），可自由組裝
- V1.5：四套配色（paper / morning / studio / botanical）、多版型（3 種 Hero、2/3 欄特色、左右反轉）、簡約 hover/reveal 動畫、RWD、reduced motion
- V2 已加入：文章 metadata 搜尋、標籤雲、月份列表、文章日曆、輪播與進階文章元件；完整文章內文全文檢索尚未實作
- V3 未納入：AI 自動選元件的搜尋/推薦引擎；V1.5 僅提供供 AI 閱讀的 registry 和簡單組裝指引

## 元件名錄
- **common**：`Button`、`SectionHeading`、`SiteHeader`、`SiteFooter`
- **hero**：`HeroSplit`、`HeroCentered`、`HeroImage`
- **content**：`ImageText`、`FeatureGrid`、`Stats`、`CTASection`
- **blog**：`PostCard`、`PostGrid`、`FeaturedPost`、`CategoryLinks`、`TableOfContents`、`AuthorBox`
- **professional**：`ServiceCard`、`AboutProfile`、`ProcessSteps`、`Testimonial`、`FAQ`、`ContactSection`

## 設計權威與共用規範
- 元件介面以本文件、元件索引與 `src/components/blocks/*.astro` 實作為準。
- 設計規格請參考 `.ai/astro-ui-craft/SKILL.md` 與 `.ai/astro-ui-craft/references/component-library-v1.5.md`；不得任意新增不在既有字級與間距系統中的數值。

## V2：文章探索（4 個）與進階文章（7 個）

- 文章探索：`ArticleSearch`、`TagCloud`、`ArchiveMonths`、`PostCalendar`
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
