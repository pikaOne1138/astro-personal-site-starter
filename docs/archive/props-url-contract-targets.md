> **已封存（2026-10-23）。** URL 驗證的缺口與負向注入的要求已併入 `docs/quality/open-acceptance.md`（C）與 `QUALITY-CONTRACT.md`（證據的層次）。僅供歷史查閱，不再維護。

# QA v2.0｜Props 契約與 URL 護欄定點回歸

本測試只宣稱覆蓋下列高風險元件，**不**代表 110 個元件的所有 Props 已驗收。

## 目前確認的風險

- `LeadMagnetCard` 與 `ResourceCard` 曾以 `startsWith('/')`、`startsWith('./')` 判斷連結：`//host`、惡意分隔或格式不正確的路徑可能被誤認為合法。
- `Button`、`ServiceCard`、`CTASection`、`FeatureGrid` 與 `UnderlineLink` 接受呼叫者傳入的 URL；這些元件應透過一致的 URL 合約避免 `javascript:`、`data:`、`vbscript:` 與 scheme-relative URL。
- 合法的站內絕對路徑、相對路徑、hash、HTTPS、以及適用元件的 mailto/tel 必須保持可用。無效可選連結應呈現無連結文字／未設定提示；必要連結應有明確策略，不得輸出假動作。

## 必要負向注入

每個 URL 測試需證明正確的 URL validator 拒絕不安全輸入，而不只是後續死連結掃描回傳非零。測試記錄需包含 id、元件、fixture、期望診斷、實際診斷、checkout SHA、結果。

## 證據分層

1. Source Props inventory（宣告存在）。
2. Valid/invalid Props fixture execution。
3. 實際 DOM/鍵盤/無 JS/四尺寸。
4. 跨 Layout/Theme/Starter 整合。
5. 歷史修復前後比較與最終 SHA 接受。

任何一層尚未執行，不得藉其他層的 PASS 升級狀態。
