# Motion Principles

## Motion Jobs

Motion should do one of these jobs:

- confirm an action
- show continuity between states
- direct attention to a changed region
- make loading or pending state understandable
- support spatial relationship for overlays

If motion has no job, remove it.

## Timing

- Micro feedback: fast and subtle.
- Overlay open/close: short enough to feel responsive.
- Loading: stable and calm, not attention-seeking.
- Repeated lists/tables: avoid per-row animation unless it communicates insertion/removal.

## Accessibility

- Avoid flashing, bouncing, or constant motion.
- Respect reduced-motion patterns when custom CSS is added.
- Do not rely on motion as the only state cue.

## Xizot UI Rules

- Use component states and existing animation utilities first.
- Keep hover/focus transitions consistent with components.
- Do not add page-level animated heroes to operational screens.
- Skeletons and spinners should preserve layout and communicate pending state.
