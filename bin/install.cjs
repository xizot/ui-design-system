#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const packageRoot = path.resolve(__dirname, "..");
const projectRoot = process.cwd();
const installRootName = "design-system";
const targetRoot = path.join(projectRoot, installRootName);
const directoriesToCopy = ["components", "constants", "hooks", "lib"];
const runtimeDependencies = [
  "@base-ui/react",
  "@tanstack/react-table",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "date-fns",
  "embla-carousel-react",
  "input-otp",
  "lucide-react",
  "next-themes",
  "nuqs",
  "react",
  "react-day-picker",
  "react-dom",
  "react-hook-form",
  "react-resizable-panels",
  "recharts",
  "sonner",
  "tailwind-merge",
  "vaul",
  "zod",
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

function printList(items, limit = 10) {
  for (const item of items.slice(0, limit)) {
    console.log(`  - ${item}`);
  }

  if (items.length > limit) {
    console.log(`  - ...and ${items.length - limit} more`);
  }
}

function collectExistingFiles(sourceDir, targetDir, existingFiles = []) {
  if (!fs.existsSync(sourceDir)) {
    return existingFiles;
  }

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      collectExistingFiles(sourcePath, targetPath, existingFiles);
      continue;
    }

    if (fs.existsSync(targetPath)) {
      existingFiles.push(path.relative(targetRoot, targetPath));
    }
  }

  return existingFiles;
}

async function askConflictStrategy(existingFiles) {
  if (existingFiles.length === 0) {
    conflictState.defaultAction = "overwrite";
    return;
  }

  printSection("Step 1: Components");
  console.log("Existing files were found in the target project:");
  printList(existingFiles);
  console.log("");
  console.log("Choose how to handle those existing files:");
  console.log("  1. Overwrite all");
  console.log("  2. Skip existing");
  console.log("  3. Review one by one");

  const answer = await askQuestion(
    "Select an option (1/2/3, default: 3): "
  );

  switch (answer) {
    case "1":
    case "overwrite":
      conflictState.defaultAction = "overwrite";
      return;
    case "3":
    case "ask":
      conflictState.defaultAction = null;
      return;
    case "2":
    case "skip":
      conflictState.defaultAction = "skip";
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

  const relativeTargetPath = path.relative(targetRoot, targetPath) || targetPath;
  console.log("");
  console.log(color.yellow(`Existing file: ${relativeTargetPath}`));
  const answer = await askQuestion(
    "Choose 1 to overwrite or 2 to skip (default: 2): "
  );

  switch (answer) {
    case "1":
    case "overwrite":
      return "overwrite";
    case "2":
    case "skip":
    default:
      return "skip";
  }
}

async function copyDirectory(sourceDir, targetDir) {
  ensureDirectoryExists(targetDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.isSymbolicLink()) {
      if (fs.existsSync(targetPath)) {
        const action = await askConflictAction(targetPath);
        if (action === "skip") {
          conflictState.skipped.push(path.relative(targetRoot, targetPath));
          continue;
        }
      }

      const linkTarget = fs.readlinkSync(sourcePath);
      try {
        fs.unlinkSync(targetPath);
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
      fs.symlinkSync(linkTarget, targetPath);
      conflictState.overwritten.push(path.relative(targetRoot, targetPath));
      continue;
    }

    if (fs.existsSync(targetPath)) {
      const action = await askConflictAction(targetPath);
      if (action === "skip") {
        conflictState.skipped.push(path.relative(targetRoot, targetPath));
        continue;
      }
      conflictState.overwritten.push(path.relative(targetRoot, targetPath));
    }

    fs.copyFileSync(sourcePath, targetPath);
    conflictState.copied.push(path.relative(targetRoot, targetPath));
  }
}

function getTargetPackageJson() {
  const packageJsonPath = path.join(projectRoot, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch (error) {
    console.warn(color.yellow("Skipping dependency install because target package.json is invalid JSON."));
    return null;
  }
}

function getMissingDependencies(packageJson) {
  const installed = new Set([
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.optionalDependencies || {}),
  ]);

  return runtimeDependencies.filter((dependency) => !installed.has(dependency));
}

function detectPackageManager() {
  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) {
    return "pnpm";
  }

  if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) {
    return "yarn";
  }

  if (fs.existsSync(path.join(projectRoot, "bun.lockb")) || fs.existsSync(path.join(projectRoot, "bun.lock"))) {
    return "bun";
  }

  if (fs.existsSync(path.join(projectRoot, "package-lock.json"))) {
    return "npm";
  }

  return "npm";
}

function getInstallCommand(packageManager, dependencies) {
  switch (packageManager) {
    case "pnpm":
      return { command: "pnpm", args: ["add", ...dependencies] };
    case "yarn":
      return { command: "yarn", args: ["add", ...dependencies] };
    case "bun":
      return { command: "bun", args: ["add", ...dependencies] };
    default:
      return { command: "npm", args: ["install", ...dependencies] };
  }
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function installDependencies(dependencies) {
  const packageManager = detectPackageManager();
  const { command, args } = getInstallCommand(packageManager, dependencies);

  console.log(color.green(`Installing with ${packageManager}: ${dependencies.join(", ")}`));

  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    console.error(color.red(`Dependency installation failed with ${packageManager}.`));
    process.exitCode = result.status || 1;
    return false;
  }

  console.log(color.green("Dependencies installed successfully."));
  return true;
}

async function maybeInstallDependencies() {
  printSection("Step 2: Dependencies");
  const packageJson = getTargetPackageJson();

  if (!packageJson) {
    console.log(color.gray("No package.json found in the target project root. Skipping dependency installation."));
    return;
  }

  const missingDependencies = getMissingDependencies(packageJson);

  if (missingDependencies.length === 0) {
    console.log(color.green("All required dependencies are already installed."));
    return;
  }

  console.log("Missing dependencies detected:");
  for (const dependency of missingDependencies) {
    console.log(`  - ${dependency}`);
  }
  console.log("");
  console.log("Do you want to install these dependencies now?");
  console.log("  1. Yes, install now");
  console.log("  2. No, skip for now");

  const answer = await askQuestion("Select an option (1/2, default: 2): ");

  if (answer !== "1" && answer !== "y" && answer !== "yes") {
    console.log(color.yellow("Skipped dependency installation."));
    return;
  }

  installDependencies(missingDependencies);
}

function printSummary() {
  printSection("Summary");
  console.log(`Target: ${targetRoot}`);
  console.log(`Project root: ${projectRoot}`);
  console.log(`Install folder: ${installRootName}`);
  console.log(`Directories installed: ${directoriesToCopy.join(", ")}`);
  console.log(`Files copied: ${conflictState.copied.length}`);
  console.log(`Files overwritten: ${conflictState.overwritten.length}`);
  console.log(`Files skipped: ${conflictState.skipped.length}`);

  if (conflictState.overwritten.length > 0) {
    console.log("");
    console.log("Overwritten files:");
    printList(conflictState.overwritten, 5);
  }

  if (conflictState.skipped.length > 0) {
    console.log("");
    console.log("Skipped files:");
    printList(conflictState.skipped, 5);
  }
}

async function main() {
  const copied = [];
  const existingFiles = [];

  console.log(color.bold(color.cyan("UI Design System Installer")));
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
    console.error(color.red("No source directories were found to install."));
    process.exitCode = 1;
    return;
  }

  await maybeInstallDependencies();
  printSummary();
}

main().catch((error) => {
  console.error(color.red(String(error)));
  process.exit(1);
});
