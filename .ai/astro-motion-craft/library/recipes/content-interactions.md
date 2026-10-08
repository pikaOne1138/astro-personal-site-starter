# Recipe I01、L01、F01｜ZoomImage／UnderlineLink／FAQ

## Manus v2 原始來源
- `src/components/effects/ZoomImage.astro`
- `src/components/effects/UnderlineLink.astro`
- `src/components/common/FAQAccordion.astro`
- `src/styles/components.css`

## ZoomImage

原始 `effect='zoom'|'pan'|'none'`，預設 zoom；`aspectRatio` 可用 `4 / 3`、`16 / 9`、`1 / 1`、`3 / 2`，預設 `3 / 2`；`loading` eager/lazy、`position`、`className`、`href`。Pan 只在細游標、無 reduced-motion 生效；每次 pointermove 更新 `--pan-x=(-x*10)px`、`--pan-y=(-y*8)px`；pointerleave 歸零。它使用 `figure` 或 `a` 包裝 `img`；使用者需提供 `alt`。

**適配指引**：
1. 對文章封面／形象照片允許 zoom；對圖表、介面截圖及包含文字的圖片預設 none。
2. 固定 aspect ratio 以免 CLS；有圖說、來源授權時用 figure/figcaption 與現有圖片規格結合。
3. 指標 Pan 是輕微位移，不是全畫面 parallax。觸控與 reduced-motion 必須關閉 Pan。
4. 不把 Manus 附的 `public/images/editorial-forest.jpg` 直接作為我們現有各款 Demo 的品牌照片。

## UnderlineLink

原始 `variant='grow'|'center'|'marker'`、`arrow`、`external`、`className`；grow 以底線擴展、center 以左右向中間延展、marker 以細底色標記。當外部連結 `external=true` 時原始碼補 `target=_blank` 與 `rel=noopener noreferrer` 和隱藏提示文字。

**適配指引**：
1. 保持現有連結顏色和 focus-visible，不可只有 hover 時才看得懂它是連結。
2. paper 可用線性 grow，morning 可用 marker，studio 可用 center，botanical 不需每條連結加動態。
3. 使用 `background-image`／`background-size` 或 `::after`，不要重新排版文字寬度。

## FAQAccordion

原始用 `<details><summary>…</summary><div class='faq-answer'>…</div></details>`，`variant='line'|'soft'|'cards'` 與 `openFirst`、`className`，瀏覽器無 JS 仍能展開。CSS 使用 `@supports selector(details::details-content) and (interpolate-size: allow-keywords)` 才增加內容高度轉場。

**適配指引**：
1. 我們目前已有 FAQ、ArticleAccordion；應擴充既有元件 Props，不能複製一個 FAQAccordion 造成內容與樣式分裂。
2. 任何 variant 保持 HTML details 語意與鍵盤可用；`openFirst` 只開第一題，不要預設全部展開。
3. 高度轉場僅作 progressive enhancement，reduced-motion 必須立即更新。
4. 一般服務 FAQ 可用 line；重要說明宜保持視覺穩定；cards 只在內容分組確有必要時才使用。

## 驗收

- 所有連結可 Tab，文字大小／顏色符合原四套主題。
- FAQ 打開與關閉無跳焦；無 JS 正常。
- 圖片 alt、圖說、授權、手機版比例合理；低動態裝置沒有游標視差。
