# 09.2 Art Direction differentiation audit and parallel handoff

Baseline main: `26acf168b90a7d672d9468c7489e8095cf060683` (PR #45). Contract v1: `398e08270277af68ce6ab5f4e62267eff75abe52` on the parallel assembly branch; not present on baseline main. Evidence is [OBS] GitHub source and original ten-site ZIP review; [INF] design assessment; [NEW] proposed original layouts. Browser screenshots have **not** been captured; all 12 below were audited by reading Astro DOM and CSS, **not** by claiming 12 true visual browser sessions.

## Twelve-layout structure comparison

| Slug | Hero and hierarchy | Primary flow / grid | Media, content density and CTA | Interior continuity and risk |
|---|---|---|---|---|
| field-notes | Observation manifesto, numbered side-rail | 78px rail / main / 180px marginalia; dated ledger | specimen image, medium density, open research question | homepage only; field-journal articles needed; overlaps curator only at “index” abstraction |
| essayist | oversized typographic issue masthead | one long essay → notebook list | image tucked behind text; low density; read-one-piece CTA | homepage-embedded prose; full reading page needed |
| learning-lab | learning commitment with right-side image | checkable sequence → progress → module ledger | learning-map artwork; medium-high; “follow path” CTA | homepage-only; local checkboxes not cross-page progress |
| curator | large copy next to arranged objects | asymmetric exhibition and cabinet entries | image-led; dense object metadata; browse archive | needs item detail pages; distinct from observation ledger |
| radio-letter | dark audio broadcasting stage | player → transcript → episode timeline | cover artwork/audio; episodic CTA | needs independent episodes and transcript fallback |
| reading-atlas | large year numeral without photography | month cells → featured annual book → index | zero-image, data-heavy editorial | year/month/detail routes needed; not the same as essayist |
| clinician | professional clarity, image at side | scope → process → credentials → contact | explanatory, medium density | **high overlap with trust-path** until turned into practitioner disclosure ledger |
| companion | personal letter introduction | letter narrative → way of working → invitation | prose-led, low density, gentle CTA | needs story-led About and service pages |
| somatic | full-bleed atmospheric photography | bodily arrival → practice → arrangement | image-first immersion, low-medium density | needs consent and service-boundary page |
| coach | high-contrast newspaper-like typographic cover | problem → 3-step method → work list | task-led, medium density | should deepen into actual work sheets / responsibility matrix |
| collective | collaborative manifesto and teamwork imagery | values → team directory → event ledger | people/activity-led, medium-high density | multiple practitioners are advanced scope; all names/dates explicitly demo |
| trust-path | dark editorial prologue and five stations | visitor questions → five-node journey → time/fee/boundaries | no photography, dense service-transparency structure | **high overlap with clinician** if both become generic scope + booking |

## Priority differentiation decisions [INF/NEW]

1. **clinician vs trust-path**: make clinician a formal practitioner information sheet (scope, qualification verification, consent, referral and fees in tables), preserving trust-path’s visitor-first exploratory five-station narrative. Different information object, hero and interior renderer.
2. **field-notes vs curator**: preserve field-notes’ time-stamped observation ledger and margin references. Make curator a genuine asymmetric image collection with metadata and details; not another text diary.
3. **essayist vs reading-atlas**: essayist’s single article is the homepage protagonist. Reading-atlas remains a navigable month/year index, not simply a year-end essay.
4. **coach**: turn generic “three steps” into deliverable-oriented work notes and decision tools, keeping it distinct from the clinical disclosure structure.

## Original extensions in this commit [NEW]

### subject-atlas (knowledge)
Topic-first library; wide typography manifesto, left stationary topic rail, uneven 2-column directory, latest editorial note and independently navigable table-form article archive with a narrow article reading page. No hero photos or changing-theme dependency.

- Prototype routes: `/layouts/subject-atlas/`, `/layouts/subject-atlas/articles/`, `/layouts/subject-atlas/articles/sample/`.
- Hero 3:1, directory 2 columns with spanning leading topic, tablet simplified, phone stacked with in-flow rail.
- Semantic data slots: `topics[]`, `topicEntries[]`, `latestNote`; no image required.
- Beyond prototype, adapter must bind actual Content Collections, existing Pagefind/RSS/search and essential About.

### practice-compass (helper)
Starts with **visitor decision**, not service card grid: giant typographic proposition → three intent-based entry rows → side-by-side suited/not-suited contrast → disclosure/FAQ. Its service page uses a disclosure ledger and contact sequence, explicitly showing missing professional credentials and price.

- Prototype routes: `/layouts/practice-compass/`, `/layouts/practice-compass/services/`.
- Hero 2:1, decision rows 100px/1fr/210px, scope pair and later FAQ; mobile stacks row link after copy.
- Data slots: `visitorIntents[]`, `scope`, `serviceInfo`, `faq[]`.
- A real starter must additionally deliver About/FAQ/contact/privacy and actual verified external booking settings.

## Further directions — intentionally not counted as shipped

- `visual-essay` knowledge: image-sequence-led nonfiction with chapter-level focal crops, distinct from object collection, pending licensed imagery.
- `open-studio` helper: process and publicly verifiable deliverables instead of generic practice claims, pending real examples.
- `marginalia-notebook` knowledge: multi-layer citation and margin relationships; must prove distance from field-notes.
- `first-visit-brief` helper: first-appointment information sheet; needs proof of difference from trust-path.

## Contract v1 and branch ownership

JSON manifests: `src/data/art-direction-definitions/subject-atlas.json` and `practice-compass.json`. Both deliberately use `schemaVersion:1`, `assemblyStatus:"prototype"`, `adapter:null`, `screenshots:{desktop:null,mobile:null}`; `composition.hero`, ordered `sections`, `readingFlow`, breakpoints, content fallback and required eventual pages are explicit. A must **not** advertise independent site export until it creates/adopts adapters and checks page fidelity, build, and desktop/mobile screenshots. Unimplemented `pages.required` describe *future starter completeness*, not built pages.

This branch only adds new layouts, their scoped source, definitions and this audit. No edits to `src/pages/starter/index.astro`, `scripts/export-starter.mjs`, shared `layout-directions.json`, Gallery, Block Registry or adapter internals. Art Direction work is not permission to cherry-pick or merge A's WIP.

## QA status (truthful)

- Baseline latest main and merged PR #45: verified using GitHub.
- 12 Astro source compositions and existing layout registry: reviewed.
- Two original layouts, 5 Astro pages total (3 knowledge + 2 helper): authored.
- New Layout Definitions: authored, prototype status only.
- Full `npm run build`: not yet confirmed, depending on CI run evidence.
- Chromium screenshots at 1440/1280/768/390: **not captured**, do not substitute illustrations.
- Real Preview, deployment SHA and human Art Direction: **not yet verified**.
- Independent export Starter: intentionally owned by conversation A.

No PR auto-merge, DNS or Production action permitted.
