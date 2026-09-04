---
name: xizot-layout
description: "Use when planning, building, or auditing UI layout with the Xizot design system. Covers grid, spacing, density, alignment, grouping, responsive behavior, rhythm, forms, tables, dashboards, panels, and avoiding cluttered or generic AI layouts."
metadata:
  version: 0.1.0
---

# Xizot Layout

Use this skill to make product screens feel structured, calm, and professional. Layout should reveal workflow priority before color or decoration is added.

## Workflow

1. Identify the primary task and highest-frequency action.
2. Pick the screen structure: header, toolbar, data region, form, side panel, dialog, dashboard grid.
3. Group related controls by proximity and alignment.
4. Use spacing rhythm deliberately: tighter inside groups, looser between groups.
5. Test long content and narrow viewports.

Read [references/layout-framework.md](references/layout-framework.md) for detailed layout rules. For spacing contrast, shadow, border, radius, and depth decisions, use `xizot-visual-polish`.

## Xizot Bias

Most app UI should be dense but breathable: `gap-2`, `gap-3`, `gap-4`, `p-3`, `p-4`, stable control sizes, restrained panels, subtle borders/shadows, and no nested cards.

## Hard Bans

- No landing hero for operational screens.
- No cards inside cards for ordinary page sections.
- No viewport-scaled typography.
- No toolbar layout that breaks primary actions on mobile.
- No spacing that makes related items look unrelated.

