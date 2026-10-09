# Cloudflare Workers Static Assets deployment

This is an **additional** deployment target. GitHub Pages and its PR-preview workflow remain unchanged.

## Cloudflare Workers Builds (connected GitHub repository)

- Production branch: `main` (only after PR review and merge)
- Root directory: repository root
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy --config wrangler.jsonc`
- Build output: `dist` (configured under `assets.directory` in `wrangler.jsonc`)
- Build environment: Node.js 22.19+; root path is the default. For Workers (unlike Pages), set `ASTRO_SITE_URL` to your actual production hostname for SEO URLs.
- Install: `npm ci` if `package-lock.json` is available; otherwise use `npm install`.

Do **not** enter `bun run build` as the deploy command. The build already invokes Astro, Pagefind, exact Chinese search generation, robots.txt generation, and output verification.

No `main` field, Cloudflare adapter, `nodejs_compat`, KV sessions, or SSR is required. Wrangler will upload prebuilt assets from `dist/` as-is. Explicit `--config` also avoids accidental framework-autoconfiguration if the current directory changes.

For Workers, `ASTRO_SITE_URL` must match the public canonical domain (including a temporary `workers.dev` hostname if that is the public site). If changed later, rebuild after changing it. Preview environments should not be indexed; audit preview configuration before enabling public preview URLs.

## Smoke checks

```sh
ASTRO_SITE_URL=https://YOUR-ACTUAL-PRODUCTION-HOST npm run build
test -s dist/index.html
test -s dist/rss.xml
test -s dist/sitemap.xml
test -s dist/robots.txt
test -s dist/pagefind/pagefind.js
npx wrangler deploy --config wrangler.jsonc
```

Never manually edit or commit `dist/`. Do not change the GitHub Pages production base or overwrite its deploy workflow. Confirm the deployed homepage, RSS, sitemap, canonical/OG, assets, Pagefind and 404 using the actual Cloudflare URL.
