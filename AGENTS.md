# Project Architecture Guide

This project is an internal tools codebase and must follow an atomic + feature-based structure.

## General Rules

- Prefer App Router conventions that match the installed Next.js version.
- Reuse existing shared modules before creating new ones.
- Keep common concerns in shared/root-level folders. Keep business logic inside `features/`.
- Do not introduce alternative architecture patterns unless the user explicitly asks for them.
- Do not add comments in source files unless the user explicitly requests them.
- All code must be type-safe by default.
- Do not use `any` unless the user explicitly approves it.
- Prefer explicit request/response types, store types, form types, and component prop types.
- Do not leave API data, form values, or store state untyped.
- Keep `AGENTS.md` in English.
- All user-facing content in the application must be written in Vietnamese by default.

## Design Tokens — Color, Typography, Spacing, Radius

All visual values must be derived from the theme system defined in `app/globals.css`. Never hardcode raw values when a token exists.

### Color

Use Tailwind semantic color utilities that map to CSS variables defined in `app/globals.css`:

| Purpose              | Tailwind utility                                        |
| -------------------- | ------------------------------------------------------- |
| Page background      | `bg-background`                                         |
| Default text         | `text-foreground`                                       |
| Muted text / labels  | `text-muted-foreground`                                 |
| Card / surface       | `bg-card`, `text-card-foreground`                       |
| Popover / dropdown   | `bg-popover`, `text-popover-foreground`                 |
| Primary action       | `bg-primary`, `text-primary-foreground`                 |
| Secondary / subtle   | `bg-secondary`, `text-secondary-foreground`             |
| Muted fill           | `bg-muted`                                              |
| Accent / hover fill  | `bg-accent`, `text-accent-foreground`                   |
| Destructive / danger | `bg-destructive`, `text-destructive`                    |
| Border               | `border-border`                                         |
| Input border         | `border-input`                                          |
| Focus ring           | `ring-ring`                                             |
| Sidebar surface      | `bg-sidebar`, `text-sidebar-foreground`                 |
| Sidebar primary      | `bg-sidebar-primary`, `text-sidebar-primary-foreground` |
| Sidebar accent       | `bg-sidebar-accent`, `text-sidebar-accent-foreground`   |
| Sidebar border       | `border-sidebar-border`                                 |
| Charts               | `text-chart-1` … `text-chart-5`                         |

Rules:

- Do not hardcode color values (`#fff`, `oklch(...)`, `rgb(...)`) directly in className or style props.
- Do not use Tailwind palette utilities (`bg-gray-100`, `text-blue-500`, etc.) — use semantic tokens only.
- Only use hardcoded values when a semantic token cannot express the intent (e.g. a decorative gradient overlay in a one-off illustration). Document why in a comment.
- For opacity modifiers, use the slash syntax: `bg-border/70`, `text-foreground/50`.

### Typography

Fonts are registered as CSS variables and mapped through `@theme inline` in `app/globals.css`:

| Usage            | Tailwind utility                          |
| ---------------- | ----------------------------------------- |
| Body / default   | `font-sans` (maps to `--font-sans`)       |
| Monospace / code | `font-mono` (maps to `--font-geist-mono`) |
| Headings         | `font-heading` (maps to `--font-sans`)    |

Rules:

- Do not hardcode `font-family` in style props or arbitrary Tailwind values like `font-['Inter']`.
- Do not add new font imports without updating both the CSS variable in `app/globals.css` and the `@theme inline` mapping.
- Use Tailwind's type scale for size (`text-sm`, `text-base`, `text-lg`, …) — do not use arbitrary `text-[13px]` unless no standard step fits.
- Use Tailwind's weight scale (`font-medium`, `font-semibold`, …) — do not use `font-[500]`.

### Border Radius

Radius is defined as a single base variable `--radius: 0.625rem` and scaled through `@theme inline`:

| Token         | Computed value              |
| ------------- | --------------------------- |
| `rounded-sm`  | `calc(var(--radius) * 0.6)` |
| `rounded-md`  | `calc(var(--radius) * 0.8)` |
| `rounded-lg`  | `var(--radius)`             |
| `rounded-xl`  | `calc(var(--radius) * 1.4)` |
| `rounded-2xl` | `calc(var(--radius) * 1.8)` |
| `rounded-3xl` | `calc(var(--radius) * 2.2)` |
| `rounded-4xl` | `calc(var(--radius) * 2.6)` |

Rules:

- Always use `rounded-{size}` utilities — never `rounded-[12px]` or inline `borderRadius` style props.
- Components, cards, and modals must share the same radius scale so the UI feels consistent when `--radius` is changed.

### Spacing & Sizing

- Use Tailwind's spacing scale (`p-4`, `gap-6`, `mt-8`, …) — do not use arbitrary values like `p-[18px]` unless no standard step fits.
- Do not set fixed `width` or `height` with pixel values when `w-full`, `min-w-0`, `size-8`, or flex/grid can achieve the same result.
- Prefer `size-{n}` over separate `w-{n} h-{n}` for square elements.

## Root Structure

Use these root-level folders for common, cross-feature concerns:

- `config/axios/`: axios instance setup, request/response interceptors, auth header injection, refresh handling if needed.
- `services/`: API call functions only. Services must consume endpoint constants and the configured axios instance.
- `constants/endpoints.ts`: central API endpoint definitions. Do not hardcode API paths inside components.
- `components/`: common reusable components only.
- `hooks/`: common reusable hooks only.
- `schemas/`: common Zod schemas only.
- `types/`: common shared types only.
- `store/`: common global stores only.
- `features/`: business features, each feature owns its UI, hooks, types, local store, and feature-specific logic.

## Feature Structure

Each feature should be organized like this when relevant:

```txt
features/
  feature-name/
    components/
      index.ts
    forms/
      index.ts
    hooks/
    data-table/
      columns.tsx
      data-table-name.tsx
      index.ts
    schemas/
      index.ts
    store/
    types/
      index.ts
    feature-name.tsx
    index.ts
```

Rules:

- `components/index.ts` is the feature component entry only if the feature has reusable local components.
- `schemas/index.ts` is required when the feature has local schemas.
- `types/index.ts` is required when the feature has local types.
- `feature-name.tsx` is the main feature container/export surface for rendering.
- `index.ts` must act as the public entry for the feature.
- Only create optional folders like `hooks/`, `data-table/`, `store/`, `components/`, `schemas/` when the feature actually needs them.

## Forms

- Forms must use the existing components in `shared/components/rhf/`.
- Use `zod` for form schema validation.
- Prefer inferring form value types from Zod schemas instead of duplicating manual types.
- Do not create new form field wrappers or duplicate RHF form components unless the user explicitly requests extending the shared RHF set.
- If a needed form primitive does not exist, extend the shared RHF folder first, then reuse that shared component.

## API Layer

- Use `axios` for all HTTP communication.
- All axios configuration must live under `config/axios/`.
- Interceptors must be configured centrally, not inside pages or feature components.
- Service functions in `services/` must be thin and predictable:
  - use endpoint constants from `constants/endpoints.ts`
  - call the shared axios instance
  - return typed response data

## State Management

- Use `zustand` for client state management.
- Follow the login/auth pattern for persisted auth/session state:
  - keep auth/session data in a dedicated store
  - keep token read/write and cleanup centralized
  - let axios interceptors read from the auth store or its persistence layer
- Do not introduce Redux, Context-based global state, or another state library unless explicitly requested.

## URL State

- Use `nuqs` for search params, filters, pagination state, and other URL-synced client state.
- Do not hand-roll query-string parsing for common table/filter flows when `nuqs` is appropriate.

## Boundaries

- Shared/common code must remain generic and reusable.
- Feature code must stay inside its feature folder unless it is proven reusable across multiple features.
- Avoid importing feature internals from other features. If reuse is needed, promote the code to a shared location.
