# System

Use this for `systemize`, component governance, tokens, variants, API boundaries, agent rules, package behavior, and design-system extraction.

A stronger project is not one with more components. It is one where fewer primitives combine predictably into many screens.

## System Layers

- **Tokens:** color, radius, spacing, type, focus, chart, and semantic state decisions.
- **Primitives:** buttons, inputs, labels, overlays, menus, table pieces.
- **Compositions:** data table, panel variants, RHF wrappers, input groups, badge groups.
- **Feature components:** domain-specific flows built from system parts.
- **Screens:** route-level layout and data orchestration.

Keep responsibilities clear. Do not push domain logic into generic primitives.

## Token Governance

- Prefer semantic tokens over raw Tailwind palette classes.
- Add a token only when many components/screens need the same semantic role.
- Keep light/dark values paired.
- Use OKLCH-compatible values for perceptual consistency when editing theme files.
- Do not create token aliases that duplicate existing meaning.

## Component API Rules

Good design-system APIs expose meaning, not implementation accidents:

- `variant`, `size`, `loading`, `disabled`, `error`, `required`, `items`, `value`, and `onValueChange` are useful.
- `className` is for layout escape hatches, not restyling the component from scratch.
- RHF wrappers should preserve the visual API of the base field where practical.
- Table helpers should encode repeated behavior such as sorting/filter headers, empty state, loading state, pagination, and pinned action columns.

## Variant Rules

- Add a variant when it represents a repeated semantic role.
- Do not add variants for one-off page styling.
- Keep variant names product-neutral.
- A variant must work in light and dark mode.
- A variant should not require consumers to remember extra class combinations.

## Extraction Rules

Extract only when the pattern repeats or will clearly repeat:

- feature-local first for domain behavior
- app-shared for cross-feature domain behavior
- design-system for product-neutral behavior

Do not extract merely because a component is long. Extract because the boundary improves reuse, comprehension, and consistency.

## Agent Skill Rules

- Keep skill instructions inside `.agents/skills`, with `xizot-design-system` as the orchestrator and specialized skills beside it.
- Put downstream always-on rules in `references/agent-rules.md`.
- Keep specialized design theory in separate references so agents load only what the task needs.
- Do not move skill guidance to `/docs`.

## Package Rules

When skills change, ensure `package.json` includes `.agents/skills` and `npm pack --dry-run` shows the skill files. The CLI should install both the design-system source and the complete skill pack into consumer projects.
