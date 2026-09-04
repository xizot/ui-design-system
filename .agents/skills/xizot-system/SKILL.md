---
name: xizot-system
description: 'Use when strengthening the Xizot design system itself: tokens, component API boundaries, variants, composition layers, package/install behavior, agent rules, and deciding whether UI belongs in a feature, app shared layer, or design-system layer.'
metadata:
  version: 0.1.0
---

# Xizot System

Use this skill when the task is about making the design system stronger, not just making one screen prettier.

## Core Model

A strong system has clear layers:

- **Tokens:** color, radius, spacing, typography, focus, chart, and semantic state decisions.
- **Primitives:** buttons, inputs, labels, overlays, menus, table pieces.
- **Compositions:** data table, panel variants, RHF wrappers, input groups, badge groups.
- **Feature components:** domain-specific flows built from system parts.
- **Screens:** route-level layout and data orchestration.

Keep domain behavior out of generic primitives. Keep generic behavior out of feature-only copies.

## Required Reference

Read [references/system-governance.md](references/system-governance.md) before adding tokens, variants, reusable components, package files, or installer behavior.

## Default Decisions

- Add a token only when a semantic role repeats across screens or components.
- Add a variant only when it represents a reusable state or visual role.
- Extract to design-system only when the composition is product-neutral.
- Use `className` for layout escape hatches, not for replacing component visuals.
- Keep skill guidance under `.agents/skills`; do not split it into `/docs`.
