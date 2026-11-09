---
name: astro-site-entry
description: Route a novice's natural-language website request across new builds, design improvements, maintenance, publishing and recovery; show two-layer choices only when intent is unclear. Delegates to existing Skills without doing their work.
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

## AI 網站夥伴：首次與後續工作的統一分流（Phase A）

本 Skill 是輕量入口，不執行專業流程。學員不必知道 Skill 名稱。**先解讀學員的自然語言與已確認的脈絡**；具體需求直接進任務，只有「想處理網站」「想改網站」等未說明目的的語句才顯示第一層；選擇後顯示該類第二層。文字選單在純聊天平台也可用，不依賴按鈕。學員可以說「不知道／先看看／跳過／都不喜歡／先給我一個方案」；此時提出可逆建議，而不是連續逼問。每輪最多問一個必要問題，已知資訊不重問。

**第一層（需求不明時才顯示）**：「今天想一起做網站的哪件事？也可以直接告訴我想修改什麼：① 建立新網站 ② 改善目前的網站 ③ 維護與處理問題」。

**第二層：**
- ① 建立新網站：① 從零開始讓 AI 訪談（技術路線 **C**，`astro-site-from-zero`）② 使用 ATP 現成版型（技術路線 **B**，`astro-starter-onboarding` → `astro-site-assembly`）③ 參考／遷移本人有權使用的既有網站（技術路線 **A**，`url-to-frontend-replica`）。**選單順序不是原 A／B／C 代碼，不得互換其內部行為**。
- ② 改善目前的網站：① AI 網站設計健檢（`astro-design-consultation`＋需要時 `astro-editorial-layout-design`）② 參考網站改造（`astro-design-consultation`；不可複製品牌資產）③ 多種設計候選（`astro-design-consultation`＋`astro-layout-craft`）④ 局部區塊微調（`astro-ui-craft`）⑤ 品牌視覺改造（`astro-ui-craft`／Design Tokens）⑥ 互動與動態精修（`astro-motion-craft`）。這六個是**任務路由，不是已完成的 Phase B 設計生成流程**。
- ③ 維護與處理問題：① 更新文章文字圖片（`astro-content-publishing`；一般小修改搭配 `astro-site-maintenance`）② 新增網站功能或頁面（`astro-page-management`、`astro-ui-craft`；先查既有 Registry）③ 修復網站問題（`astro-site-maintenance`）④ 預覽驗收與發布（`astro-pr-preview`）⑤ 備份、還原、恢復先前版本（`astro-site-maintenance`）。

**自然語言直達例子：**「我想做個人網站」→新建，必要時才選 A/B/C；「已有網站想搬來」→A；「首頁普通」→設計健檢；「我喜歡這個網站」→參考分析；「給三種不同首頁」→設計候選；「把第二段照片放大」→局部 UI；「更有個人風格」→品牌視覺；「更有動態感」→Motion；「發表文章」→內容發布；「新增 FAQ」→先查元件，再修改；「網站打不開」→故障診斷；「恢復昨天版本」→先比對可用歷史，再擬可稽核還原 PR。

**複合與切換：**「首頁不好看，而且手機版跑掉」同時觸發設計諮詢、UI／Responsive 修復；先盤點問題，不強迫選單擇一。學員原本在設計流程，改說「先新增文章」，直接轉 `astro-content-publishing`，保存原本確認、否定、待確認事項及進度；不得重新訪談、丟失脈絡或以選錯入口為由重建網站。只載入實際需要的 Skill，未能讀取者明說，不得宣稱使用。

**既有網站保護：**先識別學員**自己的** Repository、本機工作樹、`AGENTS.md`、`PROJECT.md` 與實際頁面；查不到直接標明。設計諮詢可先聊，不以 GitHub 授權為前置要求。既有網站一律先走 `astro-site-maintenance` 的安全護欄，專業修改再按需讀設計／文章／頁面／Motion Skill；**不得執行 Starter 匯出器或覆蓋既有網站**。保留網址、文章、導覽、已確認決策和正常功能。任何寫入依既有 Branch → Build → 真實 Preview／SHA → QA → 學員核准 → Merge／發布護欄，未核准不得 Merge 或發布。設計交接遵循 `.ai/SHARED-DESIGN-HANDOFF.md`。
