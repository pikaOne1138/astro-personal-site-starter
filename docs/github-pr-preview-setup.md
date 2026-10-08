# GitHub-only Astro PR Preview — 一次設定，後續自動預覽

## 目標

學員不需本地跑站、購買網域、Cloudflare 或設定額外 PAT。維持現在的 **GitHub Pages → GitHub Actions** 發布來源。每次 AI 改版開 PR，成功建置後自動得到獨立的線上預覽網址。

## Pipeline

```text
                   PR #N (same-repository branch)
                              |
                       PR Preview Build
                   (read-only, no deploy token)
                              |
                  preview-site artifact + event.json
                              |
             trusted main-branch workflow_run
                              |
       npm run build (main, production base)
          + saved previews from gh-pages snapshot
          + add/remove PR N preview artifact
                              |
           GitHub Pages deploy-pages (artifact)
                              |
               PR bot comment with preview link

main push -> same trusted workflow -> keep existing previews -> deploy production
PR closed -> remove its preview -> deploy production + remaining previews
```

`gh-pages` is only a saved copy of the latest assembled output so that previews survive future production deployments. It is **NOT** the GitHub Pages publishing source. We rely on `actions/deploy-pages` to publish because a push made by `GITHUB_TOKEN` does not by itself trigger the branch-based Pages build.

## Initial setup (maintainer)

1. Check **Settings → Pages → Build and deployment → Source = GitHub Actions**. **Do not change it to Deploy from a branch.**
2. Merge the PR adding these files only after review:
   - `astro.config.mjs` (configurable `ASTRO_BASE_PATH`)
   - `.github/workflows/pr-preview.yml`
   - `.github/workflows/deploy-pages.yml`
   - `scripts/apply-pr-preview.mjs`
   - `.ai/astro-pr-preview/SKILL.md`
3. Open **Actions**, check the new `Deploy Astro to GitHub Pages` workflow ran successfully on the merge to `main`. Check the production site still works.
4. For the existing UI **PR #2**, make a small new commit to its source branch so the `synchronize` PR event re-triggers the build. The PR build workflow is read-only. After it succeeds, `Deploy Astro to GitHub Pages` processes its artifact and adds a PR comment with the preview URL.
5. Click the actual posted URL. Check `/blocks/`, both website types, styling, images, and mobile views.
6. Only merge PR #2 after accepting its preview.

## Typical preview URL

```text
https://pikaOne1138.github.io/astro-personal-site-starter/pr-preview/pr-2/
```

This is a **format example**, not confirmation that a preview has been deployed.

## Required access

Workflow files request permissions explicitly:
- PR Preview Build: `contents: read`, no privileges.
- Trusted deployment: `contents: write` (snapshot store), `actions: read` (download artifacts), `pages: write`, `id-token: write` (publish), `pull-requests: write` (comment).

If blocked by organization/repository Actions policy, check **Settings → Actions → General → Workflow permissions**, then review Action run errors. No custom PAT is needed by design.

### Security considerations
- Only branches belonging to the same repository are accepted for the preview pipeline. Fork PRs are not published.
- The trusted workflow does not run PR code; it only downloads static site artifacts and checks event metadata.
- Production uses code checked out from `main`, not the PR.
- Do not publish private documents, API keys, or secret variables into a public preview. Static previews are public.
- GitHub pages publication is global; the workflow serializes Pages deployments so open PR previews survive concurrent deploys.

## Astro path handling

Production build base:
```text
/astro-personal-site-starter/
```

PR #2 preview base:
```text
/astro-personal-site-starter/pr-preview/pr-2/
```

Use `import.meta.env.BASE_URL` for links and `public/` assets. The HTML/components/data do not need separate copies for previews.

## Acceptance

- [ ] PR Preview Build succeeded
- [ ] Deploy Astro to GitHub Pages succeeded
- [ ] Preview bot comment contains real URL
- [ ] Preview homepage and /blocks/ work
- [ ] Desktop and mobile are correct
- [ ] No broken links, images or styling
- [ ] Existing production site unchanged before merge
- [ ] User explicitly approves merging

## Rollback

If the new workflow fails on the first merge, do not switch Pages source. Restore the previous `.github/workflows/deploy-pages.yml` from Git history on a new PR and merge it. The previous deployment mechanism remains supported while Source is GitHub Actions. The `gh-pages` snapshot branch is not used as a publishing source and cannot by itself overwrite the live site.

## Skill

See `.ai/astro-pr-preview/SKILL.md`.
