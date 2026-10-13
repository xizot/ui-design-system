export const DEFAULT_DECIMAL_PLACES = 2;

export interface FormatOptions {
  decimalPlaces?: number | null;
  showTrailingZeros?: boolean;
  hideDecimalsIfWhole?: boolean;
}

export function formatNumber(
  value: number | null | undefined,
  options: FormatOptions = {},
): string {
  const {
    decimalPlaces = DEFAULT_DECIMAL_PLACES,
    showTrailingZeros = false,
    hideDecimalsIfWhole = true,
  } = options;

  if (value == null || Number.isNaN(value)) return '';
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const isNegative = value < 0;
  const abs = Math.abs(value);

  const epsilon = Number.isInteger(abs) ? 0 : Number.EPSILON * abs * 10;
  const fixed = decimalPlaces === null ? expandNumber(abs) : (abs + epsilon).toFixed(decimalPlaces);
  const [integerPart, decimalPart] = (
    fixed.includes('e') ? expandNumber(Number(fixed)) : fixed
  ).split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const callerExplicitlySetDecimals = options.decimalPlaces !== undefined;
  const valueHasFraction = abs % 1 !== 0;
  const shouldShowDecimal =
    (decimalPlaces === null || decimalPlaces > 0) &&
    (callerExplicitlySetDecimals || valueHasFraction || !hideDecimalsIfWhole);
  const shouldHideDecimal = hideDecimalsIfWhole && !valueHasFraction;

  let result: string;
  if (!shouldShowDecimal || !decimalPart || shouldHideDecimal) {
    result = formattedInteger;
  } else {
    const displayDecimal = showTrailingZeros ? decimalPart : decimalPart.replace(/0+$/, '');
    result = displayDecimal.length > 0 ? `${formattedInteger}.${displayDecimal}` : formattedInteger;
  }

  if (isNegative) result = `-${result}`;

  return result;
}

function expandNumber(value: number): string {
  const [coefficient, exponent] = String(value).split('e');
  if (!exponent) return coefficient;
  const [integer, fraction = ''] = coefficient.split('.');
  const digits = integer + fraction;
  const point = integer.length + Number(exponent);
  if (point <= 0) return `0.${'0'.repeat(-point)}${digits}`;
  if (point >= digits.length) return digits + '0'.repeat(point - digits.length);
  return `${digits.slice(0, point)}.${digits.slice(point)}`;
}

type ParseOptions = {
  integer?: boolean;
  editing?: boolean;
};

export function parseNumber(
  value: string,
  { integer = false, editing = false }: ParseOptions = {},
): number {
  const raw = value.trim();
  const pattern = editing
    ? /^-?[\d,]*(?:\.\d*)?$/
    : /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?$|^-?\.\d+$/;
  if (!pattern.test(raw) || !/\d/.test(raw) || (integer && raw.includes('.'))) return NaN;
  const parsed = Number(raw.replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function formatNumberInput(value: string): string {
  const raw = value.replace(/,/g, '');
  if (raw === '' || raw === '-') return raw;
  const [integer, fraction] = raw.split('.');
  const negative = integer.startsWith('-');
  const formatted = formatNumber(Number(integer.replace('-', '') || '0'), { decimalPlaces: 0 });
  return `${negative ? '-' : ''}${formatted}${fraction === undefined ? '' : `.${fraction}`}`;
}

export function normalizeNumberInput(value: string, maxFractionDigits: number): string {
  const raw = value.trim();
  const [integer, fraction] = raw.split('.');
  if (raw.split('.').length !== 2 || !fraction || fraction.length <= maxFractionDigits) return raw;
  if (!/^0+$/.test(fraction.slice(maxFractionDigits))) return raw;
  return maxFractionDigits === 0 ? integer : `${integer}.${fraction.slice(0, maxFractionDigits)}`;
}
