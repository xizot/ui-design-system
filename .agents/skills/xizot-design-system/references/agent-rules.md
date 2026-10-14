# Design system source mode

Before the first Xizot code change in each task, read `.agents/AGENTS.md` and all five Xizot `SKILL.md` entry points listed there at least once. Read `.agents/rules/react.md` and application-owned coding conventions. Follow the relevant skill's workflow and task-specific references before implementation.

Shared source lives in `design-system/` (CRA: `src/design-system/`). Inspect the installed source and actual aliases before using props/imports. Run `python .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "button"` for unfamiliar controls, or use rg/manual inspection if Python is unavailable.

For pages/sites, use the page-builder workflow to choose an actual page pattern, shell and visual direction. For application pages, read [feature architecture](feature-structure.md) and identify the route, feature/use case, component boundaries, state and service owner before coding. Multi-module workspaces default to sidebar navigation; public landing pages use top navigation. Preserve existing product decisions. The `pattern` and `recipe` commands retrieve only the selected design guidance; a small fix needs no redesign. Keep domain logic in features and use existing Xizot controls. Submitted forms use RHF wrappers; search/filter controls may use local/URL state.

For page/section headings and prose, inspect `components/ui/typography.tsx` and use the matching `TypographyH1`–`TypographyH4`, `TypographyLead`, `TypographyP`, `TypographyMuted`, `TypographySmall`, or `TypographyCode` export. Keep semantic heading order. Use a container's own text component, such as `CardTitle` or `AlertTitle`, when it owns that role.

Finish through `xizot-quality`: scoped lint/types plus relevant interaction/visual checks. Report unverified behavior explicitly. Keep project-specific instructions outside this installer-managed section and installer-owned skill files.
