> **已封存（2026-10-23）。** PR 當時的交接、審查與 QA 紀錄。仍有效的規則與尚未簽核的人工驗收清單已併入 `docs/layout/layout-assembly.md`。結構辨識與 QA 證據分級的機器可讀版本是 `docs/art-direction/pr47-layout-handoff-registry.json`。僅供歷史查閱，不再維護。

# PR #47｜P0 中性版型視覺與獨立 Adapter 驗證（2026-10-14）

## 可重現證據
- 基準 Head：`b6e12c0db36097f53218373442d400be5f1da98d`
- GitHub Actions [Art Direction Neutral Visual Evidence](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38569724982)：成功；Artifact `art-direction-neutral-25-layouts`（ID `11896689687`）。
- `scripts/qa-art-direction-neutral-visual.mjs` 在 local Astro preview 使用 Chromium，涵蓋 25 個首頁、1440／1280／768／390 四個尺寸，共 **100/100 截圖成功；0 個 HTTP/DOM 截圖失敗；0 個 document 水平 overflow**；manifest 另含 6 組（涵蓋 5 大碰撞群）×4 尺寸的 bounding-rect 幾何差異資料。
- `docs/art-direction/neutral-comparison-fixture.json` 提供兩客群共同樣本。截圖在瀏覽器完成 render 後，統一主要標題、文章／服務名稱及首批摘要、顏色／字體，關閉圖片顯示、動畫；此方式為 **post-render structural stress test**，不是把 fixture 實際灌入 25 個 Astro 資料模型的完整 E2E，更不是正式學員內容接線。
- 注意：第一版中性化只覆蓋 `main`，漏掉 Trust Path 在其外部的 Hero；已修正為涵蓋 `body`，以**最後成功的上述 workflow** 為證據，舊截圖不作正式比較結論。

## 實際截圖的五組定點人工檢視

| 組別 | 同配色、字型、主要標題摘要下仍可辨識的結構 | 結論 |
|---|---|---|
| Sidebar Journal / Field Notes | 前者短引言後緊接日期文章流與右作者欄；後者巨型觀察刊頭、垂直標尺及邊註節奏 | 結構差異可辨；已縮減 Sidebar 首屏 |
| Clinician / Trust Path / Practice Compass | Clinician 專業揭露與可核實資料欄；Trust Path 五個連續路徑站；Practice Compass 右側說明與三條決策入口 | 差異可辨；Clinician 已延伸 3 個資料冊式內頁。臨床與羅盤兩款仍有通用適配區，應在後續 UI Review 留意 |
| Subject Atlas / Curator | 主題 rail + 平行文字條目與分類計數；Curator 編輯式展牆與不等權排列 | 已把主題資料改為文字索引，差異可辨 |
| Portrait Profile / Companion | Portrait 首屏人物字形肖像框與身份排列；Companion 信件正文與停頓留白 | 即使沒有真人照片，兩者入口仍不同 |
| Question-led Practice / Trust Path | 問答式的問題／回答兩欄重複；Trust Path 路徑節點與接續流程 | 結構差異可辨，問答版的服務索引已專用化 |

本輪不是證明「每一頁完全相同文字」，也未以主觀觀感給出相似度百分比分數。幾何距離只是相對的版面量測；不自稱人類盲測成功。

## 獨立 Adapter 真實測試
- GitHub Actions [Art Direction Independent Adapter Check](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38569725648) 已完成成功；上一個成功 Run 上傳 `standalone.json`，記錄 29 項 PASS。
- Subject Atlas：由明確指定的 Site Brief 匯出獨立 Astro；npm install、regressions、npm build、verify、SEO/robots、站內路由、RSS、Pagefind、Article Collection 的實際公開測試文章、草稿隔離、未定義 topic 拒絕、子路徑 canonical；零 topic、零文章仍可建置且顯示空狀態。
- Practice Compass：由 Site Brief 匯出獨立 Astro；visitorIntents 設定被輸出至首頁；適合／不適合、服務形式、FAQ、聯絡空狀態可辨；零 scope、零 FAQ、零 contact 的獨立建置通過；拒絕任意 URL target。
- 兩款都驗證不能直接重寫既有輸出、必須顯式允許 in-progress，並能由既有學員 AI Builder Pack ZIP 移動式匯出。這是**獨立技術功能驗證成功**，與使用者延期的**獨立 Starter 截圖驗收**是不同驗收項目。

## 保留的品質界線
- 11 個新方向目前仍是原型／demo data，不具完整的學員 Content Collections／服務資料可編輯接線；不可標 Ready。
- 截圖量測證明可生成與無溢出，但尚不能等同 25 款多頁完整的人工文字校對、鍵盤操作、讀屏、對比度檢測及正式瀏覽器主觀藝術指導全數通過。
- PR #47 保持 Draft；#46 Gallery、主要 Generator 與主 Adapter 未修改；不 Merge、不部署 Production。
