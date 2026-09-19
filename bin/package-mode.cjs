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

function installAgentGuidance(installed, projectRoot) {
  const source = path.join(installed, '.agents');
  const rulesFile = path.join(
    source,
    'skills/xizot-design-system/references/package-agent-rules.md',
  );
  for (const required of [
    'skills/xizot-design-system/SKILL.md',
    'rules/react.md',
    'skills/xizot-design-system/references/package-agent-rules.md',
  ]) {
    if (!fs.existsSync(path.join(source, required))) {
      throw new Error(
        `Installed package is missing agent guidance: ${required}. Install a revision supporting package guidance.`,
      );
    }
  }
  const rules = fs.readFileSync(rulesFile, 'utf8');
  // Merge shipped guidance, preserving unrelated consumer skills and rules.
  for (const folder of ['skills', 'rules']) {
    fs.cpSync(path.join(source, folder), path.join(projectRoot, '.agents', folder), {
      recursive: true,
      force: true,
    });
  }
  return rules;
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
  const agentRules = installAgentGuidance(installed, projectRoot);
  setupStylesheet(stylesheet);
  upsertAgentUsageRules(agentRules);
  console.log('Agent skills and rules updated: .agents/');
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
