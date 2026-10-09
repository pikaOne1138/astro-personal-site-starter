---
name: astro-pr-preview
description: Safely build, verify, preview, and release student-owned Astro sites with GitHub PRs on either GitHub Pages or Cloudflare Pages/Workers, choosing the actual configured hosting platform.
---

# Astro PR Preview & Safe Release｜學員雙平台預覽與安全發布

## 目的
本 Skill 提供**學員自己的 Repository** 可重複使用的 Branch → PR → Build → Preview → 人工驗收 → 核准 Merge → Production 工作流程。**同時支援 GitHub Pages 與 Cloudflare**，不假設任一平台為唯一正解。搭配 `.ai/astro-starter-deploy/SKILL.md`（首次部署／網域／設定）及 `.ai/astro-site-maintenance/SKILL.md`（後續維護）。

目前研究展示 Repo 剛好**雙平台部署**：GitHub Pages 的自訂 Actions 預覽與 Cloudflare Pages 的 Git 整合預覽均曾在 PR #40 回報成功。這是本 Repo 的證據，**不是**任何新學員 Repo 自動具備雙套預覽。

## Step 0｜先辨識環境，不能猜
1. 讀學員 Repo 的 `AGENTS.md`、`README.md`、`astro.config.mjs`、`package.json`、`.github/workflows/`，與其本人確認的正式網址；再核對 GitHub Pages Settings 或 Cloudflare Dashboard／PR 的真實部署紀錄。
2. 標記實際使用的部署路線：**GitHub Pages／Cloudflare Pages／Cloudflare Workers 靜態資產／雙平台／尚未完成設定**。只看到 `wrangler.jsonc` 或 `CF_PAGES_URL`，不足以證明 Cloudflare Git Preview 已啟用；看到 GitHub Actions 也不足以證明 Pages 網站已成功發布。
3. 確認正式分支、PR 分支、是否有可用的公開或受保護 Preview、部署帳號權限、Repo Public/Private、Astro `site`／`base`。若學生不知道，逐步引導查看，不要求分享 Token、密碼或個人憑證。
4. 同時啟用兩邊時，列出**各平台**真實 Production／Preview 與狀態，不自動關掉其中一個；學員只使用一個平台時，**不要**要求安裝另一個平台或複製研究 Repo 的複雜 Workflow。

## 共同安全流程（兩平台皆適用）
1. 讀相關 UI、內容與設計 Skills；只修改**學員自己的 Repo**。由目前有效正式分支建立 feature branch，不直接寫入 main。
2. 保持 `import.meta.env.BASE_URL` 與 route/asset URL 正確。檢查已設定的 Node 版本、安裝與 `npm run build`；不得虛構測試成功。
3. 建立 PR 並記錄 PR number、head SHA、Build/Checks 狀態。
4. 根據下方**已確認的平台**取得真實 Preview 網址；比對部署使用的 commit/SHA 是否為 PR 最新 head。Build 綠燈不等於預覽網站可用。
5. 開啟並驗證 Preview：首頁、CSS/圖片、導航、文章/內容頁、Pagefind、RSS、Sitemap、404；對 UI 檢查 1440／1280／768／390、鍵盤、觸控與 reduced-motion。對 Preview 的 `noindex`、隱私資料及外部服務測試資料做檢查。
6. 告知學員本次變更、真實 Preview URL、已驗證/未驗證項目；**必須取得明確同意才 Merge**。
7. Merge 後核對正式環境的 deploy status、commit、網址與重要功能；若更新失敗不要稱成功。

## Route A｜GitHub Pages
- 初次部署閱讀 `astro-starter-deploy`；確認 GitHub Pages 的 Source、Repo 類型、自訂網域與適用方案，`site`、`base` 及 `ASTRO_BASE_PATH` 隨**學員** Repo/網域調整。
- **GitHub Pages 不會因為建立 PR 就天然產生獨立 Preview URL。** 必須先檢查學員 Repo 是否真的安裝安全的 PR 預覽 Workflow／外部 Preview Hosting；沒有就回報「尚無線上 Preview」，不要捏造網址。可以先 Build/檢查 PR 再協助設定適用的隔離 Preview，必須經學員同意變更部署架構。
- **本研究 Repo 特例（不可原封不動搬給學員）**：`.github/workflows/pr-preview.yml` 以只讀權限產生 `preview-event`／`preview-site` Artifacts；可信任的 `.github/workflows/deploy-pages.yml` 在預覽建置成功後整合並透過 `actions/deploy-pages` 發布，在真實 HTML 驗證後留言 `/astro-personal-site-starter/pr-preview/pr-N/`。其 `workflow_run`、snapshot `gh-pages`、Reconcile 與固定路徑皆為展示 Repo 的部署設計。
- 只有學員 Repo **確實使用相同架構** 時才依 `references/deployment-recovery.md` 排查 GitHub Pages 特定 Workflow；不可把研究 Repo 的固定 owner、repo 名稱及 bot URL 當學員的網址。
- Fork PR 不可跳過原先只允許同 Repo branch 的權限限制。

## Route B｜Cloudflare Pages（Git 整合）
- 核對 Cloudflare Pages 專案已連接學員自己的 GitHub Repository、Production branch、build command、輸出目錄（Astro 靜態通常 `dist`），並確認非 Production branch／PR Preview Deployments 的實際設定。
- 有啟用 Preview 時，Cloudflare 會在 GitHub PR 的 Check/Comment 或 Cloudflare Deployments 提供真實網址。可能同時有**特定部署版本** URL 和**分支最新版本** URL；審核某個 PR commit 時優先看與 head SHA 對應的部署，分支 URL 可能隨後續提交更新。
- 以 **Cloudflare 自己回報**的 URL、status、commit、log 驗證。不能猜 `*.pages.dev` 或把 GitHub Pages `/pr-preview/pr-N/` 路徑套過去；未啟用 Git 整合/預覽時不得聲稱有 Preview。
- 檢查 Preview 是否被搜尋索引、是否含尚未核准的內容；Cloudflare Preview 的正式域名、綁定與自訂網域規則依學員專案驗證。

## Route C｜Cloudflare Workers Static Assets
- `wrangler.jsonc` 的 `assets.directory` 只能證明 Workers 靜態資產的設定意圖，**不能保證 Pages Git Preview 或 Workers branch preview 存在**。
- 查看實際使用 Workers Builds 的 Git 整合、分支 Preview，或 Wrangler／CI 部署；只有完成並有可訪問的實際 Preview URL 才回報成功。不要用 Pages 特有的 `pages.dev` URL 規則猜 Workers 預覽。
- 若尚無獨立 Preview，先報告並協助設計不覆蓋正式環境的預覽部署方法；修改權限、環境或部署設定要先取得同意。

## 雙平台情境
- 分別列出 GitHub Pages 與 Cloudflare 的 PR head SHA、Checks、Preview URL 和 UI 驗證結果；不能只因兩個 Bot 都留言就宣稱兩份網站畫面一致。
- 不要自動停掉另一平台、改可見性、改 DNS 或清除舊工作流。學員正式選定一個平台後，仍應保留「選擇部署路線」的跨平台 Skill 能力。

## 故障與完成標準
- PR Build 失敗：修復程式並重新建立有效檢查；部署失敗：依對應平台 Log 診斷，勿無差別重跑。
- Preview URL 沒出現：先查 Git 整合／分支與權限／Workflow 是否真的支援，而不是直接猜網址。
- Preview 舊版：比較 PR head SHA 與部署 commit，更新到最新 head 再驗證。
- 原始碼 Public 不代表未發布 Preview 可忽略隱私；Private 不代表預覽網站只限授權者。
- 若無法執行瀏覽器驗證，明確標註待人工 QA。
- 永遠先取得學員批准才合併與發布，不虛報功能、資格、表單、預約或部署成功。

## 給學員的通用提示詞
「請先查看我自己的 GitHub Repository 與實際使用的託管平台（GitHub Pages、Cloudflare Pages 或 Workers），依 astro-pr-preview 與 astro-starter-deploy Skill 修改網站。建立 Branch 和 PR，檢查 Build，找到**平台真正產生、對應最新 Commit**的預覽網址給我，確認電腦與手機畫面；我明確同意後才合併與發布。不要把教學研究 Repo 的預覽網址當成我的網站。」
