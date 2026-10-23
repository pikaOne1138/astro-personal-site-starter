# Phase 2｜Batch 9 複合條款拆解 A

Frozen main: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`. 本批將既有 Batch9 的 4 行複合條款拆分成 19 個子候選；所有父 ID 保留、不重複計入原始來源行。每個子候選仍待 P0 與 Skills A/B 交叉審核。

| 子項 ID | 單項要求或條件 | 類型 | 凍結來源 |
|---|---|---|---|
| B9A-ASM57-01 | navigation 的 page-* 是既有自訂頁面 ID 能力 | ARCHITECTURE | [ASM L57](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L57) |
| B9A-ASM57-02 | parentId 支援第二層，不預設第三層 | ARCHITECTURE | 同上 |
| B9A-ASM57-03 | details 子選單必須可及性操作 | ACCEPTANCE | 同上 |
| B9A-ASM57-04 | 檢查桌機鍵盤與手機觸控 | ACCEPTANCE | 同上 |
| B9A-ASM57-05 | 檢查父子路由 | ACCEPTANCE | 同上 |
| B9A-ASM57-06 | 不得以研究站的平面選單冒稱學生選單已升級 | BOUNDARY | 同上 |
| B9A-ASM57-07 | 大型選單另有 Mega Menu 與視覺 QA 條件 | CONDITIONAL | 同上 |
| B9A-ASM70-01 | 安裝 SiteSearchDialog 先查真實 data contract | PROCEDURE | [ASM L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L70) |
| B9A-ASM70-02 | exact-zh 索引於 Astro Build 與 Pagefind 後生成 | ARCHITECTURE | 同上 |
| B9A-ASM70-03 | 已配置 Pagefind 是主要全文索引，不能替換為 metadata-only 搜尋 | NORMATIVE | 同上 |
| B9A-ASM70-04 | 查實際端點、搜尋互動、草稿排除 | ACCEPTANCE | 同上 |
| B9A-ASM70-05 | 界面差異時查最新 Astro/Pagefind 官方文件 | CONDITIONAL | 同上 |
| B9A-ASM73-01 | 導航 ID 穩定；path 為可讀的選填相對 URL | ARCHITECTURE | [ASM L73](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L73) |
| B9A-ASM73-02 | path 存在時，頁面、導覽、麵包屑、Sitemap、輸出檢查共用同一路徑 | ACCEPTANCE | 同上 |
| B9A-ASM73-03 | 無 path 才使用 id + '/' 預設 | CONDITIONAL | 同上 |
| B9A-ASM73-04 | 真實 HTML 與 Preview 路由一致 | ACCEPTANCE | 同上 |
| B9A-ASM73-05 | 已發布 URL 改動須考慮 redirect，不得無視外部影響 | NORMATIVE | 同上 |
| B9A-DEP25-01 | 確認 Cloudflare PR 分支真的提供 Preview | ACCEPTANCE | [DEP L25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L25) |
| B9A-DEP25-02 | 檢查 Preview 網域 noindex 與未公開內容曝光風險 | SECURITY / ACCEPTANCE | 同上 |
| B9A-DEP25-03 | 不得假定 Cloudflare Preview 等於 GitHub Pages Preview | BOUNDARY | 同上 |

## 跨來源關係初判

- B9A-ASM70-03 與 B2-PUB48-03：SAME_CANDIDATE，但須保留組裝流程與文章發布流程兩份來源。
- B9A-ASM73-05 與 B3-PUB36-01：PARTIAL_OVERLAP。普通頁面 path 與文章 slug 並非同一內容模型。
- B9A-DEP25-01 與 P0-CANON-PRVIEW-MISSING：PARTIAL_OVERLAP，平台 Preview 檢查與沒有 Preview 時的如實回報不可合併。
- B9A-ASM57-01/02 為架構事實，B9A-ASM57-03/04/05 為驗收，不能全部當新規範政策。

## Gate

本批 4 個原始來源行 → 19 個分類後候選。Batch9 尚有 29 個來源行未進一步拆分，其他 Batch1–8 的混合候選也需檢查。**103/103 仍僅代表來源行映射，不代表原子化或去重驗收通過。** Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skills 不修改，不 Merge、不部署。
