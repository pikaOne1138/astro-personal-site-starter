# Layout thumbnail capture

Source of truth: `src/data/layout-assembly/definitions.mjs` (original directions + expansion directions). Assets represent **homepage previews**, not evidence of completed independent sites. Current assembly status is read from that registry; no status is promoted by screenshot capture.

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

The script visits every registry preview route at 1440×900 and 390×844, loads lazy images, waits for decoding/fonts, checks HTTP/redirects, heading/body content and broken images, then captures missing files. The PNG is encoded to WebP **without resizing**. Since captures are full-page, output height can exceed viewport height. Original 12 asset provenance remains tied to its original commit/time; later route validation has its own commit/time.

`captured.json` is written only after all routes/files pass. It records slug/title/kind, viewport and output dimensions, source route, source commit, time, SHA-256, size, capture/preservation action and browser validation. Horizontal overflow is recorded separately for review, not silently treated as full Layout QA.

`qa-template-gallery.mjs` tests `/layouts/`, `/templates/`, `/starter/` at 1440/1280/768/390, detects overflow and failed image loading, tests mobile comparison controls and all 25 Starter query preselection + Site Brief outputs. Screenshots/results are uploaded by Template Gallery QA; they are actual browser evidence, not an automatic visual-design approval.

## Information architecture

- `/layouts/`: primary direction explorer with original and expansion previews; links to Starter.
- `/templates/`: existing desktop/mobile screenshot comparison view, now using the same 25-item registry.
- `/starter/`: configuration and Site Brief export; same registry and screenshots. Narrow screens use the mobile screenshot.

No third gallery is created. Theme demos remain a separate concern.

## Initial inventory (main a37bc3e)

12 original directions / 24 WebP assets with matching manifest. Contact-sheet inspection and full decoding found no blank/error assets; relevant original preview/CSS files were unchanged since capture source commit `0975ecf`. Preserve these assets. 13 expansion directions / 26 missing assets. All 25 are `in-progress` in the assembly registry; thumbnail availability does not change this status.

PR #56 is an independent unmerged information-architecture change. This work is based on main and must be reconciled with #56 before merge; do not replace its Starter content, interview, branding or upload changes with this branch's whole file.
