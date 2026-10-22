# ATP 文件規範逐條對照表｜第二階段

- Frozen baseline: `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`（見 [192-file baseline](SOURCE-BASELINE-2026-10-22.md)）。
- 本表目前是**首批拆條示範，並非完成條款盤點**。對複合條款（如 QC-003）尚需按每一項獨立分解，否則不能宣稱條款 100% 覆蓋。
- `MAPPED` 僅代表**原內容原位保留且已建立映射**，不是新 SSOT 已完成搬移。若目的地只寫規範摘要而不含子條款，標 `AMBIGUOUS`，阻擋第三階段。
- PR #61 可能更新 AGENT-HANDOFF，合併後需重建衝突條款比對；不能拿 main 舊版覆寫。

| ID | 原始路徑 | Blob SHA | 精確原始行號 | 條款原意（非原文替代） | 適用對象 | 目前建議目的地 | 處置 | 狀態 |
|---|---|---|---|---|---|---|---|---|
| QC-001 | `docs/quality/QUALITY-CONTRACT.md` | `a93641ed257d4f1a3855acd6081c88f3f1366031` | 3 | A green build by itself is not a release acceptance. | Release QA | `docs/quality/QUALITY-CONTRACT.md#truthful-statuses` | PRESERVE_IN_PLACE | **MAPPED** |
| QC-002 | `docs/quality/QUALITY-CONTRACT.md` | `a93641ed257d4f1a3855acd6081c88f3f1366031` | 7-11 | PASS/FAIL/NOTICE/NOT TESTED/BLOCKED definitions | All QA | `docs/quality/QUALITY-CONTRACT.md#truthful-statuses` | PRESERVE_IN_PLACE | **MAPPED** |
| QC-003 | `docs/quality/QUALITY-CONTRACT.md` | `a93641ed257d4f1a3855acd6081c88f3f1366031` | 15-24 | Ten invariant rules covering URLs, drafts, truthfulness, RWD, preview and standalone packaging | Both learner types | `docs/quality/QUALITY-CONTRACT.md#invariants-applicable-to-both-learner-types` | PRESERVE_IN_PLACE | **MAPPED** |
| PR59-001 | `docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md` | `62e7406a9fb784c6d6b192982eb5b83911f359d7` | 22-27 | EXT-01..06 independent learner GitHub PR/Preview/Rulesets/version checks | Learner independent repo | `docs/student-journey/ACCEPTANCE-SSOT.md#七關學員端到端驗收` | REFERENCED | **AMBIGUOUS** |
| PR59-002 | `docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md` | `62e7406a9fb784c6d6b192982eb5b83911f359d7` | 35-36 | HUMAN-01..02 five-viewport content/layout checks | Human visual approval | `docs/student-journey/ACCEPTANCE-SSOT.md#七關學員端到端驗收` | REFERENCED | **AMBIGUOUS** |
| HO-001 | `docs/student-builder-pack/AGENT-HANDOFF.md` | `5005e7599a211906f63b002daf93b9ce5651fa46` | 19-23 | PR artifact is not live Preview; GitHub Pages and Cloudflare first-deploy hazards | Student handoff | `docs/student-builder-pack/AGENT-HANDOFF.md#預覽與正式發布的硬性安全關卡` | PRESERVE_IN_PLACE | **MAPPED** |
| HO-002 | `docs/student-builder-pack/AGENT-HANDOFF.md` | `5005e7599a211906f63b002daf93b9ce5651fa46` | 5-13 | Read student PROJECT and workspace; never overwrite; verify tools; human approval | Cross-session handoff | `docs/student-builder-pack/AGENT-HANDOFF.md` | PRESERVE_IN_PLACE | **MAPPED** |

## 待補（Gate 鎖定）

- [ ] 拆解 QC-003 十項規範成十列，完整列出每個禁止項、例外與門檻。
- [ ] PR59 HUMAN-03..06 及 EXT-01..06 每項完整拆出原始資料／證據欄位，不得只以七關大標題取代。
- [ ] PR56 學員介面／三檔交接、七關驗收逐條映射。
- [ ] AGENT-HANDOFF ／STUDENT-AGENTS ／START-HERE ／PREVIEW-BOOTSTRAP 全部安全規範，含兩種 Repo 適用範圍，交叉對照。
- [ ] 尚待整併的其他規範文件條款全量盤點後建立總數分母；沒有分母不得宣稱 100%。
- [ ] 人工逐條確認所有 `AMBIGUOUS/CONFLICT/UNMAPPED` 並標核准來源。

**禁止啟動第三、四階段。**
