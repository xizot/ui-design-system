# React implementation rules

Apply to new or changed React code, in the library and consumers. Explicit user requirements and verified source/caller contracts govern the change. Preserve unrelated code and public names; do not migrate files merely for consistency. Read application-owned coding conventions when they exist; resolve conflicts against explicit user requirements and verified local contracts.

## Discover before creating

- Inspect the owning feature/use case, nearby callers, public exports, schemas, API contracts, shared helpers and existing UI before adding a type, component, hook, utility or dependency. An installed package or generic framework example does not establish a project pattern.
- Name the owner and responsibility of new code. Unclear contracts require more source discovery; do not turn uncertainty into optional fields, guessed property-name fallbacks, speculative runtime guards, duplicate types or new abstractions.
- New application feature placement follows [feature architecture](../skills/xizot-design-system/references/feature-structure.md). Keep existing routes, imports and data-layer conventions when editing an established feature.

## Naming and readability

- Use kebab-case files/folders, PascalCase components/types, `useXxx` hooks and meaningful camelCase functions. Preserve framework filenames, generated code and existing public contracts.
- Name callback props `onXxx` and local handlers `handleXxx`. Boolean names communicate state, existence or capability (`is`, `has`, `can`, `should`); do not rename established component props such as `loading` or `disabled`.
- Use SCREAMING_SNAKE_CASE for static constants; `const` alone does not make a local value a static constant. Schema names follow active project conventions.
- Use `<ComponentName>Props` for two or more props or a structured/callback-heavy prop. Keep hooks before early returns, related declarations together, and blank lines between independent functions/types. Follow the local formatter.
- Prefer concrete names that describe domain responsibility over `Wrapper`, `Content`, `processData` or `getValue`. Preserve existing public DTO/enumeration names and domain terms. Prefer `type` for new local shapes; use `interface` where extension or a public contract warrants it.
- Organize a component as hooks, local state, derived values, handlers and return. Use clear loading, missing-data and error branches where applicable instead of deeply nested ternaries. Keep small related markup together; extract a named component for a substantial region or independent behavior.

## Types and boundaries

- Reuse existing domain/types directly with `import type` where appropriate. Do not create meaningless primitive aliases or aliases that only rename an existing type. Deliberate branded types and compatibility exports need an actual contract.
- Optional properties/access reflect real absence. Inspect types, schemas, data boundaries and consumers instead of probing guessed names such as `id ?? Id ?? ID` or fabricating fallback names/statuses.
- Validate unsafe input at its boundary (API JSON, storage, URL, untyped integration), then trust the validated type downstream. A TypeScript annotation alone does not validate external data. Do not add repeated guards/coercions merely because the agent is uncertain.
- Keep form values distinct from API payloads when their semantics differ; schema-derived types can stay beside the schema. Fix contract mismatches at their owner within scope, not through `any`, double casts, suppressions or fake successful/empty results.
- Inspect active usage before choosing dependencies, helpers or state libraries. Being installed does not establish a preferred architecture.
- Trust a confirmed type after validation at the unsafe boundary. Avoid repeated coercion, `Array.isArray` checks or truthiness checks that mask uncertainty about a known contract. Optional chaining and fallbacks must reflect actual nullability and product behavior.

## Errors and reuse

- Inspect the project's request wrapper, interceptors and comparable flows before adding try/catch, logging, toasts, redirects or fallback results. A resolved promise does not by itself prove a mutation succeeded. Keep error feedback and recovery with their established owner.
- Reuse existing formatters, label maps, request builders, UI compositions and store factories when semantics match. A new abstraction should improve ownership, behavior or readability; do not add passthrough hooks, one-line wrappers or shared code for hypothetical reuse.
- Keep feature internals private. Export only required entries through a public index, prefer explicit named exports and avoid wildcard exports that conceal dependency cycles. Match the project's import grouping and alias conventions.

## React behavior

1. Identify the component hierarchy, visual states and state owner before editing. Start with the render structure; add interactions to that structure.
2. Keep only changing values in state, at the closest coordinating parent. Derive lists, labels, totals and disabled flags during render. Keep controlled inputs under one owner.
3. Handle user actions in event handlers. Effects synchronize with external systems; do not use them to derive data or mirror props into state. For a new entity, use an explicit reset event or keyed subtree according to the required preserve/reset behavior.
4. Include reactive Effect dependencies and cleanup. Fetching must handle failure and stale responses/aborts. Use the existing data layer when present; do not suppress dependency warnings.
5. Treat props/state as immutable. Refs hold DOM handles, timers and non-rendering mutable values; never use them as hidden render state. Hooks run at the top level.
6. Keep domain transformations in feature code. Extract shared behavior when semantics repeat; do not create passthrough wrappers solely to reduce line count, speculative configuration layers or generic service hierarchies for a UI task. Memoization needs a cost or identity reason.
7. Submitted product forms use React Hook Form and existing RHF wrappers. Search/filter state may be local or URL-based. Explicit user choices and existing native/server-action contracts are exceptions; see the forms skill.

For new or relocated application feature files, read [feature architecture](../skills/xizot-design-system/references/feature-structure.md) and identify the use case and component boundaries before coding. Shared Xizot components retain the library's existing `components/`, `hooks/`, `lib/` and `constants/` owners.

Review changed code against these rules, including naming, props, type reuse, optionality, fallbacks, error feedback, state ownership, imports and abstractions. Resolve deviations with concrete source or contract evidence. Run scoped lint/types and test the changed behavior; report any unverified runtime behavior. A regex scan cannot validate state ownership or Effect correctness.
