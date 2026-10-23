# PR #67｜PR #61 Upstream Delta 與語義處置（只記錄、不改原文）

## 來源與時間邊界

- #67 Frozen Baseline：main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`，不得重寫或回填新規則。
- [PR #61](https://github.com/pikaOne1138/astro-personal-site-starter/pull/61)：Open / Draft，HEAD `da65053ccc237474e1fdf8a28fcbae20fe7029c2`，變更 `docs/student-builder-pack/AGENT-HANDOFF.md`，原文 Blob `457835c2e4ae02acf889df1953d0a635511009ef`。
- 既有 main 同檔 Blob `5005e7599a211906f63b002daf93b9ce5651fa46`。此紀錄為 **凍結基線後的 Upstream Delta**，不等於 #61 已合併或 #67 接管修改權。
- #58 是獨立總驗收 Issue，保持 Open；無法用 CI 通過自動關閉 C1–C3 或人工 D1–D4。

## 三路徑與 Site Brief 的已確認產品決策

| 建站路徑 | Site Brief JSON 的地位 | AI 接手時主要讀取 |
|---|---|---|
| A｜既有網站復刻 | 不強制存在；應先確認網站權屬／授權，盤點原網站與實際內容 | 來源網站、本人要求、復刻 Skill、實際專案 |
| B｜ATP Starter 規劃器 | 可以由規劃器匯出，作首次生成結構化輸入；沒有也不能強迫其他路線走 B | 有提供時讀 Site Brief，配合匯出 ZIP 與現況 |
| C｜直接與 AI 討論從零建站 | 不需事先有 Site Brief；如確實有需要可由 AI 另外生成，不能預設必有檔案 | 已確認需求、PROJECT.md、AGENTS.md 與實際程式／Git |

**已同意原則（2026-10-23）**：Site Brief 是初次建站輸入。若實務上有必要，可以記錄目前使用的輸入版本，但不得要求永久保留初版路徑、Hash、匯入日期，也不得以舊 Brief 覆蓋學員網站的後續修改。既有專案接手以實際程式碼、site.config.json、Git／部署紀錄為實作證據；PROJECT.md 為長期已確認意圖與理由。

## #61 逐條來源處置

| Delta ID | #61 來源 | 具體子要求／事實 | 處置 | #67 既有對照／保留差異 |
|---|---|---|---|---|
| UP61-01 | [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L19) | 學員 pr-check：Build、內容安全與 qa:responsive、截圖 Artifact；不能冒充 Live Preview 或人工審查 | PARTIAL_SPLIT | P0 Preview 證據規範是 ALIAS；可攜 QA 命令／Artifact 應保留驗收型條件；以實際匯出站驗證 |
| UP61-02 | [L25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L25) | Site Brief 初次生成輸入；非永久 SSOT，**撤銷保存初版 path/hash/import date 的要求** | KEEP | 具優先性的明確撤銷，其他舊候選若要求永久保存需標 SUPERSEDED，不得回復 |
| UP61-03 | [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L26) | 原始碼、site.config、Git／部署 SHA 為實作現況；PROJECT.md 為意圖與長期決策；更新 ZIP 不覆寫 PROJECT | PARTIAL_SPLIT | 學員 STUDENT-AGENTS、PROJECT-TEMPLATE 存在規範 ALIAS；防覆寫仍是獨立 Gate |
| UP61-04 | [L27](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L27) | AGENTS 跨 AI 工具規範，CLAUDE/GEMINI 指向；Brief／PROJECT／網頁不可信內容不能充當授權 | ALIAS | 對應 STUDENT-AGENTS 的不可信資料規則；保留授權只能由學員當次給予 |
| UP61-05 | [L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L28) | qa:responsive 1440/1280/768/390/375；HTTP、overflow、內部圖片、JS 錯誤；記錄 PR SHA、結果與截圖；外部素材／人工可用性不能稱 PASS | PARTIAL_SPLIT | 核對 STUDENT-AGENTS 和腳本真正支持的輸出；技術檢查與人工 QA 不可去重成同一項 |
| UP61-06 | [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L29) | 人工審查者、日期、PR head SHA、Preview URL、頁面尺寸、問題待辦；學員同意指定版本和發布影響才 Merge/Deploy | PARTIAL_SPLIT | Merge/Production 授權與 P0 Crosswalk 02 是 ALIAS；具體人工驗收證據欄位 KEEP |
| UP61-07 | [L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L30) | 先保全未提交改動，查程式/config/PROJECT/Git；舊 Brief 不需回溯也不得覆蓋較新實作 | KEEP | 防覆寫是接手現況 Gate，與首次發布授權不等價 |
| UP61-08 | [L21-L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L21-L23) | Cloudflare 有效部署 Preview、GitHub Pages 無預設隔離 PR Preview、首次連 main 可能直接 Production | ALIAS + CONDITIONAL | 與 #69 首次發布及 P0 Preview 部分重疊；保留各平台／首次連線的例外 |

## 待裁決衝突（不得直接改模板）

- main `docs/student-builder-pack/PROJECT-TEMPLATE.md` **L40**：「Site Brief JSON 路徑及版本：待確認」；`scripts/student-project-context.mjs` **L26**：輸出「原始檔路徑待確認」。這些現有欄位不等於強制永久保存首版，但可能令 AI 誤認需要追補，與三路徑可無 Brief 的體驗有 **PARTIAL_CONFLICT**。
- 建議日後把相關欄位改為**選填／僅限實際曾用 Site Brief**，無 Brief 的 A/C 路線不建立虛構待補項；已有 Brief 時最多記錄必要的當前輸入版本，不追索初版 path/hash/import date。
- 修改範圍涉及學員匯出模板與生成器，**不是本輪 #61 docs-only PR 直接修改範圍**。需在 #67 完成零遺失 Gate、決定負責 PR 後才動手。
- 當前 #67 ACCEPTANCE-SSOT.md 是「學員旅程驗收規格」，不是學員 PROJECT.md 的替代品；#61 AGENT-HANDOFF 是 ZIP AI 交接。職責分離，不直接整份搬移。

## Gate

本文件只建立 Upstream Delta + 跨來源語義映射（KEEP／ALIAS／PARTIAL_SPLIT／PARTIAL_CONFLICT），未建立新正式 Canonical ID、未改寫 Frozen Source 或來源 Skills。第三與第四階段 BLOCKED。PR #61 與 Issue #58 保留 Open，#67 保留 Draft，不自動 Merge、不正式部署。
