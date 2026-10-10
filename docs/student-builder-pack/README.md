# 學員個人網站 AI 建站資料包

這份 ZIP 是**自給自足的程式來源＋設計指引包**，不是需要學員 Fork 老師 Repo 的說明文件。

內容包括 `.ai/` Skills 和研究參考附件、Layout 方向原始構圖、Editorial Recipes、Blocks／Effects 元件、相關樣式與 Registry、`scripts/export-starter.mjs` 生成器，以及供 AI 使用的 AGENTS.md。

## 學員操作
1. 從 `/starter/` 下載自己網站的 Site Brief JSON。
2. 從 `/guide/` 下載此 ZIP。
3. 把兩份檔案交給可存取檔案且能操作 GitHub 的 AI，貼上：「請讀 START-HERE.md，根據我的 JSON 幫我建立自己的網站，先預覽、我同意後才正式發布。」

網站產生器先生成骨架；AI 還需要按選定 Layout 完成構圖移植、填入真實內容、測試與部署。這些不是 ZIP 一下載就自動完成。

## 外部媒體與部署安全

- Layout 的示意圖片／音訊可能仍引用外部原型；請先讀 `docs/student-builder-pack/MEDIA-REPLACEMENT.md`，以學員有授權的資產或清楚標示的 Demo placeholder 替換。
- 學員生成 Repo 的 `.github/workflows/pr-check.yml` 僅負責安全 Build 驗證和產生 Artifact，**不是**可以瀏覽的網站預覽。
- GitHub Pages 的 `.github/workflows/deploy.yml` 預設只能由授權者手動在 main 觸發，不能將未經學員核准的內容自動公開；若要 GH Pages PR URL，需要另外配置安全隔離的 Preview 流程。
- Cloudflare Pages 可使用其 Git 連線的 Preview Deployments，但必須由 AI 核對學員自己的 PR SHA 與真實 URL，不能猜測。
