# Astro Blocks V1.5 — Component Library Reference

> The actual component interfaces are maintained in `COMPONENTS.md`, `src/data/blocks.registry.json`, and `src/components/blocks/*.astro`. This is a **design and assembly reference** for the `astro-ui-craft` Skill; never treat this file as a substitute for verifying the current source.

## Product scope

Two website architectures, four visual personalities:
- Knowledge / Blog: writing, article exploration, topics, authors, reading, long-term SEO content.
- Helper / Professional: professionals offering one-to-one services, consultations, coaching, counseling, bodywork, healing.
- Paper & Ink (`paper`): editorial, restrained rules and paper-like surfaces.
- Morning Light (`morning`): soft cream, warm and reassuring rounded layouts.
- Quiet Studio (`studio`): precise rhythm, sober typography, structured information.
- Botanical Calm (`botanical`): soft botanical green, gentle organic warmth.

**2 × 4 = 8 complete site demos**, plus a separate `/blocks/` live component gallery.

## V1.5 reusable components (23)

| Area | Components |
| --- | --- |
| Shared (4) | `Button`, `SectionHeading`, `SiteHeader`, `SiteFooter` |
| Hero (3) | `HeroSplit`, `HeroCentered`, `HeroImage` |
| Content (4) | `ImageText`, `FeatureGrid`, `Stats`, `CTASection` |
| Knowledge / Blog (6) | `PostCard`, `PostGrid`, `FeaturedPost`, `CategoryLinks`, `TableOfContents`, `AuthorBox` |
| Helper (6) | `ServiceCard`, `AboutProfile`, `ProcessSteps`, `Testimonial`, `FAQ`, `ContactSection` |

Layout variants in V1.5:
- `HeroSplit` and `ImageText`: reverse image/text order with `reversed`.
- `FeatureGrid`: two or three columns with `columns`.
- `HeroCentered`, `HeroImage`, `HeroSplit`: three distinct hero compositions.
- Design personality is controlled through `<html data-theme="...">`, using the existing CSS tokens. Avoid parallel, unrelated hard-coded styling systems.

## Mandatory style contract

**優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。**

- Reuse established styles from the project and the research-backed design specification.
- Spacing steps: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`. Do not mistake these spacing steps for a typography scale.
- Current multipage navigation decisions: normal links and CTA are `16px`; Paper editorial links are `14px`.
- Favor legible typography and clear focus states; keep mobile navigation reachable and usable.
- Do not invent intermediate font sizes (for example, `15px`) just for a small visual tweak; if a genuinely new token is needed, document reason and ask before modifying design system.
- Motion: gentle hover, reveals, and feedback; respect `prefers-reduced-motion`; avoid effects that overshadow content.
- Audit contrast and reading width for all four themes.

## AI assembly steps

1. Determine whether the user wants a Knowledge or Helper website and select a personality.
2. Choose a documented composition from the existing blocks. Read `src/data/blocks.registry.json` and actual `Props`.
3. Assemble Astro pages and provide meaningful content and real hrefs. Do not publish `#` placeholders as functional booking/forms or synthetic testimonials as real endorsements.
4. Reuse `SiteNav.astro` and existing site-map for multipage routing; use components/blocks for new sections, without replacing working routes.
5. Use `import.meta.env.BASE_URL` for internal links/assets so both production and PR preview work.
6. Run build; send GitHub PR preview for human review before merge, as described by `.ai/astro-pr-preview/SKILL.md`.

## Reference hierarchy

1. Executable components and source CSS (`src/components/blocks/*.astro`, `public/demo.css`, `public/blocks.css`, `public/v02.css`)
2. Component interface documentation: `COMPONENTS.md` + `src/data/blocks.registry.json`
3. Research/design authority: existing `.ai/astro-ui-craft/references/` research and workshop style specification
4. This summary as a navigational reference, not an independent source of invented props or design values

## Deferred

- V2: search, carousel, advanced article features.
- V3: automated component recommendation and autonomous page assembly engine.

Neither belongs to the V1.5 baseline without a separate request.
