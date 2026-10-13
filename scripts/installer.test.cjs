const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const ts = require('typescript');
const { runtimeDependencies } = require('../bin/install.cjs');
const {
  planProject,
  dependencyPlan,
  packageManager,
  wrapConfig,
  parseJson,
} = require('../bin/project.cjs');
const root = path.resolve(__dirname, '..');
function write(dir, file, value) {
  fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
  fs.writeFileSync(
    path.join(dir, file),
    typeof value === 'string' ? value : JSON.stringify(value, null, 2),
  );
}
function fixture(t, framework = 'vite', typed = true) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-installer-test-'));
  t.after(() => {
    assert.ok(path.resolve(dir).startsWith(path.resolve(os.tmpdir()) + path.sep));
    fs.rmSync(dir, { recursive: true, force: true });
  });
  const dependencies = Object.fromEntries(
    runtimeDependencies.map((spec) => {
      const i = spec.indexOf('@', spec.startsWith('@') ? 1 : 0);
      return [spec.slice(0, i), spec.slice(i + 1)];
    }),
  );
  const devDependencies = {
    tailwindcss: '4.3.0',
    '@tailwindcss/postcss': '4.3.0',
    postcss: '8.5.6',
  };
  if (typed)
    Object.assign(devDependencies, {
      typescript: '5.9.3',
      '@types/node': '20.19.0',
      '@types/react': '19.2.2',
      '@types/react-dom': '19.2.2',
    });
  if (framework === 'vite') {
    devDependencies.vite = '^7';
    write(
      dir,
      'vite.config.ts',
      "import { defineConfig } from 'vite';\nexport default defineConfig({ plugins: [] });\n",
    );
  } else if (framework === 'next') dependencies.next = '16.2.3';
  else {
    dependencies['react-scripts'] = '5.0.1';
    devDependencies['@craco/craco'] = '7.1.0';
    if (typed) {
      devDependencies.typescript = '4.9.5';
      devDependencies['xizot-typescript'] = 'npm:typescript@5.9.3';
    }
  }
  write(dir, 'package.json', {
    dependencies,
    devDependencies,
    scripts:
      framework === 'cra'
        ? { start: 'react-scripts start', build: 'react-scripts build', test: 'react-scripts test' }
        : {},
  });
  if (typed)
    write(dir, framework === 'vite' ? 'tsconfig.app.json' : 'tsconfig.json', {
      compilerOptions: {
        jsx: 'react-jsx',
        module: 'esnext',
        moduleResolution: 'node',
        strict: true,
      },
      include: ['src'],
    });
  write(
    dir,
    framework === 'next' ? 'src/app/globals.css' : 'src/index.css',
    '/* existing theme */\nbody { color: red; }\n',
  );
  return dir;
}
function install(dir, input, args = ['init']) {
  const r = spawnSync(process.execPath, [path.join(root, 'bin/install.cjs'), ...args], {
    cwd: dir,
    input,
    encoding: 'utf8',
    timeout: 30000,
  });
  assert.equal(r.status, 0, r.stderr + r.stdout);
  return r.stdout;
}
function resolve(dir, configName, name) {
  const parsed = ts.parseJsonConfigFileContent(
    ts.readConfigFile(path.join(dir, configName), ts.sys.readFile).config,
    ts.sys,
    dir,
  );
  return ts.resolveModuleName(name, path.join(dir, 'src/App.tsx'), parsed.options, ts.sys)
    .resolvedModule;
}
for (const framework of ['vite', 'next', 'cra'])
  for (const typed of [true, false])
    test(`${framework} ${typed ? 'TS' : 'JS'} sources, IDE resolution and CSS preservation`, (t) => {
      const dir = fixture(t, framework, typed);
      write(dir, 'AGENTS.md', '# Consumer rules\n');
      install(dir);
      const source = framework === 'cra' ? 'src/design-system' : 'design-system',
        ext = typed ? 'tsx' : 'jsx';
      assert.ok(fs.existsSync(path.join(dir, source, `components/ui/button.${ext}`)));
      assert.ok(fs.existsSync(path.join(dir, 'postcss.config.cjs')));
      const css = fs.readFileSync(
        path.join(dir, framework === 'next' ? 'src/app/globals.css' : 'src/index.css'),
        'utf8',
      );
      assert.match(css, /existing theme/);
      assert.match(css, /@import .*design-system\/styles.css/);
      const config = typed
        ? framework === 'vite'
          ? 'tsconfig.app.json'
          : 'tsconfig.json'
        : 'jsconfig.json';
      assert.ok(
        resolve(
          dir,
          config,
          `${framework === 'cra' ? 'design-system' : '@/design-system'}/components/ui/button`,
        ),
      );
      const agents = fs.readFileSync(path.join(dir, 'AGENTS.md'), 'utf8');
      assert.match(agents, /^# Consumer rules/);
      if (framework === 'cra') {
        assert.equal(
          JSON.parse(fs.readFileSync(path.join(dir, 'package.json'))).scripts.build,
          'craco build',
        );
        assert.match(agents, /src\/design-system/);
      }
      if (!typed)
        assert.doesNotMatch(
          fs.readFileSync(path.join(dir, source, 'components/ui/button.jsx'), 'utf8'),
          /VariantProps|React\.ComponentProps/,
        );
    });
test('existing aliases and JSONC comments survive', (t) => {
  const dir = fixture(t);
  write(
    dir,
    'tsconfig.app.json',
    '{ // keep comment\n "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"], "~/*": ["src/*"] } }, "include": ["src"], }',
  );
  install(dir);
  const text = fs.readFileSync(path.join(dir, 'tsconfig.app.json'), 'utf8');
  assert.match(text, /keep comment/);
  assert.equal((text.match(/"paths"/g) || []).length, 1);
  const paths = parseJson(text, 'fixture').compilerOptions.paths;
  assert.deepEqual(paths['@/*'], ['src/*']);
  assert.deepEqual(paths['~/*'], ['src/*']);
  assert.ok(resolve(dir, 'tsconfig.app.json', '@/design-system/components/ui/button'));
});
test('inherited aliases keep their original locations', (t) => {
  const dir = fixture(t);
  write(dir, 'config/base.json', { compilerOptions: { paths: { '~/*': ['../src/*'] } } });
  write(dir, 'tsconfig.app.json', {
    extends: './config/base.json',
    compilerOptions: { jsx: 'react-jsx' },
  });
  install(dir);
  assert.deepEqual(
    parseJson(fs.readFileSync(path.join(dir, 'tsconfig.app.json'), 'utf8'), 'fixture')
      .compilerOptions.paths['~/*'],
    ['./src/*'],
  );
});
test('reinstall is idempotent and skip preserves edited components', (t) => {
  const dir = fixture(t);
  install(dir);
  write(dir, 'design-system/components/ui/button.tsx', '// local\n');
  const files = ['tsconfig.app.json', 'vite.config.ts', 'src/index.css', 'AGENTS.md'];
  const before = files.map((f) => fs.readFileSync(path.join(dir, f), 'utf8'));
  install(dir, '2\n');
  assert.equal(
    fs.readFileSync(path.join(dir, 'design-system/components/ui/button.tsx'), 'utf8'),
    '// local\n',
  );
  assert.deepEqual(
    files.map((f) => fs.readFileSync(path.join(dir, f), 'utf8')),
    before,
  );
});
test('incompatible dependencies fail before writes', (t) => {
  const dir = fixture(t),
    pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json')));
  pkg.dependencies.react = '^18.2.0';
  pkg.devDependencies.tailwindcss = '^3.4.0';
  write(dir, 'package.json', pkg);
  const r = spawnSync(process.execPath, [path.join(root, 'bin/install.cjs')], {
    cwd: dir,
    encoding: 'utf8',
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /Incompatible dependencies/);
  assert.ok(!fs.existsSync(path.join(dir, 'design-system')));
  assert.ok(!fs.existsSync(path.join(dir, '.xizot')));
});
test('declining packages leaves project untouched', (t) => {
  const dir = fixture(t),
    pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json')));
  delete pkg.dependencies['react-is'];
  write(dir, 'package.json', pkg);
  install(dir, 'n\n');
  assert.ok(!fs.existsSync(path.join(dir, 'design-system')));
  assert.doesNotMatch(fs.readFileSync(path.join(dir, 'vite.config.ts'), 'utf8'), /xizot/);
});
test('peer-only packages are added and installed versions checked', (t) => {
  const dir = fixture(t);
  assert.deepEqual(dependencyPlan(dir, { peerDependencies: { zod: '^4' } }, ['zod@4.6.5']).add, [
    'zod@4.6.5',
  ]);
  write(dir, 'node_modules/zod/package.json', { version: '3.25.0' });
  assert.equal(
    dependencyPlan(dir, { dependencies: { zod: '^4.6.5' } }, ['zod@4.6.5']).conflicts.length,
    1,
  );
});
test('explicit package manager wins; conflicting lockfiles fail', (t) => {
  const dir = fixture(t);
  write(dir, 'yarn.lock', '');
  write(dir, 'package-lock.json', '{}');
  assert.equal(packageManager(dir, { packageManager: 'pnpm@10.0.0' }), 'pnpm');
  assert.throws(() => packageManager(dir, {}), /Multiple package-manager/);
});
test('Vite wrapper preserves async factories and aliases', async () => {
  const wrap = require('../bin/templates/vite.cjs'),
    original = { plugins: ['existing'], resolve: { dedupe: ['react'], alias: { '@': '/src' } } };
  const r = await wrap(async (env) => ({ ...original, mode: env.mode }))({ mode: 'test' });
  assert.equal(r.mode, 'test');
  assert.deepEqual(r.plugins, ['existing']);
  assert.deepEqual(r.resolve.dedupe, ['react']);
  assert.deepEqual(r.resolve.alias[1], { find: '@', replacement: '/src' });
  assert.ok(r.resolve.alias[0].find.test('@/design-system/components/ui/button'));
  assert.ok(!r.resolve.alias[0].find.test('@/design-system-other'));
});
test('PostCSS options preserved', () => {
  const wrap = require('../bin/templates/postcss.cjs'),
    existing = {
      map: true,
      plugins: { autoprefixer: {}, '@tailwindcss/postcss': { optimize: false } },
    };
  assert.deepEqual(wrap(existing), existing);
  assert.deepEqual(wrap({ plugins: { autoprefixer: {} } }).plugins, {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  });
});
test('config wrapping supports CJS and functions idempotently', () => {
  for (const code of [
    'export default defineConfig(async () => ({...base}));',
    'module.exports = (env) => ({...base});',
  ]) {
    const r = wrapConfig(code, 'config.js', './helper.cjs', 'Test');
    assert.match(r, /withXizotTest\(/);
    assert.equal(wrapConfig(r, 'config.js', './helper.cjs', 'Test'), r);
  }
  assert.throws(
    () => wrapConfig('export { config as default }', 'config.js', './helper', 'Test'),
    /Cannot safely configure/,
  );
});
test('unsupported options and projects do not copy files', (t) => {
  const dir = fixture(t);
  for (const args of [['--package'], ['--mode', 'package'], ['--unknown']]) {
    const r = spawnSync(process.execPath, [path.join(root, 'bin/install.cjs'), ...args], {
      cwd: dir,
    });
    assert.equal(r.status, 1);
    assert.ok(!fs.existsSync(path.join(dir, 'design-system')));
  }
  write(dir, 'package.json', { dependencies: { react: '19.2.4' } });
  assert.throws(() => planProject(dir, runtimeDependencies), /Supported projects/);
});
