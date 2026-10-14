# Feature Folder Architecture

This is the packaged feature architecture for application code generated with Xizot. It is based on the repository's `feature-structure.md`. Inspect the consumer's existing routes, source root, language and data layer before applying it. In projects without `src/`, use the equivalent folders at the project root. In JavaScript projects, use `.jsx`/`.js` instead of `.tsx`/`.ts`. Keep existing public imports and established service conventions when editing an existing feature; use the structure below for new feature and service code.

## Purpose

This reference defines the standard architecture for organizing feature implementations and API services within the project.

Every screen, header, query tag, data table, component, hook and state implementation MUST belong to a clearly defined feature and use case.

API operations, request/response contracts and endpoint definitions MUST be organized separately under `src/services/`.

The architecture prioritizes clear ownership, maintainability, separation of concerns, predictable dependencies and minimal abstraction. Before writing a page, identify its route, feature, use case, UI regions, state owner and API service owner. Keep route files focused on routing and feature entry composition. Split a substantial header, filter/query controls, table, form, or independently meaningful region into a named local component. Keep short, tightly coupled markup together; do not create one-file wrappers for every element or split by arbitrary line count.

## 1. Ownership Before File Type

MUST determine the feature and use-case owner before selecting a technical folder such as `components`, `hooks`, `types`, `schemas`, `utils` or `store`.

A feature represents an actual business domain or screen owner. A use case represents a meaningful business flow within that feature.

Use the narrowest appropriate ownership scope.

| Responsibility                                          | Placement                                                 |
| ------------------------------------------------------- | --------------------------------------------------------- |
| API operations and request-payload builders             | `src/services/<service-name>/<service-name>.service.ts`   |
| API request/response contracts                          | `src/services/<service-name>/<service-name>.types.ts`     |
| API endpoint definitions                                | `src/services/<service-name>/<service-name>.endpoints.ts` |
| Screen entry, header, query tags and table              | `<feature>/<use-case>/`                                   |
| Implementation used by one business flow                | `<feature>/<use-case>/`                                   |
| Implementation reused by multiple use cases             | `<feature>/shared/`                                       |
| Feature-wide invariants or stable internal abstractions | `<feature>/shared/`                                       |
| Implementation reused across multiple features          | Existing common/global owner                              |

Start local and promote only when justified by actual consumers or explicit domain ownership.

Unclear ownership or hypothetical future reuse is not sufficient justification for placing implementation in `shared`.

## 2. Target Architecture

```text
src/
├── app/
│
├── components/
│   └── features/
│       └── <feature-name>/
│           ├── index.ts
│           │
│           ├── <use-case>/
│           │   ├── index.ts
│           │   ├── <entry-component>.tsx
│           │   ├── header.tsx
│           │   ├── query-tags.tsx
│           │   ├── data-table/
│           │   │   ├── index.ts
│           │   │   ├── data-table.tsx
│           │   │   ├── columns.tsx
│           │   │   └── column-titles.ts
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── schemas/
│           │   ├── types/
│           │   ├── constants/
│           │   ├── utils/
│           │   └── store/
│           │
│           ├── <other-use-case>/
│           │   └── ...
│           │
│           └── shared/
│               ├── components/
│               ├── hooks/
│               ├── form/
│               ├── schemas/
│               ├── types/
│               ├── constants/
│               ├── utils/
│               └── store/
│
└── services/
    └── <service-name>/
        ├── <service-name>.service.ts
        ├── <service-name>.types.ts
        └── <service-name>.endpoints.ts
```

This structure represents available responsibilities, not mandatory scaffolding.

MUST NOT create empty optional folders or files merely to match the structure.

A small use case may contain only `index.ts` and its entry component.

Every service MUST contain the three required service files.

## 3. Service Architecture

All API communication MUST be organized under `src/services/`.

Each service owns a clearly defined API or business-domain responsibility.

### 3.1 Service structure

Every service MUST contain at least:

```text
services/
└── order/
    ├── order.service.ts
    ├── order.types.ts
    └── order.endpoints.ts
```

Additional files MAY be introduced when required by meaningful implementation complexity.

Do not create unnecessary technical folders or abstractions.

### 3.2 Service implementation

`<service-name>.service.ts` owns API operations and request-payload construction.

MUST:

- Centralize API operations belonging to the service.
- Use the project's established HTTP client and request conventions.
- Reference endpoints from the corresponding `.endpoints.ts` file.
- Use API contracts from the corresponding `.types.ts` file.
- Expose reusable functions for consuming features.
- Keep request handling independent of UI implementation.

MUST NOT:

- Contain React components or presentation logic.
- Depend on feature-specific hooks, stores or UI types.
- Perform navigation or manage screen-specific state.
- Duplicate API operations across services.

Example:

```ts
// order.service.ts
import { ORDER_ENDPOINTS } from './order.endpoints';
import type { CreateOrderRequest, OrderResponse } from './order.types';

export const orderService = {
  getById: (id: string): Promise<OrderResponse> => httpClient.get(ORDER_ENDPOINTS.detail(id)),

  create: (payload: CreateOrderRequest): Promise<OrderResponse> =>
    httpClient.post(ORDER_ENDPOINTS.create, payload),
};
```

`httpClient` represents the project's configured HTTP client.

### 3.3 Service types

`<service-name>.types.ts` owns service-level API contracts.

MUST:

- Define API request and response types.
- Define API payload contracts and related DTOs.
- Preserve backend data contracts.
- Keep service contracts independent of feature-private implementation.
- Group closely related types within the same service.

MUST NOT contain UI-only form state, table presentation types or component props.

Example:

```ts
// order.types.ts
export interface CreateOrderRequest {
  customerId: string;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  status: string;
}
```

### 3.4 Service endpoints

`<service-name>.endpoints.ts` owns API endpoint definitions.

MUST:

- Centralize endpoint paths for the service.
- Support dynamic path parameters where needed.
- Keep endpoint definitions separate from HTTP execution.
- Avoid duplicating endpoint definitions.

Example:

```ts
// order.endpoints.ts
export const ORDER_ENDPOINTS = {
  list: '/orders',
  create: '/orders',
  detail: (id: string) => `/orders/${id}`,
  update: (id: string) => `/orders/${id}`,
  delete: (id: string) => `/orders/${id}`,
} as const;
```

## 4. Feature Architecture

Feature folders MUST be organized by meaningful business use cases.

Examples include:

- `browse`
- `create`
- `edit`
- `detail`
- `approve`
- `assign`
- `history`
- `tracking`
- `import`
- `export`

These names are illustrative, not a required CRUD structure.

Use domain-specific names when they better describe the business flow.

### 4.1 Feature root

The feature root MUST contain only:

- `index.ts`
- Use-case folders
- `shared/` when needed

MUST NOT place screens, headers, query tags, data tables or flow-specific technical folders directly at feature root.

The feature root `index.ts` exposes only the public entries required by external consumers.

### 4.2 Use-case ownership

Each use case MUST own its screen entry, composition and flow-specific implementation.

Example:

```text
order/
├── index.ts
├── browse/
│   ├── index.ts
│   ├── browse-orders.tsx
│   ├── header.tsx
│   ├── query-tags.tsx
│   ├── data-table/
│   │   ├── index.ts
│   │   ├── data-table.tsx
│   │   ├── columns.tsx
│   │   └── column-titles.ts
│   └── hooks/
│       └── use-order-filters.ts
├── create/
│   ├── index.ts
│   └── create-order.tsx
├── edit/
│   ├── index.ts
│   └── edit-order.tsx
└── shared/
    └── ...
```

Use-case-specific code MUST remain within its owning use case unless actual reuse or explicit feature-wide ownership justifies promotion.

### 4.3 Tabs and complexity

Tabs are not automatically independent use cases.

Tabs that change only filters, URL parameters, status, dataset or simple configuration SHOULD remain within the owning screen.

A tab MAY have its own local folder when it owns substantial behavior, state, business rules or implementation complexity.

Example:

```text
browse/
└── tabs/
    ├── pending/
    └── completed/
```

Keep small flows flat.

Introduce technical subfolders only when implementation complexity justifies them.

Group large implementations by meaningful responsibilities rather than arbitrary file counts.

## 5. Components and Data Tables

Components MUST belong to the narrowest owning scope.

### 5.1 Component structure

Use folder-per-component organization for reusable component surfaces.

```text
shared/
└── components/
    └── order-status/
        ├── index.ts
        └── order-status.tsx
```

Keep closely related implementation within the same component folder.

Do not introduce unnecessary nested folders.

### 5.2 Data-table structure

Each use-case-owned table SHOULD follow:

```text
browse/
└── data-table/
    ├── index.ts
    ├── data-table.tsx
    ├── columns.tsx
    └── column-titles.ts
```

MUST:

- Keep the table wrapper, column definitions and column titles together.
- Keep table-specific behavior within its owning use case.
- Use `column-titles.ts` for column title definitions.
- Move a table to feature `shared` only when multiple use cases genuinely reuse the table implementation.

MUST NOT introduce separate `columns/`, `header/` or `body/` folders without meaningful complexity.

## 6. Shared Implementation

`shared/` contains implementation owned by the feature rather than a specific use case.

Valid reasons for shared ownership include:

- Multiple use cases actually consume the implementation.
- A feature-wide invariant requires a stable shared abstraction.
- Shared state intentionally coordinates multiple use cases.
- A reusable form encapsulates substantial common business behavior.

MUST NOT use `shared/` as a default location for implementation with unclear ownership.

### 6.1 Shared forms

When create and edit genuinely share substantial form behavior, use:

```text
shared/
└── form/
    └── order-form/
        ├── index.ts
        ├── form.tsx
        └── components/
```

Shared forms SHOULD own common field rendering, validation integration and reusable form behavior.

Use cases SHOULD retain their own submission, navigation and workflow-specific behavior.

A `mode` prop MAY be used when create/edit semantics align.

Avoid excessive conditional branching solely to force reuse.

### 6.2 Shared state

State MUST belong to the narrowest lifecycle owner.

Use `shared/store/` only when state intentionally coordinates multiple use cases.

Do not create feature-wide state merely for convenience.

## 7. Support-File Naming

| Concern   | Use-case-specific                  | Feature-shared                          |
| --------- | ---------------------------------- | --------------------------------------- |
| Types     | `create/types/create.types.ts`     | `shared/types/order.types.ts`           |
| Constants | `edit/constants/edit.constants.ts` | `shared/constants/order.constants.ts`   |
| Utilities | `detail/utils/detail.utils.ts`     | `shared/utils/order.utils.ts`           |
| Schemas   | `create/schemas/create.schema.ts`  | `shared/schemas/order.schema.ts`        |
| Hooks     | `edit/hooks/use-edit-order.ts`     | `shared/hooks/use-order-permissions.ts` |
| Store     | `browse/store/browse.store.ts`     | `shared/store/order.store.ts`           |

MUST:

- Follow consistent naming conventions.
- Group related exports within the same ownership scope.
- Keep schema-inferred types close to their schema when appropriate.
- Avoid creating one file for every small interface or constant.
- Preserve clear domain terminology.

API request/response types MUST remain in their owning service rather than being duplicated in feature types.

## 8. Dependencies and Public Boundaries

The architecture MUST preserve one-way dependency direction.

```text
src/app/
   |
   v
components/features/
   |
   +----> use-case implementation
   |             |
   |             +----> feature shared
   |             |
   |             +----> services
   |
   +----> services
                  |
                  +----> endpoints
                  +----> service types
                  +----> HTTP client
```

### 8.1 Dependency rules

- Use cases MAY import their feature's shared implementation.
- Use cases MAY consume service operations.
- Services MUST NOT import from feature folders.
- Feature `shared` MUST NOT import from specific use cases.
- Sibling use cases MUST NOT import each other's private implementation.
- Common/global modules MUST NOT depend on feature-private implementation.
- Circular dependencies MUST NOT be introduced.
- API request execution MUST remain in the service layer.

### 8.2 Public entries

Every feature MUST expose only externally required screens, flows or contracts through its root `index.ts`.

Use-case `index.ts` files MUST expose only their intended public entries.

Prefer explicit named exports.

Example:

```ts
export { BrowseOrders } from './browse';
export { CreateOrder } from './create';
export { EditOrder } from './edit';
```

Do not export all components, hooks, types or utilities by default.

Internal implementation MAY use direct imports within its owning scope.

Service imports MUST follow the project's established import-path conventions.

## 9. Placement Decision Rules

Before creating a file, determine:

1. **Domain owner:** Which feature or service owns the responsibility?
2. **Use-case owner:** Which business flow uses the implementation?
3. **Consumers:** Is the implementation used by one or multiple use cases?
4. **Responsibility:** Is it API communication, UI composition, state, validation or utility logic?
5. **Lifecycle:** Does its state or behavior belong to one screen, multiple flows or the service layer?
6. **Public boundary:** Does any external consumer require access?
7. **Dependency direction:** Will the placement introduce cross-use-case dependencies or cycles?

Placement MUST follow the narrowest valid ownership scope.

Do not promote implementation based on speculative future reuse.

## 10. Architecture Verification

Before completing implementation, verify:

- [ ] Every feature has clearly defined use-case ownership.
- [ ] Every screen entry belongs to a use case.
- [ ] Headers, query tags and tables belong to their owning use cases.
- [ ] Feature roots contain no unrelated technical folders.
- [ ] Every service contains `.service.ts`, `.types.ts` and `.endpoints.ts`.
- [ ] API operations are centralized in services.
- [ ] API contracts are not duplicated in feature folders.
- [ ] Services do not depend on feature implementation.
- [ ] Shared implementation has justified ownership.
- [ ] Sibling use cases do not import each other's private files.
- [ ] Public `index.ts` exports remain narrow.
- [ ] No empty optional scaffolding is introduced.
- [ ] No unnecessary abstraction or folder nesting is introduced.
- [ ] No circular dependencies are introduced.
- [ ] Applicable lint, type checking, tests and build validation pass.

## Core Principles

**Business ownership before technical organization.**

**Use-case locality before shared abstraction.**

**Services own API communication and contracts.**

**Features own UI composition and business workflows.**

**Public boundaries remain narrow and explicit.**

**Dependencies remain predictable and unidirectional.**

**Create only the structure required by actual implementation.**
