# PR #50 — Mandatory integration gate after PR #46

> **BLOCKING FOR MERGE:** Do not merge PR #50 based only on the main-path Starter exporter or current CI. PR #46 maintains the expanded **25-layout Art Direction / Layout-to-Starter adapter path**. Once #46 is merged (or its final code is integrated into this branch), verify this separate path before approving #50.

## AI takeover instructions
1. Read current GitHub status, merge commits and actual heads for PR #46 and PR #50; do not rely on this document for live state. Synchronize PR #50 with the applicable main after #46 merges. If #46 is still Draft, keep this gate **BLOCKED**, do not claim integration passed.
2. Inspect both `scripts/export-starter.mjs` and `scripts/export-art-direction-starter.mjs`, plus `scripts/art-direction-adapters.mjs`, `scripts/build-student-pack.mjs`, `scripts/student-project-context.mjs`, corresponding tests and Skills. Respect the distinction between standard Starter and 25-layout adapter export.
3. Make **both standalone export paths** install the same student-owned `PROJECT.md`, site-specific `AGENTS.md`, minimal `CLAUDE.md`/`GEMINI.md` pointers, `.gitignore`, `scripts/site-status.mjs`, `scripts/check-secrets.mjs` and package/PR CI guard wiring. Prefer one shared idempotent-safe finalizer, not duplicated logic. Do not overwrite existing student content on rerun or upgrade.
4. Build the actual distributable `AI-建站資料包.zip` and exercise the supported **25 layout directions**, including the adapter exporter and both site types. Assert each generated site contains the required files, that builder-only wording or evaluation answer keys do not leak into student site, and that its Git/secrets checks are executable. Distinguish supported/Ready from in-progress layouts; do not fabricate visual acceptance.
5. Run relevant standalone/adapter regressions and CI. Where visual changes exist, review 1440/1280/768/390 plus real Preview tied to the expected SHA. Report PASS/FAIL/BLOCKED/NOT TESTED with exact commit and run links; build green alone is not human UI acceptance.
6. Leave #50 Draft until these integration gates, remaining security tests and explicit user review are completed. **No automatic merge, Production publish or DNS changes.**

## Required merge checklist
- [ ] PR #46 final state verified; integration source SHA recorded.
- [ ] PR #50 incorporates latest applicable main without silently losing student or layout changes.
- [ ] Main and Art Direction exporters share the portable student-site finalizer.
- [ ] 25 layout directions audited for file output; any not-supported layout identified, never counted as PASS.
- [ ] ZIP and student site do not expose private interview answer keys.
- [ ] Secret checks and dirty-worktree status exercised in generated site, including adversarial fixtures.
- [ ] CI results and Preview SHA recorded; unresolved failures disclosed.
- [ ] User explicitly approves Merge of PR #50.

This file is an **integration handoff gate**, not evidence that the integration has already passed.

## Gemini audit critical finding: surrogate layout contaminates PROJECT.md
The main-based `scripts/export-art-direction-starter.mjs` currently calls `export-starter.mjs` with a temporary `field-notes` (knowledge) or `clinician` (helper) `layoutSlug`, then executes `adapter.compose(generated,settings)`. Since the normal exporter finalizes `PROJECT.md` first, the generated project document can contain the **wrong layout** even though `site.config.json` is later corrected. This is a merge-blocking **confirmed sequence**, not only an absence of context files.

**Required safe integration:** Refactor so the shared scaffold may be built without finalizing the context, then after the actual adapter `compose` and true `settings.layoutSlug` are finalized, run the common student site finalizer once. Never overwrite `PROJECT.md` in an existing student site. Verify `subject-atlas` and `practice-compass` (and the rest of supported 25) report their **actual** Layout in both `PROJECT.md` and `site.config.json`. Record exact paths, SHA and results. Coordinate with PR46 ownership; this document does not claim code integration is already completed.

## Gemini audit other checkpoints
- Cloudflare branch-preview indexing must be denied even with `SITE_INDEXABLE=true` (check both HTML meta robots and `robots.txt`, especially unknown production branch and all Preview configuration).
- Evaluate whether unpublished loose Markdown notes in `src/content/drafts/` are falsely treated as leak candidates; preserve real draft isolation while allowing non-frontmatter notes only when they cannot be published.
- Align student intake states (`CONFIRMED`, `AI_DRAFT`, `MISSING`, `DO_NOT_PUBLISH`) with PROJECT context; protect against publishing explicitly private content.
