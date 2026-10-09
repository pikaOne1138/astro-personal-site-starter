# Cloudflare Pages｜workshop default static deployment

For new students, use the **Pages** link at the bottom of Cloudflare's Create application screen ("前往 Pages"), then Connect to GitHub.

1. Select your own GitHub repository and production branch (usually `main`).
2. Framework preset: **Astro**.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Root directory: repository root.
6. **Do not add `ASTRO_BASE_PATH` or `ASTRO_SITE_URL` environment variables** for a default Pages deployment.
7. Deploy. Cloudflare Pages automatically supplies `CF_PAGES_URL` for the build. Astro uses it to generate canonical URLs, RSS, sitemap and robots.txt. Astro defaults to base `/`.

The existing research showcase also publishes to GitHub Pages via Actions. Its workflows explicitly pass `ASTRO_SITE_URL=https://pikaone1138.github.io` and `ASTRO_BASE_PATH=/astro-personal-site-starter` so its legacy URLs and PR previews remain unchanged.

A custom domain requires checking canonical origin before launch. To force a canonical domain (or deploy to non-Pages Workers), you may supply `ASTRO_SITE_URL` in the build environment. Do not put it in runtime-only Worker variables. Pages preview deployments need a noindex policy separate from the production site.
