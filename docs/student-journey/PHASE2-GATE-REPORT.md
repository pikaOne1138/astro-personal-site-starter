# PR #67｜Phase 2 Gate Report

> Initial import snapshot at commit `2d0931131cadadf929eec9f901e8b4a5cb9123c2`. This is a truthful **pre-validation snapshot**, not the output of a completed local `node scripts/phase2-canonical-ledger.mjs report` run. Regenerate with the committed script after checking out PR #67.

| Metric | Observed |
|---|---:|
| Frozen baseline expected | 192 text files |
| Phase2 work documents expected | 59 |
| Sources initially ingested | 4 work documents |
| Imported unique legacy IDs | 349 |
| Review-pending records | 349 |
| Records with no parsed source reference | 191 |
| Parsed source references without line anchor | 0 |
| Child relationship candidates | 72 |
| Frozen Blob SHA verification | NOT RUN |
| Full 59-document legacy-ID discovery | NOT RUN |
| Source-to-ledger exhaustive coverage | NOT RUN |
| Ledger-to-frozen-source verification | NOT RUN |
| Unresolved semantic conflicts | NOT YET ENUMERATED |

**Gate: BLOCKED / NOT VERIFIED**. Phase 3 and Phase 4 are BLOCKED.

The imported count is a count of legacy work identifiers, **not** the number of unique normative requirements. No canonicalId has been approved, and no candidate can be called semantically adjudicated.

The frozen inventory must be supplied by the importer from `SOURCE-BASELINE-2026-10-22.md`; the seed ledger does not claim that the source file hashes are verified. PR #61 remains a separate delta version layer. The historical Phase2 papers, Frozen Source, source Skills and templates were not modified.

## Reproduce

```bash
node scripts/phase2-canonical-ledger.mjs import
node scripts/phase2-canonical-ledger.mjs verify
node scripts/phase2-canonical-ledger.mjs report
```

The verify/report stage deliberately returns nonzero while semantic review is pending or integrity checks fail. It must not be used to bypass the Phase 2 gate.
