# Build Command

Use for `$xizot-design-system build [surface]` and natural requests to implement a new UI surface.

## Workflow

1. Identify the surface mode. Most app screens are `Operate`.
2. Inspect nearby routes/components for layout, density, copy language, data conventions, and mutation patterns.
3. Inspect the Xizot components you plan to use.
4. Map product requirements to components before editing.
5. Run a design-theory check: color role, layout structure, typography hierarchy, UX states, and system boundary.
6. Implement with existing primitives and semantic tokens.
7. Verify build/type/lint commands that are relevant and affordable.

## Required References

Always read:

- [component-usage.md](component-usage.md)
- [craft-floor.md](craft-floor.md)

Read when relevant:

- [color.md](color.md) for color, status, charts, contrast, or palette work
- [layout.md](layout.md) for grid, spacing, density, alignment, or responsive structure
- [typography.md](typography.md) for hierarchy, labels, table scanning, or readable density
- [ux-psychology.md](ux-psychology.md) for forms, wayfinding, feedback, and cognitive load
- [system.md](system.md) for new components, variants, tokens, or extraction decisions

## Product Surface Blueprint

For list/CRUD screens:

- Page header with title, concise context, and primary action.
- Toolbar with search, filters, refresh, and secondary actions.
- `DataTable` for sortable/filterable/paginated data.
- Pinned `actions` column when row actions exist.
- Dialog/sheet/drawer for create, edit, detail, and confirm flows.
- Toast feedback after mutations.
- Empty state for no data and no results.

For form screens:

- `react-hook-form` plus `RHF*` wrappers when applicable.
- `FieldGroup` sections for related fields.
- Inline validation errors.
- Footer actions with primary submit and secondary cancel.
- Loading and disabled states during submit.

For dashboards:

- Compact metric regions with useful comparisons.
- Charts only when the data relationship benefits from a chart.
- Tables/lists for actionable records.
- Per-region loading and empty states.

## Design-Theory Gate

Before editing, answer internally:

- What should color communicate here?
- What layout structure makes the workflow scannable?
- What is the type hierarchy from page title to metadata?
- Which states prevent user confusion or data loss?
- Is this a screen composition, feature component, or design-system change?

## Avoid

- Rebuilding primitive buttons, inputs, selects, dialogs, menus, or tables locally.
- Adding animation, imagery, or decorative cards before the workflow works.
- Copying patterns from unrelated UI kits.
- Adding guide pages as part of ordinary product UI build work.
