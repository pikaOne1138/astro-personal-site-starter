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
  "aliases": []
}
~~~

## Document retirement
No archival/move/delete plan is authorized until semantic review, complete bidirectional source coverage, zero defects and explicit user approval. The 1,390 legacy IDs are not canonical obligations.
