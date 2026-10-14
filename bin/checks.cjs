const fs = require('node:fs');
const path = require('node:path');
const { parseJson, setJson, wrapConfig, dependencyPlan } = require('./project.cjs');

function planConsumerChecks(root, sourceRoot) {
  const changes = new Map();
  const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
  const exists = (name) => fs.existsSync(path.join(root, name));
  const pkg = parseJson(read('package.json'), 'package.json');
  const ignored = `${sourceRoot}/`;
  const defaults = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    printWidth: 100,
    endOfLine: 'auto',
  };
  const mergePrettier = (config) => ({
    ...defaults,
    ...config,
    plugins: [...new Set([...(config.plugins || []), 'prettier-plugin-tailwindcss'])],
  });
  const prettierFiles = [
    '.prettierrc',
    '.prettierrc.json',
    '.prettierrc.json5',
    '.prettierrc.js',
    '.prettierrc.cjs',
    '.prettierrc.mjs',
    'prettier.config.js',
    'prettier.config.cjs',
    'prettier.config.mjs',
    '.prettierrc.ts',
    'prettier.config.ts',
    '.prettierrc.yaml',
    '.prettierrc.yml',
  ];
  const found = prettierFiles.filter(exists);
  if (found.length > 1 || (found.length && pkg.prettier))
    throw new Error(
      'Multiple Prettier configurations found. Choose one before extending formatting.',
    );
  const prettier = found[0];
  function helper(name, value) {
    const marker = '// xizot-managed\n';
    if (exists(name) && !read(name).startsWith(marker))
      throw new Error(`Existing helper is not installer-owned: ${name}`);
    changes.set(name, marker + value);
  }
  if (prettier && /\.(?:[cm]?js|ts)$/.test(prettier)) {
    changes.set(
      prettier,
      wrapConfig(read(prettier), prettier, './.xizot/prettier.cjs', 'Prettier'),
    );
    helper(
      '.xizot/prettier.cjs',
      `module.exports = (config) => ({ ...${JSON.stringify(defaults)}, ...config, plugins: [...new Set([...(config.plugins || []), 'prettier-plugin-tailwindcss'])] });\n`,
    );
    helper(
      '.xizot/prettier.d.cts',
      'declare function withXizot<T>(config: T): T;\nexport = withXizot;\n',
    );
  } else if (prettier) {
    const text = read(prettier);
    const merged = mergePrettier(parseJson(text, prettier));
    changes.set(
      prettier,
      Object.entries(merged).reduce((result, [key, value]) => setJson(result, [key], value), text),
    );
  } else if (pkg.prettier) {
    if (typeof pkg.prettier !== 'object')
      throw new Error('Shared Prettier config references must be extended in a JS config first.');
    changes.set(
      'package.json',
      setJson(read('package.json'), ['prettier'], mergePrettier(pkg.prettier)),
    );
  } else {
    changes.set('.prettierrc.json', JSON.stringify(mergePrettier({}), null, 2) + '\n');
  }
  const oldIgnore = exists('.prettierignore') ? read('.prettierignore') : '';
  if (!oldIgnore.split(/\r?\n/).includes(ignored))
    changes.set(
      '.prettierignore',
      `${oldIgnore}${oldIgnore && !oldIgnore.endsWith('\n') ? '\n' : ''}${ignored}\n`,
    );
  const flat = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts',
  ].find(exists);
  if (flat) {
    changes.set(flat, wrapConfig(read(flat), flat, './.xizot/eslint.cjs', 'ESLint'));
    helper(
      '.xizot/eslint.cjs',
      `module.exports = (config) => [...(Array.isArray(config) ? config : [config]), { ignores: [${JSON.stringify(ignored + '**')}] }];\n`,
    );
    helper(
      '.xizot/eslint.d.cts',
      'declare function withXizot<T>(config: T): T;\nexport = withXizot;\n',
    );
  } else if (
    [
      '.eslintrc',
      '.eslintrc.json',
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.eslintrc.yaml',
      '.eslintrc.yml',
    ].some(exists) ||
    pkg.eslintConfig
  ) {
    const old = exists('.eslintignore') ? read('.eslintignore') : '';
    if (!old.split(/\r?\n/).includes(ignored))
      changes.set('.eslintignore', `${old}${old && !old.endsWith('\n') ? '\n' : ''}${ignored}\n`);
  } else {
    changes.set(
      'eslint.config.mjs',
      `export default [{ ignores: [${JSON.stringify(ignored + '**')}] }];\n`,
    );
  }
  return {
    changes,
    dependencies: dependencyPlan(
      root,
      pkg,
      ['prettier@3.9.6', 'prettier-plugin-tailwindcss@0.8.1'],
      true,
    ),
  };
}

module.exports = { planConsumerChecks };
