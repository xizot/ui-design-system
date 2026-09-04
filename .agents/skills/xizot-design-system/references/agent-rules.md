# Agent Rules

These rules are installed into downstream `AGENTS.md` by the design-system CLI. Keep this file inside the skill folder so agent guidance ships with the skill instead of being split into `/docs`.

## Source Of Truth

- Treat `design-system/` as the source of truth for shared UI primitives, RHF wrappers, hooks, constants, utilities, and agent UI rules.
- Inspect `design-system/components/ui`, `design-system/components/rhf`, `design-system/hooks`, `design-system/constants`, and nearby app components before creating UI.
- Do not create app-local copies of primitives already available in the design system.
- Do not import lower-level third-party primitives directly when a design-system wrapper exists.
- Use `lucide-react` icons for generic actions unless the product already has a specific icon set.

## Imports

Use the installed consumer path:

```tsx
import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { DataTable } from '@/design-system/components/ui/data-table';
```

If the project uses a different alias, keep the `design-system/` folder boundary and adjust only the prefix.

## Visual Direction

- Build modern, restrained product UI: compact hierarchy, predictable layout, minimal decoration.
- Build hierarchy with layout, grouping, spacing, type, weight, and alignment before adding decorative styling.
- Use semantic tokens such as `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`, `bg-card`, `text-primary`, and `text-destructive`.
- Use color for meaning: primary action, selected state, status, destructive risk, chart grouping, or useful attention.
- Avoid hardcoded hex colors, broad custom palettes, oversized gradients, decorative blobs, and marketing hero sections in app UI.
- Do not nest cards inside cards.
- Keep border radius consistent with the system; default to `rounded-md` for controls.

## Required Component Choices

- Use `Button` and `ButtonGroup` for actions.
- Use design-system form controls and `RHF*` wrappers for forms.
- Use `DataTable` for list pages that need sorting, filters, pagination, loading, empty state, row selection, expanded rows, or pinned actions.
- Use `DialogPanel`, `SheetPanel`, `DrawerPanel`, and `PopoverPanel` for composed overlay surfaces.
- Use `Badge`, `Marker`, `Empty`, `Skeleton`, `Spinner`, and toast utilities for feedback states.

## System Rules

- Do not create a parallel color scale, spacing scale, typography scale, form wrapper layer, or table abstraction in feature code.
- Add a design-system variant only for a repeated semantic role.
- Keep feature/domain components outside the design-system layer unless the behavior is product-neutral.
- Use `className` for contextual layout, not for replacing a component's visual contract.

## Product UI Checklist

Before finishing UI work, verify:

1. Existing Xizot primitives are used instead of duplicated local UI.
2. Forms have labels, required state, validation messages, disabled/pending states, and useful placeholders.
3. Data regions have loading, empty, no-results, pagination, and error states when relevant.
4. Mobile and desktop layouts do not overlap or hide primary actions.
5. Text fits inside controls, badges, table cells, and overlays.
6. Color choices are semantic, token-based, and readable in light/dark mode.
7. Layout spacing communicates grouping and priority.
8. Typography hierarchy is clear without oversized app text.
9. Vietnamese copy is used consistently when the surrounding product is Vietnamese.
