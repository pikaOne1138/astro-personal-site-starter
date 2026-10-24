# Astro Personal Site Starter

Astro 架站工作坊的**設計研究展示站，以及學員獨立網站 Starter 的開發來源**。學員不需要 Fork 這個 Repo：學員在 `/starter/` 規劃，取得建站資料包，交給 AI 在**自己的** GitHub Repository 建站。

目標：給零程式背景的學員一個可理解、可改、可部署、UI 有設計品質的 Astro 個人網站起點。不是 SaaS、CRM 或完整商業後台。

展示站（Cloudflare Pages）：https://personal-site-starter.pages.dev/

## 這個 Repo 有什麼

| 路徑 | 內容 |
|---|---|
| `src/pages/` | 展示站頁面：各主題的 Demo（`/[kind]/[theme]/`）、`/blocks/`、`/effects/`、`/layouts/`、`/section-patterns/`、`/templates/`、`/starter/` 規劃器、`/guide/` 學員指南 |
| `src/components/`、`src/data/` | 元件與資料。**有哪些元件、特效、版型、區段樣板，以 `src/data/` 底下的 registry 為準**（`blocks.registry.json`、`effects.registry.json`、`layout-directions.json`、`section-patterns.registry.json`） |
| `AGENTS.md` | 在這個 Repo 工作的 AI 要遵守的規則，以及該讀哪個 Skill |
| `COMPONENTS.md` | Blocks 的使用介面與規範 |
| `.ai/` | AI Skills 與參考資料；**會隨學員資料包出貨** |
| `docs/student-builder-pack/`、`docs/student-intake/` | 學員資料包的文件與訪談包；**會出貨** |
| `docs/`（其餘） | 老師端文件，不出貨。例如 `layout/layout-assembly.md`（版型組裝）、`github-pr-preview-setup.md`（本 Repo 的預覽機制）、`component-backlog.md`、`quality/`（品質契約與尚未完成的驗收）、`workshop/student-flow.md`（學員流程設計）、`interview-evaluation/`（評測資料，含答案）、`archive/`（已取代的文件） |
| `scripts/` | 建置、驗證與 QA 腳本；`build-student-pack.mjs` 產生學員資料包 |

## 學員流程

1. 在 `/starter/` 選擇網站方向、版型、品牌、導覽與內容，下載 Site Brief JSON。
2. 在 `/guide/` 下載建站資料包，並複製**唯一正式的起始提示詞**（來源是 `docs/student-builder-pack/START-BUILD-PROMPT.txt`，`/guide/` 的按鈕直接讀取這個檔）。
   走 C 路線（直接與 AI 訪談）則複製 `docs/student-builder-pack/START-INTERVIEW-PROMPT.txt`（`/guide/` 的「從對話開始」讀取同一個檔），它不需要先上傳資料包。
3. 把 Site Brief 與資料包交給能讀寫檔案、執行建置並經授權操作 GitHub 的 AI。
4. AI 在學員自己的 Repo 建立 Branch 與 PR，經過實際存在的 Preview，學員確認後才合併與發布。

匯出器產生的是可運作的網站骨架；真實內容、版型適配與視覺驗收還要接著完成。學員資料包的入口是 `docs/student-builder-pack/START-HERE.md`。

## 本機開發

```bash
npm install
npm run dev
npm run build   # 靜態輸出在 dist/
npm run preview # 預覽建置結果（全文搜尋需要先 build）
```

`npm run build` 會執行 Astro、Pagefind 全文索引、額外的搜尋索引與輸出驗證。全站搜尋由 Pagefind 在建置後對靜態 HTML 建立索引，所以 `astro dev` 沒有全文搜尋。

## 部署

- **展示站以 Cloudflare Pages 為準**：專案 `personal-site-starter` 連接這個 Repo，正式分支 `main`；每個 PR 分支的 Preview 網址以 Cloudflare 在 PR 回報的為準。`wrangler.jsonc` 另外設定了 Workers 靜態資產。
- **本 Repo 不再用 GitHub Pages 當展示站或 PR 預覽**（轉為私人後 `github.io` 無法使用）。`.github/workflows/` 裡舊的 GitHub Pages 發布與預覽流程（機制見 `docs/github-pr-preview-setup.md`）等待移除；移除前不要依賴它。學員自己的網站仍可選 GitHub Pages 或 Cloudflare，那是學員資料包裡的 Skill 在處理。
- 部署的實際狀態以平台的部署紀錄與可開啟的網址為準，不能只憑本地設定判斷。修改部署 Workflow、變更 DNS 或合併 PR 都需要另外核准。

## 守則

- 保持靜態優先，不自行加入 CRM、會員、金流或預約後台。
- 不虛構資格、見證、價格，也不讓未設定的表單、預約、訂閱看起來可用。
- 修改前先讀 `AGENTS.md`，改 UI 前先讀 `.ai/astro-ui-craft/SKILL.md`。
- 合併前要有實際的 Preview 與使用者的明確同意。
