# react implementation rules

Apply these rules to every React component, hook, form, and page.

## design before code

- Break the screen into a component hierarchy. Keep one coherent responsibility per component and split components when that responsibility grows.
- List visual states before implementation: initial, empty, loading, submitting, success, error, disabled, permission denied, and partial data when applicable.
- Build the static version from the data model and props first. Add interaction after the render structure and boundaries are clear.
- Keep data flow explicit and one-way: parents own shared data, children receive props, and children send events upward.
- Model interactions as state transitions from human inputs and async/system inputs. Render declaratively from state instead of imperatively manipulating the DOM.

## state

- State is only changing information the component must remember. Do not store constants, props, or values calculable from props/state.
- Derive filtered arrays, counts, labels, validation flags, and disabled conditions during render. Do not mirror them with `useState` and `useEffect`.
- Remove redundant, duplicated, and contradictory state. Prefer a constrained status such as `idle | loading | success | error` over impossible boolean combinations.
- Group values that always update together, keep state reasonably flat, and avoid deeply nested state.
- Treat props and state as immutable. Replace objects/arrays and use functional updates when the next value depends on the previous value.
- Keep state at the closest common parent of all consumers that must coordinate it. Lift state deliberately.
- Decide reset/preserve behavior explicitly. Use stable component positions to preserve state and deliberate keys or controlled resets when identity changes.
- Keep controlled components driven by one source of truth. Do not maintain competing local and parent values for the same input.

## state tools

- Start with `useState` for local simple state. Use `useReducer` when transitions are numerous, related, or difficult to keep consistent; reducers must be pure and actions explicit.
- Use Context only for values genuinely needed by distant descendants. Do not use it to hide ordinary prop flow or unclear ownership.
- Keep shared Context values focused, with stable actions and a clear provider owner.
- Keep event handlers responsible for human actions and state transitions; keep render logic responsible for describing the current UI.
- Extract a reducer when it makes valid transitions and impossible states explicit; do not introduce a reducer or Context only for abstraction.
- Extract a custom Hook only to share stateful behavior and its effects. A custom Hook shares logic, not state; each caller still owns its own state unless a shared owner is intentional.

## effects and escape hatches

- Use an Effect only to synchronize React with an external system: DOM/browser APIs, timers, subscriptions, network synchronization, third-party widgets, or analytics.
- Do not use an Effect to transform render data, respond to clicks/submits, initialize derived state, or synchronously copy props/state into another state value.
- Never create an Effect chain where one Effect sets state only to trigger the next Effect. Calculate the result in render or perform the complete transition in the originating event/reducer.
- Do not reset a whole subtree from an Effect when identity changed; give the inner component a deliberate `key`. For partial adjustments, first prefer deriving from props or storing a stable ID instead of an object selection.
- Use `useMemo` only to cache a demonstrably expensive render calculation; never use `useEffect` as a memoization mechanism.
- Code caused by a user interaction belongs in its event handler. Code caused by the component becoming visible belongs in an Effect. Initialization must be safe under development remounts and Strict Mode.
- Fetching in an Effect is valid when the query/URL is an external synchronization, but handle stale responses/abort, loading, error, and cleanup. Prefer framework or data-layer fetching when available to avoid waterfalls and missing cache/server rendering.
- Every Effect must identify its external system, include all reactive dependencies, and clean up subscriptions, connections, timers, or in-flight work when needed.
- Treat an Effect as a synchronization process that can start, stop, and restart when dependencies change, not as a component lifecycle callback.
- Separate non-reactive event logic from reactive synchronization. Do not suppress the dependency linter to control reruns.
- Each Effect should represent one independent synchronization process. Keep analytics, subscriptions, connections, and unrelated notifications in separate Effects when their triggers differ.
- Props, state, context values, and variables/functions created inside the component are reactive. Include every reactive value read by an Effect; an empty dependency list is correct only when no reactive value is read.
- If a dependency causes unwanted re-synchronization, restructure the code: move stable values outside the component, move logic into an event handler, split the synchronization, or use `useEffectEvent` for non-reactive callback logic when supported by the project.
- Never suppress `react-hooks/exhaustive-deps` to force stale behavior. Suppression hides stale closures and future dependency bugs.
- Prefer refs for DOM nodes, timer IDs, and mutable values that do not affect rendering. Do not use refs as a second state store.
- Never read or write `ref.current` during render when the value affects JSX. Read refs in event handlers or effects; use state for anything that must render.
- Use refs to access DOM nodes for focus, scroll, measure, or an external widget. Do not call Hooks inside loops or `map`; use a ref callback/Map for dynamic lists.
- Let React own the DOM. Direct DOM mutation is an exception limited to parts React does not manage, and must not conflict with React’s rendered output.
- When an Effect’s dependency list is wrong, restructure the code or separate reactive and non-reactive logic. Do not omit dependencies, disable the linter, or rely on object/function identity by accident.
- Custom Hooks should expose a focused domain API and hide synchronization details; they must not become a generic dumping ground for unrelated logic.

## types and contracts

- When a component has two or more props, define a named props type or interface near the component. Do not declare the props object type inline in the parameter list.
- Do not export a renamed type alias such as `export type NewName = ExistingName`. Reuse the original type or define a real public contract.
- Read the source type, API schema, and caller before accessing a field. Do not guess with `?.name`, `?.Name`, `?.Names`, or similar speculative optional chaining.
- Use optional access only when the contract permits absence. Avoid broad fallback chains; every fallback needs a documented missing-data case and explicit domain default.
- Keep props, state, reducer actions, context values, and server responses typed at their boundaries. Do not use `any`, broad casts, or guessed fields to silence errors.
