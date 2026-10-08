# GitHub-only Astro PR Preview：首次啟用與使用

> 狀態：這份文件隨基礎設施 PR 提交；**在部署設定完成前，預覽網址尚未啟用**。
> 正式站仍使用既有 GitHub Pages，不需要 Cloudflare 或在學員電腦上執行 Astro。

## Architecture

```text
main (production) -> npm run build -> gh-pages:/ (production)
feature branch -> Pull Request N -> npm run build (PR base) -> gh-pages:/pr-preview/pr-N/ 
PR closed -> remove gh-pages:/pr-preview/pr-N/
```

Example preview: `https://pikaOne1138.github.io/astro-personal-site-starter/pr-preview/pr-2/` (**example only until deployed**).

## Before switching Pages source

The current `.github/workflows/deploy-pages.yml` deploys to Pages using GitHub Actions artifacts. The `rossjrw/pr-preview-action` needs branch-based Pages hosting. We **do not switch settings automatically**.

### Step 1: Merge this infrastructure PR into main

After review, merge the PR that adds:
- `astro.config.mjs` build-time `ASTRO_BASE_PATH`
- `.github/workflows/publish-gh-pages.yml`
- `.github/workflows/pr-preview.yml`
- `.ai/astro-pr-preview/SKILL.md`

The old direct Pages workflow is kept for the first migration stage to preserve the live website.

### Step 2: Ensure gh-pages branch has production files

In **Actions**, run **Publish main to gh-pages branch** (workflow_dispatch) if needed. Wait for success. Confirm `gh-pages` exists and contains `index.html` and `demo.css` (plus generated route folders). This workflow also runs on pushes to main.

### Step 3: Change one GitHub repository setting

Go to **Settings > Pages > Build and deployment > Source**:
- Select **Deploy from a branch**
- Branch: `gh-pages`
- Folder: `/(root)`
- Save and wait for Pages to publish.

Then verify the **existing production URL** still works:
`https://pikaOne1138.github.io/astro-personal-site-starter/`

If not working, restore the previous Pages source ('GitHub Actions') and investigate before touching PR deployments.

### Step 4: Verify PR preview

Visit existing [PR #2](https://github.com/pikaOne1138/astro-personal-site-starter/pull/2).

The preview workflow runs when a PR is opened/reopened or updated. If PR #2 predates activation, manually trigger it:
1. **Actions > PR Preview (GitHub Pages) > Run workflow** (must be present on default branch).
2. Enter PR number **2**.
3. Wait for success; inspect the action's PR comment or workflow summary.
4. Open actual preview URL and check the V1.5 homepage, `blocks/`, knowledge/helper demos, CSS and mobile layout.

A possible URL format is `https://pikaOne1138.github.io/astro-personal-site-starter/pr-preview/pr-2/` — **not confirmed live until workflow succeeds**.

### Step 5: Remove old direct Pages workflow (later)

When the branch-based deployment and PR preview both succeed, remove `.github/workflows/deploy-pages.yml` in a follow-up PR to avoid two competing deployment approaches. This is intentionally separated from setup to allow rollback.

## Permissions

Workflows declare job permissions:
- Production publisher: `contents: write`
- PR previews: `contents: write`, `pull-requests: write`

If GitHub blocks publication or PR comments, check **Settings > Actions > General > Workflow permissions**. Depending on repository policy, 'Read and write permissions' may need to be enabled by repository owner.

**Security**: preview workflow only runs for branches within the same repository. Do not run untrusted fork PR code with privileged tokens. Keep previews public-content-only (no API keys, private records, tokens).

## Common base-path mistakes

Production:
```text
/astro-personal-site-starter/
```

Preview:
```text
/astro-personal-site-starter/pr-preview/pr-N/
```

Correct Astro:
```astro
---
const base = import.meta.env.BASE_URL;
---
<a href={`${base}blocks/`}>元件庫</a>
<link rel="stylesheet" href={`${base}demo.css`} />
```

Avoid hard-coding `/astro-personal-site-starter/` in site links.

## Acceptance and rollback

- Workflow success does not guarantee visual correctness. Review the website in a browser.
- If switching Pages source breaks the production site, switch back to **GitHub Actions** and investigate; do not merge PR #2 during failure.
- Skill: `.ai/astro-pr-preview/SKILL.md`.
