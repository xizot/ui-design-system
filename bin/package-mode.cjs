const fs = require('node:fs');
const path = require('node:path');

function parseArguments(args) {
  const options = {
    command: 'init',
    mode: 'source',
    packageSpec: null,
    css: null,
  };
  if (args[0] && !args[0].startsWith('-')) options.command = args.shift();
  while (args.length) {
    const flag = args.shift();
    if (flag === '--help' || flag === '-h') {
      options.command = 'help';
      continue;
    }
    const key = {
      '--mode': 'mode',
      '--package': 'packageSpec',
      '--css': 'css',
    }[flag];
    if (!key) throw new Error(`Unknown option: ${flag}`);
    const value = args.shift();
    if (!value || value.startsWith('-')) throw new Error(`Missing value for ${flag}`);
    options[key] = value;
  }
  if (!['source', 'package'].includes(options.mode))
    throw new Error('Mode must be source or package.');
  if (options.mode !== 'package' && (options.packageSpec || options.css)) {
    throw new Error('--package and --css require --mode package.');
  }
  return options;
}

function resolveStylesheet(projectRoot, requested) {
  const candidates = ['app/globals.css', 'src/app/globals.css', 'src/index.css', 'src/globals.css'];
  const name =
    requested ||
    candidates.find((file) => fs.existsSync(path.join(projectRoot, file))) ||
    'design-system.css';
  const target = path.resolve(projectRoot, name);
  const relative = path.relative(projectRoot, target);
  if (
    relative.startsWith('..' + path.sep) ||
    path.isAbsolute(relative) ||
    !relative ||
    path.extname(target) !== '.css'
  ) {
    throw new Error('--css must identify a CSS file inside the project.');
  }
  if (fs.existsSync(target) && !fs.statSync(target).isFile())
    throw new Error('CSS target is not a file.');
  return target;
}

function setupStylesheet(target) {
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  const activeCss = current.replace(/\/\*[\s\S]*?\*\//g, '');
  if (/@import\s+['"]ui-design-system\/styles\.css['"]\s*;/.test(activeCss)) return;
  // Preserve @charset as the first rule, if present. Keep all user CSS intact.
  const charset = current.match(/^\uFEFF?@charset\s+['"][^'"]+['"];\s*/)?.[0] || '';
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(
    target,
    `${charset}@import 'ui-design-system/styles.css';\n${current.slice(charset.length)}`,
  );
}

function packageAgentRules() {
  return [
    '# Design system package mode',
    '',
    '- Shared UI is installed as the `ui-design-system` dependency. Import from `ui-design-system/components/ui/<component>`, `ui-design-system/components/rhf`, `ui-design-system/hooks/<hook>`, or `ui-design-system/lib/<utility>`.',
    '- Read source and prop contracts in `node_modules/ui-design-system/components`, `hooks`, `lib`, and `constants`. Do not edit or copy components out of node_modules; upgrade the dependency to receive changes.',
    '- Read `node_modules/ui-design-system/.agents/skills/xizot-design-system/SKILL.md` before UI work and the sibling forms/page-builder/quality skills as appropriate. Resolve skill references relative to that package.',
    '- Discover components with `python3 node_modules/ui-design-system/.agents/skills/xizot-design-system/scripts/ui-source.py --root node_modules/ui-design-system discover "input"`. Review app code with the same script and `--root . review path/to/file.tsx`.',
    '- Package imports take precedence over source-mode `@/design-system/...` examples in the bundled skills. Keep product logic in the application and use existing RHF wrappers for submitted forms.',
    "- Import `ui-design-system/styles.css` in the application's global CSS processed by Tailwind CSS v4. The package registers its own class sources.",
    '- Run scoped lint/types and relevant behavior checks; do not treat heuristic scans as correctness or accessibility proof.',
  ].join('\n');
}

function installPackageMode(options, { projectRoot, installDependencies, upsertAgentUsageRules }) {
  const manifestPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(manifestPath))
    throw new Error('Package mode requires a project package.json.');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.name === 'ui-design-system')
    throw new Error('Cannot install ui-design-system into itself.');
  const stylesheet = resolveStylesheet(projectRoot, options.css);
  const existing = manifest.dependencies?.['ui-design-system'];
  const spec = options.packageSpec || existing || 'github:xizot/ui-design-system';
  // Retain the consumer's version/source on subsequent setup runs.
  const dependency = !options.packageSpec && existing ? `ui-design-system@${existing}` : spec;
  if (!installDependencies([dependency])) return;
  const installed = path.join(projectRoot, 'node_modules/ui-design-system');
  if (!fs.existsSync(path.join(installed, 'dist/styles.css'))) {
    throw new Error(
      'Installed package has no dist/styles.css. Build a package-enabled revision and retry.',
    );
  }
  setupStylesheet(stylesheet);
  upsertAgentUsageRules(packageAgentRules());
  console.log(`Package installed: ${installed}`);
  console.log(`Styles configured: ${path.relative(projectRoot, stylesheet)}`);
  console.log('Ensure this CSS file is imported by your app and processed by Tailwind CSS v4.');
  console.log("Usage: import { Button } from 'ui-design-system/components/ui/button';");
}

module.exports = {
  parseArguments,
  resolveStylesheet,
  setupStylesheet,
  installPackageMode,
};
