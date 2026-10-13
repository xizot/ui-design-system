import { cn, hasValue } from '../../lib/utils';
import {
  DEFAULT_DECIMAL_PLACES,
  formatNumber,
  formatNumberInput,
  normalizeNumberInput,
  parseNumber,
} from '../../lib/number';
import React, { ComponentProps, useLayoutEffect, useRef, useState } from 'react';
import { Input } from './input';

export const inputRightClasses =
  'w-25 h-10 px-3 py-2 text-tms-disabled border border-l-0 border-input rounded-r-lg';

export type NumberFormatType = 'integer' | 'decimal';

export type NumberInputProps = Omit<ComponentProps<typeof Input>, 'className'> & {
  label?: string | React.ReactNode;
  format?: NumberFormatType;
  max?: number;
  allowNegative?: boolean;
  decimalMaxFractionDigits?: number;
  wrapperClassName?: ComponentProps<'div'>['className'];
  inputClassName?: ComponentProps<'input'>['className'];
  rightOutside?: React.ReactNode;
  labelClassName?: ComponentProps<typeof Input>['labelClassName'];
  error?: string;
  id?: string;
};

const NumberInput = ({
  label,
  placeholder,
  wrapperClassName,
  size,
  format = 'integer',
  value,
  required = false,
  max = 999_999_999_999,
  allowNegative = false,
  decimalMaxFractionDigits = DEFAULT_DECIMAL_PLACES,
  inputClassName,
  rightOutside,
  labelClassName,
  error,
  id,
  onChange = () => {},
  onKeyDown = () => {},
  ref: forwardedRef,
  ...inputProps
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCursor = useRef<number | null>(null);
  const maxFrac = format === 'decimal' ? decimalMaxFractionDigits : 0;
  const numericValue = hasValue(value) && value !== '' ? Number(value) : NaN;
  const fmt = (n: number) => formatNumber(n, { decimalPlaces: maxFrac });
  const [draft, setDraft] = useState(() => ({
    value: numericValue,
    precision: maxFrac,
    display: fmt(numericValue),
  }));
  if (!Object.is(draft.value, numericValue) || draft.precision !== maxFrac) {
    setDraft({ value: numericValue, precision: maxFrac, display: fmt(numericValue) });
  }
  const display = draft.display;

  useLayoutEffect(() => {
    if (pendingCursor.current !== null && inputRef.current) {
      inputRef.current.setSelectionRange(pendingCursor.current, pendingCursor.current);
      pendingCursor.current = null;
    }
  }, [draft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = normalizeNumberInput(e.target.value, maxFrac);
    if (!allowNegative && raw.startsWith('-')) return;
    const partial =
      raw === '' || raw === '-' || (format === 'decimal' && (raw === '.' || raw === '-.'));
    const n = partial ? NaN : parseNumber(raw, { integer: format === 'integer', editing: true });
    if (!partial && (!Number.isFinite(n) || Math.abs(n) > max)) return;
    if ((raw.split('.')[1]?.length ?? 0) > maxFrac) return;
    const next = formatNumberInput(raw);
    const cursor = e.target.selectionStart ?? raw.length;
    const count = raw.slice(0, cursor).replace(/,/g, '').length;
    let pos = 0;
    let seen = 0;
    while (pos < next.length && seen < count) {
      if (next[pos] !== ',') seen++;
      pos++;
    }
    if (raw === '.' || raw === '-.') pos = next.length;
    pendingCursor.current = pos;
    setDraft({ value: Number.isNaN(n) ? NaN : n === 0 ? 0 : n, precision: maxFrac, display: next });
    e.target.value = Number.isNaN(n) ? '' : String(n);
    onChange(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    inputProps.onPaste?.(e);
    if (e.defaultPrevented) return;
    const raw = normalizeNumberInput(e.clipboardData.getData('text'), maxFrac);
    const n = parseNumber(raw, { integer: format === 'integer' });
    if (
      !Number.isFinite(n) ||
      (!allowNegative && n < 0) ||
      Math.abs(n) > max ||
      (raw.split('.')[1]?.length ?? 0) > maxFrac
    )
      e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? pos;
    if (pos === end) {
      if (e.key === 'Backspace' && pos > 0 && input.value[pos - 1] === ',') {
        input.setSelectionRange(Math.max(0, pos - 2), pos);
      } else if (e.key === 'Delete' && input.value[pos] === ',') {
        input.setSelectionRange(pos, pos + 2);
      }
    }
    const unselected = input.value.slice(0, pos) + input.value.slice(end);
    if (
      (e.key === '-' && !allowNegative) ||
      e.key === ',' ||
      (e.key === '.' && (format !== 'decimal' || unselected.includes('.')))
    )
      e.preventDefault();
    onKeyDown(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDraft({ ...draft, display: fmt(draft.value) });
    inputProps.onBlur?.(e);
  };

  return (
    <div className={cn('space-y-1.5', wrapperClassName)}>
      <div className="flex w-full">
        <div className="relative w-full">
          <Input
            id={id}
            label={label}
            labelClassName={labelClassName}
            required={required}
            error={error}
            placeholder={placeholder}
            {...inputProps}
            ref={(element) => {
              inputRef.current = element;
              if (typeof forwardedRef === 'function') forwardedRef(element);
              else if (forwardedRef) forwardedRef.current = element;
            }}
            type="text"
            value={display}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            inputMode={format === 'decimal' ? 'decimal' : 'numeric'}
            className={cn(rightOutside && 'rounded-r-none!', inputClassName)}
            size={size}
          />
        </div>
        {rightOutside}
      </div>
    </div>
  );
};

export { NumberInput };
