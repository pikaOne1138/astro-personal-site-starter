> **已封存（2026-10-23）。** 某一輪 CI 與驗收的紀錄（Run、Artifact 編號與截圖連結已過期）。仍有效的契約已在 `docs/layout/layout-assembly.md`，學員端契約在 `docs/student-builder-pack/` 的 `EXPANDED-LAYOUTS.md`、`SECTION-PATTERNS.md`、`OWNED-MEDIA.md`。僅供歷史查閱，不再維護。

# PR46｜新增十三款的自有圖片、Logo 與段落標題

基準：`5a5727f8a64ba14a176375c4bacf5d023e15bb4e`；四項 Actions 已成功。這是同一主匯出器及既有 Builder Pack 的延伸，沒有另開產包器、後台或 QA 平台。保持 Draft，不 Merge、不修改 Production／DNS。

## 本輪實作

- 十三款 Header 均呈現已提供的 Logo；不提供時保留文字站名。Logo 使用 contain，不套照片的濾色，最大 125 × 48px，保留可讀替代文字。
- Subject Atlas／Practice Compass 取消先前文字優先的圖片拒絕；依既有自有資產驗證／複製程序，在原有 Hero 側欄與各自 About 放選用圖片，保留主題索引／訪客決策動線。
- 個人刊物的 Logo 也沿用原刊頭的置中軸，不因換成圖片而退回左對齊。
- 原生十一款保留既有構圖。人物名片、工作室章節的照片框使用填滿圖片；其他選用圖片各有 About 角色，沒有把所有首頁改成同一張大圖。
- `OwnerImage.astro` 是輸出網站內的媒體實作，不新增 Blocks Registry 項目。填滿圖片限制在該款照片框內；沒有圖片時保留原本誠實的選填框或文字頁，不借人物照。
- 新增十三款的 `brand.imageFit=cover|contain`、`brand.imagePosition=center|top|bottom|left|right` 控制照片呈現；預設 cover／center。Logo 固定 contain。這些是 AI 可選設定，不改變規劃器既有預設；原十二款的裁切實作維持原契約。
- `layoutContent.headings` 可依 `src/data/layout-assembly/expanded/heading-fields.json` 的當款 key 改寫靜態段落標題；工作室的 artworkStatement 亦可編輯。文字由 Astro 轉義，不接受任意 HTML。未知 key、空白或超過 200 字拒絕，缺值保留原構圖標題。既有 headline、intro、About 及 copy.pN 仍保留。

## 圖片位置契約

| Layout | 自有主視覺位置 |
|---|---|
| subject-atlas | Hero 主題資訊側欄；About 紀錄欄 |
| practice-compass | Hero 知情選擇側欄；About 工作介紹側欄 |
| sidebar-journal | About 作者框 |
| editorial-frontpage | About 作者圖版 |
| card-journal | About 作者框 |
| visual-stories | About 影像敘事圖版；文章圖仍由 frontmatter image 提供 |
| compact-dispatch | About 短文前圖版；首頁維持短箋列表 |
| split-reader | About 左欄作者簡介 |
| portrait-profile | Home／About 人物框 |
| service-catalogue | About 服務提供者資料欄 |
| studio-chapters | Home 工作情境框／章節插圖；About 工作方式章節 |
| editorial-practice | About 觀點旁注欄 |
| question-led-practice | About 個人介紹回答欄 |

所有位置都選用；沒有圖片仍可 Build。圖片必須使用學員自有或獲授權素材，僅有路徑而缺少檔案時，在匯出前明確報錯，不能交出破圖網站。既有嵌入式兩張圖片（Logo／主視覺）及 public/images 旁置素材契約不變。

## 驗證與證據方式

- 主站 Build、原十二款匯出及既有獨立 Adapter 回歸；新增無效裁切值、無效焦點位置、未知標題欄位與缺檔拒絕案例。
- 真正匯出的 Subject Atlas、Portrait Profile、Compact Dispatch 獨立安裝／Build／verify，檢查 Header Logo 與 About 圖片均在輸出，不把 JSON 保存當成渲染成功。
- 沿用 `verify-starter-export.mjs` 四尺寸流程，新增全部十三款的橫圖／直圖 × Home／About × 1440／1280／768／390。圖片使用本專案自製比例校準 PNG（1200×600、600×900、400×120），清楚標記 QA；不是實際客戶照片或已完成真實照片的 Art Direction 簽核。
- 瀏覽器驗證圖片實際載入、替代文字、Logo 尺寸／contain／不濾色、照片 cover/top 與 contain/bottom、填滿圖片不逃出原照片框，以及可編輯標題實際呈現。
- 原 1,476 張與無圖／草稿／撤回／長標題／鍵盤／Pagefind 證據繼續保留；新增 208 張，完整流程預期 1,684 張。實際張數、結果、精確 Head 與 Artifact 以 PR46 當輪 Actions 和說明為準，未跑完不預先宣告通過。

本機另做十三款 Home／About 四尺寸共 104 張載入／幾何檢查，沒有破圖或橫向溢出；該本機瀏覽器缺少中文字型，這些圖僅支持圖片幾何，不作中文排版核可。正式中文目視仍採 GitHub Artifact。真正下載的本輪 Builder Pack 已核對需出貨的來源檔，25 選項與兩種架構安裝／Build 通過。

可攜圖片契約另放在會隨 ZIP 出貨的 `docs/student-builder-pack/OWNED-MEDIA.md`，不讓離線 AI 指向被刻意排除的內部驗收報告。

## 狀態界線

本輪不把新增十三款改為 Ready。真實學員照片的焦點與裁切選擇、設計核可、實機／讀屏及 PR47 小點擊目標分級仍待人工驗收。非 footer Section Patterns 仍明確拒絕；這是下一個獨立構圖接線項目，未聲稱本輪已實作。

最新執行結果與未完成項請先讀 [PR46](https://github.com/pikaOne1138/astro-personal-site-starter/pull/46)。先前文件中「兩款禁止圖片」「原生頁首未接 Logo」「段落標題不可配置」為本輪之前的歷史限制，不再代表本輪實作。
