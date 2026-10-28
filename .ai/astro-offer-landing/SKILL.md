---
name: astro-offer-landing
description: Build or review a single-offer landing page for a beginner's Astro site — one offer (course, workshop, consultation package, service plan, download, waitlist), one audience, one primary action. Covers offer intake, page argument structure, conversion copy rules and an honest-proof checklist. Use only when the student explicitly wants a page that sells or collects signups for one offer; never for homepages, blogs or general UI.
---

# Astro Offer Landing｜給學員賣一個 offer 的落地頁


## When to run（觸發收窄，這是本 skill 的第一條規則）
- 只在學員明說要做「賣一個東西／收一筆報名或名單」的一頁時啟用：一門課、一個工作坊、一種諮詢或服務方案、一份下載、一張候補名單。
- 不適用：首頁（多意圖）、部落格與文章頁、作品集、一般元件或 UI 調整。那些任務回各自的 skill（layout-craft、editorial-layout-design、ui-craft 等）。
- 一頁只賣一個 offer。學員想在一頁塞兩個 offer，先依 AGENTS 訪談規則指出取捨，讓學員選一個，另一個另開一頁。

## 優先順序（衝突時照這個讓位）
1. 學員在當前對話的明確指示。
2. 專案自己的 `PROJECT.md`、Site Brief、品牌 tokens 與既有定版（色票、字體、間距、圓角全用站上現成的，本 skill 不帶任何視覺數值）。
3. 本 skill。
長相（版面、構圖、元件、動效）不在本 skill 決定：構圖讀 `astro-layout-craft`／`astro-editorial-layout-design`，元件讀 Blocks Registry 與 `astro-ui-craft`，動效讀 `astro-motion-craft`。本 skill 只負責一件事：這一頁的**銷售論述**怎麼排、怎麼寫、證據夠不夠。

## 硬規則（不可推測、不可編造）
沿用 pack AGENTS 與 `astro-content-readiness`，本 skill 不另立標準：
- 不虛構見證、價格、名額、倒數、成效數字、報名人數、證照與合作 logo。學員還沒有學員／客戶時，就明寫還沒有，或用學員自己的試跑、流程與作品當證據並如實標明是試跑。
- 答不出的事實（價格、日期、退款與取消條款、交付內容）標 `MISSING` 或在頁上明寫「定案中」，不准用「合理假設」補上後繼續當真資料發布。可逆、低風險的排版與示範安排才可走 `AI_PROPOSED` 並列出假設。
- 表單未串接完成前，頁面要明說尚未開放／目前收不到，不可假裝送出成功。收集 Email 時，資料去向（哪個服務）要先確認（見 AGENTS 訪談情境表）。
- 證據要貼在它支撐的那句主張旁邊，不集中堆在頁尾。

## Intake 題庫（照 pack 訪談方式問，不是一批問完）
問法沿用 AGENTS：先判斷要不要問；每輪只問一個最重要的問題、用非技術語言；學員可跳過（標 `SKIPPED`）；題數是體驗預算。下面是題庫，不是問卷，一次挑最關鍵的一題問：
- Purpose：這一頁唯一的主要動作是什麼（報名／購買／留 Email／預約諮詢／下載）？offer 到底給對方什麼？什麼算一次成功轉換？
- Audience：給誰？他現在卡在哪個問題？**他為什麼還沒買／還沒報名（前三個理由）**？他從哪裡來（社群貼文／搜尋／朋友轉介／廣告）？來的時候他已經知道什麼？
- Proof（手邊實際有的）：真實見證或回饋截圖、自己的試跑紀錄、作品與流程截圖、已定案的保證（可取消／可改期／先看預覽等真實條款）。沒有的就記為缺，不補造。
- Constraints：價格與日期是否已定案？表單或收款要接到哪個服務？這一頁要索引還是只給連結進來的人看（見下方 SEO）？

## 論述結構（文類模式，段落可依 offer 大小合併）
這是落地頁這個文類被驗證過的論述順序。學員賣東西時照這個排，不需要發明新順序；變化放在文案、證據與版面，不放在論述骨架。offer 很小（如一份下載）時用精簡型，段落合併，不硬湊。
1. Hero：主標（成果＋給誰）＋副標（一兩句說清是什麼、怎麼進行）＋主要 CTA（動詞＋得到什麼）＋一個真實證據訊號（試跑紀錄一句、真實回饋一句；沒有就省略，不造假）。
2. 問題段：訪客的處境與痛點，用他的話講（素材來自 intake 與學員的真實經驗）。
3. 解法與好處：3–5 個好處，先講對他的好處、再講功能；每條後面接證據或細節。
4. 怎麼進行：3 步講清買了／報名了之後會發生什麼（流程具體就是證據）。
5. 證據段：見證、試跑、作品、流程截圖。有多少放多少，沒有就用第 4 步的流程透明代替，不補造。
6. FAQ：把 intake 的前三個反對理由寫成問答；題數依真實疑問決定，不為湊數編問題。
7. 風險降低（用真實條款，至少一項）：尚未收款、可取消／改期、先看內容或預覽、檔案與成果歸學員所有——只寫真的有、做得到的。
8. 結尾 CTA：與頂部同一個動作；文案可換句話說，動作不可換。

## 版型選單（明選一種並說理由）
- A 標準型：offer 靠 Hero 與流程就能講清（多數服務與課程）。
- B 長文型：需要教育市場、懷疑度高（高價、需要信任的服務）。
- C 精簡型：高意圖或短 offer（下載、候補名單、贈品索取）；只保留 Hero、好處摘要、表單、FAQ 精選。
- D 對照型：訪客在比較替代方案（「自己做 vs 請人做」「A 工具 vs B 工具」）；對照要誠實，寫出對方方案適合誰，不攻擊。

## 文案規則
- 好處先於功能：先寫「這對你意味著什麼」，再寫它是什麼功能。
- 具體，但只對事實具體：寫流程、時間、地點、交付物這些可查的事；不准編造節省時間、成效百分比、學員人數這類數字當具體。
- 主標公式（選項，不是預設）：「{成果} without {痛點}」「給{某種人}的{某種東西}」「在{時間}內{做到某事}」——公式裡的成果與時間必須是真的。
- CTA：動詞＋得到什麼（如「加入下一期通知」「預約一次諮詢」）；不用「了解更多」「送出」當主要 CTA。
- 不用空話充數：英文文案避開 revolutionize、supercharge、cutting edge、effortless、world class 這類填充詞；中文文案同理，避開全方位、一站式、打造、賦能這類沒有內容的詞，改成把產品實際做什麼直接寫出來。
- 系統訊息平靜具體：成功就講完成了什麼，錯誤就講失敗在哪、下一步怎麼做；不用驚嘆號與可愛語氣。
- 訊息對齊來源：訪客從哪篇貼文／哪個廣告來，Hero 的主標與承諾要跟那個來源對得上。

## SEO／索引
- 只給連結進來、或限時的頁：`noindex`（沿用站上既有 robots 機制，預覽與未核准發布一律 noindex）。
- 常青 offer、且搜尋意圖對得上：才索引；給清楚的 title 與 meta description、從首頁或服務頁連過來；FAQ 寫成平鋪問答，合適時加 FAQ schema（沿用站上模板層作法）。

## 互動狀態檢查（借成清單，完工後對照，不在建置時指揮設計）
每個互動元素（按鈕、表單、勾選、頁籤）交付前逐項對：
- hover 有回饋；active 有按下感（如 scale(0.98) 或 translateY(1px)）；focus 有可見 focus ring（無障礙必備）。
- loading 用長得像真版面的骨架屏，不用圓形 spinner；empty 有做好的起始畫面，不留空白；error 就地顯示、寫明原因與下一步，不用 `window.alert()`。
- 死連結不准出貨：指向 `#` 的按鈕要嘛連到真的目的地，要嘛視覺上 disabled 或不顯示。
- 動效效能：只動 transform 與 opacity；尊重 `prefers-reduced-motion`；捲動觸發用 IntersectionObserver，不用未節流的 scroll listener（細節讀 `astro-motion-craft`）。

## 建置順序與交付格式
動手前先交：頁面大綱（段落與順序）、Hero 文案（主標／副標／CTA／證據句）、3–5 個好處、怎麼進行 3 步、FAQ、索引建議、版型選擇與理由。學員確認後逐段建置，不每次重做整頁（小步 diff 可審，沿用站上 PR／Preview 流程）。
上線檢查（與站上模板層分工，模板已有的不重做，只對本頁檢查）：
- [ ] 一個 offer、一個受眾、一個主要動作；第一屏沒有競爭 CTA
- [ ] 每個數字、見證、價格都有出處，否則標待補或不在頁上
- [ ] 證據貼在主張旁；結尾 CTA 與頂部同一個動作
- [ ] 六態齊全、無死連結（見上節）
- [ ] 表單：Email 格式與必填驗證；未串接就明說未串接
- [ ] title／meta description／og；有意義圖片有 alt；語意 HTML；本頁有回去的路
- [ ] 有收個資時，footer 有隱私／條款連結（連結到真實頁面，沒有就先不放假連結並列為待補）
- [ ] 手機版實際看過，不只桌機（沿用 qa:responsive 四寬檢查）

## 與其他 Skills 分工
`.ai/astro-content-readiness/SKILL.md`：先確認 offer 所需的真實內容齊不齊（價格、條款、證據），缺的列 MISSING，本 skill 不繞過它。
`.ai/astro-design-consultation/SKILL.md`：設計方向與參考站討論。`.ai/astro-layout-craft/SKILL.md`／`.ai/astro-editorial-layout-design/SKILL.md`：構圖。`.ai/astro-ui-craft/SKILL.md` 與 Blocks：元件與視覺（用站上 tokens）。`.ai/astro-motion-craft/SKILL.md`：動效。`.ai/astro-site-assembly/SKILL.md`／`.ai/astro-page-management/SKILL.md`：把這一頁組進站與導覽。`.ai/astro-pr-preview/SKILL.md`：預覽與發布核准。`.ai/astro-launch-health-check/SKILL.md`：上線後檢查。

## 給學員的提示詞
「我想做一頁賣我的＿＿（課程／諮詢／服務／下載）。請讀我的 PROJECT.md 和 astro-offer-landing，先用一題一題的方式問我還缺的資訊，缺的事實就標待補、不要幫我編。先給我頁面大綱、Hero 文案、好處、流程、FAQ 和版型建議，我看過再逐段做。設計用我站上現成的色票和字體，不要另外發明一套。完成後給我預覽，不要自動發布。」
