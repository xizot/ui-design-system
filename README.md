# 🎨 UI Design System

A reusable UI design system starter built on top of the shadcn ecosystem, Base UI primitives, Tailwind CSS v4, and React 19.

This repository serves two purposes:

- 🏗️ a source workspace for building and documenting components
- 📦 a CLI installer with editable Source mode and dependency-based Package mode

## 📁 What This Project Includes

- 📦 `components/`
  Core UI components and RHF wrappers
- 🔢 `constants/`
  Shared constants used by the design system
- 🪝 `hooks/`
  Reusable hooks
- 🛠️ `lib/`
  Utilities and helper functions
- 📖 `app/components/...`
  Internal component usage guide pages
- ⚙️ `bin/install.cjs`
  CLI installer used by `npx github:xizot/ui-design-system`

## 🧱 Stack

- ▲ Next.js App Router
- ⚛️ React 19
- 🎨 Tailwind CSS v4
- 🧩 shadcn-based component structure
- 🔲 Base UI primitives
- 📋 React Hook Form
- 🛡️ Zod
- 📊 TanStack Table
- 🔗 Nuqs

## 🚀 Installation via CLI

The CLI copies editable components into `design-system/`.

After pushing this repository to GitHub as `xizot/ui-design-system`, consumers can install it with:

```bash
npx github:xizot/ui-design-system init --mode source
```

Shortcut:

```bash
npx github:xizot/ui-design-system
```

Show help:

```bash
npx github:xizot/ui-design-system help
```

The CLI installs the design system into a dedicated target folder:

```text
design-system/
  components/
  constants/
  hooks/
  lib/
AGENTS.md
```

### Source CLI behavior

The installer uses a guided flow:

1. 📂 Component files
   It checks for existing files inside `design-system/` and asks whether to overwrite, skip, or review conflicts one by one.
2. 📦 Dependencies
   It checks the target project's `package.json`, detects missing runtime dependencies, and asks whether they should be installed automatically.
3. 🤖 Agent rules
   It installs the complete `.agents/skills` pack and `.agents/rules` and creates or updates the target project's `AGENTS.md` with the rules from `.agents/skills/xizot-design-system/references/agent-rules.md`.
4. 🎨 Project files
   It asks where to copy theme files such as `app/globals.css`.

Supported package managers:

- `pnpm`
- `yarn`
- `bun`
- `npm`

### Source import path

The usage guides should document imports from the installed target path, for example:

```tsx
import { Button } from '@/design-system/components/ui/button';
```

This is the public consumption path after the CLI copies files into a project.

## Agent discovery in both modes

```bash
python3 .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "input"
```

Discovery uses the mode in the installer-marked `AGENTS.md` section. If both installations exist without that marker, add `--mode source` or `--mode package` before `discover`. Component references are relative to the discovered source root. See [installation modes](.agents/skills/xizot-design-system/references/installation-modes.md). After a manual dependency upgrade, rerun package setup to synchronize local skills with that revision.

## 📖 Internal Docs App

This repository includes an internal docs shell under `app/components`.

The docs layout is structured as:

- 🔝 top header
- 📋 left sidebar
- 📄 center usage guide content
- 🗂️ right table of contents

Each component guide is a dedicated page, for example:

```text
app/components/button/page.tsx
app/components/input/page.tsx
app/components/select/page.tsx
```

There is no dynamic route requirement for component guides. Each page is authored explicitly.

## ✍️ Authoring a Component Guide

Use [`GUIDE_TEMPLATE.md`](./GUIDE_TEMPLATE.md) as the source template when creating a new component documentation page.

Current guide conventions:

- each component has its own page
- sections should be wrapped in `Card`
- usages should be grouped in `Tabs`
- each usage tab should include:
  - a preview
  - a matching code sample

For components with multiple important states or variants, the guide should document each one explicitly instead of showing a single generic example.

## 💻 Local Development

Run the docs app locally:

```bash
npm run dev
```

Run type-checking:

```bash
npx tsc --noEmit
```

## 🌐 GitHub Pages

This repository is configured to publish the internal docs app to GitHub Pages.

- 🔗 Repository URL: `https://github.com/xizot/ui-design-system`
- 🌍 Pages URL: `https://xizot.github.io/ui-design-system/`
- ⚙️ Workflow file: `.github/workflows/gh-pages.yml`

How it works:

- `next.config.ts` uses static export with `output: "export"`
- GitHub Actions builds the site and uploads the `out/` directory
- during the Pages build, the app is served under the repository base path `/ui-design-system`

To enable it:

1. Push this repository to GitHub.
2. Open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or run the workflow manually from the `Actions` tab.

Once deployed, the component docs will be available at:

```text
https://xizot.github.io/ui-design-system/components/
```

## 🔧 Maintaining the Design System

### ➕ Adding a new component

1. Add the source file under `components/`
2. If needed, add supporting code in `constants/`, `hooks/`, or `lib/`
3. Create or update the guide page under `app/components/<component-name>/page.tsx`
4. Commit and push

### 📦 Adding a new runtime dependency

When a new component depends on a new package, update both:

1. `package.json`
2. `bin/install.cjs` in the `runtimeDependencies` list

Without both updates, the CLI will not install that dependency for downstream consumers.

### 📂 Adding a new folder to be copied by the CLI

Update both:

1. `directoriesToCopy` inside [`bin/install.cjs`](./bin/install.cjs)
2. `files` inside [`package.json`](./package.json)

## 📝 Notes

- Source mode rewrites repository aliases for copied components; package builds emit relative ESM imports.
- Source component conflicts prompt before overwrite. Installer-owned skills/rules refresh on setup in both modes.
- The docs app is internal to this repository; both installation modes include the consumer skills and rules needed for downstream projects.
