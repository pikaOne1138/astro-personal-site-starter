# PR #20｜12 款版型原始檔比對與視覺驗收

> 本表記錄**真正的實作狀態**。Build 成功、路由能開、背景顏色相符，均不能代替同尺寸瀏覽器全頁視覺比對。

原始資料：使用者上傳 `astro-ten-site-directions.zip`，`src/pages/directions/knowledge/` 與 `care/`，以及 `src/layouts/DirectionLayout.astro`。十款 Manus 的源碼在獨立頁面具有各自 DOM、CSS 與有限 JS；不可僅以我們原本通用 `lay-*` 元件換色重寫。

| 版型 | 原始 ZIP 的閱讀容器與底色 | 本 PR 最新修正 | 是否已完整對照原稿 |
|---|---|---|---|
| 田野筆記 field-notes | `fn-site #f1eee4`，整頁底色、內層最大 1360px；側邊筆記與 ledger | 底色已延伸整個 viewport、寬度上限比對；現為重新設計的 Astro DOM | **否**，還需直接移植來源節點與 CSS |
| 長文書房 essayist | `es-site #f7f3e9`，內層 1280/1080/940px 不同閱讀節奏 | 修正滿版紙張色與容器上限 | **否**，仍需原始文字排版與章節結構 |
| 學習實驗室 learning-lab | `ll-site #f4f5ef`，1280–1320px 內層；`ll-track` → `ll-unit` Grid → `ll-unit-no` | 已按原始 DOM 與原始 CSS 建立獨立檔案 `learning-lab-source.css`，修正原本節點壓字及遺漏 CSS | **原始碼結構與樣式已還原**，仍待同尺寸視覺截圖驗收 |
| 收藏者目錄 curator | `cu-site #efebe6`，1300px，拼貼展牆與索引 | 修正外圍背景及寬度 | **否**，還需逐區移植 |
| 聲音通信 radio-letter | `ra-site #111a24`，1320px，聲音節目專屬結構 | 修正深色背景至整個視窗 | **否**，還需音訊與時間軸源碼 |
| 清晰臨床 clinician | `cl-site #f4f7f5`，1260px、兩欄服務適配、可摺疊流程 | 修正整頁底色、上限 | **否**，需完整專業資訊與原生 details |
| 溫柔陪伴 companion | `co-site #fbf5ed`，Hero 1240px、信件 1030px、how 1100px；底色填滿 viewport | **使用原始 ZIP 的 `co-*` HTML 結構與樣式**，`companion-source.css`；恢復非對稱 Hero、真正書信內容、信紙中縫、3 階段流程；去掉錯誤的米色窄島與黑條 | **原始碼結構與樣式已還原**，仍待同尺寸視覺截圖驗收 |
| 身體與節律 somatic | `so-site #e8e6dc`，真全幅感官影像、內層約 1240px | 滿版背景與例外寬度 | **否**，需重新驗證全幅場景 |
| 實作型教練 coach | `ma-site #f1eadb`，1320px、編輯式行動版 | 滿版底色、容器上限 | **否**，需重建原本清單與細節 |
| 共好工作室 collective | `cg-site #f8f5eb`，1320px、多成員及活動模組 | 滿版底色、容器上限 | **否**，需成員內容與活動版面 |
| 閱讀年鑑 reading-atlas | **Claude 研究延伸，ZIP 沒有原稿** | 繼續作為獨立新設計 | **需獨立視覺驗收** |
| 信任路徑 trust-path | **Claude 研究延伸，ZIP 沒有原稿** | 繼續作為獨立新設計 | **需獨立視覺驗收** |

## 此次踩到的結構錯誤

1. 只在 `.lay-site` 設定底色，又對 `.lay-site` 設 `max-width`，導致超出內容容器的 `body` 仍是不同顏色，產生突兀的長條背景。正確做法：全視窗底色由 `body` 控制、欄位寬度由內容區塊控制。
2. 以通用 CSS 重造來源的特有元件（如 Learning Lab 的 Grid 時間軸），造成步驟圓點壓字。來源已有 `ll-track`、`ll-unit`、`ll-unit-no` 應直接移植。
3. 改成獨立 CSS 後沒有提交檔案，導致 CSS 404。CI 應強制檢查頁面連結的本地資源存在。
4. 一次告訴使用者「12 款完成」卻沒有逐頁桌面、手機、原稿比對。未經同尺寸驗收不得宣稱全部視覺完成。

## 合併門檻

- 十二頁 1440/1280px 桌面、390px 手機全頁截圖，與 Manus 原稿逐區比對；Claude 兩款另外檢查設計一致性。
- 原本 10 款必須保留彼此不同的原生 DOM/CSS 資料流，不能用一套 Hero/cards 替代。
- 所有背景能自然延伸到視窗兩側，同時文字有合理最大寬度；沒有任何橫向捲動。
- 僅說明真的接上的功能；學員不會把示範音訊／假預約當成正式服務。
- 同時通過 Build、實際瀏覽器操作與原始檔案比對後，才請使用者考慮合併。

**本 PR 尚未達成全部門檻，不能合併。**
