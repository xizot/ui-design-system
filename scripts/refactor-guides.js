const fs = require('fs');
const path = require('path');

const root = path.join('D:', 'design-system');
const layoutFile = path.join(root, 'app', 'components', 'layout.tsx');
const componentsDir = path.join(root, 'app', 'components');

function updateLayout() {
  let text = fs.readFileSync(layoutFile, 'utf8');
  if (!text.includes("from './guide-data'")) {
    text = text.replace(
      "import { cn } from '@/lib/utils';",
      "import { cn } from '@/lib/utils';\nimport { guides } from './guide-data';",
    );
    text = text.replace(/\r?\nconst guides = \[[\s\S]*?\r?\n\];\r?\n/, '\n');
    fs.writeFileSync(layoutFile, text);
  }
}

function updateGuidePage(file, slug) {
  let text = fs.readFileSync(file, 'utf8');
  if (!text.includes('const guide = {')) {
    return;
  }

  if (text.includes("from '../guide-data'")) {
    return;
  }

  const regex =
    /const guide = \{\r?\n  name: '([^']+)',\r?\n  group: '([^']+)',\r?\n  importPath: '([^']+)',\r?\n\} as const;/;
  if (!regex.test(text)) {
    return;
  }

  text = text.replace(
    regex,
    `import { getGuide } from '../guide-data';\n\nconst guide = getGuide('${slug}');`,
  );
  fs.writeFileSync(file, text);
}

function main() {
  updateLayout();
  for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(componentsDir, entry.name, 'page.tsx');
    if (!fs.existsSync(file)) continue;
    updateGuidePage(file, entry.name);
  }
}

main();
