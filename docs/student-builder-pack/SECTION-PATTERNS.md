# 新增十三款的 Section Patterns

此契約適用 subject-atlas、practice-compass，以及 expanded 目錄下的十一款 Adapter。它們仍是 in-progress，不因支援區段而成為 Ready。原十二款的既有規劃交接不變。

規劃器匯出的 `sectionPatterns` 仍是選用清單。AI 組站前應先補齊每個選用區段的 `content`，不要直接把缺資料的 Brief 當成已完成網站。這些欄位也會保存在匯出網站的 `site.config.json`，後續可直接修改該檔；不要重新匯出覆蓋既有網站。

## 位置與頁面

- `targetPage: "/"` 表示首頁，其他值是已啟用 navigation 的 **id**，不是路徑。自訂 `page-guide` 即使路徑是 `guides/first/`，仍使用 id。
- `insertAfter: "after-intro"`：只限首頁第一個內容區段之後。側欄手記在 intro 後，刊物在 front 主文跨欄後，人物在 hero 後，工作室在 stage 後。不是任意文字標題比對。
- `insertAfter: "page-end"`：指定頁主要內容之後、原頁腳之前，仍在原版型的內容欄內。支援首頁、About、文章／服務索引及已啟用的自訂頁。
- 規劃器現有預設「主要內容之後」會轉為 `page-end`；「首頁介紹後」「首頁自介後」會轉為 `after-intro`。其他自然語言位置必須由 AI 先確認對應位置並改成上述 key；匯出器會拒絕未知位置，不會默默移到頁尾。
- 同一 Pattern 在同一頁只能選一次。兩種 Pattern 同槽時依清單順序排列。`trust-service-path` 僅限 helper。
- Footer 保持既有三種 ID、`targetPage: "site-wide"` 契約；選用時取代原 footer，不能再追加第二份。

## 作品與文章

```json
{
  "patternId": "featured-work",
  "targetPage": "/",
  "insertAfter": "after-intro",
  "content": {
    "title": "先從這些內容開始",
    "description": "請填入自己的區段介紹。",
    "items": [
      {"title": "自己的作品名稱", "description": "自己的真實作品簡介"}
    ],
    "articleSlugs": ["my-published-note"],
    "action": {"label": "閱讀所有文章", "pageId": "articles"}
  }
}
```

`items` 與 `articleSlugs` 合計需 1–6 個。`items` 是持有人提供且可公開的作品資料，可省略或加上 `url`（僅 HTTPS、不可帶帳密）；沒有網址就呈現純文字，不製造連結。`articleSlugs` 需先啟用文章頁，並指向真正 Content Collections 的文章 id；標題、摘要、網址由已發布文章讀取，不複製成獨立資料。草稿、刪除或下架文章會自動排除；全部下架時顯示尚無作品內容，不留下舊標題或失效連結。

請勿把站內文章 URL 填成外部作品 URL 來繞過發布狀態，文章應使用 `articleSlugs`。外部作品資料及網址是否已取得公開許可，須由持有人確認。

## 專業信任與服務入口

```json
{
  "patternId": "trust-service-path",
  "targetPage": "services",
  "insertAfter": "page-end",
  "content": {
    "title": "合作前，先確認範圍",
    "description": "填入服務提供者確認的服務說明。",
    "suitable": ["填入適合的需求"],
    "notSuitable": ["填入不適合或需要其他支持的情況"],
    "notice": "填入已確認的服務界線。",
    "format": "填入真實服務方式",
    "policy": "填入已確認的預約與取消政策"
  }
}
```

必填 `title`、`description`、至少一項 `suitable` 與 `notSuitable`。選填 `professionalName`、`credentials`（字串陣列）、`areas`（字串陣列）、`format`、`policy`、`notice`。未提供的資格與政策不會生成。服務資料不能取代專業資格核實、服務適合度及危機資源查核。

兩種 Pattern 都可加 `action`：`{ "label": "…", "pageId": "已啟用的導航 id" }` 或 `{ "label": "…", "url": "已確認的 HTTPS 入口" }`，二擇一。缺 action 就不顯示 CTA；不會產生假的表單或預約成功狀態。站內網址會帶入實際 Astro BASE_URL。

實作重用現有 FeaturedWorkSection、TrustServiceSection 與其 Blocks。嵌入樣式繼承所選版型的品牌、字體與內容欄寬；Gallery 與 Blocks Registry 數量不變。完成後仍需真實匯出網站的四尺寸與鍵盤 QA，以及持有人核准。
