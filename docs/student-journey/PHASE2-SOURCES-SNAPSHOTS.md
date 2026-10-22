# Phase 2｜原始碼快照與設計來源稽核（11 份）

凍結 `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`，主清單 [CLAUSE-COVERAGE-MATRIX.md](CLAUSE-COVERAGE-MATRIX.md)。來源快照不應被誤認為 ATP 網站執行中的程式碼；原有 SHA 永久保留。程式邏輯、宣告及 CSS 數值本身均具資訊價值，**不得以自然語言摘要取代原始 bytes**。

| Path | Blob SHA | UTF-8 字元數 | 類型 |
|---|---|---:|---|
| `.ai/astro-layout-craft/LAYOUT_SOURCE_AUDIT.md` | `a21eec142f3354b1fae074a54551dcb394495112` | 2016 | HISTORICAL_AUDIT |
| `.ai/astro-ui-craft/docs/research-log.md` | `60c717ce70552e4f25d789b21ad6493ed7517aad` | 1015 | HISTORICAL_AUDIT |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/Button.astro.txt` | `ab35655cd30b950e2bab09dcd0ffd7e09aaa471d` | 1803 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/FAQAccordion.astro.txt` | `58daaf09109a373b82581c12583fd40cc68c6355` | 809 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/MotionCard.astro.txt` | `8cef963c991ba04cdaa83834d388ed3bba20f9d8` | 2514 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/Reveal.astro.txt` | `147a8e05fc8a10e12ac6070252d3db8bdfd33dec` | 783 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/StaggerGroup.astro.txt` | `8ce5dfc1765ae244034dce9c2ba7c7b9da96daf7` | 872 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/UnderlineLink.astro.txt` | `063f220b050d224f5ca564465f7aeb97b647509d` | 587 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/ZoomImage.astro.txt` | `a949d3f1cedd52869dc68de327e3424e3881f48f` | 1824 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/components.effects.css.txt` | `17c5467f4dc5ed8a0335927d403d6312dae556f7` | 5088 | REFERENCE_SOURCE_CODE |
| `.ai/astro-motion-craft/library/source-snapshots/manus-v2/reveal.ts.txt` | `528a558bdf683f8972844366ec26fedfd06bb967` | 1088 | REFERENCE_SOURCE_CODE |

- Layout Source Audit 及 research log 為歷史對照，含未完成和來源資訊，不能被整併為「現在全部通過」。
- 9 份 manus-v2 snapshot 為 Astro/CSS/TS 原始碼的文字快照，完整邏輯與屬性要以 frozen Git Blob 還原，不可省略。
- 發布／性能／無障礙的強制要求，仍以現行主 Skill 及其 library recipes 為權威；source snapshot 只證明來源存在，不證明已整合或通過 QA。

這 11 份檔案分類後原位保留，但尚未執行原始碼逐 token 的跨檔比較。Phase 2 IN PROGRESS; Phase 3/4 BLOCKED。
