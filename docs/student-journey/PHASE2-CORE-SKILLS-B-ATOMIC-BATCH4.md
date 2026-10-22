# Phase 2｜核心 Skills B 原子候選 Batch 4

Frozen main: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。本批新增 10 個不重複來源行、26 個工作候選。每個子候選仍需與 P0 及先前批次做語義比較，非正式 Canonical 條款。

| ID | 來源候選與保留範圍 | Frozen source |
|---|---|---|
| B4-PUB24-01 | 在真正的學員生成目錄執行 npm run build | [Publishing L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L24) |
| B4-PUB24-02 | 從 ZIP 使用帶 --student-site 的驗證命令；無 flag 僅供研究站 | 同上 |
| B4-PUB24-03 | 發布前讀 PR Preview Skill | 同上 |
| B4-PUB32-01 | 內容與目標不能推導時才詢問學員 | [Publishing L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L32) |
| B4-PUB32-02 | slug 或 public/draft 狀態有疑慮時先確認 | 同上 |
| B4-PUB38-01 | 富文本需求先檢查現有元件及 Registry | [Publishing L38](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L38) |
| B4-PUB38-02 | 不複製現有 article renderer 邏輯 | 同上 |
| B4-PUB50-01 | 每次學員部署核對 astro.config site/base | [Publishing L50](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L50) |
| B4-PUB50-02 | RSS、Sitemap、canonical 絕對網址不能沿用教師 Repo 網址 | 同上 |
| B4-ASM12-01 | 讀 Starter Config、Layout Directions、Blocks Registry | [Assembly L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L12) |
| B4-ASM12-02 | 驗證 kind/layoutSlug 一致性 | 同上 |
| B4-ASM12-03 | 驗證 HEX、路由、CTA、導航名稱及排序 | 同上 |
| B4-ASM28-01 | About 應採學生實際提供的 bio、purpose、approach、background | [Assembly L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L28) |
| B4-ASM28-02 | 不得自行虛構資格、經歷、推薦與獎項 | 同上 |
| B4-DEP16-01 | 辨認 GitHub Pages 是 Project、User 或 Custom Domain | [Deploy L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L16) |
| B4-DEP16-02 | 依實際域名及 Repo 子路徑設定 Astro site/base | 同上 |
| B4-DEP17-01 | 用 import.meta.env.BASE_URL 處理路由與資產 | [Deploy L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L17) |
| B4-DEP17-02 | 核對 canonical、RSS、Sitemap、robots、OG URL | 同上 |
| B4-DEP17-03 | 移除研究站的硬編碼 URL | 同上 |
| B4-DEP18-01 | 使用 GitHub Actions Build/Deploy | [Deploy L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L18) |
| B4-DEP18-02 | 不直接套用教師 showcase 的 workflow_run、Preview Cleanup、gh-pages Snapshot | 同上 |
| B4-DEP18-03 | 學員獨立單站工作流程採最小權限 | 同上 |
| B4-DEP20-01 | 首次 Pages、Actions 權限及 DNS 可能需學員自己設定 | [Deploy L20](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L20) |
| B4-DEP20-02 | 未確認真實授權或部署，不可宣稱已完成 | 同上 |
| B4-DEP24-01 | Cloudflare Git 整合須核對正式 Branch、Build、dist、site/base | [Deploy L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L24) |
| B4-DEP24-02 | Cloudflare base 依實際根網域或子路徑判斷，不可硬套 / | 同上 |

## 語義初判

- B4-PUB50-02、B4-DEP17-02/03、B4-DEP16-02：同屬 URL 基礎設定與驗證，**PARTIAL_OVERLAP**，不能刪掉平台區別。
- B4-PUB38-01、B4-ASM12-01：都是先查既有 Registry，但對象不同（文章功能 vs 組站元件），**PARTIAL_OVERLAP**。
- B4-DEP20-02、B2-DEP43-03：未實際完成不得聲稱完成，有 **SAME_CANDIDATE**；但後者特指 Cloudflare 工具無權限，不得移除適用條件。
- B4-DEP18-02 與 B4-DEP16-02：教師展示站工作流與學生獨立站路徑設定為 **DISTINCT**。

## 統計及 Gate

Batch1/2/3 為 20 行／69 候選；本批 10 行／26 候選，暫計 **30/103 行、95 個工作候選**，尚餘 **73 個來源行**未初步拆分。前批新增父 ID 下的 Cloudflare／GitHub 子欄位不可加總。仍未取得 103 行全量原子化與 P0 全量語義去重。Phase 2 IN PROGRESS、Phase 3/4 BLOCKED；原始 Skill 未修改，不 Merge 或部署。
