# Spacing, Shadow, And Depth

This reference covers the missing visual-polish layer: spacing contrast, elevation, borders, radius, surface layering, and detail work.

## Spacing Contrast

Good spacing is relational, not uniform:

- Elements inside one control group use tight spacing.
- Related fields or toolbar controls use moderate spacing.
- Major sections use noticeably larger spacing.
- Repeated list/table items should use consistent rhythm.
- If everything uses the same gap, hierarchy becomes muddy.

Practical Xizot defaults:

- Icon/text pair: `gap-1` or `gap-1.5`.
- Toolbar controls: `gap-2`.
- Form fields in a group: `gap-3` or `gap-4`.
- Panel content groups: `gap-4`.
- Major page sections: `gap-6` only when the separation is real.

Use `p-3`/`p-4` for dense app panels; avoid `p-8+` unless the screen is intentionally low-density.

## Shadow Vs Border

Pick the surface cue by purpose:

- Use **border** for contained regions that sit on the same plane.
- Use **shadow** for floating surfaces: dropdowns, popovers, dialogs, sheets, raised menus.
- Use **background tone** for subtle grouping inside dense app pages.
- Use **spacing** when grouping can be solved without a visual box.

Avoid stacking strong border + strong shadow + colored background unless the surface truly needs prominence.

## Elevation Scale

Use restrained depth:

- Base page: no shadow.
- Cards/panels in app pages: border or very subtle shadow, not both strongly.
- Popovers/menus: shadow is appropriate because they float above content.
- Dialogs/drawers/sheets: system overlay elevation is enough unless local component requires adjustment.
- Sticky table action columns: use system pinned-column shadow/gradient behavior, not custom heavy shadows.

If the UI feels flat, first improve contrast, spacing, and hierarchy before adding shadows.

## Radius

- Controls default to `rounded-md` through components.
- Badges and small elements should not look more rounded than major containers unless the component owns it.
- Do not mix `rounded-sm`, `rounded-md`, `rounded-2xl`, and fully pill shapes randomly in one region.
- Large radii make dense enterprise UI feel soft and less precise; reserve them for intentionally editorial surfaces.

## Surface Layering

Use a clear plane system:

1. Page background: `bg-background`.
2. Content panels: `bg-card` or unframed layout.
3. Muted sections: `bg-muted` for grouping or table headers.
4. Floating surfaces: `bg-popover`/overlay components with shadow.
5. Destructive/alert surfaces: semantic tone only when the message demands attention.

Do not turn every section into a card. A page can be more refined with fewer boxes.

## Detail Polish

Check small alignment details:

- Icons align with text baseline and use `size-4`/`size-5` unless component sizing dictates.
- Button groups have consistent size and variant hierarchy.
- Table action buttons are stable width and do not shift rows.
- Empty states are centered in their region, not the whole viewport by accident.
- Borders use `border-border` or `border-border/70`, not random gray classes.
- Hover states should reinforce affordance without changing layout size.

## Shadows Anti-Patterns

- Large blurry shadows on dense admin cards.
- Shadow used to separate every repeated item.
- Inner shadow or glow as decoration.
- Hover shadow that makes lists visually noisy.
- Dark-mode shadows that disappear while borders are too faint.

## Visual Polish Gate

Before finishing polish, ask:

- Did spacing clearly separate groups and sections?
- Is depth used only where a surface floats or needs prominence?
- Could a border or background tone replace a shadow?
- Are radius choices consistent with Xizot controls?
- Are small details aligned and stable at mobile and desktop widths?
