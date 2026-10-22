# Phase 2｜P0 單一計數視圖（暫定）

本檔是 [CLAUSE-COVERAGE-MATRIX.md](CLAUSE-COVERAGE-MATRIX.md) 的**計數視圖**，而非新增 SSOT。來源基線仍固定在 main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c。從 41 個父候選、31 個子候選、35 個檢查點形成 **86 個末端記錄**；計算方法是：有子候選就不計父候選，有更細檢查點就不計其上層子候選。這只是消除父子重複的工作清單，**86 並非 86 個唯一規範條款**，因為其中含證據欄位、可適用性檢查、跨文件同義內容。

| 工作 ID | 原候選 ID | 內容 | 暫定語義類型 | 來源 | 審核 |
|---|---|---|---|---|---|
| `P0-U001` | `GATE-001.01` | 同意當前 PR 版本後才能 Merge | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L25) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U002` | `GATE-001.02` | 告知 Preview URL 以及已驗證／未驗證項 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L25) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U003` | `GATE-002.01` | 未同意不得正式發布 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U004` | `PROOF-001.01` | Build 綠燈不能等同 Live Preview | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L23) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U005` | `PROOF-001.02` | Artifact 不能冒充可開啟網頁 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L23) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U006` | `PROOF-002.02` | 部署 commit/SHA 對應最新 PR Head | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L23) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U007` | `PROOF-002.03` | 分支 URL 會變，需優先核實對應版本 URL | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L23) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U008` | `PROOF-003.01` | 教師 Repo CI 成功不證明學生獨立 Repo 合格 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L11) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U009` | `PRIV-001.02` | 舊不可變部署網址可能持續可訪問 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L39) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U010` | `PRIV-001.03` | Repo Private 不代表網站 Preview 自動私密 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L39) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U011` | `PRIV-002.01` | 聊天不得要求 Token／密碼／驗證碼 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U012` | `PRIV-002.02` | 憑證不可寫入程式碼、Commit 或聊天 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U013` | `TRUTH-001.01` | 資格見證效果價格不得虛構 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-entry/SKILL.md#L18) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U014` | `TRUTH-001.02` | 表單預約訂閱成功不得造假 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-entry/SKILL.md#L18) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U015` | `TRUTH-001.03` | 缺資料允許空白／Demo／待設定 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-entry/SKILL.md#L18) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U016` | `TRUTH-001.04` | 網站持有人確認真實性，CI 不取代 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-entry/SKILL.md#L18) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U017` | `INDEX-001.01` | 預設 HTML noindex、robots 不索引 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U018` | `INDEX-001.02` | SITE_INDEXABLE=true 僅正式且獲同意之環境 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U019` | `INDEX-001.03` | Cloudflare Preview 不可使用正式索引設定 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U020` | `INDEX-001.04` | 不能為了通過 CI 而移除 noindex | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U021` | `QA-001.01` | 一般 UI Preview 檢查 1440／1280／768／390 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U022` | `QA-001.02` | PR59 獨立學生站人工驗收另需 375 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U023` | `QA-001.03` | 沒有實測不得稱完成視覺驗收 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U024` | `PREVIEW-HISTORY-01` | 變更歷史部署、檢查歷史或設定 Cloudflare Access，需額外明確授權 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L62) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U025` | `PREVIEW-HISTORY-02` | 不能保證已被第三方複製的公開內容消失 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L62) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U026` | `PREVIEW-HISTORY-03` | 不得擅自破壞 QA 證據 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L62) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U027` | `PREVIEW-HISTORY-04` | 未公開草稿優先本機或受限制存取 Preview | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L62) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U028` | `PR59-EVIDENCE-02` | 自動化 PASS 不足以證明內容真實或法律適用性 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L39) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U029` | `GATE-001.03.S1` | 證據需記錄核准所對應的確切 PR SHA | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L40) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U030` | `GATE-002.02.S1` | 未經同意不得更動 DNS | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U031` | `GATE-002.02.S2` | 未經同意不得刪 Repo | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U032` | `GATE-002.02.S3` | 未經同意不得覆寫網站 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U033` | `GATE-002.03.S1` | 研究 PR59 合併不等於學員站公開核准 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L72) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U034` | `PROOF-001.03.S1` | GitHub Pages PR 無天然隔離 Preview | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L30) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U035` | `PROOF-001.03.S2` | 未設好時須回報不存在 Live URL | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L30) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U036` | `PROOF-001.03.S3` | 修改預覽架構需同意 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L30) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U037` | `PROOF-002.01.S1` | Cloudflare URL 必須依實際平台回報 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L38) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U038` | `PROOF-002.01.S2` | 不猜 Pages.dev 或移植 GitHub Pages URL 規律 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L38) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U039` | `PROOF-003.02.S1` | 獨立學生 Repo 要驗證真實 PR 執行 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U040` | `PROOF-003.03.S1` | Pages 子路徑獨立測試 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U041` | `PROOF-003.03.S2` | Cloudflare 根路徑僅在選用時測試 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U042` | `PRIV-001.01.S1` | 檢查 Preview 是否可能被索引 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L39) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U043` | `PRIV-001.01.S2` | 檢查是否包含尚未核准內容 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L39) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U044` | `PREVIEW-POLICY-01.S1` | 缺 Live Preview 必須明示 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L30) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U045` | `PREVIEW-POLICY-01.S2` | 新增 Preview 部署方法須學員同意 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L30) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U046` | `PR59-EVIDENCE-01.S3` | 上游變更後重新判斷證據有效性 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U047` | `INDEX-DETAIL-01.S1` | 核准後只在正式環境設定 indexable | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U048` | `INDEX-DETAIL-01.S2` | 重新 Build | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U049` | `INDEX-DETAIL-01.S4` | Preview 不共用正式 indexable 設定 | NORMATIVE_OBLIGATION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U050` | `EXT-DETAIL-01.S2` | 需真實 Preview 與對應 SHA | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U051` | `EXT-DETAIL-01.S3` | 不得以本地模擬當線上證據 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U052` | `PR59-EVIDENCE-01.S1.A1` | 測試目標／Repository | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U053` | `PR59-EVIDENCE-01.S1.A2` | Commit SHA | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U054` | `PR59-EVIDENCE-01.S1.A3` | 實際網址或 Artifact | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U055` | `PR59-EVIDENCE-01.S2.A1` | 日期 | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U056` | `PR59-EVIDENCE-01.S2.A2` | 執行者 | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U057` | `PR59-EVIDENCE-01.S2.A3` | 測試結果 | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U058` | `PR59-EVIDENCE-01.S2.A4` | 未解風險 | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U059` | `INDEX-DETAIL-01.S3.A1` | meta robots | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U060` | `INDEX-DETAIL-01.S3.A2` | robots.txt | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U061` | `INDEX-DETAIL-01.S3.A3` | canonical | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U062` | `INDEX-DETAIL-01.S3.A4` | Sitemap | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U063` | `QA-DETAIL-01.S1.A1` | 首頁 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U064` | `QA-DETAIL-01.S1.A2` | CSS／圖片 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U065` | `QA-DETAIL-01.S1.A3` | 導航 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U066` | `QA-DETAIL-01.S1.A4` | 文章／內容頁（適用時） | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U067` | `QA-DETAIL-01.S1.A5` | Pagefind（適用時） | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U068` | `QA-DETAIL-01.S1.A6` | RSS（適用時） | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U069` | `QA-DETAIL-01.S1.A7` | Sitemap | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U070` | `QA-DETAIL-01.S1.A8` | 404 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U071` | `QA-DETAIL-01.S2.A1` | 鍵盤操作 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U072` | `QA-DETAIL-01.S2.A2` | 觸控操作 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U073` | `QA-DETAIL-01.S2.A3` | reduced-motion | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U074` | `QA-DETAIL-01.S3.A1` | Preview noindex | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U075` | `QA-DETAIL-01.S3.A2` | 未公開／敏感內容 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U076` | `QA-DETAIL-01.S3.A3` | 外部服務測試資料 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U077` | `EXT-DETAIL-01.S1.A1` | Pages 子路徑資產 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U078` | `EXT-DETAIL-01.S1.A2` | 文章／服務內頁 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U079` | `EXT-DETAIL-01.S1.A3` | 導航 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U080` | `EXT-DETAIL-01.S1.A4` | 搜尋 | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U081` | `EXT-DETAIL-01.S1.A5` | canonical | ACCEPTANCE_CRITERION | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U082` | `PROOF-003.02.S2.A1` | 獨立 Repo URL | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U083` | `PROOF-003.02.S2.A2` | PR URL | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U084` | `PROOF-003.02.S2.A3` | Workflow Run URL | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U085` | `PROOF-003.02.S2.A4` | SHA | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |
| `P0-U086` | `PROOF-003.02.S2.A5` | QA Artifact | EVIDENCE_FIELD | [Frozen source](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | CLASSIFIED_PENDING_SEMANTIC_REVIEW |

## 尚需去重的語義重疊

- `PROOF-001.03.S2` ↔ `PREVIEW-POLICY-01.S1`：相同規範候選，暫時雙保留引用，正式條款 ID 應合一。
- `PROOF-001.03.S3` ↔ `PREVIEW-POLICY-01.S2`：相同規範候選，暫時雙保留引用，正式條款 ID 應合一。

## Gate 與演算法

- 保留每條原候選 ID，可逆向追溯到父子關係及原始來源。
- 目前計數：28 個未拆父候選 + 23 個未再拆的子候選 + 35 個檢查點 = **86 筆暫定末端記錄**，不是獨立條款母數。
- 欄位、檢查點與規範要分開；同義條款要跨文件合一；每條凍結來源的未映射規範還沒有全量盤點。
- 後續才能產生可宣稱的唯一條款總數。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 86 筆紀錄的暫定語義分類

- `NORMATIVE_OBLIGATION`：行為要求、禁止或限制。
- `ACCEPTANCE_CRITERION`：對生成網站／預覽／交付的測試要求，不直接等同另一項部署政策。
- `EVIDENCE_FIELD`：某個測試或審核紀錄中的必填證據欄位，不逐欄計算獨立政策。
- `REVIEW_MIXED`：若後續發現單一末端記錄仍混合要求，應再拆解；目前分類是**工作判讀而非人為語義簽核**。

分類暫計（校正後）：規範義務 37、驗收條件 37、證據欄位 12。三類合計 86 筆。**類型總數不能宣稱唯一義務分母或覆蓋率；跨來源重複和適用條件尚未審核完。**

## 第二輪語義重疊審查（候選，不直接消滅來源）

本節是對已列 86 筆末端紀錄的 **11 組具體關聯**，其中 `SAME_CANDIDATE` 為 4 組可能同義，不代表語義裁決已通過；其餘保留特殊平台、程序階段與證據範圍。不根據這些關聯自行扣除分母。

| 條款 A | 條款 B | 初核關係 | 不得遺失的範圍差異 | 狀態 |
|---|---|---|---|---|
| `P0-U035` | `P0-U044` | SAME_CANDIDATE | GitHub Pages 未設定可用 PR Preview 時必須如實告知；保留來源場景 | HUMAN_REVIEW_PENDING |
| `P0-U036` | `P0-U045` | SAME_CANDIDATE | 變更／新增預覽部署方法前須同意 | HUMAN_REVIEW_PENDING |
| `P0-U018` | `P0-U047` | SAME_CANDIDATE | 正式發布取得同意才啟用索引，需保留重建及正式環境條件 | HUMAN_REVIEW_PENDING |
| `P0-U019` | `P0-U049` | SAME_CANDIDATE | Cloudflare Preview 不應套用正式站 indexable 設定 | HUMAN_REVIEW_PENDING |
| `P0-U006` | `P0-U050` | SCOPE_OVERLAP | PR Head SHA 與 GitHub Pages 子路徑的特定 EXT-03 是一般及專項情境 | HUMAN_REVIEW_PENDING |
| `P0-U042` | `P0-U074` | TEST_OVERLAP | 索引暴露風險與 Preview noindex 測試相互關聯，但非完全同義 | HUMAN_REVIEW_PENDING |
| `P0-U065` | `P0-U079` | SCOPE_OVERLAP | 一般 Preview 導航與 Pages 子路徑導航，是一般與平台專項驗收 | HUMAN_REVIEW_PENDING |
| `P0-U061` | `P0-U081` | SCOPE_OVERLAP | 正式索引 canonical 與 GitHub Pages 子路徑 canonical 測試不同 | HUMAN_REVIEW_PENDING |
| `P0-U053` | `P0-U085` | FIELD_SCOPE_OVERLAP | 一般測試紀錄 SHA 與 EXT-01 專項證據 SHA 均需保存 | HUMAN_REVIEW_PENDING |
| `P0-U054` | `P0-U082` | FIELD_SCOPE_OVERLAP | 一般 URL 或 Artifact 與學生 Repo URL 證據不同，不能直接等價 | HUMAN_REVIEW_PENDING |
| `P0-U003` | `P0-U033` | AUTHORIZATION_SCOPE | 學員正式發布授權與 PR59 研究合併權限不得混淆 | HUMAN_REVIEW_PENDING |

### 分類校正

原有類型初核有三筆容易誤導：`P0-U024`（歷史部署操作需另授權）改為規範義務；`P0-U028`（自動 PASS 無法代替真人真實性／法律核對）與 `P0-U046`（上游變更後重判測試證據）改為驗收／證據有效性要求。三筆僅調整類型，不修改原始規範主張。先前的「36／36／14」為**分類校正前快照**，不可繼續作現行數字。每筆類型仍需人工語義審核。

**禁止以 86 減掉四組 SAME_CANDIDATE 宣稱最終母數。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。**

### 分類校正後即時計數

{"NORMATIVE_OBLIGATION":37,"ACCEPTANCE_CRITERION":37,"EVIDENCE_FIELD":12}（合計 86；仍為候選）。
