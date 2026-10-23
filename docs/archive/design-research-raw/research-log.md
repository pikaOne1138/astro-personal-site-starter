# Research / Decision Log

## 2026-10-07
Started with two workshop audiences: Knowledge/Blog and Helper/Professional Service.

Ran multi-model visual research across GPT Work, Claude, Gemini, Grok, Perplexity, Mistral, Tenbin variants and Arena.

Decision:
- Keep two content architectures.
- Keep three visual personalities: Paper & Ink, Morning Light, Quiet Studio.
- Implement as shared Astro components + theme tokens, not six unrelated codebases.
- Preserve raw research under references/raw-research.
- Prioritize sources with direct page/screenshot/CSS evidence over memory-only lists.

## Prototype v0.1
Built six static routes:
- knowledge/paper
- knowledge/morning
- knowledge/studio
- helper/paper
- helper/morning
- helper/studio

GitHub Actions confirmed Astro successfully generates all 7 pages (index + six demos). Deployment is blocked only until GitHub Pages is enabled for this new repository; the connected GitHub App cannot create the Pages site because that requires repository administration.
