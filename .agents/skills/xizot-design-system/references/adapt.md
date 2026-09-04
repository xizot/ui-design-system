# Adapt Command

Use to fix responsive behavior while preserving the current concept.

## Viewports

Check at least:

- mobile narrow layout
- tablet or medium layout when sidebars/tables/forms are present
- desktop layout

## Patterns

- Toolbars may wrap into multiple rows.
- Primary actions should remain reachable.
- Tables should preserve action access and avoid unreadable squeezed cells.
- Dialogs and sheets need scrollable bodies and stable footers.
- Dense cards or metric grids should collapse into one or two columns.
- Avoid viewport-based font scaling.

## Fixes

Prefer responsive grid tracks, `minmax`, `min-w-0`, `max-w-*`, wrapping, truncation, and overflow regions. Do not solve layout bugs by shrinking text below readable sizes.
