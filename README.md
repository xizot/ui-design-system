# UI Design System

A reusable UI design system starter built on top of the shadcn ecosystem, Base UI primitives, Tailwind CSS v4, and React 19.

This repository serves two purposes:

- a source workspace for building and documenting components
- a CLI-distributed template that can install the design system into another project

## What This Project Includes

- `components/`
  Core UI components and RHF wrappers
- `constants/`
  Shared constants used by the design system
- `hooks/`
  Reusable hooks
- `lib/`
  Utilities and helper functions
- `app/components/...`
  Internal component usage guide pages
- `bin/install.cjs`
  CLI installer used by `npx github:xizot/ui-design-system`

## Stack

- Next.js App Router
- React 19
- Tailwind CSS v4
- shadcn-based component structure
- Base UI primitives
- React Hook Form
- Zod
- TanStack Table
- Nuqs

## Installation via CLI

After pushing this repository to GitHub as `xizot/ui-design-system`, consumers can install it with:

```bash
npx github:xizot/ui-design-system
```

The CLI installs the design system into a dedicated target folder:

```text
design-system/
  components/
  constants/
  hooks/
  lib/
```

## CLI Behavior

The installer uses a guided flow:

1. Component files
   It checks for existing files inside `design-system/` and asks whether to overwrite, skip, or review conflicts one by one.
2. Dependencies
   It checks the target project's `package.json`, detects missing runtime dependencies, and asks whether they should be installed automatically.

Supported package managers:

- `pnpm`
- `yarn`
- `bun`
- `npm`

## Import Path for Consumers

The usage guides should document imports from the installed target path, for example:

```tsx
import { Button } from "@/design-system/components/ui/button";
```

This is the public consumption path after the CLI copies files into a project.

## Internal Docs App

This repository includes an internal docs shell under `app/components`.

The docs layout is structured as:

- top header
- left sidebar
- center usage guide content
- right table of contents

Each component guide is a dedicated page, for example:

```text
app/components/button/page.tsx
app/components/input/page.tsx
app/components/select/page.tsx
```

There is no dynamic route requirement for component guides. Each page is authored explicitly.

## Authoring a Component Guide

Use [`GUIDE_TEMPLATE.md`](./GUIDE_TEMPLATE.md) as the source template when creating a new component documentation page.

Current guide conventions:

- each component has its own page
- sections should be wrapped in `Card`
- usages should be grouped in `Tabs`
- each usage tab should include:
  - a preview
  - a matching code sample

For components with multiple important states or variants, the guide should document each one explicitly instead of showing a single generic example.

## Local Development

Run the docs app locally:

```bash
npm run dev
```

Run type-checking:

```bash
npx tsc --noEmit
```

## Maintaining the Design System

### Adding a new component

1. Add the source file under `components/`
2. If needed, add supporting code in `constants/`, `hooks/`, or `lib/`
3. Create or update the guide page under `app/components/<component-name>/page.tsx`
4. Commit and push

### Adding a new runtime dependency

When a new component depends on a new package, update both:

1. `package.json`
2. `bin/install.cjs` in the `runtimeDependencies` list

Without both updates, the CLI will not install that dependency for downstream consumers.

### Adding a new folder to be copied by the CLI

Update `directoriesToCopy` inside [`bin/install.cjs`](./bin/install.cjs).

## Notes

- The source is written with relative imports so copied files do not depend on local alias configuration.
- The CLI is designed to be safe for existing projects by prompting before overwriting files.
- The docs app is internal to this repository; the CLI only installs the design system source folders into the target project.
