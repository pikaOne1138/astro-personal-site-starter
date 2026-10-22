# Phase 2｜複合子候選欄位與檢查點拆分

Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。本檔延伸 [31 子候選](PHASE2-ATOMIC-PARTIAL-SPLIT.md)，非另一份 SSOT。8 個仍屬複合的子候選，展開 35 個資料欄位／QA 檢查點。**欄位不自動構成互相獨立的規範，不得把父、子、欄位相加。**

| 下層 ID | 單項欄位或檢查點 | 上層 | 原文 | 審核 |
|---|---|---|---|---|
| `PR59-EVIDENCE-01.S1.A1` | 測試目標／Repository | `PR59-EVIDENCE-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | NOT_APPROVED |
| `PR59-EVIDENCE-01.S1.A2` | Commit SHA | `PR59-EVIDENCE-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | NOT_APPROVED |
| `PR59-EVIDENCE-01.S1.A3` | 實際網址或 Artifact | `PR59-EVIDENCE-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | NOT_APPROVED |
| `PR59-EVIDENCE-01.S2.A1` | 日期 | `PR59-EVIDENCE-01.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | NOT_APPROVED |
| `PR59-EVIDENCE-01.S2.A2` | 執行者 | `PR59-EVIDENCE-01.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | NOT_APPROVED |
| `PR59-EVIDENCE-01.S2.A3` | 測試結果 | `PR59-EVIDENCE-01.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | NOT_APPROVED |
| `PR59-EVIDENCE-01.S2.A4` | 未解風險 | `PR59-EVIDENCE-01.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L16) | NOT_APPROVED |
| `INDEX-DETAIL-01.S3.A1` | meta robots | `INDEX-DETAIL-01.S3` | [.ai/astro-starter-deploy/SKILL.md:L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | NOT_APPROVED |
| `INDEX-DETAIL-01.S3.A2` | robots.txt | `INDEX-DETAIL-01.S3` | [.ai/astro-starter-deploy/SKILL.md:L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | NOT_APPROVED |
| `INDEX-DETAIL-01.S3.A3` | canonical | `INDEX-DETAIL-01.S3` | [.ai/astro-starter-deploy/SKILL.md:L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | NOT_APPROVED |
| `INDEX-DETAIL-01.S3.A4` | Sitemap | `INDEX-DETAIL-01.S3` | [.ai/astro-starter-deploy/SKILL.md:L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A1` | 首頁 | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A2` | CSS／圖片 | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A3` | 導航 | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A4` | 文章／內容頁（適用時） | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A5` | Pagefind（適用時） | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A6` | RSS（適用時） | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A7` | Sitemap | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S1.A8` | 404 | `QA-DETAIL-01.S1` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S2.A1` | 鍵盤操作 | `QA-DETAIL-01.S2` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S2.A2` | 觸控操作 | `QA-DETAIL-01.S2` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S2.A3` | reduced-motion | `QA-DETAIL-01.S2` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S3.A1` | Preview noindex | `QA-DETAIL-01.S3` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S3.A2` | 未公開／敏感內容 | `QA-DETAIL-01.S3` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `QA-DETAIL-01.S3.A3` | 外部服務測試資料 | `QA-DETAIL-01.S3` | [.ai/astro-pr-preview/SKILL.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/SKILL.md#L24) | NOT_APPROVED |
| `EXT-DETAIL-01.S1.A1` | Pages 子路徑資產 | `EXT-DETAIL-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | NOT_APPROVED |
| `EXT-DETAIL-01.S1.A2` | 文章／服務內頁 | `EXT-DETAIL-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | NOT_APPROVED |
| `EXT-DETAIL-01.S1.A3` | 導航 | `EXT-DETAIL-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | NOT_APPROVED |
| `EXT-DETAIL-01.S1.A4` | 搜尋 | `EXT-DETAIL-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | NOT_APPROVED |
| `EXT-DETAIL-01.S1.A5` | canonical | `EXT-DETAIL-01.S1` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L24) | NOT_APPROVED |
| `PROOF-003.02.S2.A1` | 獨立 Repo URL | `PROOF-003.02.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | NOT_APPROVED |
| `PROOF-003.02.S2.A2` | PR URL | `PROOF-003.02.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | NOT_APPROVED |
| `PROOF-003.02.S2.A3` | Workflow Run URL | `PROOF-003.02.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | NOT_APPROVED |
| `PROOF-003.02.S2.A4` | SHA | `PROOF-003.02.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | NOT_APPROVED |
| `PROOF-003.02.S2.A5` | QA Artifact | `PROOF-003.02.S2` | [docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md#L22) | NOT_APPROVED |

## 重複映射候選

| 條款 A | 條款 B | 性質 |
|---|---|---|
| `PROOF-001.03.S2` | `PREVIEW-POLICY-01.S1` | SAME_CANDIDATE |
| `PROOF-001.03.S3` | `PREVIEW-POLICY-01.S2` | SAME_CANDIDATE |
| `PROOF-003.03.S1` | `EXT-DETAIL-01.S1` | PARTIAL_OVERLAP |

PR59 證據欄位是一組測試記錄契約；索引輸出檢驗是一個經核准發布程序；Preview QA 各項要按實際功能適用性判讀。沒有人工語義通過、沒有刪改來源。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。
