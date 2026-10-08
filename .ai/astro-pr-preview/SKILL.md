---
name: astro-pr-preview
description: GitHub-only PR preview, visual review, and safe release workflow for the Astro workshop starter. Use when changing website UI, opening PRs, reviewing previews, deploying or merging.
---

# Astro PR Preview & Release Skill

## Goal
A beginner should be able to ask AI to modify their Astro website, open a PR, receive a browser-accessible preview, visually approve, then merge and publish — without running a local web server or connecting Cloudflare.

## One-time setup (maintainer, not every student)
Read `docs/github-pr-preview-setup.md`. The repository must publish GitHub Pages from the `gh-pages` branch (root), NOT directly from the GitHub Actions artifact source, for `rossjrw/pr-preview-action` to work. Do not change Pages settings or merge deployment infrastructure without maintainer permission.

## Execution policy
1. Keep `main` deployable, and preserve existing site paths.
2. Create a feature branch from current `main`, never edit `main` directly for design changes.
3. Read `.ai/astro-ui-craft/SKILL.md`; for reusable component edits also read `COMPONENTS.md` if present.
4. Make requested changes, respecting responsive design and reduced-motion preferences.
5. Run `npm install` (or the project lockfile's install command) and `npm run build` where a shell is available. Do not claim tests passed without observing them.
6. Verify build under both paths:
   - `npm run build` (production base)
   - `ASTRO_BASE_PATH=/astro-personal-site-starter/pr-preview/pr-123 npm run build` (PR base; use real PR number when available)
   Confirm internal links, CSS, images and routes use `import.meta.env.BASE_URL` where needed.
7. Push feature branch and create a PR targeting `main`.
8. Wait for **PR Preview (GitHub Pages)** workflow to finish; do not invent a preview URL or claim it is live before verifying deployment.
9. Give user the actual preview URL from the bot comment/workflow and request browser review (desktop & mobile). Do not merge without explicit approval.
10. Once approved, merge PR. Check main branch publication and compare expected routes. The preview will be deleted after PR close.

## Preview workflow
- `.github/workflows/pr-preview.yml`
- Builds PR with `ASTRO_BASE_PATH=/astro-personal-site-starter/pr-preview/pr-N`
- Publishes files under `gh-pages:pr-preview/pr-N/`
- Replies in the PR with its preview link.
- Removes preview on PR close.
- Same-repository PRs only. Fork PRs are intentionally not deployed with write privileges.
- If preview workflow did not trigger for an older PR, update its branch with a new commit; or manually invoke the workflow from Actions after it is merged to default branch.

## Production workflow
- `.github/workflows/publish-gh-pages.yml`
- Builds `main` and deploys to the `gh-pages` branch.
- Excludes `pr-preview/` from cleanup and avoids forced branch updates.
- After migration, the pre-existing direct-pages deployment workflow may be removed in a **separate** cleanup PR. Do not remove the only currently working deployment until branch-based Pages publishing is verified.

## User acceptance checklist
- Homepage and key links load.
- `/blocks/` loads when present, and styles/fonts/images work under PR path.
- Knowledge / helper demo pages load, including 4th theme when present.
- Responsive layout works on phone; no horizontal overflow.
- Text, CTA, placeholders and example testimonials are appropriate.
- No broken CSS/JS/images; no links accidentally escaping to production.
- Build and workflow checks pass.
- No merge until human approves.

## Failure handling
- Missing `gh-pages` branch: publish `main` via the branch publisher first.
- GitHub Pages source still 'GitHub Actions': ask maintainer to switch Settings > Pages > Deploy from a branch > gh-pages > /(root). Do not assume the preview works.
- Workflow permissions denied: review Settings > Actions > General and `contents: write` / `pull-requests: write`.
- Styles appear from production: investigate hardcoded `/` paths, `base` and `BASE_URL`.
- Live preview returns 404 immediately after workflow: allow for GitHub Pages publication delay and check Actions status, do not claim success.
- PR from fork: build check only; do not grant privileged deployment actions to untrusted fork code.
- Any failed deploy: report failure and relevant logs, do not merge or hide errors.

## Suggested AI instruction
「幫我修改 Astro 網站。請依 astro-pr-preview Skill 建立分支、完成雙 base 建置檢查、開 PR，等待 GitHub Pages 預覽成功後提供實際網址給我驗收。不要直接合併或修改正式站。」
