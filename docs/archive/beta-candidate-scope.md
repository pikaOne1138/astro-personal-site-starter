> **已封存（2026-10-23）。** 這是某次 Beta 候選的範圍決定。仍有效的限制（Props 渲染 fixture 是實驗性的、人工設計品質與第一次使用的學員體驗沒測過）已併入 `docs/quality/open-acceptance.md`。僅供歷史查閱，不再維護。

# PR #45 Beta candidate scope / deferred engineering QA

Decision (2026-10-14): The workshop's priority is a usable independent Astro starter for non-developers, not exhaustive synthetic component fixture generation.

## Beta requirements
- Core teacher build and standalone student export run successfully at the same PR Head.
- Real Preview deployment SHA matches PR Head; real ZIP and two learner kinds have independent build evidence.
- Existing essential route, draft isolation, search, internal links, and truthful unconfigured services safeguards remain in continuous CI.
- A teacher explicitly reviews the candidate before Merge; build and CI do not mean manual visual approval.

## Deferred, not silently passed
- `scripts/qa-generate-props-render-fixtures.mjs` and `scripts/qa-verify-props-render-fixtures.mjs` are **experimental**. The separately added `qa-props-render.yml` workflow was removed from PR #45 because its generated `S02-fit-pair` input omitted nested `items` arrays. This is a fixture generator error, not evidence the actual component is broken. The historic failing workflow run 38424430647 remains in Actions records. No complete 476-Props runtime acceptance is claimed.
- Historic W/N/F current-SHA evidence is distinct from full 49 original pre-fix vs. post-fix closure.
- Manual design quality and real first-time human learner usability remain untested. AI-driven E2E and extracted ZIP checks are already available; do not rerun the full suite without material code changes.

## Next work packages (separate PRs)
1. Visual Template Gallery + Layout-to-Starter: actual screenshots, visual layout choice first, brand customization after, selected layout materially matches independent exported website, including essential interior pages.
2. Art Direction Differentiation + Template Expansion: revisit original design research, demand distinctive information hierarchy, grid, image composition, typography, rhythm and mobile behavior, then expand beyond the current 12 prototypes.
3. Non-blocking engineering QA backlog: schema-aware valid/invalid Props fixtures, original historical failure provenance and scoped regressions. Keep this separate from Beta readiness.

No automatic Merge or Production changes. Fixed Preview and candidate ZIP must remain tied to the exact SHA.