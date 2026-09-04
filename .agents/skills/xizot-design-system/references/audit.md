# Audit Command

Use for reviewing an existing UI.

## Findings Order

Lead with issues, ordered by severity:

1. Broken behavior or inaccessible interaction
2. Design-system mismatch
3. Responsive/layout defects
4. Missing states
5. Visual hierarchy, typography, or density problems
6. Color, contrast, or semantic tone problems
7. UX clarity and copy issues

Use file and line references when reviewing code.

## Checklist

Design-system fit:

- Existing Xizot component available but bypassed?
- Raw third-party primitive imported directly despite a local wrapper?
- Hardcoded color, radius, shadow, spacing, or custom state class where a token/variant exists?
- Feature code creating a parallel form/table/status abstraction?

Layout and spacing:

- Card nested inside card or page section styled as floating card?
- Toolbar lacks search/filter/action structure?
- Related items spaced too far apart or unrelated regions too close?
- Mobile layout wraps badly, overlaps, or hides primary actions?

Data and states:

- Table lacks loading, empty, pagination, sorting/filter state, or pinned action column?
- Form lacks label, required state, error text, disabled submit, or server error handling?
- Active filters, selected rows, pending mutations, and destructive actions are unclear?

Color and type:

- Color used decoratively instead of semantically?
- Status color palette too broad or inconsistent?
- Primary data shown as muted text?
- Hero-scale type used inside app panels?
- Vietnamese copy inconsistent, too verbose, or mixed awkwardly with English?

## Response Style

Do not rewrite the whole UI in the audit unless the user asks. Provide actionable findings and a focused fix path. When the issue belongs to color/layout/type/system, name that category explicitly.
