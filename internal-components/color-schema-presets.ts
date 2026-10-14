import COLOR_SCHEMAS from './color-schemas.json';

type ColorSchemaId = (typeof COLOR_SCHEMAS)[number]['id'];

function formatColorTokens(selector: ':root' | '.dark', variables: Record<string, string>) {
  return `${selector} {\n${Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')}\n}`;
}

const COLOR_SCHEMA_CSS = Object.fromEntries(
  COLOR_SCHEMAS.map((schema) => [
    schema.id,
    `${formatColorTokens(':root', schema.light)}\n\n${formatColorTokens('.dark', schema.dark)}`,
  ]),
) as Record<ColorSchemaId, string>;

const COLOR_SCHEMA_IDS = COLOR_SCHEMAS.map((schema) => schema.id);

export { COLOR_SCHEMAS, COLOR_SCHEMA_CSS, COLOR_SCHEMA_IDS };
export type { ColorSchemaId };
