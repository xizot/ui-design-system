# Color Decision Model

This reference distills practical color theory for Xizot UI work.

## Three Color Roles

- **Functional:** primary action, danger, focus, validation, selected state.
- **Semantic:** status, priority, category, trend, risk, availability.
- **Atmospheric:** brand tone, mood, editorial emphasis. Use sparingly in product UI.

Functional and semantic roles outrank atmospheric color in app screens.

## Palette Structure

A strong product palette usually has:

- tinted neutrals for surfaces and borders
- one primary accent
- one destructive tone
- a small status set
- chart colors that can be distinguished without relying only on hue

Do not expand the palette until the product meaning demands it.

## OKLCH Reasoning

When editing theme tokens, think in OKLCH dimensions:

- Lightness controls readability and hierarchy.
- Chroma controls intensity; high chroma should be rare in dense UI.
- Hue controls identity and category.

For dark mode, do not simply invert light colors. Re-check perceived contrast, surface separation, and focus visibility.

## Status Tone Rules

- Error and destructive states need the strongest distinction.
- Warning should be used for recoverable risk, not generic pending state.
- Success should confirm completion, not decorate normal active items.
- Neutral statuses often read better than a rainbow of states.

## Contrast Rules

- Primary text must be high contrast.
- Muted text is secondary, not low-importance styling for everything.
- Text on tinted backgrounds needs stronger contrast than text on plain surfaces.
- Icons and badges must remain readable at small sizes.

## Chart Rules

- Every chart color needs a label or tooltip.
- Use ordering and shape/position in addition to color.
- Do not use red/green as the only distinction.
- Choose chart colors for comparison clarity, not brand decoration.
