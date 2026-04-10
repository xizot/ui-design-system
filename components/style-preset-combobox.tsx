'use client';

import * as React from 'react';

import { STYLE_PRESET_CSS } from '@/constants/style-preset-css';
import { STYLE_PRESETS, type StylePresetId } from '@/constants/style-presets';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

const STORAGE_KEY = 'design-system-style-preset';
const STYLE_ELEMENT_ID = 'design-system-style-preset';

function ensureStyleElement() {
  let styleElement = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = STYLE_ELEMENT_ID;
    document.head.appendChild(styleElement);
  }

  return styleElement;
}

function StylePresetCombobox() {
  const [value, setValue] = React.useState<StylePresetId>('default');

  React.useEffect(() => {
    const savedPreset = window.localStorage.getItem(STORAGE_KEY);

    if (savedPreset && STYLE_PRESETS.some((preset) => preset.id === savedPreset)) {
      setValue(savedPreset as StylePresetId);
    }
  }, []);

  React.useEffect(() => {
    const cssText = STYLE_PRESET_CSS[value];
    const styleElement = ensureStyleElement();

    styleElement.textContent = cssText;
    document.documentElement.dataset.stylePreset = value;
    window.localStorage.setItem(STORAGE_KEY, value);
    window.localStorage.removeItem('design-system-style-preset-css');
  }, [value]);

  return (
    <div className="flex items-center gap-2">
      <NativeSelect
        className="w-44"
        aria-label="Chọn preset theme"
        value={value}
        onChange={(event) => {
          setValue(event.target.value as StylePresetId);
        }}
        size="sm"
      >
        {STYLE_PRESETS.map((preset) => (
          <NativeSelectOption key={preset.id} value={preset.id}>
            {preset.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <div className="hidden items-center gap-1.5 rounded-full border border-border/70 bg-card px-2 py-1 lg:flex">
        <span className="size-3 rounded-full bg-primary" />
        <span className="size-3 rounded-full bg-secondary" />
        <span className="size-3 rounded-full bg-accent" />
        <span className="size-3 rounded-full bg-sidebar-primary" />
      </div>
    </div>
  );
}

export { StylePresetCombobox };
