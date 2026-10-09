# 個人網站 AI 建站包｜START HERE

本包給 AI 讀取；學員不用安裝 Node、CLI，也不需要老師的 GitHub Repository 權限。

## 學員只需要準備
1. 在網站規劃器 `/starter/` 選擇網站方向、Layout、內容與品牌設定，下載 Site Brief JSON。
2. 在同一段 AI 對話上傳 Site Brief JSON 與本 ZIP。
3. 告訴 AI：「請閱讀本資料包的 AGENTS.md 與 AGENT-HANDOFF.md，依 Site Brief 建立**我自己的** Astro 網站。先檢查你有沒有 GitHub 寫入、遠端運算、建置及 Preview 能力，一次只向我確認一個必要問題。先讓我看預覽，取得我的同意才正式發布。」

## AI 要做的事
- ZIP 有必要的 `.ai/` Skills、Layout 原始構圖、Blocks／Effects／Editorial 配方、相關 CSS、Registry 和 `scripts/export-starter.mjs`；請優先在**本 ZIP** 讀取，不要求學員 Fork/Clone 研究 Repo。
- 使用學員 JSON 生成獨立 Astro 專案並完成所選版型與內頁的適配；注意 12 Layout 原始展示為首頁 Prototype，生成器第一階段僅產生骨架。
- 以 `.ai/astro-pr-preview/SKILL.md` 分流 GitHub Pages 或 Cloudflare 的預覽與發布。配置、金鑰、網域須使用學員自己的帳號和 Repo。
- 檢查 Build、實際 Preview、桌機/手機、圖片、文章、導航及搜尋。沒有實測不得稱成功。
- 未經學員明確允許，不 Merge PR、不切換 DNS、不發布正式環境。

## 預期交付
學員自己擁有的 Repo、真實 Preview 網址、待補內容清單、部署驗證紀錄與安全更新方式。

## 給完全不會程式學員的 AI 能力確認

將下方文字複製貼給你的 AI，即可先確認能不能代你完成工作；你不必安裝程式：

> 請先確認：你能讀取我上傳的 ZIP 與 JSON 嗎？能在你的執行環境建立、修改檔案並執行 Astro Build 嗎？能經我授權寫入**我自己的** GitHub Repository、建立 Branch／Pull Request 嗎？能提供我真的打得開的測試網址，並檢查手機與電腦畫面嗎？請用「可以／需要我授權／無法做到」逐項回答，不能用猜的，也不要直接發布。

若 AI 缺少這些能力，請改用支援專案檔案、GitHub 連接、雲端建置與瀏覽器的工作模式，或請老師協助選擇工具。**不要因為模型說會寫程式，就認定它真的能部署網站。**
