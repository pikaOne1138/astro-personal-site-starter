# 老師 Repo｜GitHub Pages PR 預覽基礎設施

> 對象：維護這個研究展示 Repo 的人。**這份文件不會進學員 ZIP。** 學員自己網站的預覽與發布流程是 `.ai/astro-pr-preview/SKILL.md`；學員的 Repo 不會自動具備這裡描述的 Workflow，不能把這裡的固定 owner、repo 名稱或機器人網址搬給學員。

## 目標

學員不需本地跑站、購買網域、Cloudflare 或設定額外 PAT。維持 **GitHub Pages → GitHub Actions** 發布來源。每次 AI 改版開 PR，成功建置後自動得到獨立的線上預覽網址。

## 架構

```text
                   PR #N (same-repository branch)
                              |
                       PR Preview Build
                   (read-only, no deploy token)
                              |
                  preview-site artifact + event.json
                              |
             trusted main-branch workflow_run
                              |
       npm run build (main, production base)
          + saved previews from gh-pages snapshot
          + add/remove PR N preview artifact
                              |
           GitHub Pages deploy-pages (artifact)
                              |
               PR bot comment with preview link

main push -> same trusted workflow -> keep existing previews -> deploy production
PR closed -> remove its preview -> deploy production + remaining previews
```

涉及檔案：`.github/workflows/pr-preview.yml`、`.github/workflows/deploy-pages.yml`、`scripts/apply-pr-preview.mjs`、`scripts/reconcile-pr-previews.mjs`、`astro.config.mjs`（可設定 `ASTRO_BASE_PATH`）。

`gh-pages` 分支只是最新組裝結果的快照，讓預覽在之後的正式部署後仍然存在。它**不是** GitHub Pages 的發布來源；發布靠 `actions/deploy-pages`，因為由 `GITHUB_TOKEN` 推送的內容本身不會觸發以分支為來源的 Pages 建置。

## 長期同步（Reconcile）

每次正式部署（main push、PR Preview Build 完成或手動執行），`scripts/reconcile-pr-previews.mjs` 會：

1. 取得目前仍 Open 的 PR 與各自最新 head SHA。
2. 只接受同倉庫 PR，且該 head SHA 對應成功的 `PR Preview Build`；下載其 `preview-event` 與 `preview-site`。
3. 檢查事件的 PR 號相符及 `index.html`，重新覆蓋預覽檔，寫入 `.preview-head.json`（SHA／Run ID）。
4. 刪除已關閉、來自 fork、或沒有最新成功建置的 PR 舊預覽。
5. API／下載失敗就停止發布，避免把過期頁面當作新版本。

預期行為：
- PR 更新後，只保留新 head SHA 的預覽。
- main 重新部署時，所有仍開啟的 PR 用各自最新成功的 Build 更新。
- PR 關閉時，對應預覽刪除。
- PR 有新 commit 但 Build 未成功時，舊預覽刪除，而不是顯示舊版。
- PR Preview Build 下載失敗時，整個正式部署標記失敗，避免錯誤宣告成功。
- PR head 尚在建置時，預覽可能暫時消失，待新 Build 成功後由後續 `workflow_run` 補上。

## 初次設定（維護者）

1. 確認 **Settings → Pages → Build and deployment → Source = GitHub Actions**。**不要改成 Deploy from a branch。**
2. 上述檔案經 review 才合併進 `main`。
3. 在 **Actions** 確認 `Deploy Astro to GitHub Pages` 在合併到 `main` 時成功，並確認正式站正常。
4. 對一個既有的 PR 補一個小 commit 觸發 `synchronize`，讓預覽建置。唯讀的 PR Build 成功後，`Deploy Astro to GitHub Pages` 會處理它的 artifact 並在 PR 留言預覽網址。
5. 點機器人實際貼出的網址，檢查 `/blocks/`、兩種網站類型、樣式、圖片與手機畫面。
6. 接受預覽後才合併。

預覽網址格式（**格式示例，不是已部署的證明**）：

```text
https://<owner>.github.io/<repo>/pr-preview/pr-<N>/
```

## 權限

Workflow 明確宣告權限：
- PR Preview Build：`contents: read`，無特權。
- 受信任的部署：`contents: write`（快照）、`actions: read`（下載 artifact）、`pages: write`、`id-token: write`（發布）、`pull-requests: write`（留言）。

若被組織或 Repo 的 Actions 政策擋住，檢查 **Settings → Actions → General → Workflow permissions**，再看 Action run 的錯誤。設計上不需要自訂 PAT。

## 安全界線

- 只接受同一 Repo 的分支；Fork PR 不發布預覽。
- 受信任的 Workflow 不執行 PR 上傳的任意 JavaScript，只複製靜態 build artifact 並檢查事件 metadata；GitHub Token 只在受信任的 main 部署 Job 使用。
- 正式站使用 `main` 的程式碼，不是 PR 的。
- 不要把私人文件、API 金鑰或祕密變數發布到公開預覽；靜態預覽是公開的。
- GitHub Pages 發布是全域的；Workflow 會序列化 Pages 部署，讓開啟中的 PR 預覽不會被並行部署蓋掉。
- 不要為了排錯取消 Pages 安全權限、改成 branch publishing，或把 PR 的不可信程式放進高權限部署 Workflow。
- PR 預覽是測試版本，CI 成功仍需人工視覺及功能驗收。GitHub Pages／CDN 的瀏覽器快取不保證立即一致，正式部署後以部署結果核實。

## Astro 路徑

正式站 base 與 PR 預覽 base 不同（預覽在 `.../pr-preview/pr-<N>/`）。連結與 `public/` 資產一律用 `import.meta.env.BASE_URL`；HTML／元件／資料不需要為預覽另備副本。

## 故障排查與恢復

先分清楚失敗在哪一關，再決定做什麼。AI 應先看真實的 Run／Job／Artifacts，再判斷是否有權執行修復。

| 階段 | 觀察證據 | 處置 |
| --- | --- | --- |
| PR Build / Astro Build | `PR Preview Build` 的 `npm run build` 失敗 | 修正程式或路徑，在 PR branch 提交，等新的 PR Build |
| PR Build 成功、Pages 前置步驟失敗 | `Deploy Astro to GitHub Pages` 的 main build、下載 preview-site、組裝或驗證失敗 | 找出失敗步驟與 artifact；不要只看 PR 綠燈。看 `Reconcile all open PR previews` 步驟與對應 Build run |
| Pages artifact 已上傳、OIDC 逾時 | `actions/deploy-pages`：`Failed to get ID Token`、`Request timeout` | 確認 workflow 有 `pages: write`、`id-token: write`；有權限不代表不會逾時。先辨認暫時性服務問題，避免無差別重試 |
| Re-run 後出現同名 artifact | `Multiple artifacts named "github-pages"` | **不要再 Re-run 該部署 Job 或失敗 Jobs**；同一 Run 的 artifacts 已重複，應產生新 Run |
| 部署成功但網址不對 | Live URL 驗證或機器人留言失敗 | 對照部署 HTML、路徑、CSS、圖片與 `BASE_URL`；不可宣稱成功 |

`punycode` 或 Node.js 棄用警告通常不是根因。「Ensure GITHUB_TOKEN has permission id-token: write」是通用提示，先核對 workflow 權限與真正的 request timeout。

### 需要全新 Run 時

正常事件鏈：PR 分支出現新 commit（`pull_request: synchronize`）→ 新的 `PR Preview Build` → `preview-event` + `preview-site` artifacts → 新的受信任 `Deploy Astro to GitHub Pages`（`workflow_run`）→ 組裝、上傳唯一的 `github-pages` artifact → 發布、實際 URL 驗證、機器人留言。

- **首選：** 有真正需要修的內容，就在既有 PR 分支修正並提交，push 會造成新的 `synchronize`。
- **程式碼正確、只需恢復預覽：** 在使用者允許、且確認 PR 分支 head 沒變後，可在同一 PR 分支建立一筆只用來觸發 CI 的空內容 commit（tree 與 parent 相同），以預期 SHA 條件更新分支。這是新 commit、新事件，**不是對舊 Job 按 Re-run**。不可 force-push，不可修改 `main`。
- `workflow_dispatch` 只會啟動受信任的部署主工作流，**不會自行產生該 PR 最新的 preview-site artifact**，不能當作「已重新部署 PR 最新版」。
- 不可重跑已經含重複 `github-pages` artifacts 的舊部署 Run；重跑舊 Run 不等同新 Run ID。
- 實例：曾經在 PR 預覽 build 與組裝都成功後，`deploy-pages` 因 OIDC request timeout 失敗；直接 Re-run 部署 Job 造成同名 artifact 錯誤。正確恢復是在 PR 分支推一筆觸發用 commit，取得新 Run。

### 確認真的完成

1. 查到**新**的 `PR Preview Build` Run；其 head SHA 等於剛提交的 PR 最新 SHA，Build 成功。
2. 查到因該 PR Run 完成而產生的**新** `Deploy Astro to GitHub Pages` Run，不是舊 Run 的 attempt 2。
3. Pages artifact 上傳與 deploy 成功，且該 Run 只有唯一供 `deploy-pages` 使用的 `github-pages` artifact。
4. `Verify live Pages URL returns PR's HTML` 通過，並查看機器人貼出的實際預覽網址。主站與 PR 預覽分別確認。
5. 做 UI／RWD／連結檢查（1440、1280、768、390px 實際畫面），提供「已驗證／尚未驗證」清單。
6. 未經使用者明確授權，不得 Merge。

### 向初學者說明時

只說三件事：壞在哪一關（寫程式／產生網站／上傳／發布／線上畫面）、AI 要做什麼（看真實錯誤後修正；同名 artifact 則從 PR 分支觸發新 Run，不再重跑舊的）、怎樣才叫成功（Build 成功 ＋ deploy 成功 ＋ 最新預覽網址打得開且內容一致 ＋ 使用者看過畫面）。不要貼猜測的網址就說「完成了」。

## 驗收清單

- [ ] PR Preview Build 成功
- [ ] Deploy Astro to GitHub Pages 成功
- [ ] 機器人留言含真實網址
- [ ] 預覽首頁與 `/blocks/` 正常
- [ ] 桌面與手機正確
- [ ] 沒有壞連結、壞圖或壞樣式
- [ ] 合併前正式站未改變
- [ ] 使用者明確同意合併

## 回復

若新 Workflow 在第一次合併時失敗，不要切換 Pages 來源。在新 PR 從 Git 歷史還原先前的 `.github/workflows/deploy-pages.yml` 並合併。只要來源仍是 GitHub Actions，先前的部署機制仍可使用。`gh-pages` 快照分支不是發布來源，無法單獨覆蓋正式站。

## 本 Repo 的 Cloudflare 設定（老師 Repo 專用）

本 Repo 同時發布到 Cloudflare，`astro.config.mjs` 的預設 base 是 `/`，`site` 取 `ASTRO_SITE_URL`，其次 `CF_PAGES_URL`。

- **Cloudflare Pages（預設）**：build `npm run build`、輸出 `dist`、Framework preset Astro。**不要**加 `ASTRO_BASE_PATH` 或 `ASTRO_SITE_URL`；Cloudflare 會提供 `CF_PAGES_URL`，Astro 用它產生 canonical、RSS、sitemap 與 robots.txt。
- **GitHub Pages Workflow**：明確傳入 `ASTRO_SITE_URL` 與 `ASTRO_BASE_PATH`，所以既有網址與 PR 預覽不受影響。
- **Cloudflare Workers 靜態資產（額外目標）**：`wrangler.jsonc` 宣告 `assets.directory: "./dist"`，deploy command 為 `npx wrangler deploy --config wrangler.jsonc`。Workers 不像 Pages 會提供 `CF_PAGES_URL`，要把 `ASTRO_SITE_URL` 設成實際對外網域，並放在**建置**環境變數，不是 Worker 執行期變數。不需要 `main`、adapter、`nodejs_compat`、KV 或 SSR。
- Node.js 版本以 `package.json` 的 `engines` 與 `.node-version` 為準，不在文件裡寫死。
- 自訂網域上線前要確認 canonical 來源；Pages 預覽部署需要和正式站分開的 noindex 政策。
- 不要更動 GitHub Pages 正式站的 base，也不要覆蓋它的部署 Workflow。

## 與學員流程的界線

- 學員的 Repo 若要有預覽，需要自己的隔離預覽方案（例如 Cloudflare Pages 預覽，或為單站裁切的 GitHub Actions 工作流程）；不可直接複製這裡的 `workflow_run`、`gh-pages` 快照與 Reconcile 設計。
- 學員流程見 `.ai/astro-pr-preview/SKILL.md` 與 `.ai/astro-starter-deploy/SKILL.md`。Cloudflare 部署設定也在 `astro-starter-deploy`。
- 本 Repo 同時有 GitHub Pages 與 Cloudflare Pages 預覽（PR 上會有兩個機器人的留言）。這是本 Repo 的設定，不代表學員 Repo 自動具備雙套預覽。
