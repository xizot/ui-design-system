# Layout Framework

This reference distills grid, spacing, and visual hierarchy practice for Xizot UI work.

## Spatial Hierarchy

Users read structure from space before they read text:

- Items close together feel related.
- Aligned items feel comparable.
- Larger gaps signal a new section.
- Consistent rhythm makes complex screens feel simpler.

Use these before adding borders, cards, or color.

## Screen Skeletons

List page:

- header with title and primary action
- toolbar with search/filter controls
- table/list region
- pagination or summary region
- dialog/sheet for mutation

Form page:

- title/context
- grouped fields
- inline validation
- stable footer actions

Dashboard:

- small number of meaningful metrics
- charts tied to decisions
- tables/lists for follow-up action

## Spacing Scale

- `gap-1` and `gap-1.5`: icon/text pairs, compact badges.
- `gap-2`: toolbar buttons, inline controls.
- `gap-3`: form rows, filter groups, compact panels.
- `gap-4`: sections inside cards/panels, dashboard groups.
- `gap-6+`: major page sections only.

## Responsive Rules

- Use `min-w-0` for text inside flex/grid.
- Use `minmax(0, 1fr)` for flexible tracks.
- Let toolbars wrap; keep primary actions reachable.
- Dialog bodies scroll while headers/footers stay usable.
- Tables preserve identity and actions; use horizontal scroll only when needed.

## Density Rules

Dense UI is not cramped UI. It means repeated controls and data are close enough to scan while retaining clear grouping and hit targets.

Use `sm` controls in dense tables/toolbars; use `md` as default; use `lg` only for low-density or high-prominence surfaces.
