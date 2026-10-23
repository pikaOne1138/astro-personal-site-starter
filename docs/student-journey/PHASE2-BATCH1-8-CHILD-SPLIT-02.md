# Phase 2｜Batch1–8 深入原子化：授權、Cloudflare、內容及 QA

> Frozen main：`2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。本批回讀對應 Skills 原文，將 14 個複合父工作候選的明列條件拆為可追蹤子項。此處獨立 ID 是審查單位，不代表唯一 Canonical 規範。

| 新子工作 ID | 父工作 ID | 確認的子義務／驗收維度 | 凍結來源 |
|---|---|---|---|
| `B1-DEP31-02-S01` | `B1-DEP31-02` | 內容驗收完成 | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-02-S02` | `B1-DEP31-02` | 真實 Preview 驗收完成 | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-02-S03` | `B1-DEP31-02` | 安全驗收完成 | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-02-S04` | `B1-DEP31-02` | 授權驗收完成 | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-02-S05` | `B1-DEP31-02` | 學員明確同意開放索引 | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-03-S01` | `B1-DEP31-03` | 只在正式環境設定 SITE_INDEXABLE=true | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-03-S02` | `B1-DEP31-03` | 變更正式索引設定後重新 Build | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-03-S03` | `B1-DEP31-03` | 驗證 meta robots | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-03-S04` | `B1-DEP31-03` | 驗證 robots.txt | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-03-S05` | `B1-DEP31-03` | 驗證 canonical | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-03-S06` | `B1-DEP31-03` | 驗證 Sitemap | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-04-GH-S01` | `B1-DEP31-04-GH` | GitHub Actions Variables 未設定 SITE_INDEXABLE 時視為 false | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-04-GH-S02` | `B1-DEP31-04-GH` | 正式站審查與學員同意後才可設定 true | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B1-DEP31-04-GH-S03` | `B1-DEP31-04-GH` | 正式索引開放後手動執行 Production Workflow | [astro-starter-deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| `B2-DEP43-01-S01` | `B2-DEP43-01` | 核對可用的 Cloudflare 工具 | [astro-starter-deploy L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L43) |
| `B2-DEP43-01-S02` | `B2-DEP43-01` | 核對工具的 Pages/Git/DNS 操作 scope | [astro-starter-deploy L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L43) |
| `B2-DEP43-01-S03` | `B2-DEP43-01` | 核對實際登入的 Cloudflare 帳號 | [astro-starter-deploy L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L43) |
| `B2-DEP43-02-S01` | `B2-DEP43-02` | AI 只有唯讀權限時不得宣稱已完成連接 | [astro-starter-deploy L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L43) |
| `B2-DEP43-02-S02` | `B2-DEP43-02` | 由學員在 Dashboard 完成 GitHub Repo 連接 | [astro-starter-deploy L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L43) |
| `B2-DEP43-02-S03` | `B2-DEP43-02` | AI 依目前官方畫面與截圖協助操作 | [astro-starter-deploy L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L43) |
| `B2-ASM50-01-S01` | `B2-ASM50-01` | 選 Section Pattern 前讀專用 Skill | [astro-site-assembly L50](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L50) |
| `B2-ASM50-01-S02` | `B2-ASM50-01` | 核對 Section Pattern Registry | [astro-site-assembly L50](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L50) |
| `B2-ASM50-03-S01` | `B2-ASM50-03` | 匯出 Pattern 區塊只是待完善骨架 | [astro-site-assembly L50](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L50) |
| `B2-ASM50-03-S02` | `B2-ASM50-03` | 必須補充真實內容 | [astro-site-assembly L50](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L50) |
| `B2-ASM50-03-S03` | `B2-ASM50-03` | 按原始 Pattern 完成視覺移植 | [astro-site-assembly L50](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L50) |
| `B3-PUB20-03-S01` | `B3-PUB20-03` | 未組裝分類或月份搜尋 UI 不可宣稱完成 | [astro-content-publishing L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L20) |
| `B3-PUB20-03-S02` | `B3-PUB20-03` | 未組裝 OG metadata 不可宣稱完成 | [astro-content-publishing L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L20) |
| `B3-PUB20-03-S03` | `B3-PUB20-03` | 未組裝結構化資料不可宣稱完成 | [astro-content-publishing L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L20) |
| `B4-ASM12-03-S01` | `B4-ASM12-03` | 驗證 HEX 品牌色設定 | [astro-site-assembly L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-ASM12-03-S02` | `B4-ASM12-03` | 驗證選用路由 | [astro-site-assembly L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-ASM12-03-S03` | `B4-ASM12-03` | 驗證 CTA | [astro-site-assembly L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-ASM12-03-S04` | `B4-ASM12-03` | 驗證導航名稱 | [astro-site-assembly L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-ASM12-03-S05` | `B4-ASM12-03` | 驗證導航順序 | [astro-site-assembly L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| `B4-DEP17-02-S01` | `B4-DEP17-02` | 驗證 canonical | [astro-starter-deploy L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L17) |
| `B4-DEP17-02-S02` | `B4-DEP17-02` | 驗證 RSS | [astro-starter-deploy L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L17) |
| `B4-DEP17-02-S03` | `B4-DEP17-02` | 驗證 Sitemap | [astro-starter-deploy L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L17) |
| `B4-DEP17-02-S04` | `B4-DEP17-02` | 驗證 robots | [astro-starter-deploy L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L17) |
| `B4-DEP17-02-S05` | `B4-DEP17-02` | 驗證 OG URL | [astro-starter-deploy L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L17) |
| `B4-DEP24-01-S01` | `B4-DEP24-01` | 核對正式部署分支 | [astro-starter-deploy L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L24) |
| `B4-DEP24-01-S02` | `B4-DEP24-01` | 核對依賴安裝與 Build 命令 | [astro-starter-deploy L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L24) |
| `B4-DEP24-01-S03` | `B4-DEP24-01` | 核對靜態 dist 輸出設定 | [astro-starter-deploy L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L24) |
| `B4-DEP24-01-S04` | `B4-DEP24-01` | 核對 Astro site | [astro-starter-deploy L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L24) |
| `B4-DEP24-01-S05` | `B4-DEP24-01` | 核對 Astro base | [astro-starter-deploy L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L24) |
| `B5-PUB63-02-S01` | `B5-PUB63-02` | 驗證列表連結 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-02-S02` | `B5-PUB63-02` | 驗證標籤連結 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-02-S03` | `B5-PUB63-02` | 驗證月份連結 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-02-S04` | `B5-PUB63-02` | 驗證日期/日曆連結 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-02-S05` | `B5-PUB63-02` | 驗證相關文章連結 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-03-S01` | `B5-PUB63-03` | 驗證分享功能 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-03-S02` | `B5-PUB63-03` | 驗證麵包屑 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-03-S03` | `B5-PUB63-03` | 驗證文章導航 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B5-PUB63-03-S04` | `B5-PUB63-03` | 驗證搜尋實際行為 | [astro-content-publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| `B6-DEP30-02-S01` | `B6-DEP30-02` | npm run verify 檢查索引結構 | [astro-starter-deploy L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L30) |
| `B6-DEP30-02-S02` | `B6-DEP30-02` | npm run verify 檢查路由 | [astro-starter-deploy L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L30) |
| `B6-DEP30-02-S03` | `B6-DEP30-02` | npm run verify 檢查草稿隔離 | [astro-starter-deploy L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L30) |

## 語義裁決

- 多個驗收面（例如 canonical、robots、Sitemap）可作為同一發布 Gate 的子檢查，而非額外創造獨立政策。父工作 ID 保留，不能父子雙算。
- Cloudflare 唯讀時引導學員操作是權限條件，不等於所有學員都必須配置 Cloudflare；與 GitHub Pages 部署是不同分支。
- Section Patterns、OG、分類月份搜尋等均是按學員實際網站選用的條件性義務，不能因別的網站沒有組裝就一律判為 Bug。
- 本次沒有碰舊 Site Brief 永久保存政策；A/C 路徑不強制 JSON。

本批 **14 個父工作候選／55 個帶來源錨點子檢查**。後續仍需跨來源 SAME/PARTIAL/DISTINCT 與反向追溯；Stage2 IN PROGRESS、3/4 BLOCKED。
