# 個人網站 AI 建站包｜START HERE

本包給 AI 讀取；學員不用安裝 Node、CLI，也不需要老師的 GitHub Repository 權限。

## 選擇建站入口（先選一條，不需三條都走）
有三種方式開始，AI 先讀 `.ai/astro-site-entry/SKILL.md` 判斷（它只負責分流，不重寫技術規則）：
- **A 復刻既有網站**：提供本人擁有或已授權的來源網站網址，AI 依 `.ai/url-to-frontend-replica/SKILL.md` 盤點並重建；不強制使用 Starter 規劃器。
- **B 使用 ATP Starter**：有意挑選版型、品牌與頁面，依下方原有流程產生 Site Brief JSON、上傳資料包，由 Exporter 組站。
- **C AI 直接訪談建站**：用白話告訴 AI 想做什麼，由 `.ai/astro-site-from-zero/SKILL.md` 一次問一題，自行整理計畫與建立網站；**不用先產生 Site Brief JSON**。
ATP 主要提供知識／部落格及助人者／專業服務兩類；其他類型可以討論，但不保證已有 Ready Starter。文章型網站保留 Content Collections，以支援日後持續新增與維護。

- **Site Brief JSON 不是每條路線的門檻**：B 的匯出器需要有效 JSON；A 可從盤點來源網站開始；C 由 AI 訪談、先確認簡短文字計畫，只有要用 ATP 匯出器時才轉成 JSON。
- **功能範圍**：以 Astro 個人網站為主。付款、預約、會員、CRM 要用授權的外部服務或另案評估，不宣稱免費 Starter 已提供後端。
- **三條路共通**：都要遵守安全、內容真實性、Git PR、真實 Preview，並在使用者明確同意後才正式發布。每條路都需要實際建置、RWD／連結／互動檢查，來源 Skill 不等於完成網站。

## B 路線：使用 Starter 的流程

1. 在網站規劃器 `/starter/` 選擇網站方向、Layout、內容與品牌設定，下載 Site Brief JSON。
2. 在同一段 AI 對話上傳 Site Brief JSON 與本 ZIP。
3. 到工作坊網站 `/guide/` 按「開始建站」提示詞的複製按鈕，或打開本 ZIP 中的 `docs/student-builder-pack/START-BUILD-PROMPT.txt`，把**原文**貼給 AI。這是唯一正式起始提示詞；不需要自己在不同 README 中拼湊或改寫。

## C 路線：訪談啟動提示詞

C 路線的唯一正式起始提示詞是 `docs/student-builder-pack/START-INTERVIEW-PROMPT.txt`（`/guide/` 的「從對話開始」可複製）。它自包含，不假設 AI 已讀本 ZIP，所以純聊天 AI 也能先完成訪談與理解確認單。AI 能讀本 ZIP 時，再依 `.ai/astro-site-from-zero/SKILL.md` 的核心題庫、確認單與逐題保存進行。換對話後要續接，必須讓 AI 讀到 `INTERVIEW-NOTES.md`／`PROJECT.md`，或由學員貼回進度摘要；只貼開場提示詞無法恢復先前的答案。

## 可選：先討論設計，不立即建站

若還不確定網站方向，可先使用同一份 ZIP 中 `docs/student-builder-pack/DESIGN-CONSULTATION-PROMPT.txt`，從 `/guide/` 複製「先討論網站設計」提示詞給能讀取檔案的 AI。這階段不需要 Site Brief JSON，也不用先安裝額外 Skill；AI 依 `AGENTS.md` 與 `astro-design-consultation` 討論，完成 Design Brief 後再回到 `/starter/` 進入原本建站流程。不能讀 ZIP 或 `.ai/` 的純聊天 AI 不應宣稱已載入 Skill。

## 可持續的網站脈絡
- ZIP 根目錄另有 `PROJECT-TEMPLATE.md` 和 `AGENTS.md`。第一次需求討論時，AI 可逐步把已確認資訊寫入 PROJECT；未確認的資料保留「待確認」。
- 產出的學員**獨立網站**根目錄應有 `PROJECT.md`、`AGENTS.md`；兩者要隨網站提交到**學員自己的** Git 倉庫，供新對話、新工具接手。重新取得新版 ZIP 不得覆蓋網站現有的 PROJECT。
- 本機／GitHub／混合環境都先檢查真實工作樹與權限：本機未提交檔案不可由遠端舊版本覆蓋。

## AI 讀取順序（單一入口）
1. 先讀本文件及 ZIP 根目錄 `AGENTS.md`，遵循安全與操作規則；讀取學員 Site Brief JSON。
2. 初次組站讀 `.ai/astro-site-assembly/SKILL.md`，再按選定版型與實際任務讀相關 Skills／Registry；不要一次載入全部 `.ai/`、研究附件或版型原始碼。
3. `docs/student-builder-pack/AGENT-HANDOFF.md` 只在接手既有專案、跨對話或跨代理交接時讀取；初次建站不必把它當成額外必經文件。若接手既有網站，以該站自己的 `PROJECT.md`／`AGENTS.md` 和目前 Git 工作樹為準，不得覆蓋。
4. 編輯式 Section Patterns 是選配資源，學員沒有指定時由 AI 判斷是否需要；不得為了選 Pattern 中斷建站主流程。

## AI 要做的事
- ZIP 有必要的 `.ai/` Skills、Layout 原始構圖、Blocks／Effects／Editorial 配方、相關 CSS、Registry 和 `scripts/export-starter.mjs`；請優先在**本 ZIP** 讀取，不要求學員 Fork/Clone 研究 Repo。
- 使用學員 JSON 生成獨立 Astro 專案並完成所選版型與內頁的適配；先讀 `docs/student-builder-pack/EXPANDED-LAYOUTS.md`。哪些版型可由主匯出器組裝、各自的組裝狀態，以 ZIP 內 `BUILDER-PACK-VERSION.json` 的 `layoutSlugs`、`layoutStatuses` 與 `src/data/layout-assembly/definitions.mjs` 的 `assemblyStatus` 為準；非 Ready 的版型不能當成已驗收。AI 仍須完成真實內容、必要內頁與四尺寸目視驗收。
- 以 `.ai/astro-pr-preview/SKILL.md` 分流 GitHub Pages 或 Cloudflare 的預覽與發布。配置、金鑰、網域須使用學員自己的帳號和 Repo。
- 檢查 Build、實際 Preview、桌機/手機、圖片、文章、導航及搜尋。沒有實測不得稱成功。
- 未經學員明確允許，不 Merge PR、不切換 DNS、不發布正式環境。

## 三道品質關卡（程序性檢查，不是自動通過）

1. **規劃完成後：內容準備度**，讀 `.ai/astro-content-readiness/SKILL.md`。依選定頁面與 Section Patterns 的 `required`／`optional`，列出真實可用的內容與缺口；可以先不放未完成的區段，不捏造文章、見證或資格。
2. **導覽定稿前：導覽可理解性**，讀 `.ai/astro-navigation-tree-test/SKILL.md`。把導覽轉成純文字樹，給三個真實的找資料任務，由真正不熟悉網站的人測試；沒有真人測試結果不得標為通過。
3. **網站真正公開後：發布健康檢查**，讀 `.ai/astro-launch-health-check/SKILL.md`。驗證實際的正式網址、內容、連結、canonical／robots／sitemap；Build 成功不代表已驗證發布，提交 Sitemap 不代表已收錄。

每道檢查都回報：目標、狀態（PASS／FAIL／BLOCKED／NOT TESTED）、證據、發現的問題、下一步。不能用 AI 模擬結果充當真人測試，沒有證據就標 NOT TESTED。

可以直接對 AI 說：

> 請先讀專案 AGENTS.md 與相關既有 Skills，再依序讀 astro-content-readiness、astro-navigation-tree-test、astro-launch-health-check。用我的 Site Brief、真實文章／服務資料與預覽站作為檢查對象。先做內容準備度和導覽樹測試規劃；只有我提供正式網址且網站已真正發布，才執行上線健康檢查。全部用 PASS／FAIL／BLOCKED／NOT TESTED 與證據回報，不要虛構測試結果，不要自動合併或發布。

## 預期交付
學員自己擁有的 Repo、真實 Preview 網址、待補內容清單、部署驗證紀錄與安全更新方式。

## 給完全不會程式學員的 AI 能力確認

將下方文字複製貼給你的 AI，即可先確認能不能代你完成工作；你不必安裝程式：

> 請先確認：你能讀取我上傳的 ZIP 與 JSON 嗎？能在你的執行環境建立、修改檔案並執行 Astro Build 嗎？能經我授權寫入**我自己的** GitHub Repository、建立 Branch／Pull Request 嗎？能提供我真的打得開的測試網址，並檢查手機與電腦畫面嗎？請用「可以／需要我授權／無法做到」逐項回答，不能用猜的，也不要直接發布。

若 AI 缺少這些能力，請改用支援專案檔案、GitHub 連接、雲端建置與瀏覽器的工作模式，或請老師協助選擇工具。**不要因為模型說會寫程式，就認定它真的能部署網站。**

## 跨 AI／GitHub／Cloudflare 卡關時

若 AI 沒有本機 Git、只能呼叫 GitHub API、寫 Workflow 遇到 403、Cloudflare 只有讀取權限，或不能建立真實 Preview，先讀 跨 AI 相容性文件 `docs/student-builder-pack/AI-PROVIDER-COMPATIBILITY.md`（ZIP 與原始倉庫皆保留此路徑；[在原始倉庫閱讀](./AI-PROVIDER-COMPATIBILITY.md)）。先確認能力再操作；**不要把 Git 資料夾塞進 ZIP**，也不要因為 Cloudflare 有連接按鈕就直接首次部署。三條建站路線仍以 `astro-site-entry` 為準；Preview 與發布程序仍以 `astro-pr-preview`／`astro-starter-deploy` 為準。
