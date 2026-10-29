---
name: astro-content-readiness
description: Check whether a beginner has the real content required for a selected Astro Layout, page or Section Pattern, without inventing works, claims or working actions. Not for writing the missing content or judging visual design, it only checks that real content exists.
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
4. For a featured-content section, ask whether the student has an article/work; if not, leave it empty, hide it or mark it clearly as a demo. Do not require content merely to test or build a site; never create a fake working link.
5. For helper sites, never invent qualifications, endorsements, policies, prices, results, testimonials or working booking links. Do not independently judge whether the student's claims are professionally adequate: ask them to confirm their own facts; unconfigured content must be hidden or explicitly labeled demo.
6. Check whether menu destinations and primary CTA route to actual generated pages rather than dead ends.
7. Produce a handoff list for Assembly: `patternId`, `targetPage`, `fieldsReady`, `missingFields`, `decision` (`ship` / `hide` / `demo-only`), `evidence`.
8. Never block the entire website merely because an **optional** content block is not ready. A valid minimal first release is preferable to fake completeness.

## Pass criteria
No **AI-fabricated** credentials, cases, testimonials, results, booking success, downloads or working links. Existing identifiable sample/placeholder content is reported as NOTICE with locations; no requirement to provide articles, a service menu or complete copy merely to pass build QA. The student owns content decisions and release approval.

## Ready-to-copy student prompt
> 請讀我的 Site Brief、現有文章／服務資料及 `astro-content-readiness`。逐頁列出我已具備、缺少及可以省略的內容，對照 Section Pattern Registry 的 required／optional。不要補造作品、價格、證照或連結。請提出一份「現在可上線的最小版本」與尚需我提供的資料，再交給組站 Skill。

## 非內容審查的界線
工作坊**不判定學員寫得好不好、是否一定有作品、是否已填滿每一欄**。學員可能只是在實驗一個空網站或展示骨架：允許留空／顯示明確示範標記，不要因內容少就阻止 Build。自動驗證只提示可辨識的預設文案、未設定網址、佔位資料與明顯虛構風險；內容真實性需由本人決定。技術輸出 PASS 與「內容已確認可以正式公開」必須分開呈現，不得把示範內容存在當成系統錯誤。
