> **已封存（2026-10-23）。** 頁面結構以 `src/pages/` 為準；三種檔案的關係與尚未驗證的 QA 清單已併入 `docs/workshop/student-flow.md`。僅供歷史查閱，不再維護。

# PR #56｜ATP 學員動線與內容驗收

## 網站資訊架構

- 首頁：主入口為前置準備與 25 種 Layout；設計資源為可自行探索、非必經。
- Prepare：只處理環境。01 GitHub 帳號、02 GitHub Repo、03 AI/GitHub 授權、04 發布方式。
- Layouts：預覽版型，選用後以 layout 和 kind 參數進入 Starter。
- Starter：01 Layout → 02 品牌視覺 → 03 網站內容 → 04 AI 需求訪談與 Logo（選填）→ 05 網站導航 → 06 區段組合（選填）→ 07 下載 Site Brief。
- Guide：01 取得 Site Brief → 02 建站資料包與正式提示詞 → 03 AI 製作網站 → 04 預覽 → 05 修改 → 06 確認發布 → 07 更新。

## 三種檔案（不編號為第一、第二、第三份）

| 檔案 | 位置 | 必要性 | 後續 |
| --- | --- | --- | --- |
| AI 需求訪談包 ZIP | Starter 04 | 選填 | 解壓後交 AI 進行訪談；AI 整理摘要，學員貼回 Starter 04 |
| Site Brief JSON | Starter 07 | 建站交接用 | 保存網站設定；包括貼入的訪談文字 |
| 完整建站包 ZIP | Guide 02 | 建站交接用 | 與 Site Brief 交給同一個具備專案操作能力的 AI，搭配 Guide 的正式提示詞 |

- 學員不必把訪談包重複交給建站 AI。
- 訪談摘要與規劃器設定若有實質矛盾，建站 AI 應先詢問學員，不自行選擇優先權。
- Logo 圖片：AI 生成 → 學員下載 → Starter 02 上傳；純文字品牌方向貼 Starter 04。
- 不做訪談、不上傳 Logo，仍應可建立 Site Brief 並開始建站。
- 複製提示詞是「複製給 AI 的輸入」；不是「貼回 Starter」。AI 訪談結果才貼回 Starter。

## 合併前驗收（尚未全部驗證）

- [ ] 首頁主路徑、資源路徑有明顯區隔，沒有只有標題的空 section。
- [ ] Prepare 只出現四項環境步驟，無殘留訪談包按鈕。
- [ ] Layout 選用後，Starter 的 layout、kind 正確預選。
- [ ] Starter 步驟 01–07 連號；資源卡與按鈕在手機尺寸沒有溢出。
- [ ] Starter 04 完整訪談 ZIP 能解壓，七份 Markdown 文件完整且為 UTF-8。
- [ ] AI 訪談摘要可輸入多行，匯出 Site Brief 的 notes 保留文字與換行。
- [ ] 無訪談摘要時 Site Brief 仍可下載，檔案內容可被建站包接受。
- [ ] Logo 圖片上傳、主視覺上傳及 Site Brief 的 assets 保留正常。
- [ ] Starter 07 到 Guide 02 錨點可用。
- [ ] Guide 02 的完整建站 ZIP 實際能下載、內含預期目錄與檔案。
- [ ] Guide 不再有重複的 Starter 按鈕、設計顧問提示詞或額外下載順序編號。
- [ ] 正式建站 Prompt 有要求理解 Site Brief notes 與處理矛盾；需用 Builder Pack 端到端驗證。
- [ ] Astro Build、CI、桌面／手機瀏覽器 QA 皆通過。

> 此文件為驗收依據，不代表所有檢查已完成。PR 保持 Draft，未核實的項目不可宣稱通過。
