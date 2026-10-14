'use client';

import { useCallback, useSyncExternalStore } from 'react';

import COLOR_SCHEMAS from '../constants/color-schemas.json';

export const DEFAULT_COLOR_SCHEMA_ID = 'default';
export const COLOR_SCHEMA_STORAGE_KEY = 'xizot-color-schema';

const COLOR_SCHEMA_CHANGE_EVENT = 'xizot-color-schema-change';
const COLOR_SCHEMA_STYLE_ID = 'xizot-color-schema';

export type ColorSchema = (typeof COLOR_SCHEMAS)[number];
export type ColorSchemaId = ColorSchema['id'] | typeof DEFAULT_COLOR_SCHEMA_ID;

let fallbackSchemaId: ColorSchemaId = DEFAULT_COLOR_SCHEMA_ID;
let volatileSchemaId: ColorSchemaId | null = null;

function isColorSchemaId(value: string | null): value is ColorSchemaId {
  return value === DEFAULT_COLOR_SCHEMA_ID || COLOR_SCHEMAS.some((schema) => schema.id === value);
}

function getSnapshot(): ColorSchemaId {
  if (volatileSchemaId !== null) return volatileSchemaId;

  try {
    const stored = window.localStorage.getItem(COLOR_SCHEMA_STORAGE_KEY);
    return isColorSchemaId(stored) ? stored : DEFAULT_COLOR_SCHEMA_ID;
  } catch {
    return fallbackSchemaId;
  }
}

function formatTokens(tokens: Record<string, string>) {
  return Object.entries(tokens)
    .map(([name, value]) => `${name}: ${value};`)
    .join('');
}

function applyColorSchema(schemaId: ColorSchemaId) {
  const existingStyle = document.getElementById(COLOR_SCHEMA_STYLE_ID);

  if (schemaId === DEFAULT_COLOR_SCHEMA_ID) {
    existingStyle?.remove();
    document.documentElement.removeAttribute('data-color-schema');
    return;
  }

  const schema = COLOR_SCHEMAS.find((entry) => entry.id === schemaId);
  if (!schema) return;

  const style = existingStyle ?? document.createElement('style');
  style.id = COLOR_SCHEMA_STYLE_ID;
  style.textContent = `:root{${formatTokens(schema.light)}}html.dark{${formatTokens(schema.dark)}}`;
  if (!existingStyle) document.head.appendChild(style);
  document.documentElement.setAttribute('data-color-schema', schemaId);
}

function subscribe(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== COLOR_SCHEMA_STORAGE_KEY && event.key !== null) return;
    volatileSchemaId = null;
    const schemaId = getSnapshot();
    fallbackSchemaId = schemaId;
    applyColorSchema(schemaId);
    onStoreChange();
  };

  const handleChange = () => onStoreChange();

  applyColorSchema(getSnapshot());
  window.addEventListener('storage', handleStorage);
  window.addEventListener(COLOR_SCHEMA_CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(COLOR_SCHEMA_CHANGE_EVENT, handleChange);
  };
}

/** Switches all semantic color tokens; dark mode remains owned by the application. */
export function useColorSchema() {
  const schemaId = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_COLOR_SCHEMA_ID);

  const setColorSchema = useCallback((nextSchemaId: ColorSchemaId) => {
    if (!isColorSchemaId(nextSchemaId)) return;

    fallbackSchemaId = nextSchemaId;
    try {
      if (nextSchemaId === DEFAULT_COLOR_SCHEMA_ID) {
        window.localStorage.removeItem(COLOR_SCHEMA_STORAGE_KEY);
      } else {
        window.localStorage.setItem(COLOR_SCHEMA_STORAGE_KEY, nextSchemaId);
      }
      volatileSchemaId = null;
    } catch {
      volatileSchemaId = nextSchemaId;
    }

    applyColorSchema(nextSchemaId);
    window.dispatchEvent(new Event(COLOR_SCHEMA_CHANGE_EVENT));
  }, []);

  const schema = COLOR_SCHEMAS.find((entry) => entry.id === schemaId) ?? null;

  return { schemaId, schema, schemas: COLOR_SCHEMAS, setColorSchema };
}
