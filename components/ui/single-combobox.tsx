'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon, XCircleIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils';
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

type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const comboboxTriggerVariants = cva('', {
  variants: {
    size: {
      xxs: 'h-7 text-xs',
      xs: 'h-8 text-xs',
      sm: 'h-9 text-sm',
      md: 'h-10 text-sm',
      lg: 'h-11 text-base',
      xl: 'h-12 text-base',
      xxl: 'h-14 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const comboboxPaddingVariants = cva('', {
  variants: {
    size: {
      xxs: 'px-2',
      xs: 'px-2.5',
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-4',
      xl: 'px-5',
      xxl: 'px-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const comboboxIconVariants = cva('', {
  variants: {
    size: {
      xxs: 'size-3.5',
      xs: 'size-4',
      sm: 'size-5',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-6',
      xxl: 'size-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const comboboxSvgIconVariants = cva('', {
  variants: {
    size: {
      xxs: "[&_svg:not([class*='size-'])]:size-3.5",
      xs: "[&_svg:not([class*='size-'])]:size-4",
      sm: "[&_svg:not([class*='size-'])]:size-5",
      md: "[&_svg:not([class*='size-'])]:size-5",
      lg: "[&_svg:not([class*='size-'])]:size-6",
      xl: "[&_svg:not([class*='size-'])]:size-6",
      xxl: "[&_svg:not([class*='size-'])]:size-7",
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
const formControlRingStyles = {
  focusWithin: 'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
  open: 'border-ring ring-3 ring-ring/50',
  invalidWithin:
    'border-destructive focus-within:ring-3 focus-within:ring-destructive/20 dark:border-destructive/50 dark:focus-within:ring-destructive/40',
  invalidOpen:
    'border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40',
} as const;

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
  selectedCodeOnly?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  showArrowIcon?: boolean;
  showClearIcon?: boolean;
  className?: string;
  id?: string;
  size?: FormSize;
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
  selectedCodeOnly = false,
  searchPlaceholder = 'Tìm kiếm...',
  emptyMessage = 'Không tìm thấy kết quả',
  showArrowIcon = true,
  showClearIcon = true,
  className,
  id,
  size = 'md',
}: SingleComboboxProps<T>) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
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
      if (selectedCodeOnly) return opt.code;
      return showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name;
    },
    [optionsMap, selectedCodeOnly, showSelectedCode],
  );

  const handleValueChange = (val: string | number | null) => {
    if (val === null || val === undefined) {
      onChange?.(undefined, undefined);
      setOpen(false);
      setSearchQuery('');
      return;
    }
    const opt = optionsMap.get(val) as T | undefined;
    onChange?.(opt?.id ?? val, opt);
    setOpen(false);
    setSearchQuery('');
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
        open={open}
        value={value ?? null}
        onValueChange={handleValueChange}
        disabled={disabled}
        itemToStringLabel={itemToStringLabel}
        filteredItems={filteredItemIds}
        onOpenChange={setOpen}
      >
        {/* Button-style trigger — no typing allowed */}
        <div
          ref={anchorRef}
          className={cn(
            'group/trigger border-input dark:bg-input/30 relative flex w-full items-center overflow-hidden rounded-md border bg-transparent shadow-xs transition-[color,box-shadow]',
            formControlRingStyles.focusWithin,
            open && (error ? formControlRingStyles.invalidOpen : formControlRingStyles.open),
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            error && formControlRingStyles.invalidWithin,
            comboboxTriggerVariants({ size }),
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
              'pointer-events-none flex-1 truncate',
              comboboxPaddingVariants({ size }),
              selectedLabel ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {selectedLabel ?? placeholder}
          </span>

          {/* Clear-all + Chevron (z-10, above trigger) */}
          <div
            className={cn(
              'pointer-events-none relative z-10 ml-auto flex shrink-0 items-center gap-0.5 self-center pr-2',
              comboboxSvgIconVariants({ size }),
            )}
          >
            {hasValue && !disabled ? (
              showClearIcon && showArrowIcon ? (
                <div className={cn('relative shrink-0', comboboxIconVariants({ size }))}>
                  <span
                    className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover/trigger:opacity-100"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => {
                      onChange?.(undefined, undefined);
                    }}
                  >
                    <XCircleIcon className="text-muted-foreground" />
                    <span className="sr-only">Clear</span>
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center transition-opacity group-hover/trigger:opacity-0">
                    <ChevronDownIcon className="text-muted-foreground" />
                  </span>
                </div>
              ) : showClearIcon ? (
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground pointer-events-auto flex size-4 cursor-pointer items-center justify-center rounded"
                  onClick={() => {
                    onChange?.(undefined, undefined);
                  }}
                >
                  <XCircleIcon />
                </button>
              ) : showArrowIcon ? (
                <ChevronDownIcon className="text-muted-foreground" />
              ) : null
            ) : showArrowIcon ? (
              <ChevronDownIcon className="text-muted-foreground" />
            ) : null}
          </div>
        </div>

        {/* Search input lives inside the popup */}
        <ComboboxContent anchor={anchorRef}>
          <div className="px-2 pt-3">
            <ComboboxInput
              id={inputId}
              placeholder={searchPlaceholder}
              showClear={true}
              formSize="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ComboboxList>
            <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
            {filteredOptions.map((option) => (
              <ComboboxItem
                key={option.id}
                value={option.id}
                className={cn('mt-px', value === option.id && 'bg-accent text-accent-foreground')}
              >
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
