# Wayfinding Model

## Orientation

Every page should answer:

- Where am I?
- What object, team, workspace, or time range am I looking at?
- What view or tab is active?
- What filters/search are changing the data?
- What can I do next?

## Navigation Roles

- Sidebar: product areas and persistent sections.
- Breadcrumb: hierarchy and current object context.
- Tabs: peer views within the same object or workflow.
- Toolbar filters: temporary data scope.
- Dialog/sheet title: the local task scope.

Do not use tabs for unrelated routes or breadcrumbs for peer view switching.

## Signage

Use consistent names across sidebar, breadcrumb, page title, empty state, and actions. If a user sees `Đơn hàng` in navigation, avoid switching to `Order` or a different Vietnamese term inside the page.

## Empty States

An empty state should reflect scope:

- no records at all
- no results for current filters
- no permission
- not configured yet
- failed to load

Each one needs different copy and next action.

## Discoverability

- Put search/filter controls before the data they affect.
- Make active filters visible or easy to clear.
- Keep primary action in a stable location.
- Do not hide critical navigation behind hover-only UI.
