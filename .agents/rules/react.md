# React implementation rules

Apply to new or changed React code, in the library and consumers. Explicit user requirements and verified source/caller contracts govern the change. Preserve unrelated code and public names; do not migrate files merely for consistency.

## Naming and readability

- Use kebab-case files/folders, PascalCase components/types, `useXxx` hooks and meaningful camelCase functions. Preserve framework filenames, generated code and existing public contracts.
- Name callback props `onXxx` and local handlers `handleXxx`. Boolean names communicate state, existence or capability (`is`, `has`, `can`, `should`); do not rename established component props such as `loading` or `disabled`.
- Use SCREAMING_SNAKE_CASE for static constants; `const` alone does not make a local value a static constant. Schema names follow active project conventions.
- Use `<ComponentName>Props` for two or more props or a structured/callback-heavy prop. Keep hooks before early returns, related declarations together, and blank lines between independent functions/types. Follow the local formatter.

## Types and boundaries

- Reuse existing domain/types directly with `import type` where appropriate. Do not create meaningless primitive aliases or aliases that only rename an existing type. Deliberate branded types and compatibility exports need an actual contract.
- Optional properties/access reflect real absence. Inspect types, schemas, data boundaries and consumers instead of probing guessed names such as `id ?? Id ?? ID` or fabricating fallback names/statuses.
- Validate unsafe input at its boundary (API JSON, storage, URL, untyped integration), then trust the validated type downstream. A TypeScript annotation alone does not validate external data. Do not add repeated guards/coercions merely because the agent is uncertain.
- Keep form values distinct from API payloads when their semantics differ; schema-derived types can stay beside the schema. Fix contract mismatches at their owner within scope, not through `any`, double casts, suppressions or fake successful/empty results.
- Inspect active usage before choosing dependencies, helpers or state libraries. Being installed does not establish a preferred architecture.

## React behavior

1. Identify the component hierarchy, visual states and state owner before editing. Start with the render structure; add interactions to that structure.
2. Keep only changing values in state, at the closest coordinating parent. Derive lists, labels, totals and disabled flags during render. Keep controlled inputs under one owner.
3. Handle user actions in event handlers. Effects synchronize with external systems; do not use them to derive data or mirror props into state. For a new entity, use an explicit reset event or keyed subtree according to the required preserve/reset behavior.
4. Include reactive Effect dependencies and cleanup. Fetching must handle failure and stale responses/aborts. Use the existing data layer when present; do not suppress dependency warnings.
5. Treat props/state as immutable. Refs hold DOM handles, timers and non-rendering mutable values; never use them as hidden render state. Hooks run at the top level.
6. Keep domain transformations in feature code. Extract shared behavior when semantics repeat; do not create passthrough wrappers solely to reduce line count, speculative configuration layers or generic service hierarchies for a UI task. Memoization needs a cost or identity reason.
7. Submitted product forms use React Hook Form and existing RHF wrappers. Search/filter state may be local or URL-based. Explicit user choices and existing native/server-action contracts are exceptions; see the forms skill.

For new or relocated feature files, read [feature ownership](../skills/xizot-design-system/references/feature-structure.md). Shared Xizot components retain the library's existing `components/`, `hooks/`, `lib/` and `constants/` owners.

Review changed code against these rules. Run scoped lint/types and test the changed behavior. A regex scan cannot validate state ownership or Effect correctness.
