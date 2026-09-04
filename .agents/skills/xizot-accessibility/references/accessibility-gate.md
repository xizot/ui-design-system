# Accessibility Gate

## Keyboard

- Every interactive element must be reachable by keyboard.
- Focus order should follow visual and task order.
- Do not remove focus outlines from Xizot components.
- Menus, popovers, dialogs, sheets, and drawers should rely on the system primitives for keyboard behavior.

## Names And Labels

- Icon-only buttons need `aria-label` or an equivalent accessible name.
- Inputs need visible labels or a clear label component.
- Table actions should name the target when ambiguity is likely.
- Loading indicators need useful busy state when the region is blocked.

## State

- Use `aria-invalid` through component props when available.
- Disabled controls should look and behave disabled.
- Selected, active, expanded, checked, and current states must be perceivable without color alone.
- Destructive confirmation must clearly name the destructive action.

## Contrast

- Primary text and action labels need strong contrast.
- Muted text is not for important data.
- Tinted badges and alerts need readable text in light and dark mode.

## Forms

- Place validation near the field.
- Preserve user input after errors.
- Server errors should be visible in the form, not toast-only when the error blocks completion.

## Tables

- Header labels must be meaningful.
- Row actions should remain reachable and named.
- Empty/loading states should be inside the data region they describe.
