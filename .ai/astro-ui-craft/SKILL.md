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

## Gallery and component discovery by purpose
- On `/blocks/`, organize components by **what visitors need to build** (shared navigation/search; homepage hero; general content; article discovery/lists; article reading/formatting; professional services/trust; complete site examples), never by release numbers.
- Versions belong in developer documentation and registry metadata only. For AI selection, search the registry by intended use and actual compatible page, rather than relying on which version introduced a block.
- Reuse live interactive examples in the appropriate section. Global search belongs under shared navigation; article tags/month/calendar belong under article discovery; table of contents and rich-text blocks belong under reading/formatting.

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

## Practical interactive blocks and real services
Use `.ai/astro-ui-craft/references/article-exploration-v2.md` practical-block guidance for MobileMenu, BookingLink, ContactActions, PricingDetails, TrustInfo, MediaEmbed. Do not create fake form submissions, invented third-party appointments, testimonials or credentials. Keep GitHub Actions PR previews, and obtain user consent before merge.

## Social identity links
Use reusable `SocialLinks.astro` for social platforms and contact identity, rather than hardcoding text links or inventing brand URLs. Accept only configured HTTPS destinations or explicitly validated mailto/tel. Include aria labels and visible keyboard focus; preserve current four themes and do not show missing profiles. `ContactActions` wraps `SocialLinks` with LINE/Email/phone when data exists. Keep icon-brand trademark/individual license considerations in component docs; avoid user-facing release numbers.

### Refined social icons in site headers
Compose `SiteSearchDialog` + narrow divider + `SocialLinks size="sm"` on the desktop navbar via `SiteNav`'s optional `socialLinks` list. Do not duplicate nav links or crowd narrow screens; social icons are hidden below 850px. Use single-color CSS mask icons that inherit theme foreground/accent, subtle focus, consistent spacing, and no invented account links. Header can opt out with `socialLinks={[]}`. Demo defaults show verified GitHub repo + deployed demo site only.

Mobile menu `MobileMenu` accepts the same `socialLinks` array as desktop `SiteNav`; render its SocialLinks beneath all mobile nav items, separated by a subtle hairline, with 44px icon tap targets and no fabricated URLs. Do not hide all social access on mobile; only hide the desktop duplicate. Keep dialog keyboard and focus behavior.


## Current practical block implementation
Branch `feat/v2-5-reading-sharing` adds Breadcrumbs、ArticleNavigation、ArticleShare、ReadingProgress. 文章頁 Breadcrumbs、上一篇／下一篇、LINE／Facebook／Email／剪貼簿分享、實際文章區域的閱讀進度。不能將 SocialLinks 當成文章分享。 Reuse the existing paper/morning/studio/botanical design tokens and functional /blocks/ category layout. Do not show internal version numbers on visitor-facing pages. No fake inputs, services, professional qualifications, media links, emergency contacts, or newsletter submissions. Preserve BASE_URL and PR-preview-first workflow.

## Practical component batch feat/v2-5-resources-newsletter
Add ResourceCard、ResourceLibrary、LeadMagnetCard、NewsletterSignup. 可設定真實資源網址；沒有電子報服務不得假裝表單已成功送出。 Preserve Astro static build, four theme tokens, BASE_URL, actual links, keyboard focus, mobile and reduced-motion. Keep functional block gallery and registry aligned; no automatic merge or fabricated user-facing content.

## Practitioner-specific helper demo copy
Do not reuse generic vague 'companionship, exploration, talk it through' filler for all helper sites. Four **sample content identities** live at `src/data/helper-content.ts`: paper=bodywork, morning=counseling psychology, studio=coaching, botanical=Reiki. Cover distinct method, informed consent and scope, service cards, fit/not-fit, first visit, FAQ and booking. They illustrate varied real-world use cases, **not a hard link between theme and profession**. Never invent qualifications or treatment efficacy; Reiki must be presented as non-medical wellness practice, counseling requires legally appropriate license, bodywork requires explicit physical-contact consent, and coaching does not replace therapy.


## Article index layout and mobile navigation
For article archives use the shared `ArticleViewSwitcher.astro` with list/cards/grid layouts rather than implementing new duplicated archives. List is editorial ruled rows, cards are spacious two-column blocks, grid is a dense three-column typography-led index. Four visual themes reuse existing tokens; on small screens they collapse to one column. Keep articles, search, tags, calendar and month browsing connected to real routes. In mobile site navigation, use a 44px hamburger SVG-only button with an accessible name, alongside the existing search icon; keep full links and social icons inside the dialog. Do not repeat 'find articles' when an Articles nav link exists.


## Motion and interaction craft
When asked to refine scrolling reveal, stagger, hover tilt/spotlight, image zoom/pan, magnetic CTA, animated underline or FAQ open transitions, first follow `.ai/astro-motion-craft/SKILL.md` and `.ai/astro-motion-craft/references/manus-v2-motion-map.md`. The Manus v2 files are reference material, not installed components. Favor existing four theme variables, unobtrusive editorial motion, progressive enhancement and mobile/reduced-motion fallback over importing a separate Tailwind theme.


## Reusable motion effects library
The reusable motion research + integration library lives in `.ai/astro-motion-craft/library/`. When generating or enhancing UI motion, read that catalog and relevant source-grounded recipe first, along with `.ai/astro-motion-craft/SKILL.md`; do not generate novel hover/reveal logic while equivalent existing components are available. Manus v2 references are not automatically installed runtime effects.


## Common long-page navigation: BackToTop
For long landing pages, article archives and document views reuse `BackToTop` through the shared DemoLayout. It belongs to the common blocks registry, not the effects registry. Ensure the right-bottom control appears only after meaningful scrolling, stays clear of safe areas and overlays, has a keyboard accessible name, and returns to the page top instantly if the visitor prefers reduced motion. Avoid duplicating event listeners in child pages.
