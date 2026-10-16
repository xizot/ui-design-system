const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const postcss = require('postcss');
const { slash } = require('./project.cjs');
const colorSchemas = require('../constants/color-schemas.json');

const marker = '/* xizot-managed styles */\n';

function splitLegacyColors(css, defaults) {
  const colorTokens = new Set();
  postcss.parse(defaults).walkDecls((declaration) => colorTokens.add(declaration.prop));
  const base = postcss.parse(css);
  const theme = postcss.root();
  // Preserve selectors, media queries and cascade layers around color declarations.
  function extract(container, target) {
    for (const node of [...(container.nodes || [])]) {
      if (node.type === 'decl' && colorTokens.has(node.prop)) {
        target.append(node.clone());
        node.remove();
      } else if (node.nodes) {
        const branch = node.clone({ nodes: [] });
        extract(node, branch);
        if (branch.nodes.length) target.append(branch);
        if (!node.nodes.length) node.remove();
      }
    }
  }
  extract(base, theme);
  return { base: base.toString(), theme: theme.toString() };
}

function relativeImport(from, to) {
  const relative = slash(path.relative(path.dirname(from), to));
  return relative.startsWith('.') ? relative : './' + relative;
}

async function selectColorSchema(projectRoot, plan, options, askQuestion, log = console.log) {
  const themeName = `${plan.sourceRoot}/theme.css`;
  const oldThemeName = plan.framework === 'cra' ? 'src/styles/theme.css' : 'styles/theme.css';
  if (
    fs.existsSync(path.join(projectRoot, themeName)) ||
    fs.existsSync(path.join(projectRoot, oldThemeName))
  ) {
    log('\nColor schema');
    const answer = options.yes ? '' : await askQuestion('Rewrite existing color schema? (y/N): ');
    if (!['y', 'yes'].includes(answer.trim().toLowerCase())) {
      log(`Keeping existing color theme: ${themeName}`);
      return;
    }
  }
  if (options.yes) return;

  log('\nColor schema');
  log('  1. Default');
  colorSchemas.forEach((schema, index) => {
    log(`  ${index + 2}. ${schema.lightName} / ${schema.name}`);
  });
  while (true) {
    const answer = (
      await askQuestion(`Choose a number [1-${colorSchemas.length + 1}] (Enter = 1): `)
    ).trim();
    if (answer === '' || answer === '1')
      return fs.readFileSync(path.join(__dirname, '../app/theme.css'), 'utf8');
    const choice = Number(answer);
    if (/^\d+$/.test(answer) && choice >= 2 && choice <= colorSchemas.length + 1) {
      const schema = colorSchemas[choice - 2];
      log(`Selected: ${schema.lightName} / ${schema.name}`);
      return (
        [':root', '.dark']
          .map((selector, index) => {
            const tokens = index === 0 ? schema.light : schema.dark;
            return `${selector} {\n${Object.entries(tokens)
              .map(([key, value]) => `  ${key}: ${value};`)
              .join('\n')}\n}`;
          })
          .join('\n\n') + '\n'
      );
    }
    log(`Enter a whole number from 1 to ${colorSchemas.length + 1}.`);
  }
}

function installStyles(packageRoot, projectRoot, plan, selectedTheme) {
  const stylesTarget = path.join(projectRoot, plan.sourceRoot, 'styles.css');
  const themeTarget = path.join(projectRoot, plan.sourceRoot, 'theme.css');
  const oldThemeTarget = path.join(
    projectRoot,
    plan.framework === 'cra' ? 'src/styles/theme.css' : 'styles/theme.css',
  );
  const copyOldTheme = !fs.existsSync(themeTarget) && fs.existsSync(oldThemeTarget);
  const previous = fs.existsSync(stylesTarget) ? fs.readFileSync(stylesTarget, 'utf8') : null;
  const legacy = previous !== null && !previous.startsWith(marker);
  const defaults = fs.readFileSync(path.join(packageRoot, 'app/theme.css'), 'utf8');
  const themeExists = fs.existsSync(themeTarget) || copyOldTheme;
  const migrated =
    legacy && (!themeExists || selectedTheme !== undefined)
      ? splitLegacyColors(previous, defaults)
      : null;

  fs.mkdirSync(path.dirname(themeTarget), { recursive: true });
  if (copyOldTheme) fs.copyFileSync(oldThemeTarget, themeTarget, fs.constants.COPYFILE_EXCL);
  if (!themeExists || selectedTheme !== undefined) {
    fs.writeFileSync(
      themeTarget,
      '/* User color tokens. Replaced only when you choose to rewrite the color schema. */\n' +
        (selectedTheme ?? (migrated?.theme || defaults)),
    );
  }

  fs.mkdirSync(path.dirname(stylesTarget), { recursive: true });
  if (migrated?.theme) fs.writeFileSync(stylesTarget, migrated.base);
  if (!legacy) {
    fs.writeFileSync(
      path.join(path.dirname(stylesTarget), 'theme-defaults.css'),
      marker + defaults,
    );
    const styles = fs.readFileSync(path.join(packageRoot, 'app/globals.css'), 'utf8');
    fs.writeFileSync(
      stylesTarget,
      marker + styles.replace("'./theme.css'", "'./theme-defaults.css'"),
    );
  }

  if (!plan.integrated) {
    console.log(`Color theme: ${slash(path.relative(projectRoot, themeTarget))} (edit light/dark colors here)`);
    console.log(`Base styles: ${slash(path.relative(projectRoot, stylesTarget))} (import through your CSS build when using components)`);
    return;
  }

  for (const entry of plan.cssTargets?.length ? plan.cssTargets : [plan.cssTarget || plan.entry]) {
    const entryPath = path.join(projectRoot, entry);
    const isCss = entry.endsWith('.css');
    let content = fs.readFileSync(entryPath, 'utf8');
    if (copyOldTheme) {
      const oldImport = relativeImport(entryPath, oldThemeTarget).replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
      );
      content = content.replace(
        new RegExp(`((?:@import|import)\\s*['"])${oldImport}(['"]\\s*;)`, 'g'),
        (_, start, end) => `${start}${relativeImport(entryPath, themeTarget)}${end}`,
      );
    }
    const imports = [stylesTarget, themeTarget].map((target) => relativeImport(entryPath, target));
    // Append the user theme after the base import, including on legacy installations.
    for (let index = 0; index < imports.length; index++) {
      const relative = imports[index];
      const escaped = relative.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const existing = new RegExp(`(?:@import|import)\\s*['"]${escaped}['"]\\s*;`);
      if (existing.test(content)) continue;
      const statement = isCss ? `@import '${relative}';` : `import '${relative}';`;
      let position = 0;
      const baseImport =
        index === 1 &&
        content.match(
          new RegExp(
            `(?:@import|import)\\s*['"]${imports[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\s*;`,
          ),
        );
      if (baseImport) {
        position = baseImport.index + baseImport[0].length;
      } else if (!isCss) {
        const ast = ts.createSourceFile(entry, content, ts.ScriptTarget.Latest, true);
        for (const node of ast.statements) {
          if (!ts.isExpressionStatement(node) || !ts.isStringLiteral(node.expression)) break;
          position = node.getEnd();
        }
      } else if (/^@charset\s/.test(content)) {
        position = content.indexOf(';') + 1;
      }
      content = `${content.slice(0, position)}\n${statement}\n${content.slice(position)}`;
    }
    fs.writeFileSync(entryPath, content);
  }
  console.log(
    `Color theme: ${slash(path.relative(projectRoot, themeTarget))} (edit light/dark colors here)`,
  );
  console.log(
    `Base styles: ${slash(path.relative(projectRoot, stylesTarget))} (size, typography and Tailwind mappings)`,
  );
}

module.exports = { installStyles, selectColorSchema };
