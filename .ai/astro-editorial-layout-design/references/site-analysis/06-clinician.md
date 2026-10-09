# 06 清晰臨床 `cl-`（助人／專業說明書）

來源：`src/pages/layouts/clinician/index.astro`

## [OBS] 原始碼事實

**容器**：`.cl-site{padding:0 clamp(1rem,4vw,4rem);background:var(--cl-paper)}`（`#f4f7f5`）；**所有內層統一 `max-width:1260px`**（hero/scope/process/credentials/contact/footer），[MEAS] 1440 左緣 90 寬 1260 —— 十款中最「單一寬度」的一款。
配色：墨 `#18313a`、藍灰 `#496b78`、線 `#cdd8d5`；面板 `#e7eeeb`／`#eaf0ed`。**全頁沒有暖色**。

**Grid**
- Hero：`grid-template-columns:1.05fr .95fr;gap:6vw;padding:5rem 0 5.5rem`。
- Scope：`.8fr 1.2fr`，右欄再分 `.cl-scope-columns{grid-template-columns:1fr 1fr;border:1px solid var(--cl-line)}`，兩格以 `article+article{border-left:1px solid;background:#eaf0ed}` 區分（**「適合」vs「需要其他資源」用底色＋左線並置，兩者同權重**）。
- Process：面板 `.cl-process{background:#e7eeeb;padding:clamp(1.4rem,4vw,3rem);grid-template-columns:.7fr 1.3fr;gap:7vw}`。
- Credentials：`1fr 1fr;gap:6vw`，右側 `dl div{grid-template-columns:130px 1fr;border-top:1px solid var(--cl-line)}`（資料表）。
- Contact：`background:var(--cl-ink);padding:2.5rem;grid-template-columns:1fr auto`。

**Hero 構圖（規格書式）**：左：overline → h1 → 說明 → 主按鈕＋小字「不必先承諾預約。」→ **三欄 meta 條**
`.cl-meta{grid-template-columns:repeat(3,1fr);border-top:1px solid;padding-top:1rem}`（服務對象／會談方式／資格資訊）；右：4/3 圖，`border-radius:3px`，**無任何裝飾**。
這是十款中唯一在 hero 內就放信任資訊（而且是「待填欄位」而非編造數字）的頁面。

**標題**：`.cl-hero h1{font-size:clamp(3.5rem,7vw,6.8rem);line-height:1.02;letter-spacing:-.07em}`；`h2` 皆 `clamp(2.5rem,5vw,4.7rem);line-height:1.02`。字體 Arial＋Noto Sans TC。

**互動（原生折疊）**：`<ol><li><details open><summary>`；summary 為 `grid-template-columns:50px 1fr 24px`；`＋` 在 `[open]` 時 `transform:rotate(45deg)`（變成 ×），`transition:transform .2s`；`p{margin:.6rem 0 0 66px}` 對齊標題欄。移除原生三角的三行寫法與 04 相同。

**CTA**：頁尾深色帶 `.cl-contact`，h2「先問一個一般問題也可以。」＋文字連結（`border-bottom:1px solid #a6c7c3`），下方 `.65rem` 免責：不收集病歷。

**手機**：≤850 單欄、`.cl-room{width:80%;margin-left:auto}`；≤560：`.cl-scope-columns{grid-template-columns:1fr}` 且 `article+article{border-left:0;border-top:1px solid}`（**分隔線方向跟著堆疊方向轉 90°**）、`.cl-contact{padding:1.2rem;grid-template-columns:1fr}`、meta 條 `gap:.45rem`。

## [MEAS]
- h1 100.8px×3；**390：54.6px×3，「讓你知道／接下來會發生什／麼。」孤字「麼。」**（見截圖）。
- 全頁字級 14 種；<12px 文字 30 處；390 <44px 目標 12 個（header nav 5 連結 `font-size:.59rem`）。
- audit 於 390 報 `p × h3`、`p × b` 疊壓——目視為 bounding box 誤報（折疊列在 grid 內），**啟發式偵測需截圖複核**。

## [INF] 可重用原則
1. **專業服務頁＝先範圍後邀請**：順序 Hero（含 meta）→ 適合/不適合 → 流程 → 可核實背景 → 低壓 CTA。
2. 不適合的人也要寫（`.cl-not-fit`）並給出替代資源，是信任資訊而不是免責。
3. 欄式分隔線在堆疊時改變方向（`border-left` → `border-top`）。
4. 單一內容寬度＋面板底色（`#e7eeeb`）做區塊切分，克制到幾乎沒有裝飾。
5. 全 `ui-monospace` 小標＋大 sans 標題的反差，是階層來源，不是字重。

## [DEFECT]
- `.cl-meta span{font-size:.56–.62rem}`、`.cl-header nav{.59rem}`：關鍵資訊字太小。
- 孤字「麼。」。
- 「請填入」類佔位字出現在 hero；正式站上線前必須替換（見 recipes/cta-trust C03）。

## [NEW]
- meta 條在 ≤560px 改成 `grid-template-columns:1fr`＋每格 `display:flex;justify-content:space-between`（label 左、值右），避免三欄擠成 .56rem。