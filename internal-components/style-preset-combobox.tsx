'use client';

import * as React from 'react';

import { SingleCombobox } from '@/components/ui/single-combobox';
import {
  COLOR_SCHEMAS,
  COLOR_SCHEMA_CSS,
  type ColorSchemaId,
} from '@/internal-components/color-schema-presets';

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

function getStoredPreset(): ColorSchemaId {
  if (typeof window === 'undefined') {
    return 'palette-01';
  }

  const savedPreset = window.localStorage.getItem(STORAGE_KEY);
  return savedPreset && COLOR_SCHEMAS.some((preset) => preset.id === savedPreset)
    ? (savedPreset as ColorSchemaId)
    : 'palette-01';
}

function StylePresetCombobox() {
  const value = React.useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('color-schema-change', onStoreChange);
      return () => window.removeEventListener('color-schema-change', onStoreChange);
    },
    getStoredPreset,
    () => 'palette-01',
  );

  React.useEffect(() => {
    const cssText = COLOR_SCHEMA_CSS[value];
    const styleElement = ensureStyleElement();

    styleElement.textContent = cssText;
    document.documentElement.dataset.stylePreset = value;
    window.localStorage.setItem(STORAGE_KEY, value);
    window.localStorage.removeItem('design-system-style-preset-css');
  }, [value]);

  return (
    <div className="flex items-center gap-2">
      <SingleCombobox
        className="w-44"
        options={[...COLOR_SCHEMAS]}
        value={value}
        onChange={(nextValue) => {
          if (!nextValue) {
            return;
          }

          const nextPreset = nextValue as ColorSchemaId;
          window.localStorage.setItem(STORAGE_KEY, nextPreset);
          window.dispatchEvent(new Event('color-schema-change'));
        }}
        placeholder="Chọn preset"
        searchPlaceholder="Tìm preset..."
        emptyMessage="Không tìm thấy preset"
        showMenuCode={false}
        showSelectedCode={false}
        showClearIcon={false}
        size="sm"
      />
      <div className="border-border/70 bg-card hidden items-center gap-1.5 rounded-full border px-2 py-1 lg:flex">
        <span className="bg-primary size-3 rounded-full" />
        <span className="bg-secondary size-3 rounded-full" />
        <span className="bg-accent size-3 rounded-full" />
        <span className="bg-sidebar-primary size-3 rounded-full" />
      </div>
    </div>
  );
}

export { StylePresetCombobox };
