# Logo、Favicon 與 AI 網站圖片｜設計研究備忘

**目的：** 把可靠的設計原則轉成初學者與 AI 可以落實的步驟，不把 Logo 簡化成「生成一張漂亮圖」。

## 研究後的核心判斷
1. **先決定品牌想被記住的特徵，再開始畫。** Logo 是識別系統的一部分，不是首頁裝飾。
2. **形狀比細節重要。** Adobe 的 flat / minimalist logo 教學強調：輪廓、簡化、對比、小尺寸可辨識。工作坊採「先黑白、再配色」作為操作規則。
3. **一份 Logo 不足以處理全部場景。** 橫式用在 Navbar；方形符號/縮寫用在社群與 favicon；深淺底及單色版需要實測。Adobe 的 logo ideas 說明向量的縮放優勢。
4. **中文字體要另外處理。** 對 AI 產生的中文 Logo 字形要人工校對；最穩定的初版是 AI 先做圖形，文字以網站 CSS 真正排版，或先直接用 Wordmark。
5. **Logo 不等於 favicon。** Google Search Central 正式規格：1:1、至少 8×8px，建議大於 48×48px、可抓取與穩定網址；它並不保證 Google 一定顯示。工作坊額外採 16/32/48px 的視覺辨識測試。
6. **網站圖片也分用途。** Hero 必須保留文字區與構圖焦點，文章圖要有系列一致性，助人者站不能用 AI 虛構專業者、療癒成效、客戶或診療空間。
7. **產生圖片不是驗證授權。** AI 生成或第三方圖片的使用條件必須個別確認；需要商標保護時還須做相似性檢查。不能保證生成結果唯一或可以註冊商標。

## 工作坊採用的交付檔
| 用途 | 建議輸出 | 驗證重點 |
|---|---|---|
| Navbar | logo-horizontal.svg / .png | 文字正確、透明背景、縮小仍清楚 |
| 方形符號 | logo-mark.svg / .png | 1:1、單色、對比良好 |
| Favicon | favicon.ico、favicon-32x32.png | 真實編碼，16/32/48px 檢查 |
| Apple 主畫面 | apple-touch-icon.png | 常見 180×180（用途需求，非 Google 搜尋必要） |
| Hero / 文章 | hero.webp / cover-*.webp | 用途與比例、版面裁切、Alt、來源 |
| 設計紀錄 | brand-assets.md | 產圖提示詞、來源、核准狀態、授權備註 |

**不要宣稱**輸入提示詞後 AI 一定交付可編輯 SVG 或完美中文字形。SVG 要求真實向量路徑或由設計工具轉繪；只把點陣圖包成 SVG 並沒有得到真正可編輯的 Logo。

## 參考閱讀
- Adobe minimalist logo: https://www.adobe.com/uk/creativecloud/design/discover/minimalist-logo-design.html
- Adobe flat logo: https://www.adobe.com/creativecloud/design/discover/flat-logo-design.html
- Adobe logo ideas: https://www.adobe.com/in/creativecloud/design/discover/logo-ideas.html
- Google favicon: https://developers.google.com/search/docs/appearance/favicon-in-search?hl=zh-TW
