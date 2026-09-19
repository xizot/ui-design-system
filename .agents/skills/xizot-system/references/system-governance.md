# System Governance

This reference distills design-system theory for Xizot's React component library.

## Token Governance

- Tokens should encode roles, not raw preferences.
- Semantic tokens beat palette tokens in feature code.
- Every light token change needs its dark-mode counterpart.
- OKLCH values should preserve readable contrast and consistent perceived intensity.
- Do not add aliases that mean the same thing as existing tokens.

## Component Contract

A component API should expose intent:

- `variant` for semantic visual role
- `size` for density and control scale
- `loading`, `disabled`, `error`, `required` for owned states
- `items`, `value`, `onValueChange` for controlled interaction
- `className` for contextual layout only

Avoid APIs that leak implementation details or force consumers to remember class recipes.

## Variant Rules

Add a variant only when:

- the role appears in more than one place
- the name is product-neutral
- the state works in light and dark mode
- the variant reduces repeated class combinations
- the variant does not encode domain meaning

## Extraction Ladder

1. Keep one-off UI local.
2. Extract repeated domain UI into the feature folder.
3. Promote cross-feature domain UI to app shared components.
4. Promote product-neutral repeated interaction to the design-system layer. In package mode, implement library changes in its source repository and install a new revision; never edit node_modules.

Do not extract just because a file is long. Extract because the boundary clarifies ownership and reduces repeat decisions.

## Package And Installer

When skills or components must ship to consumers:

- `package.json` must include the shipped path.
- Source mode copies components; package mode installs compiled public exports. Both modes copy the complete skills/rules into local `.agents` and update the marked AGENTS section.
- Verify guidance refresh from the installed package revision, preservation of unrelated guidance, and discovery when both installations remain.
- Follow [installation modes](../../xizot-design-system/references/installation-modes.md) for source ownership and import boundaries.
- `npm pack --dry-run` must show the expected files.
- The installer should not depend on `/docs` for agent rules.
