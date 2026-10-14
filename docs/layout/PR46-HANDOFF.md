# PR #46 — Source restoration and independent learner verification

## Scope and continuation rules

Branch: `feat/visual-template-assembly`; remain Draft. Do not merge or deploy Production. PR #47 changed-file inventory was checked before this batch: none of its files are edited here, including its `scripts/build-student-pack.mjs` changes.

Baseline verified from GitHub: `3a5dbb89a940ac1b541f2fe3a716c23330a47509`, all four checks successful. Baseline screenshot artifact `11906677452`, standalone run `38589072930`, 168 renders. Downloaded and visually inspected all twelve homepage desktop/mobile overviews and twelve About/mobile and article-or-service/mobile views. Baseline green checks were not considered final design acceptance.

## Changes in this batch

- Learning Lab: ported original Prototype CSS and page structure into independent adapter; restored split Hero with marginal index, vertical node path with real local checkboxes/progress, and heading + unit-list spread. Removed extra decorative blue panel that substituted for the original path.
- Curator: ported original Prototype CSS and composition; restored portrait-free landscape exhibition image, 260px index, numbered drawers and object mockups. No fictional book titles or recommendations. Empty content visibly pending.
- Coach: source-derived stepped three-method accordion, offset card placement, method facts from Site Brief; removed decorative action-score replacement. Restored dark work section.
- Collective: source-derived three-part shared position panel and arched Hero photo, using genuine provided purpose and boundaries. Removed duplicate decorative manifesto. Does not invent team members or events.
- Other eight Home adapters: source-measured Hero/image proportions, CJK title line-height and spacing, source letter geometry and full-bleed body Hero. Atlas supplied reading records are no longer labeled empty/demo; actual month status is neutral.
- Articles: added missing page-edge gutters; archive's issue feature/TOC now occupy intended two columns; different family reading layouts retained; long prose code/table overflow contained; headings and navigation readable on mobile.
- About: removed outer generic decorative rails around already specialized compositions, restored full composition width, repaired narrow numbered fields and three-column mobile restacking.
- Helper interiors: Services, FAQ, first-visit and contact entry use the same selected Design Family and real serviceFacts. Reuses existing `FAQ.astro`, no new Block or fake booking flow.
- Navigation: native submenu Enter/Tab/Escape with focus restoration, visible focus, aria-current for actual destination, compact mobile header.
- Existing verification script now captures helper FAQ/contact/first-visit too, checks one main h1 and actual keyboard behavior, and uses 8 published articles + excluded draft plus long CJK prose/code/table fixtures. No second QA platform or ZIP generator.

## Verification in progress — do not upgrade to PASS without evidence

Local `npm run build` and twelve-source export checks passed before submission. Full independent twelve-site builds are running; updated GitHub CI/screenshot artifact must be inspected after this commit.

| Layout | Home | About | Article / service | Final four-size visual verdict |
|---|---|---|---|---|
| field-notes | updated | updated | updated | pending current screenshots |
| essayist | updated | updated | updated | pending current screenshots |
| learning-lab | source structure port | updated | updated | pending current screenshots |
| curator | source structure port | updated | updated | pending current screenshots |
| radio-letter | updated | updated | updated | pending current screenshots |
| reading-atlas | data labels repaired | updated | updated | pending current screenshots |
| clinician | updated | updated | updated | pending current screenshots |
| companion | source letter geometry | updated | updated | pending current screenshots |
| somatic | immersive source Hero | updated | updated | pending current screenshots |
| coach | source method composition | updated | updated | pending current screenshots |
| collective | source belief composition | updated | updated | pending current screenshots |
| trust-path | source route retained | updated | updated | pending current screenshots |

Local Chromium download returned a truncated ZIP from the Playwright CDN; use existing GitHub Actions' Chromium artifact to inspect actual exported sites. Do not mistake this local tooling limitation for a website failure.

## Remaining acceptance

Compare current actual exported learner screenshots against source Prototype at 1440/1280/768/390, including all inner pages. Existing source prototypes contain deliberately fictional material and tiny annotations; preserve geometry, never fictional identities, dates, pricing, licenses, outcomes or image licenses. Empty and partial service data must remain honest. Whole-site fidelity and arbitrary data adaptability are not certified by automated checks alone. Verify existing Builder Pack manifest parity in the static workflow. Check no horizontal overflow, hidden masthead, extra main h1, or broken keyboard focus in updated results.json.

## Iteration 1 evidence — commit 9709997f

Four GitHub checks PASS. Standalone run 38595917416, artifact 11908788966: 240 real Chromium captures; zero HTTP failures, overflow, JS errors, wrong families, extra/missing h1 or keyboard failures. Downloaded and inspected desktop/mobile homepage and About contact sheets and mobile long-article/service sheets.

Screenshot review found native dark-family chrome was unintentionally flattened to generic neutral chrome; fixed conditional explicit brand palette override. Fixed clinical About's empty fourth grid cell. Further source comparison removed six non-source decorative sections, bound actual published article entries to five knowledge Home adapters, and restored Atlas four-column monthly content cells. Current capture script also records neutral-color/font/copy structural comparisons and long homepage copy at all four widths; obtain updated artifact before accepting these changes.

All twelve independent Build + technical-output validators PASS locally for second source-cleaning batch. Main build PASS. The final visual pass is still pending. This batch has not certified original prototype parity for all twelve designs.
