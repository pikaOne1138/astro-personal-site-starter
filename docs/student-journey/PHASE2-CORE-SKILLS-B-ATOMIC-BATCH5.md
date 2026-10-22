# Phase 2｜Core Skills B Batch 5

Frozen source: main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`.

本批為 8 個先前未建立來源子 ID 的規範／程序行建立 24 個暫定子候選。各來源行與內容以凍結版為準，工作 ID 不等於去重後 Canonical ID。

| ID | 候選要求 | Frozen source |
|---|---|---|
| B5-PUB8-01 | 文章／SEO／RSS／搜尋相關工作使用 Publishing Skill | [Publishing L8](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L8) |
| B5-PUB8-02 | GitHub 發布應協同 PR Preview Skill | 同上 |
| B5-PUB8-03 | 版型變動協同 UI Craft Skill | 同上 |
| B5-PUB12-01 | 文字、身份、URL、圖片、專業事實由使用者提供 | [Publishing L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) |
| B5-PUB12-02 | 不得虛構資格、見證、價格、聯絡、電子報及預約成功 | 同上 |
| B5-PUB18-01 | 離線 ZIP 為參考包，不等於學員生成網站 | [Publishing L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L18) |
| B5-PUB18-02 | 真正學生網站以生成目錄為準 | 同上 |
| B5-PUB18-03 | 學員不用 Clone 教師 Repo | 同上 |
| B5-PUB22-01 | 研究 ZIP 內部檔案不能當作學員預設路由 | [Publishing L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L22) |
| B5-PUB22-02 | 不直接照搬八種 Demo 或要求學員取得研究 Repo | 同上 |
| B5-PUB58-01 | 已撤回草稿可能留在歷史部署與公開 PR Preview | [Publishing L58](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L58) |
| B5-PUB58-02 | Git History 或 immutable Artifact 可能保留內容 | 同上 |
| B5-PUB58-03 | noindex、draft flag 不保障資料保密 | 同上 |
| B5-PUB58-04 | 須向學員回報歷史外洩可能性 | 同上 |
| B5-PUB62-01 | 讀 package.json 核對實際 Build Script | [Publishing L62](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L62) |
| B5-PUB62-02 | 可能時測 Production 與實際 PR Base Build | 同上 |
| B5-PUB62-03 | 不得繞過失敗 Gate 換取 CI Green | 同上 |
| B5-PUB63-01 | 檢查實際產出文章與缺漏路由 | [Publishing L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L63) |
| B5-PUB63-02 | 核對清單、標籤、月份、日期、相關文章連結 | 同上 |
| B5-PUB63-03 | 核對文章分享、麵包屑、導航及搜尋行為 | 同上 |
| B5-ASM8-01 | 按任務職責參照 Onboarding、Layout、Editorial、UI、Publishing、Deploy、Maintenance Skills | [Assembly L8](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L8) |
| B5-ASM8-02 | 不得把設計指引當成已可執行網站 | 同上 |
| B5-ASM21-01 | Draft／Preview 可保留已明確標示的 Demo／Sample 與未配置欄位 | [Assembly L21](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L21) |
| B5-ASM21-02 | 不得僅因未完成而擅自刪除／隱藏 | 同上 |
| B5-ASM21-03 | 未核實的資格、見證、療效、價格、可用表單不得偽裝成真實 | 同上 |

## 去重初判

- B5-PUB58 與 B1-PUB28：資料夾隔離非保密，歷史 Preview 外洩屬不同威脅面，PARTIAL_OVERLAP。
- B5-ASM21 與 B1-ASM22：Draft 允許保留 Demo 與正式發布前要求學員選擇處置，不可合併為「必須刪除」。
- B5-PUB63 與先前 SEO/文章驗收：驗收面有重疊，實際搜索、分享與內鏈操作保留。

## 計數核查

前四批實際覆蓋 32 個不重複來源行，不是之前宣稱的 31 行：Batch1 5、Batch2 5、Batch3 11、Batch4 12，其中 Batch2 與 Batch4 均涉及 DEP L43，重疊 1 行。

Batch5 新增 8 行／24 候選後，共 **40/103 個不重複來源行**有工作 ID，**63 行**尚待初步拆解。列項候選 95 + 24 = **119**，不能當作獨立規範總數。來源、條款、驗收欄位與 P0 canonical 去重尚未全部完成。

Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skills 不修改、PR 不 Merge、不部署。
