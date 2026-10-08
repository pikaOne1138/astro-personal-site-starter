# 內容分區配方 ×8

程式：`recipes/code/sections/Sxx-*.astro`（已通過四寬度 audit）。標記同 heroes.md。

| ID | 名稱 | 來源 | 解決的內容問題 |
|---|---|---|---|
| S01 | manifesto-split | 衍生 10 | 說明「立場」：標籤｜大引言｜補述 |
| S02 | fit-pair | 衍生 06 | 說明「適合／不適合」並給替代資源 |
| S03 | letter-fold | 衍生 07 | 用「一封信」說明服務，長文可讀 |
| S04 | dark-band | 衍生 08/09 | 深色色帶承載「方法／步驟」，明度波形 |
| S05 | article-lead | 衍生 02 | 首頁直接放一篇代表作的開頭 |
| S06 | index-shelf | 衍生 04 | 目錄＋書架：固定側欄＋抽屜精選 |
| S07 | accordion-panel | 衍生 06 | 流程折疊（原生 details）在面板中 |
| S08 | evidence-table | 衍生 06＋**[NEW]** 狀態旗標 | 可核實資訊表；缺漏要看得見 |

---

## S01 manifesto-split
**來源**：[OBS] `.cg-belief{background:#e9ebf5;padding:clamp(1.5rem,4vw,3rem);grid-template-columns:.65fr 1.25fr .8fr;gap:3vw}`、`blockquote{font-size:clamp(1.8rem,4vw,3.8rem);line-height:1.25}`。
**適用**：站長有清楚「立場」而不是「方法」時；團體、倡議、評論。
```
┌ 淡底面板 ─────────────────────────────────────────┐
│ LABEL        │ 大引言（粗）+ voice(襯線斜) │ 補述 .9rem │
│ 小句說明     │                              │            │
└─────────────────────────────────────────────────┘
```
**關鍵 CSS**：`grid-template-columns:.65fr 1.25fr .8fr`；≤900 `.5fr 1.5fr` 並把補述放第 2 欄；≤580 單欄。
**常見失敗**：引言 >40 字會變成牆；面板與頁面底色對比不足，看不出是「一塊」。

## S02 fit-pair
**來源**：[OBS] `.cl-scope-columns{grid-template-columns:1fr 1fr;border:1px solid}`、`article+article{border-left:1px solid;background:#eaf0ed}`；≤560 轉 `border-top`。
**適用**：任何需要「先講範圍」的站。**第二格不是警告，是替代資源。**
```
┌ 標題 ┐ ┌ 可能適合      │ 可能需要其他資源 ┐
│      │ │ • …           │ • … + 一句資源    │
└──────┘ └───────────────┴──────────────────┘
```
**常見失敗**：只寫適合、不寫不適合；第二格用紅色警告造成焦慮；手機疊成單欄卻保留 `border-left`。

## S03 letter-fold
**來源**：[OBS] `.co-letter::before{left:50%;border-left:1px dashed #d2b7aa}`、`.co-letter-body{max-width:610px;font-size:1.03rem;line-height:2.1}`。
**規則**：正文欄 ≤ 38rem、行高 2.1；虛線摺痕只在 ≥800px 顯示；最後的「正式上線請替換」佔位文字放在 `.fine`（mono、分隔線下），不夾在信文中。
**適用**：陪伴、諮商、長期關係型服務。
**常見失敗**：整頁都用信紙隱喻，變成裝飾；信文超過 5 段，失去「低壓」。

## S04 dark-band
**來源**：[OBS] `.so-practice{background:#3e4b37;padding:clamp(2rem,6vw,5rem) clamp(1rem,8vw,8rem);grid-template-columns:.8fr 1.2fr;gap:8vw}`、`li{grid-template-columns:100px 1fr 25px;border-top:1px solid #ffffff3c}`。
**修正**：[DEFECT] 08 的 kicker `#825339` 在 `#3e4b37` 上約 1.4:1 → 本配方用 `#e9bf9f`（對深底 ≥ 7:1）。
**關鍵**：`padding-inline:max(gutter, calc((100% - wide)/2 + gutter))`（背景滿版、內容限寬）。
**常見失敗**：把深色放在 `max-width` 容器（F06）；強調色沿用淺底的值。

## S05 article-lead
**來源**：[OBS] `.es-article{grid-template-columns:.95fr 1.05fr;gap:clamp(2rem,8vw,8rem)}`、`.es-prose{max-width:580px;font-size:1.06rem;line-height:2.05}`、`.es-dropcap:first-letter{float:left;font-size:4.2rem}`。
**修正**：h2 `max-inline-size:9em` + `text-wrap:balance`，取代 `<br/>`（原版 1440 斷成「我們為什麼總／想要／馬上得到答／案？」）。
**適用**：首頁直接是一篇代表作；作家、評論者。

## S06 index-shelf
**來源**：[OBS] `.cu-catalog{grid-template-columns:260px 1fr;gap:5vw}`、`.cu-featured` `<details>`＋自繪 ＋／−、`.cu-cover{width:150px;height:196px;box-shadow:8px 8px 0}` 以 CSS 繪書封；≤600 `ol{display:flex;flex-wrap:wrap}`。
**適用**：選書、工具箱、資源清單。**手機**：索引變 chip 流，不是整塊塞頁首。
**常見失敗**：索引欄用 `fr` 而不是固定 px，寬度隨視窗飄；`summary` 內放連結（巢狀互動）。

## S07 accordion-panel
**來源**：[OBS] `.cl-process li>details>summary{grid-template-columns:50px 1fr 24px}`、`details[open]>summary>b{transform:rotate(45deg)}`、`p{margin:.6rem 0 0 66px}`。
**規則**：`<details>` 內容（`p`）縮排要等於標題欄寬（本配方 `margin-left:4rem` = 3rem 欄 + 1rem gap）；第一項預設 `open`。
**audit 提醒**：收合的 details 內容在 Chromium 仍有 bounding rect，audit 腳本已排除（否則誤報文字疊壓）。

## S08 evidence-table **[NEW 狀態旗標]**
**來源**：[OBS] `.cl-credentials dl div{grid-template-columns:130px 1fr;border-top:1px solid}`；[NEW] 每列加「已填／待填 · 來源」旗標。
**原理**：缺漏資訊在畫面上可見，避免佔位字被誤當真實。
**常見失敗**：寫「豐富經驗」「專業認證」等形容詞；把待填值直接顯示成「請填入…」混在正文字級。