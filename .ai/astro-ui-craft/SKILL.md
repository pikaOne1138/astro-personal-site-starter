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

Three visual personalities:
- Paper & Ink
- Morning Light
- Quiet Studio

Treat this as **2 architectures × 3 visual directions**, not six unrelated codebases.

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
