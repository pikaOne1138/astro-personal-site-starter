import { defineConfig } from 'astro/config';

// Root-path static hosting is the default (Cloudflare Pages / custom domains).
// GitHub Pages workflows explicitly supply their repository subpath.
const base = process.env.ASTRO_BASE_PATH || '/';
const site = process.env.ASTRO_SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:4321';

export default defineConfig({
    site,
  base,
  output: 'static',
  trailingSlash: 'always',
});
