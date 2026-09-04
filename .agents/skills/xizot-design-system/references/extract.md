# Extract Command

Use when a feature UI should become reusable.

## Extraction Levels

- **Feature component:** Reused inside one feature area and contains domain meaning.
- **App shared component:** Reused across features but still product/domain-specific.
- **Design-system component:** Generic primitive or composition that belongs outside one product domain.

Default to the narrowest level that serves current reuse.

## Design-System Candidate Criteria

Extract into the design system only when:

- multiple features need the same generic interaction
- local composition repeatedly combines the same primitives
- behavior is not domain-specific
- the API can be named without product jargon
- implementation can keep relative imports and copied-project compatibility

## Source Repo Rules

When editing this source repo:

- Put generic components under `components/ui` or RHF wrappers under `components/rhf`.
- Keep imports relative.
- Update runtime dependencies in both `package.json` and `bin/install.cjs` when needed.
- Treat guide pages as separate work unless requested.

## Consumer Project Rules

When editing a consumer project:

- Do not modify installed design-system files casually.
- Prefer app-local composition first.
- If a design-system change is required, say it belongs upstream in this repo.
