# Recipe P01–P02｜Tilt／Spotlight／Magnetic

## 來源（Manus v2 ZIP 原始檔）
- `src/components/effects/MotionCard.astro`
- `src/components/common/Button.astro`
- `src/styles/components.css` `.motion-card`、`.magnetic-button`、`.button`

## Manus 原始碼確認

MotionCard 接受 `reveal`、`delay`、`className`、`tilt`、`spotlight`、`tiltMax`，`tiltMax` 經 1–8 的範圍限制，預設 4。會先檢查 `(hover: hover) and (pointer: fine)` 與 `prefers-reduced-motion:reduce`；pointermove 不對 touch 生效、rAF 合併 CSS 變數寫入（`--tilt-x`、`--tilt-y`、`--spot-x`、`--spot-y`）；離開卡片恢復 0 度。

### 可以給 AI 參考的最小邏輯（針對本專案重寫示例，不是直接貼入）

```ts
const enabled = matchMedia('(hover: hover) and (pointer: fine)').matches
  && !matchMedia('(prefers-reduced-motion: reduce)').matches;
if (enabled) {
  let raf = 0;
  card.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.setProperty('--tilt-x', `${(x * 4).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(-y * 4).toFixed(2)}deg`);
    });
  }, { passive: true });
  card.addEventListener('pointerleave', () => {
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  });
}
```
實際實作時要正確保存最新 PointerEvent、取消 pending frame、處理 pointercancel，並確認 CSS `transform` 沒有跟既有 `PostCard:hover` transform 相互覆寫。

Magnetic Button 的源碼在 pointermove 計算滑鼠相對中心，`--magnetic-x` 使用 `x * 8` 像素、`--magnetic-y` 使用 `y * 6` 像素，pointerleave 歸零。**不是滾動吸附或真的拖曳**。

## 本站建議

- 預設 tilt/spotlight/magnetic 均 false。
- 若有 `PostCard` 自帶 hover translateY，不要同時增加 3D transform；先把 CSS transform 合併為單一層。
- Spotlight 在 `::before` 顯示細微亮度，不能遮住文字、焦點與 link；不用濃重 AI 漸層。
- Magnetic 只給一個 Hero 主 CTA；不可讓 pointer move 改變可點擊範圍的實際 layout。
- 桌機高 DPI pointer 才啟用；觸控與 reduced-motion 停用，但鍵盤 focus 樣式不變。

## 驗收

- 快速來回移動、移出卡片、觸控／pointercancel 都會回復正位。
- 動畫不影響 Ctrl/⌘K 搜尋 dialog、選單 dialog、鍵盤 Tab 與可讀性。
- 同一個 grid 中只有少數示範卡使用 3D，不是全部。
