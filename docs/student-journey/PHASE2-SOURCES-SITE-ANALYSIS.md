# Phase 2｜十站構圖逆向分析來源分類

Frozen `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`，主紀錄 [CLAUSE-COVERAGE-MATRIX.md](CLAUSE-COVERAGE-MATRIX.md)。逐檔查閱並凍結 SHA。十站分析屬 **OBSERVED_RESEARCH**，不能視作實際生成網站已完成 QA、正式原始碼授權或 ATP Starter 已支援的證據。

## `.ai/astro-editorial-layout-design/references/site-analysis/01-field-notes.md`

Blob `9f0d70680b638cb2790845e3d586652e649ec2ff` (60 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/01-field-notes.md#L56) | - 「24° 48′ N」之類裝飾座標是無資訊價值的氛圍文字（[INF]：在真實專案中應換成真實資料或刪掉）。 | SCOPE_REVIEW |

## `.ai/astro-editorial-layout-design/references/site-analysis/02-essayist.md`

Blob `096f23b16794022cd7bd5ad657e9df8e75cb0225` (52 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L42](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/02-essayist.md#L42) | 4. 絕對定位的裝飾圖必須在手機改回文流（`position:relative`）。 | SCOPE_REVIEW |

## `.ai/astro-editorial-layout-design/references/site-analysis/03-learning-lab.md`

Blob `f1142cd4617615f2e5f2537c6254b519eade8cf5` (49 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/03-learning-lab.md#L45) | - `.ll-unit>a` 選擇器沒有對應元素（箭頭已移除）—— 死 CSS。 | SCOPE_REVIEW |

## `.ai/astro-editorial-layout-design/references/site-analysis/04-curator.md`

Blob `2a65678b602bd6d4bb8f92b3daaa171b7f1d0ad7` (47 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|


## `.ai/astro-editorial-layout-design/references/site-analysis/05-radio-letter.md`

Blob `9df415864cd9be93caca26914d4ef860005b924b` (48 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|


## `.ai/astro-editorial-layout-design/references/site-analysis/06-clinician.md`

Blob `25e576f5f64528fcbc94262a07abaa6bb244e496` (47 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L44](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/06-clinician.md#L44) | - 「請填入」類佔位字出現在 hero；正式站上線前必須替換（見 recipes/cta-trust C03）。 | SCOPE_REVIEW |

## `.ai/astro-editorial-layout-design/references/site-analysis/07-companion.md`

Blob `3453f167c7564cc5d858529c16b5ed2ee3518ac0` (46 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L39](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/07-companion.md#L39) | 4. 三欄不等於三卡：只用 1px 線分欄，也能得到可掃讀的並列結構。 | SCOPE_REVIEW |

## `.ai/astro-editorial-layout-design/references/site-analysis/08-somatic.md`

Blob `9c461a39ce5a88c7efb5bc887788e6b64df2012d` (50 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L47](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/08-somatic.md#L47) | - `.so-hero` 下方 `.so-frame-note` `.55rem` 白字 `#ffffff9c` 在亮處不可讀。 | SCOPE_REVIEW |

## `.ai/astro-editorial-layout-design/references/site-analysis/09-coach.md`

Blob `ddefae78301ddedcc84a693094b44bf4de562d50` (52 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L41](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/09-coach.md#L41) | 4. 「硬陰影＋粗邊框」與 03 同源，但色彩關係不同（橘影配藍）→ **手法可重用、配色不可重用**。 | SCOPE_REVIEW |
| [L46](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/09-coach.md#L46) | - `.ma-step p` 在 `<details>` 關閉時不可見，但卡片仍有 `min-height:260px`，造成「空盒子」觀感（02、03 號卡片）。 | SCOPE_REVIEW |

## `.ai/astro-editorial-layout-design/references/site-analysis/10-collective.md`

Blob `971b0846f68f29b1c40ee668073890752842b014` (48 lines). PRESERVE_IN_PLACE.

| Frozen source | Verbatim line | Review |
|---|---|---|
| [L39](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-editorial-layout-design/references/site-analysis/10-collective.md#L39) | 3. 佔位內容必須「看得出是佔位」（`--`、TBD、說明段落），避免被誤當真實資訊。 | SCOPE_REVIEW |

原文全量由固定 Commit/Blob 還原，掃描結果不代表完整規範拆解。Phase 2 IN PROGRESS; Phase 3/4 BLOCKED.
