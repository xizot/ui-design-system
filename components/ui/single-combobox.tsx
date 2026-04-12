'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon, XCircleIcon } from 'lucide-react';
import * as React from 'react';

import { FORM_SIZE_STYLES, type FormSize } from '../../constants/form-sizes';
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

export type ComboboxBaseOption = {
  id: string | number;
  code: string;
  name: string;
};

type AnyFetchFunction = (id: string | number) => Promise<unknown>;

type InferApiResponse<TFetch> = TFetch extends (id: string | number) => Promise<infer R>
  ? R
  : never;

type BaseProps<T extends ComboboxBaseOption> = {
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
  showArrowIcon?: boolean;
  showClearIcon?: boolean;
  className?: string;
  id?: string;
  size?: FormSize;
  searchByBackend?: boolean;
  onSearchQueryChange?: (query: string) => void;
  selectedOption?: T;
};

type SingleComboboxProps<
  T extends ComboboxBaseOption,
  TFetch extends AnyFetchFunction | undefined = undefined,
> = BaseProps<T> &
  (TFetch extends undefined
    ? { fetchOptionById?: never; mapFetchOptionByIdResponse?: never }
    : {
        fetchOptionById: TFetch;
        mapFetchOptionByIdResponse?: (response: InferApiResponse<TFetch>) => T;
      });

function SingleCombobox<
  T extends ComboboxBaseOption,
  TFetch extends AnyFetchFunction | undefined = undefined,
>({
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
  showArrowIcon = true,
  showClearIcon = true,
  className,
  id,
  size = 'md',
  searchByBackend = false,
  onSearchQueryChange,
  selectedOption,
  fetchOptionById,
  mapFetchOptionByIdResponse,
}: SingleComboboxProps<T, TFetch>) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [fetchedOption, setFetchedOption] = React.useState<T | undefined>();

  const allOptions = React.useMemo(() => {
    const optionIds = new Set(options.map((o) => o.id));
    let result = options;
    if (selectedOption && !optionIds.has(selectedOption.id)) {
      result = [...result, selectedOption];
    }
    if (fetchedOption && !optionIds.has(fetchedOption.id)) {
      result = [...result, fetchedOption];
    }
    return result;
  }, [options, selectedOption, fetchedOption]);

  const optionsMap = React.useMemo(() => new Map(allOptions.map((o) => [o.id, o])), [allOptions]);

  const filteredOptions = React.useMemo(() => {
    if (searchByBackend) return allOptions;
    if (!searchQuery) return allOptions;
    const q = searchQuery.toLowerCase();
    return allOptions.filter((o) => `${o.code} ${o.name}`.toLowerCase().includes(q));
  }, [allOptions, searchQuery, searchByBackend]);

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

  React.useEffect(() => {
    setOpen(false);
    setSearchQuery('');
    setFetchedOption(undefined);
  }, [value]);

  React.useEffect(() => {
    if (searchByBackend && onSearchQueryChange) {
      onSearchQueryChange(searchQuery);
    }
  }, [searchQuery, searchByBackend, onSearchQueryChange]);

  React.useEffect(() => {
    setFetchedOption(undefined);
  }, [value]);

  React.useEffect(() => {
    if (!value) return;
    if (!fetchOptionById) return;
    if (selectedOption) return;
    if (fetchedOption) return;

    const optionIds = new Set(options.map((o) => o.id));
    if (optionIds.has(value)) return;

    let cancelled = false;

    const fetch = async () => {
      const response = await fetchOptionById(value);
      if (cancelled) return;
      if (!response) return;

      const mapped = mapFetchOptionByIdResponse
        ? mapFetchOptionByIdResponse(response as InferApiResponse<TFetch>)
        : (response as T);

      if (mapped) setFetchedOption(mapped);
    };

    void fetch();

    return () => {
      cancelled = true;
    };
  }, [value, options, fetchOptionById, selectedOption, fetchedOption, mapFetchOptionByIdResponse]);
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
        onInputValueChange={(v) => setSearchQuery(v)}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) setSearchQuery('');
        }}
      >
        {/* Button-style trigger — no typing allowed */}
        <div
          ref={anchorRef}
          className={cn(
            'group/trigger relative flex w-full items-center overflow-hidden rounded-md border border-input bg-background shadow-xs transition-[border-color,box-shadow]',
            'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            disabled && 'pointer-events-none cursor-not-allowed opacity-50',
            error && 'border-destructive focus-within:ring-destructive/20',
            FORM_SIZE_STYLES[size].height,
            FORM_SIZE_STYLES[size].text,
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
              FORM_SIZE_STYLES[size].paddingX,
              selectedLabel ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {selectedLabel ?? placeholder}
          </span>

          {/* Clear-all + Chevron (z-10, above trigger) */}
          <div
            className={cn(
              'relative z-10 ml-auto flex shrink-0 items-center gap-0.5 self-center pr-2',
              FORM_SIZE_STYLES[size].svgIcon,
            )}
          >
            {hasValue && !disabled ? (
              showClearIcon && showArrowIcon ? (
                <div className={cn('relative shrink-0', FORM_SIZE_STYLES[size].icon)}>
                  <span
                    className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover/trigger:opacity-100"
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
                  className="flex size-4 cursor-pointer items-center justify-center rounded text-muted-foreground hover:text-foreground"
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
            />
          </div>

          <ComboboxList className="px-2">
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

