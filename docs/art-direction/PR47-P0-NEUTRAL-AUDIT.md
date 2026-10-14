# PR47 P0｜25 方向中性內容與結構差異稽核（source-only）

檢查基準：2026-10-14，原有 12 款 + PR47 原有 2 款 + 新增 11 款，共 25 個方向。此表根據 layout-craft 定義、PR47 研究矩陣與 Astro 原始碼的主要 DOM / Grid 規則；不是瀏覽器截圖或人工盲測。中性資料在 `neutral-comparison-fixture.json`，同客群共用配色、字體、標題、三篇文章或一項服務，並有空資料情境。**Fixture 已建立，但尚未全數實際注入 25 款 renderer；不得把下表當視覺 QA PASS。**

## A｜知識與內容：13 款

| Slug | 首屏角色 | 首要內容型態 | 結構識別線索 | 最容易混淆 | 靜態風險 |
|---|---|---|---|---|---|
| field-notes | 編號觀察＋邊註 | 時間戳記觀察 ledger | 雙側欄／邊注 | sidebar-journal | 高：新舊皆以觀察為題 |
| essayist | 單篇長文 | 長篇 focal essay | 極大字主文 | editorial-frontpage | 中 |
| learning-lab | 學習承諾 | 流程／模組 | 步驟與學習進度 | coach（跨客群不列直接競品） | 低 |
| curator | 展品拼貼 | 非對稱物件目錄 | 圖像展牆與物件元資料 | subject-atlas | 高：都易長成分類牆 |
| radio-letter | 節目主角 | 音訊時間線 | 播放介面／逐字稿 | compact-dispatch | 中：音訊缺失需保留區別 |
| reading-atlas | 年份、月份 | 年曆／月份索引 | 年月座標而非連續文章 | compact-dispatch | 低 |
| subject-atlas | 主題導航 | 主題不等權目錄 | 黏性分類 rail | curator、sidebar-journal | 高 |
| sidebar-journal | 文章串流＋作者側欄 | 文章順序 | 主文流＋右側欄 | field-notes | **高：目前仍有顯著刊頭，須減弱以符合研究 brief 的 no-big-hero** |
| editorial-frontpage | 7:5 頭條／側文 | 有主次的多篇文章 | 一篇頭條＋次要文章 | essayist | 中 |
| card-journal | 均等文章物件 | 同權文章卡 | 規律等權格網 | curator | 中 |
| visual-stories | 寬幅圖說 | 交錯圖文故事 | 影像與文字交替左右 | curator | 高：目前無照片只剩佔位，須低內容視覺驗證 |
| compact-dispatch | 最小型引言 | 日期短列 | 高密度行式文章列表 | reading-atlas | 低 |
| split-reader | 主文 5/12、索引 7/12 | 主文＋右方索引 | 固定雙欄角色 | essayist、subject-atlas | 中 |

## B｜助人者與個人服務：12 款

| Slug | 首屏角色 | 首要內容型態 | 結構識別線索 | 最容易混淆 | 靜態風險 |
|---|---|---|---|---|---|
| clinician | 明確服務聲明 | 資格與範圍資料冊 | 可驗證 disclosure ledger | trust-path、practice-compass | **高：新增 dossier 仍只在首頁，內頁須保持資料冊** |
| companion | 親筆長信 | 連續信件文字 | 情感與關係主導 | portrait-profile | 中 |
| somatic | 感官場域 | 沉浸攝影＋緩慢流程 | 全幅影像與節律 | studio-chapters | 高：缺照片時差異下降 |
| coach | 行動式大字 | 方法／交付順序 | 任務與行動節拍 | service-catalogue | 中 |
| collective | 協作群體 | 成員／活動索引 | 多人關係網 | studio-chapters | 低：不得假造團隊 |
| trust-path | 五站訪客旅程 | 階段與信任路徑 | 連續站點 | practice-compass、question-led-practice | 高 |
| practice-compass | 三種訪客入口 | 決策／適配資料 | 三條路徑／對照兩欄 | trust-path、question-led-practice | 高：新版資料契約要在匯出測試確認 |
| portrait-profile | 肖像／身分 | 個人背景 | 4:7 肖像＋資訊 | companion | 高：無真人肖像 fallback |
| service-catalogue | 服務規格 | 一項或多項服務明細 | 規格表、條目 | coach | 低 |
| studio-chapters | 工作場景 | 章節化說明 | 固定 TOC＋章節正文 | somatic | 中 |
| editorial-practice | 觀點主文 | 服務方法文章 | 7:4 觀點＋側記 | coach、clinician | 中 |
| question-led-practice | 提問／答覆 | Q/A 長頁 | 3:8 問答雙欄 | practice-compass、trust-path | 高：不能淪為首頁 FAQ |

## 需整改的結構碰撞（以優先順序排列）
1. `sidebar-journal` vs `field-notes`：縮短新款首頁大型 Hero，確保作者資料在右側；若文章少於 3 篇，仍不可退化成觀察邊注。
2. `clinician` vs `trust-path` / `practice-compass`：新的專業資料冊須延伸至服務詳細／About，不只在首頁加表格。
3. `subject-atlas` vs `curator`：即使 1 篇文章也要保留主題目錄邏輯與可達的分類目標；不能出現無效文章連結。
4. `portrait-profile` vs `companion` 及 `visual-stories` vs `curator`：測試沒有圖片的 fallback，避免兩者變成相似文字牆。
5. `question-led-practice` vs `trust-path`：驗證服務詳情及 About 是否保持「問題→回答」的閱讀語法。

## P0 驗收區分
- P0-1 Neutral fixture：**資料檔完成；跨 25 款 renderer 注入／截圖尚未完成**。
- P0-2 25 款 source-level 相似風險清單：**完成首輪；同內容 screenshot / 人工對照尚未完成**。
- P0-3 Subject Atlas / Practice Compass：**已將 Compass visitorIntents 由 Site Brief 驗證並傳到獨立 Adapter，再由獨立 Home 使用；Atlas topic 條件與文章對應提供空值保護**。仍須匯出驗證、低內容量測試、主題文章 Collection 驗證及品牌字型一致性，故不標全部 PASS。
- 用相同的兩份 fixture 測 1440、1280、768、390；導覽、focus、CJK、overflow、空資料及閱讀次序需全部獨立查驗。
- Independent Starter/Adapter screenshot acceptance 仍延期；這與「原型」四尺寸視覺比較是兩個不同工作，不應混為一談。

## 資料契約修復實作索引
- `scripts/export-art-direction-starter.mjs`：新增 `artDirection.visitorIntents[]` 驗證（最多 6 筆，title/detail 必須為字串、target 僅限 fit/services/faq），並完整保留到 `site.config.json`。
- `src/data/art-direction-adapters/practice-compass/Home.astro`：消除硬寫死的三個訪客決策，改以正規化後的 visitorIntents 作入口；未設定時只有帶有明確通用文案的安全 fallback，無表單、預約或外站任意轉址。
- `docs/art-direction/fixtures/practice-compass.json`：加入不同於預設原型的三筆 QA 意圖，以便測試站點是否真的收到 Site Brief 資料。
- `src/data/art-direction-adapters/subject-atlas/Home.astro`：對 topics 與 post.data.topics 進行防護，不要求每篇文章都一定有 topics 陣列。缺主題的使用者可讀到待設定聲明。
- `src/pages/layouts/subject-atlas/index.astro`：先前已移除寫死的主題總數與示範文章筆數。
- 沒有修改 PR46 Gallery、主要 Starter Exporter 或主 Adapter。這一批僅修改 PR47 自有的獨立 Adapter 和 exporter。
