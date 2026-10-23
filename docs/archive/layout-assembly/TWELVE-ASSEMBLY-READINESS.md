> **已封存（2026-10-23）。** 當時十二款的狀態快照，已過期。現行狀態以 `src/data/layout-assembly/definitions.mjs` 的 `assemblyStatus` 為準；規則已併入 `docs/layout/layout-assembly.md`。僅供歷史查閱，不再維護。

# Twelve layout assembly status (PR #46)

This ledger intentionally distinguishes **code integration** from **design approval**. Images in `public/template-gallery` are screenshots of the *original showcase prototypes*, not screenshots of the assembled student exports.

| Kind | Layout | Adapter DOM | Independent build | Original vs exported visual QA | Release status |
|---|---|---|---|---|---|
| Knowledge | field-notes | Implemented | Covered by existing standalone verification | Pending manual 1440/1280/768/390 comparison | Assembly in Progress |
| Knowledge | essayist | Implemented | Covered by existing standalone verification | Pending | Assembly in Progress |
| Knowledge | learning-lab | Implemented | Covered by existing standalone verification | Pending: progress indicator must remain honest and functional, not a fake interaction | Assembly in Progress |
| Knowledge | curator | Implemented | Covered by existing standalone verification | Pending: detail drawers/catalog inventory fidelity | Assembly in Progress |
| Knowledge | radio-letter | Implemented | Covered by existing standalone verification | Pending: no fake playable audio; self-owned audio and transcript integration required | Assembly in Progress |
| Knowledge | reading-atlas | Implemented | Covered by existing standalone verification | Pending: complete 12-month data model, filtering, provenance, annual book section | Assembly in Progress |
| Helper | clinician | Implemented | Covered by existing standalone verification | Pending | Assembly in Progress |
| Helper | companion | Implemented | Covered by existing standalone verification | Pending | Assembly in Progress |
| Helper | somatic | Implemented | Covered by existing standalone verification | Pending: imagery, slow rhythm, session details | Assembly in Progress |
| Helper | coach | Implemented | Covered by existing standalone verification | Pending: disclosure behavior and method layout | Assembly in Progress |
| Helper | collective | Implemented | Covered by existing standalone verification | Pending: real people consent, verified events, team structure | Assembly in Progress |
| Helper | trust-path | Implemented | Covered by existing standalone verification | Pending: full five-station journey, route geometry, responsive and truthfulness review | Assembly in Progress |

**Acceptance boundary:** The adapters are not yet source-identical ports of their original Astro prototype implementations. The first-pass renderers preserve distinctive sections and reading order but simplify certain visual details and prototype-specific features. They MUST NOT be labeled `Starter Ready` until exported student sites have been visually compared with the prototypes on desktop and phone and their required inner pages validated. A passing compiler/CI does **not** advance this state.

The AI handoff is: choose layout → edit brand and local image sources → export project → replace demo content → run `npm run build` and `npm run verify` → check mobile/desktop and actual services, links and search → deploy through student GitHub workflow. Students do **not** have to learn internal layer terminology.

Parallel Art Direction work does not own the assembly renderer or its testing. Do not overwrite `src/pages/layouts/*` or the shared research/Blocks registry.
