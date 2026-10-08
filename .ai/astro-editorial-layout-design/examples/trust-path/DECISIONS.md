# DECISIONS — 信任路徑

原始碼：`examples/src/pages/trust-path.astro`；工作流程文件：`brief.md`、`direction.md`、`wireframe.md`。
預覽：`cd examples && npm run build && npm run preview -- --port 4400` → `/trust-path/`。

## 截圖（`screenshots/`）

| 檔案 | 內容 |
|---|---|
| `trust-path-1440.png`／`-1280.png`／`-768.png`／`-390.png` | 四寬度整頁 |
| `trust-path-first-screen-1440.png`／`-390.png` | 首屏 |
| `report.json` | audit 完整量測 |

## 構圖決策

| # | 決策 | 實作（class／數值） | 為什麼 |
|---|---|---|---|
| 1 | 橫向路線帶當 hero 主視覺 | `.ribbon svg{height:120px}`、viewBox `0 0 1000 120`、`preserveAspectRatio="none"`；5 站 x = 100/300/500/700/900，y = 80/40/80/40/80；`.ribbon ol{grid-template-columns:repeat(5,1fr)}`、`li{padding-top:calc(var(--y) - 22px)}` | 5 欄等寬 ⇒ 站點中心 ＝ 10/30/50/70/90%，與 SVG 同一組座標；`preserveAspectRatio="none"` 只拉伸 x，y 為固定 px，所以點不會偏離曲線 |
| 2 | 曲線由 frontmatter 產生 | `C${x_{i-1}+100} ${y_{i-1}} ${x_i-100} ${y_i} ${x_i} ${y_i}`，`vector-effect:non-scaling-stroke` | 站數改變時曲線自動更新，不手繪路徑 |
| 3 | 手機路線帶轉垂直 | ≤760：`svg{display:none}`、`ol::before{left:21px;border-left:2px dotted}`、`ol{gap:.9rem}` | 橫向 5 站在 390px 只有 ≈ 70px/站，標籤會斷成直排（首版即如此，見修正 #1） |
| 4 | 五站脊線 | `.tp-wrap::before{left:calc(var(--ed-gutter) + 21px);border-left:2px dotted}`；`.node{width:44px;height:44px;z-index:1}`；`.st{grid-template-columns:4.5rem minmax(0,46rem) minmax(0,15rem)}` | 節點占獨立欄、線 left＝節點中心（L02 原則）；內容欄 46rem（≈ 736px）維持可讀行長 |
| 5 | 右側「這一站回答」邊欄 | `.q{border-left:2px solid var(--ed-accent-deco)}`，襯線斜體 1.25rem；≤1100 移到標題下 | 把「訪客此刻的疑問」寫出來；同時填補內容欄右側的空白（首版右側 40% 為空） |
| 6 | 「範圍外」用斜線底紋 | `.out{background:repeating-linear-gradient(135deg,#0000 0 9px,#8a3d1c14 9px 10px),var(--ed-panel)}` | 用結構（底紋）表達「不在範圍」，不用警告紅；並置同權重 |
| 7 | 三步方法用 `<details>` | `summary{min-height:72px;grid-template-columns:3rem 1fr 1.5rem}`、字母 A/B/C 2.4rem 襯線；每步「你只需要：…」 | 降低行動成本；細節可選讀；鍵盤原生可用 |
| 8 | 資訊表帶「已填／待填」旗標 | `.info .flag{font:.75rem mono}`，待填用品牌強調色 | 缺漏資訊永遠看得見；全站沒有編造的費用、資格、見證 |
| 9 | 第一次見面用比例時間尺 | `.ruler{display:flex}` 各段 `flex:10/20/15/5`；下方 4 欄說明 `gap:1px` 線格 | 時間分配用「長度」表達；≤640 隱藏時間尺，改由每段「N 分」徽章承擔 |
| 10 | 深-淺-深 | hero `#261b13`；內容 `#f6f0e6`；收尾 C05 | 首尾框住「路」 |
| 11 | CTA 低壓 | 單一實心主動作「先問一個一般問題」＋「不必先承諾預約。」；無倒數、無「限時」 | 助人者語氣 |

## 與十款的距離
最接近 #06 清晰臨床（先範圍後邀請、折疊）：旋鈕 ①②③④⑤⑥⑧ 共 7 項不同；#07、#08 各 6 項不同（`direction.md`）。
**沒有複製的東西**：沒有規格書 meta 條、信紙虛線摺痕、拱形圖、郵戳按鈕、全幅影像遮罩、三欄等寬卡片。無任何人像或空間照片。

## 驗收結果（`scripts/audit.mjs`，最終版）

| 寬度 | hScroll | spill | h1 | minFont | <12px | 疊壓 | 對比失敗 | 觸控 <44 |
|---|---|---|---|---|---|---|---|---|
| 1440 | 0 | 0 | 129.6px／2 行 | 12.0 | 0 | 0 | 0 | 0 |
| 1280 | 0 | 0 | 115.2px／2 行 | 12.0 | 0 | 0 | 0 | 0 |
| 768 | 0 | 0 | 69.1px／2 行 | 12.0 | 0 | 0 | 0 | 0 |
| 390 | 0 | 0 | 48.0px／2 行 | 12.0 | 0 | 0 | 0 | 0 |

字級種類（audit，1440）：12、14、16、20、24、38.5、61、72、129.5 ＝ 9 種；手機整頁高 5044 ÷ 桌機 4182 ≈ 1.21。
作為對照：十款原始碼 h1 為 54.6–70.2px（390）、每頁 19–37 處 <12px、觸控 <44px 者 7–13 個。

## 修正紀錄

| # | 發現方式 | 問題 | 修正 |
|---|---|---|---|
| 1 | **目視 390 截圖**（audit 全綠，hScroll=0、疊壓=0） | header 的品牌被擠成直排「路／徑」，五個導覽項各自被壓成 1–2 字寬的直排文字 | ≤760：`.tp-head{flex-wrap:wrap}`、`nav{order:3;width:100%;justify-content:space-between}`、`a{white-space:nowrap;padding-inline:.25rem;font-size:.8125rem}` — **這正是「Build 成功＋工具全綠仍視覺失敗」（F09）的實例** |
| 2 | 目視 1440 | 五站內容欄只用了 46rem，右側 40% 全空，整頁左重 | 加入 `.q` 邊欄（每站一句訪客疑問） |
| 3 | 目視 1440 | C02 界線條在 46rem 內，資源欄被擠成「當地緊急電／話」 | C02 改 `repeat(auto-fit,minmax(min(100%,17rem),1fr))`、li 改上下排列（元件不能只靠視窗媒體查詢，見 F15） |
| 4 | 目視 1440 | R05 副聲換行後行首多出縮排（`.ph + .ph{margin-left:.25em}` 隨詞組換行保留） | 改 `.ph{margin-right:.25em}` |
| 6 | 自我檢查 | 初版字級種類 16（超過本 Skill 當時的 ≤ 9 規則；該閾值已依實測改為 ≤ 12） | 同年鑑 #6：字級正規化到 12／14／16／20／24 階，結果 9 種 |
| 5 | 目視 390 | 垂直路線帶的 5 個圓點緊貼，連線看不到 | `ol{gap:.9rem}` |

## 未驗證／限制
- 僅 Chromium（Windows）渲染；未測 Safari／Firefox／真機；未測螢幕閱讀器。
- 費用、時間、資格、轉介資源皆為待填；第一次見面的 50 分鐘分配為示意。
- 無任何點陣圖：主視覺是 SVG＋CSS，因此「圖片比例／alt」項目對本頁不適用（SVG 為 `aria-hidden`，資訊都在 HTML）。