# Layout And Spacing

Use this for `layout`, spacing, grid, alignment, density, rhythm, and responsive structure.

Good layout makes the interface understandable before the user reads every label. Use spacing to group related things, separate unrelated things, and reveal priority.

## Layout Order

1. Identify the primary workflow.
2. Put the highest-frequency action and information in the most stable location.
3. Choose a structure: page header, toolbar, content region, side panel, modal, or dashboard grid.
4. Establish spacing rhythm before adding decoration.
5. Test wrapping and overflow with realistic long content.

## Density Defaults

For product/admin UI:

- Page shells: compact header plus working surface.
- Toolbars: `gap-2` or `gap-3`, wrap on small widths.
- Forms: `gap-4` within sections, `gap-6` between major groups.
- Tables: preserve scan density; avoid oversized row padding unless content is complex.
- Panels/dialogs: stable header, scrollable body, footer actions.

Use the form size tokens through component props where available. Default control size is `md`; use `sm` for dense toolbars/tables and `lg` only for prominent standalone forms or landing-like surfaces.

## Grid And Alignment

- Use grid for two-dimensional layout, flex for single-axis alignment.
- Align labels, values, and actions consistently across repeated rows.
- Use `min-w-0` inside flex/grid children that contain text.
- Use `minmax(0, 1fr)` or responsive columns to prevent overflow.
- Avoid centering large operational layouts when left alignment improves scanning.

## Visual Grouping

Prefer grouping by proximity, alignment, and surface tone:

- Related controls stay close.
- Section changes get more space than item changes.
- A border or muted background can separate dense regions.
- A card is not required for every group.
- Never put cards inside cards for ordinary page sections.

## Responsive Behavior

- Mobile: stack major regions, keep primary action reachable, let toolbars wrap.
- Tablet: preserve two-column forms only when labels and controls remain readable.
- Desktop: use width to show context, not to spread everything thin.
- Tables: keep key identity columns visible and actions reachable; use horizontal scroll or responsive detail patterns when needed.

## Anti-Patterns

- Equal spacing between unrelated and related items.
- Toolbar controls jumping around between breakpoints.
- Long text forcing buttons, badges, or table cells wider than the viewport.
- Decorative wrappers that add padding without clarifying grouping.
- Empty whitespace that pushes the actual task below the fold.
