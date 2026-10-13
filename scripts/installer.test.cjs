const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-installer-test-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

test('installer copies source and preserves existing project files', async (t) => {
  const project = fixture(t);
  fs.writeFileSync(path.join(project, 'AGENTS.md'), '# Consumer rules\n');
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(root, 'bin/install.cjs'), 'init'], { cwd: project });
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
      else reject(new Error(`Installer exited ${code}: ${output}`));
    });
  });
  assert.ok(fs.existsSync(path.join(project, 'design-system/components/ui/button.tsx')));
  assert.ok(fs.existsSync(path.join(project, '.agents/skills/xizot-design-system/SKILL.md')));
  assert.match(fs.readFileSync(path.join(project, 'AGENTS.md'), 'utf8'), /^# Consumer rules/);
  assert.ok(!fs.existsSync(path.join(project, 'app/globals.css')));
});

test('unsupported options exit before installing', (t) => {
  const project = fixture(t);
  for (const option of ['--mode', '--package', '--css', '--unknown']) {
    const result = spawnSync(process.execPath, [path.join(root, 'bin/install.cjs'), option], { cwd: project });
    assert.equal(result.status, 1, option);
    assert.deepEqual(fs.readdirSync(project), []);
  }
});
