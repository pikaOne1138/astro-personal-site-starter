# DECISIONS — 閱讀年鑑

原始碼：`examples/src/pages/reading-almanac.astro`；工作流程文件：`brief.md`、`direction.md`、`wireframe.md`。
預覽：`cd examples && npm run build && npm run preview -- --port 4400` → `/reading-almanac/`。

## 截圖（`screenshots/`）

| 檔案 | 內容 |
|---|---|
| `reading-almanac-1440.png`／`-1280.png`／`-768.png`／`-390.png` | 四寬度整頁 |
| `reading-almanac-first-screen-1440.png`／`-390.png` | 首屏（視窗尺寸 1440×900、390×844） |
| `report.json` | audit 完整量測（每寬度） |

## 構圖決策（每項都有數值與理由）

| # | 決策 | 實作（class／數值） | 為什麼 |
|---|---|---|---|
| 1 | Hero 無圖，以巨大年份當主視覺 | `.num` `font-size:clamp(7rem,30vw,28rem);line-height:.82;color:transparent;-webkit-text-stroke:2px`；1440 下 ≈ 432px；`aria-hidden` | 訪客問的是「紀錄是否完整」，年份＋計數是證據；描邊中空避免大黑塊壓過標題 |
| 2 | 計數條四格，不用卡片 | `.stats{gap:1px;background:var(--ed-line)}`＋每格 `background:paper` | 任何欄數（4／2）都自動成線；避開 `div+div` 邊框在 scoped CSS 的特異性陷阱（見修正紀錄 #1） |
| 3 | 月曆為 12 格線格 | `.grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:1px}`；≤1100 為 3 欄、≤760 為 2 欄、≤520 為 1 欄；`.in{min-height:15.5rem}` | 一年＝12 個月，天然格網；欄數降低時線格自動維持 |
| 4 | 篩選用純 CSS | `fieldset.filter` 內 `input[type=radio]`；`.al-cal:has(#k-fic:checked) .cell:not([data-kind~="fic"]) .in{opacity:.18}`；`@supports selector(:has(*))` 之外隱藏篩選 | 篩選是主任務；零 JS；不支援 `:has()` 時退化為全部顯示 |
| 5 | 篩選 chip ≥ 44px、含計數 | `.chip{min-height:44px;padding:0 1rem}`；`b` 顯示 12／6／6／2 | 觸控與「篩了會剩幾本」的可預期性 |
| 6 | 「年度之書」用深色帶＋CSS 書脊 | R02 `tone="dark"`（token 重新映射）；`.spine{width:7.5rem;min-height:22rem;background:#1d6b66;border-left:6px solid #0b3a3a;box-shadow:10px 10px 0 #ffffff1f}`、`writing-mode:vertical-rl` | 全頁唯一「重」的內容，用明度反轉標示；用 CSS 繪書脊，免素材授權 |
| 7 | 三欄：書脊｜判斷＋評分標準｜出處說明 | `.al-book{grid-template-columns:auto minmax(0,1fr) minmax(0,20rem)}`；≤1100 出處移到第 2 欄下方；≤760 單欄、書脊改橫向 | 判斷與「怎麼來的」同屏，信任資訊不被藏到頁尾 |
| 8 | 索引用書籍目錄（點線 leader） | L06 兩個實例（春夏／秋冬）；`.lead{flex:1 1 1rem;border-bottom:2px dotted}`；父層 `--ed-gutter:0px` 抵消內層 gutter | 「書名···月份」是最快的對照方式 |
| 9 | 單一強調色深青＋赭色數字 | `--ed-accent:#0f5a5a`（≈7:1）、`--ed-gold:#855a14`（≈5.3:1，僅用於 2.8rem 月份數字） | 與十款色票不重複（無苔綠、朱紅、藍、梅、青螢光） |
| 10 | 誠實 | hero 下方 `.al-demo` 一行常駐說明「書名…皆為虛構」；footer 再標一次；放棄的書計入計數 | 示意資料不得被誤認為真實紀錄 |

## 與十款的距離
最接近 #01 田野筆記（紀錄型＋書卷襯線），旋鈕 ①②④⑤⑥⑦ 皆不同（共 6 項，見 `direction.md`）。
**沒有複製的東西**：沒有拱形圖、邊注欄、ledger 列、白框相片、印章、硬陰影、貼紙；hero 為十款原始碼不存在的「無圖數字」構圖。

## 驗收結果（`scripts/audit.mjs`，最終版）

| 寬度 | hScroll | spill | h1 | minFont | <12px | 疊壓 | 對比失敗 | 觸控 <44 |
|---|---|---|---|---|---|---|---|---|
| 1440 | 0 | 0 | 66.2px／2 行 | 12.0 | 0 | 0 | 0 | 0 |
| 1280 | 0 | 0 | 58.9px／2 行 | 12.0 | 0 | 0 | 0 | 0 |
| 768 | 0 | 0 | 35.3px／2 行 | 12.0 | 0 | 0 | 0 | 0 |
| 390 | 0 | 0 | 35.2px／2 行 | 12.0 | 0 | 0 | 0 | 0 |

> h1 在此站是「標題」，視覺主體是 `.num`（432px）。reduced-motion：無限動畫 0（本頁只有 `.in{transition:opacity .25s}`）。
> 手機整頁高 5508px ÷ 桌機 3512px ≈ 1.57（≤ 1.6，見 `visual-qa.md` §7）。
> 字級種類（audit，1440）：12、14、16、20、24、45、54.5、64、66、72、432 ＝ 11 種（≤ 12，十款為 12–19 種）。

## 修正紀錄（實際發生的，不是事後美化）

| # | 發現方式 | 問題 | 修正 |
|---|---|---|---|
| 1 | **目視 390 截圖**（audit 全綠） | 計數條 2×2 時第 3 格仍保留 `border-left` 與 `padding-left`：`.stats div + div` 在 Astro scoped 後特異性 (0,4,2)，高於媒體查詢內的 `:nth-child(3)` (0,4,1)，覆寫失效 | 改成 `gap:1px`＋底色線格＋`:nth-child(2n+1)` 重設 padding；並同步修 `C03-proof-slots`；寫入 `03-ai-failure-modes.md` F14 |
| 2 | 目視 1440 | 「年度之書」右側三分之一空白，出處說明被擠在下方 | 改三欄（書脊｜文字｜出處），≤1100 回兩欄 |
| 3 | 目視 1440 | 訂閱區左緣 160px，與其他區塊的 118px 不同軸（多出第 3 條對齊軸） | `#subscribe{--ed-mid:var(--ed-wide)}`，與其他區塊同軸 |
| 4 | audit WARN（觸控） | 導覽「月曆」「訂閱」寬 28px | `min-width:44px;padding-inline:.4rem` |
| 6 | **自我檢查本 Skill 自己的規則** | 初版兩個驗證站的字級種類為 17／16，超過本 Skill 當時寫的「≤ 9」；而且該閾值並沒有十款資料支持（十款 12–19） | 把頁面與元件內的 `font-size` 正規化到 12／14／16／20／24 階（`.8rem→.75rem`、`.85–.9rem→.875rem`、`.95–1.1rem→1rem`…）；**同時把規則改為「量測值 ≤ 12（audit 以 0.5px 去重、含 clamp 計算值）；設計時以 ≤ 9 個『角色』命名」**，寫進 `scoring.md`／`visual-qa.md`／`02-design-tokens.md`。結果：年鑑 11 種、信任路徑 9 種 |
| 5 | lab 頁目視 | 深色帶內容起點 60px，其餘區塊 118px：`calc((100% - wide)/2)` 漏掉 `+ gutter` | 公式改為 `calc((100% - wide)/2 + gutter)`，R02／S04／H05／C05 同步 |

## 未驗證／限制（誠實列出）
- 只在 Chromium 1200（Windows）渲染；未在 Safari／Firefox／真機測試；`:has()` 篩選在不支援瀏覽器會退化為不可篩選（資料仍完整顯示）。
- 字體為系統字體堆疊（Georgia、Noto Serif TC、ui-monospace）；不同作業系統的 CJK 字形與斷行會略有差異，需在目標環境再看一次截圖。
- 未做螢幕閱讀器實測；僅保證語意結構（`fieldset/legend`、`label`、`details`、`aria-hidden`）。
- 所有書目、數字為虛構示意資料。