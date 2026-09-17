const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'dist');
const config = ts.readConfigFile(
  path.join(root, 'tsconfig.package.json'),
  ts.sys.readFile,
);
if (config.error)
  throw new Error(
    ts.flattenDiagnosticMessageText(config.error.messageText, '\n'),
  );
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
if (diagnostics.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }),
  );
  process.exit(1);
}

// Only clean generated output after the source passes type checking.
fs.rmSync(outDir, { recursive: true, force: true });
const result = program.emit();
if (result.emitSkipped) throw new Error('Package emit failed.');

// TypeScript preserves module specifiers. Make local JS and declaration imports
// independently resolvable by ESM consumers, without their application aliases.
function rewriteImports(file) {
  let body = fs.readFileSync(file, 'utf8');
  const source = ts.createSourceFile(file, body, ts.ScriptTarget.Latest, true);
  const edits = [];
  function visit(node) {
    const isModule =
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier;
    const isImportType =
      ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument);
    const specifier = isModule
      ? node.moduleSpecifier
      : isImportType
        ? node.argument.literal
        : null;
    if (specifier && ts.isStringLiteral(specifier)) {
      const value = specifier.text;
      if (value.startsWith('.') || value.startsWith('@/')) {
        const target = value.startsWith('@/')
          ? path.join(outDir, value.slice(2))
          : path.resolve(path.dirname(file), value);
        const resolved = [
          target + '.js',
          path.join(target, 'index.js'),
          target,
        ].find(
          (candidate) =>
            fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
        );
        if (!resolved)
          throw new Error(`Unresolved package import ${value} in ${file}`);
        let relative = path
          .relative(path.dirname(file), resolved)
          .split(path.sep)
          .join('/');
        if (!relative.startsWith('.')) relative = './' + relative;
        edits.push({
          start: specifier.getStart(source),
          end: specifier.end,
          text: JSON.stringify(relative),
        });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    body = body.slice(0, edit.start) + edit.text + body.slice(edit.end);
  }
  fs.writeFileSync(file, body);
}

for (const file of fs.readdirSync(outDir, { recursive: true })) {
  if (/\.(js|ts)$/.test(file)) rewriteImports(path.join(outDir, file));
}
fs.writeFileSync(path.join(outDir, 'package.json'), '{"type":"module"}\n');
const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');
fs.writeFileSync(
  path.join(outDir, 'styles.css'),
  `${css}\n@source "./**/*.js";\n`,
);
console.log(
  'Built ESM modules, declarations and Tailwind stylesheet in dist/.',
);
