# Defect and coverage register — learner starter quality

Source baselines: independent student-build reports W1–W14 and N1–N20 (2026-10-12), including F00–F14 fault injection. This table is a **living audit record**, not a claim that all fixes have passed final release QA.

States: `IMPLEMENTED` = code changed, pending final-sha teacher/learner/Preview acceptance; `COVERED` = existing maintained regression; `PARTIAL` = some cases not automated; `DEFERRED` = accepted scope pending follow-up.

| IDs | Responsible surface | Current disposition | Regression and required proof |
|---|---|---|---|
| W1/W2/W13/W14 | Guide, Cloudflare preview permissions and historical links | Existing guide/Skill changes | Real CF /guide and prepare walk-through; don't infer Preview URL or erase immutable deployment |
| W3/W12 | Student intake and onboarding copy | Existing fixes | ZIP extraction, no literal escaped-newline regressions; document source checks |
| W4/N1/N16 | Planner | IMPLEMENTED | Rename updates control labels; keyboard reorder restores focus; scrollable plan preview keyboard accessible; Playwright |
| W5/N15 | Theme seeds | IMPLEMENTED | Numeric palette contrast checks against actual background; inspect usage before claiming AA |
| W6 | Placeholders | COVERED | Notice not blocking build; never police learner's article length or quality |
| W7/W9 | MobileMenu/navigation | COVERED/PARTIAL | Decorative aria-hidden ignored; intentionally missing/misrouted menu fails; deterministic menu IDs |
| W8/N12 | Pagefind/exact-zh | IMPLEMENTED/PARTIAL | Both indexes built, student search works, 404/noindex excluded; negative missing-index case outstanding |
| W10/N2/N3/N4/N5/N14 | Generator/routes/Planner | IMPLEMENTED | Custom URL across Hero, footer, navigation, sitemap; reject unsupported article path; full HTML link audit and broken-link negative |
| W11 | FeatureGrid/FeaturedWork | Existing fix | Clickable linked card and nonlinked article render smoke |
| N6 | Draft and output verifier | IMPLEMENTED/PARTIAL | Output link audit, JSON scan, short Chinese draft title negative; Pagefind binary semantics require additional release QA |
| N7/N8/N9/N10 | Editorial audit | IMPLEMENTED | Skip link positive, low contrast and stuck Reveal negative; scroll to reveal before screenshots; long H1 warning |
| N11 | Student footer | IMPLEMENTED | small readable >=12px, touch targets >=44px measured on exported site |
| N13 | Design tokens | IMPLEMENTED | Starter Block and Editorial token alias bridge; cross-Block visual sample QA |
| N17 | SiteSearchDialog | IMPLEMENTED | Escape closes search on first keystroke even when search input contains text |
| N18 | H01 recipe | IMPLEMENTED | Unconfigured index is unlinked text, real href via prop, caption customizable |
| N19 | Student CI | IMPLEMENTED | Generated npm run verify checks output/drafts and build includes link gate; teacher independently exercises it |
| N20 | Prompt consistency | DEFERRED | Choose canonical initial prompt source and prevent duplication |
| S1/S2 | Claude's independent student website | EXTERNAL | Do not alter learner PR without request |
| R1 | Historical Cloudflare Preview | EXTERNAL | Security disclosure and user-approved management; no silent deletion |

## Required additional coverage beyond the discovered defects

1. All Blocks in `src/data/blocks.registry.json`: structural registry check exists; build and behavior/Props/renders in both kinds remain a distinct acceptance matrix, not implicitly proven by existence.
2. All 12 Layout direction prototypes: four responsive sizes; maintain distinction between home-layout prototype and complete multi-page learner website.
3. Editorial Recipes and Effects: representative integration, keyboard and reduced-motion, visible content; do not claim all possible cross-products tested.
4. Learner lifecycle: new site, article publish, withdrawal, search, new custom page, safe Preview, recovery; maintain one realistic knowledge and one helping-services site.
5. Both deploy modes: verify actual official production access separately from simulated PR builds, only with explicit authorization.
6. Final candidate: teacher CI + student extracted ZIP CI + browser QA + Cloudflare deploy SHA must agree. Everything not run is NOT TESTED.

The executable quality definition is in `QUALITY-CONTRACT.md`. Historic fixes must not be removed from CI simply because their original PR was already green.
