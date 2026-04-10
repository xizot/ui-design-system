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

export interface FormatOptions {
  decimalPlaces?: number;
  currency?: string;
  showTrailingZeros?: boolean;
  hideDecimalsIfWhole?: boolean;
}

export function formatNumber(value: number, options: FormatOptions = {}): string {
  const {
    decimalPlaces = 3,
    currency,
    showTrailingZeros = false,
    hideDecimalsIfWhole = true,
  } = options;

  if (!Number.isFinite(value)) {
    return String(value);
  }

  const isNegative = value < 0;
  const abs = Math.abs(value);

  const epsilon = Number.EPSILON * abs * 10;
  const fixed = (abs + epsilon).toFixed(decimalPlaces);
  const [integerPart, decimalPart] = fixed.split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const callerExplicitlySetDecimals = options.decimalPlaces !== undefined;
  const valueHasFraction = abs % 1 !== 0;
  const shouldShowDecimal =
    decimalPlaces > 0 && (callerExplicitlySetDecimals || valueHasFraction || !hideDecimalsIfWhole);
  const shouldHideDecimal = hideDecimalsIfWhole && !valueHasFraction;

  let result: string;
  if (!shouldShowDecimal || !decimalPart || shouldHideDecimal) {
    result = formattedInteger;
  } else {
    const displayDecimal = showTrailingZeros ? decimalPart : decimalPart.replace(/0+$/, '');
    result = displayDecimal.length > 0 ? `${formattedInteger},${displayDecimal}` : formattedInteger;
  }

  if (isNegative) result = `-${result}`;
  if (currency) result = `${result} ${currency}`;

  return result;
}
