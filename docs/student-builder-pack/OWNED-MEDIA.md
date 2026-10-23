# 自有 Logo、圖片與段落標題（AI 接手用）

本契約適用於擴充版型的 Adapter；能產站不等於 Ready，狀態以 `assemblyStatus` 為準。基本版型沿用原有媒體契約。

## 輸入

- Logo：`brand.logoPath`。主視覺：`brand.heroImagePath`／`brand.heroImageAlt`。
- 使用 Site Brief 既有兩張 `assets` 內嵌圖片，或將已授權的檔案放在 Brief 旁的 `public/images/`；主匯出器會驗證、複製，未附檔不偽裝圖片已存在。
- 照片裁切：`brand.imageFit` 為 `cover`（預設，填滿圖框）或 `contain`（保留整張）；`brand.imagePosition` 為 `center`（預設）、`top`、`bottom`、`left`、`right`。
- Logo 固定 contain，不套照片濾色，最大 125 × 48px；缺 Logo 顯示站名。圖片替代文字應描述真實內容，不虛構人物／空間。

## 圖片位置

| Layout | 主視覺角色 |
|---|---|
| subject-atlas | Home 主題側欄；About 紀錄欄 |
| practice-compass | Home 知情選擇側欄；About 工作介紹側欄 |
| sidebar-journal | About 作者框 |
| editorial-frontpage | About 作者圖版 |
| card-journal | About 作者框 |
| visual-stories | About 影像敘事圖版；文章圖由 frontmatter image 提供 |
| compact-dispatch | About 短文前圖版，首頁維持文字列表 |
| split-reader | About 左欄作者簡介 |
| portrait-profile | Home／About 人物框 |
| service-catalogue | About 服務提供者資料欄 |
| studio-chapters | Home 工作情境／章節插圖；About 工作方式章節 |
| editorial-practice | About 觀點旁注欄 |
| question-led-practice | About 個人介紹回答欄 |

圖片選用；不提供時保留原文字版面或明確選填框。不要為了放照片更換整套 Layout。

## 改寫原型標題

請讀取包內 `src/data/layout-assembly/expanded/heading-fields.json`，先用目前 layoutSlug 找當款允許的 key 與原標題，再依持有人真實文案填入 `layoutContent.headings`。未知 key、空白或超過 200 字會拒絕；不支援任意 HTML。工作室的 `artworkStatement` 也可覆寫。未提供則保留原構圖標題，不能把原型標題誤當持有人已確認的主張。

例如選用 `portrait-profile` 時，可依 Registry 把其 `h2-01` 改成持有人的工作理念。不同 Layout 的同名 key 不代表相同內容；換 Layout 前重新讀其允許欄位。

既有 `content.headline/intro`、`about`、`layoutContent.copy.pN` 仍保留。Logo／圖片／文字修改後，用真正輸出的網站檢查 Home、About、文章／服務及手機頁首；發布前取得持有人核准。
