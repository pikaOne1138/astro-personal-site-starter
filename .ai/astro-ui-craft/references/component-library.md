# 元件庫：風格契約與組裝參考

> 元件的介面由 `COMPONENTS.md`、`src/data/blocks.registry.json` 與 `src/components/blocks/*.astro` 維護。這份是 `astro-ui-craft` 的**設計與組裝參考**，不能取代查證目前的原始碼。

## 範圍

兩種網站架構，搭配不同的視覺人格；另外 `/blocks/` 是一個可操作的元件圖庫。有哪些元件、屬於哪一類，以 registry 為準，不要在這裡列清單或寫數量。

變化的方式：`HeroSplit` 與 `ImageText` 用 `reversed` 反轉圖文順序；`FeatureGrid` 用 `columns` 切換欄數；`HeroCentered`、`HeroImage`、`HeroSplit` 是三種不同的 Hero 構圖。視覺人格由 `<html data-theme="…">` 搭配既有 CSS tokens 控制，不要另建平行的、互不相干的硬編碼樣式。

## 風格契約（必須遵守）

**優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。**

- 沿用專案與研究支持的既有樣式。
- 間距階：`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`。這是間距，不是字級尺度。
- 導覽列的字級以現有 CSS 為準。不要為了小小的視覺調整發明中間字級（例如 `15px`）；真的需要新 token 時，記下理由並先詢問。
- 字要好讀、focus 要清楚；手機導覽要找得到、用得到。
- 動效：溫和的 hover、進場與回饋；尊重 `prefers-reduced-motion`；不要讓效果搶過內容。
- 四個主題都要檢查對比與閱讀行寬。

## AI 組裝步驟

1. 判斷是知識或助人者網站，並選一個視覺人格。
2. 從既有 Blocks 選出有文件的組合。讀 `src/data/blocks.registry.json` 與實際的 `Props`。
3. 組頁面時給有意義的內容與真實的 href。不要把 `#` 佔位發布成可用的預約或表單，也不要把合成的見證當成真實推薦。
4. 多頁路由重用 `SiteNav.astro` 與既有的 site-map；新區段用 components／blocks，不要取代能運作的路由。
5. 站內連結與資產用 `import.meta.env.BASE_URL`，讓正式站與 PR 預覽都能用。
6. 執行建置；合併前把 PR 預覽交給人審閱，流程見 `.ai/astro-pr-preview/SKILL.md`。

## 參考的優先順序

1. 可執行的元件與原始 CSS（`src/components/blocks/*.astro`、`public/demo.css`、`public/blocks.css`、`public/v02.css`）。
2. 元件介面文件：`COMPONENTS.md` 加 `src/data/blocks.registry.json`。
3. 設計依據：`.ai/astro-ui-craft/SKILL.md` 與工作坊的風格規格。
4. 這份摘要只是導覽性質的參考，不是獨立的、自創 props 或設計數值的來源。

沒有另外要求時，不要引入自動組裝引擎或 AI 自動選元件的推薦機制。
