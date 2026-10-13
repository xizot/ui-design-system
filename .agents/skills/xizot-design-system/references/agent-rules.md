# Design system source mode

Read `.agents/skills/xizot-design-system/SKILL.md` before React UI work. It routes page, form, shared API and verification tasks. Read `.agents/rules/react.md` for implementation constraints.

Shared source lives in `design-system/` (CRA: `src/design-system/`). Inspect the installed source and actual aliases before using props/imports. Run `python .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "button"` for unfamiliar controls, or use rg/manual inspection if Python is unavailable.

For pages/sites, use the page-builder workflow to choose an actual page pattern, shell and visual direction. Multi-module workspaces default to sidebar navigation; public landing pages use top navigation. Preserve existing product decisions. The `pattern` and `recipe` commands retrieve only the selected design guidance; a small fix needs no redesign. Keep domain logic in features and use existing Xizot controls. Submitted forms use RHF wrappers; search/filter controls may use local/URL state.

Finish through `xizot-quality`: scoped lint/types plus relevant interaction/visual checks. Report unverified behavior explicitly. Keep project-specific instructions outside this installer-managed section and installer-owned skill files.
