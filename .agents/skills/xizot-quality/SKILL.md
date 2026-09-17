---
name: xizot-quality
description: 'Use as a final quality gate for Xizot React/Next.js UI before finishing: component fit, color, layout, typography, UX states, accessibility, responsive behavior, dark mode, copy, and production polish.'
metadata:
  version: 0.1.0
---

# Xizot Quality

Use this skill before finalizing a page, component, or polish pass.

## Required Reference

Read [references/ui-quality-gate.md](references/ui-quality-gate.md) for the final pass checklist.

## Defaults

Run core `ui-source.py review` on changed source and inspect findings in context. Review the [code contract](../xizot-design-system/references/code-contract.md) alongside the visual checklist. Submitted forms need RHF ownership, actual wrapper props, validation and async submit behavior; explain explicit exceptions.

Report changed paths, checks actually run and unresolved limitations. A heuristic scan cannot prove SOLID, accessibility or behavior. Do not suppress lint rules just to pass this gate.

A Xizot UI is done only when it is useful, consistent, accessible, responsive, state-complete, and built from local components.
