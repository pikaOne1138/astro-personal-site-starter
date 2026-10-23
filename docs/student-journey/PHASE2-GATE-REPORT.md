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
| documentaryMerges | 5 |
| documentaryPartialSplits | 8 |
| documentaryDistinct | 5 |
| frozenLinesReferenced | 670 |
| unexaminedFrozenNormativeClauses | NOT_ESTABLISHED |
| semanticCompleteness | NOT_VERIFIED |
| oldFileRetirement | NOT_AUTHORIZED |
| stage2 | BLOCKED |
| stage3 | BLOCKED |
| stage4 | BLOCKED |

**Phase 2: BLOCKED. Phase 3 / 4: BLOCKED.**

## Gate blockers
- Semantic adjudication incomplete
- Documentary MERGE candidates lack a shared exact Frozen line
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
    "documentaryMerges": 5,
    "documentaryPartialSplits": 8,
    "documentaryDistinct": 5,
    "frozenLinesReferenced": 670,
    "unexaminedFrozenNormativeClauses": "NOT_ESTABLISHED",
    "semanticCompleteness": "NOT_VERIFIED",
    "oldFileRetirement": "NOT_AUTHORIZED",
    "stage2": "BLOCKED",
    "stage3": "BLOCKED",
    "stage4": "BLOCKED"
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
      "decision": "MERGE",
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
  "unverifiedMerges": [
    {
      "legacyIds": [
        "B2-PUB48-02",
        "B3-PUB20-02"
      ],
      "decision": "MERGE",
      "sourceWorkingPaper": "docs/student-journey/PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md#L7",
      "scopeNote": "SAME_CANDIDATE | 同一 Publishing Skill L20 與 L48 都說索引產生不等於搜尋 UI 已完成，但前者是生成專案現況、後者是組裝驗收要求；不能刪掉兩個 source | 保留兩來源，核對主詞與驗收差異後才決定共用 canonical",
      "sharedExactFrozenAnchors": [],
      "reviewStatus": "DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL",
      "canonicalId": null
    }
  ]
}
~~~

## Document retirement
No archival/move/delete plan is authorized until semantic review, complete bidirectional source coverage, zero defects and explicit user approval. The 1,390 legacy IDs are not canonical obligations.
