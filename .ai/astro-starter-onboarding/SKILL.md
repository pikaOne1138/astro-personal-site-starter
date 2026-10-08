---
name: astro-starter-onboarding
description: Guide non-coders from selecting a knowledge/helper website layout to defining brand colors, information architecture, navigation, content and a reviewable Astro starter plan.
---
# Astro Starter Onboarding｜學員建站規劃

## 何時使用
學員希望「選一款網站、改成自己的、調品牌色、安排選單、開始架站」時使用。配合 `astro-layout-craft`、`astro-editorial-layout-design`、`astro-ui-craft`、`astro-content-publishing`。不是自動部署或帳號註冊 Skill。

## 第一原則
先網站用途、再 Layout 構圖、再網站資訊架構與導覽、再品牌視覺、Blocks，最後 Effects。不要把色系換色當作另一套 Layout。現有十二款是首頁原型而非十二套完整網站；八款 Demo 是兩種網站用途 × 四種視覺風格，不要把兩者混為可任意配對的已完成產品。

## 工作流程
1. **需求**：以生活語言詢問做網站的目的、誰會看、要提供什麼資訊、主要希望對方做什麼。先判斷知識／部落格或助人者／個人服務；必要時問最重要的缺項，不一次丟大型技術表單。
2. **選設計方向**：打開 `/layouts/`，用各展示項目的名稱／slug 選擇（例如 `field-notes`）。若學員說「1A」「2C」「3D」，先找目前展示頁是否確實標示該編號，再建立「顯示編號 → slug」對照；不可猜測編號或把編號當成穩定 API。比較最多 2–3 個不同 Layout，說明 Hero、閱讀動線與手機重排如何不同。
3. **網站架構**：先提議首頁和必要內頁。知識型通常文章、主題、關於我、開始閱讀、聯絡；服務型通常服務、流程／第一次來、關於我、常見問題、聯絡／外部預約。首頁是大廳，不要把所有內容塞回首頁。標示未準備內容的頁面為「暫不啟用」，不要做空連結。
4. **導覽列**：先以訪客任務安排四至五個清楚名稱的選單；確認 Logo 回首頁、主要 CTA、手機展開方式、文章搜尋入口。導航項目必須指向實際存在的路由；有外部預約才顯示外部預約連結。
5. **品牌 Token**：可從紙墨／晨光／靜室／植感選視覺起點，也可由學員給品牌主色 HEX 或圖片作參考。利用現有 token 定義 primary、accent、背景、文字、邊框、字體和按鈕；確認可讀對比、焦點、暗淺背景與 CTA 狀態。品牌色是 Theme Token，不得改壞 Layout 的結構。先不要新增散落的硬編碼顏色。
6. **內容配置**：建立必要頁面清單、每區目的與資料欄位；要求學員提供真實作者、服務、照片、聯絡資料。Demo 資料不得冒充正式內容。
7. **組裝規格**：產出可供 AI 開發的簡短 Site Brief：網站類型、Layout slug、首頁構圖、導航、頁面路由、品牌 token、區塊需求、CTA 目的、內容來源、手機重排、限制與待補資料。檢查 `src/data/blocks.registry.json` 及既有 Blocks；動效預設 subtle。
8. **原型 → 可部署 Starter**：把選定方向擴成完整多頁時，明確標示哪些是現成元件、哪些仍需移植與實作。先 Branch + PR + Preview，完成 RWD/連結/SEO/可操作性驗收後，交學員同意才合併。

## 驗收
一位初學者能說出「這網站給誰看、首頁目標、選哪個 Layout、主要頁面和選單、使用何種品牌色、哪些資料還缺」。不得把選擇展示項目誤稱一鍵產出正式網站。

## 與其他 Skills
- 視覺與 Blocks：`.ai/astro-ui-craft/SKILL.md`
- Layout：`.ai/astro-layout-craft/SKILL.md`
- 內容：`.ai/astro-content-publishing/SKILL.md`
- 部署：`.ai/astro-starter-deploy/SKILL.md`
- 維護復原：`.ai/astro-site-maintenance/SKILL.md`
