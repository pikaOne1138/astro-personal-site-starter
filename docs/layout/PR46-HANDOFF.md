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

## Iteration 2 evidence — commit e1f7ab0f

Standalone run 38597060324, artifact 11911276390: **336 captures = 240 page×viewport + 48 neutral structural comparisons + 48 long-home-title cases**. Zero HTTP, overflow, runtime, wrong family, heading, keyboard or invisible year failures. Actual images downloaded and visually reviewed. Round 1's 1280/768 home and interior/FAQ/contact contact sheets were also inspected, rather than limiting review to desktop/mobile.

Found and corrected an additional visual defect: normal Essayist/Coach titles could extend beneath absolute-positioned images at intermediate widths despite no overflow. Constrain concise titles to the left 65% on desktop; long titles already use in-flow photos. Long featured Essayist article titles now use a smaller type step. Neutral comparisons now remove residual colored underlines and unrelated optional Pattern sections. Clinical Hero metadata binds provided scope/method/qualification instead of displaying pending over supplied facts.

### Per-family acceptance status

All twelve have passing Build/output, four-size page renders, no horizontal overflow, and functioning navigation focus. About is rendered with all twelve selected families; six knowledge archives/details preserve collection content; six helper service/FAQ/first-contact routes preserve provided facts. These are scoped runtime/layout checks, not a blanket promise of final art direction or every possible student input.

| Layout | Evidence at 1440/1280/768/390 | Source fidelity still needing work |
|---|---|---|
| field-notes | PASS: marginal Hero, arched media, real dated ledger, About/archive/detail | Source margin copy remains explicit demo; original complete article extraction is not shipped |
| essayist | PASS: issue cover, focal essay, notebook, issue About/detail | Concise-cover image overlap final correction needs newest artifact; source content replaced with real owned summaries |
| learning-lab | PASS: source split Hero, vertical nodes, real local progress, module spread | Three path steps are clear DEMO; no actual curriculum array in Site Brief yet |
| curator | PASS: source still-life frame, numbered index, expandable article drawers | No dedicated multi-type collection schema; uses published articles or explicit pending items |
| radio-letter | PASS: dark split/wave, owned audio/transcript path, real archive | Original more elaborate program-note split is only partially reconstructed; test audio fixture does not prove playback quality |
| reading-atlas | PASS: outlined year, 4-column month cells, owned reading content, annual band | Original four-season lower index and annual-book large cover/reading-explanation composition remain simplified |
| clinician | PASS: source split, fit, process, credentials/contact, complete service facts | Source-fit example copy remains generic; final Hero metadata binding requires latest artifact |
| companion | PASS: arched Hero, source open letter geometry, low-pressure process, letter About | Letter content remains clearly marked demo rather than an author-supplied letter data field |
| somatic | PASS: full-bleed Hero, transition, practice/services, spacious dark interiors | Original practice-anchor explanatory details are simplified; actual licensed photo unavailable in fixture |
| coach | PASS: type-first cover, stepped method accordions, dark work, action About | Original lower type-led CTA composition remains simplified; concise-cover correction needs newest artifact |
| collective | PASS: arched Hero, 3-part belief, honest member/activity placeholders, board About | Actual team-card and event-ledger data model/DOM not fully restored; no invented people/events used |
| trust-path | PASS: 5-stop route/spine, scope, method, fees, first visit and boundaries | Original proportional duration ruler remains simplified; actual factual contact URL integration requires owned endpoint |

### What is and is not complete

- Stage 3 **current fixture gates** pass for all twelve independent exports; existing Builder Pack ZIP and Guide manifests are compared by existing static workflow. Final latest-head statuses must be checked before handoff.
- Stage 2 practical interior continuation is implemented and visually checked for sampled current content; no new service catalogue/schema or arbitrary custom content editor was introduced.
- Stage 1 source geometry was substantially restored across all twelve, but the specific omissions above mean it must **not** be called twelve fully faithful final websites.
- Local Chromium download failed; GitHub Actions Chromium captures were obtained and inspected instead. No current blocker from local browser install is passed to the user as a website defect. Safari, Firefox, actual mobile devices, assistive technology and arbitrary future content are not tested.
- Next continuation must address the concrete fidelity omissions above, starting with Radio Letter, annual-book/season index, Collective team/event geometry and Trust Path duration ruler. Do not restart research or invent their missing facts.

### Screenshot access and provenance

[Iteration 2 actual learner screenshots](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38597060324/artifacts/11911276390). Extract and open `index.html`; every original full-page JPG and `results.json` is included. Filenames: `<slug>-home-<width>.jpg`, `<slug>-about-<width>.jpg`, `<slug>-articles-<width>.jpg`, `<slug>-articles-qa-long-title-<width>.jpg`, helper `<slug>-services/faq/booking/first-visit-<width>.jpg`, plus `<slug>-neutral-home-<width>.jpg` and `<slug>-long-home-<width>.jpg`. Actions retains these artifacts for seven days; the next run produces its own SHA-specific evidence.

## Iteration 3 — completion of source-native sections

The omissions listed under Iteration 2 are historical findings, not instructions to redo those changes: this batch now implements Radio Letter's program-note split, Atlas annual-book object + explanation and four seasonal lists, Collective owner-provided team cards + event ledger, Trust Path proportional timing, and Coach lower type-led CTA. Optional `team`, `events`, `serviceTiming` are validated and exported in the same Site Brief/generator; missing data shows pending states. Never infer people, event dates or timing from nothing. The existing assembly Skill documents these optional fields. Primary brand colors now flow into the selected native compositions through tokens rather than remaining hardcoded accents.

### Final pending gates for this commit

The existing standalone capture now includes **576 images** when complete: 240 normal page×viewport + 48 neutral comparisons + 48 long-home cases + 48 single-article + 48 empty-article + 144 empty-service-fact page×viewport cases. This count is an expectation until the current CI artifact confirms it. Every row has actual HTTP, width, h1, family, keyboard and overflow evidence. Empty/single cases rebuild the same genuine exported project, not another generator or dashboard.

Local source-restoration batch: twelve independent builds and main build passed. Latest expanded empty/single/owned-data cases are being verified at submission; check the current Head workflow results rather than reusing Iteration 2 PASS. Existing Builder Pack was extracted and all twelve exported; full knowledge/helper builds passed, including Guide/ZIP manifest equality.

| Family | Completed source-native compositions retained in export | Final current-Head visual status |
|---|---|---|
| field-notes | marginal ledger / arched media / actual published records | awaiting final artifact review |
| essayist | overlap cover with safe title width / focal real essay / notebook | awaiting final artifact review |
| learning-lab | split cover / numbered vertical interactive path / published unit spread | awaiting final artifact review |
| curator | still-life frame / numbered index / real article drawers | awaiting final artifact review |
| radio-letter | dark cover / waveform / program-note split / transcript / actual archive | awaiting final artifact review |
| reading-atlas | outlined year / four-column month cells / annual book spread / seasonal index | awaiting final artifact review |
| clinician | clinical split / fit / method / supplied scope and qualification / contact | awaiting final artifact review |
| companion | arched split / open letter / three low-pressure steps / contact | awaiting final artifact review |
| somatic | full-bleed controlled cover / transition / practice band / services | awaiting final artifact review |
| coach | type cover / offset method cards / dark work / type-led final CTA | awaiting final artifact review |
| collective | arched cover / belief spread / owned roster / owned event ledger / invitation | awaiting final artifact review |
| trust-path | five-stop route / spine / scope / method / real proportional timing / first contact | awaiting final artifact review |

Final report must distinguish structural fidelity, observed fixture/RWD acceptance and production readiness. The original images, copy and claimed identities are not redistributed as student facts. Author-specific letter/path content still requires the learner's real copy; those are truthful demo/pending states, not broken services. Audio decoding/playback with a real valid owned recording, Safari/Firefox/physical devices and screen-reader review remain outside current Chromium evidence. No merge or Production deployment.
