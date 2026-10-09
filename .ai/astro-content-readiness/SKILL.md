---
name: astro-content-readiness
description: Check whether a beginner has the real content required for a selected Astro Layout, page or Section Pattern, without inventing works, claims or working actions.
---
# Astro Content Readiness｜內容準備度檢查

## When to run
After site purpose / audience, Layout, pages and Section Pattern selections; **before** implementing cards, testimonial sections, service claims, navigation destinations or CTAs. Work alongside `astro-starter-onboarding`, `astro-section-pattern-craft` and `astro-site-assembly`.

## Read sources of truth
- The student's Site Brief JSON and content the student actually provided.
- `src/data/section-patterns.registry.json` (`required`, `optional`, `safety`, `composition`).
- Selected Layout and the existing Blocks Registry.
- The content collection schema for articles, if relevant.

## Procedure
1. List each enabled page and chosen Pattern ID, target page and placement; distinguish placeholder sites from real sites.
2. For every Pattern, translate `required` into a plain-language checklist: title, summary, item or service descriptions, links, permission to use images, etc. `optional` fields must remain optional.
3. Categorize each field as `ready`, `needs-user-input`, `optional-omitted`, or `invalid-link-or-unverified`. Do not turn absence into fabricated demo achievements.
4. For a featured-content section, ask for at least one **real** representative article or work. If none exists, recommend hiding the section or mark it explicitly as an unpublished demo; do not create a fake clickable card.
5. For helper sites, verify qualifications, endorsements, policies, prices, results, testimonials and booking links against user-provided facts. Without proof or configuration: hide or mark clearly as demo.
6. Check whether menu destinations and primary CTA route to actual generated pages rather than dead ends.
7. Produce a handoff list for Assembly: `patternId`, `targetPage`, `fieldsReady`, `missingFields`, `decision` (`ship` / `hide` / `demo-only`), `evidence`.
8. Never block the entire website merely because an **optional** content block is not ready. A valid minimal first release is preferable to fake completeness.

## Pass criteria
Every visible non-demo claim is backed by content the student provided; no fake credentials, cases, testimonials, results, booking success, downloads or links. The student can name what still needs to be written.

## Ready-to-copy student prompt
> 請讀我的 Site Brief、現有文章／服務資料及 `astro-content-readiness`。逐頁列出我已具備、缺少及可以省略的內容，對照 Section Pattern Registry 的 required／optional。不要補造作品、價格、證照或連結。請提出一份「現在可上線的最小版本」與尚需我提供的資料，再交給組站 Skill。
