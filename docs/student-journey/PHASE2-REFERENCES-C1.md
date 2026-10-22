# Phase 2｜動效／UI supporting references C1

凍結 `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`，保存原始 Blob 和精確行號，原文不改，並非完整子條款語義審核。

## `.ai/astro-motion-craft/SKILL.md`

Blob `39ed33b76ccbd67abf2032f9c655165cf6dfbdf9` · 171 lines · 21 candidates.

| Source | Exact original | State |
|---|---|---|
| [L11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L11) | 本專案維護 `library/`，把 Manus v2 原始檔案的實際 API、數值、行為與我們現有 Astro 元件放在一起。**每次要寫動效程式前，必須先讀庫內的對應 recipe，不能只根據效果名稱猜測。** | NEEDS_REVIEW |
| [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L29) | 使用者要求：網站「更精緻」、滾動出場、Stagger、3D Tilt／Spotlight、圖片 Zoom／Pan、磁吸 CTA、連結底線、FAQ 展開動態；或要求減少動畫、提高易讀性、維持手機效能。此 Skill 是設計與工程**規格**；不可宣稱本專案已實作所有 Manus 效果。參照 `references/manus-v2-motion-map.md` 中逐項實作對照。 | NEEDS_REVIEW |
| [L34](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L34) | 2. **定義動作目的**：每個效果必須完成至少一項目的：建立層級、提示可操作性、協助閱讀、降低資訊密度、清楚回饋。無目的不加。 | NEEDS_REVIEW |
| [L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L36) | 4. **沿用四套主題**：paper/morning/studio/botanical 使用現有 `--text`, `--muted`, `--accent`, `--surface`, `--line`, `--radius` 等 CSS 變數。不要直接導入 Manus 的 forest／sage Tailwind palette 覆蓋設計；若必須使用 Tailwind v4，先確定現有 Astro 建置、CSS cascade 與依賴相容。 | NEEDS_REVIEW |
| [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L37) | 5. **先檢查現有效果**：global `[data-reveal]`、`TableOfContents`、`FAQ`、`PostCard` hover、`ArticleViewSwitcher` 已有互動。可以增強，但不能雙重 observer、重複轉場或重設焦點。 | NEEDS_REVIEW |
| [L38](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L38) | 6. **在四套主題與兩類網站驗證**：375/390px、平板、桌機；觸控、滑鼠、鍵盤與 `prefers-reduced-motion:reduce`。無 JavaScript 時文字、FAQ、導覽必須可見可用。 | NEEDS_REVIEW |
| [L53](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L53) | \| 元件／效果 \| 適合 \| 不應使用 \| | NEEDS_REVIEW |
| [L67](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L67) | - 只有 `(hover:hover) and (pointer:fine)` 啟用 3D Tilt、Spotlight 指標追蹤、Pan 與 Magnetic。觸控關閉指標追蹤；鍵盤焦點必須仍有清楚可見的狀態。 | NEEDS_REVIEW |
| [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L70) | - 照片與文字不得因動畫造成版面位移；圖片固定 aspect ratio + alt；no-JS 保留所有內容。 | NEEDS_REVIEW |
| [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L79) | 4. PR 預覽附簡單前後對照與鍵盤／觸控驗收，不主張僅因 build 通過就等於動效品質過關。 | NEEDS_REVIEW |
| [L92](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L92) | - 舊文獻中標示「待移植」的效果已至少有**本 PR 版本的基本 Demo**，但並不表示與 Manus CSS、Tailwind 或所有參數完全一致。確認輸入方式、視覺與動效後才可說「正式完成」。 | NEEDS_REVIEW |
| [L106](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L106) | 若操作系統的動畫設定曾關閉，即使網站程式、圖片、CSS、JS 都正確，也會出現「完全不動」的情況。不能把 Actions Build 成功等同於動畫正常播放。 | NEEDS_REVIEW |
| [L114](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L114) | Twelve structural directions live at `/layouts/`, with their own `.ai/astro-layout-craft/SKILL.md`. Do not use motion to compensate for a weak layout; choose the content reading flow first. A subtle reveal fits only selected sections and never makes distinct website layouts identical. | NEEDS_REVIEW |
| [L119](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L119) | 先選 `astro-layout-craft` 的整頁動線，再參照 `astro-editorial-layout-design` 的 40 款構圖配方，最後才由本 Motion Skill 加入必要的動效。即使元件可用 Tilt/Spotlight/Reveal，也不得藉動效掩蓋內容結構薄弱或字級留白問題。 | NEEDS_REVIEW |
| [L145](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L145) | 使用 `src/data/external-motion-resources.json` 與 `/effects/#external-motion` 作為**參考清單**，包含 AstroAnimate、astro-webtools、Animista、Animate.css、Hover.css、Uiverse、Motion、GSAP、AOS、CSS Loaders。清單不是安裝清單，也不代表已完成元件安全與授權驗收。 | NEEDS_REVIEW |
| [L149](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L149) | - 任何動效都必須支援 `prefers-reduced-motion`；手機沒有 Hover 時功能仍要完整，鍵盤與觸控操作要合理，JS 失敗時內容仍可閱讀。 | NEEDS_REVIEW |
| [L150](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L150) | - 動效服務於閱讀和回饋；靜態文章站不應為了好看加入假的載入動畫或全頁過度動效。 | NEEDS_REVIEW |
| [L153](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L153) | - Animate.css 現行官方標示 Hippocratic License 2.1；Hover.css 對商業及再散布用途有不同授權條件。外部範例只作連結與研究，**不得把其 CSS 原碼直接編入會分發給學員的 Starter**，除非逐項完成適用授權確認。 | NEEDS_REVIEW |
| [L155](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L155) | - AOS 是 scroll-triggered reveal，不等於完整 parallax；我們已有 Reveal／Stagger，先檢查重疊。 | NEEDS_REVIEW |
| [L166](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L166) | 本 Skill 職責：依內容意圖提供有目的、克制的微動效；不得用動畫掩蓋結構問題，須支援 reduced-motion。 | NEEDS_REVIEW |
| [L168](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/SKILL.md#L168) | 交接前保持以下不可倒退的約束：Structure before decoration；Content shapes composition；Layout ≠ Theme；分清 user-provided / observed / inferred / proposed / missing；真正不同方案需有結構差異；1440/1280/768/390 的響應式與鍵盤、reduced-motion 規劃不得憑空宣稱已驗收；不虛構證照、見證、照片、價格、預約或功能。上游已確認的設計目的、拒絕方案理由、結構選擇和未決事項必須保留；若要修改先提出理由並請學員確認。 | NEEDS_REVIEW |

## `.ai/astro-motion-craft/library/README.md`

Blob `cf3a2df89633e8e6b55fa95381a753bb915a3cff` · 40 lines · 2 candidates.

| Source | Exact original | State |
|---|---|---|
| [L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/README.md#L28) | 6. 更新 gallery / Registry（**只有新成立的 runtime 元件才加 Registry**）和 AI Skill；PR Preview 建置＋真實互動驗收，未確認不合併。 | NEEDS_REVIEW |
| [L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/README.md#L36) | - 可重複使用：`src/components/effects/*.astro`；一組效果不等於一個完整頁面。 | NEEDS_REVIEW |

## `.ai/astro-motion-craft/library/effect-catalog.md`

Blob `a27fa515c98ac275f1b3eeb2f5b96d312e04b9cf` · 42 lines · 4 candidates.

| Source | Exact original | State |
|---|---|---|
| [L15](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/effect-catalog.md#L15) | \| N01 SiteHeader glass \| `glass=false` 可關閉透明磨砂 \| **已有**不透底 sticky nav \| 預設透明磨砂**禁止**，維持已確認的 Header 設計 \| | NEEDS_REVIEW |
| [L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/effect-catalog.md#L23) | - **botanical 植感**：可在有授權的攝影內容選配 Zoom/Pan、局部 soft zoom，不能把所有段落漂浮化。 | NEEDS_REVIEW |
| [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/effect-catalog.md#L29) | - 非必要動效必須尊重 `prefers-reduced-motion:reduce`；非精準滑鼠關閉 pointer transforms。 | NEEDS_REVIEW |
| [L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/effect-catalog.md#L31) | - 軟體使用者 Tab 焦點清楚；小觸控目標需至少 44px。 | NEEDS_REVIEW |

## `.ai/astro-motion-craft/library/recipes/content-interactions.md`

Blob `d70b24cf1aa6963907be41550ee65c79930676fe` · 43 lines · 5 candidates.

| Source | Exact original | State |
|---|---|---|
| [L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/content-interactions.md#L16) | 3. 指標 Pan 是輕微位移，不是全畫面 parallax。觸控與 reduced-motion 必須關閉 Pan。 | NEEDS_REVIEW |
| [L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/content-interactions.md#L24) | 1. 保持現有連結顏色和 focus-visible，不可只有 hover 時才看得懂它是連結。 | NEEDS_REVIEW |
| [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/content-interactions.md#L26) | 3. 使用 `background-image`／`background-size` 或 `::after`，不要重新排版文字寬度。 | NEEDS_REVIEW |
| [L33](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/content-interactions.md#L33) | 1. 我們目前已有 FAQ、ArticleAccordion；應擴充既有元件 Props，不能複製一個 FAQAccordion 造成內容與樣式分裂。 | NEEDS_REVIEW |
| [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/content-interactions.md#L35) | 3. 高度轉場僅作 progressive enhancement，reduced-motion 必須立即更新。 | NEEDS_REVIEW |

## `.ai/astro-motion-craft/library/recipes/pointer-interactions.md`

Blob `c6c0ee66f0324f542b691b4baa15f00ef194d8ee` · 53 lines · 2 candidates.

| Source | Exact original | State |
|---|---|---|
| [L44](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/pointer-interactions.md#L44) | - Spotlight 在 `::before` 顯示細微亮度，不能遮住文字、焦點與 link；不用濃重 AI 漸層。 | NEEDS_REVIEW |
| [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/pointer-interactions.md#L45) | - Magnetic 只給一個 Hero 主 CTA；不可讓 pointer move 改變可點擊範圍的實際 layout。 | NEEDS_REVIEW |

## `.ai/astro-motion-craft/library/recipes/reveal-and-stagger.md`

Blob `ca5e9c8982facf311c91f2ec96bd1ecd0b14ffb3` · 43 lines · 2 candidates.

| Source | Exact original | State |
|---|---|---|
| [L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/reveal-and-stagger.md#L28) | 3. 只有在現有 observer 經檢查能處理新 class 或狀態時，才加 CSS variants；未實作前不得在正式 UI 宣稱七種動效均可使用。 | NEEDS_REVIEW |
| [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/library/recipes/reveal-and-stagger.md#L29) | 4. 減少動態時設 `opacity:1;transform:none;filter:none;clip-path:none`，沒有 JS 的預設 HTML 也必須可見。 | NEEDS_REVIEW |

## `.ai/astro-motion-craft/references/manus-v2-motion-map.md`

Blob `f290bea4de07df2065adace8f0f18f0d60c309fb` · 37 lines · 4 candidates.

| Source | Exact original | State |
|---|---|---|
| [L7](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/references/manus-v2-motion-map.md#L7) | \| `effects/Reveal.astro` \| `variant=fade-up/fade/soft-zoom/blur-up/slide-left/slide-right/clip-up`；`delay` 0–1400ms；`duration` 350–1400ms；`once`；`className` \| 把現有 global `data-reveal` 整理為可用 variants，或建立封裝但不得啟動雙 observer；預設 subtle \| global reveal 已有，7 variants 待移植 \| | NEEDS_REVIEW |
| [L11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/references/manus-v2-motion-map.md#L11) | \| `effects/UnderlineLink.astro` \| `variant=grow/center/marker`、`arrow`、`external`、`className` \| 與現有 a:hover / focus-visible 合併；不能完全依賴 hover \| 待移植 \| | NEEDS_REVIEW |
| [L15](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/references/manus-v2-motion-map.md#L15) | \| `common/SiteHeader.astro` \| `glass={false}` 關閉模糊 \| 本專案使用**不透底 sticky header**；預設不得開 glass \| 已有實作符合 \| | NEEDS_REVIEW |
| [L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-motion-craft/references/manus-v2-motion-map.md#L36) | 範例僅是 API 草圖。實作需要搭配 JS、CSS、no-JS 可見性與減少動態檢查，不能直接宣稱執行。 | NEEDS_REVIEW |

## `.ai/astro-ui-craft/references/00-source-map.md`

Blob `63e94940a3d05bfd833d9f887a65cd6499e493af` · 20 lines · 1 candidates.

| Source | Exact original | State |
|---|---|---|
| [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/00-source-map.md#L19) | `gpt-work-AstroTmplateResearch.html.html` is retained outside GitHub in the original research archive because the export embeds very large base64 screenshots. Its conclusions should be re-verified before use. | NEEDS_REVIEW |

## `.ai/astro-ui-craft/references/01-design-principles.md`

Blob `c8f4ea6c929349061e933faea4d7a1851fea517e` · 13 lines · 2 candidates.

| Source | Exact original | State |
|---|---|---|
| [L9](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/01-design-principles.md#L9) | - Prefer fine rules and whitespace before shadows. | NEEDS_REVIEW |
| [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/01-design-principles.md#L12) | - A visitor should understand the page job before noticing decoration. | NEEDS_REVIEW |

## `.ai/astro-ui-craft/references/02-architecture.md`

Blob `59ba415f6fc9e4f5ca3dc3c990963798f4abb9e8` · 16 lines · 0 candidates.

| Source | Exact original | State |
|---|---|---|


## `.ai/astro-ui-craft/references/03-pattern-library.md`

Blob `67384dd98f85d946c19b669955eea61836da1da0` · 27 lines · 2 candidates.

| Source | Exact original | State |
|---|---|---|
| [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/03-pattern-library.md#L12) | Do not turn every section into three icon cards. | NEEDS_REVIEW |
| [L18](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-ui-craft/references/03-pattern-library.md#L18) | - FAQ before booking; | NEEDS_REVIEW |

Phase 2 IN PROGRESS; Phase 3/4 BLOCKED.
