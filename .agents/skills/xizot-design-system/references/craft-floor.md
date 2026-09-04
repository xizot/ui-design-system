# Craft Floor

Load this immediately before editing UI.

## Non-Negotiables

- Use Xizot components and semantic tokens as the default implementation surface.
- Keep app UI compact, quiet, and workflow-first.
- Build hierarchy with structure first: layout, grouping, spacing, type, weight, alignment, then color.
- Use color for meaning, status, selection, attention, and data distinction; do not use color as filler.
- Avoid generic AI design tells: giant app heroes, nested cards, decorative gradient blobs, one-color palettes, oversized rounded icon tiles, fake metrics without product meaning, and broad marketing copy inside tools.
- Use real states: loading, empty, error, disabled, selected, active filter, pagination, validation, and destructive confirmation when the workflow needs them.
- Ensure text fits in controls and repeated items at mobile and desktop widths.
- Preserve accessibility behavior from primitives: labels, focus rings, disabled states, `aria-invalid`, dialog semantics, menu semantics, and keyboard affordances.
- Do not replace a nearby established pattern for novelty.
- Do not create a parallel color scale, typography scale, spacing scale, or component variant system in feature code.

## Design-Theory Gate

Before editing UI, check five axes:

1. **System:** Which existing Xizot components/tokens should own this?
2. **Layout:** What grid, grouping, and spacing makes the workflow scannable?
3. **Typography:** What is the hierarchy from title to metadata to controls?
4. **Color:** What does each color communicate, and does it work in dark mode?
5. **UX:** What states and feedback prevent confusion, errors, or wasted effort?

## Visual Defaults

- Surface: `bg-background`, `bg-card`, `bg-popover`, `bg-muted`
- Text: `text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive`
- Borders/focus: `border-border`, `border-input`, `ring-ring`
- Density: `gap-2`, `gap-3`, `gap-4`, `p-3`, `p-4`, `px-4`, `py-3`
- Shape: `rounded-md` for controls, modest radii for panels
- Icons: lucide icons at `size-4` or `size-5` unless the component size demands otherwise

## Application UI Bias

For admin, SaaS, CRM, operations, and internal tooling, the first viewport should be the actual working interface. Use a header, toolbar, filters, table/list/form, side panel, dialog, or dashboard grid. Do not create a landing page, sales hero, oversized value prop, or decorative intro unless requested.

## Completion Check

Before finishing, verify:

- The UI uses existing components instead of duplicated primitives.
- The layout handles mobile and desktop.
- Interactive elements have clear labels or accessible names.
- Empty/loading/error states are present where data can be absent or delayed.
- Form errors and required fields are visible.
- Color choices are semantic and token-based.
- Typography hierarchy is clear without oversized app text.
- Vietnamese copy is consistent when the surrounding product is Vietnamese.
- No guide-page refactor was included unless requested.
