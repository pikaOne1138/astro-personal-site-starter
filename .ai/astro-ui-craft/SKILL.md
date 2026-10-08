---
name: astro-ui-craft
description: Design, build, refine, or audit polished Astro sites for knowledge/blog and helper/professional-service workshop archetypes.
---

# Astro UI Craft

Build websites that feel designed, not merely generated.

## Core model
Two content architectures:
- Knowledge / Blog
- Helper / Professional Service

Four visual personalities:
- Paper & Ink
- Morning Light
- Quiet Studio
- Botanical Calm

Treat this as **2 architectures × 4 visual directions = 8 demos**, not eight unrelated codebases.

## Scope guardrail
Default scope is a polished front-end site. Prefer external forms, LINE, booking and newsletter services. Do not silently expand into CRM, auth, member systems, custom booking engines, payments, databases or SaaS administration.

## Evidence hierarchy
1. Directly opened / screenshot / computed-CSS observations.
2. Web-searched and page-verified observations.
3. Cross-case patterns derived from verified cases.
4. Design proposals and synthesized tokens.
5. Memory-only or explicitly unverified candidate lists.

## Knowledge / Blog page job
Answer:
- What does this person write about?
- Where should a new reader start?
- How do I find more on a topic?
- Why should I follow them?
- What is the next low-friction action?

Default flow:
`Hero → Start Here/topics → featured/latest → short About → resource → newsletter → Footer`

## Helper / Professional page job
Answer:
- Am I in the right place?
- Does this person understand my situation?
- What do they offer?
- What happens if I contact them?
- Why can I trust them?
- What is the next low-pressure action?

Default flow:
`Hero → empathy → services → first-visit/process → About/credentials → trust → FAQ → booking/contact → Footer`

Prefer roughly **7 ± 1 meaningful sections**.

## Visual personalities
### Paper & Ink
Warm paper, dark ink, serif display type, fine rules, low-saturation imagery, editorial lists.

### Morning Light
Cream, clay/rose/sage accents, soft serif + readable sans, generous radii, natural-light imagery, gentle reassurance.

### Quiet Studio
Near-white warm gray, precise grid, sans-forward type, one strong accent, thin borders, structured service/content metadata.

### Botanical Calm
Soft botanical greens, restrained natural contrast, generous whitespace, and quiet organic warmth. Reuse existing tokens in `public/demo.css`; do not independently invent palette values.

## Typography and spacing contract (mandatory)
**優先遵守既定字級與間距系統，AI 不應隨意引入新的設計數值。**
- Before changing typography or spacing, inspect the project's actual CSS tokens, the three-style design research, and `references/component-library-v1.5.md`.
- Reuse existing font sizes, spacing steps, font weights, line heights, radii, and transitions for the applicable component/style.
- The established spacing steps are `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`; apply them where appropriate rather than introducing arbitrary one-off values.
- Typography sizes are a separate scale from spacing. For the current v0.2 navbar use 16px standard links/CTA and 14px for Paper's editorial links; do not invent intermediary 15px without an explicit design decision.
- If a new value is genuinely necessary, explain why, centralize it as a token, and request approval before introducing it; do not silently modify the design system.
- Existing legacy values in styles are not blanket permission to invent more. A cleanup to full tokenization should be separate from an unrelated UI edit.

## V2 article exploration and rich-content blocks
- Version identifiers (V1.5/V2/V3) belong in developer docs, code comments, changelog and Skill references. On public-facing demo pages, describe actual capabilities without exposing internal implementation version numbers.
- Read `references/article-exploration-v2.md` when working on article search, tags, archives, calendars, lists, foldouts, grids, callouts, tables, related reading, or carousels.
- Use the shared `src/data/articles-v2.ts` schema and `src/site-map.ts` routes. Counts, dates, links and matches must derive from real article data.
- `SiteSearchDialog` provides magnifying-glass full-site **navigation index** popup (site pages, articles, services) with Ctrl+K/⌘K and Esc. It must preserve site kind/theme and display real targets; it is not full-body search.
- Current V2 `/explore/` supports metadata search, **not full-body search**. Never misrepresent its scope.
- Maintain existing typography, spacing and motion tokens in V2 components; do not introduce arbitrary design values.

## Component library (mandatory before page assembly)
- Read `references/component-library-v1.5.md` first for the catalog, scope, variants, and design integration rules.
- Read `COMPONENTS.md` and `src/data/blocks.registry.json` for the maintained component names, use cases and registry.
- Read the actual `src/components/blocks/*.astro` Props/source before importing or changing components. These files are the implementation source of truth; this reference is a guide, not a duplicate registry.
- Use `public/demo.css`, `public/blocks.css`, and `public/v02.css` as applicable, maintaining the same 4 design personalities. Preserve the original six routes and the two Botanical routes.
- Prioritize reusing existing Astro blocks and components. Add a new block only when existing Props and variants cannot satisfy a real requirement.
- Do not include V2 search/carousels or V3 auto-composition engine by default.

## Refined UI rules
- Structure before decoration.
- Consistent spacing scale.
- Long-form measure roughly 60–72ch.
- One primary accent + neutrals.
- Consistent image ratios and tonal treatment.
- Visible hover/focus/active feedback.
- Avoid neon purple, excessive glassmorphism, random bento grids, repeated icon-three-column sections, giant vague gradients, gratuitous counters/carousels/typewriter effects.

## Navigation
Desktop: `[Logo] 4–5 links ... [single primary CTA]`
- Knowledge: Articles / Topics / Start Here / About + Subscribe.
- Helper: Services / Process / About / Articles / FAQ + Book/Contact.
- Avoid mega menus for the workshop baseline.

## CTA
At most three semantic levels:
- Primary: Subscribe OR Book an intro.
- Secondary: understand fit/process/free resource.
- Low-pressure: read/explore/learn more.

Helper language: “預約初談”, “了解合作方式”, “第一次來？先看看流程”, “開始聊聊”.

## Motion
- hover 150–220ms
- UI transitions 180–350ms
- reveal 400–650ms
- movement 4–16px
- scale ~0.98–1.03
- consistent ease-out
- prefer transform + opacity
- respect prefers-reduced-motion

The intended effect: users may not consciously notice animation, but the site feels cared for.

## Responsive
Do not merely shrink desktop.
- Desktop: ~1080–1200px container.
- Tablet: simplify split layouts/sticky side content.
- Mobile: single reading flow, generous side padding, full-width controls where helpful.
- Helper can use a persistent booking CTA only if it does not cover content.

## Quality gate
Before handoff:
- primary page job is obvious;
- hierarchy reads correctly without decoration;
- mobile composition works;
- contrast/tap targets/focus states are usable;
- motion is subtle and optional;
- build succeeds;
- no accidental backend scope creep.
