# Phase 2｜Core Skills B — Batch 8：組站元件與交付

Frozen baseline: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`.

本批針對十二個尚未登錄子條款的 Assembly 來源行，建立 26 個暫定原子候選。每一列的來源與語義尚待同義裁決；它們不是 26 條新政策。

| 工作 ID | 子要求摘要 | 凍結來源 |
|---|---|---|
| B8-ASM-L17-01 | Exporter 在另一目錄產出獨立可執行 Astro，不修改 Showcase | [L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L17) |
| B8-ASM-L17-02 | 生成所選頁面、共用導航與站點資產，不將研究站路由全數照搬 | 同上 |
| B8-ASM-L17-03 | 有 Adapter 時保留專屬 Home，不用通用 Hero 替代 | 同上 |
| B8-ASM-L17-04 | Phase 1 不能聲稱完整移植十二套原始構圖 | 同上 |
| B8-ASM-L29-01 | 服務資料只能使用學生提供的 scope／exclusions／method／firstVisit 等真實欄位 | [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L29) |
| B8-ASM-L29-02 | 未填資料顯示未配置，缺 contact endpoint 不可冒充可用預約表單 | 同上 |
| B8-ASM-L30-01 | 長 CJK、缺媒體及文章數不同是正常學員輸入 | [L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L30) |
| B8-ASM-L30-02 | 保留家族構圖但調整響應式約束，不用通用版型取代 | 同上 |
| B8-ASM-L31-01 | student-visual-qa 產出首頁／內頁的 1440、1280、768、390 截圖 | [L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L31) |
| B8-ASM-L31-02 | 人工對照 Art Direction；Build PASS／無 Overflow 不代表忠實度 | 同上 |
| B8-ASM-L35-01 | 保留家族專用的首頁與內頁元件，不替換為通用頁首或內頁 | [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L35) |
| B8-ASM-L37-01 | Home Adapter 從所選 slug 來源匯出到學生 selected/Home.astro | [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L37) |
| B8-ASM-L38-01 | ArticleArchive 提供知識型各家族不同結構，但共用文章資料查詢 | [L38](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L38) |
| B8-ASM-L39-01 | ArticleDetail 依家族組合閱讀版型，仍僅有一個 h1，內文以 slot 載入 Collection | [L39](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L39) |
| B8-ASM-L40-01 | 一般內頁使用家族 DesignInterior 元件 | [L40](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L40) |
| B8-ASM-L41-01 | About 使用 AboutSections | [L41](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L41) |
| B8-ASM-L42-01 | 助人服務使用 ServiceSections | [L42](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L42) |
| B8-ASM-L43-01 | 導覽與 Footer 使用 DesignChrome.css | [L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L43) |

## 來源與語義注意事項

- 本批 12 個來源行涵蓋 18 個暫定子候選（非 26 個；以本表實際列數為準）。
- L37–L43 是具體現有元件映射／架構事實，不宜與 L35 的整體規範重複算政策。
- L31 與先前四尺寸 QA 條款有重疊，但截圖存在、人工評閱、原型忠實度為不同驗收。
- L17／L35 與 PR46 架構邊界需比較，不能從初版組件推定全部多頁完成。
- 不做 Canonical ID 合併；保留每行來源與技術限制。

## Gate

前 7 批來源行集合為 **58/103**；本批新增 **12** 個不重複來源行，累計 **70/103**，還有 **33 行**待初步拆解。候選筆數需以實際表格及跨批來源反查，不能憑預估相加。Phase 2 IN PROGRESS、Phase 3/4 BLOCKED，原始 Skills 未修改，不 Merge、不部署。
