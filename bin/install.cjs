#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const ts = require('typescript');
const { planProject, setJson } = require('./project.cjs');
const { installStyles } = require('./styles.cjs');

const packageRoot = path.resolve(__dirname, '..');
const projectRoot = process.cwd();
let installRootName = 'design-system';
let targetRoot = path.join(projectRoot, installRootName);
let projectPlan;
let cliOptions;
const directoriesToCopy = ['components', 'constants', 'hooks', 'lib'];
const agentUsageRulesSource = '.agents/skills/xizot-design-system/references/agent-rules.md';
const agentUsageRulesTarget = 'AGENTS.md';
const agentUsageRulesStartMarker = '<!-- BEGIN:design-system-usage-rules -->';
const agentUsageRulesEndMarker = '<!-- END:design-system-usage-rules -->';
const codexSkillSource = '.agents/skills';
const codexSkillTarget = '.agents/skills';
const agentRulesSource = '.agents/rules';
const agentRulesTarget = '.agents/rules';
const runtimeDependencies = [
  'shadcn@4.21.0',
  'tw-animate-css@1.4.0',
  '@base-ui/react@1.8.0',
  '@tanstack/react-table@8.21.3',
  'class-variance-authority@0.7.1',
  'clsx@2.1.1',
  'cmdk@1.1.1',
  'date-fns@4.4.0',
  'embla-carousel-react@8.6.0',
  'input-otp@1.5.0',
  'lucide-react@1.46.0',
  'next-themes@0.4.6',
  'nuqs@2.10.1',
  'react@19.2.4',
  'react-day-picker@10.0.1',
  'react-dom@19.2.4',
  'react-is@19.2.4',
  'react-hook-form@7.88.0',
  'react-resizable-panels@4.12.4',
  'recharts@3.10.1',
  'sonner@2.0.8',
  'tailwind-merge@3.7.0',
  'vaul@1.1.2',
  'zod@4.6.5',
];

function ensureDirectoryExists(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

const conflictState = {
  defaultAction: null,
  overwritten: [],
  skipped: [],
  copied: [],
};

const color = {
  bold(value) {
    return `\x1b[1m${value}\x1b[0m`;
  },
  cyan(value) {
    return `\x1b[36m${value}\x1b[0m`;
  },
  green(value) {
    return `\x1b[32m${value}\x1b[0m`;
  },
  yellow(value) {
    return `\x1b[33m${value}\x1b[0m`;
  },
  red(value) {
    return `\x1b[31m${value}\x1b[0m`;
  },
  gray(value) {
    return `\x1b[90m${value}\x1b[0m`;
  },
};

function printSection(title) {
  console.log(`\n${color.bold(color.cyan(title))}`);
}

function printHelp() {
  console.log(color.bold('UI Design System CLI'));
  console.log('');
  console.log('Usage:');
  console.log('  npx github:xizot/ui-design-system init');
  console.log('  npx github:xizot/ui-design-system');
  console.log('');
  console.log('Commands:');
  console.log('  init    Install into ./design-system (CRA: ./src/design-system)');
  console.log('          React 19, Tailwind 4; Vite, Next 15.1/16, CRA 5 with CRACO');
  console.log('  help    Show this help message');
  console.log(
    'Options: --yes (install packages, keep existing source), --overwrite (with --yes), --mode source',
  );
  console.log('');
}

function parseArguments(args) {
  let command = 'init';
  let yes = false,
    overwrite = false;
  if (args[0] && !args[0].startsWith('-')) command = args.shift();
  for (let index = 0; index < args.length; index++) {
    const flag = args[index];
    if (flag === '--help' || flag === '-h') {
      command = 'help';
    } else if (flag === '--mode' && args[index + 1] === 'source') {
      index++;
    } else if (flag === '--yes' || flag === '-y') {
      yes = true;
    } else if (flag === '--overwrite') {
      overwrite = true;
    } else {
      throw new Error(`Unknown option: ${flag}`);
    }
  }
  if (overwrite && !yes) throw new Error('--overwrite requires --yes.');
  return { command, yes, overwrite };
}

function printList(items, limit = 10) {
  for (const item of items.slice(0, limit)) {
    console.log(`  - ${item}`);
  }

  if (items.length > limit) {
    console.log(`  - ...and ${items.length - limit} more`);
  }
}

function relativePath(from, to) {
  return path.relative(from, to) || to;
}

function collectExistingFiles(sourceDir, targetDir, existingFiles = []) {
  if (!fs.existsSync(sourceDir)) {
    return existingFiles;
  }

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetName =
      projectPlan && !projectPlan.typed
        ? entry.name.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js')
        : entry.name;
    const targetPath = path.join(targetDir, targetName);

    if (entry.isDirectory()) {
      collectExistingFiles(sourcePath, targetPath, existingFiles);
      continue;
    }

    if (fs.existsSync(targetPath)) {
      existingFiles.push(relativePath(targetRoot, targetPath));
    }
  }

  return existingFiles;
}

async function askConflictStrategy(existingFiles) {
  if (cliOptions.yes) {
    conflictState.defaultAction = cliOptions.overwrite ? 'overwrite' : 'skip';
    return;
  }
  if (existingFiles.length === 0) {
    conflictState.defaultAction = 'overwrite';
    return;
  }

  printSection('Step 1: Components');
  console.log('Existing files were found in the target project:');
  printList(existingFiles);
  console.log('');
  console.log('Choose how to handle those existing files:');
  console.log('  1. Overwrite all');
  console.log('  2. Skip existing');
  console.log('  3. Review one by one');

  const answer = await askQuestion('Select an option (1/2/3, default: 3): ');

  switch (answer) {
    case '1':
    case 'overwrite':
      conflictState.defaultAction = 'overwrite';
      return;
    case '3':
    case 'ask':
      conflictState.defaultAction = null;
      return;
    case '2':
    case 'skip':
      conflictState.defaultAction = 'skip';
      return;
    default:
      conflictState.defaultAction = null;
      return;
  }
}

async function askConflictAction(targetPath) {
  if (conflictState.defaultAction) {
    return conflictState.defaultAction;
  }

  const relativeTargetPath = relativePath(targetRoot, targetPath);
  console.log('');
  console.log(color.yellow(`Existing file: ${relativeTargetPath}`));
  const answer = await askQuestion('Choose 1 to overwrite or 2 to skip (default: 2): ');

  switch (answer) {
    case '1':
    case 'overwrite':
      return 'overwrite';
    case '2':
    case 'skip':
    default:
      return 'skip';
  }
}

async function copyDirectory(sourceDir, targetDir) {
  ensureDirectoryExists(targetDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetName =
      projectPlan && !projectPlan.typed
        ? entry.name.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js')
        : entry.name;
    const targetPath = path.join(targetDir, targetName);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.isSymbolicLink()) {
      if (fs.existsSync(targetPath)) {
        const action = await askConflictAction(targetPath);
        if (action === 'skip') {
          conflictState.skipped.push(relativePath(targetRoot, targetPath));
          continue;
        }
      }

      const linkTarget = fs.readlinkSync(sourcePath);
      try {
        fs.unlinkSync(targetPath);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
      fs.symlinkSync(linkTarget, targetPath);
      conflictState.overwritten.push(relativePath(targetRoot, targetPath));
      continue;
    }

    if (fs.existsSync(targetPath)) {
      const action = await askConflictAction(targetPath);
      if (action === 'skip') {
        conflictState.skipped.push(relativePath(targetRoot, targetPath));
        continue;
      }
      conflictState.overwritten.push(relativePath(targetRoot, targetPath));
    }

    if (projectPlan && !projectPlan.typed && /\.tsx?$/.test(sourcePath)) {
      fs.writeFileSync(
        targetPath,
        ts.transpileModule(fs.readFileSync(sourcePath, 'utf8'), {
          compilerOptions: {
            jsx: ts.JsxEmit.Preserve,
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2020,
          },
          fileName: sourcePath,
        }).outputText,
      );
    } else fs.copyFileSync(sourcePath, targetPath);
    conflictState.copied.push(relativePath(targetRoot, targetPath));
  }
}

function detectPackageManager() {
  return projectPlan.manager;
}

function getInstallCommand(packageManager, dependencies, dev = false) {
  switch (packageManager) {
    case 'pnpm':
      return {
        command: 'pnpm',
        args: ['add', '--save-exact', ...(dev ? ['-D'] : []), ...dependencies],
      };
    case 'yarn':
      return { command: 'yarn', args: ['add', '--exact', ...(dev ? ['-D'] : []), ...dependencies] };
    case 'bun':
      return { command: 'bun', args: ['add', '--exact', ...(dev ? ['-d'] : []), ...dependencies] };
    default:
      return {
        command: 'npm',
        args: ['install', '--save-exact', ...(dev ? ['-D'] : []), ...dependencies],
      };
  }
}

function askQuestion(question, options = {}) {
  const { preserveCase = false } = options;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    let answered = false;
    rl.once('close', () => {
      if (!answered)
        reject(new Error('Input closed before an answer was received; installation stopped.'));
    });
    rl.question(question, (answer) => {
      answered = true;
      rl.close();
      const trimmedAnswer = answer.trim();
      resolve(preserveCase ? trimmedAnswer : trimmedAnswer.toLowerCase());
    });
  });
}

function installDependencies(dependencies, dev = false) {
  const packageManager = detectPackageManager();
  const { command, args } = getInstallCommand(packageManager, dependencies, dev);

  console.log(color.green(`Installing with ${packageManager}: ${dependencies.join(', ')}`));

  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    console.error(color.red(`Dependency installation failed with ${packageManager}.`));
    process.exitCode = result.status || 1;
    return false;
  }

  console.log(color.green('Dependencies installed successfully.'));
  return true;
}

function copyRootFiles() {
  printSection('Step 3: Agent Rules');
  upsertAgentUsageRules();
  installAgentRules();
  installCodexSkill();
}

function installAgentRules() {
  const sourcePath = path.join(packageRoot, agentRulesSource);
  const targetPath = path.join(projectRoot, agentRulesTarget);

  if (!fs.existsSync(sourcePath)) {
    console.log(color.gray(`Skipping missing agent rules: ${agentRulesSource}`));
    return;
  }

  fs.cpSync(sourcePath, targetPath, { recursive: true, force: true });
  conflictState.overwritten.push(agentRulesTarget);
  console.log(color.green(`Updated: ${agentRulesTarget}`));
}

function buildAgentUsageRulesSection() {
  const sourcePath = path.join(packageRoot, agentUsageRulesSource);

  if (!fs.existsSync(sourcePath)) {
    console.log(color.gray(`Skipping missing file: ${agentUsageRulesSource}`));
    return null;
  }

  const usageRules = fs
    .readFileSync(sourcePath, 'utf8')
    .trim()
    .replaceAll('@/design-system', projectPlan?.importPrefix || '@/design-system')
    .replaceAll('`design-system/', `\`${installRootName}/`);

  return `${agentUsageRulesStartMarker}\n\n${usageRules}\n\n${agentUsageRulesEndMarker}`;
}

function upsertAgentUsageRules(content) {
  const rulesSection = content
    ? `${agentUsageRulesStartMarker}\n\n${content}\n\n${agentUsageRulesEndMarker}`
    : buildAgentUsageRulesSection();

  if (!rulesSection) {
    return;
  }

  const targetPath = path.join(projectRoot, agentUsageRulesTarget);
  ensureDirectoryExists(path.dirname(targetPath));

  const currentContent = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : '';
  const startIndex = currentContent.indexOf(agentUsageRulesStartMarker);
  const endIndex = currentContent.indexOf(agentUsageRulesEndMarker);

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const before = currentContent.slice(0, startIndex).trimEnd();
    const after = currentContent.slice(endIndex + agentUsageRulesEndMarker.length).trimStart();
    const nextContent = [before, rulesSection, after].filter(Boolean).join('\n\n');

    fs.writeFileSync(targetPath, `${nextContent}\n`);
    conflictState.overwritten.push(agentUsageRulesTarget);
    console.log(color.green(`Updated: ${agentUsageRulesTarget} design system rules`));
    return;
  }

  if (startIndex !== -1 || endIndex !== -1) {
    console.log(
      color.yellow(
        `Malformed design system rules markers found in ${agentUsageRulesTarget}; appending a fresh section.`,
      ),
    );
  }

  const nextContent = [currentContent.trimEnd(), rulesSection].filter(Boolean).join('\n\n');
  fs.writeFileSync(targetPath, `${nextContent}\n`);
  conflictState.copied.push(`${agentUsageRulesTarget} design system rules`);
  console.log(color.green(`Added: ${agentUsageRulesTarget} design system rules`));
}

function copyDirectoryOverwrite(sourceDir, targetDir) {
  ensureDirectoryExists(targetDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryOverwrite(sourcePath, targetPath);
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
}

function installCodexSkill() {
  const sourcePath = path.join(packageRoot, codexSkillSource);

  if (!fs.existsSync(sourcePath)) {
    console.log(color.gray(`Skipping missing Codex skills: ${codexSkillSource}`));
    return;
  }

  const targetPath = path.join(projectRoot, codexSkillTarget);

  if (path.resolve(sourcePath) === path.resolve(targetPath)) {
    console.log(color.green(`Codex skills already available: ${codexSkillTarget}`));
    return;
  }

  const existed = fs.existsSync(targetPath);

  copyDirectoryOverwrite(sourcePath, targetPath);

  if (existed) {
    conflictState.overwritten.push(codexSkillTarget);
    console.log(color.green(`Updated Codex skills: ${codexSkillTarget}`));
    return;
  }

  conflictState.copied.push(codexSkillTarget);
  console.log(color.green(`Added Codex skills: ${codexSkillTarget}`));
}

function printSummary() {
  printSection('Summary');
  console.log(`Target: ${targetRoot}`);
  console.log(`Project root: ${projectRoot}`);
  console.log(`Install folder: ${installRootName}`);
  console.log(`Directories installed: ${directoriesToCopy.join(', ')}`);
  console.log(`Files copied: ${conflictState.copied.length}`);
  console.log(`Files overwritten: ${conflictState.overwritten.length}`);
  console.log(`Files skipped: ${conflictState.skipped.length}`);

  if (conflictState.overwritten.length > 0) {
    console.log('');
    console.log('Overwritten files:');
    printList(conflictState.overwritten, 5);
  }

  if (conflictState.skipped.length > 0) {
    console.log('');
    console.log('Skipped files:');
    printList(conflictState.skipped, 5);
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  cliOptions = options;
  const { command } = options;
  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command !== 'init') {
    console.error(color.red(`Unknown command: ${command}`));
    console.log('');
    printHelp();
    process.exitCode = 1;
    return;
  }

  // Validate dependencies and every configuration edit before copying source.
  projectPlan = planProject(projectRoot, runtimeDependencies);
  installRootName = projectPlan.sourceRoot;
  targetRoot = path.join(projectRoot, installRootName);
  printSection(
    `Project: ${projectPlan.framework} (${projectPlan.typed ? 'TypeScript' : 'JavaScript'})`,
  );
  const missing = projectPlan.dependencies.flatMap((plan) => plan.add);
  if (missing.length) {
    console.log('Required packages:');
    printList(missing, missing.length);
    const answer = options.yes ? 'yes' : await askQuestion('Install required packages? (y/N): ');
    if (!['y', 'yes', '1'].includes(answer)) {
      console.log('Installation cancelled; no project files changed.');
      return;
    }
    for (const plan of projectPlan.dependencies) {
      if (plan.add.length && !installDependencies(plan.add, plan.dev)) return;
    }
  }

  const copied = [];
  const existingFiles = [];

  console.log(color.bold(color.cyan('UI Design System Installer')));
  console.log(color.gray(`Source: ${packageRoot}`));
  console.log(color.gray(`Project root: ${projectRoot}`));
  console.log(color.gray(`Install target: ${targetRoot}`));

  for (const directory of directoriesToCopy) {
    const sourceDir = path.join(packageRoot, directory);

    if (!fs.existsSync(sourceDir)) {
      console.warn(`Skipping missing directory: ${directory}`);
      continue;
    }

    const targetDir = path.join(targetRoot, directory);
    collectExistingFiles(sourceDir, targetDir, existingFiles);
  }

  await askConflictStrategy(existingFiles);

  for (const directory of directoriesToCopy) {
    const sourceDir = path.join(packageRoot, directory);

    if (!fs.existsSync(sourceDir)) {
      continue;
    }

    const targetDir = path.join(targetRoot, directory);
    await copyDirectory(sourceDir, targetDir);
    copied.push(directory);
  }

  if (copied.length === 0) {
    console.error(color.red('No source directories were found to install.'));
    process.exitCode = 1;
    return;
  }

  copyRootFiles();
  for (const [name, value] of projectPlan.changes) {
    const target = path.join(projectRoot, name);
    ensureDirectoryExists(path.dirname(target));
    // Dependency installation has already updated package.json. Only merge scripts.
    let content = value;
    if (name === 'package.json') {
      const plannedPackage = JSON.parse(value);
      content = setJson(fs.readFileSync(target, 'utf8'), ['scripts'], plannedPackage.scripts);
      if (plannedPackage.eslintConfig)
        content = setJson(content, ['eslintConfig'], plannedPackage.eslintConfig);
    }
    fs.writeFileSync(target, content);
  }
  configureConsumerChecks();
  installStyles(packageRoot, projectRoot, projectPlan);
  printSummary();
  console.log(`Import components from '${projectPlan.importPrefix}/components/ui/button'.`);
}

function configureConsumerChecks() {
  const ignoredDirectory = `${installRootName.replaceAll('\\', '/')}/`;
  const prettierIgnorePath = path.join(projectRoot, '.prettierignore');
  const currentIgnore = fs.existsSync(prettierIgnorePath)
    ? fs.readFileSync(prettierIgnorePath, 'utf8')
    : '';
  if (!currentIgnore.split(/\r?\n/).includes(ignoredDirectory)) {
    fs.writeFileSync(
      prettierIgnorePath,
      `${currentIgnore}${currentIgnore && !currentIgnore.endsWith('\n') ? '\n' : ''}${ignoredDirectory}\n`,
    );
  }

  const packagePath = path.join(projectRoot, 'package.json');
  const packageText = fs.readFileSync(packagePath, 'utf8');
  const lint = JSON.parse(packageText).scripts?.lint;
  if (
    typeof lint === 'string' &&
    /^\s*eslint(?:\s|$)/.test(lint) &&
    !/[;&|]/.test(lint) &&
    !lint.includes(`--ignore-pattern "${ignoredDirectory}**"`)
  ) {
    const nextLint = `${lint} --ignore-pattern "${ignoredDirectory}**"`;
    fs.writeFileSync(packagePath, setJson(packageText, ['scripts', 'lint'], nextLint));
  }
}

module.exports = { runtimeDependencies, main };

if (require.main === module)
  main().catch((error) => {
    console.error(color.red(String(error)));
    process.exit(1);
  });
