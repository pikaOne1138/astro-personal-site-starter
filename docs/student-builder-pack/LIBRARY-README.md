# 元件庫（.ai/library）｜本站的備用零件架

這是跟著這個網站一起交付的備用元件庫，由產生本站的匯出器（或組站的 AI）從建站資料包整批複製進來。它是**備品架**，不是本站正在運作的程式：放在架上的元件沒有被任何頁面 import，就不會進到網站成品、不影響載入速度，也不會出現在網站上。

日後要幫本站加功能（例如輪播、常見問答、文章清單的新排法）時，先來這裡找現成的，不要先自己寫。

## 架上有什麼

| 位置 | 內容 |
|---|---|
| `components/blocks/` | 通用元件（Hero、文章卡、輪播、FAQ、表單區段等），含共用的 `safe-href.ts` |
| `components/effects/` | 動效元件（Reveal、MotionCard、MotionFAQ 等） |
| `components/patterns/` | 由多個 Block 組成的區段樣板 |
| `data/blocks.registry.json` | 元件目錄：名稱、分類、關鍵字（中英文）、相容主題 |
| `data/effects.registry.json` | 動效目錄 |
| `data/section-patterns.registry.json` | 區段樣板目錄 |
| `data.ts` | 少數元件用到的共用型別（見下方注意） |
| `styles/` | 元件需要的共用 CSS（見下方對照） |

## 怎麼找

1. 先看 `data/blocks.registry.json`：用學員說的詞（中英文都可以，例如「輪播／carousel」）對 `keywords` 和 `name` 找候選。
2. 或直接列 `components/blocks/` 的檔名、用關鍵字 grep 元件內容。
3. 找到候選後，讀元件開頭的 Props，確認資料形狀合用，再決定採用。

## 怎麼採用（四步，缺一不可）

1. **複製進 src**：把元件檔複製到本站對應位置——blocks 放 `src/components/blocks/`、effects 放 `src/components/effects/`、patterns 放 `src/components/patterns/`。元件有 import 同目錄的其他檔案時（常見：`Button`、`PostCard`、`safe-href`），那些檔案也要一起複製過去。
2. **補 CSS**：依下方對照，把需要的 `styles/*.css` 複製到本站 `public/`，並在會用到該元件的版型（layout）加上 `<link rel="stylesheet">`（或把 CSS 內容併入本站既有的共用 CSS）。少了這步，元件會沒有樣式。
3. **在頁面 import 使用**，傳入本站的真實資料，不要把展示用的範例資料一起搬過來。
4. **`npm run build` 驗證**通過、實際看過頁面渲染正常，才算採用完成。

不要直接從 `.ai/library/` import 元件來用：架上是原件庫，要改、要用都先複製進 `src` 再動，架上的保持原樣，日後才有乾淨的原件可以對照或重取。

## CSS 對照（哪類元件吃哪支 CSS）

| CSS | 誰需要它 |
|---|---|
| `styles/blocks.css` | 通用與首頁／服務元件：Hero 系列、FeatureGrid、PostGrid、PostCard、Button、CTASection、SectionHeading、SiteHeader、Stats、Testimonial、FAQ 等 |
| `styles/article-explorer.css` | 文章探索家族：ArticleGrid、ArticleList、ArticleSearch、PostCalendar、RelatedArticles、TagCloud、ArticleAccordion 等，以及 `ContentCarousel` 輪播 |
| `styles/multipage-nav.css` | 導覽與文章介面、部分服務元件：MobileMenu、ArticleViewSwitcher、SiteSearchDialog、SocialLinks、NewsletterSignup、BookingLink、MediaEmbed、PractitionerCard、PricingDetails、ResourceCard、ServiceFit、TrustInfo 等 |
| `styles/effects.css` | `components/effects/` 全部動效元件（UnderlineLink 另需 `multipage-nav.css`） |

不確定時，四支 CSS 全複製到 `public/` 也可以（合計約 44KB）；只在有用到的版型上加 `<link>`，不要全站每頁都載。

## 注意

- `SiteSearchDialog` 有一個共用型別引用（指向 `src/data.ts`）。採用它時，把本架的 `data.ts` 一併複製為本站的 `src/data.ts`；或拿掉該型別 import、改用一般寫法。
- 元件與目錄的最新版本以建站資料包為準；本站架上的是產生本站當時的版本。日後若收到更新包，依更新包說明整批換新，不要逐支挑著換。
