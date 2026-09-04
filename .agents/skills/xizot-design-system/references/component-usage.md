# Component Usage

## Imports

In consumer projects installed by the CLI, import from the copied folder:

```tsx
import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { DataTable, DataColumnHeader } from '@/design-system/components/ui/data-table';
```

Inside this source repo, use the existing relative import style.

## Component Discovery

Before using a component deeply, inspect its source file because this design system exposes local APIs beyond ordinary shadcn usage. Prefer real props over guessed props.

Read these first when relevant:

- `components/ui/button.tsx` for variants, sizes, and loading behavior
- `components/ui/data-table.tsx` for sorting, filters, pagination, row selection, pinned actions, loading, and empty states
- `components/ui/field.tsx`, `components/ui/form-label.tsx`, and `components/ui/form-error-message.tsx` for label/error composition
- `components/rhf/index.ts` and specific `components/rhf/rhf-*.tsx` wrappers for React Hook Form
- `constants/form-sizes.ts` for valid form sizes and icon button sizing
- `hooks/use-url-filter.ts` when list pages synchronize table/filter state with URL query params

## Common Components

- `Button`: supports `variant`, `size`, and `loading`. Prefer `variant="outline"` or `variant="ghost"` for secondary actions and `variant="destructive"` for destructive actions. Use icon sizes such as `icon-sm`, `icon-md`, or regular sizes with inline icons.
- `Input`, `Textarea`, `Select`, `NativeSelect`, `Combobox`, `SingleCombobox`, `MultipleCombobox`, date/time/number components: use built-in label, required, size, and error props where available.
- `Field`, `FieldGroup`, `FieldSet`, `FieldLabel`, `FieldDescription`, `FieldError`: use for custom form layouts or grouped controls.
- `RHF*` components: prefer these for `react-hook-form` screens.
- `DataTable`: use for list pages with manual sorting, filters, pagination, loading states, empty states, selectable rows, expanded rows, and pinned action columns.
- `DialogPanel`, `SheetPanel`, `DrawerPanel`, `PopoverPanel`: prefer panel variants when building composed surfaces with headers, bodies, and footers.
- `Badge`, `Marker`, `Empty`, `Skeleton`, `Spinner`, `CustomToast`/`sonner`: use existing feedback components instead of custom one-off UI.
- `Sidebar`, `Breadcrumb`, `Tabs`, `ButtonGroup`, `InputGroup`, `Pagination`, `DropdownMenu`, `Command`: use for application navigation and dense workflows.

## Tokens And Styling

Use semantic classes:

- Surfaces: `bg-background`, `bg-card`, `bg-popover`, `bg-muted`
- Text: `text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive`
- Lines and focus: `border-border`, `border-input`, `ring-ring`
- Layout: `gap-2`, `gap-3`, `gap-4`, `p-3`, `p-4`, `px-4`, `py-3`, `rounded-md`

Avoid hardcoded hex colors, broad custom palettes, one-off gradients, decorative blobs, and nested cards. Use `cn` for conditional classes.

## Product UI Patterns

For CRUD/list pages:

1. Header row with title, brief supporting metadata when useful, and primary action.
2. Toolbar with search, filters, segmented/tab state, refresh/export/import when relevant.
3. `DataTable` with sortable columns, optional filter popovers, pagination, loading overlay, empty state, and pinned `actions` column.
4. Dialog/sheet/drawer for create/edit/detail workflows.
5. Toast feedback for mutation success or failure.

For forms:

1. Use RHF wrappers when form state uses `react-hook-form`.
2. Group related fields with `FieldGroup` or clear section bands.
3. Include validation errors next to controls.
4. Put primary action first or right-aligned in dense app footers, matching nearby screens.

For dashboards:

1. Use compact metrics, charts, and tables with meaningful labels.
2. Avoid oversized hero typography and decorative cards.
3. Show loading, empty, and error states for each data region.

## Responsive Rules

- Use responsive grid tracks and min widths so dense content can wrap predictably.
- Keep action toolbars usable on mobile by wrapping filters and preserving primary actions.
- Do not scale font size with viewport width.
- Ensure button labels, table actions, badges, and form errors fit their containers.

## Source Repo Maintenance

When modifying this design-system repo:

- Add component source under `components/` only when a reusable primitive or wrapper is truly needed.
- Keep public consumption examples using `@/design-system/...`.
- Keep imports relative inside copied source.
- If adding runtime packages, update both `package.json` and `runtimeDependencies` in `bin/install.cjs`.
- If adding copied folders, update both `directoriesToCopy` in `bin/install.cjs` and `files` in `package.json`.
- Treat guide pages under `app/components/...` as a separate documentation phase unless the user asks for guide work in the same request.
