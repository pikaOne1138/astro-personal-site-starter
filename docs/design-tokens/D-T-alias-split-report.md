# Issue #22 報告：舊名別名拆成獨立檔（`legacy-aliases.css`）

對應工單：ai-workbench Issue #22（殼階段 1 後續，排階段 2 之前）。基準：`main` @ `d13c5ea`。

## 1. 做了什麼（系統修法，沒有覆寫、沒有永久白名單）

- `src/styles/tokens.css` 只留 L1 語意 Token；舊名別名（`--brand`、`--accent`、`--ink`、`--bg`、`--line`、`--heading`、`--text`、`--surface`、`--muted`、`--radius`、`--ed-*`）原封不動搬到 `src/styles/legacy-aliases.css`。名稱沒有改、沒有刪、值沒有變。
- 12 款 prototype 的匯出站多出 `public/legacy-aliases.css`，`SiteLayout.astro` 依序連結 `tokens.css` → `legacy-aliases.css` → `theme.css` → `component-contract.css` → `site.css`。
- 13 款殼版型只連結 `tokens.css`；匯出時 `art-direction-adapters.mjs` 把別名檔移除。殼的 `--brand`／`--ink`／`--bg`／`--accent`／`--line` 因此不再和 Token 同名，tokens.css 在殼上只新增 L1 名稱。
- `audit-shell-vars.mjs`：`KNOWN_B`、`TEMPORARY_B`、`temporaryUsed` 全部刪除；B 類（宿主與 Token 同名）現在任何一筆都失敗，沒有白名單。
- 新增檢查（`shell-token-check.mjs`）：`checkPrototypeSource`（別名檔存在、連結順序、tokens.css 不再定義舊名）與 `checkShellSource` 的新條件（殼不連結、不出貨別名檔，tokens.css 無舊名）；`verify-starter-export` 在 prototype 與殼的迴圈都會呼叫。
- `verify-student-pack`、`test-starter-route-contracts`（N13）、`TOKEN-SPEC` 第 5／8／10 節、學員 `STUDENT-AGENTS.md` 同步。

## 2. 驗收（Issue #22 的四條）

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 1. 殼版型自訂屬性層級 0 差異 | PASS | 13 款 × 3 色票（A／C／D）× 全路由 × 1440／390，與「殼階段 1 之前」（`ec29ebf`）逐元素比對，算出樣式＋偽元素＋hover／focus＋13 個舊名自訂屬性＋原本 9 個殼變數：39 組 0 差異。對照組：階段 1 版本 vs 階段 1 之前 934 差異；自比 0；A vs D 1200 差異 |
| 1'. 容器外多出的定義 | PASS | 殼在 `.pattern-slot` 之外有定義的元素數：階段 1 每個名稱 20,811 個元素（13 個舊名全部外洩，不只 `--text`／`--muted`）→ 現在 0；階段 1 之前也是 0 |
| 2. 不再需要暫時白名單 | PASS | B 類零容忍；`test-shell-vars` 的對照組：把別名放回 Token 時同一份殼 CSS 的 B 為 `--brand,--ink,--muted,--text` 且斷言失敗；刪除所有 `TEMPORARY_B` 引用 |
| 3. 渲染層級 | PASS | 12 款 prototype × 3 色票：主線 `d13c5ea` vs 本分支 36 組 0 差異（連自訂屬性）；`FULL_STARTER_BUILD=1 verify-starter-export` exit 0；13 款殼版型各以色票 A、C 完整 build 後跑 `qa:responsive`：26 個站全數通過（40/40 或 55/55，0 警告）；學員包建置與驗證通過；本機測試全過；釋出 G-11 寫死色 1414 → 1414（不變差） |
| 4. 無覆寫、無永久白名單 | PASS | 沒有殼宿主重設宣告；`KNOWN_B`／`TEMPORARY_B` 已刪除 |

## 3. 升級既有匯出站（共用檔，走差異預覽＋核准）

拆檔前匯出的 prototype 站把別名寫在自己的 `public/tokens.css`，且 `SiteLayout.astro` 沒連結別名檔。這些站**維持原狀就能正常運作**，不需要動。

實測兩種升級方式（`reading-atlas`，舊站 vs 升級後逐元素比對）：

| 升級內容 | 結果 |
| --- | --- |
| 只換新版 `tokens.css`（別名被移出） | **846 差異**——舊名全部失效。這是必須避免的錯誤升級 |
| 三件一起：換新版 `tokens.css`＋新增 `public/legacy-aliases.css`＋`SiteLayout.astro` 在 tokens 之後加一條連結 | 0 差異 |

所以差異預覽必須把三件事綁在同一批核准；這已寫進 `TOKEN-SPEC` 第 8 節。殼版型的既有站不需要別名檔。目前倉庫沒有自動升級腳本，這條路徑是文件加檢查（新匯出站的結構檢查），不是自動化。

## 4. 備註

- Issue #22 原文寫的外洩範圍是 `--text`／`--muted`；實測外洩的是 **13 個舊名全部**（`--text`、`--muted`、`--surface`、`--heading`、`--radius`、全部 `--ed-*`），每個名稱在每款殼多出 20,811 個元素的定義。原因相同，修法相同，已全部清掉。
- 起初我以為殼的 `--brand`／`--ink`／`--bg`／`--accent`／`--line` 的同名白名單也要保留；拆檔後它們不再碰撞，白名單整張刪除。
- 沒有新增全域名稱，沒有改任何版型。
