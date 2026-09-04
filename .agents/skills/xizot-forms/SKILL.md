---
name: xizot-forms
description: 'Use when building, reviewing, or improving forms with the Xizot design system and React Hook Form: field grouping, labels, validation, required states, errors, submit behavior, defaults, comboboxes, date/time fields, and multi-step flows.'
metadata:
  version: 0.1.0
---

# Xizot Forms

Use this skill when a page includes data entry. Forms are a primary UX surface, so use the RHF wrappers and field contracts rather than custom label/error structures.

## Required Reference

Read [references/form-design.md](references/form-design.md) before building or changing forms.

## Defaults

- Prefer `RHF*` wrappers with `react-hook-form`.
- Use base UI controls directly for local uncontrolled state only.
- Group related fields.
- Show labels, required states, validation errors, pending submit, and server errors.
- Use controls that match the data type.
