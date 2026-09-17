const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { test } = require('node:test');
const {
  parseArguments,
  resolveStylesheet,
  setupStylesheet,
  installPackageMode,
} = require('../bin/package-mode.cjs');

const root = path.resolve(__dirname, '..');
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-package-test-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

test('CLI defaults to source and validates package options before mutations', () => {
  assert.equal(parseArguments([]).mode, 'source');
  assert.equal(parseArguments(['init', '--mode', 'source']).mode, 'source');
  assert.deepEqual(
    parseArguments(['--mode', 'package', '--css', 'src/index.css']),
    {
      command: 'init',
      mode: 'package',
      css: 'src/index.css',
      packageSpec: null,
    },
  );
  for (const args of [
    ['--mode'],
    ['--mode', 'other'],
    ['--unknown'],
    ['--css', 'x.css'],
  ]) {
    assert.throws(() => parseArguments(args));
  }
});

test('stylesheet setup preserves existing CSS, charset and repeated setup', (t) => {
  const project = fixture(t);
  const target = resolveStylesheet(project, 'src/styles.css');
  fs.mkdirSync(path.dirname(target));
  const original =
    '@charset "UTF-8";\n@import "tailwindcss";\n.app { color: red; }\n';
  fs.writeFileSync(target, original);
  setupStylesheet(target);
  setupStylesheet(target);
  const updated = fs.readFileSync(target, 'utf8');
  assert.ok(updated.startsWith('@charset "UTF-8";'));
  assert.equal(
    updated.replace("@import 'ui-design-system/styles.css';\n", ''),
    original,
  );
  assert.equal(updated.match(/ui-design-system\/styles.css/g).length, 1);
  assert.throws(() => resolveStylesheet(project, '../outside.css'));
  assert.throws(() => resolveStylesheet(project, 'file.ts'));
});

test('failed dependency install does not write CSS or agent rules', (t) => {
  const projectRoot = fixture(t);
  fs.writeFileSync(
    path.join(projectRoot, 'package.json'),
    '{"name":"consumer"}',
  );
  installPackageMode(
    { css: null, packageSpec: null },
    {
      projectRoot,
      installDependencies: () => false,
      upsertAgentUsageRules: () =>
        assert.fail('must not update rules after failure'),
    },
  );
  assert.deepEqual(fs.readdirSync(projectRoot), ['package.json']);
});

test('package setup retains saved dependency and leaves source copies untouched', (t) => {
  const projectRoot = fixture(t);
  fs.writeFileSync(
    path.join(projectRoot, 'package.json'),
    JSON.stringify({
      name: 'consumer',
      dependencies: { 'ui-design-system': 'file:../ui.tgz' },
    }),
  );
  const installed = path.join(
    projectRoot,
    'node_modules/ui-design-system/dist',
  );
  fs.mkdirSync(installed, { recursive: true });
  fs.writeFileSync(path.join(installed, 'styles.css'), '');
  let rules;
  installPackageMode(
    { css: null, packageSpec: null },
    {
      projectRoot,
      installDependencies: (dependencies) => {
        assert.deepEqual(dependencies, ['ui-design-system@file:../ui.tgz']);
        return true;
      },
      upsertAgentUsageRules: (content) => {
        rules = content;
      },
    },
  );
  assert.match(rules, /node_modules\/ui-design-system/);
  assert.ok(!fs.existsSync(path.join(projectRoot, 'design-system')));
  assert.ok(fs.existsSync(path.join(projectRoot, 'design-system.css')));
});

test('all emitted ESM modules load and public export targets exist', async () => {
  const manifest = require('../package.json');
  for (const file of fs.readdirSync(path.join(root, 'dist'), {
    recursive: true,
  })) {
    if (file.endsWith('.js'))
      await import(pathToFileURL(path.join(root, 'dist', file)).href);
  }
  for (const [key, entry] of Object.entries(manifest.exports)) {
    if (key.includes('*')) continue;
    for (const target of typeof entry === 'string'
      ? [entry]
      : Object.values(entry)) {
      assert.ok(fs.existsSync(path.join(root, target)), target);
    }
  }
  assert.match(
    fs.readFileSync(path.join(root, 'dist/components/ui/dialog.js'), 'utf8'),
    /^['"]use client['"]/,
  );
  assert.match(
    fs.readFileSync(path.join(root, 'dist/styles.css'), 'utf8'),
    /@source "\.\/\*\*\/\*\.js"/,
  );
  assert.doesNotMatch(
    fs.readFileSync(path.join(root, 'dist/components/ui/bubble.js'), 'utf8'),
    /@\/lib/,
  );
});

test('source mode still copies components and preserves existing project files', async (t) => {
  const project = fixture(t);
  fs.writeFileSync(path.join(project, 'AGENTS.md'), '# Consumer rules\n');
  await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [path.join(root, 'bin/install.cjs'), 'init', '--mode', 'source'],
      { cwd: project },
    );
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error('Installer prompt timed out'));
    }, 15000);
    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('type "skip" to skip): ')) {
        output = '';
        child.stdin.end('skip\n');
      }
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else reject(new Error(`Source installer exited ${code}: ${output}`));
    });
  });
  assert.ok(
    fs.existsSync(path.join(project, 'design-system/components/ui/button.tsx')),
  );
  assert.ok(
    fs.existsSync(
      path.join(project, '.agents/skills/xizot-design-system/SKILL.md'),
    ),
  );
  assert.match(
    fs.readFileSync(path.join(project, 'AGENTS.md'), 'utf8'),
    /^# Consumer rules/,
  );
  assert.ok(!fs.existsSync(path.join(project, 'app/globals.css')));
});

test('invalid CLI options exit nonzero without installing', (t) => {
  const project = fixture(t);
  const result = spawnSync(
    process.execPath,
    [path.join(root, 'bin/install.cjs'), '--mode', 'invalid'],
    { cwd: project },
  );
  assert.equal(result.status, 1);
  assert.deepEqual(fs.readdirSync(project), []);
});
