# code review contract

Before editing, identify the component owner, existing equivalent, caller contract and state owner. Read the relevant implementation, not only its exported name.

## Decisions to check in the diff

- A submitted form has one RHF owner. Do not mirror field values or validation errors in useState. A search/filter is not automatically a submitted form.
- Derive totals, filtered arrays and display labels during render. Use effects for external synchronization; initialize a draft in the user event that opens it. Define what happens if upstream data changes while the draft is open.
- Keep rendering, transport and domain transformations separable when they change independently. Prefer a plain typed function or feature hook over a generic service/repository hierarchy.
- Extract duplicated behavior when callers share semantics, not merely similar markup. Avoid one-use wrappers that only rename props and speculative configuration APIs.
- Extend a shared component only for a product-neutral need. Existing callers must retain their supported behavior; test the changed contract rather than casting errors away.
- Use narrow props and typed domain values. Do not pass entire feature objects when a child only needs a label and callback. Do not use any, double casts, lint suppression or timers to hide design errors.
- Remove obsolete imports, handlers, commented code and redundant memoization introduced by the change. Do not rewrite unrelated files for style consistency.

## Completion evidence

Review the changed paths against the points above. Run the repository's scoped lint and type checks; test meaningful behavior such as invalid submit, server failure, cancel/reopen and external resets. State which checks ran, what failed, and any explicit exception. Do not claim clean code, SOLID or visual verification merely because compilation passed.
