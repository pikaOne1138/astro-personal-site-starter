---
name: astro-pr-preview
description: Build, review, preview, and publish Astro website changes through GitHub Actions and GitHub Pages, without local preview or Cloudflare.
---

# Astro PR Preview & Safe Release

This project uses **GitHub Pages → Source: GitHub Actions**. Do not switch to "Deploy from a branch". See `docs/github-pr-preview-setup.md`.

## What the AI does
1. Read `.ai/astro-ui-craft/SKILL.md`, plus `COMPONENTS.md` when working on blocks.
2. Change website code in a new branch; do **not** push unreviewed UI changes to `main`.
3. Keep navigation/assets base-aware: `import.meta.env.BASE_URL`. Avoid hardcoded `/astro-personal-site-starter/` links in page markup.
4. Check `npm run build`. Also check `ASTRO_BASE_PATH=/astro-personal-site-starter/pr-preview/pr-N npm run build` when you have a local shell. Do not claim tests passed unless checked.
5. Open a GitHub PR targeting `main`. The workflow `PR Preview Build` builds the PR under its own base path and uploads a temporary artifact.
6. The **trusted** workflow `Deploy Astro to GitHub Pages` publishes the production site and PR preview together via the official Pages artifact mechanism. It posts the actual preview URL in the PR after successful deployment.
7. Wait for the real preview comment and Actions success; do not invent a URL or claim preview is live in advance.
8. Tell the user to review both desktop and mobile, CSS, images, links, and site content.
9. **Do not merge before explicit user approval.** After approved merge, verify production update. When the PR closes, its preview is removed automatically.

## Why this pipeline is arranged this way
- GitHub Pages' built-in custom Actions deployment deploys a complete website artifact, not a first-class isolated PR preview.
- PR code runs in a read-only, unprivileged build workflow.
- A default-branch `workflow_run` downloads successful PR site artifacts, overlays `pr-preview/pr-N/`, and publishes the combined static site using `actions/deploy-pages`.
- The `gh-pages` branch is only a **snapshot store** for other currently open previews. **It is not the publishing source.**
- Commits made with `GITHUB_TOKEN` to a Pages publishing branch do not trigger a Pages build; the official artifact deployment avoids relying on that trigger.
- Cross-workflow deployment is serialized by a shared concurrency group.

## Files
- `.github/workflows/pr-preview.yml`: read-only PR build + upload.
- `.github/workflows/deploy-pages.yml`: trusted main build + preserve/update previews + official Pages deploy + bot PR comment.
- `scripts/apply-pr-preview.mjs`: restricted overlay/remove operation.
- `astro.config.mjs`: build-time `ASTRO_BASE_PATH` override.
- `docs/github-pr-preview-setup.md`: maintainer-facing activation and rollback.
- `.ai/astro-pr-preview/references/deployment-recovery.md`: error classification, safe recovery, new-run procedure and verification.

## Preview URL
Example format (only usable after successful deployment):
`https://pikaOne1138.github.io/astro-personal-site-starter/pr-preview/pr-2/`

## Failure policy

**Before any Actions retry or redeployment, read `references/deployment-recovery.md`.** Diagnose Run ID, Job steps, artifact names/IDs and PR head SHA. A re-run of the old deployment Job is **not** a new workflow run; it may upload another `github-pages` artifact into the same Run. For a fresh PR preview, trigger a new `pull_request: synchronize` from the PR branch, then wait for the new trusted `workflow_run` and verify live HTML. Do not assume `workflow_dispatch` alone refreshes the latest PR artifact.

- PR build failed: fix build errors; no merge.
- Pages publish failed: inspect deployment log and token permissions; no merge.
- No PR comment: inspect workflow_run trigger and Actions job, not merely PR checks.
- CSS/images broken: inspect base-aware paths.
- PR from a fork: no privileged preview; do not try to bypass the same-repository security condition.
- Screenshot QA is still human review; a successful CI build does not establish visual correctness.

## Workshop-facing instruction
「請依 astro-pr-preview Skill 幫我修改網站，建立 PR，等線上預覽發布後把真正可用的網址給我。我確認成果才合併發布。」
