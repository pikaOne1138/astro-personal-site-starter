# 學員個人網站 AI 建站資料包

這份 ZIP 是**自給自足的程式來源＋設計指引包**，不是需要學員 Fork 老師 Repo 的說明文件。

內容包括 `.ai/` Skills 和研究參考附件、Layout 方向原始構圖、Editorial Recipes、Blocks／Effects 元件、相關樣式與 Registry、`scripts/export-starter.mjs` 生成器，以及供 AI 使用的 AGENTS.md。

## 學員操作
1. 從 `/starter/` 下載自己網站的 Site Brief JSON。
2. 從 `/guide/` 下載此 ZIP。
3. 把兩份檔案交給可存取檔案且能操作 GitHub 的 AI，使用 `/guide/` 的「開始建站」按鈕複製**唯一正式起始提示詞**（來源為 `docs/student-builder-pack/START-BUILD-PROMPT.txt`），不要使用另一套簡化提示詞。

目前主匯出器可組裝 25 個方向；新增十三款仍為 in-progress Adapter，尚未核定 Ready。AI 應依 `layoutSlug`、`definitions.mjs` 的 engine 與 `docs/student-builder-pack/EXPANDED-LAYOUTS.md` 選擇對應 Renderer。產生的網站是 Beta 第一版，AI 仍需按真實內容補齊必要內頁、圖片與服務資訊，並和學員一起確認、預覽及部署；ZIP 下載本身不是網站發布。

## 資料包版本
`/guide/` 會顯示目前下載包的來源 Commit；ZIP 根目錄的 `BUILDER-PACK-VERSION.json` 保存相同資訊。請將 Site Brief JSON 與**同一個測試站版本**的 AI 建站資料包交給 AI。若兩者來自不同測試環境，重新從目前的 `/starter/` 與 `/guide/` 下載。

## 外部媒體與部署安全

- Layout 的示意圖片／音訊可能仍引用外部原型；請先讀 `docs/student-builder-pack/MEDIA-REPLACEMENT.md`，以學員有授權的資產或清楚標示的 Demo placeholder 替換。
- 學員生成 Repo 的 `.github/workflows/pr-check.yml` 僅負責安全 Build 驗證和產生 Artifact，**不是**可以瀏覽的網站預覽。
- GitHub Pages 的 `.github/workflows/deploy.yml` 預設只能由授權者手動在 main 觸發，不能將未經學員核准的內容自動公開；若要 GH Pages PR URL，需要另外配置安全隔離的 Preview 流程。
- Cloudflare Pages 可使用其 Git 連線的 Preview Deployments，但必須由 AI 核對學員自己的 PR SHA 與真實 URL，不能猜測。

## 最新工作坊網址與預覽
請從老師提供的**實際可開啟**工作坊首頁進入 `/guide/`、`/guide/prepare/` 與 `/starter/`，下載該版本資料包。工作坊內部 GitHub Pages `/pr-preview/pr-N/` 路徑可能因部署調整失效，**不是學員必須知道或手動拼出的穩定網址**。若提供測試版分支網址，應先核對 HTTP 與版本標記；若失效，回到老師提供的最新入口，不要默默切成另一版本。
