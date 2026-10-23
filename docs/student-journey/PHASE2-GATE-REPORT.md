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
| documentaryRelationGroups | 7 |
| documentaryMerges | 4 |
| documentaryPartialSplits | 1 |
| documentaryDistinct | 2 |
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
    "documentaryRelationGroups": 7,
    "documentaryMerges": 4,
    "documentaryPartialSplits": 1,
    "documentaryDistinct": 2,
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
    }
  ],
  "relationOrphans": [],
  "unverifiedMerges": []
}
~~~

## Document retirement
No archival/move/delete plan is authorized until semantic review, complete bidirectional source coverage, zero defects and explicit user approval. The 1,390 legacy IDs are not canonical obligations.
