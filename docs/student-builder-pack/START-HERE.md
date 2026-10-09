# Astro AI 建站指引包｜START HERE

本資料包供 **AI 建站代理** 閱讀；學員不需要看懂程式、不需輸入終端機指令。

## 學員提供
1. 在 AI 網頁對話上傳 `Site Brief JSON`（不必先放到 GitHub）。
2. 上傳本 ZIP；若 AI 平台不能直接讀 ZIP，請在瀏覽器下載並解壓縮後上傳內部文件，或用支援 ZIP 讀取的 AI 工具。
3. 貼一句話：「我已上傳 Site Brief JSON 與 AI 建站指引包，請幫我建立獨立網站，先確認你有 GitHub 寫入與 PR 能力。」

**不必先把 JSON 上傳 GitHub**。如果開發需要持久設定檔，AI 再依獨立網站專案建立、提交與說明。

## 技術與架構約定（AI 自行遵守）
- 使用 **Astro 靜態網站**，依學生的 Site Brief 產生獨立網站。預設不引入其他網站框架、不新增資料庫或後端服務。
- 使用本包內 Skills 與 Registry 作為設計、內容與功能規範；同時核對最新 GitHub 原始碼。學員不需在提示詞指定 Astro、Layout、Blocks 或指令。
- 本包提供開發規範與參考資料，**不包含完整 Astro Starter 程式碼**；不能只靠 ZIP 就宣稱網站已完成。

## AI 工作要求
- 這個資料包包含建站指引、目前的相關 Skills 與 Registry 快照，但**不是完整 Astro Starter 網站原始碼**。請用 GitHub 授權從 `pikaOne1138/astro-personal-site-starter` 的**最新狀態**核對布局原型、Skills、Registry 與實際程式碼；不要根據舊聊天記憶猜測版本。
- 先確認 AI 網頁環境能遠端建立/修改 Repo、建立 Branch 和 PR，且有雲端建置與預覽路徑。單純具備聊天能力或唯讀 GitHub 連接**不足以完成建站**。
- 先讀 `AGENT-HANDOFF.md`，其餘資料由 AI 自行檢索。不要讓學員逐一貼 Skill 路徑或執行命令。
- 獨立個人站不可覆蓋教學展示站；首頁 Prototype 不等於完整多頁網站。
- 實際網站需依 Layout → Section Patterns → Blocks → Effects → Brand tokens 的分層，填入學員核准的真實內容；空白服務、假表單、虛構證照/見證不得正式公開。
- AI 必須真的驗證編譯、四視口和預覽；不能只宣稱「已完成」。
- **Branch → PR → 雲端 Build/Preview → 學員同意 → Merge/Deploy**。先讀本包 `skills/astro-pr-preview/SKILL.md` 判斷學員使用 GitHub Pages 或 Cloudflare Pages／Workers；兩平台預覽機制不同，不能用研究 Repo 的網址替代。沒有學員明確同意不可 Merge、部署、修改 DNS。
- 所有學員操作都在瀏覽器；AI 可以在自己的遠端運算環境使用必要程式，但不得要求學員安裝 Node/CLI/桌面工具。

## 學員應該拿到的成果
- 自己的 GitHub Repo 網址
- 主要與內頁的預覽網址（實際可開啟，不造假）
- 內容缺口與真實未串接服務清單
- PR 網址、Build 結果與手機/桌面視覺 QA
- 學員確認後的正式網址與更新 SOP
