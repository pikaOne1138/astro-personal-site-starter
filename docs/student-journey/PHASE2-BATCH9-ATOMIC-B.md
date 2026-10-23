# Phase 2｜Batch9 複合條款拆解 B（授權、部署與組站）

Frozen source: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。延續 Batch9 Atomic A，本批從尚未細拆的來源行中選 8 行；每行拆為語義候選並分類，保留完整來源行。這些子項未完成跨文件 canonical 去重。

| ID | 子項內容（原文語義摘要） | 類型 | Frozen source |
|---|---|---|---|
| `B9B-ASM-45-01` | Preserve content collections, navigation, SEO, RSS, sitemap, Pagefind and existing Blocks logic | NORMATIVE | [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L45) |
| `B9B-ASM-45-02` | Adapt page-specific DOM instead of recoloring generic cards | NORMATIVE | [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L45) |
| `B9B-ASM-45-03` | Unconfigured service, qualifications, pricing and booking remain explicitly unconfigured | NORMATIVE | [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L45) |
| `B9B-ASM-45-04` | Twelve designs are first-pass, not final source-faithful multi-page sites | STATUS | [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L45) |
| `B9B-ASM-49-01` | Preserve hierarchy and Hero proportions | NORMATIVE | [L49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L49) |
| `B9B-ASM-49-02` | Preserve content sequence and imagery treatment | NORMATIVE | [L49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L49) |
| `B9B-ASM-49-03` | Preserve mobile restacking | ACCEPTANCE | [L49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L49) |
| `B9B-ASM-49-04` | Do not collapse all families into one Hero/card system | NORMATIVE | [L49](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L49) |
| `B9B-ASM-53-01` | Selected pages link to real routes | ACCEPTANCE | [L53](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L53) |
| `B9B-ASM-53-02` | 404, RSS and sitemap use actual site URLs | ACCEPTANCE | [L53](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L53) |
| `B9B-ASM-53-03` | Never simulate form/booking success or fabricate testimonials | NORMATIVE | [L53](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L53) |
| `B9B-ASM-54-01` | Build and inspect widths 1440/1280/768/390 | ACCEPTANCE | [L54](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L54) |
| `B9B-ASM-54-02` | Compare reference layout screenshot to actual output | ACCEPTANCE | [L54](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L54) |
| `B9B-ASM-54-03` | CI build result alone cannot prove visual fidelity | BOUNDARY | [L54](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L54) |
| `B9B-DEP-19-01` | Branch/PR/CI Build precede accessible Preview | PROCEDURE | [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L19) |
| `B9B-DEP-19-02` | Student consents before merge | NORMATIVE | [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L19) |
| `B9B-DEP-19-03` | After merge, production deployment and live link/search checks | PROCEDURE | [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L19) |
| `B9B-DEP-19-04` | GitHub Pages PR preview requires an isolated, accessible path | ACCEPTANCE | [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L19) |
| `B9B-DEP-19-05` | Local Build is not Live Preview | BOUNDARY | [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L19) |
| `B9B-DEP-26-01` | Custom domain requires DNS and HTTPS verification | ACCEPTANCE | [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L26) |
| `B9B-DEP-26-02` | Verify actual URL, canonical, RSS and sitemap | ACCEPTANCE | [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L26) |
| `B9B-DEP-26-03` | Verify search indexing and redirects | ACCEPTANCE | [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L26) |
| `B9B-DEP-26-04` | Verify additional Cloudflare rules individually when required | CONDITIONAL | [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L26) |
| `B9B-DEP-26-05` | Do not promise complete WordPress 301 migration | BOUNDARY | [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L26) |
| `B9B-DEP-27-01` | Cloudflare API Token/GitHub OAuth/deploy approval only via platform auth workflow | SECURITY | [L27](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L27) |
| `B9B-DEP-27-02` | Do not place credential or authorization data in source code | SECURITY | [L27](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L27) |
| `B9B-DEP-27-03` | Do not place credential or authorization data in chat, commits, or public config | SECURITY | [L27](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L27) |
| `B9B-DEP-37-01` | No merge without explicit student permission | NORMATIVE | [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) |
| `B9B-DEP-37-02` | No repository deletion without explicit student permission | NORMATIVE | [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) |
| `B9B-DEP-37-03` | No DNS modification without explicit student permission | NORMATIVE | [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) |
| `B9B-DEP-37-04` | No site overwrite without explicit student permission | NORMATIVE | [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L37) |

## 跨文件重疊：待正式裁決

- `B9B-DEP-37-01` 與 P0-U001：Merge 核准方向相同；仍須留住學員目前版本與對象。`SAME_CANDIDATE`，不是核准 Canonical。
- `B9B-DEP-37-03` 與其他 DNS 變更授權：`PARTIAL_OVERLAP`，不可推論所有部署操作已獲授權。
- `B9B-DEP-19-04` 與 P0-CANON-PRVIEW-MISSING：前者要求實際隔離 Preview，後者是在不可用時如實回報；`PARTIAL_OVERLAP`。
- `B9B-ASM-54-01` 與既有四尺寸檢查：`SAME_CANDIDATE`；截圖存在與人工對照仍不同。
- `B9B-ASM-53-03` 與內容真實性來源：`PARTIAL_OVERLAP`，不可把無可用後端和虛構客戶見證當同一子義務。

## Gate

本批已細拆 8 個 Batch9 來源行、31 個子候選；連同 Batch9 Atomic A 的 4 行，Batch9 共 12/33 行有進一步細拆，**剩 21 行**尚待相同程度處理。全部 103/103 仍只是來源行映射；本批不宣稱零資訊遺失或語義去重 PASS。第三、四階段 BLOCKED。不修改原始 Skill、不 Merge、不部署。
