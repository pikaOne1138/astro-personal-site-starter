# 列表／目錄配方 ×6

程式：`recipes/code/lists/Lxx-*.astro`。**用來取代「三欄卡片」（F01）**：先問「這個列表是什麼隱喻」。

| ID | 名稱 | 來源 | 隱喻 | 最適內容 |
|---|---|---|---|---|
| L01 | ledger-rows | 衍生 01 | 帳簿 | 有日期的文章／紀錄 |
| L02 | node-track | 衍生 03 | 路徑 | 有順序、可勾選的步驟 |
| L03 | archive-table | 衍生 05 | 檔案表 | 期數／節目／版本 |
| L04 | stair-details | 衍生 09 | 階梯 | 3 個概念並列、可展開 |
| L05 | date-disc-rows | 衍生 10 | 日曆 | 活動、課程、截止日 |
| L06 | leader-toc | **[NEW]** | 書籍目錄 | 章節、月份、單篇索引 |

---

## L01 ledger-rows
**來源**：[OBS] `.fn-ledger{border-top:2px solid var(--fn-ink);grid-template-columns:.7fr 1.3fr}`、`.fn-ledger li{grid-template-columns:58px 1fr auto;border-bottom:1px solid #cfcec2;padding:.8rem 0}`、`.fn-ledger-type{border:1px solid #aeb2a2}`、≤580 `.fn-ledger-type{display:none}`。
```
════════════════════════════════════════  (2px 墨色)
FIELD LEDGER │ 06.18  一座城市如何…   [觀察]
最近，我在…   │        街道觀察 · 8 分鐘
看全部 ↗      │ ─────────────────────────
              │ 06.11  讀書筆記裡…     [閱讀]
```
**手機**：隱藏次要欄位（類型標籤），不縮小。
**失敗**：每列做成卡片；日期欄寬不固定導致標題不對齊（用固定 `3.8rem`）。

## L02 node-track
**來源**：[OBS] `.ll-track::before{left:27px;width:2px}` + `.ll-unit{grid-template-columns:58px 1fr 78px}` + `.ll-unit-no{width:54px;height:54px;z-index:1}`。
**原理**：**節點占獨立 grid 欄；軸線 left = 欄寬 / 2；節點 z-index:1**（圓點因此不會壓文字）。
**改良**：以 `--node` 變數同步（`left:calc(var(--node)/2 - 1px)`），手機只改 `--node`；整列是 `<label>`（點擊面積 ≥ 56px）；進度用原生 `<progress>` ＋ `aria-live="polite"`。
```
 03 STEPS │  ●01  START HERE            ☐ 完成
 走一遍…   │  │    看見問題
 ▓▓░ 1/3  │  ●02  FIELD NOTE            ☑ 完成 (底色 #e9f0df)
          │  │    整理線索
```
**失敗**：軸線用 `border-left` 加在 `li` 上，節點用 `position:absolute;left:-Npx`，文字 `padding-left` 不足（F04）；勾選只靠顏色表示完成。

## L03 archive-table
**來源**：[OBS] `.ra-archive li{grid-template-columns:130px 1fr 70px;border-top:1px solid #34404c}`、標題 `font:1rem Georgia`、資料欄 mono。
**規則**：資料欄用 mono、內容欄用襯線（兩種聲音）；mono ≥ 12px；手機 `5.2rem 1fr 3.2rem` 並保留時長。
**失敗**：手機隱藏時長，期數一多就無法比較。

## L04 stair-details
**來源**：[OBS] `.ma-steps{grid-template-columns:repeat(3,1fr);align-items:start}`、`.ma-step--two{margin-top:2rem}`、`--three{margin-top:4rem}`、`details`＋`::after{content:"＋"}`。
**修正**：未展開時 `min-height` 為 0（原版保留 260px）；浮水印數字進入 summary 的 grid 欄，不與標題相交。
**限制**：**只適合恰好 3 項**；4 項以上階梯會變成斜坡。手機 `margin` 全歸零。
**失敗**：這是最接近「三欄卡片」的配方（F01），一頁最多用一次。

## L05 date-disc-rows
**來源**：[OBS] `.cg-calendar li{grid-template-columns:72px 1fr auto}`、`.cg-date{width:58px;height:58px;border-radius:50%}`、日期欄顯示 `--`／`TBD`。
**規則**：日期未確認就顯示 TBD 並在備註寫「待確認」，不編造日期與名額。
**失敗**：日期圓字 8.5px（原版 `.53rem`）→ 本配方 12px、圓 4rem。

## L06 leader-toc **[NEW]**
**原理**：書籍目錄「標題 ········ 頁碼」；點線 `flex:1` 填滿中間，數字 `flex:none` 右對齊，`font-variant-numeric:tabular-nums`。可兩層（章／節）。
```
第一部　學會慢
 為什麼我開始寫讀書筆記 ·················· 03
 一本書讀兩次的理由 ····················· 11
```
**關鍵 CSS**：`.lead{flex:1 1 1rem;min-width:1rem;border-bottom:2px dotted var(--ed-accent-deco);transform:translateY(-.3em)}`
**失敗**：標題很長時點線被擠到 0 → `min-width:1rem`，標題允許換行（`.t` 不設 nowrap）。