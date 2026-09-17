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

- Submitted product forms must use `useForm<T>` and existing `RHF*` wrappers. Do not mirror field values/errors in useState.
- Search/filter controls may use local or URL state. Explicit user choices and existing native/server-action contracts are exceptions; explain the reason.
- Group related fields.
- Show labels, required states, validation errors, pending submit, and server errors.
- Use controls that match the data type.

## Implementation and evidence

1. Run the core `ui-source.py discover "rhf"` command and read chosen wrappers and shared types. `RHFInput` requires `register`, `control` and `name`; other wrappers have different APIs. Do not invent missing exports.
2. Define typed values and complete defaults. Put validation in RHF rules or the existing resolver. A required label alone does not validate.
3. Use `handleSubmit` and await the mutation so `isSubmitting` covers the request. Use Button loading/disabled props and `type="button"` on auxiliary actions.
4. Map field failures with `setError`, retain values after failure, and show a form-level error when needed. Reset on successful submit or explicit entity/open transition; define how dirty forms handle incoming data.
5. Verify invalid/valid submit, duplicate-submit prevention, rejection, cancel/reopen and entity switching where applicable. Run lint/types; do not add a resolver package just to follow an example.
