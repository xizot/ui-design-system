# Feature ownership

Read when adding or relocating application feature code. First inspect the app's actual feature root, route conventions and nearby owners. These defaults do not turn Xizot's `components/ui` into a business-feature tree or authorize a legacy migration.

| Actual consumer/concern                                             | Owner                                                          |
| ------------------------------------------------------------------- | -------------------------------------------------------------- |
| One screen/use case, including its header, filters, table and draft | That use case                                                  |
| Multiple use cases or an explicit feature-wide invariant            | Feature `shared/`                                              |
| Multiple features with the same semantics                           | Existing application shared owner                              |
| Product-neutral reusable control                                    | Xizot, after shared-contract review                            |
| Requests, transport types, payload mapping                          | Existing feature/data-layer owner; do not duplicate per screen |

For a new feature without a contrary application convention, use Feature → Use Case → Local Implementation:

```text
orders/
  index.ts                 # only externally needed exports
  browse/
    browse-orders.tsx
    data-table/            # only if complexity warrants it
  detail/
    order-detail.tsx
  shared/                  # only for actual shared ownership
```

Create only needed files. Keep small flows flat. Add `hooks`, `schemas`, `types` or `components` inside the owning flow when they improve navigation, not for symmetry. Simple status/filter tabs remain in their screen; a substantial independent workflow may have its own owner.

- A use case can depend on feature shared code and the established data layer. Shared code must not depend back on a use case; siblings must not import each other's private implementation.
- Where the app uses `action.ts`, centralize the matching requests there and use `action.types.ts` only if it clarifies that contract. Do not force this filename or ban another established data-layer architecture across all consumers.
- Shared create/edit forms belong in the feature shared area only when semantics align; submit/navigation stay with the flow. No percentage-of-duplicate-code rule or mandatory `mode` prop.
- Types, schemas, helpers and state follow their consumer/lifecycle. API types must not depend on a private UI draft. Keep schema-inferred types with their schema when useful.
- Use explicit exports at a public boundary. No mandatory barrel per component, blanket `export *`, or feature root barrel that introduces cycles. Reuse the library's flat component modules where applicable.
- Component/table internals stay together. Do not impose table filenames or an exact file count from a different repository.

Before moving anything, trace imports and preserve public/runtime behavior. Unclear ownership is a reason to inspect consumers, not to create a global `shared` dumping ground.
