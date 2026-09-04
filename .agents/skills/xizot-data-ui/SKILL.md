---
name: xizot-data-ui
description: 'Use when building or auditing data-heavy Xizot screens: tables, lists, dashboards, filters, pagination, sorting, row selection, pinned actions, empty/loading/error states, charts, status badges, and operational scan density.'
metadata:
  version: 0.1.0
---

# Xizot Data UI

Use this skill for operational screens where users scan, compare, filter, and act on records.

## Required Reference

Read [references/data-ui-patterns.md](references/data-ui-patterns.md) before building tables, dashboards, list pages, status displays, or chart-heavy regions.

## Defaults

- Use `DataTable` for sortable/filterable/paginated list pages.
- Use pinned `actions` column for row actions.
- Keep filters visible and resettable.
- Use concise badges for status.
- Provide loading, empty, no-results, and error states.
