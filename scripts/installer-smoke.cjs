// Network integration check. Installs real dependencies into an isolated temp app.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const framework = process.argv[2];
const typed = process.argv[3] !== 'js';
if (!['vite', 'next', 'cra'].includes(framework))
  throw new Error('Usage: node scripts/installer-smoke.cjs <vite|next|cra> [ts|js]');
const root = path.resolve(__dirname, '..');
const directory =
  process.argv[4] || fs.mkdtempSync(path.join(os.tmpdir(), `xizot-smoke-${framework}-`));
console.log(`Fixture: ${directory}`);
function write(file, value) {
  const target = path.join(directory, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, typeof value === 'string' ? value : JSON.stringify(value, null, 2));
}
function run(command, args, input) {
  const result = spawnSync(command, args, {
    cwd: directory,
    shell: command === 'npm' && process.platform === 'win32',
    encoding: 'utf8',
    input,
    maxBuffer: 20 * 1024 * 1024,
    timeout: 600000,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', GENERATE_SOURCEMAP: 'false' },
  });
  const label = args
    .join(' ')
    .replace(/[^a-z\d]+/gi, '-')
    .slice(0, 70);
  write(`${label}.log`, (result.stdout || '') + (result.stderr || ''));
  if (result.status !== 0)
    throw new Error(
      `${command} ${args.join(' ')} failed (${result.status}):\n${result.stdout}\n${result.stderr}`,
    );
  console.log(`PASS ${command} ${args.join(' ')}`);
}
const pkg = {
  name: `xizot-smoke-${framework}`,
  version: '1.0.0',
  private: true,
  dependencies: { react: '19.2.4', 'react-dom': '19.2.4' },
  devDependencies: {},
  scripts: {},
};
if (process.argv[4]) {
  run(process.execPath, [path.join(root, 'bin/install.cjs'), 'init', '--yes', '--overwrite']);
  run('npm', ['run', 'build']);
  console.log(`PASS refreshed ${framework} build: ${directory}`);
  process.exit(0);
}
if (typed)
  Object.assign(pkg.devDependencies, {
    typescript: framework === 'cra' ? '4.9.5' : '5.9.3',
    '@types/react': '19.2.2',
    '@types/react-dom': '19.2.2',
  });
const ext = typed ? 'tsx' : 'jsx';
const prefix = framework === 'cra' ? 'design-system' : '@/design-system';
const app = `import { Button } from '${prefix}/components/ui/button';
import { NumberInput } from '${prefix}/components/ui/number-input';
import { Calendar } from '${prefix}/components/ui/calendar';
import { useForm } from 'react-hook-form';
import { RHFInput } from '${prefix}/components/rhf';
export default function App() {
  const form = useForm({ defaultValues: { name: '' } });
  return <main><Button>Installer smoke</Button><NumberInput /><RHFInput control={form.control} register={form.register} name="name" /><Calendar /></main>;
}
`;
if (framework === 'vite') {
  pkg.type = 'module';
  pkg.devDependencies.vite = '^7.0.0';
  pkg.devDependencies['@vitejs/plugin-react'] = '^5.0.0';
  pkg.scripts.build = typed ? 'tsc -p tsconfig.app.json --noEmit && vite build' : 'vite build';
  write(
    'vite.config.js',
    "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()], resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } } });\n",
  );
  write(
    'index.html',
    `<div id="root"></div><script type="module" src="/src/main.${ext}"></script>`,
  );
  write(
    `src/main.${ext}`,
    `import { createRoot } from 'react-dom/client';\nimport App from './App';\nimport './index.css';\ncreateRoot(document.getElementById('root')${typed ? '!' : ''}).render(<App />);`,
  );
  write(`src/App.${ext}`, app);
  if (typed)
    write('tsconfig.app.json', {
      compilerOptions: {
        target: 'ES2022',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
        strict: true,
        skipLibCheck: true,
        verbatimModuleSyntax: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noEmit: true,
        paths: { '@/*': ['./src/*'] },
      },
      include: ['src'],
    });
  write('src/index.css', '/* existing styles */\nbody { margin: 0; }\n');
} else if (framework === 'cra') {
  pkg.dependencies['react-scripts'] = '5.0.1';
  pkg.scripts = {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
  };
  write(
    'public/index.html',
    '<!doctype html><html><head><title>Smoke</title></head><body><div id="root"></div></body></html>',
  );
  write(
    `src/index.${ext}`,
    `import { createRoot } from 'react-dom/client';\nimport App from './App';\nimport './index.css';\ncreateRoot(document.getElementById('root')${typed ? '!' : ''}).render(<App />);`,
  );
  write(`src/App.${ext}`, app);
  write('src/index.css', 'body { margin: 0; }\n');
  if (typed) {
    write('src/react-app-env.d.ts', '/// <reference types="react-scripts" />\n');
    write('tsconfig.json', {
      compilerOptions: {
        target: 'es2017',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
      },
      include: ['src'],
    });
  }
} else {
  pkg.dependencies.next = '16.2.3';
  pkg.scripts.build = 'next build --webpack';
  write(`src/app/page.${ext}`, "'use client';\n" + app);
  write(
    `src/app/layout.${ext}`,
    `import './globals.css';\nexport default function RootLayout({ children }${typed ? ': { children: React.ReactNode }' : ''}) { return <html><body>{children}</body></html>; }`,
  );
  write('src/app/globals.css', 'body { margin: 0; }\n');
  if (typed)
    write('tsconfig.json', {
      compilerOptions: {
        target: 'ES2017',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'react-jsx',
        paths: { '@/*': ['./src/*'] },
      },
      include: ['**/*.ts', '**/*.tsx'],
      exclude: ['node_modules'],
    });
}
write('package.json', pkg);
run('npm', ['install', '--no-audit', '--no-fund']);
run(process.execPath, [path.join(root, 'bin/install.cjs'), 'init', '--yes']);
run('npm', ['run', 'build']);
console.log(
  `PASS ${framework} ${typed ? 'TS' : 'JS'} installation and production build. Artifacts: ${directory}`,
);
