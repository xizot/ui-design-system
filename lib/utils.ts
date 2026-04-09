import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNil = (value: unknown): boolean => {
  return value === null || value === undefined;
};

export const hasValue = <T>(value: T): value is NonNullable<T> => {
  if (isNil(value)) return false;

  if (value === '') return false;

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Object.keys(value as object).length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
};

export function get<T = unknown>(obj: unknown, path: string): T | undefined {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return undefined;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return result as T;
}
