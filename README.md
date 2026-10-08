# Astro Personal Site Starter

工作坊研究成果的可執行原型：**2 種內容架構 × 4 種視覺人格 = 8 個 Demo**。

## Live demo

首頁：
- https://pikaOne1138.github.io/astro-personal-site-starter/

### A｜知識／部落格

- Paper & Ink：https://pikaOne1138.github.io/astro-personal-site-starter/knowledge/paper/
- Morning Light：https://pikaOne1138.github.io/astro-personal-site-starter/knowledge/morning/
- Quiet Studio：https://pikaOne1138.github.io/astro-personal-site-starter/knowledge/studio/
- Botanical Calm：https://pikaOne1138.github.io/astro-personal-site-starter/knowledge/botanical/

### B｜助人者／個人專業服務

- Paper & Ink：https://pikaOne1138.github.io/astro-personal-site-starter/helper/paper/
- Morning Light：https://pikaOne1138.github.io/astro-personal-site-starter/helper/morning/
- Quiet Studio：https://pikaOne1138.github.io/astro-personal-site-starter/helper/studio/
- Botanical Calm：https://pikaOne1138.github.io/astro-personal-site-starter/helper/botanical/

### 元件庫

- Astro Blocks V1.5：https://pikaOne1138.github.io/astro-personal-site-starter/blocks/

## V2 文章探索與內容元件

- 文章探索 Demo： https://pikaOne1138.github.io/astro-personal-site-starter/explore/
- 八款完整網站各自提供 `/{kind}/{theme}/explore/`：可從網站導覽列的「找文章」直接進入；結果連向各自風格的文章內頁
- 共 35 個元件：V1.5 的 23 個 + V2 的 12 個
- 搜尋標題、摘要、分類、標籤；按月份或日期瀏覽文章
- 導覽列新增放大鏡全站搜尋彈窗（`SiteSearchDialog`），支援 Ctrl+K／⌘K、Esc；搜尋頁面／文章／服務的中繼資料並可直接跳轉
- 折疊、條列、Grid、提示框、比較表、延伸閱讀和輪播
- 範例文章日期是工作坊教材，並非真實發文紀錄；完整內文檢索尚未實作

## Architecture

這不是 8 套互不相干的網站，而是：

- **2 種內容架構**
  - Knowledge / Blog：內容探索、閱讀、分類、訂閱
  - Helper / Professional：信任、服務、流程、FAQ、預約 CTA
- **4 種視覺人格**
  - **Paper & Ink 紙墨**：編輯感、襯線、細線、紙張感
  - **Morning Light 晨光**：暖奶油、大圓角、柔光、有機感
  - **Quiet Studio 靜室**：大量留白、精準格線、單一深綠強調
  - **Botanical Calm 植感**：柔和自然、低飽和綠與留白

8 個公開網址由同一個 Astro 元件與資料層產生，方便工作坊示範「結構 × 視覺系統」的組合，而不是維護 8 份獨立程式碼。

## AI design brain

Repo 內建：

- `AGENTS.md`
- `.ai/astro-ui-craft/SKILL.md`
- `.ai/astro-ui-craft/references/`
- `.ai/astro-ui-craft/references/raw-research/`
- `.ai/astro-ui-craft/references/component-library-v1.5.md`
- `COMPONENTS.md`、`src/data/blocks.registry.json`（元件名稱、用法與索引）

Skill 的任務是把 UI 生成限制在研究過的資訊架構、design tokens、CTA、微動畫、RWD、Accessibility 與 Astro 實作邊界內，避免產生典型 AI landing page。

## Workshop flow

1. 選網站任務：Knowledge 或 Helper
2. 選視覺人格：Paper / Morning / Studio / Botanical
3. 改品牌資料、文案與 CTA
4. AI 依 Skill 精修 UI，不任意擴大功能範圍
5. AI 建立 Pull Request，GitHub Actions 產生線上預覽
6. 學員確認畫面後才合併 PR
7. GitHub Actions 自動發布 GitHub Pages

## Local

```bash
npm install
npm run dev
npm run build
```

## Deploy

推到 `main` 後，由 `.github/workflows/deploy-pages.yml` 自動 build 並發布到 GitHub Pages。

目前 GitHub Pages workflow 已成功完成部署。

## Project goal

這個 repo 的目標不是做 SaaS、CRM 或完整商業後台，而是提供零程式背景學員一個：

**可理解、可改、可部署、UI 有設計品質的 Astro 個人網站起點。**


### 可操作的導覽／服務／媒體共用元件

元件庫目前 42 個 Astro blocks。新增手機導覽 `MobileMenu`、預約串接 `BookingLink`、LINE/Email/電話 `ContactActions`、服務資訊 `PricingDetails`、專業／政策 `TrustInfo`、影片與音訊 `MediaEmbed`。

目前 Demo 是**教材示範資料**，尚未設定使用者自己的預約平台、訂閱系統、專業資格與隱私政策。未配置的元件應呈現明確的未設定狀態，不得假裝成功送出、預約或提供專業服務。真實連結請由網站擁有者自行設定。


### 社群圖示與連結

`SocialLinks.astro` 可放在頁尾、個人介紹、聯絡頁或社群入口。支援 Instagram、Facebook、Threads、YouTube、LINE、GitHub、LinkedIn、X、TikTok、Pinterest、Discord、Telegram、Spotify、Email、電話、網站與 RSS。圖示由 Simple Icons 固定 v16 版本的 SVG CDN 提供；通用信封／電話／網站使用內嵌 SVG。未填連結不顯示，無須帳號或 JS 追蹤。正式上線時確認外部 CDN 可用性和各品牌商標政策；可改為自託管 SVG。


### 元件補完：Breadcrumbs、ArticleNavigation、ArticleShare、ReadingProgress

文章頁 Breadcrumbs、上一篇／下一篇、LINE／Facebook／Email／剪貼簿分享、實際文章區域的閱讀進度。不能將 SocialLinks 當成文章分享。 此分支元件庫總數 46 個，新增的積木均在功能分類展示，實際網站亦有示範入口；正式部署需依真正內容配置第三方服務。
