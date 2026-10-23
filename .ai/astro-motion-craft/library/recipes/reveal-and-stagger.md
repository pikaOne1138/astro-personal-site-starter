# Recipe R01–R02｜Reveal + Stagger

## 來源（Manus v2 ZIP 原始檔）

- `src/components/effects/Reveal.astro`
- `src/components/effects/StaggerGroup.astro`
- `src/scripts/reveal.ts`
- `src/styles/components.css` 中 `.reveal--*`、`.reveal-pending`、`.reveal-in`
- Catalog 動態與微互動 §Reveal/Stagger

### Manus 行為（忠於原始碼）

Reveal 的 `variant` 限於 `fade-up`、`fade`、`soft-zoom`、`blur-up`、`slide-left`、`slide-right`、`clip-up`，預設 `fade-up`。delay 在 0–1400ms，duration 在 350–1400ms，預設 760ms。`once=false` 代表離開後可重新出場。原始碼以 `data-reveal`、`data-reveal-variant`、`data-reveal-once` 和 `--reveal-delay`／`--reveal-duration` 傳達設定。

StaggerGroup 預設 step 90ms、start 0，step clamp 至 20–260，start clamp 至 0–1200。它**只尋找直接子層** `:scope > [data-reveal]`，使用 `--reveal-delay` 並把最終延遲限制在 1600ms。

`initializeReveals` 會檢查 `prefers-reduced-motion` 與 `IntersectionObserver`；observer threshold 0.12，rootMargin `0px 0px -8% 0px`，一次性效果會 unobserve，重播效果在離開視窗時重新 pending。

## 我們的實作與既有全域 Reveal 的關係

1. `DemoLayout` 原本就有全域 `[data-reveal]` 與 observer（簡單淡入）。**不要再初始化 Manus 的 `scripts/reveal.ts`**，雙 observer 會搶同一個屬性。
2. `src/components/effects/Reveal.astro` 採用另一組屬性：`data-motion-reveal`、`data-motion-once`、`--motion-delay`、`--motion-duration`，加上自己的 observer。兩套屬性不同，所以不會搶同一個元素；**不要在同一個元素同時標 `data-reveal` 和 `data-motion-reveal`**。
3. 七種 variant 的樣式在 `public/effects.css`（`.motion-reveal--*`），不是 Manus 的 `components.css`。
4. 減少動態、沒有 `IntersectionObserver` 或沒有 JS 時，內容必須立即可見：減少動態或 observer 缺席時直接加上可見狀態，不依賴 observer。
5. `StaggerGroup` 只對**直接子層、且帶 `data-motion-reveal`**（也就是 `Reveal`）的元素設定 `--motion-delay`，單項延遲上限 1400ms。若在 `Reveal` 外多包一層 div，或子層不是 `Reveal`，延遲就不會生效，需調整結構。

## 推薦預設值（我們的設計決策，不是 Manus 原值）

- Subtle：fade / fade-up，位移 6–14px，duration 450–750ms，一次性。
- Expressive：少量 clip-up / soft-zoom，最大 3–6 元素 stagger，總延遲 ≤ 600ms。
- 不要：文章每個段落出場、FAQ 每題都重播、收費與證照文字延遲呈現。

## 驗收

- 沒有 JS、reduced-motion、Observer 不支援時重要內容仍看得到。
- 觸發後沒有兩個不同 observer 同時更新 class；捲回時 once 行為正確。
- 375px 手機不裁切標題，繁體中文行高與換行保持完整。
