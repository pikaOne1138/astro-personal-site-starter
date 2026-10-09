---
name: astro-navigation-tree-test
description: Validate a student's Astro navigation information architecture with beginner-friendly task-based tree tests and accessible two-level menu checks.
---
# Astro Navigation Tree Test｜導航可理解性測試

## When to run
After the student chooses page names and parent/child navigation in the Starter; before final navigation QA and before calling the navigation understandable.

## Distinguish two evaluations
- **Tree testing:** Can a visitor find information from labels and hierarchy, without seeing page styling?
- **Interaction QA:** Can a real visitor open, navigate and close the desktop/mobile menu by keyboard and touch?
Both are required for a released nested menu. A model simulating a visitor is **not** a substitute for external user testing.

## Procedure
1. Read student Site Brief `navigation` (including `parentId`) and real page purpose; note enabled pages and planned CTA.
2. Render a plain text tree. Ensure no empty or duplicate destinations, ambiguous labels, inaccessible parent content, broken page routes, third level or circular relationships.
3. Write three realistic user tasks, each phrased as a goal rather than containing the correct menu label. Examples: find the first-time visitor guide; find the book recommendations; find ways to contact the practitioner.
4. Ask the student to invite at least one person unfamiliar with the site to attempt these tasks **without hints**. Record their selected path, whether they found the destination, and ambiguous names.
5. Report observed issues; recommend renaming, regrouping or flattening. Do not invent success rates or participants.
6. Then verify generated site: desktop mouse/keyboard, Tab / Enter / Space and visible focus, mobile touch expand/collapse, parent links, logical aria semantics, Escape where applicable, reduced motion, 390/768/1280/1440 layouts.
7. If no external tester is available, mark `tree-test: NOT TESTED` and provide three tasks for later; this may be an explicit launch caveat.

## Report template
| Task goal | Expected destination | Observed path | Result (found / lost / not tested) | Rename or grouping fix |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## Ready-to-copy student prompt
> 請讀我的 Site Brief 與 `astro-navigation-tree-test`，先畫純文字雙層選單樹，再幫我寫三個真實訪客找資料的任務。請指出容易混淆的名稱與層級，告訴我怎麼請朋友測試。沒有真人測試資料就標 NOT TESTED。網站產生後另做桌面鍵盤、手機觸控與所有目的地連結 QA。
