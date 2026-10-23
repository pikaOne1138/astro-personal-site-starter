# Phase 2｜Batch1–8 深入原子化第三輪

Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`；從剩餘 106 筆中，對先前已確認需要拆分的 28 個父候選建立獨立檢查 ID。來源原文與父候選保留。這些檢查 ID 是原子化工作單位，不是正式唯一 Canonical 義務。

| 新子 ID | 父 ID | 子檢查 | Frozen source |
|---|---|---|---|
| `B1-PUB28-03-S01` | `B1-PUB28-03` | 發布核准文章移入 articles | [L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) |
| `B1-PUB28-03-S02` | `B1-PUB28-03` | 舊 draft:true 改為 false | [L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) |
| `B1-PUB56-01-S01` | `B1-PUB56-01` | 執行乾淨 Build | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-01-S02` | `B1-PUB56-01` | 在實際學員站執行 draft leak gate | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-02-S01` | `B1-PUB56-02` | 檢查草稿直接 HTML 路由 | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-02-S02` | `B1-PUB56-02` | 檢查所有生成 HTML | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-02-S03` | `B1-PUB56-02` | 檢查 RSS | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-02-S04` | `B1-PUB56-02` | 檢查 Sitemap | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-02-S05` | `B1-PUB56-02` | 檢查已配置搜尋與內容發現介面 | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-05-S01` | `B1-PUB56-05` | 自訂 slug 使用 route-aware 驗證 | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-05-S02` | `B1-PUB56-05` | 巢狀路由使用 route-aware 驗證 | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-05-S03` | `B1-PUB56-05` | MDX 使用 route-aware 驗證 | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-PUB56-05-S04` | `B1-PUB56-05` | CMS 或非常規來源使用 route-aware 驗證 | [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| `B1-DEP31-01-S01` | `B1-DEP31-01` | HTML 預設 noindex | [L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-01-S02` | `B1-DEP31-01` | robots.txt 預設禁止索引 | [L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B3-PUB20-01-S01` | `B3-PUB20-01` | 以學生實際 schema 為準 | [L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L20) |
| `B3-PUB20-01-S02` | `B3-PUB20-01` | 以學生實際 navigation 為準 | [L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L20) |
| `B3-PUB20-01-S03` | `B3-PUB20-01` | 以學生實際 scripts 為準 | [L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L20) |
| `B3-PUB33-01-S01` | `B3-PUB33-01` | 新文章先讀 schema | [L33](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L33) |
| `B3-PUB33-01-S02` | `B3-PUB33-01` | 檢查現有文章 ID 或 slug | [L33](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L33) |
| `B3-PUB35-01-S01` | `B3-PUB35-01` | 文章正文使用真實內容 | [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L35) |
| `B3-PUB35-01-S02` | `B3-PUB35-01` | 提供可及性標題 | [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L35) |
| `B3-PUB35-01-S03` | `B3-PUB35-01` | 使用有意義連結文字 | [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L35) |
| `B3-PUB35-02-S01` | `B3-PUB35-02` | 圖片來源具授權 | [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L35) |
| `B3-PUB35-02-S02` | `B3-PUB35-02` | 圖片有替代文字 | [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L35) |
| `B3-PUB45-01-S01` | `B3-PUB45-01` | 驗證 Production canonical | [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L45) |
| `B3-PUB45-01-S02` | `B3-PUB45-01` | 驗證 PR Preview canonical | [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L45) |
| `B4-ASM12-01-S01` | `B4-ASM12-01` | 讀 Starter Config | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-ASM12-01-S02` | `B4-ASM12-01` | 讀 Layout Directions | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-ASM12-01-S03` | `B4-ASM12-01` | 讀 Blocks Registry | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-DEP18-02-S01` | `B4-DEP18-02` | 不套用展示站 workflow_run | [L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L18) |
| `B4-DEP18-02-S02` | `B4-DEP18-02` | 不套用 Preview Cleanup | [L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L18) |
| `B4-DEP18-02-S03` | `B4-DEP18-02` | 不套用 gh-pages Snapshot | [L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L18) |
| `B4-DEP20-01-S01` | `B4-DEP20-01` | 初次 Pages 設定可能需學員操作 | [L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L20) |
| `B4-DEP20-01-S02` | `B4-DEP20-01` | Actions 權限可能需學員操作 | [L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L20) |
| `B4-DEP20-01-S03` | `B4-DEP20-01` | DNS 可能需學員操作 | [L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L20) |
| `B5-PUB12-01-S01` | `B5-PUB12-01` | 網站文字由使用者提供 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB12-01-S02` | `B5-PUB12-01` | 身分與專業事實由使用者提供 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB12-01-S03` | `B5-PUB12-01` | URL 與聯絡資料由使用者提供 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB12-01-S04` | `B5-PUB12-01` | 圖片素材由使用者提供 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB12-02-S01` | `B5-PUB12-02` | 不得虛構資格與見證 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB12-02-S02` | `B5-PUB12-02` | 不得虛構價格或聯絡 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB12-02-S03` | `B5-PUB12-02` | 不得虛構訂閱成功 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB12-02-S04` | `B5-PUB12-02` | 不得虛構預約成功 | [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| `B5-PUB63-01-S01` | `B5-PUB63-01` | 檢查生成文章頁 | [L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-01-S02` | `B5-PUB63-01` | 檢查缺漏路由 | [L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B6-PUB64-01-S01` | `B6-PUB64-01` | 核對 RSS XML | [L64](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L64) |
| `B6-PUB64-01-S02` | `B6-PUB64-01` | 核對 Sitemap XML | [L64](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L64) |
| `B6-PUB64-01-S03` | `B6-PUB64-01` | 核對 canonical 值 | [L64](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L64) |
| `B6-ASM13-01-S01` | `B6-ASM13-01` | 核對品牌真實資料 | [L13](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L13) |
| `B6-ASM13-01-S02` | `B6-ASM13-01` | 核對圖片授權 | [L13](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L13) |
| `B6-ASM13-01-S03` | `B6-ASM13-01` | 核對真實聯絡與預約方式 | [L13](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L13) |
| `B6-PUB66-01-S01` | `B6-PUB66-01` | 交接異動檔案 | [L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L66) |
| `B6-PUB66-01-S02` | `B6-PUB66-01` | 交接文章公開或草稿狀態 | [L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L66) |
| `B6-PUB66-02-S01` | `B6-PUB66-02` | 交接已執行檢查 | [L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L66) |
| `B6-PUB66-02-S02` | `B6-PUB66-02` | 交接未解風險 | [L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L66) |
| `B6-PUB66-02-S03` | `B6-PUB66-02` | 未得同意不得 Merge | [L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L66) |
| `B7-PUB-L70-02-S01` | `B7-PUB-L70-02` | 文章公開路由可見 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L70-02-S02` | `B7-PUB-L70-02` | 文章內頁可見 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L70-02-S03` | `B7-PUB-L70-02` | 標籤與日期可用 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L70-02-S04` | `B7-PUB-L70-02` | 相關文章連結可用 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L70-02-S05` | `B7-PUB-L70-02` | 搜尋可發現文章 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L70-03-S01` | `B7-PUB-L70-03` | RSS 與 Sitemap 實際更新 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L70-03-S02` | `B7-PUB-L70-03` | Metadata 一致 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L70-03-S03` | `B7-PUB-L70-03` | Preview 索引設定符合環境 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| `B7-PUB-L76-01-S01` | `B7-PUB-L76-01` | 只詢問缺少的真實資料 | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L76-01-S02` | `B7-PUB-L76-01` | 核對 slug | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L76-01-S03` | `B7-PUB-L76-01` | 核對日期 | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L76-02-S01` | `B7-PUB-L76-02` | 寫入正確實際 Collection | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L76-02-S02` | `B7-PUB-L76-02` | 草稿不在列表 | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L76-02-S03` | `B7-PUB-L76-02` | 草稿不在 RSS | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L76-02-S04` | `B7-PUB-L76-02` | 草稿不在 Sitemap | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L76-02-S05` | `B7-PUB-L76-02` | 草稿不在搜尋 | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| `B7-PUB-L79-03-S01` | `B7-PUB-L79-03` | 發布後確認 URL | [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L79) |
| `B7-PUB-L79-03-S02` | `B7-PUB-L79-03` | 發布後確認列表 | [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L79) |
| `B7-PUB-L79-03-S03` | `B7-PUB-L79-03` | 發布後確認 RSS | [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L79) |
| `B7-PUB-L79-03-S04` | `B7-PUB-L79-03` | 發布後確認 Sitemap | [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L79) |
| `B7-PUB-L79-03-S05` | `B7-PUB-L79-03` | 有 Pagefind 才測索引及搜尋 | [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L79) |
| `B7-PUB-L80-01-S01` | `B7-PUB-L80-01` | 辨識僅從列表隱藏 | [L80](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L80) |
| `B7-PUB-L80-01-S02` | `B7-PUB-L80-01` | 辨識切為 draft | [L80](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L80) |
| `B7-PUB-L80-01-S03` | `B7-PUB-L80-01` | 辨識完全取消公開 URL | [L80](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L80) |
| `B8-ASM-L17-02-S01` | `B8-ASM-L17-02` | 生成選定頁面 | [L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L17) |
| `B8-ASM-L17-02-S02` | `B8-ASM-L17-02` | 建立共用導航 | [L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L17) |
| `B8-ASM-L17-02-S03` | `B8-ASM-L17-02` | 建立站點資產 | [L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L17) |
| `B8-ASM-L17-02-S04` | `B8-ASM-L17-02` | 不得照搬全部研究站路由 | [L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L17) |
| `B8-ASM-L29-02-S01` | `B8-ASM-L29-02` | 缺少欄位顯示未配置 | [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L29) |
| `B8-ASM-L29-02-S02` | `B8-ASM-L29-02` | 缺 contact endpoint 不得冒充可預約表單 | [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L29) |

## Gate

28 個父候選被分解為 87 個可單獨追蹤的檢查維度。每一項仍需與 P0/Skills A/B/Batch9/#61 反向語義對照；重複的檢查維度未必是獨立 Canonical。

不得父子重複計數；Stage2 IN PROGRESS，Stage3/4 BLOCKED。
