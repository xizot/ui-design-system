const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const retired = require('./retired-guidance.json');

// Delete exact prior installer content only. Never traverse symlinks or remove directories.
function retireGuidance(projectRoot, warn = console.warn) {
  const root = path.resolve(projectRoot);
  for (const [relative, expected] of Object.entries(retired)) {
    const target = path.resolve(root, relative);
    if (!target.startsWith(root + path.sep) || !relative.startsWith('.agents/'))
      throw new Error('Invalid retired guidance path: ' + relative);
    let current = root;
    let unsafe = false;
    for (const part of relative.split('/')) {
      current = path.join(current, part);
      if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) {
        unsafe = true;
        break;
      }
    }
    if (unsafe) {
      warn('Preserved linked retired guidance: ' + relative);
      continue;
    }
    if (!fs.existsSync(target)) continue;
    if (!fs.lstatSync(target).isFile()) {
      warn('Preserved non-file retired guidance: ' + relative);
      continue;
    }
    const content = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
    const hash = createHash('sha256').update(content).digest('hex');
    if (hash === expected) fs.unlinkSync(target);
    else warn('Preserved modified retired guidance; reconcile manually: ' + relative);
  }
}
module.exports = { retireGuidance };
