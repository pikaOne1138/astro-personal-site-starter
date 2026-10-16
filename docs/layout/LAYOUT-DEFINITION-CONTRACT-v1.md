# Layout Definition Contract v1 — Visual Template → Independent Astro Starter

Status: **versioned interface, implementation progress is tracked separately**. Owner: `feat/visual-template-assembly` (Starter Planner, Gallery, Export, Adapter, Renderer). Parallel Art Direction branch owns **original layout prototypes**, not this generator contract.

## 1. Identity and lifecycle

- `schemaVersion: 1` (integer, required); `slug` (stable URL-safe unique identifier); `kind: knowledge | helper` (required, immutable after publishing).
- `name`, `summary`, `audience[]`, `features[]` (display copy); `sourcePrototype: "/layouts/<slug>/"`.
- `assemblyStatus: "prototype" | "in-progress" | "ready"`. `ready` **only if** export adapter, independent build, desktop/mobile fidelity, and essential interior routes have passed review. A pretty preview or working site skeleton does not imply `ready`.
- `adapter: null | {id, version, renderer, supportedPages[]}`; `null` for unassembled prototypes. Export must fail closed with a helpful error when adapter is null/not ready; never quietly export a generic site under a selected design name.

## 2. Visual assets controlled by this repository

```json
{
  "screenshots": {
    "desktop": {"src": "/template-gallery/<slug>-desktop.webp", "width": 1440, "captureViewportHeight": 900},
    "mobile": {"src": "/template-gallery/<slug>-mobile.webp", "width": 390, "captureViewportHeight": 844}
  }
}
```

- Both screenshots must be **captured from the actual built Astro prototype** (not a mood image, mockup, unrelated photo, or a different layout). Commit them as project-controlled static assets, along with capture provenance (ref SHA, route, viewport, date, capture tooling) in `docs/template-gallery/capture-manifest.json`.
- Screenshot cover artwork is distinct from **site content imagery**: layout image slots are semantic inputs (`heroPortrait`, `featuredCover`, etc.) with required aspect ratio, focal point, alt text, license/source and no fictional credentials.
- Gallery may provide full-page preview and desktop/phone switching. Missing screenshots must show an explicit "截圖待製作" state, not an unrelated fallback photograph. Image generation and production asset ownership remain independent.

## 3. Structural definition: never Theme-as-Layout

```json
{
  "schemaVersion": 1,
  "slug": "example",
  "kind": "knowledge",
  "assemblyStatus": "prototype",
  "sourcePrototype": "/layouts/example/",
  "adapter": null,
  "composition": {
    "hero": {"id": "editorial-issue", "variant": "type-led", "gridDesktop": "7fr 5fr", "mediaPosition": "right"},
    "sections": [
      {"id": "featured", "role": "featured-articles", "renderer": "FeaturedEditorial", "order": 1, "required": true, "contentKey": "featuredArticles"}
    ],
    "readingFlow": "hero → featured → archive → about",
    "responsive": {
      "breakpoints": [390, 768, 1280, 1440],
      "hero390": "stack-copy-before-media",
      "sectionOrder390": ["featured", "archive", "about"],
      "grid390": "1fr",
      "mediaRules": ["object-position: center"]
    }
  },
  "content": {"required": ["siteName", "tagline"], "optional": ["heroImage"], "fallback": "truthful-explicit-placeholder"},
  "pages": {"required": ["/", "/about/"], "kindRequired": ["/articles/"]},
  "screenshots": {"desktop": null, "mobile": null}
}
```

**Schema rules**:
- Sections are an **ordered stable array**, not merely toggleable blocks. Each section has a stable `id`, semantic `role`, `renderer`, explicit order, `required`, and content binding `contentKey`. Optional fields: `gridDesktop`, `gridTablet`, `mobileStack`, `imageSlot`, `ariaLabel`, `recipeId`. A section may reuse registered Blocks and editorial recipes without mutating their interfaces.
- `hero`: composition identity, text/media ratio and placement, heading hierarchy, focal crop, primary CTA; only content/tokens are student customization. Alternate compositions use distinct renderer DOM and CSS, not a layout-specific class on one generic hero.
- `responsive`: breakpoint expectations, text/media stacking order, grid collapse, overflow, focus, readable type and tap-target rules; support 1440/1280/768/390 at minimum. Never depend on hover or JavaScript for essential content.
- `pages`: homepage plus compatible article archive/detail, Pagefind search, RSS, sitemap, About, service detail, FAQ, contact, 404 as applicable; preserve source URLs, accessibility, draft isolation and booking/newsletter unconfigured truthfulness.
- `tokens`: brand palette, font stacks, picture style and optional logo adjust **presentation** without replacing composition/section order/DOM hierarchy.

## 4. Adapter and generated-site interface

1. `src/data/layout-directions.json` remains the **prototype discovery registry**, with `slug` and `kind` as canonical keys. The assembly registry/manifest under `src/data/layout-assembly/` maps canonical keys to adapters and status, avoiding edits to the shared research registry during parallel work.
2. `scripts/export-starter.mjs` validates the existing `StarterPlan` v1, selects exactly one ready adapter, and outputs an independent Astro project. Preserve `site.config.json` including `layoutSlug`; add `layoutDefinitionVersion` and `layoutAdapter` in a backward-compatible additive manner. Non-ready layouts remain **selectable for prototype preview / Site Brief**, but not represented as downloadable ready-made sites.
3. Each adapter exposes `{slug, kind, version, compose, requiredAssets, requiredPages}` and copies/generates a standalone `src/components/layouts/<slug>/Home.astro` plus its **scoped CSS**, assets and content bindings. No imports from the showcase repository at learner build time.
4. The generated `src/pages/index.astro` selects the exported local renderer. Shared `SiteLayout` provides existing navigation/mobile links/SEO/footers; the adapter controls only the central homepage composition. Reuse article/search/service pages rather than forking duplicate backends.
5. Missing student content remains labeled sample/demo or omitted; no fabricated bios, licenses, client quotes, prices, booking confirmations, newsletter success, clinical claims or crisis resources. Unsupported third-party services are disabled or explicit external configuration.
6. A selected optional Section Pattern may be inserted only at a declared adapter extension point with compatible kind/page and explicit review; it must not silently rearrange invariant composition.
7. The learner can ask an AI to update copy, image assets, palette, fonts and enabled pages without rerunning the generator over edited files. Source, asset, and content locations are documented in the generated README.

## 5. Per-layout readiness acceptance

| State | Required evidence | Gallery CTA |
| --- | --- | --- |
| Prototype | Existing real Astro direction; no independent assembly guarantees | 預覽設計、下載 Site Brief |
| Assembly in Progress | Adapter exists but fidelity/integration gates incomplete | 預覽設計、下載 Site Brief；清楚標記不可直接匯出 |
| Starter Ready | Independent `npm run build` and focused integrity checks; section DOM/structure comparison; desktop + mobile **screenshots visually reviewed**; functional relevant article/search/service/nav routes | 建立獨立網站 |

Keep **CI build**, **actual platform Preview SHA and URL**, and **human visual review** as separate evidence records. Preview deployment does not equal approval. Work on feature branches only, never auto-merge, never touch DNS/Production. Existing security checks are never removed. Do not resurrect deferred Props fixture / historical QA backlog.

## 6. Parallel-branch handoff

Art Direction branch may add unique prototype pages and screenshots or propose new definitions. It should supply: `slug/kind`, screenshot route + attribution, a 1440/390 wireframe, section ordering, hero structure, grid ratios, content/image slots, interior-page needs, responsive restacking, and expected typography tokens. **Do not directly modify** `scripts/export-starter.mjs`, `src/pages/starter/index.astro`, `src/data/layout-assembly/`, or renderer/adapter internals. Any change to `src/data/layout-directions.json` or shared Blocks Registry requires explicit cross-branch coordination/rebase rather than overwrite.

**Contract changes:** additive compatible properties remain v1; breaking changes require v2, migration notes, and adapter compatibility gates.
