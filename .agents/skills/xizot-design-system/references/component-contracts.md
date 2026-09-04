# Component Contracts

Use this when creating frontend skills, reviewing component APIs, or deciding whether AI should compose or extend a component.

## API Expectations

Components should expose:

- semantic props for common variants and sizes
- `className` for contextual layout, not primary styling
- built-in accessibility semantics from underlying primitives
- loading/disabled/error state where the component owns that behavior
- test IDs only where workflows need reliable automation

## Composition Rules

- A screen composes primitives.
- A feature component composes primitives plus domain meaning.
- A design-system component generalizes repeated interaction without domain terms.
- RHF wrappers adapt existing controls to form state; they should not fork visuals.

## Naming

Use product-neutral names in the design system:

- good: `DataTable`, `DateRangePicker`, generic `StatusBadge` only if status semantics are product-neutral
- avoid: `OrderTable`, `CustomerSelect`, `DriverStatusBadge` in the design-system layer

Domain names belong in feature/app components.
