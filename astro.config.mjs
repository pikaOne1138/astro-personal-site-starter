import { defineConfig } from 'astro/config';

// Production: /astro-personal-site-starter/
// PR preview: /astro-personal-site-starter/pr-preview/pr-N/
// A single source tree builds for both; only the URL prefix differs.
const defaultBase = '/astro-personal-site-starter';
const base = process.env.ASTRO_BASE_PATH || defaultBase;

export default defineConfig({
  site: 'https://pikaOne1138.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
});
