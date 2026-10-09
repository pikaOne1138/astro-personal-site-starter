# ZIP 與研究原始碼的邊界（給 AI）

這份 ZIP 是提供學員 AI 的「操作／設計指引包」，**不是完整 Astro 網站源碼、完整 Skill 引用附件或一鍵建站程式**。學員不需 Fork 研究 Repo，也不會因此擁有研究 Repo 的資料夾。

## ZIP 內真正存在
- `START-HERE.md`、`AGENT-HANDOFF.md`、`README.md`
- `reference/AGENTS.md`：學員專用規範，**不是**研究站原始 AGENTS
- `skills/<name>/SKILL.md`：ZIP 所列 8 個 Skill 的主文件快照；路徑以 ZIP 根目錄為基準
- `reference/blocks.registry.json`、`reference/section-patterns.registry.json`、`reference/layout-directions.json`

## ZIP 沒有、不得假裝位於學員 Repo
- 研究站的 `.ai/astro-*/references/`、`recipes/`、`library/`、`checklists/`，以及未打包的 Skills（例如 maintenance、motion、content publishing）。
- `src/` 下的真實 Astro Layout / Components / CSS、`scripts/export-starter.mjs` 與檢查腳本。
- `.github/workflows/`、`docs/github-pr-preview-setup.md` 等研究站專用 GitHub Pages Preview 流程。

這些出現在 Skill 主文件裡時，**是研究站資料來源提示，不是本 ZIP 或學員 Repo 內可直接使用的路徑**。請先檢查有沒有檔案；只有具備存取權限時，才可從 https://github.com/pikaOne1138/astro-personal-site-starter 取得最新來源，並判斷授權、版本和適用性。若該 Repo 已設為 Private、連接器無權讀取或附件缺失，必須明確回報，不能假裝已讀取、也不能把不存在的 `node scripts/export-starter.mjs` 當成可執行命令。

## 路徑轉換規則
- 研究 Repo 的 `.ai/astro-X/SKILL.md` 若已收錄 ZIP，應讀 `skills/astro-X/SKILL.md`。
- 研究 Repo 的 `src/data/blocks.registry.json` → ZIP 的 `reference/blocks.registry.json`；其他兩份 registry 同理。
- 沒有收錄 ZIP 的研究檔案，必須先取得來源；無法取得時記錄缺口，協助學員選擇可行替代流程。
- 任何引用 GitHub Pages `/astro-personal-site-starter/` 路徑或研究站專用 preview workflow，不能直接套用到學員站。

## 交付真實性
學員自己的 Astro Repo 可由 AI 在授權遠端環境建立；檔案包本身不等於自動完成建站。要交付可部署網站，必須有真正的程式、通過 Build，並確認學員選擇平台的真實 Preview／Production URL。
