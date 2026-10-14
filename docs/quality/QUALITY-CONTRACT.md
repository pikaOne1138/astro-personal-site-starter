# Astro workshop quality contract

This file defines **what a passing test means**. A green build by itself is not a release acceptance.

## Truthful statuses

- **PASS**: an applicable assertion was actually executed against the stated commit and output.
- **FAIL**: an applicable invariant was violated, including a validator's inability to reject a known bad fixture.
- **NOTICE**: example/placeholder content, empty articles, or deliberate experimentation; never block technical builds solely for these.
- **NOT TESTED**: no evidence at this commit; never silently count as PASS.
- **BLOCKED**: tool access, unsupported platform, deployment or environment prevented the check.

## Invariants applicable to both learner types

1. Every internal link to a generated page or local asset resolves; a custom page path must be respected by navigation, hero CTAs, section patterns, footers and sitemap.
2. Unpublished Markdown stays out of public HTML routes, discovery pages, RSS, sitemap and public searchable JSON; new publishing surfaces require an explicit gate.
3. Public article content and search index are derived from the generated output, not from a parallel hard-coded metadata array.
4. No form, booking link, qualification, recommendation or newsletter is presented as successfully functioning without the actual integration and truthful data.
5. User-facing navigation, essential controls, keyboard focus and Escape behavior work. No purely decorative text alters accessible names.
6. Hidden skip links must be keyboard-accessible and must not be mistaken for overflowing visible content.
7. Animation is enhancement. Readable content must not remain permanently invisible; reduced-motion works.
8. A build success does not establish responsive quality. Review 1440, 1280, 768 and 390; add 375 for edge cases.
9. Real deployed Preview and its source commit must be matched; published historical deployment URLs may remain reachable.
10. Student starter package must stand alone. The same core output assertions run under a student-owned read-only PR CI, not only in the research repository.

## QA layers

| Layer | Validations | Required evidence |
| --- | --- | --- |
| Contract | StarterPlan, routes, Registry references, component Props | positive and negative fixtures |
| Output | Astro build, internal href/src, metadata, public articles, draft leaks, RSS, sitemap, Pagefind and JSON | generated dist and machine-readable result |
| Browser | navigation, search, dialogs, focus, keyboard, essential interaction | Playwright on representative pages |
| Visual | responsive, accessibility, contrast, visible content, reduced-motion | screenshot + audit, notes for subjective design |
| Delivery | ZIP install/export/build/validate, student CI, real CF Pages Preview | commit SHA + deployment ID/URL |

## Regression discipline

- Retain all previously proven W-series fixes, N-series fixes, editorial overlap fixes and effective F-series fault injections as permanent regression fixtures.
- Each defect is not VERIFIED until: a pre-fix failure is reproducible, the post-fix normal fixture passes, an injected fault fails the intended gate, and the generated learner export passes where applicable.
- A later commit invalidates earlier release-candidate acceptance until mandatory gates pass again at the new SHA.
- Keep the minimal student-side checks on every PR; schedule expensive full-layout screenshot work on teacher-side shared-component changes and before candidate release.
- No automatic merge, production deployment, history rewriting or third-party content destruction.

## Release decision

Do **not** claim complete acceptance until all high-priority defects are verified, no critical checker false positives/negatives remain, teacher and exported-student CI both pass, the actual ZIP is black-box exercised, and the latest Cloudflare Preview receives visual QA. Known low-priority exceptions must be listed as DEFERRED. Unknown or missing evidence is NOT TESTED.
