# Phase 2｜Crosswalk 05：Layout／Blocks／Motion 分層與視覺 QA

> Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`；本輪僅來源語義裁決，不宣稱全量原子化或最終 Canonical 計數。

| 稽核群 | #67 工作來源 | Frozen 原文 | 關係與保留條件 |
|---|---|---|---|
| LAYOUT-STRUCTURE | `B9-ASM-L49-1` | [Assembly L49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L49)、[Layout Craft L9](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-layout-craft/SKILL.md#L9) | PARTIAL_OVERLAP：Hero 比例、層級、section 次序、影像處理、手機重排是可分別驗收的結構面；不等同換 Theme |
| LAYOUT-REFERENCE | `B9-ASM-L48-1`、`B9-ASM-L49-1` | [Assembly L48–49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L48-L49) | DISTINCT：先讀獨立 Home Adapter／原 Prototype／CSS 是研究程序；保存設計忠實度是獨立成果義務 |
| LAYOUT-STATUS | `B9-ASM-L45-1` | [Assembly L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L45) | DISTINCT：首頁 Prototype 與可維護多頁站成熟度不同；不得宣稱 12 款均完成，歷史數字只代表 Frozen 時點 |
| BLOCK-REGISTRY | `B9-ASM-L51-1` | [Assembly L51](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L51)、[Layout Craft L47](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-layout-craft/SKILL.md#L47) | PARTIAL：以 Registry 選需要的功能 Block；Blocks 不等同 Layout，也不等同 Motion；導航／文章／真實聯絡需保留功能驗收 |
| THEME-TOKENS | `B9-ASM-L52-1` | [Assembly L52](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L52) | DISTINCT：品牌五種 tokens 對映、對比與按鈕可用性不能被結構忠實度代替 |
| MOTION-PURPOSE | 對應 Layout/Motion Frozen 來源；待建獨立候選 ID | [Motion Craft L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L35)、[L119](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L119) | DISTINCT：subtle 預設、不可用動畫掩蓋薄弱 Layout；效果需有用途，不等於元件或整頁結構 |
| MOTION-FALLBACK | 對應 Motion Frozen 來源；待建獨立候選 ID | [Motion Craft L38](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L38)、[L66](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L66) | DISTINCT：reduced-motion、無 JS、觸控、鍵盤退化條件不能因視覺截圖 PASS 被刪除 |
| VISUAL-VIEWPORT | `B9-ASM-L54-1` | [Assembly L54](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L54)、[Layout Craft L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-layout-craft/SKILL.md#L79) | PARTIAL_OVERLAP：Build 與 1440／1280／768／390 畫面比較為不同 Gate；參考圖與輸出比較、長中文、層級與 mobile restack 須有截圖證據 |
| NAV-ACCESS | `B9-ASM-L57-1` | [Assembly L57](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L57) | DISTINCT：parentId 二層、details 子選單、桌機鍵盤及手機觸控需實測；設計截圖不等於互動驗收 |
| STUDENT-SITE-QA | `B9-ASM-L61-1`、`B9-ASM-L64-1` | [Assembly L61](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L61)、[L64](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L64) | DISTINCT：獨立輸出站 canonical/base/連結和完整交接證據，不能以教師 Repo Build 或單一首頁預覽代替 |

## 第二階段待辦（實際未完成）

- 本輪查核 10 組語義群、16 個 Assembly／Layout／Motion 不重複來源行（Assembly 45,48,49,51,52,54,57,61,64；Layout 9,47,79；Motion 35,38,66,119：實際共 **16 行**，其中特別列出的 10 群可能重複引用）。
- Layout/Motion Skill 的獨立工作 ID 尚未完整建立；以上明確標為 `PENDING_ATOMIZATION`，不虛構工作 ID。
- 下一輪需做所有引用 ID 的 existence check、來源→候選和候選→來源雙向自動稽核，找出無效 ID 與未覆蓋的複合義務，並明確分開「文件條款」「驗收測試」「產品現況」。
- Stage 2 IN PROGRESS；Stage 3/4 BLOCKED。不改原始 Skills、不 Merge、不部署、不影響 #61／#58。
