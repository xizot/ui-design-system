'use client';

import * as React from 'react';

import { STYLE_PRESETS, type StylePresetId } from '@/constants/style-presets';
import { SingleCombobox } from '@/components/ui/single-combobox';

const STORAGE_KEY = 'design-system-style-preset';
const STYLE_ELEMENT_ID = 'design-system-style-preset';

function StylePresetCombobox() {
  const [value, setValue] = React.useState<StylePresetId>('default');

  React.useEffect(() => {
    const savedPreset = window.localStorage.getItem(STORAGE_KEY);

    if (savedPreset && STYLE_PRESETS.some((preset) => preset.id === savedPreset)) {
      setValue(savedPreset as StylePresetId);
      return;
    }

    setValue('default');
  }, []);

  React.useEffect(() => {
    let isCancelled = false;

    const applyPreset = async () => {
      const response = await fetch(`/api/style-presets/${value}`);

      if (!response.ok || isCancelled) {
        return;
      }

      const cssText = await response.text();

      if (isCancelled) {
        return;
      }

      let styleElement = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;

      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = STYLE_ELEMENT_ID;
        document.head.appendChild(styleElement);
      }

      styleElement.textContent = cssText;
      document.documentElement.dataset.stylePreset = value;
      window.localStorage.setItem(STORAGE_KEY, value);
    };

    void applyPreset();

    return () => {
      isCancelled = true;
    };
  }, [value]);

  return (
    <SingleCombobox
      className="w-44"
      options={[...STYLE_PRESETS]}
      value={value}
      onChange={(nextValue) => {
        if (!nextValue) {
          return;
        }

        setValue(nextValue as StylePresetId);
      }}
      placeholder="Chọn preset"
      searchPlaceholder="Tìm preset..."
      emptyMessage="Không tìm thấy preset"
      showMenuCode={false}
      showSelectedCode={false}
      showClearIcon={false}
      size="sm"
    />
  );
}

export { StylePresetCombobox };
