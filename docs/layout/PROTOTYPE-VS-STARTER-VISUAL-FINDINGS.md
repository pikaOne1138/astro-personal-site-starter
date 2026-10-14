# Visual review from actual Prototype vs Student QA Artifact — 2026-10-14

## Evidence and scope

GitHub Actions run: https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38510605652

Artifact `starter-fidelity-comparison` contains **96 screenshots** (12 designs × 4 widths × prototype/standalone pair), a side-by-side HTML gallery, and machine-readable `results.json`. The 48 automated pairs passed geometry/anchor checks on SHA `94d96f4718d574f1960e79690d7fa410c62d5e71`. Visual composition was **not** approved by that automated result.

The desktop full-page pair contact sheet was reviewed against the actual screenshots. This is an issue inventory, not a claim of pixel-accurate manual QA at every mobile breakpoint.

## Specific observed structural differences

| Layout | Observed difference in independently exported Student layout | Action / verification |
|---|---|---|
| Field Notes | Original relies on type-led hand-written field marginalia; export centers a larger abstract art element and changes cover balance | Still needs typographic/margin and mobile comparative design signoff |
| Essayist | Overlapping magazine issue art, type scale and natural editorial detail are reduced; generated art differs from source photography | Needs hero/source media treatment review |
| Learning Lab | Original uses bold ultramarine/yellow typography, visual learning path, distinct two-column lesson modules; Student was a sparse generic card set | **CSS fidelity repair** on this PR: restore yellow/blue ink, lesson hierarchy, split path; compare new screenshots |
| Curator | Original has object/museum editorial depth, side index and opening drawers; Student reduces this to a basic directory | Still needs functional catalog/detail and visual rebuild |
| Radio Letter | Original is nocturnal audio station with horizontal waveform and layered episode transcript/archive; Student omitted wave and dense episode hierarchy | **Visual rhythm repair** on this PR: nocturnal station style and decorative, honestly labeled wave; true audio data contract already present; compare |
| Reading Atlas | Original makes 2026 a dominant full-cover number and has strong reading-almanac calendar and dark featured book band; Student distributes text differently | Filtering/data contract exists; yearly cover rhythm, book band and month layout still need composition review |
| Clinician | Original's hero/display type and split layout are tighter; Student has comparatively large generic room art | Needs typography and image fit review |
| Companion | Original has more expressive handwritten letter-style hero; Student simplifies typographic rhythms | Needs letter hero and signoff |
| Somatic | Original is an **immersive dark olive full-bleed hero**, then cream quote and dark green practice area; Student was mostly cream with light generic illustration | **CSS and section repair** on this PR: immersive olive hero, quote transition, deep green practice band; compare |
| Coach | Original oversize blue-highlighted issue title, overlapping offset photo and colored action cards; Student was generic columns with orange block | **Composition repair** on this PR: typographic scale, photo offset and blue/orange section identities; compare |
| Collective | Original strongly blue/yellow editorial collective with shared belief and team/calendar cards; Student was beige simplistic panels | **CSS fidelity repair** on this PR: blue/yellow collective and mixed section rhythm; actual consented team/event data is not invented |
| Trust Path | Original five-station dark-to-light route and dense trust details are reduced in Student to short generic station paragraphs | SVG navigation and verified service fields now exist; vertical station content and responsive details need further work |

## Release / quality rules

- `Assembly in Progress` for all 12 until visual comparison and essential independent **inner pages** pass.
- Automated 48-pair screenshot smoke is a geometry check, not screenshot similarity scoring.
- Review 1440/1280/768/390 after each meaningful CSS/composition change; check meaningful headings, grids, text wraps, illustrations, hero focal position and tap targets.
- Do not fabricate specific professional licenses, therapy outcomes, testimonials, sample book claims, available appointments or podcast audio.
- Prototype asset shots are **not** student output shots and should not be marketed as ready-to-export sites.
- Keep Art Direction PR #47 source prototypes untouched. Only alter independent `src/data/layout-assembly/*/Home.astro` on this feature branch.

## Next priorities

1. Curator and Reading Atlas fidelity (exhibition catalog and giant-year almanac).
2. Trust Path full visual/content station layout, especially long service information on mobile.
3. Field Notes, Essayist, Companion and Clinician detailed type/photo parity.
4. Cross-layout **inner-page** visual consistency and end-to-end student deploy review.
