# Color

Use this for `colorize`, palette decisions, contrast, status tones, charts, and visual emphasis.

This design system uses semantic Tailwind tokens backed by OKLCH variables. Work with those tokens first; do not introduce raw color palettes in feature code.

## Decision Order

1. Define the color job: brand emphasis, action priority, status, data category, selection, warning, or surface separation.
2. Check existing tokens and style presets before adding or changing color.
3. Use value contrast first: background, border, text weight, spacing, and hierarchy usually solve more than hue.
4. Add hue only where it improves meaning or scanning.
5. Verify light and dark mode.

## Token Rules

- Primary action: `bg-primary text-primary-foreground` through `Button` default variant.
- Secondary action: `variant="outline"`, `variant="secondary"`, or `variant="ghost"`.
- Destructive action: `variant="destructive"`, `text-destructive`, or `bg-destructive/10` depending on severity.
- Passive surfaces: `bg-background`, `bg-card`, `bg-popover`, `bg-muted`.
- Lines: `border-border`, `border-input`.
- Focus: `ring-ring`, component focus variants, and existing ring styles.

## Status Color

Status color should be semantic and sparse:

- Success: use a small green/emerald accent only when success needs immediate recognition.
- Warning: use amber/yellow only for recoverable risk or pending attention.
- Error/destructive: use `destructive` tokens for failure, deletion, blocking errors, or danger.
- Neutral: use `secondary`, `outline`, `muted`, or `Marker` for passive states.
- Info: prefer primary/accent only if the state is actionable or selected.

Do not create a unique color for every status. Reuse tone families and distinguish with text/icons when needed.

## Data Visualization

- Use `chart-1` through `chart-5` before custom chart colors.
- Order chart colors by importance, not decoration.
- Avoid using red/green as the only difference when comparison matters.
- Labels and tooltips must carry meaning; color alone is not enough.
- For operational dashboards, charts should answer a decision question, not fill space.

## Palette Strength

For app UI, prefer tinted neutrals plus one controlled accent. The current presets include neutral/default and hue presets such as blue, cyan, teal, emerald, green, and amber. Choose a preset because it matches product tone, not because the screen feels empty.

Avoid:

- gradients as default surfaces
- purple/blue SaaS gradients by habit
- gray text on colored backgrounds without contrast checks
- low contrast muted text inside badges, cards, or tables
- decorative color blobs
- one-off hex colors in feature code

## Contrast And Accessibility

- Body and table text must stay high contrast against the surface.
- Muted text is for secondary information, not primary labels or required actions.
- Destructive text on tinted destructive background must remain readable in dark mode.
- Do not rely on color alone for validation, active filters, selected rows, or destructive action.

## When To Change Tokens

Change global tokens only when the product visual direction changes across many surfaces. For a single screen, use existing tokens and component variants. If a token change is necessary, update the preset/theme source, not scattered feature classes.
