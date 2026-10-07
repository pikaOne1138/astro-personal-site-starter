# Astro 架站工作坊｜視覺研究與模板拆解報告

> 研究日期：2026-10-07｜對象：完全零程式背景學員｜目標：收斂出兩套 Astro 教學模板的設計方向
> 本階段不寫程式，只做：大量搜尋 → 視覺研究 → 案例比較 → 找共通模式 → 收斂模板方向。

## 文件結構

| 文件 | 內容 | 對應任務 |
|---|---|---|
| `00_總覽與方法.md`（本文件） | 研究方法、搜尋來源、查證說明、使用方式 | 九 |
| `01A_案例池_知識部落格_01-10.md` | 知識／部落格案例 A01–A10（30 欄位完整拆解） | 一 |
| `01B_案例池_知識部落格_11-20.md` | 知識／部落格案例 A11–A20＋遺珠名單 | 一 |
| `02A_案例池_助人者_01-10.md` | 助人者案例 B01–B10（30 欄位完整拆解） | 一 |
| `02B_案例池_助人者_11-20.md` | 助人者案例 B11–B20＋遺珠名單 | 一 |
| `03_Top10精選.md` | 知識／部落格 Top 10、助人者 Top 10 | 十之二 |
| `04_Pattern分析_導航與首頁.md` | 導航列模式、首頁 Section 排序研究 | 二、三 |
| `05_Pattern分析_CSS動畫CTA文章頁.md` | Design Tokens、小動畫、CTA、文章頁 | 四、五、六、七 |
| `06_模板DesignBrief與融合建議.md` | 模板 A／模板 B 的 20 項設計 brief＋融合建議 | 八、十之四五 |

## 研究方法（誠實說明）

1. **真的執行了網路搜尋**：共 14 組中英文查詢，覆蓋 Astro Themes／Showcase、Framer、Webflow、Squarespace、ThemeForest、Ghost、beehiiv、WordPress、therapist／coach 評測榜單、台灣個人品牌與諮商所網站。
2. **實際抓取頁面**：抓取 Astro 官方 Showcase、Life Coach Magazine 30+ 榜單、Wild Berry 21 治療師網站榜單、James Clear 首頁等的實際頁面結構（導航、section 順序、CTA 文案）。
3. **連結查證**：40 個主案例的網址皆經搜尋結果驗證為「可索引的現行網站」；凡只在評測文章中出現、未能直接抓取的，會在案例中標註來源。
4. **限制聲明**：本次研究環境無法對網站做像素級截圖，視覺判斷依據＝實際抓取的頁面結構＋評測文章的截圖描述＋公開的設計資訊。建議開課前，你再人工快速瀏覽 Top 10 網站做最終視覺確認（每個約 5 分鐘）。
5. **中文案例**：包含台灣已驗證案例——閱讀前哨站、心理師阿綸、蛹之生心理諮商所、看見心理諮商所、電腦玩物；亞洲英文案例——澳洲 Therapi。

## 搜尋來源覆蓋表

- Astro：官方 Showcase、astrothemes.dev、getastrothemes、themefisher 榜單、GitHub（Cactus／Paper／Fuwari／Liebling）
- 模板平台：Framer Marketplace（經 framerbite／victorflow 評測）、Webflow（Loonis／victorflow／webestica 評測）、Squarespace 內建模板（jpkdesignco／squareko／therapistdigitalmarketing 評測）、ThemeForest（hypnotherapy／psychology 分類頁）、Showit（Applet Studio 31 例）
- 評測榜單：Life Coach Magazine、Brand Glow Up、Squarestash、Portmoni、SimplePractice、Wild Berry、Weblium、GetResponse
- 部落格設計榜單：OptimizePress 18 例、Colorlib、beehiiv 官方模板文、Tuts+
- 中文：site-now 29 例個人品牌、允諾行銷案例、conception-tech 諮商所經營文、lunpsy、morph、seeingcounseling、readingoutpost

## 核心結論先行（給沒時間的人）

1. **知識／部落格模板**最值得融合：James Clear（轉換架構）＋ Ness Labs（知識體系感）＋ Farnam Street（閱讀體驗）＋ 閱讀前哨站（中文語境）＋ Astro Paper（可實作骨架）。
2. **助人者模板**最值得融合：Mel Noakes（Start Here＋測驗 CTA）＋ Therapi（暖中性專業感）＋ The Practice（現代親切）＋ 蛹之生／看見心理（台灣預約流程＋LINE＋FAQ）＋ Michelle Harwell（信任文案）。
3. **導航列**：兩種模板都用「左 Logo＋中文字鏈＋右單一 CTA 按鈕」的 sticky 白底／毛玻璃導航；知識型加「主題分類」，助人者加「預約」CTA。不要 mega menu。
4. **首頁**：知識型＝Hero（價值主張＋電子報）→ 主題分類 → 精選文章 → About 短版 → Newsletter 大版 → Footer；助人者＝Hero（共情標題＋雙 CTA）→ 你是否正在經歷 → 服務 → 方法／理念 → 關於我 → 見證 → FAQ → 預約 CTA → Footer。
5. **視覺**：全部走暖紙色＋深墨文字＋單一陶土／鼠尾草 accent；字體用免費 Google Fonts（Fraunces／Newsreader／Noto Serif TC＋Inter／Noto Sans TC）；圓角 12–16px；柔和單一陰影。
6. **動畫**：只做 CSS fade-up（200–300ms）、卡片 hover 上浮、連結底線動畫、導航毛玻璃、閱讀進度條；全部加 `prefers-reduced-motion`。