---
name: xizot-motion
description: "Use when adding, auditing, or reducing UI motion in Xizot React/Next.js interfaces: transitions, loading feedback, hover/focus response, dialog/sheet animation, skeletons, charts, and avoiding distracting or inaccessible motion."
metadata:
  version: 0.1.0
---

# Xizot Motion

Use motion only when it clarifies state, continuity, feedback, or attention. Motion should make the interface easier to follow, not more theatrical.

## Required Reference

Read [references/motion-principles.md](references/motion-principles.md) before adding custom animation, transition timing, animated loading, chart motion, or page-level transitions.

## Defaults

- Prefer built-in component transitions and `tw-animate-css` utilities already in the system.
- Use short, subtle transitions for hover/focus/open/close feedback.
- Respect reduced motion when custom animation is introduced.
- Do not animate dense tables in ways that harm scanning.
