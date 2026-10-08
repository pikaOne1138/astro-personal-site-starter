# CTA 與信任資訊安排 ×8（知識型 + 助人者）

程式：`recipes/code/cta-trust/Cxx-*.astro`。原則：**信任來自可核對的資訊，不是形容詞；CTA 要說明「按下去會發生什麼」。**

| ID | 名稱 | 用於 | 來源 |
|---|---|---|---|
| C01 | low-pressure-invite | 助人者主 CTA | 衍生 07/06 |
| C02 | boundary-strip | 助人者：界線與緊急資源 | 衍生 06 |
| C03 | proof-slots | 通用：證據槽（作品／方法／範圍／紀錄） | **[NEW]** 結構衍生 07 `.co-how-row` |
| C04 | process-then-contact | 助人者：先流程後聯絡 | 衍生 06 |
| C05 | closing-band | 通用：頁尾收尾 | 衍生 06/09 |
| C06 | team-initials | 團體：成員呈現 | 衍生 10，改掉等寬三卡 |
| C07 | subscribe-cadence | 知識型：訂閱 | **[NEW]** |
| C08 | provenance-note | 知識型：出處／更正 | **[NEW]** |

## 助人者網站的信任順序 [NEW 建議]
1. Hero 內：服務對象、方式、資格**欄位**（H06 meta 條）— 缺就標「待填」。
2. 範圍：適合／不適合＋緊急資源（S02 + C02）。
3. 流程：三步＋「你只需要…」（C04 / S07）。
4. 可核實資訊（S08）；**絕不放未驗證的療效、年資、人數、見證**。
5. CTA（C01 / C05）：一個主動作＋「不必承諾」＋次要連結。

## 知識型網站的信任順序 [NEW 建議]
1. 作品本身（S05 文章開頭、L01 近期紀錄）。
2. 做法與出處（C08）：作者、更新日、做法、更正。
3. 範圍與立場（C03 的「我會評／不會評」）。
4. 訂閱（C07）：先寫頻率與內容長相，再給欄位。

---

## C01 low-pressure-invite
**[OBS]** 07：`.co-postmark{border:1px solid var(--co-rose);border-radius:50%}`、`.co-invite{border-radius:40px;border:1px solid}` — 整頁沒有實心主按鈕。06：`.cl-hero-actions>span{font-size:.66rem}`「不必先承諾預約。」
**規則**：按鈕文字寫結果（「先問一個一般問題」），不寫「立即預約／開始體驗」；微文案與按鈕同列且 ≥ 14px；禁用「限時／名額有限」。
**失敗**：按鈕 + 倒數計時；「免費諮詢」但沒說免費多久、談什麼。
```
 A QUIET WAY TO BEGIN
 (先問一個一般問題)  先看合作流程 →
 不需要先說明原因，也不需要先決定要不要繼續。
```

## C02 boundary-strip
**[OBS]** 06：`.cl-contact>p:last-child{font-size:.66rem}`「不要在一般表單收集病歷」（字太小）；`.cl-not-fit` 內給緊急資源提示。
**規則**：界線資訊 ≥ 14px，放在 CTA 附近而不是 footer；資源欄由站長填真實當地資訊，未填顯示「待填」旗標。
**失敗**：用紅色警告塊製造焦慮；寫死不屬於當地的電話。

## C03 proof-slots **[NEW]**
**結構**：2px 粗線 + 4 欄以 1px 線分隔（不是卡片）；每格「類型｜內容｜（待填：需要什麼）」。
**規則**：沒有內容的槽**保留並標待填**，不要刪掉（讓站長看到缺什麼）；手機 4→2→1 欄，分隔線同步改向。
**失敗**：填「專業」「用心」等形容詞；編造「已陪伴 500 人」。

## C04 process-then-contact
**[OBS]** 06 `.cl-process`、07 `.co-how-row`（三欄用 1px 線分、無卡片）。
**[NEW]** 每一站加「你只需要：…」降低行動成本；手機改垂直連接線（`border-left:2px` + 圓點在左）。
**失敗**：流程 5 步以上（記不住）；時程與費用寫死而站長未確認 → 預設值標示「示意」。

## C05 closing-band
**[OBS]** 06 `.cl-contact{background:var(--cl-ink);grid-template-columns:1fr auto}`；09 `.ma-bottom h2{font-size:clamp(2.7rem,7vw,6rem)}`（超大字終點）。
**規則**：一句主張＋一個主動作＋一條次要連結；色帶用 padding-inline 限寬（R02）；免責 ≥ 13px。
**失敗**：收尾區出現 3 個以上同權重按鈕。

## C06 team-initials
**[OBS]** 10 `.cg-avatar` 首字頭像、`.cg-person--rose/--blue/--yellow`、`.cg-demo-note`。
**修正**：「主角大列＋其餘列表」取代等寬三卡（F01）；照片只在取得當事人同意後使用。
**失敗**：用 AI 生成的人臉冒充團隊；三卡等高等寬。

## C07 subscribe-cadence **[NEW]**
**規則**：標題＝承諾（「每月一封，不催促閱讀」）；說明＝頻率＋內容長相＋一封樣本連結；`<label>` 可見、輸入框 ≥ 48px、隱私與取消各一句；不放未驗證的訂閱人數。本元件不送出資料，串接前需補同意說明與反垃圾機制。
**失敗**：只有 placeholder 沒有 label；按鈕寫「Submit」；一進站就彈窗。

## C08 provenance-note **[NEW]**
**結構**：`<dl>`：作者／最後更新／做法／更正；每列 1px 線。
**原理**：讓讀者能核對「誰寫的、何時改的、怎麼做的、錯了怎麼說」。
**失敗**：只寫「專業編輯團隊」；最後更新日永遠是建站日（用內容資料的 `updatedDate`）。