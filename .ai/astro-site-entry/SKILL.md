---
name: astro-site-entry
description: Route a novice's site-building request to the appropriate ATP workflow: authorized replica, existing ATP Starter, or direct AI-led Astro building without requiring a planner first. Not for doing the build itself, it only routes to the next workflow.
---
# ATP 建站總入口｜三條路，單一維護護欄

## 先判斷需求，不先叫學員填表
用使用者已提供的資訊判斷。如果已有明確目的就直接執行；分流仍不明確才用白話問**一題**：
- **A｜復刻既有網站**：已有本人擁有或有授權的網站，想遷移／重建保留構圖和深層路由。讀 `.ai/url-to-frontend-replica/SKILL.md`；不強迫選新的 Layout 或事先填 Site Brief。
- **B｜ATP Starter 選版**：願意從現有成熟設計、元件、文章／服務系統挑選搭建。可使用 `/starter/` 產生 Site Brief JSON，依 `.ai/astro-starter-onboarding/SKILL.md` 和 `.ai/astro-site-assembly/SKILL.md`。版型 Prototype 不得宣稱已驗收 Ready。
- **C｜AI 對話從零建站**：沒有既有網站，或想直接描述需求而不是先操作規劃器。讀 `.ai/astro-site-from-zero/SKILL.md`；不以 Site Brief JSON 作為開始訪談／開始草稿的前置條件。AI 可自行產生規劃摘要，只有要調用 ATP 匯出器時才轉成合法 JSON。

## 主打客群與能力界線
ATP 優先服務知識／部落格和助人者／個人專業服務網站。其他類型可以討論並評估可行性，但必須坦白說明 ATP 沒有對應成熟 Starter，不能把未知能力包裝成已提供的模板或正式服務。不要將靜態個人網站擴張為 CRM、會員、付款或醫療後台。

## 三條路共用的交付基礎
- 對長期新增文章／結構化內容的網站，保留或優先採用 Content Collections：目的在未來持續更新維護，不只是完成第一次建站。Pagefind、SEO、RSS 等依實際內容需求配置。
- 只使用真實已確認的經歷、證照、服務、聯絡方式、見證與授權素材；沒有資料就空缺、標示 Demo 或待設定，不做假功能。
- 網站有變動先看 `AGENTS.md`、`PROJECT.md`、工作樹與已配置平台。按需讀 Layout、UI、Content、Motion Skills，不把全部 Skills 當必修教材。
- 建置與發布使用 `.ai/astro-pr-preview/SKILL.md`、`.ai/astro-starter-deploy/SKILL.md`，日後修改用 `.ai/astro-site-maintenance/SKILL.md`。Build ≠ 真實 Preview ≠ Production；確認最新 SHA 與手機畫面，使用者明確批准才 Merge／正式發布。
- 三條路都只修改學員自己的專案，不要求學員 Fork 老師展示 Repository。

## 防止重複工作的邊界
本 Skill **只分流**，不複製復刻的深層盤點規則、不重寫匯出器、不提供第二套部署指令，也不讓 C 路線被 B 路線的 schema 綁住。需要時允許使用者中途改選路線，保留已確認內容與既有檔案，不重問已答問題。
