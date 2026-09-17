'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { Check, ChevronDownIcon, XCircleIcon, XIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxList } from './combobox';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import type { ComboboxBaseOption } from './single-combobox';

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

type MultipleComboboxProps<T extends ComboboxBaseOption> = {
  options: T[];
  value?: (string | number)[];
  onChange?: (values: (string | number)[], options: T[]) => void;
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
  limitTags?: number;
  autoResize?: boolean;
  showArrowIcon?: boolean;
  showClearIcon?: boolean;
  onSelectedRender?: (selectedId: string | number, selectedOption: T) => React.ReactNode;
  className?: string;
  id?: string;
  size?: FormSize;
};

function MultipleCombobox<T extends ComboboxBaseOption>({
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
  limitTags,
  autoResize = false,
  showArrowIcon = true,
  showClearIcon = true,
  onSelectedRender,
  className,
  id,
  size = 'md',
}: MultipleComboboxProps<T>) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [open, setOpen] = React.useState(false);

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

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setSearchQuery('');
    setOpen(nextOpen);
  };

  const handleInternalValueChange = (vals: (string | number)[]) => {
    const opts = vals.map((id) => optionsMap.get(id)).filter((o): o is T => o !== undefined);
    onChange?.(vals, opts);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.([], []);
  };

  const handleRemoveSingle = (e: React.MouseEvent, removeId: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    const newValues = (value ?? []).filter((v) => v !== removeId);
    const opts = newValues.map((v) => optionsMap.get(v)).filter((o): o is T => o !== undefined);
    onChange?.(newValues, opts);
  };

  const externalValues = React.useMemo(() => value ?? [], [value]);
  const selectedIds = React.useMemo(() => new Set(externalValues), [externalValues]);
  const displayedValues =
    limitTags !== undefined ? externalValues.slice(0, limitTags) : externalValues;

  return (
    <div className={cn('w-full min-w-0', className)}>
      {label && <FormLabel label={label} htmlFor={inputId} required={required} />}
      <Combobox<string | number, true>
        multiple
        open={open}
        onOpenChange={handleOpenChange}
        value={externalValues}
        onValueChange={handleInternalValueChange}
        disabled={disabled}
        itemToStringLabel={itemToStringLabel}
        filteredItems={filteredItemIds}
      >
        {/* Button-style trigger showing committed selections as badges */}
        <div
          ref={anchorRef}
          className={cn(
            'group/trigger border-input dark:bg-input/30 relative flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow]',
            autoResize ? 'items-start' : 'items-stretch overflow-hidden',
            formControlRingStyles.focusWithin,
            open && (error ? formControlRingStyles.invalidOpen : formControlRingStyles.open),
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            error && formControlRingStyles.invalidWithin,
            comboboxTriggerVariants({ size }),
          )}
        >
          <div
            className={cn(
              'flex min-w-0 flex-1 items-center gap-1',
              comboboxPaddingVariants({ size }),
              autoResize ? 'flex-wrap' : 'overflow-hidden',
            )}
          >
            {externalValues.length > 0 ? (
              <>
                {displayedValues.map((id) => {
                  const opt = optionsMap.get(id);
                  if (!opt) return null;
                  return (
                    <Badge
                      key={id}
                      variant="outline"
                      className="border-border flex w-fit max-w-full min-w-0 shrink items-center gap-1 overflow-hidden rounded-sm pr-0.5 font-normal"
                    >
                      {onSelectedRender ? (
                        <span className="min-w-0 flex-1 truncate">{onSelectedRender(id, opt)}</span>
                      ) : (
                        <p className="min-w-0 flex-1 truncate">
                          {selectedCodeOnly
                            ? opt.code
                            : showSelectedCode
                              ? `${opt.code} - ${opt.name}`
                              : opt.name}
                        </p>
                      )}
                      {!disabled && (
                        <button
                          type="button"
                          className="text-muted-foreground hover:text-foreground pointer-events-auto relative z-20 me-1 inline-flex size-3.5 shrink-0 grow-0 cursor-pointer items-center justify-center rounded"
                          onPointerDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={(e) => handleRemoveSingle(e, id)}
                        >
                          <XIcon className="size-3 shrink-0" />
                        </button>
                      )}
                    </Badge>
                  );
                })}
                {limitTags !== undefined && externalValues.length > limitTags && (
                  <Badge
                    variant="outline"
                    className="border-border shrink-0 rounded-sm font-normal"
                  >
                    +{externalValues.length - limitTags}
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-muted-foreground truncate">{placeholder}</span>
            )}
          </div>

          {/* Clear-all + Chevron (z-10, above trigger) */}
          <div
            className={cn(
              'pointer-events-none relative z-20 ml-auto flex shrink-0 items-center gap-0.5 self-center pr-2',
              comboboxSvgIconVariants({ size }),
            )}
          >
            {externalValues.length > 0 && !disabled ? (
              showClearIcon && showArrowIcon ? (
                <div className={cn('relative shrink-0', comboboxIconVariants({ size }))}>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground pointer-events-auto absolute inset-0 z-20 flex cursor-pointer items-center justify-center rounded opacity-0 transition-opacity group-hover/trigger:opacity-100"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={handleClearAll}
                  >
                    <XCircleIcon className="shrink-0" />
                    <span className="sr-only">Clear</span>
                  </button>
                  <span className="absolute inset-0 flex items-center justify-center transition-opacity group-hover/trigger:opacity-0">
                    <ChevronDownIcon className="text-muted-foreground" />
                  </span>
                </div>
              ) : showClearIcon ? (
                <button
                  type="button"
                  className={cn(
                    'text-muted-foreground hover:text-foreground pointer-events-auto flex cursor-pointer items-center justify-center rounded',
                    comboboxIconVariants({ size }),
                  )}
                  onClick={handleClearAll}
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

          <ComboboxPrimitive.Trigger
            className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-none"
            disabled={disabled}
          />
        </div>

        {/* Popup: search input + items with checkboxes + footer */}
        <ComboboxContent anchor={anchorRef}>
          <div className="px-2 pt-3">
            <ComboboxInput
              id={inputId}
              placeholder={searchPlaceholder}
              showClear={false}
              formSize="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ComboboxList className="px-2">
            <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
            {filteredOptions.map((option) => (
              <ComboboxPrimitive.Item
                key={option.id}
                value={option.id}
                className={cn(
                  'relative mt-px flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none',
                  'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                  'data-disabled:pointer-events-none data-disabled:opacity-50',
                  selectedIds.has(option.id) && 'bg-accent text-accent-foreground',
                )}
              >
                <span className="min-w-0 flex-1 truncate">
                  {showMenuCode ? `${option.code} - ${option.name}` : option.name}
                </span>
                <span className="text-primary pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                  <Check
                    className={cn(
                      'text-primary pointer-events-none transition-opacity',
                      selectedIds.has(option.id) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </span>
              </ComboboxPrimitive.Item>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <FormErrorMessage error={error} />}
    </div>
  );
}

export { MultipleCombobox };
export type { MultipleComboboxProps };
