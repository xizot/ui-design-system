import React, { ComponentProps, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn, formatNumber, hasValue } from '../../lib/utils';
import { FormLabel } from './form-label';
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
  labelClassName?: ComponentProps<typeof FormLabel>['className'];
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
  decimalMaxFractionDigits = 3,
  inputClassName,
  rightOutside,
  error,
  labelClassName,
  id,
  onChange = () => {},
  onKeyDown = () => {},
  ...inputProps
}: NumberInputProps) => {
  const [display, setDisplay] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCursor = useRef<number | null>(null);

  const maxFrac = format === 'decimal' ? decimalMaxFractionDigits : 0;

  const fmt = (n: number) => formatNumber(n, { decimalPlaces: maxFrac, showTrailingZeros: false });

  const emit = (e: React.ChangeEvent<HTMLInputElement>, n: number | null) => {
    e.target.value = n !== null ? String(n) : '';
    onChange(e);
  };

  useLayoutEffect(() => {
    if (pendingCursor.current !== null && inputRef.current) {
      const pos = pendingCursor.current;
      inputRef.current.setSelectionRange(pos, pos);
      pendingCursor.current = null;
    }
  }, [display]);

  useEffect(() => {
    if (!hasValue(value) || value === '') {
      setDisplay('');
      return;
    }
    const n = parseFloat(String(value));
    setDisplay(isNaN(n) ? '' : fmt(n));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, format]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cursorPos = e.target.selectionStart ?? raw.length;

    const saveCursor = (nd: string) => {
      pendingCursor.current = Math.max(
        0,
        Math.min(cursorPos + (nd.length - raw.length), nd.length),
      );
    };

    if (!raw) {
      pendingCursor.current = 0;
      setDisplay('');
      emit(e, null);
      return;
    }

    if (format === 'integer') {
      const isNeg = allowNegative && raw.startsWith('-');
      const digits = raw.replace(/[^0-9]/g, '');
      if (!digits) {
        const nd = isNeg ? '-' : '';
        saveCursor(nd);
        setDisplay(nd);
        emit(e, null);
        return;
      }
      const n = parseInt(digits, 10) * (isNeg ? -1 : 1);
      if (isNeg && n === 0) {
        saveCursor('-');
        setDisplay('-');
        emit(e, null);
        return;
      }
      if (Math.abs(n) > max) return;
      const nd = fmt(n);
      saveCursor(nd);
      setDisplay(nd);
      emit(e, n);
      return;
    }

    const normalized = raw.endsWith('.') && !raw.includes(',') ? raw.slice(0, -1) + ',' : raw;
    const noThousands = normalized.replace(/\./g, '');
    const hasTrailingComma = noThousands.endsWith(',');

    if (!allowNegative && noThousands.startsWith('-')) return;

    if (noThousands === '-') {
      saveCursor('-');
      setDisplay('-');
      emit(e, null);
      return;
    }
    if (noThousands === ',') {
      saveCursor('0,');
      setDisplay('0,');
      emit(e, null);
      return;
    }

    const n = parseFloat(noThousands.replace(',', '.'));
    if (isNaN(n) || Math.abs(n) > max) return;

    const commaIdx = noThousands.indexOf(',');
    const fracLen = commaIdx >= 0 ? noThousands.length - commaIdx - 1 : 0;
    if (fracLen > maxFrac) return;

    const intStr = commaIdx >= 0 ? noThousands.slice(0, commaIdx) : noThousands;
    const fracStr = commaIdx >= 0 ? noThousands.slice(commaIdx + 1) : '';
    const isNeg = intStr.startsWith('-');
    const absIntStr = isNeg ? intStr.slice(1) : intStr;
    const formattedInt =
      (isNeg ? '-' : '') +
      formatNumber(parseInt(absIntStr || '0', 10), { decimalPlaces: 0, showTrailingZeros: false });
    const nd = formattedInt + (fracStr || hasTrailingComma ? ',' + fracStr : '');
    saveCursor(nd);
    setDisplay(nd);
    emit(e, n);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
    const selEnd = input.selectionEnd ?? pos;

    if (pos === selEnd) {
      if (e.key === 'Backspace' && pos > 0 && input.value[pos - 1] === '.') {
        input.setSelectionRange(pos - 2, pos);
      } else if (e.key === 'Delete' && input.value[pos] === '.') {
        input.setSelectionRange(pos, pos + 2);
      }
    }

    if (e.key === '-' && !allowNegative) {
      e.preventDefault();
    }

    if (e.key === ',' && format === 'decimal' && input.value.includes(',')) {
      e.preventDefault();
    }

    if (e.key === '.') {
      const atEnd = pos === input.value.length;
      const hasComma = input.value.includes(',');
      if (format !== 'decimal' || !atEnd || hasComma) {
        e.preventDefault();
      }
    }

    onKeyDown(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!display || display === '-') {
      setDisplay('');
    } else {
      const n = parseFloat(display.replace(/\./g, '').replace(/,+$/, '').replace(',', '.'));
      setDisplay(!isNaN(n) ? fmt(n) : '');
    }
    inputProps.onBlur?.(e);
  };

  return (
    <div className={cn('space-y-1.5', wrapperClassName)}>
      <div className="flex w-full">
        <div className="relative w-full">
          <Input
            label={label}
            ref={inputRef}
            required={required}
            placeholder={placeholder}
            {...inputProps}
            type="text"
            value={display}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={error}
            className={cn(
              rightOutside && 'rounded-r-none!',
              error &&
                'border-error-300 outline-error-500 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-error-500 pr-8',
              inputClassName,
            )}
            size={size}
          />
        </div>
        {rightOutside}
      </div>
      {error && <p className="text-xs text-error-500">{error}</p>}
    </div>
  );
};

export { NumberInput };
