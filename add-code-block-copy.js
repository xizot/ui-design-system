const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentsDir = path.join(__dirname, 'app/components');

// Find all page.tsx files
const findPageFiles = () => {
  const result = execSync('dir /s /b page.tsx', { cwd: componentsDir, encoding: 'utf-8' });
  return result
    .trim()
    .split('\n')
    .map((f) => path.join(componentsDir, f));
};

const updateFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has CodeBlock import
  if (content.includes("from '@/components/ui/code-block'")) {
    console.log(`Skipping ${filePath} - already has CodeBlock`);
    return;
  }

  // Add 'use client' if not present
  if (!content.startsWith("'use client'")) {
    content = "'use client';\n\n" + content;
  }

  // Add CodeBlock import after other imports
  const importRegex = /(import \{[^}]+\} from '@\/components\/ui\/[^']+';)/;
  if (importRegex.test(content)) {
    content = content.replace(
      importRegex,
      "$1\nimport { CodeBlock } from '@/components/ui/code-block';",
    );
  } else {
    // Add after the first import line if no ui imports found
    content = content.replace(
      /(import [^\n]+;\n)/,
      "$1import { CodeBlock } from '@/components/ui/code-block';\n",
    );
  }

  // Remove metadata export if present (not supported in client components)
  content = content.replace(/export const metadata: Metadata = \{[^}]+\};\n\n/g, '');

  // Add useEffect for title if metadata was removed
  if (content.includes('export default function') && !content.includes('useEffect')) {
    const guideMatch = content.match(/const guide = \{[^}]+\}/);
    if (guideMatch) {
      content = content.replace(
        /import { useState } from 'react';/,
        "import { useState, useEffect } from 'react';",
      );
      content = content.replace(/export default function/, 'export default function');
      // Add useEffect after function declaration
      content = content.replace(
        /(export default function \w+\(\) \{)/,
        '$1\n  useEffect(() => {\n    document.title = `${guide.name} - UI Design System`;\n  }, []);\n',
      );
    }
  }

  // Replace code blocks in import section
  content = content.replace(
    /<div className="overflow-x-auto rounded-2xl border border-border\/70 bg-muted\/30 p-4">\s*<code className="text-sm">\{`([^`]+)`\}<\/code>\s*<\/div>/g,
    '<CodeBlock\n                code={`$1`}\n                id="import"\n                className="bg-muted/30"\n              />',
  );

  // Replace code blocks in usage section
  content = content.replace(
    /<div className="overflow-x-auto rounded-2xl border border-border\/70 bg-card p-5 text-card-foreground">\s*<pre className="text-sm leading-6">\s*<code>\{sample\.code\}<\/code>\s*<\/pre>\s*<\/div>/g,
    '<CodeBlock code={sample.code} id={sample.id} />',
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
};

try {
  const files = findPageFiles();
  console.log(`Found ${files.length} page files`);

  files.forEach(updateFile);
  console.log('Done!');
} catch (error) {
  console.error('Error:', error);
}
