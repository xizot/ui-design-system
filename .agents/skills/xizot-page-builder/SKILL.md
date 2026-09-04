---
name: xizot-page-builder
description: "Use when building complete React/Next.js pages with Xizot design-system components. Orchestrates component choice, color, layout, typography, UX states, responsive behavior, and system boundaries for modern production app screens."
metadata:
  version: 0.1.0
---

# Xizot Page Builder

Use this skill for end-to-end page implementation. It coordinates the specialized skills: `xizot-design-system`, `xizot-color`, `xizot-layout`, `xizot-typography`, `xizot-ux`, `xizot-accessibility`, `xizot-interaction`, `xizot-forms`, `xizot-data-ui`, `xizot-wayfinding`, `xizot-motion`, `xizot-responsible-ux`, `xizot-visual-polish`, `xizot-quality`, and `xizot-system`.

## Required Reference

Read [references/page-build-gate.md](references/page-build-gate.md) before implementing a complete page.

## Build Order

1. Identify the workflow and screen type.
2. Inspect nearby screens and actual Xizot component APIs.
3. Shape the page skeleton.
4. Choose components.
5. Decide color roles.
6. Decide layout/spacing rhythm.
7. Decide typography hierarchy and copy density.
8. Add UX states, accessibility, wayfinding, interaction feedback, and error prevention.
9. Check forms, data/table behavior, overlays, and responsive accessibility where relevant.
10. Decide spacing contrast, shadow/elevation, border treatment, radius, and surface depth.
11. Decide whether motion clarifies state or should be omitted.
12. Check responsible UX for destructive, permission, consent, or recovery flows.
13. Confirm system boundary: screen, feature component, shared component, or design-system component.
14. Implement, run the visual polish and quality gates, and verify.

## Hard Rule

Do not create a visually impressive page that bypasses the system. A strong Xizot page is useful, consistent, responsive, accessible, and built from the local components.




