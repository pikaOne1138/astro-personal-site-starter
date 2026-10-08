# Agent Instructions

Before designing or modifying UI, read `.ai/astro-ui-craft/SKILL.md` and use its references as the design authority.

For GitHub PRs, previews, deployment, visual verification, or merging: **read `.ai/astro-pr-preview/SKILL.md` first**. Never claim a preview is deployed or merge a website PR without confirming the workflow and explicit user approval.

Project goal: a beginner-editable Astro starter for two architectures:
- `knowledge`: knowledge/blog/personal publishing
- `helper`: helper/professional service

Visual themes:
- `paper`
- `morning`
- `studio`
- `botanical`

Rules:
1. Do not turn the project into a SaaS dashboard or CRM.
2. Preserve static-first architecture unless the user explicitly requests a web app.
3. UI refinement means typography, spacing, hierarchy, image treatment, motion restraint, responsive behavior, and accessibility—not adding decorative effects.
4. Preserve all eight demo URLs (two architectures × four styles), plus the `/blocks/` gallery.
5. Before designing or modifying UI, read `.ai/astro-ui-craft/SKILL.md` and its `references/component-library-v1.5.md`. Prioritize existing design tokens and spacing/type scales: **do not silently introduce arbitrary design values.**
6. Before writing a new section, inspect `COMPONENTS.md` and `src/data/blocks.registry.json`, and reuse components under `src/components/blocks/` where suitable.
7. Component names and Props are the interface for AI-assisted assembly; preserve backwards compatibility.
8. Run `npm run build` before declaring completion; follow the PR Preview Skill and ask for explicit approval before merging.
