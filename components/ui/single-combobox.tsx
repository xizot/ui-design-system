'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon, XCircleIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './combobox';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';

export type ComboboxBaseOption = {
  id: string | number;
  code: string;
  name: string;
};

type SingleComboboxProps<T extends ComboboxBaseOption> = {
  options: T[];
  value?: string | number;
  onChange?: (value: string | number | undefined, option: T | undefined) => void;
  placeholder?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  showMenuCode?: boolean;
  showSelectedCode?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  id?: string;
};

function SingleCombobox<T extends ComboboxBaseOption>({
  options,
  value,
  onChange,
  placeholder = 'Chọn...',
  label,
  required,
  disabled,
  error,
  showMenuCode = true,
  showSelectedCode = false,
  searchPlaceholder = 'Tìm kiếm...',
  emptyMessage = 'Không tìm thấy kết quả',
  className,
  id,
}: SingleComboboxProps<T>) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const optionsMap = React.useMemo(() => new Map(options.map((o) => [o.id, o])), [options]);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;
    const q = searchQuery.toLowerCase();
    return options.filter((o) => `${o.code} ${o.name}`.toLowerCase().includes(q));
  }, [options, searchQuery]);

  const filteredItemIds = React.useMemo(() => filteredOptions.map((o) => o.id), [filteredOptions]);

  const itemToStringLabel = React.useCallback(
    (id: string | number): string => {
      const opt = optionsMap.get(id);
      if (!opt) return String(id);
      return showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name;
    },
    [optionsMap, showSelectedCode],
  );

  const handleValueChange = (val: string | number | null) => {
    if (val === null || val === undefined) {
      onChange?.(undefined, undefined);
      return;
    }
    const opt = optionsMap.get(val) as T | undefined;
    onChange?.(opt?.id ?? val, opt);
  };

  const selectedLabel = React.useMemo(() => {
    if (value === undefined || value === null) return undefined;
    return itemToStringLabel(value);
  }, [value, itemToStringLabel]);

  const hasValue = value !== undefined && value !== null;

  return (
    <div className={cn('w-full', className)}>
      {label && <FormLabel label={label} htmlFor={inputId} required={required} />}
      <Combobox<string | number>
        value={value ?? null}
        onValueChange={handleValueChange}
        disabled={disabled}
        itemToStringLabel={itemToStringLabel}
        filteredItems={filteredItemIds}
        onInputValueChange={(v) => setSearchQuery(v)}
        onOpenChange={(open) => {
          if (!open) setSearchQuery('');
        }}
      >
        {/* Button-style trigger — no typing allowed */}
        <div
          ref={anchorRef}
          className={cn(
            'group/trigger relative flex h-9 w-full items-center overflow-hidden rounded-md border border-input bg-background text-sm shadow-xs transition-[border-color,box-shadow]',
            'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            error && 'border-destructive focus-within:ring-destructive/20',
          )}
        >
          {/* Full-area trigger button (invisible, z-0) */}
          <ComboboxPrimitive.Trigger
            className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-none"
            disabled={disabled}
          />

          {/* Selected label or placeholder */}
          <span
            className={cn(
              'pointer-events-none flex-1 truncate px-3',
              selectedLabel ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {selectedLabel ?? placeholder}
          </span>

          {/* Clear + Chevron (z-10, above trigger) */}
          <div className="relative z-10 flex shrink-0 items-center gap-0.5 pr-2">
            {hasValue && !disabled && (
              <ComboboxPrimitive.Clear className="flex size-5 cursor-pointer items-center justify-center rounded text-muted-foreground hover:text-foreground">
                <XCircleIcon className="size-4" />
              </ComboboxPrimitive.Clear>
            )}
            <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
          </div>
        </div>

        {/* Search input lives inside the popup */}
        <ComboboxContent anchor={anchorRef}>
          <div className="px-2 pt-3">
            <ComboboxInput
              id={inputId}
              placeholder={searchPlaceholder}
              showTrigger={false}
              showClear={false}
            />
          </div>

          <ComboboxList>
            <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
            {filteredOptions.map((option) => (
              <ComboboxItem key={option.id} value={option.id}>
                {showMenuCode ? `${option.code} - ${option.name}` : option.name}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <FormErrorMessage error={error} />}
    </div>
  );
}

export { SingleCombobox };
export type { SingleComboboxProps };
