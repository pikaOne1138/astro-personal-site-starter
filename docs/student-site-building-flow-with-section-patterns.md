# 學員架站流程｜Section Patterns 納入版（2026-10-09）

## 給學員看的說明

**先選一個最接近你的整頁設計，再挑你需要的局部段落，最後用 AI 換成自己的文字、圖片與品牌。** 不用先學會每顆元件的名稱。

1. **需求**：網站寫給誰看？主要要提供什麼？訪客下一步希望做什麼？
2. **選網站類型與 Layout**：知識／部落格或助人者／專業服務；在 `/layouts/` 找最接近的整頁版型，記住 slug。Layout 與品牌配色是兩件事；目前規劃器提供八組配色起點，並非八套 Layout。
3. **定網站架構與導覽**：在 `/starter/` 規劃首頁、內頁、選單、CTA；沒有內容就暫時不啟用空頁。
4. **挑 Section Patterns（可以跳過）**：在 `/section-patterns/` 挑「代表作品」、「服務信任入口」或三款頁腳等需要的完整區段。每段說清楚放哪頁、放在哪兩段之間；不用把五款都用上。
5. **設定品牌視覺**：從八款配色起點選一款：紙墨、晨光、靜室、植感、海岸、暖沙、石板、暮紫；在 `/starter/` 調整主色、輔助色、強調色、背景色、文字色，可點色票或直接輸入 HEX。網站名稱、簡介與內容另外填寫，並由 AI 檢查顏色對比與手機版閱讀。這八款是規劃器的配色預設，不是八款正式 Demo 的新組合。
6. **調整 Blocks 與細節**：只有區段現有功能不夠用時，再到 `/blocks/` 選較細的功能；元件庫底部有外部工具參考。`/effects/` 最後再決定是否加入微動效：先看「什麼時候該動？什麼時候保持安靜？」，需要時再看外部動效靈感，不要因為有範例就全部加進去。
7. **建立與驗收**：下載 Site Brief JSON（包含選取的 `sectionPatterns`、兩層 `navigation`、五色 `brand.palette` 等），交給 AI 依 `astro-site-assembly` 組裝獨立網站；Pattern 匯出屬待完成的組站起點，不代表已完成精緻內頁。透過 GitHub PR 預覽，並實際檢查 1440／1280／768／390。
8. **發布與維護**：本人確認後才合併與部署。依 `astro-content-readiness` 檢查真實內容，依 `astro-navigation-tree-test` 安排真人尋找資訊測試；正式發布後，再使用 `astro-launch-health-check` 檢查上線健康狀態。接下來新增文章、修改區段和還原版本走內容發布、部署、維護 Skills。

## 從犬哥網站研究借用的兩個教學重點（已轉譯為 Astro 流程）

### 一、先定網站目標，再決定技術與頁面

犬哥網站的〈如何架設網站〉先要求釐清目標，再介紹網域、主機及平台。工作坊只借鑑**「需求先於工具」的順序**，不照搬 WordPress 或主機採購教學。

學員在 Step 01 至少回答：
- 網站的主要讀者是誰？
- 希望訪客先閱讀、理解服務，還是前往聯絡？
- 最少需要哪些真實內容，才能發布第一版？

### 二、發布後還需要一張「搜尋與維護驗收表」

犬哥網站的 Search Console 教學提醒：網站公開後還要處理搜尋引擎是否能找到與收錄。對本 Astro Starter，可在 `astro-starter-deploy`／`astro-content-publishing` 的發布驗收加入：

- 確認網站網址、canonical、robots.txt、sitemap.xml 與 SSL 狀態；網址不是 `example.com`。
- 文章型網站確認實際產生的文章列表、SEO 標題／描述及 Pagefind 索引，避免誤把 Demo 文章當正式內容。
- 可選擇將正式網域新增至 Google Search Console、驗證網域所有權並送出 sitemap；**驗證／送出不代表保證收錄或排名**。
- 記錄下次更新文章、檢查連結與備份的方式。

來源：
- https://frankknow.com/website-build-teach/
- https://frankknow.com/wordpress-google-console/
- 配色工具精選來源：https://frankknow.com/color-palettes-generator/

## 外部配色資源（放在規劃器 Step 02 底部）

- Coolors：https://coolors.co/，適合快速產生與調整五色組合。
- Happy Hues：https://www.happyhues.co/，適合查看顏色如何配置於標題、背景、按鈕等。
- Adobe Color：https://color.adobe.com/，適合從色輪、圖片取得靈感並檢查對比。

上述網站不會自動將配色匯入規劃器；學員複製 HEX 到五色盤後，仍需人工與 AI 做可讀性／無障礙檢查。

## 進階導航（選用）
在 `/starter/` 可新增自訂頁面、重命名、排序、指定「第一層」或「某個第一層底下的子選單」。第一層最多 12 項，單組子選單最多 10 項，網站總啟用頁數最多 20 項；這些是目前程式的安全上限，不是建議學員塞滿。桌面使用可點開的下拉選單，手機以點擊展開，父選單另有「查看全部」頁面入口。複雜 mega-menu、第三層或圖片式選單是後續客製需求，不能假稱已支援。

## Site Brief 的 Pattern 資料範例

規劃器匯出的 `StarterPlan v1` 直接使用 `sectionPatterns`（選填），每項含 `patternId`、`targetPage`、`insertAfter`。下例只是節錄，不是完整 Site Brief：

```json
{
  "sectionPatterns": [
    {
      "patternId": "featured-work",
      "targetPage": "/",
      "insertAfter": "首頁的作者介紹之後"
    }
  ]
}
```

學員應直接下載規劃器產生的 JSON，**不要自行照抄舊版 `sectionPatternSelections` 格式**。AI 應依內容需求補上真實作品或服務資料，並處理版面與手機重排；沒有資料時先隱藏或標示待設定，不虛構內容。全站 Footer 也要避免重複組裝。

## Skill 分工

| 學員任務 | AI 使用 |
|---|---|
| 需求、整體規劃 | `astro-starter-onboarding` |
| 整頁 Layout | `astro-layout-craft` |
| 局部已完成段落 | `astro-section-pattern-craft` |
| Hero、列表、閱讀節奏 | `astro-editorial-layout-design` |
| 個別 Blocks 與視覺 Tokens | `astro-ui-craft` |
| 微動效 | `astro-motion-craft` |
| JSON 與獨立網站組裝 | `astro-site-assembly` |
| 內容準備度 | `astro-content-readiness` |
| 導航理解與真人測試 | `astro-navigation-tree-test` |
| 正式上線後健康檢查 | `astro-launch-health-check` |
| 文章／SEO | `astro-content-publishing` |
| PR 預覽 | `astro-pr-preview` |
| 獨立部署與復原 | `astro-starter-deploy`、`astro-site-maintenance` |

## 教學驗收問題

- 學員能說出選擇 Layout 和 Section Pattern 的差別嗎？
- 能找到五款 Pattern 的展示，指出要哪一款、放在何處、如何替換內容嗎？
- AI 是否能維持原版型而增加 Pattern，不重複 Footer 或亂造新元件？
- Build 與實際預覽均通過嗎？未配置的預約與法律頁面有沒有被誤當正式功能？

## 重新測試提醒（2026-10-09）

PR #31、#32、#33、#34 已合併到 `main`。功能和文件已整合，**不代表真實學員測試或所有尺寸視覺 QA 已通過**。請從選版型到下載 JSON、組站、PR 預覽完整走一次；記錄每一步 PASS／FAIL／BLOCKED／NOT TESTED 與證據。八種配色預設與正式展示的四套 Visual Themes、八個 Demo 應清楚區分。
