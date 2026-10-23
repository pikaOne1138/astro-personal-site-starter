# PR #67 | Phase 2 Gate Report

> Generated, non-normative report. Frozen baseline and canonical ledger remain the only source evidence/decision authority. Mechanical traceability is not semantic coverage.

| Metric | Result |
|---|---:|
| frozenManifestFiles | 192 |
| workingFiles | 62 |
| discoveredLegacyIds | 1390 |
| importedLegacyIds | 1390 |
| missingLegacyIds | 0 |
| brokenReferences | 0 |
| frozenTextMismatches | 0 |
| noFrozenOrUpstreamAnchor | 0 |
| unmatchedAliases | 0 |
| parentDoubleCountRisks | 0 |
| crossVersionReferences | 0 |
| pendingSemanticDecisions | 1390 |
| approvedCanonicalIds | 0 |
| aliasGroups | 0 |
| documentaryRelationGroups | 18 |
| documentaryMerges | 4 |
| documentaryPartialSplits | 9 |
| documentaryDistinct | 5 |
| frozenLinesReferenced | 670 |
| sourceFirstScopeFiles | 10 |
| sourceFirstLinesScanned | 352 |
| sourceFirstCandidateLines | 202 |
| sourceFirstUnmappedCandidateLines | 25 |
| sourceFirstMappedCandidateLines | 177 |
| sourceFirstReadFailures | 0 |
| sourceFirstClassifiedUnmapped | 25 |
| sourceFirstUnclassifiedUnmapped | 0 |
| unexaminedFrozenNormativeClauses | NOT_ESTABLISHED |
| semanticCompleteness | NOT_VERIFIED |
| oldFileRetirement | NOT_AUTHORIZED |
| stage2 | BLOCKED |
| stage3 | BLOCKED |
| stage4 | BLOCKED |

**Phase 2: BLOCKED. Phase 3 / 4: BLOCKED.**

## Gate blockers
- Semantic adjudication incomplete
- Source-first potentially normative lines not mapped
- No exhaustive clause denominator / source-to-ledger semantic coverage verified

## Machine-verifiable diagnostics
~~~json
{
  "counts": {
    "frozenManifestFiles": 192,
    "workingFiles": 62,
    "discoveredLegacyIds": 1390,
    "importedLegacyIds": 1390,
    "missingLegacyIds": 0,
    "brokenReferences": 0,
    "frozenTextMismatches": 0,
    "noFrozenOrUpstreamAnchor": 0,
    "unmatchedAliases": 0,
    "parentDoubleCountRisks": 0,
    "crossVersionReferences": 0,
    "pendingSemanticDecisions": 1390,
    "approvedCanonicalIds": 0,
    "aliasGroups": 0,
    "documentaryRelationGroups": 18,
    "documentaryMerges": 4,
    "documentaryPartialSplits": 9,
    "documentaryDistinct": 5,
    "frozenLinesReferenced": 670,
    "sourceFirstScopeFiles": 10,
    "sourceFirstLinesScanned": 352,
    "sourceFirstCandidateLines": 202,
    "sourceFirstUnmappedCandidateLines": 25,
    "sourceFirstMappedCandidateLines": 177,
    "sourceFirstReadFailures": 0,
    "sourceFirstClassifiedUnmapped": 25,
    "sourceFirstUnclassifiedUnmapped": 0,
    "unexaminedFrozenNormativeClauses": "NOT_ESTABLISHED",
    "semanticCompleteness": "NOT_VERIFIED",
    "oldFileRetirement": "NOT_AUTHORIZED",
    "stage2": "BLOCKED",
    "stage3": "BLOCKED",
    "stage4": "BLOCKED"
  },
  "sourceFirst": {
    "scopeFiles": [
      ".ai/astro-content-publishing/SKILL.md",
      ".ai/astro-site-assembly/SKILL.md",
      ".ai/astro-starter-deploy/SKILL.md",
      ".ai/astro-pr-preview/SKILL.md",
      ".ai/astro-site-entry/SKILL.md",
      "docs/quality/QUALITY-CONTRACT.md",
      "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
      "docs/workshop/PR56-USER-JOURNEY-QA.md",
      "docs/student-builder-pack/AGENT-HANDOFF.md",
      "docs/student-builder-pack/PROJECT-TEMPLATE.md"
    ],
    "readFailures": [],
    "unmappedCandidateLines": [
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 3,
        "sourceText": "description: Safely build, verify, preview, and release student-owned Astro sites with GitHub PRs on either GitHub Pages or Cloudflare Pages/Workers, choosing the actual configured hosting platform.",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NON_NORMATIVE",
          "rationale": "Skill YAML description, not an independent clause",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 21,
        "sourceText": "2. 保持 `import.meta.env.BASE_URL` 與 route/asset URL 正確。檢查已設定的 Node 版本、安裝與 `npm run build`；不得虛構測試成功。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_PENDING_SPLIT",
          "rationale": "BASE_URL and build verification; prohibited fabricated success",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 29,
        "sourceText": "- 初次部署閱讀 `astro-starter-deploy`；確認 GitHub Pages 的 Source、Repo 類型、自訂網域與適用方案，`site`、`base` 及 `ASTRO_BASE_PATH` 隨**學員** Repo/網域調整。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_PENDING_SPLIT",
          "rationale": "GitHub Pages source/platform check and student-specific site/base",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 36,
        "sourceText": "- 核對 Cloudflare Pages 專案已連接學員自己的 GitHub Repository、Production branch、build command、輸出目錄（Astro 靜態通常 `dist`），並確認非 Production branch／PR Preview Deployments 的實際設定。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_PENDING_SPLIT",
          "rationale": "Cloudflare student-repo integration and preview settings",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 51,
        "sourceText": "- PR Build 失敗：修復程式並重新建立有效檢查；部署失敗：依對應平台 Log 診斷，勿無差別重跑。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_PENDING_SPLIT",
          "rationale": "Failure-specific repair instead of indiscriminate retries",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 53,
        "sourceText": "- Preview 舊版：比較 PR head SHA 與部署 commit，更新到最新 head 再驗證。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_PENDING_SPLIT",
          "rationale": "Preview head SHA must match deployment head",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 55,
        "sourceText": "- 若無法執行瀏覽器驗證，明確標註待人工 QA。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE",
          "rationale": "Disclose browser QA as pending when not executable",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 59,
        "sourceText": "「請先查看我自己的 GitHub Repository 與實際使用的託管平台（GitHub Pages、Cloudflare Pages 或 Workers），依 astro-pr-preview 與 astro-starter-deploy Skill 修改網站。建立 Branch 和 PR，檢查 Build，找到**平台真正產生、對應最新 Commit**的預覽網址給我，確認電腦與手機畫面；我明確同意後才合併與發布。不要把教學研究 Repo 的預覽網址當成我的網站。」",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "EXAMPLE_WITH_NORMATIVE_REFERENCES",
          "rationale": "Sample student prompt; requirements must be traced to other operative lines",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": ".ai/astro-pr-preview/SKILL.md",
        "frozenBlobSha": "411c091674981f0f600b4154df085ad3cb9d8ca7",
        "line": 65,
        "sourceText": "舊的 `/pr-preview/pr-N/` 研究 Repo 靜態路徑可能回 404；這不證明分支 Cloudflare Preview 本身失效。請到 GitHub PR 的實際 Checks／Deployment 取得目前有效的 Branch/Deployment URL、核對 SHA 與 HTTP，再告知學員。不要寫死或憑規律拼接 URL。正式學員指南請使用工作坊最新確認的入口，避免給已失效的版本網址。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_PENDING_SPLIT",
          "rationale": "Historical PR Preview 404 not proof of branch outage; validate actual deployment URL",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/quality/QUALITY-CONTRACT.md",
        "frozenBlobSha": "a93641ed257d4f1a3855acd6081c88f3f1366031",
        "line": 9,
        "sourceText": "- **NOTICE**: example/placeholder content, empty articles, or deliberate experimentation; never block technical builds solely for these.",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_CONDITION",
          "rationale": "NOTICE exception: example content alone does not block technical builds",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/quality/QUALITY-CONTRACT.md",
        "frozenBlobSha": "a93641ed257d4f1a3855acd6081c88f3f1366031",
        "line": 10,
        "sourceText": "- **NOT TESTED**: no evidence at this commit; never silently count as PASS.",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE",
          "rationale": "NOT TESTED must not silently count as PASS",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/quality/QUALITY-CONTRACT.md",
        "frozenBlobSha": "a93641ed257d4f1a3855acd6081c88f3f1366031",
        "line": 11,
        "sourceText": "- **BLOCKED**: tool access, unsupported platform, deployment or environment prevented the check.",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "ACCEPTANCE_STATUS",
          "rationale": "BLOCKED definition; tool/environment unavailable",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/quality/QUALITY-CONTRACT.md",
        "frozenBlobSha": "a93641ed257d4f1a3855acd6081c88f3f1366031",
        "line": 28,
        "sourceText": "| Layer | Validations | Required evidence |",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NON_NORMATIVE",
          "rationale": "Table header only; content belongs in subsequent rows",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 3,
        "sourceText": "> **唯一事實來源（SSOT）**：本檔只追蹤 PR #59 尚需在**學員自己的 GitHub Repository／實際部署環境**或由**人類**執行的驗收。程式碼與 CI 的技術真相仍以對應 Commit、Actions、Artifact 為準。本檔不得用預期結果代替證據。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_PENDING_SPLIT",
          "rationale": "PR59 evidence authority, no expectation as evidence",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 5,
        "sourceText": "> 範圍：ATP PR #59 學員獨立 Astro 網站的 RWD／功能安全網；不涵蓋 Issue #58 收尾、不重新 QA ATP 25 款展示 Layout。**未經授權不建立學員正式 Repo、不 Merge、不部署 Production。**",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE_CONDITION",
          "rationale": "PR59 test scope and explicit authorization boundary",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 9,
        "sourceText": "- **NOT TESTED**：未在指定目標環境執行；不能宣稱 PASS。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "ACCEPTANCE_STATUS",
          "rationale": "NOT TESTED definition",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 10,
        "sourceText": "- **BLOCKED**：因授權、環境或必要資料缺失無法進行，必須寫明原因及解除條件。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "ACCEPTANCE_STATUS",
          "rationale": "BLOCKED requires reason and unblock conditions",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 29,
        "sourceText": "> **已完成的替代性自動檢查（不是 EXT-01～06 PASS）**：主 Repo 的封裝測試確認學員工作流程有被匯出；本地靜態伺服器的根路徑／子路徑正反故障注入檢查通過。這不能證明學員獨立 GitHub Repo 的 PR 事件、授權或線上 Preview 已驗收。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "EVIDENCE_NOT_PASS",
          "rationale": "Historical substitute checks explicitly not EXT PASS",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 44,
        "sourceText": "| 項目 | 最新已確認的結果 | 證據 |",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NON_NORMATIVE",
          "rationale": "Historical CI table header only",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 47,
        "sourceText": "| Art Direction Independent Adapter Check | PASS（同 Commit） | [Actions Run 39444544952](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544952) |",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "HISTORICAL_EVIDENCE",
          "rationale": "Historical workflow run snapshot, not current requirement",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 49,
        "sourceText": "| Verify Cloudflare Static Assets | PASS（同 Commit） | [Actions Run 39444544959](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544959) |",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "HISTORICAL_EVIDENCE",
          "rationale": "Historical workflow run snapshot, not current requirement",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 50,
        "sourceText": "| Standalone Starter Export Check | IN PROGRESS（最後查詢時） | [Actions Run 39444544891](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544891) |",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "HISTORICAL_EVIDENCE",
          "rationale": "Historical IN PROGRESS snapshot, not current status",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md",
        "frozenBlobSha": "62e7406a9fb784c6d6b192982eb5b83911f359d7",
        "line": 52,
        "sourceText": "> 此表是一個**帶時間性的驗證快照**。查詢最新狀態時，應以 GitHub Actions 真實結論更新，不得把「IN PROGRESS」永久當成失敗或通過。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE",
          "rationale": "Time-bound snapshot must be rechecked from Actions",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/workshop/PR56-USER-JOURNEY-QA.md",
        "frozenBlobSha": "67f691c0578ec123735cc8d2c345248c478d0694",
        "line": 15,
        "sourceText": "| AI 需求訪談包 ZIP | Starter 04 | 選填 | 解壓後交 AI 進行訪談；AI 整理摘要，學員貼回 Starter 04 |",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "PROCEDURE_CONDITIONAL",
          "rationale": "Optional interview package and information return path",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      },
      {
        "path": "docs/workshop/PR56-USER-JOURNEY-QA.md",
        "frozenBlobSha": "67f691c0578ec123735cc8d2c345248c478d0694",
        "line": 41,
        "sourceText": "> 此文件為驗收依據，不代表所有檢查已完成。PR 保持 Draft，未核實的項目不可宣稱通過。",
        "candidateForNormativeReview": true,
        "legacyIds": [],
        "coverageStatus": "REVIEW_REQUIRED_UNMAPPED",
        "reviewStatus": "PENDING_HUMAN_CLAUSE_CLASSIFICATION",
        "initialReview": {
          "classification": "NORMATIVE",
          "rationale": "Draft and unverified test results cannot be represented as PASS",
          "reviewStatus": "DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING"
        }
      }
    ],
    "firstReviewClassified": 25,
    "unclassified": 0,
    "classification": "HEURISTIC_REVIEW_REQUIRED_NOT_PROVEN_OBLIGATIONS"
  },
  "missingLegacy": [],
  "missingFrozen": [],
  "failures": [],
  "sourceLineMismatches": [],
  "orphanAliases": [],
  "parentRisks": [],
  "crossVersion": [],
  "aliases": [],
  "documentaryRelations": [
    {
      "legacyIds": [
        "P0-U035",
        "P0-U044"
      ],
      "decision": "MERGE",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md",
      "scopeNote": "Same Frozen preview SKILL L30, missing GitHub Pages Preview reporting",
      "sharedExactFrozenAnchors": [
        ".ai/astro-pr-preview/SKILL.md:30"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "P0-U036",
        "P0-U045"
      ],
      "decision": "MERGE",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md",
      "scopeNote": "Same Frozen preview SKILL L30, consent before Preview architecture changes",
      "sharedExactFrozenAnchors": [
        ".ai/astro-pr-preview/SKILL.md:30"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "P0-U018",
        "P0-U047"
      ],
      "decision": "MERGE",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md",
      "scopeNote": "Same Frozen deploy SKILL L31, production indexing only with approval",
      "sharedExactFrozenAnchors": [
        ".ai/astro-starter-deploy/SKILL.md:31"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "P0-U019",
        "P0-U049"
      ],
      "decision": "MERGE",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md",
      "scopeNote": "Same Frozen deploy SKILL L31, Cloudflare Preview index settings isolated",
      "sharedExactFrozenAnchors": [
        ".ai/astro-starter-deploy/SKILL.md:31"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B9C-DEP32-01",
        "B5-PUB62-03"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CANONICAL-ALIAS-CROSSWALK-01.md",
      "scopeNote": "Specific noindex versus broader CI release gate",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B9C-ASM78-02",
        "B9C-ASM78-03"
      ],
      "decision": "DISTINCT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CANONICAL-ALIAS-CROSSWALK-01.md",
      "scopeNote": "Positive duration condition differs from missing-duration fallback",
      "sharedExactFrozenAnchors": [
        ".ai/astro-site-assembly/SKILL.md:78"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B9C-ASM77-01",
        "B9C-ASM77-02"
      ],
      "decision": "DISTINCT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CANONICAL-ALIAS-CROSSWALK-01.md",
      "scopeNote": "Optional schema differs from member-identity approval",
      "sharedExactFrozenAnchors": [
        ".ai/astro-site-assembly/SKILL.md:77"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B2-PUB48-02",
        "B3-PUB20-02"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L7",
      "scopeNote": "SAME_CANDIDATE | 同一 Publishing Skill L20 與 L48 都說索引產生不等於搜尋 UI 已完成，但前者是生成專案現況、後者是組裝驗收要求；不能刪掉兩個 source | 保留兩來源，核對主詞與驗收差異後才決定共用 canonical",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B1-PUB28-02",
        "B2-PUB37-01"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L8",
      "scopeNote": "PARTIAL_OVERLAP | L28 描述 draft 文件所在的 Collection；L37 描述公共輸出清單、RSS、Sitemap、搜尋不得含 draft；存放位置與公開輸出 QA 不是同一義務 | 分別留 ID",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B1-PUB28-07",
        "B2-PUB37-02"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L9",
      "scopeNote": "PARTIAL_OVERLAP | L28 的資料夾隔離非保密，L37 的公開 Preview 可能曝光未公開內容；前者制度邊界，後者發佈渠道威脅 | 分別保留",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B1-PUB56-02",
        "B2-PUB37-01"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L10",
      "scopeNote": "PARTIAL_OVERLAP | 一者必須檢查輸出面，一者規定輸出面不應含 draft；驗收手段與規範結果不能合併 | 分類為驗收 vs 規範",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B1-ASM23-01",
        "B1-ASM23-02"
      ],
      "decision": "DISTINCT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L11",
      "scopeNote": "DISTINCT | 版本、範圍、Production 行為三者都是授權範圍條件，未必需要獨立三條規範，但不能遺失任一條件 | 保留為同一主契約的三個欄位候選",
      "sharedExactFrozenAnchors": [
        ".ai/astro-site-assembly/SKILL.md:23"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B1-DEP31-02",
        "P0-CANON-INDEX-ENABLE"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L12",
      "scopeNote": "PARTIAL_OVERLAP | P0 已含完成驗收／同意才在 Production 開啟索引；B1 只寫開啟的授權前置，P0 仍保留正式環境與變數約束 | 建 parent-child，不直接加計",
      "sharedExactFrozenAnchors": [
        ".ai/astro-starter-deploy/SKILL.md:31"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B1-DEP31-04",
        "P0-CANON-INDEX-ENABLE"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L13",
      "scopeNote": "PARTIAL_OVERLAP | B1 提供重新 Build、robots/canonical/Sitemap 驗證步驟，P0 明確要求額外保留此步驟 | 轉作該 canonical 驗收子項",
      "sharedExactFrozenAnchors": [
        ".ai/astro-starter-deploy/SKILL.md:31"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B1-DEP31-04",
        "P0-CANON-PREVIEW-INDEX"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L15",
      "scopeNote": "PARTIAL_OVERLAP | Batch1 DEP31-04 同時含 Cloudflare Preview 與 GitHub Pages Action Variable；必須再拆成平台別兩個工作子欄位 | 標為再原子化待辦",
      "sharedExactFrozenAnchors": [
        ".ai/astro-starter-deploy/SKILL.md:31"
      ],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B2-DEP43-05",
        "P0-CANON-PRVIEW-MISSING"
      ],
      "decision": "DISTINCT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L16",
      "scopeNote": "DISTINCT | 舊 Preview URL 不能證明新 SHA，與沒有 Live Preview 應誠實回報是不同證據條件 | 分別保留",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B3-DEP8-03",
        "P0-CANON-PRVIEW-MISSING"
      ],
      "decision": "PARTIAL_SPLIT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L17",
      "scopeNote": "PARTIAL_OVERLAP | Skill 不能代表已具備 Preview，與實際不可用時須如實報告是不同層次 | 保留能力邊界",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    },
    {
      "legacyIds": [
        "B3-ASM14-02",
        "B3-DEP8-03"
      ],
      "decision": "DISTINCT",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L18",
      "scopeNote": "DISTINCT | 不得宣稱完整多頁網站與不得宣稱已存在 Live Preview 是不同事實主張 | 分別保留",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    }
  ],
  "relationOrphans": [],
  "unverifiedMerges": []
}
~~~

## Document retirement
No archival/move/delete plan is authorized until semantic review, complete bidirectional source coverage, zero defects and explicit user approval. The 1,390 legacy IDs are not canonical obligations.
