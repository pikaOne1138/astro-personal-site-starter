# Phase 2｜P0 31 候選雙向來源證據初審

唯一管理入口：[CLAUSE-COVERAGE-MATRIX.md](CLAUSE-COVERAGE-MATRIX.md)。凍結 `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`，不修改原始規格。本文件只檢查候選表**有無引用、引用是否對題、被引用來源是否可反查候選**，不把有 URL 當作通過語意驗收。

## 反向引用具體缺口（6）

| 編號 | 主題 | 問題 | 補正方向 |
|---|---|---|---|
| P0-01 | PRIV-001 | L64 只是章節標題，不支持歷史 Preview 仍可能公開 | 改引 pr-preview L62，補授權刪舊部署／保留 QA 證據 |
| P0-02 | PRIV-001 | L55 屬瀏覽器測試限制，不支持 Private Repo != private Preview | 改查 pr-preview L53–54，避免錯引 |
| P0-03 | PROOF-001.02 | Artifact 不等於 Live Preview 缺精確文字證據 | 應加 PREVIEW-BOOTSTRAP L7、AGENT-HANDOFF L19 |
| P0-04 | GATE-002 | 原引用 deploy L37 只列 Merge／DNS／Repo／覆寫 | Production 額外權限需引用 pr-preview L56、PR59 L72 |
| P0-05 | QA-001 | PR59 HUMAN 要求五尺寸；一般合約四尺寸加 375 edge | 需保留按情境區分 |
| P0-06 | PROOF-003 | PR59 EXT 系列仍為 NOT TESTED | 文檔比對不等於真正學生 Repo 功能驗收 |

## 已引用原文行 → 候選 ID 逆向索引

本表共有 26 組唯一文件/行號定位，對應 31 條候選的已附連結。**不代表未引用的來源行都不具規範性**。

| Frozen source | 候選條款 | 狀態 |
|---|---|---|
| [.ai/astro-pr-preview/SKILL.md:11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L11) | PROOF-003.01, PROOF-003.02, PROOF-003.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L16) | PRIV-002.01, PRIV-002.02 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L23) | PROOF-001.01, PROOF-001.02, PROOF-001.03, PROOF-002.01, PROOF-002.02, PROOF-002.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | QA-001.01, QA-001.02, QA-001.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L25) | GATE-001.01, GATE-001.02, GATE-001.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L30) | PROOF-001.01, PROOF-001.02, PROOF-001.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L37) | PROOF-002.01, PROOF-002.02, PROOF-002.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:38](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L38) | PROOF-002.01, PROOF-002.02, PROOF-002.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:39](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L39) | PRIV-001.01, PRIV-001.02, PRIV-001.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:55](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L55) | PRIV-001.01, PRIV-001.02, PRIV-001.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-pr-preview/SKILL.md:64](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L64) | PRIV-001.01, PRIV-001.02, PRIV-001.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-site-entry/SKILL.md:18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-entry/SKILL.md#L18) | TRUTH-001.01, TRUTH-001.02, TRUTH-001.03, TRUTH-001.04 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-site-from-zero/SKILL.md:25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-from-zero/SKILL.md#L25) | PRIV-002.01, PRIV-002.02, TRUTH-001.01, TRUTH-001.02, TRUTH-001.03, TRUTH-001.04 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-starter-deploy/SKILL.md:19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L19) | PROOF-001.01, PROOF-001.02, PROOF-001.03 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-starter-deploy/SKILL.md:27](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L27) | PRIV-002.01, PRIV-002.02 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-starter-deploy/SKILL.md:31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | INDEX-001.01, INDEX-001.02, INDEX-001.03, INDEX-001.04 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-starter-deploy/SKILL.md:32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L32) | INDEX-001.01, INDEX-001.02, INDEX-001.03, INDEX-001.04 | NOT_SEMANTICALLY_APPROVED |
| [.ai/astro-starter-deploy/SKILL.md:37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) | GATE-002.01, GATE-002.02, GATE-002.03 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | PROOF-003.01, PROOF-003.02, PROOF-003.03 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | PROOF-003.01, PROOF-003.02, PROOF-003.03 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L25) | PROOF-003.01, PROOF-003.02, PROOF-003.03 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L35) | QA-001.01, QA-001.02, QA-001.03 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L36) | QA-001.01, QA-001.02, QA-001.03 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:39](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L39) | TRUTH-001.01, TRUTH-001.02, TRUTH-001.03, TRUTH-001.04 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:40](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L40) | GATE-001.01, GATE-001.02, GATE-001.03 | NOT_SEMANTICALLY_APPROVED |
| [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:72](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L72) | GATE-002.01, GATE-002.02, GATE-002.03 | NOT_SEMANTICALLY_APPROVED |

## Gate

- 31 個候選 ID 有 URL 連結，但有錯引和漏引；禁止宣稱 31 項已驗證。
- 本輪 6 組錯誤／缺口須先修正，再比對完整文件是否有遺漏的子句。
- 尚未建立規範性句子的總數，亦未處理 PR61／PR69 版本差異。
- **Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。**
