# Astro Blocks 元件庫

給 Astro 架站工作坊使用的可重用元件庫，**不是拖曳編輯器**。AI 從 `src/components/blocks/` 引入元件，在 Astro 頁面裡組合。展示站：`/blocks/`。

## 事實來源

- **有哪些元件、屬於哪一類、適用哪些主題**：`src/data/blocks.registry.json`（`id`、`name`、`category`、`path`、`keywords`、`compatibleWith`、`themes`）。**數量與清單請讀 registry，不要在文件裡寫死。**
- **元件介面（Props）**：以 `src/components/blocks/*.astro` 的實作為準。
- **設計規格**：`.ai/astro-ui-craft/SKILL.md` 與 `.ai/astro-ui-craft/references/component-library.md`；不得新增不在既有字級與間距系統中的數值。
- 公開的 `/blocks/` 以使用情境分類（導覽與共用、首頁主視覺、內容呈現、文章探索與清單、文章閱讀與排版、服務與信任、完整範例），registry 的 `category` 欄是 `common`、`hero`、`content`、`blog`、`professional`、`article`。元件的版本資訊只放在 registry、註解或開發者文件，不放在這裡或對外頁面。

## 不屬於 Blocks 的東西

這些各有自己的清單，**不要加進 `blocks.registry.json`，也不要和 Blocks 混著計數**。

| 是什麼 | 在哪裡 |
|---|---|
| 特效（Reveal、Stagger、Tilt 等動效元件） | `/effects/`、`src/components/effects/`、`src/data/effects.registry.json`；規則見 `.ai/astro-motion-craft/SKILL.md` |
| 區段樣板（由多個 Block 組成的區段） | `/section-patterns/`、`src/data/section-patterns.registry.json` |
| 首頁版型（結構不同的首頁原型） | `/layouts/`、`src/data/layout-directions.json` |
| 編輯式構圖配方 | `/layouts/recipes/`、`src/components/editorial-recipes/`；脈絡見 `.ai/astro-editorial-layout-design/` |

選擇順序：先挑版型與構圖（資訊結構），再挑功能 Block，最後才加動效。

## AI 組裝規範

1. 先看 `src/data/blocks.registry.json`，挑用途相符的元件，再讀元件 `Props`。
2. 用現有 Astro Props 傳入資料。元件本身不包含 CMS、會員、資料庫、金流或真正的預約系統。
3. 資料形狀：`PostGrid` 接 `posts`；`FeatureGrid`、`Stats`、`ProcessSteps`、`FAQ` 接 `items`。`HeroSplit`、`ImageText` 用 `reversed` 切換左右；`FeatureGrid` 用 `columns={2}` 或 `columns={3}`。
4. 要提供真實的連結和內容。展示用 `#` 連結與示例見證不能當正式內容發布。
5. 頁面讀取 `public/demo.css` 與 `public/blocks.css`；在 `<html data-theme="…">` 切換主題。
6. 維持無障礙、手機版與 `prefers-reduced-motion`。完成後執行 `npm run build`。
7. 學員的單一網站要改元件時，依需求修改現有元件，不要在旁邊另造近似的複本；學員明確要新增時才另開。

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

## 依賴外部資料或服務的元件

這些元件**不能假裝**服務存在：沒設定就隱藏或明示「未設定」，不輸出假連結，也不顯示成功狀態。

| 元件 | 必要設定與行為 |
|---|---|
| `MobileMenu` | `links:[{label,href}]`；Escape 關閉並返回焦點；可接收與桌面共用的 `socialLinks` |
| `BookingLink` | 外部排程 `href` 或 HTTPS 的 `embedUrl`；未設定時不假裝能預約 |
| `ContactActions` | 選配 `email`、`phone`、`lineUrl`；略過無效網址 |
| `PricingDetails` | `items:[{name,price?,duration?,format?,note?}]` 與免責說明；未知值不填 |
| `TrustInfo` | 可驗證的身分、資格、服務地區、政策、隱私；不產生假數據。危機與求助資訊要依地區與專業情境設定，不硬編號碼（不要把其他地區的緊急電話貼進來） |
| `PractitionerCard`、`ServiceFit` | 專業者的資格、地區、合作方式，以及適合／不適合與界線；不虛構證照、見證或危機資訊 |
| `SocialLinks` | `items:[{platform,href,label?}]`，支援社群平台圖示與 email／phone／website／RSS。`showLabels` 顯示文字；`previewPlatforms` 只顯示不可點的圖示樣板；空網址不輸出連結。品牌圖示來自固定版本的 Simple Icons CDN（版本寫在元件原始碼），留意商標與個別授權。**這是帳號入口，不是文章分享** |
| `MediaEmbed` | `type:'youtube'｜'audio'｜'podcast'`、`url`、`title`、`caption`；YouTube 與音訊直接嵌入，未支援的 Podcast 提供外部連結 |
| `NewsletterSignup` | `href`（外部訂閱服務，必須是 HTTPS）、選配 `title`、`description`、`frequency`、`privacyUrl`；沒有有效的 `href` 就不能顯示可訂閱的樣子或送出成功 |
| `ResourceCard`、`ResourceLibrary`、`LeadMagnetCard` | 資源網址必須是真實可設定的連結 |
| `ArticleShare` | Props `url`、`title`。分享的是**當前文章**：LINE、Facebook、Email、複製網址。`url` 必須是完整的 HTTPS 網址且含網站實際的 `BASE_URL`，否則不輸出任何分享入口；複製失敗時會顯示可手動複製的網址 |

## 文章相關元件

- `Breadcrumbs`、`ArticleNavigation`（上一篇／下一篇，要處理第一篇與最後一篇的邊界）、`ReadingProgress`（只針對實際文章區域）：連結都要指向存在的頁面。
- `ArticleViewSwitcher` 是可重用的文章索引：必填 `items`、`articleBase`；選配 `exploreBase`、`defaultView='list'｜'cards'｜'grid'`、`controls`、`filterable`、`label`。三種版面共用同一份資料與網址；手機降為單欄；搜尋、標籤、日期篩選在文章頁以 `data-article` 作用於同一組文章，切換版面不破壞篩選。
- `ArticleArchive` 是頁級組合（不另計為 Block），把 `ArticleViewSwitcher`、`ArticleSearch`、`TagCloud`、`ArchiveMonths`、`PostCalendar` 結合在文章頁；舊的 `explore/` 保留轉址。
- `ArticleSearch`、`TagCloud`、`ArchiveMonths`、`PostCalendar` 依同一份文章資料產生；不存在的發文日期不可點。示範文章與日期是教材，不代表真實發文記錄；正式網站要接 Astro Content Collections。
- `SiteSearchDialog` 在 build 後由 Pagefind 對公開靜態 HTML 建立全文索引；搜尋資源與結果網址以 `BASE_URL` 設定，所以在 PR 預覽子路徑下也要能運作。沒有建置索引時（例如 `astro dev`）要明確說明，不假裝搜尋成功。

## 導覽列與頁面共用元件

- `SiteNav.astro` 組合了 `SiteSearchDialog`、細線分隔與 `SocialLinks`。`socialLinks` props 可自訂平台與網址，設為 `[]` 可完全隱藏。預設 Demo 只放可查證的 GitHub 專案與展示網站，**不虛構個人社群帳號**。
- 手機寬度只留漢堡圖示與全站搜尋放大鏡（要有可存取的名稱），「文章」是主要導覽項目；社群連結放在彈出選單主連結之後。桌面與手機共用同一份 `socialLinks`，不要維護兩份帳號設定。
- `BackToTop.astro`：`threshold=420`、`label='返回頁首'`、`bottom='24px'`、`right='24px'`、`className`。已放進共用的 `src/layouts/DemoLayout.astro`，新的頂層 Layout 要重用它，不要在各頁複製捲動處理。遵守 `prefers-reduced-motion`，鍵盤可聚焦。

## 助人者示範內容

`src/data/helper-content.ts` 是助人者行銷與 FAQ 示範文案的唯一來源，包含身體工作、諮商心理、教練、靈氣四種各自不同的應用（首頁定位、服務卡、流程、FAQ、服務適配與界線、預約文案）。元件依 Props 引用這些資料，不要把某個專業固定綁在某個主題上。所有名稱、資格、費用、實際療程與預約都要由網站持有人核實與設定，不要重新塞回空泛的通用文案。
