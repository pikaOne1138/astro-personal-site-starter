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

## 與我們既有全域 Reveal 融合

1. 先開 `public/v02.css`、`src/layouts/DemoLayout.astro` 檢查既有的 `data-reveal`、observer 和 CSS。**原本已有 Reveal**，不要同時初始化 Manus 的 `scripts/reveal.ts`：雙 Observer 可能搶同一個屬性。
2. 把 `variant` 加到既有語法，而不是全站加第二個 observer：
   ```astro
   <section data-reveal data-reveal-variant="fade-up" style="--reveal-delay:100ms">
     <h2>真實區段標題</h2>
   </section>
   ```
3. 只有在現有 observer 經檢查能處理新 class 或狀態時，才加 CSS variants；未實作前不得在正式 UI 宣稱七種動效均可使用。
4. 減少動態時設 `opacity:1;transform:none;filter:none;clip-path:none`，沒有 JS 的預設 HTML 也必須可見。
5. Stagger 的子層結構要統一：若套了新的包裝 div，原始 `:scope > [data-reveal]` 就抓不到，須適配 wrapper 或調整 query。

## 推薦預設值（我們的設計決策，不是 Manus 原值）

- Subtle：fade / fade-up，位移 6–14px，duration 450–750ms，一次性。
- Expressive：少量 clip-up / soft-zoom，最大 3–6 元素 stagger，總延遲 ≤ 600ms。
- 不要：文章每個段落出場、FAQ 每題都重播、收費與證照文字延遲呈現。

## 驗收

- 沒有 JS、reduced-motion、Observer 不支援時重要內容仍看得到。
- 觸發後沒有兩個不同 observer 同時更新 class；捲回時 once 行為正確。
- 375px 手機不裁切標題，繁體中文行高與換行保持完整。
