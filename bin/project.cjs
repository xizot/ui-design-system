const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const jsonc = require('jsonc-parser');
const semver = require('semver');
const libraryPackage = require('../package.json');

const slash = (value) => value.replaceAll('\\', '/');
const exists = (root, name) => fs.existsSync(path.join(root, name));
const read = (root, name) => fs.readFileSync(path.join(root, name), 'utf8');

function parseJson(text, name) {
  const errors = [];
  const value = jsonc.parse(text, errors, { allowTrailingComma: true });
  if (errors.length || !value || typeof value !== 'object')
    throw new Error(`Invalid JSON configuration: ${name}`);
  return value;
}

function setJson(text, keys, value) {
  return jsonc.applyEdits(
    text,
    jsonc.modify(text, keys, value, {
      formattingOptions: {
        insertSpaces: true,
        tabSize: 2,
        eol: text.includes('\r\n') ? '\r\n' : '\n',
      },
    }),
  );
}

function packageManager(root, pkg) {
  const explicit = pkg.packageManager?.split('@')[0];
  if (explicit && ['npm', 'yarn', 'pnpm', 'bun'].includes(explicit)) return explicit;
  const found = [
    ['npm', 'package-lock.json'],
    ['yarn', 'yarn.lock'],
    ['pnpm', 'pnpm-lock.yaml'],
    ['bun', 'bun.lock'],
    ['bun', 'bun.lockb'],
  ]
    .filter(([, file]) => exists(root, file))
    .map(([name]) => name);
  if (new Set(found).size > 1)
    throw new Error(
      'Multiple package-manager lockfiles found. Set package.json packageManager or remove the stale lockfile.',
    );
  return found[0] || 'npm';
}

// Wrap the exported value, not the internals of a user-owned config. This also
// preserves async configs, factories, spreads, comments and existing plugins.
function wrapConfig(text, filename, helper, exportName) {
  if (text.includes(`xizot:${exportName}`)) return text;
  const ast = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw new Error(`Cannot parse ${filename}`);
  const name = `withXizot${exportName}`;
  if (new RegExp(`\\b${name}\\b`).test(text))
    throw new Error(`Reserved installer identifier already used in ${filename}: ${name}`);
  const exported = ast.statements.find(
    (node) => ts.isExportAssignment(node) && !node.isExportEquals,
  );
  let expression = exported?.expression;
  let esm = Boolean(expression);
  if (!expression) {
    const statement = ast.statements.find(
      (node) =>
        ts.isExpressionStatement(node) &&
        ts.isBinaryExpression(node.expression) &&
        node.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        node.expression.left.getText(ast) === 'module.exports',
    );
    expression = statement?.expression.right;
  }
  if (!expression)
    throw new Error(
      `Cannot safely configure ${filename}: expected export default or module.exports.`,
    );
  const start = expression.getStart(ast),
    end = expression.getEnd();
  const importLine = esm
    ? `import ${name} from '${helper}';`
    : `const ${name} = require('${helper}');`;
  return `// xizot:${exportName}\n${importLine}\n${text.slice(0, start)}${name}(${text.slice(start, end)})${text.slice(end)}`;
}

function dependencyPlan(root, pkg, required, dev = false) {
  const add = [],
    conflicts = [];
  for (const spec of required) {
    const index = spec.indexOf('@', spec.startsWith('@') ? 1 : 0);
    const name = spec.slice(0, index),
      version = spec.slice(index + 1);
    const declared = pkg.dependencies?.[name] || pkg.devDependencies?.[name];
    if (!declared) {
      add.push(spec);
      continue;
    }
    const minimums = {
      react: '>=19.0.0 <20',
      'react-dom': '>=19.0.0 <20',
      'react-is': '>=19.0.0 <20',
      typescript: '>=5.5.0 <7',
      tailwindcss: '^4.0.0',
      '@tailwindcss/postcss': '^4.0.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@types/node': '>=20.0.0 <26',
      '@hookform/resolvers': '^5.0.0',
      'react-hook-form': '^7.55.0',
      postcss: '^8.4.0',
    };
    const range = minimums[name] || libraryPackage.dependencies[name] || `^${version}`;
    // Aliased compiler has its own name to avoid react-scripts' TS 3/4 peer.
    if (version.startsWith('npm:')) {
      if (declared !== version) conflicts.push(`${name}: ${declared}; requires ${version}`);
      continue;
    }
    let installed;
    const manifest = path.join(root, 'node_modules', name, 'package.json');
    if (fs.existsSync(manifest)) installed = JSON.parse(fs.readFileSync(manifest, 'utf8')).version;
    // A broad declaration (e.g. ^5) is valid when the resolved package satisfies
    // both the project's declaration and our supported range. Without an installed
    // version, only accept declarations whose entire range is supported.
    const compatible =
      semver.validRange(declared) &&
      (installed
        ? semver.satisfies(installed, declared) && semver.satisfies(installed, range)
        : semver.subset(declared, range));
    if (!compatible) {
      conflicts.push(
        `${name}: ${declared}${installed ? ` (installed ${installed})` : ''}; requires ${range}${
          !installed && semver.validRange(declared) && semver.intersects(declared, range)
            ? '. Install project dependencies first to verify the resolved version, or narrow the declared range'
            : ''
        }`,
      );
    }
  }
  return { add, conflicts, dev };
}

function planProject(root, runtimeDependencies) {
  if (!semver.satisfies(process.versions.node, libraryPackage.engines.node)) {
    throw new Error(
      `Node ${libraryPackage.engines.node} is required; found ${process.versions.node}.`,
    );
  }
  if (!exists(root, 'package.json'))
    throw new Error('Run init from an existing React project containing package.json.');
  const pkg = parseJson(read(root, 'package.json'), 'package.json');
  const deps = { ...pkg.devDependencies, ...pkg.dependencies };
  const framework = deps.next ? 'next' : deps['react-scripts'] ? 'cra' : deps.vite ? 'vite' : null;
  if (!framework)
    throw new Error(
      'Supported projects: Next.js, Vite React, or Create React App (react-scripts 5).',
    );
  if (
    framework === 'cra' &&
    (!semver.validRange(deps['react-scripts']) || !semver.subset(deps['react-scripts'], '^5.0.0'))
  ) {
    throw new Error(
      'CRA custom build requires react-scripts 5. Upgrade react-scripts before installing.',
    );
  }
  const manager = packageManager(root, pkg);
  if (
    framework === 'next' &&
    (!semver.validRange(deps.next) || !semver.subset(deps.next, '>=15.1.0 <17'))
  ) {
    throw new Error(
      'React 19 components require a supported Next.js version (15.1 or 16.x). Upgrade Next.js explicitly before installing.',
    );
  }
  const sourceRoot = framework === 'cra' ? 'src/design-system' : 'design-system';
  const configName =
    framework === 'vite' && exists(root, 'tsconfig.app.json')
      ? 'tsconfig.app.json'
      : exists(root, 'tsconfig.json')
        ? 'tsconfig.json'
        : 'jsconfig.json';
  const typed = configName.startsWith('tsconfig');
  const otherExtension = typed ? 'jsx' : 'tsx';
  if (exists(root, `${sourceRoot}/components/ui/button.${otherExtension}`)) {
    throw new Error(
      'The existing design-system uses a different source language. Migrate or move it explicitly before reinstalling.',
    );
  }
  const changes = new Map();
  const queue = (name, value) => {
    if (name.startsWith('.xizot/')) {
      const marker = '// xizot-managed\n';
      if (exists(root, name) && !read(root, name).startsWith(marker))
        throw new Error(`Existing helper is not installer-owned: ${name}`);
      value = marker + value;
    }
    changes.set(name, value);
  };
  const configText = exists(root, configName)
    ? read(root, configName)
    : '{\n  "compilerOptions": {}\n}\n';
  const config = parseJson(configText, configName);
  const parsed = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    root,
    undefined,
    path.join(root, configName),
  );
  const configErrors = parsed.errors.filter((e) => ![18003, 18002].includes(e.code));
  if (configErrors.length)
    throw new Error(ts.flattenDiagnosticMessageText(configErrors[0].messageText, '\n'));
  let updatedConfig = configText;
  let importPrefix = '@/design-system';
  if (framework === 'cra') {
    if (
      parsed.options.baseUrl &&
      ![root, path.join(root, 'src')].some(
        (p) => path.resolve(p) === path.resolve(parsed.options.baseUrl),
      )
    ) {
      throw new Error('CRA baseUrl must be the project root or src.');
    }
    if (!parsed.options.baseUrl)
      updatedConfig = setJson(updatedConfig, ['compilerOptions', 'baseUrl'], 'src');
    importPrefix =
      parsed.options.baseUrl && path.resolve(parsed.options.baseUrl) === path.resolve(root)
        ? 'src/design-system'
        : 'design-system';
  } else {
    const aliasTarget =
      './' +
      slash(path.relative(parsed.options.baseUrl || root, path.join(root, sourceRoot))) +
      '/*';
    const inherited =
      config.compilerOptions?.paths ||
      Object.fromEntries(
        Object.entries(parsed.options.paths || {}).map(([key, values]) => [
          key,
          values.map(
            (value) =>
              './' +
              slash(
                path.relative(
                  parsed.options.baseUrl || root,
                  path.resolve(
                    parsed.options.baseUrl || parsed.options.pathsBasePath || root,
                    value,
                  ),
                ),
              ),
          ),
        ]),
      );
    if (
      inherited['@/design-system/*'] &&
      JSON.stringify(inherited['@/design-system/*']) !== JSON.stringify([aliasTarget])
    ) {
      const resolved = inherited['@/design-system/*'].map((p) =>
        path.resolve(parsed.options.baseUrl || root, p),
      );
      if (!resolved.includes(path.resolve(root, sourceRoot, '*')))
        throw new Error('Existing @/design-system/* alias points to another location.');
    }
    // Materialize inherited aliases before adding one: TS does not merge paths.
    const paths = { ...inherited, '@/design-system/*': [aliasTarget] };
    updatedConfig = setJson(updatedConfig, ['compilerOptions', 'paths'], paths);
    const include = config.include || ['**/*'];
    if (!include.includes(sourceRoot))
      updatedConfig = setJson(updatedConfig, ['include'], [...include, sourceRoot]);
  }
  queue(configName, updatedConfig);

  const helperDir = '.xizot';
  if (framework === 'vite') {
    const configFile = [
      'vite.config.ts',
      'vite.config.mts',
      'vite.config.js',
      'vite.config.mjs',
      'vite.config.cjs',
      'vite.config.cts',
    ].find((f) => exists(root, f));
    if (!configFile)
      throw new Error('Vite config not found. Create a vite.config file before installing.');
    queue(configFile, wrapConfig(read(root, configFile), configFile, './.xizot/vite.cjs', 'Vite'));
    queue(`${helperDir}/vite.cjs`, read(__dirname, 'templates/vite.cjs'));
    queue(
      `${helperDir}/vite.d.cts`,
      "import type { UserConfigExport } from 'vite';\ndeclare function withXizot(config: UserConfigExport): UserConfigExport;\nexport = withXizot;\n",
    );
  }

  const postcssFile = [
    'postcss.config.mjs',
    'postcss.config.cjs',
    'postcss.config.js',
    'postcss.config.ts',
    '.postcssrc',
    '.postcssrc.json',
    '.postcssrc.js',
    '.postcssrc.cjs',
  ].find((f) => exists(root, f));
  if (pkg.postcss)
    throw new Error(
      'Move package.json postcss configuration into postcss.config.cjs before installing.',
    );
  if (postcssFile && ['.postcssrc', '.postcssrc.json'].includes(postcssFile)) {
    const content = read(root, postcssFile),
      postcss = parseJson(content, postcssFile);
    if (Array.isArray(postcss.plugins))
      throw new Error(`Move ${postcssFile} plugins into a JS config before installing.`);
    queue(postcssFile, setJson(content, ['plugins', '@tailwindcss/postcss'], {}));
  } else if (postcssFile) {
    queue(
      postcssFile,
      wrapConfig(read(root, postcssFile), postcssFile, './.xizot/postcss.cjs', 'PostCSS'),
    );
    queue(`${helperDir}/postcss.cjs`, read(__dirname, 'templates/postcss.cjs'));
    queue(
      `${helperDir}/postcss.d.cts`,
      'declare function withXizot<T>(config: T): T;\nexport = withXizot;\n',
    );
  } else {
    queue('postcss.config.cjs', "module.exports = { plugins: { '@tailwindcss/postcss': {} } };\n");
  }

  const extraDev = ['tailwindcss@4.3.0', '@tailwindcss/postcss@4.3.0', 'postcss@8.5.6'];
  if (typed) extraDev.push('@types/node@20.19.0');
  if (framework === 'cra') {
    extraDev.push('@craco/craco@7.1.0');
    const existingCraco = ['craco.config.js', 'craco.config.cjs', 'craco.config.ts'].find((f) =>
      exists(root, f),
    );
    const configFile = existingCraco || 'craco.config.cjs';
    queue(
      configFile,
      wrapConfig(
        existingCraco ? read(root, configFile) : 'module.exports = {};\n',
        configFile,
        './.xizot/cra.cjs',
        'CRA',
      ),
    );
    queue(`${helperDir}/cra.cjs`, read(__dirname, 'templates/cra.cjs'));
    queue(
      `${helperDir}/cra.d.cts`,
      'declare function withXizot<T>(config: T): T;\nexport = withXizot;\n',
    );
    let packageText = read(root, 'package.json');
    for (const script of ['start', 'build', 'test']) {
      const command = pkg.scripts?.[script];
      if (!command) continue;
      if (!/\b(?:react-scripts|craco)\s+(?:start|build|test)\b/.test(command))
        throw new Error(`Cannot safely adapt CRA script ${script}: ${command}`);
      packageText = setJson(
        packageText,
        ['scripts', script],
        command.replace(/\breact-scripts\b/g, 'craco'),
      );
    }
    queue('package.json', packageText);
    if (typed) {
      extraDev.push('@types/react@19.2.2', '@types/react-dom@19.2.2');
      extraDev.push('xizot-typescript@npm:typescript@5.9.3');
      const settingsFile = '.vscode/settings.json';
      let settings = exists(root, settingsFile) ? read(root, settingsFile) : '{}\n';
      const sdk = parseJson(settings, settingsFile)['typescript.tsdk'];
      if (
        sdk &&
        sdk !== 'node_modules/typescript/lib' &&
        sdk !== 'node_modules/xizot-typescript/lib'
      )
        throw new Error(`Existing VS Code TypeScript SDK conflicts: ${sdk}`);
      settings = setJson(settings, ['typescript.tsdk'], 'node_modules/xizot-typescript/lib');
      queue(settingsFile, settings);
    }
  } else if (typed) {
    extraDev.push('typescript@5.9.3', '@types/react@19.2.2', '@types/react-dom@19.2.2');
  }
  const plans = [
    dependencyPlan(root, pkg, runtimeDependencies),
    dependencyPlan(root, pkg, extraDev, true),
  ];
  const conflicts = plans.flatMap((p) => p.conflicts);
  if (
    deps.react &&
    deps['react-dom'] &&
    semver.validRange(deps.react) &&
    semver.validRange(deps['react-dom']) &&
    !semver.intersects(deps.react, deps['react-dom'])
  ) {
    conflicts.push('react and react-dom must use matching versions.');
  }
  if (conflicts.length)
    throw new Error(
      `Incompatible dependencies; no project files changed. Update these explicitly and rerun:\n  - ${conflicts.join('\n  - ')}`,
    );
  if (semver.valid(deps.react)) {
    for (const plan of plans)
      plan.add = plan.add.map((spec) =>
        /^(react-dom|react-is)@/.test(spec) ? `${spec.split('@')[0]}@${deps.react}` : spec,
      );
  }
  const cssCandidates =
    framework === 'next'
      ? ['app/globals.css', 'src/app/globals.css', 'styles/globals.css', 'src/styles/globals.css']
      : ['src/index.css', 'src/App.css', 'src/globals.css', 'src/style.css', 'src/styles.css'];
  const cssTarget = cssCandidates.find((f) => exists(root, f));
  const entryCandidates =
    framework === 'next'
      ? [
          'app/layout.tsx',
          'app/layout.jsx',
          'app/layout.js',
          'src/app/layout.tsx',
          'src/app/layout.jsx',
          'src/app/layout.js',
          'pages/_app.tsx',
          'pages/_app.jsx',
          'pages/_app.js',
          'src/pages/_app.tsx',
          'src/pages/_app.jsx',
          'src/pages/_app.js',
        ]
      : framework === 'vite'
        ? ['src/main.tsx', 'src/main.jsx', 'src/main.js']
        : ['src/index.tsx', 'src/index.jsx', 'src/index.js'];
  const entry = entryCandidates.find((f) => exists(root, f));
  if (!cssTarget && !entry)
    throw new Error(
      'Cannot locate the application CSS or entry point. Add a global CSS import before installing.',
    );
  return {
    root,
    pkg,
    framework,
    manager,
    sourceRoot,
    typed,
    importPrefix,
    changes,
    dependencies: plans,
    cssTarget,
    entry,
  };
}

module.exports = {
  planProject,
  dependencyPlan,
  packageManager,
  wrapConfig,
  setJson,
  parseJson,
  slash,
};
