# Form Design

## Field Choice

- Submitted forms: `RHFInput`, `RHFTextarea`, `RHFNumberInput`; read their actual required props.
- Base controls are for non-form controls or the explicit user/platform exceptions in SKILL.md.
- Boolean: `RHFSwitch` or `RHFCheckbox` depending on meaning.
- Few mutually exclusive choices: `RHFRadioGroup`.
- Searchable options: `RHFSingleCombobox` or `RHFMultipleCombobox`.
- Date/time: RHF date, date range, or time picker wrappers.

## Layout

- Group related fields with `FieldGroup`, sections, or compact grids.
- Keep labels close to controls.
- Use one-column mobile layout.
- Use two-column desktop layout only when field labels and error messages stay readable.
- Dialog/sheet forms need scrollable body and stable footer actions.

## Validation

- Show errors next to fields.
- Use required indicators where supported.
- Disable submit while pending.
- Preserve values after server errors.
- Do not rely on toast-only validation.

## Copy

- Labels are concise nouns.
- Placeholders are examples or hints, not replacement labels.
- Error messages explain correction.
- Vietnamese forms should use stable terms and avoid mixed-language labels.

## Submit Behavior

- Primary submit is visually clear.
- Cancel/close is available.
- Dangerous form actions require confirmation.
- Pending state should prevent duplicate submits.
