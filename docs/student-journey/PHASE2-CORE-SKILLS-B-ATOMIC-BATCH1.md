# Phase 2｜核心 Skills B 高風險複合條款原子拆解（Batch 1）

Frozen source: main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`.

本批人工先處理 5 個高風險複合來源行，建立 25 項來源錨定候選；不主張已完成 103 行，也不主張 25 個都是獨立規範。

| 暫定 ID | 可獨立核對的候選義務／條件 | Frozen 來源 |
|---|---|---|
| B1-PUB28-01 | 公開文章只來自 articles Collection | [publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) |
| B1-PUB28-02 | 草稿存放於 drafts 而非 articles | 同上 |
| B1-PUB28-03 | 發布時移入 articles 並將舊 draft:true 改為 false | 同上 |
| B1-PUB28-04 | 撤回時移回 drafts、設 draft:true 並清空舊輸出重新 Build | 同上 |
| B1-PUB28-05 | 每次轉換檢查公開文章路由 | 同上 |
| B1-PUB28-06 | 不可靜默改網址；舊站 legacy 過濾須先檢查路由再遷移 | 同上 |
| B1-PUB28-07 | 資料夾隔離是發布控制不是保密控制 | 同上 |
| B1-PUB28-08 | 變更後實際執行草稿外洩 Gate；未執行不能 PASS | 同上 |
| B1-PUB28-09 | 公開 Loader 僅限 articles，不得 glob 全內容目錄 | 同上 |
| B1-PUB56-01 | 文章修改後須乾淨 Build 並對實際學員站執行 Gate | [publishing L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) |
| B1-PUB56-02 | 檢查草稿直接 HTML 路由、全部 HTML、RSS、Sitemap 及搜尋發現介面 | 同上 |
| B1-PUB56-03 | 負向故障注入應被驗證器偵測為 FAIL | 同上 |
| B1-PUB56-04 | 驗證器漏報必須修 Gate，不能修報告 | 同上 |
| B1-PUB56-05 | 自訂 slug、巢狀路由、MDX、CMS 等須另外擴展 route-aware 驗證 | 同上 |
| B1-ASM22-01 | 發布前逐頁指出仍為 Demo/sample/unconfigured 的元素 | [assembly L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L22) |
| B1-ASM22-02 | 學員選擇保留、編輯或隱藏 | 同上 |
| B1-ASM22-03 | 學員可明確選擇保留已標示的示範內容 | 同上 |
| B1-ASM23-01 | 正式發布必須核准特定的目前版本 | [assembly L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L23) |
| B1-ASM23-02 | 正式發布必須核准變更範圍與 Production 行動 | 同上 |
| B1-ASM23-03 | Build 和 Preview 通過不等於發布核准 | 同上 |
| B1-ASM23-04 | 已揭露且知情接受的 Demo 不單獨阻擋獲核准的發布 | 同上 |
| B1-DEP31-01 | 預設 HTML noindex，robots.txt 禁止索引 | [deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) |
| B1-DEP31-02 | 完成內容、Preview、資安與授權驗收且學員明確同意後才可開啟正式站索引 | 同上 |
| B1-DEP31-03 | 只在 Production 使用 SITE_INDEXABLE=true 並重新 Build、檢查 robots/canonical/Sitemap | 同上 |
| B1-DEP31-04 | Cloudflare Preview 不得共用正式站索引設定；GitHub Pages Actions Variable 預設 false，核准後手動正式部署 | 同上 |

## 跨文件關係：待 P0 canonical 審核

- Publishing L28 / L56：發布隔離與故障注入 Gate 不可視為完全同義。
- Assembly L22 / L23：示範內容保留的選擇權與特定版本的 Production 授權不可混淆。
- Deploy L31 與 P0 索引規範：有重疊可能，但 Cloudflare／GitHub Pages 差異必須保留。
- 上述 25 個 ID 是追溯工作 ID，不加入正式唯一規範數。須逐項比對 P0 登錄表與前一批 Skills A。

## Gate

第二階段持續進行。此批 5/103 個規範／程序來源行已拆，98 行仍待處理；人工語義審核及正式去重未完成。第三、四階段繼續 BLOCKED。原始 Skills 未修改，PR 維持 Draft，未 Merge。
