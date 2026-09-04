---
name: xizot-visual-polish
description: 'Use when refining visual polish in Xizot React/Next.js UI: spacing contrast, shadow/elevation, border treatment, radius, surface layering, depth, icon sizing, alignment details, visual hierarchy, and avoiding flat or overdecorated interfaces.'
metadata:
  version: 0.1.0
---

# Xizot Visual Polish

Use this skill when a UI technically works but still feels flat, amateur, cluttered, or visually unresolved. It distills practical visual refinement patterns commonly associated with Refactoring UI-style work into Xizot's token/component system.

## Required Reference

Read [references/spacing-shadow-depth.md](references/spacing-shadow-depth.md) before changing shadows, borders, surface layering, radius, spacing contrast, cards, panels, toolbars, or dense visual hierarchy.

## Principles

- Use hierarchy contrast, not random decoration.
- Spacing must show relationships: tight inside groups, larger between groups.
- Shadows imply elevation; borders imply containment; do not use both heavily by default.
- Small details compound: alignment, icon size, text tone, border contrast, and hover states matter.
- Xizot app UI should feel refined but restrained.

## Hard Bans

- No heavy generic SaaS card shadows across the whole page.
- No nested cards just to create depth.
- No giant radius mismatch with system controls.
- No border/shadow/color stack when one signal is enough.
- No visual polish that breaks accessibility or responsive behavior.
