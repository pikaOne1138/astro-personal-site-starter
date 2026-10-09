# 學員獨立網站 AI 操作規範

此文件只適用於**學員自己建立的網站 Repo**，並非 `pikaOne1138/astro-personal-site-starter` 研究展示 Repo 的 `AGENTS.md`。

## 先辨識可用資源
- 這份 ZIP 的 Skills 在 `skills/<skill-name>/SKILL.md`；Registries 在 `reference/`。ZIP **沒有**研究 Repo 的 `.ai/`、`src/`、`scripts/`、`.github/workflows/` 原始目錄。
- 先讀 `START-HERE.md`、`AGENT-HANDOFF.md`、`reference/UPSTREAM-SOURCES.md` 與學員提供的 Site Brief JSON；確認學員 Repo 內實際有哪些程式／設定，再執行操作。
- ZIP 內有些研究 Skill 會提到原始碼、參考文獻或工具；若不在 ZIP 與學員 Repo 中，**不能假裝已讀取或直接呼叫**。如果能存取研究 Repo，才核對最新原始資料；否則向學員說明缺少的必要來源，先完成可行部分。
- 不要求學員 Fork 研究 Repo。不得更改研究 Repo，也不要把研究 Repo 的網站、部署 Workflow、路徑或預覽 URL 複製到學員站。

## 建站與維護
1. 依 Site Brief 規劃網站資訊架構、真實內容、Layout、Blocks 與品牌視覺。首頁原型不等於完整網站。
2. 需要新網站時讀 `skills/astro-site-assembly/SKILL.md`；請先確認匯出腳本/網站程式是否實際可取得，因 ZIP **不是完整程式庫**。
3. 首次部署讀 `skills/astro-starter-deploy/SKILL.md`。
4. 更新與 PR 預覽讀 `skills/astro-pr-preview/SKILL.md`；分辨 GitHub Pages、Cloudflare Pages 與 Workers，僅使用學員實際配置的部署路線。
5. 建立學員自己 Repo 的 Branch + PR；只有 Build 與真實 Preview 網址可驗證後才能交付驗收。無法進行雲端操作或瀏覽器 QA 時必須明講。
6. 學員親自確認後才 Merge / Publish；沒有同意不更動 DNS、公開內容或服務設定。
7. 不得捏造專業資格、客戶評價、文章、真實預約、表單成功或搜尋索引狀態。
