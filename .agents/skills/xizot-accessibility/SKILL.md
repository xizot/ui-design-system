---
name: xizot-accessibility
description: "Use when building or auditing accessible Xizot React/Next.js UI: keyboard flow, focus management, labels, aria state, contrast, dialogs, menus, forms, tables, error messaging, and icon-only actions."
metadata:
  version: 0.1.0
---

# Xizot Accessibility

Use this skill when accessibility affects whether the UI can be operated reliably. Accessibility is part of product quality, not a final checklist decoration.

## Required Reference

Read [references/accessibility-gate.md](references/accessibility-gate.md) before editing focus behavior, forms, dialogs, menus, tables, icon buttons, loading states, or validation messages.

## Defaults

- Prefer Xizot/Base UI primitives because they carry accessible behavior.
- Preserve keyboard access and visible focus rings.
- Icon-only actions need an accessible name.
- Color cannot be the only state signal.
- Errors must be close to the affected field or region.
- Dialog/sheet/drawer flows need focus containment and clear close/cancel paths.
