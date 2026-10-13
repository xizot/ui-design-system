# react implementation rules

Apply these rules to every React component, hook, form, and page in both installation modes. Resolve source ownership and imports using [installation modes](../skills/xizot-design-system/references/installation-modes.md); the React policy is the same for source and package.

## [thinking in react](https://react.dev/learn/thinking-in-react)

- Break the UI into a component hierarchy with one coherent responsibility per component.
- List visual states before implementation, then build the static version from the data model and props before adding interaction.
- Keep data flow one-way: parents own shared data, children receive props, and children send events upward.
- Store only minimal changing data. Derive filtered arrays, counts, labels, validation flags, and disabled conditions during render.

## [managing state](https://react.dev/learn/managing-state)

- Model every interaction as declarative visual states and explicit transitions from human or system inputs.
- Remove redundant, duplicated, and contradictory state. Prefer a constrained status such as `idle | loading | success | error` over impossible boolean combinations.
- Group values that always update together, keep state reasonably flat, and avoid deeply nested state.
- Treat props and state as immutable. Replace objects/arrays and use functional updates when the next value depends on the previous value.
- Keep state at the closest common parent of all consumers that must coordinate it. Keep controlled components driven by one source of truth.
- Decide reset/preserve behavior explicitly. Use stable positions to preserve state and deliberate `key` values when identity changes should reset a subtree.

## [escape hatches](https://react.dev/learn/escape-hatches)

- Most application logic must stay in React’s declarative data flow. Use escape hatches only when React must communicate with an external system.
- Prefer state for information used by rendering and refs for mutable information that does not affect rendering.
- Keep refs rare and focused on browser APIs, DOM nodes, timer IDs, or external objects. Do not use refs as a second state store.
- Use custom Hooks to share stateful logic and synchronization details; each caller still owns separate state unless a shared owner is intentional.

## [you might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)

- Do not use an Effect to transform data for rendering, derive state, or mirror props/state. Calculate it during render.
- Do not use an Effect for a user action such as submit, purchase, navigation, notification, or analytics caused by a click. Put it in the event handler.
- Never create an Effect chain where one Effect sets state only to trigger another Effect. Calculate the result in render or complete the transition in the originating event/reducer.
- Do not reset a whole subtree from an Effect when identity changes; give the inner component a deliberate `key`.
- For partial adjustments, first derive from props or store a stable ID instead of storing a selected object that must be reset.
- Use `useMemo` only for a demonstrably expensive calculation; never use `useEffect` as memoization.
- Fetching in an Effect is valid for synchronization with a query/URL, but handle stale responses or aborts, loading, errors, and cleanup. Prefer framework/data-layer fetching when available.

## [lifecycle of reactive effects](https://react.dev/learn/lifecycle-of-reactive-effects)

- Think of each Effect as an independent start/stop synchronization process, not as a component lifecycle callback.
- When a reactive value changes, cleanup the old synchronization before starting the new one. Cleanup must undo connect, subscribe, timer, listener, or request work.
- Props, state, context values, and variables/functions created inside the component are reactive. Include every reactive value read by an Effect.
- An empty dependency list is correct only when the Effect reads no reactive values. Never suppress `react-hooks/exhaustive-deps`.
- Split unrelated synchronization processes into separate Effects; do not combine analytics, subscriptions, connections, and notifications only because they run near each other.
- Effects must be resilient to start, cleanup, and restart, including the extra development cycle used by Strict Mode.

## [manipulating the dom with refs](https://react.dev/learn/manipulating-the-dom-with-refs)

- Let React own the DOM. Use refs for focus, scroll, measurement, and external widgets when declarative props cannot express the behavior.
- Do not mutate DOM managed by React. Direct mutation is allowed only for a part React does not manage and must not conflict with future renders.
- Call DOM APIs from event handlers or Effects after the node exists, never during render.
- Do not call Hooks inside loops, conditions, or `map`. For dynamic lists, use a ref callback with a stable ID/Map rather than one `useRef` per item.
- Keep ref access null-safe according to the actual DOM lifecycle and component contract; do not add speculative field fallbacks.

## [referencing values with refs](https://react.dev/learn/referencing-values-with-refs)

- A ref persists between renders but changing `ref.current` does not trigger a render.
- Never read or write `ref.current` during render when the value affects JSX. Use state for anything the UI must display.
- Use refs for values needed only by event handlers or external APIs, such as timeout/interval IDs and mutable handles.
- Store interval IDs in refs and always clear them when stopping or cleaning up. Do not use a local variable that resets on every render.
- Do not rely on ref mutation to communicate state between components; use props, callbacks, context, or a state owner.

## [synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)

- Rendering must remain a pure calculation of props/state to JSX. Event handlers handle user-caused side effects; Effects handle side effects caused by rendering.
- Write an Effect by identifying the external system, declaring it at the top level, specifying dependencies, and adding cleanup when needed.
- Do not call browser/DOM methods during render. Render the node first, then synchronize it in an Effect.
- Dependencies control when synchronization repeats. Do not omit dependencies or rely on an empty list to freeze stale values.
- A setter called synchronously in an Effect is a warning sign for cascading renders; first remove the derived state or move the update to the event/reducer.

## [separating events from effects](https://react.dev/learn/separating-events-from-effects)

- Event handlers are non-reactive and run only for the interaction that triggered them. Effects are reactive and re-run when their dependencies change.
- Decide where code belongs by asking why it runs: a specific user interaction means event handler; the component being visible or synchronized means Effect.
- Do not place a send/purchase/submit action in an Effect just because it reads state. Put it in the corresponding handler.
- If an Effect mixes reactive synchronization with non-reactive callback logic, extract the callback with `useEffectEvent` when supported by the project.
- Pass the event-specific value explicitly to an Effect Event so the surrounding Effect keeps the correct dependency and does not read a stale value.

## [removing effect dependencies](https://react.dev/learn/removing-effect-dependencies)

- Do not fight the dependency linter. Change the code structure instead of deleting dependencies or adding suppression comments.
- Move constants and stable configuration outside the component when they are not reactive.
- Move event-specific logic into event handlers, split independent synchronization processes, and avoid creating object/function dependencies unnecessarily.
- Do not make an Effect depend on a value only because unrelated logic was placed inside it. Keep each Effect focused on one synchronization contract.
- Treat stale closures as correctness bugs. Verify that listeners, timers, subscriptions, and async callbacks observe the intended version of props/state.

## [reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

- Extract a custom Hook when multiple components share stateful behavior or synchronization, not merely because a function is long.
- A custom Hook shares logic, not state. Each call is independent unless the Hook intentionally uses a shared external store/context.
- Keep the Hook API focused on domain intent. Hide Effect setup/cleanup and expose typed state, actions, and status rather than implementation details.
- Keep Hooks composable and follow Hook rules: call them only at the top level of components or other custom Hooks.
- Do not create generic “utils” Hooks that mix unrelated concerns or hide ownership of state and side effects.

## project type and data contract rules

- When a component has two or more props, define a named props type or interface near the component. Do not declare the props object type inline in the parameter list.
- Do not export a renamed type alias such as `export type NewName = ExistingName`. Reuse the original type or define a real public contract.
- Read the source type, API schema, and caller before accessing a field. Do not guess with `?.name`, `?.Name`, `?.Names`, or similar speculative optional chaining.
- Use optional access only when the contract permits absence. Avoid broad fallback chains; every fallback needs a documented missing-data case and explicit domain default.
- Keep props, state, reducer actions, context values, and server responses typed at their boundaries. Do not use `any`, broad casts, or guessed fields to silence errors.
