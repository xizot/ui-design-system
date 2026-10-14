const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { slash } = require('./project.cjs');

const marker = '/* xizot-managed styles */\n';

function relativeImport(from, to) {
  const relative = slash(path.relative(path.dirname(from), to));
  return relative.startsWith('.') ? relative : './' + relative;
}

function installStyles(packageRoot, projectRoot, plan) {
  const stylesTarget = path.join(projectRoot, plan.sourceRoot, 'styles.css');
  const themeTarget = path.join(
    projectRoot,
    plan.framework === 'cra' ? 'src/styles/theme.css' : 'styles/theme.css',
  );
  const previous = fs.existsSync(stylesTarget) ? fs.readFileSync(stylesTarget, 'utf8') : null;
  const legacy = previous !== null && !previous.startsWith(marker);
  const defaults = fs.readFileSync(path.join(packageRoot, 'app/theme.css'), 'utf8');

  fs.mkdirSync(path.dirname(themeTarget), { recursive: true });
  if (!fs.existsSync(themeTarget)) {
    fs.writeFileSync(
      themeTarget,
      '/* Application-owned color tokens. The Xizot installer never overwrites this file. */\n' +
        (legacy
          ? '/* Existing colors remain in design-system/styles.css. Add color overrides here. */\n'
          : defaults),
    );
  }

  fs.mkdirSync(path.dirname(stylesTarget), { recursive: true });
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

  const entry = plan.cssTarget || plan.entry;
  const entryPath = path.join(projectRoot, entry);
  let content = fs.readFileSync(entryPath, 'utf8');
  const imports = [stylesTarget, themeTarget].map((target) => relativeImport(entryPath, target));
  // Append the user theme after the base import, including on legacy installations.
  for (let index = 0; index < imports.length; index++) {
    const relative = imports[index];
    const escaped = relative.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const existing = new RegExp(`(?:@import|import)\\s*['"]${escaped}['"]\\s*;`);
    if (existing.test(content)) continue;
    const statement = plan.cssTarget ? `@import '${relative}';` : `import '${relative}';`;
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
    } else if (!plan.cssTarget) {
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

module.exports = { installStyles };
