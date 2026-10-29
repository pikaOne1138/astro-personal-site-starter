---
name: astro-ui-craft
description: Design, build, refine, or audit polished Astro sites for knowledge/blog and helper/professional-service workshop archetypes. Not for adding pages or navigation (use astro-page-management), publishing articles or deployment.
---

# Astro UI Craft

做出看起來有被設計過、而不是只是被生成出來的網站。

## 核心模型

兩種內容架構：**知識／部落格**、**助人者／專業服務**。視覺人格由 CSS tokens 與 `<html data-theme="…">` 控制。有哪些主題，以展示頁的 `src/data.ts` 與規劃器的 `src/data/starter-config.ts` 為準，不要假設數量或清單。

架構與視覺是兩個軸：同一套元件與資料層，搭配不同的主題，而不是各自獨立的程式碼。

## 範圍護欄

預設範圍是精緻的前端網站。優先使用外部表單、LINE、預約與電子報服務。不要悄悄擴張成 CRM、登入、會員、自建預約、金流、資料庫或 SaaS 管理後台。

## 證據層級

1. 直接開啟、截圖、計算後 CSS 的觀察。
2. 搜尋並實際查證過的頁面觀察。
3. 從已查證案例歸納的跨案例規律。
4. 設計提案與合成的 tokens。
5. 只憑記憶或明確標示未查證的候選清單。

## 頁面任務

**知識／部落格**要回答：這個人寫什麼？新讀者從哪裡開始？怎麼依主題找更多？為什麼要追蹤？下一個低阻力的行動是什麼？

預設動線：`Hero → Start Here／主題 → 精選／最新 → 簡短 About → 資源 → 電子報 → Footer`。常用模式：Start Here、主題分類、精選加最新、一致的電子報 CTA、好讀的文章版面。

**助人者／專業服務**要回答：我來對地方了嗎？這個人懂我的處境嗎？提供什麼？聯絡後會發生什麼？為什麼可以信任？下一步的低壓力行動是什麼？

預設動線：`Hero → 同理 → 服務 → 初次流程 → About／資格 → 信任 → FAQ → 預約／聯絡 → Footer`。常用模式：清楚的初次流程、服務適合度與界線、資格放在 About 附近、FAQ 放在預約前，並在適用時提供台灣常用的 LINE 聯絡路徑。

首頁大約 **7 ± 1 個有意義的區段**，不要把每個區段都做成三個 icon 卡。

## 頁面類型

- **文章**：好讀的寬度、清楚的標題層級、日期／更新／閱讀時間、需要時的目錄、callout、相關文章、作者區塊、低壓力的 CTA。
- **服務**：同理的開場 → 適合與不適合誰 → 會發生什麼 → 形式與時長 → 價格或價格範圍 → 流程 → FAQ → 聯絡 CTA。助人者網站要把基本流程講清楚，不要為了逼人聯絡而藏資訊。

## 視覺人格（核心四種）

- **Paper & Ink**：暖紙色、深墨色、襯線標題、細線、低飽和影像、編輯式清單。
- **Morning Light**：奶油底、陶土／玫瑰／鼠尾草點綴、柔和襯線加易讀無襯線、大圓角、自然光影像、溫和的安心感。
- **Quiet Studio**：近白的暖灰、精準的格線、無襯線為主、單一強調色、細邊框、結構化的服務與內容資訊。
- **Botanical Calm**：柔和的植物綠、克制的自然對比、大量留白、安靜的有機暖意。

沿用 `public/demo.css` 裡既有的 tokens，不要自己另創色票。

學員站（匯出後的獨立網站）的設計值以 `public/tokens.css` 與 `site.config.json` 的 `brand` 為準；改哪一層、禁止繞過 Token 與回報格式，見學員 `AGENTS.md` 的「設計修改」一節。本 Skill 不重複定義那些規則，避免兩處講法不一致。主題要在字體、幾何與動態上有差別，不能只換顏色。Tokens 涵蓋背景、surface、文字、muted、邊框、強調色、圓角、陰影、時間與 easing。

## 字級與間距契約（必須遵守）

**優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。**

- 改字級或間距前，先看專案實際的 CSS tokens 和 `references/component-library.md`。
- 沿用既有的字級、間距階、字重、行高、圓角與轉場。
- 既定的間距階：`4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`。字級是另一套尺度，不要和間距混用。導覽列的字級以現有 CSS 為準，不要自己插入中間值（例如 15px）。
- 真的需要新數值時，說明理由、集中成 token，並先取得同意；不要悄悄修改設計系統。
- 既有樣式裡的舊數值不是「可以再發明更多」的許可；全面 token 化是另一件事，不要和不相關的 UI 修改混在一起。

## 設計規則

- 先結構，後裝飾；一個頁面的任務要在看到裝飾之前就清楚。
- 一致的間距尺度；長文行寬約 60–72ch。
- 一個主要強調色加中性色。
- 一致的圖片比例、圓角與色調處理；先用細線和留白，再考慮陰影。
- 可見的 hover／focus／active 回饋。
- 避免：霓虹紫、過度的玻璃擬態、隨機的 bento 格、重複的 icon 三欄區段、巨大含糊的漸層、無意義的計數器／輪播／打字機效果。

## 導覽與 CTA

桌機：`[Logo] 4–5 個連結 … [單一主要 CTA]`。知識站：Articles／Topics／Start Here／About 加 Subscribe。助人者：Services／Process／About／Articles／FAQ 加 Book／Contact。入門範本不用 mega menu。導覽列的結構規則見 `COMPONENTS.md`。

CTA 最多三個層級：主要（訂閱或預約初談）、次要（了解適合度／流程／免費資源）、低壓力（閱讀／探索）。助人者的用語例如「預約初談」「了解合作方式」「第一次來？先看看流程」「開始聊聊」。對需要信任的專業，避免不必要的緊迫感、倒數與強推銷語氣。

## 動效

hover 150–220ms；UI 轉場 180–350ms；進場 400–650ms；位移 4–16px；縮放約 0.98–1.03；統一的 ease-out；優先用 transform 與 opacity；一律尊重 `prefers-reduced-motion`，觸控裝置關閉只靠游標的效果。目標是訪客不一定察覺動畫，但覺得網站被用心對待。

要做進場、錯位、傾斜、聚光、縮放、磁吸、底線、FAQ 展開等動效時，先讀 `.ai/astro-motion-craft/SKILL.md` 與它的資料庫，不要自己重寫已有元件的邏輯。

## 響應式與品質關卡

響應式不是把桌機縮小：桌機容器約 1080–1200px；平板簡化分欄與 sticky 側欄；手機是單一閱讀動線、足夠的左右留白、必要時全寬控制項。文章目錄在手機要收合。固定的 CTA 不可蓋住內容。最小實用觸控目標 44×44px。

交付前：頁面任務一眼看得出；去掉裝飾後層級仍然正確；手機構圖成立；對比、觸控目標與 focus 可用；動效細緻且可關閉；導覽只有一個清楚的 CTA；首頁沒有多餘區段；建置成功；沒有不小心擴張後端範圍。

## 元件

- 組頁前先讀 `references/component-library.md`（風格契約與組裝步驟）、`COMPONENTS.md`（元件介面與規範）和 `src/data/blocks.registry.json`；介面以 `src/components/blocks/*.astro` 的 Props 為準。
- 優先重用既有 Blocks。只有既有 Props 與變體滿足不了真實需求時，才新增元件。
- 文章探索、清單、搜尋、閱讀相關的元件，另讀 `references/article-exploration.md`。
- 實用元件（預約、聯絡、價格、信任、媒體、社群、分享、電子報）不得造假：不做假的表單送出、第三方預約、見證、資格、緊急聯絡方式或訂閱成功。細節見 `COMPONENTS.md`。
- `/blocks/` 依「訪客需要做什麼」分類，不依版本；版本資訊只放在開發者文件與 registry。
- 共用的長頁返回頂端用 `BackToTop`（透過共用 Layout），不要在各頁複製捲動處理。

## 與其他層級的順序

先選版型（`.ai/astro-layout-craft/SKILL.md`），再依需要選區段樣板，再選功能 Blocks，再加動效，最後調色與品牌素材。`/layouts/` 的版型是首頁原型，不是有後端的完整網站；編輯式構圖配方（`src/components/editorial-recipes/`）是純構圖，不是功能元件，只有視覺佔位的配方不得宣稱功能已接上。

## 助人者示範文案

不要把「陪伴、探索、聊聊」這類空泛字句套給所有助人者網站。示範用的內容身分在 `src/data/helper-content.ts`（身體工作、諮商心理、教練、靈氣），各自有不同的方法、知情同意與界線、服務卡、適合度、初次流程、FAQ 與預約；它們只是範例，**不是主題與職業的綁定**。不要編造資格或療效：靈氣要呈現為非醫療的身心保健、諮商需要法律上合適的執照、身體工作需要明確的身體接觸同意、教練不能取代治療。

## 外部元件庫評估

要實作通用的介面行為（Dialog、Dropdown、Mega Menu、Tabs、Accordion、Sheet、Tooltip、焦點管理）之前：

1. 先查 `src/data/blocks.registry.json`、`src/components/blocks/`，能用就重用。
2. 再查 `src/data/external-ui-libraries.json`（研究清單，列出不等於授權安裝）。
3. 偏好最小、可稽核、預設保留靜態 HTML、鍵盤可用、尊重 reduced-motion 與 tokens 的方案。
4. 引入程式碼前，查**實際的上游授權**、版本、維護狀況、安全、樣式與 JavaScript 成本。
5. 記錄採用、改寫或拒絕的理由，包含新依賴與遷移影響；不要在學員的 Starter 裡混用多套競爭的主題系統。
6. 用 Branch 加 PR，測 1440／1280／768／390 與鍵盤、觸控。建置通過不是視覺 QA。

我們的 Blocks 與區段樣板代表**網站特有的任務與內容結構**；外部元件庫主要提供通用的視覺與互動基礎，不含工作坊特有的信任、SEO 與內容需求。

## 既有學員網站：元件增修

收到「新增卡片、替換 FAQ、修改按鈕」時，先確認學員的 Repo 與使用位置，搜尋該網站現有的元件與 registry，以及 ZIP 的 `src/data/blocks.registry.json` 和 `COMPONENTS.md`。優先調整 props 與既有 Blocks，確定缺少能力才新建可重用元件；不要只在某個頁面另寫功能一模一樣的區塊。

變更共用元件前，列出所有引用頁面，檢查現有 Props 的相容性，避免破壞 CSS Tokens、鍵盤、手機與 reduced-motion。真正送出表單、預約、電子報要有已配置的後端，否則明確標示為示範或待設定。涉及 Header／Nav 時，依 `astro-page-management` 驗證所有頁面一致。建立 PR 並提供對應 Head SHA 的 Preview，未經確認不發布。

## 共用設計判斷

共用的設計判斷（Structure before decoration、Layout ≠ Theme、證據分級、尊重被否決的方案、不虛構）見 `.ai/SHARED-DESIGN-HANDOFF.md`，隨學員 ZIP 附上，按需閱讀。上游已確認的設計目的與否決方案必須保留；要修改先說明理由並請學員確認。

本 Skill 職責：沿用上游已確認的結構和內容，只細化元件、Design Tokens、互動與跨頁一致性。
