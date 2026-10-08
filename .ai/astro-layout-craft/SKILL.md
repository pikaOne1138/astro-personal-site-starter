---
name: astro-layout-craft
description: Select, deconstruct and adapt distinctive Astro page compositions, choosing structural reading flows before brand colors or component effects.
---
# Astro Layout Craft｜版型設計與組裝 Skill

## 定位

**版型（Layout）** 是整個網站如何安排內容：首頁區塊先後、欄位比例、視覺重心、瀏覽節奏、如何抵達 CTA；不等於紙墨／晨光／靜室／植感等 Design Tokens。既有 `astro-ui-craft` 負責網站區塊，`astro-motion-craft` 負責動效，本 Skill 負責**資訊動線與整體排版**。

## 來源與誠實標註

- Manus 10 個原型：使用者上傳 `astro-ten-site-directions.zip`，原生原型位於 `src/pages/directions/knowledge/*` 與 `src/pages/directions/care/*`。本 Repo `/layouts/` 根據其不同資訊架構改寫了 10 款 Astro 示範，**不是逐字不變的 ZIP 原始碼**。
- Claude `Claude-AstroTmplateResearch.md` 與 `Astro 架站工作坊｜三種網站風格設計規格.md` 是研究與設計規格，**並未交付兩個獨立可執行版型原始碼**。`reading-atlas` 與 `trust-path` 是我們依其研究新增的 2 款版型設計。
- 檔案 `src/data/layout-directions.json` 管理十二款；`src/pages/layouts/index.astro` 比較入口，`src/pages/layouts/[slug].astro` 內各有獨立 DOM 結構，`public/layout-library.css` 各有不同的布局，而非換色切換。
- 現階段為首頁排版**原型展示**，不是每款都有文章內頁、預約後端、完整網站部署。原型的來源圖片暫參考使用者上架的 Manus 圖片 URL；若做成可交付學員的獨立模板，需將已授權的圖片改為自託管並補完整頁面。

## 必須遵循的組裝步驟

1. **問用途先於顏色**：知識／部落格（長文、觀察、課程、策展、Podcast、年度整理），或助人／專業服務（專業說明、關係陪伴、身體工作、行動教練、多人團隊、信任流程）。
2. **比較兩款真實不同的閱讀路線**：例如 field-notes「邊注→觀察圖→按日期記事」和 learning-lab「學習路線→勾選進度→單元」，不是把 Header 顏色換掉。
3. **先畫首頁 wireframe**：寫 5–7 段由上而下的區塊目的、首屏資訊重點、桌面欄數、手機順序、CTA 導向。
4. **從既有 blocks 取資料**：`src/data/blocks.registry.json` 及 `/blocks/` 中找可重用功能；必要時定義額外 layout-specific composition，不把 12 個首頁都改成同一組 Hero + three cards。
5. **再挑風格和特效**：沿用或自訂 CSS tokens，跟 `.ai/astro-motion-craft/SKILL.md` 選適合的動態；不要用炫技代替版型差異。
6. **保持工作坊友善**：用 Astro + CSS Grid/Flex + 少量原生 JS；所有範例可靜態部署 GitHub Pages，內部連結尊重 `import.meta.env.BASE_URL`。
7. **驗證**：375/390px、桌面，長標題不中斷、對比與鍵盤可用、減少動態、不得有偽造收費、證照、留言或預約成功。每次新增可重用版型需更新版型 data、展示站與 Skill；新元件才登錄 Block Registry。

## 十二款方向：應保留的**結構性差異**

| Slug | 先展示什麼 | 特徵模組 | 禁忌 |
|---|---|---|---|
| field-notes | 觀察刊頭＋側邊索引 | 邊注、觀察圖片、日期 ledger | 改成普通三欄文章卡 |
| essayist | 特大刊頭與精選長文 | 大幅書寫、單篇 focal story、期刊目錄 | 塞入雜亂小卡 |
| learning-lab | 學習承諾與路徑 | 可勾選學習步驟、progress、課程單元 | 假裝勾選已存在後端 |
| curator | 拼貼與物件 | 不對稱展牆、分類可展開索引 | 通用等寬格子 |
| radio-letter | 聲音與節目氛圍 | 暗色廣播台、播放器、時間軸 | 把示範音檔當真節目 |
| reading-atlas | 年度編輯封面 | 章節式索引、年度閱讀地圖 | 僅更換 essayist 配色 |
| clinician | 方法、資格與信任 | 可查核服務詳情、適合度、工作界線 | 虛構醫療證照 |
| companion | 直接對讀者說的一封信 | 信件段落、故事、低壓邀請 | 大量銷售口號 |
| somatic | 空間和感受 | 全畫面攝影、觸碰同意、感官流程 | 宣稱治療病症 |
| coach | 行動導向大字報 | 切分方法、下一步、工作計畫 | 模糊空泛的陪伴文案 |
| collective | 團隊關係 | 多人服務、活動索引與合作 | 虛構團隊及名額 |
| trust-path | 訪客疑問先行 | 適合度、流程透明、收費說明、真實 CTA | 假預約或保證療效 |

## 重用設計

維護 `src/data/layout-directions.json` 的用途、來源、主要架構和模組清單；可用 `layout slug` 做可配置選擇，然後把 demo sections 重構成可放在其他路由的 Astro compositions。**Layout Library 不計入 54 個網站功能 blocks 或 7 個 effects 的登錄數**，避免不同層級的數字混淆。

推薦學員操作：先看 12 種網站版型 → 選一個最接近內容任務的 → 在元件庫換區塊 → 在特效庫選輕量動效 → 最後調整配色與自己的文字。

## 版面質感的強制檢查：置中畫布與留白

PR #20 曾把 Manus Learning Lab 的兩側留白取消，導致 Hero、學習路徑和課程模組在桌面橫向過度撐開。學員在比較版型時，這屬於結構性退化，不是單純換色。

- **先測量原站的內容畫布（content container）**：大螢幕版面一般須採最大寬度（依版型約 1000–1360px）+ 左右 auto margin；絕不在未比對的情況下直接使用滿版百分比 padding 當作留白方案。
- 例外可使用全幅背景（somatic 影像等），但主標題、文字和 CTA 仍要有受控的內層 container。
- 留白不是只有 padding：要保留 Hero 文字占比、圖片寬高、H1 標題斷行、板塊密度、全幅段落和容器段落的節奏。
- Manus Learning Lab 的特色是黃底高亮大標、貼紙式路線圖片、垂直節點時間軸、課程區塊內的細列表；不可以退化成全寬色塊三列表。
- 比對原站和 PR 時，至少截取相同寬度的桌面全頁和 390px 手機畫面，查 Hero、兩側留白、路徑與底部。**GitHub Actions build 成功不能取代視覺驗收。**
