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

## state tools

- Start with `useState` for local simple state. Use `useReducer` when transitions are numerous, related, or difficult to keep consistent; reducers must be pure and actions explicit.
- Use Context only for values genuinely needed by distant descendants. Do not use it to hide ordinary prop flow or unclear ownership.
- Keep shared Context values focused, with stable actions and a clear provider owner.
- Keep event handlers responsible for human actions and state transitions; keep render logic responsible for describing the current UI.

## effects and escape hatches

- Use an Effect only to synchronize React with an external system: DOM/browser APIs, timers, subscriptions, network synchronization, third-party widgets, or analytics.
- Do not use an Effect to transform render data, respond to clicks/submits, initialize derived state, or synchronously copy props/state into another state value.
- Every Effect must identify its external system, include all reactive dependencies, and clean up subscriptions, connections, timers, or in-flight work when needed.
- Treat an Effect as a synchronization process that can start, stop, and restart when dependencies change, not as a component lifecycle callback.
- Separate non-reactive event logic from reactive synchronization. Do not suppress the dependency linter to control reruns.
- Prefer refs for DOM nodes, timer IDs, and mutable values that do not affect rendering. Do not use refs as a second state store.

## types and contracts

- When a component has two or more props, define a named props type or interface near the component. Do not declare the props object type inline in the parameter list.
- Do not export a renamed type alias such as `export type NewName = ExistingName`. Reuse the original type or define a real public contract.
- Read the source type, API schema, and caller before accessing a field. Do not guess with `?.name`, `?.Name`, `?.Names`, or similar speculative optional chaining.
- Use optional access only when the contract permits absence. Avoid broad fallback chains; every fallback needs a documented missing-data case and explicit domain default.
- Keep props, state, reducer actions, context values, and server responses typed at their boundaries. Do not use `any`, broad casts, or guessed fields to silence errors.
