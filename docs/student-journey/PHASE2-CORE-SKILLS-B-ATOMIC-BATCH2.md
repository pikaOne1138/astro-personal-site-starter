# Phase 2｜Core Skills B Atomic Batch 2

Frozen baseline: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`.

| Working ID | Atomic candidate | Source |
|---|---|---|
| B2-PUB36-01 | 舊文章保留 slug，除非學員同意 URL 變更計畫 | [Publishing L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L36) |
| B2-PUB36-02 | 真正內容修改才更新 updatedAt；不得靜默修改 publishedAt | 同上 |
| B2-PUB37-01 | Draft 不得出現在列表、歸檔、RSS、Sitemap、搜尋 | [Publishing L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37) |
| B2-PUB37-02 | 公開 PR Preview 可能曝光草稿；機密資料不能上傳公開 repo 或 preview | 同上 |
| B2-PUB48-01 | 保留 Pagefind HTML-based 搜尋索引 | [Publishing L48](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L48) |
| B2-PUB48-02 | 搜尋 UI 必須另外組裝及實測 | 同上 |
| B2-PUB48-03 | 不新增硬編碼 metadata-only 全站搜尋 | 同上 |
| B2-ASM50-01 | Section Pattern 須先讀 Skill、Registry | [Assembly L50](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L50) |
| B2-ASM50-02 | 學員未選 Pattern 不強制加入 | 同上 |
| B2-ASM50-03 | 輸出 Pattern 骨架仍須真實內容與視覺移植 | 同上 |
| B2-DEP43-01 | 須檢查 Cloudflare 工具權限、scope 與帳號 | [Deploy L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L43) |
| B2-DEP43-02 | 唯讀時由學員在 Dashboard 連接，AI 逐步引導 | 同上 |
| B2-DEP43-03 | 不要求 Token 或假稱已部署 | 同上 |
| B2-DEP43-04 | Private Repo 可優先考慮，仍需部署授權 | 同上 |
| B2-DEP43-05 | 舊 Preview URL 不可推論新 SHA | 同上 |

## Coverage and dedupe gate

本批 5 個來源行 → 15 個工作候選。Batch1 加本批共 10/103 行暫定原子化；剩餘 93 行。這些數字不等於已去重的獨立規範。Publishing L37 與 Batch1 Publishing L28 部分重疊；Publishing L48、Assembly L50 與既有 P0 ID 仍待正式對照。原始 Skill 未修改。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。
