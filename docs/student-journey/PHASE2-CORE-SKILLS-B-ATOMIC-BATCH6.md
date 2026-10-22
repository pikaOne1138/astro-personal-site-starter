# Phase 2｜Core Skills B Atomic Batch 6

Frozen main: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`.

本批為 8 個未覆蓋的來源行建立 25 個來源錨定的暫定子候選。來源位置在凍結版，非正式 Canonical ID。

| ID | 候選內容 | 原文 |
|---|---|---|
| B6-PUB46-01 | OG/Twitter 內容需符合真實內容 | [Publishing L46](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L46) |
| B6-PUB46-02 | OG 圖片未設定不可聲稱存在 | 同上 |
| B6-PUB46-03 | 結構化資料應與可見內容相符 | 同上 |
| B6-PUB47-01 | 檢查 sitemap、RSS、robots、404 產物 | [Publishing L47](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L47) |
| B6-PUB47-02 | 連結需指向真實網站 | 同上 |
| B6-PUB47-03 | RSS 不重複展示八種主題外觀的同一文章 | 同上 |
| B6-PUB49-01 | 正確處理 BASE_URL 與 ASTRO_BASE_PATH | [Publishing L49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L49) |
| B6-PUB49-02 | 避免 PR Preview 被搜尋引擎索引 | 同上 |
| B6-PUB49-03 | robots.txt 不足以單獨隔離預覽子路徑 | 同上 |
| B6-PUB64-01 | 檢查生成 RSS、Sitemap XML 與 canonical | [Publishing L64](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L64) |
| B6-PUB64-02 | 未受自動化覆蓋者須標記未驗證 | 同上 |
| B6-PUB65-01 | 使用 Feature Branch + PR | [Publishing L65](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L65) |
| B6-PUB65-02 | 驗證真實 Hosting Preview，不能拿 PR Artifact 冒充 | 同上 |
| B6-PUB65-03 | UI 變更測試 1440、1280、768、390 及手機鍵盤操作 | 同上 |
| B6-ASM11-01 | Assembly 輸入為 Starter 輸出的 JSON | [Assembly L11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L11) |
| B6-ASM11-02 | 輸入需含 version、kind、layoutSlug、visualTheme、brand、navigation、primaryCta | 同上 |
| B6-ASM13-01 | 核對品牌、圖片權利、真實聯絡與預約方式 | [Assembly L13](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L13) |
| B6-ASM13-02 | 專業履歷及資格僅能使用本人提供事實 | 同上 |
| B6-ASM13-03 | 未配置第三方整合須隱藏或明確標示 | 同上 |
| B6-DEP30-01 | 驗證 Build 實際產生 Pagefind 與中文 exact-zh 索引 | [Deploy L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L30) |
| B6-DEP30-02 | npm run verify 應檢查索引結構、路由與草稿隔離 | 同上 |
| B6-DEP30-03 | PR CI regressions 應包含負向故障案例 | 同上 |
| B6-DEP30-04 | 不同 base 設定下必須重新驗證 | 同上 |
| B6-PUB66-01 | 交接異動檔案與文章公開／草稿狀態 | [Publishing L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L66) |
| B6-PUB66-02 | 交接實際執行的檢查與未解風險；未同意不得 Merge | 同上 |

## Cross-file relationship

- B6-PUB46 與 B3-PUB20：OG 配置宣稱與索引現況有重疊，但 JSON-LD 真實性另保留。
- B6-PUB49、B1-DEP31：Preview noindex 與 Production 開放索引條件不可互代。
- B6-PUB65 與 P0 Preview：只有真實 Hosting Preview 才可確認線上預覽。
- B6-DEP30 與 B1-PUB56：索引驗證與草稿故障注入是不同驗收。

## Counts and gates

前五批 ID 反向核對發現實際不重複來源行為 **41** 而非上一輪回報的 40。本批增加 **8** 行、**25** 個工作候選，現為 **49/103** 行有暫定子 ID，**54 行**未完成初步拆分。舊的 119 加本批 25 筆列項暫為 144，仍須重新驗證跨批 ID 重複和分型，不能當作獨立條款總數。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skills 不改、不 Merge、不部署。
