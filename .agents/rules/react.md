# React implementation rules

Apply to React components and hooks. Existing source types and caller behavior are authoritative.

1. Identify the component hierarchy, visual states and state owner before editing. Start with the render structure; add interactions to that structure.
2. Keep only changing values in state, at the closest coordinating parent. Derive lists, labels, totals and disabled flags during render. Keep controlled inputs under one owner.
3. Handle user actions in event handlers. Effects synchronize with external systems; do not use them to derive data or mirror props into state. For a new entity, use an explicit reset event or keyed subtree according to the required preserve/reset behavior.
4. Include reactive Effect dependencies and cleanup. Fetching must handle failure and stale responses/aborts. Use the existing data layer when present; do not suppress dependency warnings.
5. Treat props/state as immutable. Refs hold DOM handles, timers and non-rendering mutable values; never use them as hidden render state. Hooks run at the top level.
6. With two or more props, define a named props type/interface near the component. Do not export renamed aliases of existing types. Read API fields before using them; optional access and defaults require a real missing-data case. Do not silence errors with `any`, double casts or suppression.
7. Keep domain transformations in feature code. Extract shared behavior when semantics repeat; do not create one-use wrappers, speculative configuration layers or generic service hierarchies for a UI task.
8. Submitted product forms use React Hook Form and existing RHF wrappers. Search/filter state may be local or URL-based. Explicit user choices and existing native/server-action contracts are exceptions; see the forms skill.

Review changed code against these rules. Run scoped lint/types and test the changed behavior. A regex scan cannot validate state ownership or Effect correctness.
