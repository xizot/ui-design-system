# Design system source mode

Read `.agents/skills/xizot-design-system/SKILL.md` before React UI work. It routes page, form, shared API and verification tasks. Read `.agents/rules/react.md` for implementation constraints.

Shared source lives in `design-system/` (CRA: `src/design-system/`). Inspect the installed source and actual aliases before using props/imports. Run `python .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "button"` for unfamiliar controls, or use rg/manual inspection if Python is unavailable.

Choose website direction from the page-builder workflow. Preserve the application's existing theme and product decisions. Keep domain logic in feature code and use existing Xizot controls. Submitted forms use RHF wrappers; search/filter controls may use local/URL state.

Finish through `xizot-quality`: scoped lint/types plus relevant interaction/visual checks. Report unverified behavior explicitly. Keep project-specific instructions outside this installer-managed section and installer-owned skill files.
