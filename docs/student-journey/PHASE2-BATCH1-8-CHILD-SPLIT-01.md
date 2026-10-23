# Phase 2｜Batch 1–8 複合條款細拆：第一輪

> Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。本次只處理 **8 個已存在的父工作 ID**，將其中列舉的可獨立查核子條件登記為 ID。這些是工作子項，不代表新 Canonical 規範或全部 Batch1–8 都已原子化。

| 子項 ID | 父工作 ID | 不可遺漏條件 | Frozen Source | 暫定分類 |
|---|---|---|---|---|
| `B1-PUB28-04-S01` | `B1-PUB28-04` | 將已發布文章移回 drafts Collection | [Publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B1-PUB28-04-S02` | `B1-PUB28-04` | 將撤稿文章設為 draft:true | [Publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B1-PUB28-04-S03` | `B1-PUB28-04` | 從乾淨輸出目錄重新 Build | [Publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B1-PUB28-06-S01` | `B1-PUB28-06` | 不得靜默修改公開 URL | [Publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B1-PUB28-06-S02` | `B1-PUB28-06` | 遷移舊站 legacy draft 過濾前先查實際路由 | [Publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B2-PUB36-02-S01` | `B2-PUB36-02` | 只有實際發生有意義的內容更新才設定 updatedAt | [Publishing L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L36) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B2-PUB36-02-S02` | `B2-PUB36-02` | 不得靜默覆寫 publishedAt | [Publishing L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L36) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B2-PUB37-01-S01` | `B2-PUB37-01` | Draft 不得出現在公開文章列表 | [Publishing L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B2-PUB37-01-S02` | `B2-PUB37-01` | Draft 不得出現在公開歸檔 | [Publishing L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B2-PUB37-01-S03` | `B2-PUB37-01` | Draft 不得出現在 RSS/feed | [Publishing L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B2-PUB37-01-S04` | `B2-PUB37-01` | Draft 不得出現在 Sitemap | [Publishing L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B2-PUB37-01-S05` | `B2-PUB37-01` | Draft 不得出現在靜態搜尋結果 | [Publishing L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B6-PUB47-01-S01` | `B6-PUB47-01` | 檢查 sitemap.xml | [Publishing L47](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L47) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B6-PUB47-01-S02` | `B6-PUB47-01` | 檢查 rss.xml | [Publishing L47](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L47) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B6-PUB47-01-S03` | `B6-PUB47-01` | 檢查 robots.txt | [Publishing L47](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L47) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B6-PUB47-01-S04` | `B6-PUB47-01` | 檢查 404.html | [Publishing L47](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L47) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B6-PUB65-03-S01` | `B6-PUB65-03` | UI 變更需在 1440／1280／768／390 實測 | [Publishing L65](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L65) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B6-PUB65-03-S02` | `B6-PUB65-03` | 驗證鍵盤操作 | [Publishing L65](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L65) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B6-PUB65-03-S03` | `B6-PUB65-03` | 驗證手機觸控互動 | [Publishing L65](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L65) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B7-PUB-L78-01-S01` | `B7-PUB-L78-01` | 核對文字內容 | [Publishing L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L78) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B7-PUB-L78-01-S02` | `B7-PUB-L78-01` | 核對 SEO | [Publishing L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L78) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B7-PUB-L78-01-S03` | `B7-PUB-L78-01` | 核對站內連結 | [Publishing L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L78) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B7-PUB-L78-01-S04` | `B7-PUB-L78-01` | 核對圖片來源 | [Publishing L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L78) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B7-PUB-L78-01-S05` | `B7-PUB-L78-01` | 核對手機 QA | [Publishing L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L78) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B8-ASM-L31-02-S01` | `B8-ASM-L31-02` | 以實際截圖人工對照 Art Direction | [Assembly L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L31) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B8-ASM-L31-02-S02` | `B8-ASM-L31-02` | Build PASS 不等於構圖忠實 | [Assembly L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L31) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |
| `B8-ASM-L31-02-S03` | `B8-ASM-L31-02` | 無水平溢出不等於構圖忠實 | [Assembly L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L31) | ACCEPTANCE_OR_PROCEDURE / REVIEW_PENDING |

## 檢查邊界

- 本輪 **8 個父 ID，27 個獨立子項**。父 ID 仍保留以維持舊文件與 Crosswalk 的反向引用；**計數時不得把父與子同時計入**。
- 表內子項取自 Frozen Skills 原文，依次核對了 Publishing L28/L36/L37/L47/L65/L78 與 Assembly L31；對應義務的主詞、範圍與例外仍須回到原文判讀。
- 特別是 Draft 的 RSS／Sitemap／Search 排除屬不同輸出驗收面；Build 與無 overflow 亦非 Art Direction 人工完成證據。
- 尚未完成其他 Batch 1–8 父候選檢查、跨來源 SAME／PARTIAL／DISTINCT 去重、全部引用 ID 的自動反查，以及唯一 Canonical 母數。
- #61 post-freeze delta 獨立追溯；#67 Draft，Stage 2 IN PROGRESS，Stage 3／4 BLOCKED。不改 Skills、模板、生成器，不 Merge／部署。
