# Phase 2｜Crosswalk 04：真實內容、Demo/Draft 與發布授權

**範圍**：只裁決 7 個 Frozen Source 行（以及相關 P0/Batch 候選）的語義邊界；非全 repo 已核准 Canonical 清單。Frozen main：`2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。PR #61 Upstream Delta 仍獨立保留。

## 已直接核對來源的語義群

| 候選群（非正式 Canonical ID） | 對應工作 ID | Frozen 來源 | 初步判定／不得失去的限定 |
|---|---|---|---|
| TRUTH-SUPPLIED：身分、素材、服務事實有真實來源 | `P0-U013`、`B5-PUB12-01`、`B5-PUB12-02` | [site-entry L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-entry/SKILL.md#L18)、[publishing L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L12) | PARTIAL_OVERLAP：一般真實性規範與由本人提供的欄位具關聯，但資格、見證、價格、聯絡、素材授權等不得合併成未列舉的籠統字句 |
| TRUTH-FAKE-FUNCTION：不能冒充已啟用的服務 | `P0-U014`、`B5-ASM21-03`、`B9-ASM-L29-1` | [site-entry L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-entry/SKILL.md#L18)、[assembly L21](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L21)、[assembly L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L29) | PARTIAL_OVERLAP：假預約／假電子報成功與缺 contact endpoint 的不可用表單是兩個實作狀態，仍須分別確認 |
| DEMO-PREVIEW：標明未配置內容可供視覺評估 | `B5-ASM21-01`、`B5-ASM21-02` | [assembly L21](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L21) | DISTINCT FROM PUBLISH GATE：預覽可保留 Demo／Sample；不得為了「整潔」未經學員選擇擅自刪除 |
| DEMO-RELEASE-CHOICE：發布前逐頁揭露並由學員選擇 | `B1-ASM22-01`、`B1-ASM22-02`、`B1-ASM22-03` | [assembly L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L22) | DISTINCT：允許選擇 keep/edit/hide；已明示為 Demo 且理解影響時學員**可以選擇發布**，不是一律禁止 |
| RELEASE-CONSENT：特定版本、範圍與 Production 行動授權 | `P0-U001`、`P0-U003`、`B1-ASM23-01`、`B1-ASM23-02`、`B1-ASM23-03`、`B1-ASM23-04` | [assembly L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L23) | PARTIAL：內容確認≠Merge/Production 授權；已告知 Demo 可被核准保留，不表示可以假造真實資格／服務 |
| DRAFT-PUBLICATION-BOUNDARY：文章狀態、Loader 與 clean Build | `B1-PUB28-01` 至 `B1-PUB28-09`、`B2-PUB37-01` | [publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28)、[L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37) | DISTINCT：draft 寫入位置、狀態轉換、URL 保留、Public Loader、列舉輸出面及 leak Gate 皆要個別驗證；不可僅以 frontmatter draft:false 當成完整發布 |
| DRAFT-PRIVACY-THREAT：撤稿不等於撤回已公開資料 | `B1-PUB28-07`、`B2-PUB37-02`、`B5-PUB58-01` 至 `B5-PUB58-04` | [publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28)、[L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L37)、[L58](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L58) | PARTIAL：Git History、舊部署、公開 PR Preview、不可變 Artifact 是不同外洩表面；noindex/draft flag 都不是保密控制；須如實告知限制 |

## 來源 → 義務 → 候選覆蓋檢查

本輪明確檢查 Frozen 行：site-entry L18；publishing L12、L28、L37、L58；assembly L21、L22、L23、L29（合計 **9 個來源行**）。每一行在上表至少一個候選群出現；這僅是上述選取來源的局部 source traceability，**不是** 192 檔文件的完整對照。

## 不能直接刪掉的例外

1. Demo 可以保留於 Preview；正式發布前要逐頁揭露，學員能在知情下選擇保留。這不允許把假證照、療效、客戶見證或未配置表單稱為真實。
2. 草稿不出現在 RSS／Sitemap／Pagefind 的要求，與草稿仍可能留在 Git/歷史 Preview 是不同的風險：兩者都必須保留。
3. 「人工審核內容」與「對指定 PR/SHA 的發布授權」不可互相替代。
4. #61 的手動 QA 證據與三路徑 Site Brief 不強制原則仍由 [UPSTREAM-DELTA-PR61.md](UPSTREAM-DELTA-PR61.md) 和 [PHASE2-PR61-CANONICAL-CROSSWALK-03.md](PHASE2-PR61-CANONICAL-CROSSWALK-03.md) 獨立追蹤。

## Gate

本次 **7 個候選群、9 個 Frozen source 行的局部語義裁決**；所有 SAME/PARTIAL/DISTINCT 判定尚需跨 P0/Skills A/B/上游 Delta 的全量雙向反查，且尚未產出核准的獨立規範總數。Stage 2 IN PROGRESS；Stage 3/4 BLOCKED。未修改來源 Skills、未改學員模板、未 Merge、未部署。
