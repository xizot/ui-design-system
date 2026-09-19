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

Two installation modes are available. `source` (the default) copies editable
components into `design-system/`. `package` installs a dependency managed by
npm, Yarn, pnpm, or Bun in `node_modules`, without copying component source into
the application. Both modes install skills and rules locally.

| | Source | Package |
| --- | --- | --- |
| Component source | `design-system/` | `node_modules/ui-design-system/` |
| Button import | `@/design-system/components/ui/button` | `ui-design-system/components/ui/button` |
| Agent guidance | `.agents/skills`, `.agents/rules`, `AGENTS.md` | Same local paths, copied from installed dependency |
| Updates | Rerun CLI and review source conflicts | Rerun CLI with a package revision; refresh dependency and guidance |

### Package mode

Requires Node.js 20.19+, React 19, React DOM 19, React Hook Form 7.72+ and a
Tailwind CSS v4 pipeline in the consuming application. The React libraries and
Tailwind are peer dependencies; package-manager peer dependency errors must be
resolved in the application. ESM imports and TypeScript `bundler`/`node16`/
`nodenext` module resolution are supported.

After the package-enabled revision has been pushed to GitHub:

```bash
npx github:xizot/ui-design-system init --mode package
```

The installer detects the package manager from the lockfile, adds the dependency,
prepends the stylesheet import to an existing `app/globals.css`,
`src/app/globals.css`, `src/index.css`, or `src/globals.css`, and updates only its
marked section in `AGENTS.md`. Repeating setup preserves the dependency's saved
version/source and does not duplicate the CSS import or agent rules. Package mode
copies the complete `.agents/skills` and `.agents/rules` from the installed dependency into the application so agent clients can discover them locally. Shipped guidance files are refreshed on each setup; unrelated skills/rules and text outside the marked AGENTS section are preserved. Keep custom instructions outside installer-owned files.

Specify another global stylesheet or a pinned Git revision/tarball as needed:

```bash
npx github:xizot/ui-design-system init --mode package \
  --package 'github:xizot/ui-design-system#<commit-or-tag>' \
  --css src/styles.css
```

If no known stylesheet exists, the installer creates `design-system.css`. Import
that file from your application entry point and process it through Tailwind v4.
Existing CSS is preserved; the package stylesheet includes the design-system
theme, base styles, animations and its own Tailwind `@source` registration.

```tsx
import { Button } from 'ui-design-system/components/ui/button';
import { RHFInput } from 'ui-design-system/components/rhf';
import { cn } from 'ui-design-system/lib/utils';
```

Imports use explicit component/hook/utility paths; there is no root barrel export.
Compiled JavaScript and declarations live in `dist/`; source and skills also ship
for inspection. Do not edit files in `node_modules`. Upgrade the dependency to
receive changes. Existing `design-system/` files and imports are not migrated or
deleted automatically when switching modes.

For direct package installation without the CLI, install a tarball or Git
revision using your package manager, then run `npx ui-design-system init --mode package` to install local agent guidance and configure CSS. A dependency install alone does not set up `.agents` or `AGENTS.md`. The stylesheet import is:

```css
@import 'ui-design-system/styles.css';
```

### Build and test a local package

```bash
npm run build:package
npm run test:package
npm pack
```

`prepare` builds the library during packing and Git dependency installation.
Registry/tarball consumers receive prebuilt files and do not need TypeScript or
Next.js to build the library. The existing `npm run build` still builds the docs app.

From a consuming application's directory:

```bash
node /path/to/ui-design-system/bin/install.cjs init --mode package \
  --package /path/to/ui-design-system/ui-design-system-0.1.0.tgz \
  --css src/index.css
```

### Source mode (default)

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
