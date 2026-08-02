# Design System Consumer Rules

Use these rules in any project that installs this design system. The installed design system lives in `design-system/`.

## Source Of Truth

- Treat `design-system/` as the UI source of truth for shared primitives, form controls, hooks, constants, and UI utilities.
- Before creating UI, inspect `design-system/components/ui`, `design-system/components/rhf`, `design-system/hooks`, `design-system/constants`, and existing app-level shared components.
- Do not create custom local versions of primitives that already exist in `design-system/`.
- Do not import lower-level third-party primitives directly when the design system already provides a wrapper.
- Use `lucide-react` icons for generic actions unless the app or design system already provides a domain icon.

## Imports

Use the installed path in consumer projects:

```tsx
import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/design-system/components/ui/dialog';
```

For forms, use the React Hook Form wrappers from the design system:

```tsx
import { RHFInput } from '@/design-system/components/rhf/rhf-input';
import { RHFSingleCombobox } from '@/design-system/components/rhf/rhf-single-combobox';
import { RHFMultipleCombobox } from '@/design-system/components/rhf/rhf-multiple-combobox';
```

If the consumer project uses a different alias, keep the same folder boundary and adjust only the alias prefix.

## Required Component Choices

- Use `Button` for actions.
- Use `Input`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup`, `NativeSelect`, and related design-system controls for standard fields.
- Use `SingleCombobox` for single-select dropdowns.
- Use `MultipleCombobox` for multi-select dropdowns.
- Use `DatePicker`, `MonthPicker`, and `TimePicker` for date and time values.
- Use `Dialog`, `Sheet`, `Drawer`, `Popover`, `Tooltip`, `DropdownMenu`, `Tabs`, and `Accordion` for overlays and disclosure UI.
- Use `Badge`, `Avatar`, `Skeleton`, `Separator`, `Card`, `Table`, `DataTable`, and pagination primitives when those surfaces are needed.
- Use `FormErrorMessage` for simple field-level error text.

## Forms

- Use `react-hook-form` with the design-system RHF wrappers.
- Do not create new app-local RHF field wrappers until you confirm the needed wrapper is missing from `design-system/components/rhf`.
- If a generic wrapper is missing and will be reused, extend the design system first.
- Keep app-local form code responsible for schema, field names, submit behavior, and business rules only.

## Styling

- Use semantic Tailwind tokens from the app theme, such as `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `bg-popover`, `bg-primary`, `text-primary`, `border-border`, `border-input`, and `ring-ring`.
- Do not hardcode raw color values or Tailwind palette utilities for normal UI.
- Use existing design-system variants, sizes, and states before adding classes.
- Use `className` only for contextual layout, spacing, sizing, or narrow composition changes.
- Keep focus rings, disabled states, hover states, clear buttons, trigger behavior, and selected states consistent with the design-system component behavior.

## When To Create App Components

Create an app-local component only when it is a domain or workflow composition:

- It combines design-system primitives into a reusable app-specific workflow.
- It encodes business meaning such as statuses, permissions, identity, filters, or route-specific actions.
- It integrates app services, permissions, query params, loading states, or feature-specific state.
- It is reused inside a feature or shared across multiple feature screens.

Do not create app-local components just to rename, restyle, or lightly wrap `Button`, `Input`, `Dialog`, `Select`, `Combobox`, `Badge`, `Card`, `Table`, or similar generic primitives.

## Placement

- Keep feature-only compositions inside the owning feature folder.
- Promote components to the app shared layer only after reuse exists across features.
- Put generic primitive changes, reusable variants, RHF wrappers, shared hooks, and theme-level behavior in `design-system/`.
- Do not fork design-system files into feature folders.

## Agent Checklist

Before writing UI code, answer these in order:

1. Does `design-system/components/ui` already provide this primitive?
2. Does `design-system/components/rhf` already provide this form field?
3. Does the app already have a shared/domain component for this workflow?
4. Is the new component domain-specific instead of a duplicate primitive?
5. Is the placement the narrowest ownership scope that still supports reuse?

If any answer points back to `design-system/`, use or extend the design system instead of creating custom UI.
