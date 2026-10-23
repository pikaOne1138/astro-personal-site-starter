# Layout thumbnail capture

Source of truth: `src/data/layout-assembly/definitions.mjs`. Assets represent **homepage previews**, not evidence of completed independent sites. Current assembly status is read from that registry; no status is promoted by screenshot capture.

## Reproduce

```sh
npm install
npm install --no-save --no-package-lock playwright sharp
npx playwright install --with-deps chromium
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
# In another terminal:
node scripts/capture-template-gallery.mjs
node scripts/verify-template-gallery.mjs
# If capture created files after build, copy them before browser QA:
cp public/template-gallery/*.webp dist/template-gallery/
node scripts/qa-template-gallery.mjs
```

`TEMPLATE_CAPTURE_BASE` accepts a local/remote origin **including any deployment prefix**. `CHROME_PATH` supports an installed Chromium binary. Default capture retains assets whose filename, route, hash, decoding and dimensions match the prior manifest. Explicitly use `TEMPLATE_CAPTURE_REFRESH=slug,other-slug` (or `all`) only after establishing that assets are stale or defective. A corrupt or untracked existing file fails closed; it is never silently accepted.

The script visits every registry preview route at 1440×900 and 390×844, loads lazy images, waits for decoding/fonts, checks HTTP/redirects, heading/body content and broken images, then captures missing files. The PNG is encoded to WebP **without resizing**. Since captures are full-page, output height can exceed viewport height. Each asset's provenance stays tied to the commit and time recorded in `captured.json`.

`captured.json` is written only after all routes/files pass. It records slug/title/kind, viewport and output dimensions, source route, source commit, time, SHA-256, size, capture/preservation action and browser validation. Horizontal overflow is recorded separately for review, not silently treated as full Layout QA.

`qa-template-gallery.mjs` tests `/layouts/`, `/templates/`, `/starter/` at 1440/1280/768/390, detects overflow and failed image loading, tests mobile comparison controls and every Starter query preselection + Site Brief output. Screenshots/results are uploaded by Template Gallery QA; they are actual browser evidence, not an automatic visual-design approval.

## Information architecture

- `/layouts/`: primary direction explorer with all previews; links to Starter.
- `/templates/`: existing desktop/mobile screenshot comparison view, using the same registry.
- `/starter/`: configuration and Site Brief export; same registry and screenshots. Narrow screens use the mobile screenshot.

No third gallery is created. Theme demos remain a separate concern.
