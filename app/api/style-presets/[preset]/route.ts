import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

import { STYLE_PRESET_IDS, type StylePresetId } from '@/constants/style-presets';

function extractCssBlock(content: string, selector: string) {
  const selectorIndex = content.indexOf(selector);

  if (selectorIndex === -1) {
    return '';
  }

  const blockStart = content.indexOf('{', selectorIndex);

  if (blockStart === -1) {
    return '';
  }

  let depth = 0;
  let blockEnd = blockStart;

  for (let index = blockStart; index < content.length; index += 1) {
    const character = content[index];

    if (character === '{') {
      depth += 1;
    }

    if (character === '}') {
      depth -= 1;

      if (depth === 0) {
        blockEnd = index;
        break;
      }
    }
  }

  return content.slice(selectorIndex, blockEnd + 1);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ preset: string }> },
) {
  const { preset } = await context.params;

  if (!STYLE_PRESET_IDS.includes(preset as StylePresetId)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'styles', `${preset}.css`);
  const cssContent = await readFile(filePath, 'utf8');
  const rootBlock = extractCssBlock(cssContent, ':root');
  const darkBlock = extractCssBlock(cssContent, '.dark');
  const responseCss = [rootBlock, darkBlock].filter(Boolean).join('\n\n');

  return new NextResponse(responseCss, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
