---
name: xizot-color
description: "Use when choosing, auditing, or improving UI color for React/Next.js surfaces using the Xizot design system. Covers palette role, OKLCH tokens, semantic status tones, contrast, dark mode, chart colors, and avoiding decorative or inconsistent color."
metadata:
  version: 0.1.0
---

# Xizot Color

Use this skill to make color decisions stronger and more systematic. Color must communicate meaning, not just decorate the screen.

## Workflow

1. Identify the color job: action priority, selected state, status, alert, grouping, brand emphasis, or chart category.
2. Inspect existing theme tokens and style presets before adding color.
3. Prefer semantic tokens and component variants over raw color classes.
4. Check contrast in light and dark mode.
5. Keep the palette small enough that status, action, and hierarchy remain obvious.

Read [references/color-decision-model.md](references/color-decision-model.md) for the full decision model.

## Xizot Defaults

- Primary action: `Button` default variant.
- Secondary action: `outline`, `secondary`, or `ghost` variants.
- Destructive: `destructive` variant and `destructive` tokens.
- Passive surfaces: `background`, `card`, `popover`, `muted`.
- Data visualization: `chart-1` through `chart-5` first.

## Hard Bans

- No one-off hex colors in feature code.
- No decorative gradients or blobs in app UI.
- No color-only state indication.
- No unique color for every status.
- No muted text for primary data.
