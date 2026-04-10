const STYLE_PRESETS = [
  { id: 'default', code: 'DEF', name: 'Mặc định' },
  { id: 'amber', code: 'AMB', name: 'Amber' },
  { id: 'blue', code: 'BLU', name: 'Blue' },
  { id: 'cyan', code: 'CYN', name: 'Cyan' },
  { id: 'emerald', code: 'EME', name: 'Emerald' },
  { id: 'green', code: 'GRN', name: 'Green' },
  { id: 'teal', code: 'TEL', name: 'Teal' },
] as const;

const STYLE_PRESET_IDS = STYLE_PRESETS.map((preset) => preset.id);

type StylePresetId = (typeof STYLE_PRESET_IDS)[number];

export { STYLE_PRESETS, STYLE_PRESET_IDS };
export type { StylePresetId };
