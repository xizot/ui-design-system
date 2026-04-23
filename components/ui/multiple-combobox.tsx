'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { Check, ChevronDownIcon, XCircleIcon, XIcon } from 'lucide-react';
import * as React from 'react';

import { FORM_SIZE_STYLES, type FormSize } from '../../constants/form-sizes';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxList } from './combobox';
import { FormErrorMessage } from './form-error-message';
import { FormLabel } from './form-label';
import type { ComboboxBaseOption } from './single-combobox';

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
  searchPlaceholder?: string;
  emptyMessage?: string;
  requireApply?: boolean;
  clearText?: string;
  applyText?: string;
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
  searchPlaceholder = 'Tìm kiếm...',
  emptyMessage = 'Không tìm thấy kết quả',
  requireApply = true,
  clearText = 'Xóa',
  applyText = 'Áp dụng',
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
  const isApplyingRef = React.useRef(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<Set<string | number>>(
    () => new Set(value ?? []),
  );

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

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setInternalSelectedIds(new Set(value ?? []));
    } else if (!isApplyingRef.current) {
      setInternalSelectedIds(new Set(value ?? []));
    }
    if (!nextOpen) setSearchQuery('');
    isApplyingRef.current = false;
    setOpen(nextOpen);
  };

  const handleInternalValueChange = (vals: (string | number)[]) => {
    if (!requireApply) {
      const opts = vals.map((id) => optionsMap.get(id)).filter((o): o is T => o !== undefined);
      onChange?.(vals, opts);
    }
    setInternalSelectedIds(new Set(vals));
  };

  const handleApply = () => {
    isApplyingRef.current = true;
    const vals = Array.from(internalSelectedIds);
    const opts = vals.map((id) => optionsMap.get(id)).filter((o): o is T => o !== undefined);
    onChange?.(vals, opts);
    setOpen(false);
  };

  const handleClear = () => {
    setInternalSelectedIds(new Set([]));

    if (!requireApply) {
      setOpen(false);
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([], []);
    setInternalSelectedIds(new Set());
  };

  const handleRemoveSingle = (e: React.MouseEvent, removeId: string | number) => {
    e.stopPropagation();
    const newValues = (value ?? []).filter((v) => v !== removeId);
    const opts = newValues.map((v) => optionsMap.get(v)).filter((o): o is T => o !== undefined);
    onChange?.(newValues, opts);
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(removeId);
      return next;
    });
  };

  const externalValues = value ?? [];
  const internalValuesArray = Array.from(internalSelectedIds);

  return (
    <div className={cn('w-full', className)}>
      {label && <FormLabel label={label} htmlFor={inputId} required={required} />}
      <Combobox<string | number, true>
        multiple
        open={open}
        onOpenChange={handleOpenChange}
        value={internalValuesArray}
        onValueChange={handleInternalValueChange}
        disabled={disabled}
        itemToStringLabel={itemToStringLabel}
        filteredItems={filteredItemIds}
      >
        {/* Button-style trigger showing committed selections as badges */}
        <div
          ref={anchorRef}
          className={cn(
            'group/trigger bg-transparent dark:bg-input/30 relative flex w-full rounded-md border border-input shadow-xs transition-[border-color,box-shadow]',
            autoResize ? 'items-start' : 'items-stretch',
            'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            error && 'border-destructive focus-within:ring-destructive/20',
            FORM_SIZE_STYLES[size].height,
            FORM_SIZE_STYLES[size].text,
          )}
        >
          <div
            className={cn(
              'flex min-w-0 flex-1 items-center gap-1',
              FORM_SIZE_STYLES[size].paddingX,
              autoResize && 'flex-wrap',
            )}
          >
            {externalValues.length > 0 ? (
              <>
                {(limitTags !== undefined
                  ? externalValues.slice(0, limitTags)
                  : externalValues
                ).map((id) => {
                  const opt = optionsMap.get(id);
                  if (!opt) return null;
                  return (
                    <Badge
                      key={id}
                      variant="outline"
                      className="flex min-w-0 max-w-fit flex-1 items-center gap-1 rounded-sm border-border pr-0.5 font-normal"
                    >
                      {onSelectedRender ? (
                        onSelectedRender(id, opt)
                      ) : (
                        <p className="truncate">
                          {showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name}
                        </p>
                      )}
                      {!requireApply && !disabled && (
                        <button
                          type="button"
                          className="pointer-events-auto z-10 me-1 inline-flex size-3.5 shrink-0 cursor-pointer items-center justify-center rounded text-muted-foreground hover:text-foreground"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => handleRemoveSingle(e, id)}
                        >
                          <XIcon className="size-3" />
                        </button>
                      )}
                    </Badge>
                  );
                })}
                {limitTags !== undefined && externalValues.length > limitTags && (
                  <Badge
                    variant="outline"
                    className="shrink-0 rounded-sm border-border font-normal"
                  >
                    +{externalValues.length - limitTags}
                  </Badge>
                )}
              </>
            ) : (
              <span className="truncate text-muted-foreground">{placeholder}</span>
            )}
          </div>

          {/* Clear-all + Chevron (z-10, above trigger) */}
          <div
            className={cn(
              'relative ml-auto flex shrink-0 items-center gap-0.5 self-center pr-2',
              FORM_SIZE_STYLES[size].svgIcon,
            )}
          >
            {externalValues.length > 0 && !disabled ? (
              showClearIcon && showArrowIcon ? (
                <div className={cn('relative shrink-0', FORM_SIZE_STYLES[size].icon)}>
                  <span
                    className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover/trigger:opacity-100"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={handleClearAll}
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
                  className={cn(
                    'flex cursor-pointer items-center justify-center rounded text-muted-foreground hover:text-foreground',
                    FORM_SIZE_STYLES[size].icon,
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
                  'mt-px relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 px-2 text-sm outline-hidden',
                  'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                  'data-disabled:pointer-events-none data-disabled:opacity-50',
                  internalSelectedIds.has(option.id) && 'bg-accent text-accent-foreground',
                )}
              >
                <Checkbox
                  checked={internalSelectedIds.has(option.id)}
                  onCheckedChange={() => {}}
                  tabIndex={-1}
                  aria-hidden={true}
                  className="pointer-events-none"
                  wrapperClassName="w-full"
                  label={
                    <>
                      {showMenuCode ? `${option.code} - ${option.name}` : option.name}

                      <Check
                        className={cn(
                          'ml-auto h-4 w-4 shrink-0 text-primary transition-opacity',
                          internalSelectedIds.has(option.id) ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </>
                  }
                  labelClassName="font-normal flex w-full"
                />
              </ComboboxPrimitive.Item>
            ))}
          </ComboboxList>

          {requireApply && (
            <div className="flex items-center gap-2 border-t border-border/70 p-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={handleClear}>
                {clearText}
              </Button>
              <Button size="sm" className="flex-1" onClick={handleApply}>
                {applyText}
              </Button>
            </div>
          )}
        </ComboboxContent>
      </Combobox>
      {error && <FormErrorMessage error={error} />}
    </div>
  );
}

export { MultipleCombobox };
export type { MultipleComboboxProps };
