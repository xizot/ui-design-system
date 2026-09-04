# Data UI Patterns

## List Page Structure

- Header: title, count/summary when useful, primary action.
- Toolbar: search, filters, refresh/export/import when relevant.
- Data region: `DataTable`, loading overlay, empty state, no-results state.
- Footer: pagination and page size controls.
- Mutation: dialog/sheet/drawer with toast feedback.

## Table Rules

- Use `DataColumnHeader` for sortable/filterable headers.
- Use column `meta.className` for width/alignment when supported.
- Use row IDs when selection or mutation depends on stable identity.
- Keep row action column id as `actions` for pinned-right behavior.
- Avoid too many columns on mobile without a scroll/detail strategy.

## Status And Badges

- Status labels must be concise.
- Use semantic tone sparingly.
- Do not assign a unique color to every status.
- Pair color with label/icon when the state matters.

## Dashboard Rules

- Metrics should answer product questions.
- Charts need labels/tooltips and a decision purpose.
- Use `chart-1` to `chart-5` before custom colors.
- Pair charts with tables/lists when users need follow-up action.

## Empty And Error States

- Empty state says what is absent.
- No-results state references filters/search.
- Error state says what failed and what can be retried.
- Loading should preserve layout when practical.
