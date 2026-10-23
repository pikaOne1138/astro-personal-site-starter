> **已封存（2026-10-23）。** 這是學員專案脈絡（`PROJECT.md`／`AGENTS.md`）的草稿規格，已實作於 `scripts/student-project-context.mjs` 與 `docs/student-builder-pack/STUDENT-AGENTS.md`、`PROJECT-TEMPLATE.md`。它是開發者規格，不該隨學員 ZIP 出貨，現已移出。僅供歷史查閱，不再維護。

# ATP Portable Project Context — implementation contract

Status: Draft specification. This document describes student-owned websites, not the ATP research showcase.

## Goal
A beginner can describe website changes in ordinary language. An AI that has file and Git access should read the student's project context, choose the existing focused Skills, make only scoped changes, verify them, and request explicit approval before merging or publishing.

## Student-owned files
- `AGENTS.md`: stable operating rules and task-to-Skill routing, not a transcript or model-specific prompt.
- `PROJECT.md`: evolving, student-specific site brief, audience, brand/content decisions, layout rationale, current environment, open questions and handoff; never store secrets.
- `site.config.json` / source / Git: authoritative for actual implementation values and deployed state. PROJECT.md cannot override the code, repository status or deployment records.
- `.ai/*/SKILL.md`: focused procedures for design, Astro, publishing, maintenance, testing and deployment.

## From first conversation to ongoing maintenance
1. Onboarding can start from a small default PROJECT.md before a Git remote exists. Unknowns are clearly marked `待確認`, never invented.
2. StarterPlan JSON remains structured generator input. Map validated fields into PROJECT.md; retain why a layout, navigation or CTA was chosen.
3. Export both core files into the **actual standalone site** as well as the distributable builder ZIP. Do not merely ship files in the teacher's showcase bundle.
4. New AI sessions first inspect AGENTS.md, PROJECT.md, the local worktree, configured remote, current branch and pending changes. Local uncommitted changes must not be discarded in favor of older GitHub state.
5. Update PROJECT.md for durable changes of identity, audience, architecture or important decisions, not every cosmetic edit. Document uncertainty and human approvals; do not overwrite user-authored history upon kit upgrades.

## Natural-language routing
- New article / retract draft: astro-content-publishing, regression gates.
- Add/move page, navigation: page-management and navigation checks.
- Change visual hierarchy: layout/editorial/UI Skill and responsive visual QA.
- Update image or copy: minimal local edit, image/permission/link verification.
- Broken site: site-maintenance and PR preview; prefer reversible fixes.
- First deploy / publish: starter-deploy + pr-preview; explicit approval.

## Permission boundary
- Inspect/read/plan and isolated branch edits, local builds/checks: autonomous with available tools.
- Commit, push, open PR and preview: only in the user's authorized workspace/repository.
- Merge, public deployment, activating indexing, DNS, destructive modifications or irreversible history changes: explicit informed user approval for the affected target and version.
- Do not claim availability of tools, PR preview, tests or deployment unless observed.

## Delivery & acceptance
- Scope check: compare Git diff to request and protect untouched pages/routes.
- CI: Astro build, existing regression checks, draft isolation, navigation/search/URLs as applicable.
- UI changes: 1440/1280/768/390 and keyboard/reduced-motion checks; distinguish automated screenshot capture from actual visual review.
- Human-facing report: what changed, preview URL with commit SHA if available, PASS/FAIL/BLOCKED/NOT TESTED, remaining decisions, and how to revert.
- Test three paths: new beginner on ZIP; existing student site with prior content; new AI/tool taking over a local/remote project.

## Integration targets
`docs/student-builder-pack/STUDENT-AGENTS.md`, `START-HERE.md`, `AGENT-HANDOFF.md`, official start prompt, `scripts/build-student-pack.mjs`, `scripts/export-starter.mjs`, expanded renderers, student-facing Skills and generated-workflow checks. Preserve PR46 scope and avoid overlapping PR48/49 design rubric.

## Not in scope
No agent framework, custom CMS, SaaS dashboard, CRM, forced hosting provider, automatic merge, or replication of the research showcase's complex PR deploy workflows.
