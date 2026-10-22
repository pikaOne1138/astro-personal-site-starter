# Phase 2｜Skill 附屬規範 B：Editorial Checklists / Recipes / References

Frozen `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`. 此紀錄只從完整檔案篩選可能具規範性的**原文行**，不是完整逐條批准；未命中者仍可能為規則。詳細來源依 [CLAUSE-COVERAGE-MATRIX.md](CLAUSE-COVERAGE-MATRIX.md) 管理。任何原始 Skill 和配方未修改。

**角色不可混淆：** visual-qa/scoring/diversity 是 QA 原則；五種 recipe 是構圖樣例；cross-site-pattern、workflow 和 evidence legend 是研究解讀規範，不能當獨立網站已通過視覺驗收。

## `.ai/astro-editorial-layout-design/README.md`

Blob `9b9c82db052fede821f7910b0ed79610cfd1be5a`; 91 total lines, 6 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/README.md#L3) | 給其他 AI Coding Agent 使用的設計 Skill：為繁體中文**知識型**與**助人者**網站設計「編輯式版面」的 Astro 首頁，並以四個寬度的實際畫面驗收。 | NEEDS_REVIEW |
| [L6](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/README.md#L6) | > 目標不是重新產生那十款網站，而是提煉它們的**設計方法、構圖原則、實作技巧與驗收標準**，讓新網站達到同等成熟度、但構圖全新。 | NEEDS_REVIEW |
| [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/README.md#L12) | ├─ SKILL.md                      ← 入口：硬規則、工作流程、配方選擇、驗收 | NEEDS_REVIEW |
| [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/README.md#L26) | │  ├─ visual-qa.md               ← 四寬度 × 12 類驗收清單 | NEEDS_REVIEW |
| [L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/README.md#L28) | │  └─ diversity-check.md         ← 十款構圖指紋；禁止「只有配色不同」 | NEEDS_REVIEW |
| [L55](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/README.md#L55) | **看完腳本結果後，必須實際看截圖**（孤字、構圖、影像上文字等腳本抓不到）。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/checklists/diversity-check.md`

Blob `b781b3a503ce3f79702ae94f226b4493a33bad77`; 50 total lines, 1 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/checklists/diversity-check.md#L3) | 每個站在 8 個旋鈕各取一值。新站必須與**十款中最接近的 2 款**在 ≥ 3 個旋鈕上不同，且與同批次的其他新站在 ≥ 3 個旋鈕上不同。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/checklists/scoring.md`

Blob `c4b8b2802c23a24fb227ea059126cd8cf89b9ae7`; 50 total lines, 0 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|


## `.ai/astro-editorial-layout-design/checklists/visual-qa.md`

Blob `c52d149e5e77787e32161f5ce245967eff9f9dcc`; 99 total lines, 4 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/checklists/visual-qa.md#L3) | **`astro build` 通過只代表語法正確（失敗 F09）。** 交付前必須在 **1440／1280／768／390px** 四個寬度各看一次**整頁截圖**，再跑 `scripts/audit.mjs`。 | NEEDS_REVIEW |
| [L13](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/checklists/visual-qa.md#L13) | 標記：**[A]** 腳本可量測；**[V]** 必須目視；**[M]** 手動操作（鍵盤、系統設定）。 | NEEDS_REVIEW |
| [L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/checklists/visual-qa.md#L24) | 另外建議補看 **1024** 與 **320**（`min-width:320px` 不得水平捲動）。 | NEEDS_REVIEW |
| [L69](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/checklists/visual-qa.md#L69) | - [V] 次要欄位被「隱藏」而不是縮到不可讀（如 ledger 類型標籤） | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/recipes/cta-trust.md`

Blob `8901779067b87c2e0d26285cd88a2383e3aa95e2`; 73 total lines, 0 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|


## `.ai/astro-editorial-layout-design/recipes/heroes.md`

Blob `2ef3652e01c796a5ab291fba975941bf170c6c91`; 281 total lines, 5 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L4](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/heroes.md#L4) | 元件預設內容是示意；使用時**必須改結構與內容，不是只改文字與顏色**（失敗 F10）。 | NEEDS_REVIEW |
| [L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/heroes.md#L23) | **選擇規則**：先問「這位站長要被怎樣信任」，再選；不要先選好看的。若兩站的 Hero 配方相同，其餘 7 個旋鈕中至少要有 3 個不同（`checklists/diversity-check.md`）。 | NEEDS_REVIEW |
| [L82](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/heroes.md#L82) | **算寬公式**：每個詞組寬度 ≈ 字數 × 字級(px) 必須 ≤ 標題欄寬。1440 視窗：8 欄 ≈ 795px、10vw = 144px → 詞組 ≤ 5 字。超過就拆成兩個詞組（陣列元素）。 | NEEDS_REVIEW |
| [L204](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/heroes.md#L204) | **適用**：有「空間感」的服務（身體、自然、場域）。**必須有真實影像**，漸層只是示範。 | NEEDS_REVIEW |
| [L214](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/heroes.md#L214) | **常見失敗**：影像上的 nav 文字 10px 且無遮罩（原版）；遮罩只用單層漸層，底部小字不可讀；沒有 `fetchpriority="high"`。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/recipes/lists.md`

Blob `8928e4038eb3a6a190b927e97aff39714036ddfd`; 64 total lines, 2 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/lists.md#L29) | **來源**：[OBS] `.ll-track::before{left:27px;width:2px}` + `.ll-unit{grid-template-columns:58px 1fr 78px}` + `.ll-unit-no{width:54px;height:54px;z-index:1}`。 | NEEDS_REVIEW |
| [L46](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/lists.md#L46) | **來源**：[OBS] `.ma-steps{grid-template-columns:repeat(3,1fr);align-items:start}`、`.ma-step--two{margin-top:2rem}`、`--three{margin-top:4rem}`、`details`＋`::after{content:"＋"}`。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/recipes/rhythm.md`

Blob `02ff7a0af801871f53c84ad12f7a474826932ca1`; 58 total lines, 4 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/rhythm.md#L22) | **驗收**：audit 的 `gaps[]` 在同一頁應只有 ≤ 3 種值。 | NEEDS_REVIEW |
| [L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/rhythm.md#L31) | **token 重新映射 [NEW]**：深色帶內重設 `--ed-*`，子元件不必寫深色版；開發 R05/R06 時我們實際遇到「深帶內標題用固定 ink 色而不可見」(contrast=1) 而加入此做法。 | NEEDS_REVIEW |
| [L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/rhythm.md#L32) | **規則**：一頁 3–5 個區塊至少 1 次明度反轉；連續 2 個區塊同底色時用 R03 線寬分隔。 | NEEDS_REVIEW |
| [L42](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/rhythm.md#L42) | **配方 [NEW]**：連續 ≥3 個雙欄區塊時，鏡像至少 1 次（`.flip{grid-template-columns:1.3fr .7fr}` 且標題 `order:2`）；手機一律「標題在上」。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/recipes/sections.md`

Blob `dbfcf0b3fae9c21c464d475ed52b7217c2da2a68`; 70 total lines, 1 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L41](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/recipes/sections.md#L41) | **來源**：[OBS] `.co-letter::before{left:50%;border-left:1px dashed #d2b7aa}`、`.co-letter-body{max-width:610px;font-size:1.03rem;line-height:2.1}`。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/references/00-evidence-legend.md`

Blob `8ef9d8d7efb0f5ccbd3ff2b36b14c879a3783623`; 61 total lines, 1 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L10](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/00-evidence-legend.md#L10) | \| **[NEW]** \| 本 Skill 額外提出的建議（含閾值、配方、驗收標準）。**十款原始碼中不存在或不遵守。** \| 建議 \| | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/references/01-cross-site-patterns.md`

Blob `b89c8088f3cd28dd6b5ac0a5f5d36ee958c062d2`; 74 total lines, 5 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/01-cross-site-patterns.md#L3) | 每條規律標註支持它的案例數（N/10）與證據標記。**「共同遵守」不等於「值得照抄」**——最後一節列出十款共同犯的缺陷。 | NEEDS_REVIEW |
| [L42](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/01-cross-site-patterns.md#L42) | 這些是在 [MEAS] 中十款**全部**出現的問題，所以不能因為「十款都這樣」而當成規範： | NEEDS_REVIEW |
| [L59](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/01-cross-site-patterns.md#L59) | - **不應重複套用的風格特徵**：任何單款的識別組合 —— 拱形圖＋苔綠(fn)、硬陰影＋螢光底(ll)、白框旋轉靜物＋印章(cu)、波形帶(ra)、虛線摺痕＋郵戳(co)、遮罩影像 hero＋呼吸動畫(so)、階梯卡片＋橘影(ma)、貼紙＋薑黃圓(cg)。 | NEEDS_REVIEW |
| [L61](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/01-cross-site-patterns.md#L61) | - **不可沿用的缺陷**：C1–C7。 | NEEDS_REVIEW |
| [L65](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/01-cross-site-patterns.md#L65) | 設計新站時，**不要選一款來改**；而是對下面每個旋鈕各選一個值，組合要與十款每一款至少在 3 個旋鈕上不同： | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/references/02-design-tokens.md`

Blob `06c0dfb75b8417aae467dca1914be577049c3a22`; 98 total lines, 4 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L14](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/02-design-tokens.md#L14) | 規則 [NEW]：**背景一律掛在根容器或帶狀 section，禁止掛在 `max-width` 容器上**。帶狀區塊用 | NEEDS_REVIEW |
| [L25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/02-design-tokens.md#L25) | \| 超大標題 h1 \| `clamp(3rem, 8–12vw, 9–11rem)` \| 手機最小 3rem，且**必須在 390px 驗證行數 ≤ 4、無孤字** \| | NEEDS_REVIEW |
| [L41](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/02-design-tokens.md#L41) | \| 禁止孤字 \| 無 \| 末行 ≥ 2 字；可用 `text-wrap:pretty` \| 同上 \| | NEEDS_REVIEW |
| [L98](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/02-design-tokens.md#L98) | [NEW] 預算：每頁 ≤ 1 個持續動畫、位移 ≤ 8px、scale ≤ 1.06、持續時間 ≥ 200ms；並必須有 `@media (prefers-reduced-motion: reduce)` 全域關閉。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md`

Blob `48b7c83ea377efc96976f8a1460322a11de94e8b`; 124 total lines, 7 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md#L37) | - **修正**：**節點占獨立 grid 欄；軸線 `left = 欄寬/2`；節點 `z-index:1`**（`ll-track`＝[OBS]：`58px 1fr 78px`、`::before{left:27px}`）。見 `recipes/code/lists/L02-node-track.astro`。 | NEEDS_REVIEW |
| [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md#L45) | - **修正**：至少 3 種「聲音」：超大標題（≥ 6.5vw）、中標題（2–3.3rem）、小標籤（12px mono 大寫）；h1 : 正文 ≥ 5:1。 | NEEDS_REVIEW |
| [L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md#L66) | - **助人類**：禁止編造資格、療效、見證、人數（A17）。 | NEEDS_REVIEW |
| [L72](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md#L72) | - **偵測**：必須跑 `scripts/audit.mjs` 並**實際看截圖**（四個寬度）。十款本身即例：build 全過，但 [MEAS] 每頁 19–37 處 <12px、手機觸控 <24px 5–11 個。 | NEEDS_REVIEW |
| [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md#L79) | - **修正**：重新選至少 3 個旋鈕（`01-cross-site-patterns.md` §E）。 | NEEDS_REVIEW |
| [L91](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md#L91) | - **修正**：`text-wrap:balance`（標題）／`pretty`（段落）、用 `<span class="nw">不可斷詞組</span>`、縮小 `max-inline-size`；避免跨斷點都用同一組 `<br/>`。 | NEEDS_REVIEW |
| [L124](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/03-ai-failure-modes.md#L124) | → 驗收一律「腳本＋眼睛」，缺任一不算通過。 | NEEDS_REVIEW |

## `.ai/astro-editorial-layout-design/references/04-workflow.md`

Blob `d150cacd2b04c10d56bebd0068065db6b5cd9c4a`; 104 total lines, 12 candidate lines.

| Source line | Verbatim text | Review |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L3) | > 核心禁令：**不得把既有網站變成「只有配色不同的共用模板」。** 每個新站必須在構圖旋鈕上與十款中任何一款至少 3 個不同（`checklists/diversity-check.md`）。 | NEEDS_REVIEW |
| [L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L24) | **內容層級表**範本（至少 5 列）： | NEEDS_REVIEW |
| [L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L36) | 4. 寫一句話：**「為什麼這個構圖適合這位站長」**（不能用形容詞；要寫成結構理由，如「訪客需要先看到他一年讀過的書，所以 hero 是書單本身」）。 | NEEDS_REVIEW |
| [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L70) | - 用 `recipes/code/**` 的成品當起點，**複製後必須改結構**，不是只改文字（否則違反 F10）。 | NEEDS_REVIEW |
| [L83](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L83) | - **然後實際看截圖**（至少 1440 與 390 兩張的首屏與每個區塊）。工具抓不到的：孤字、構圖失衡、圖片主體被裁、影像上文字可讀性、整體節奏。 | NEEDS_REVIEW |
| [L95](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L95) | **交付訊息必須誠實列出**：已驗證什麼（build、audit、截圖）、未驗證什麼（真實裝置、螢幕閱讀器）、佔位內容清單。 | NEEDS_REVIEW |
| [L99](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L99) | 1. 禁止複製一款的 class 結構再換色。 | NEEDS_REVIEW |
| [L100](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L100) | 2. 禁止整頁 <12px 標籤。 | NEEDS_REVIEW |
| [L101](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L101) | 3. 禁止只跑 `astro build` 就宣稱完成。 | NEEDS_REVIEW |
| [L102](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L102) | 4. 禁止編造資格／見證／數字／日期。 | NEEDS_REVIEW |
| [L103](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L103) | 5. 禁止在助人類站使用緊迫語氣（「限時」「立即」「名額有限」）。 | NEEDS_REVIEW |
| [L104](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/04-workflow.md#L104) | 6. 禁止一頁出現 ≥ 3 組同結構三欄卡片。 | NEEDS_REVIEW |

Phase 2 IN PROGRESS; Phase 3/4 BLOCKED.
