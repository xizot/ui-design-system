'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon, Loader2Icon, XCircleIcon } from 'lucide-react';
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
import { type ComboboxBaseOption } from './single-combobox';

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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ListResponse<T> = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  totalCount: number;
  items: T[];
};

export type MappedPageResult<TOption extends ComboboxBaseOption = ComboboxBaseOption> = {
  totalPages: number;
  pageNumber: number;
  items: TOption[];
};

/**
 * Loose fetch function type — accepts any single-param async function.
 * Using `any` on the param intentionally to allow callers to pass
 * typed service methods (e.g. `(params: VehicleSearchRequest) => Promise<...>`)
 * without needing a cast.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FetchOptionsFunction = (params: any) => Promise<unknown>;

export type LazySingleComboboxProps<
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
> = {
  // --- Core ---
  value?: string | number;
  onChange?: (value: string | number | undefined, option: TOption | undefined) => void;

  // --- Fetch ---
  fetchOptions: FetchOptionsFunction;
  /**
   * Map raw API response → MappedPageResult<TOption>.
   * Omit when API already returns ListResponse<TOption>.
   * TRaw is inferred from the mapResponse param type — no need to pass it explicitly.
   */
  mapResponse?: (raw: TRaw) => MappedPageResult<TOption>;

  // --- Backup option ---
  /**
   * Pass the currently selected option when value is pre-set (e.g. form edit mode).
   * Used to display the label before the option appears in the paged list.
   * Must extend ComboboxBaseOption.
   */
  backupOption?: TOption;

  // --- Param key overrides ---
  /** Default: "searchTerm" */
  searchKey?: string;
  /** Default: "page" */
  pageKey?: string;
  /** Default: "pageSize" */
  pageSizeKey?: string;
  /** Default: 20 */
  pageSize?: number;

  // --- Auto-select ---
  /** Auto-select first option when data loads */
  autoSelectFirst?: boolean;

  // --- UI ---
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
  dependencies?: unknown[];
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function LazySingleCombobox<
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
>({
  value,
  onChange,
  fetchOptions,
  mapResponse,
  backupOption,
  searchKey = 'searchTerm',
  pageKey = 'page',
  pageSizeKey = 'pageSize',
  pageSize = 20,
  autoSelectFirst = false,
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
  dependencies,
}: LazySingleComboboxProps<TRaw, TOption>) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Map<id, TOption> — dedup + O(1) lookup
  const itemsMapRef = React.useRef<Map<string | number, TOption>>(new Map());
  const [itemsList, setItemsList] = React.useState<TOption[]>([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  // Separate ref (guard) + state (render) to avoid double-fetch
  const isFetchingRef = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  const isLastPage = currentPage >= totalPages;

  // Support uncontrolled mode — track value internally when prop is not passed
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | number | undefined>(undefined);
  const resolvedValue = isControlled ? value : internalValue;

  // Survives search reset — stored in ref so fetchPage does NOT depend on it
  // (avoids fetchPage recreation → useEffect re-trigger → list reset loop)
  const internalSelectedItemRef = React.useRef<TOption | undefined>(backupOption);

  // Sync backupOption → internalSelectedItemRef when it changes from outside
  React.useEffect(() => {
    if (!backupOption) {
      if (internalSelectedItemRef.current && !resolvedValue) {
        internalSelectedItemRef.current = undefined;
      }
      return;
    }
    internalSelectedItemRef.current = backupOption;
    itemsMapRef.current.set(backupOption.id, backupOption);
    setItemsList(Array.from(itemsMapRef.current.values()));
  }, [backupOption, resolvedValue]);

  // ---------------------------------------------------------------------------
  // Fetch page
  // ---------------------------------------------------------------------------

  const fetchPage = React.useCallback(
    async (search: string, page: number) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setIsLoading(true);
      setFetchError(null);

      try {
        const params = {
          [searchKey]: search,
          [pageKey]: page,
          [pageSizeKey]: pageSize,
        };

        const raw = await fetchOptions(params);

        // Unwrap AxiosResponse if needed — axios wraps the actual data in `.data`
        const unwrapped = (raw as { data?: unknown })?.data ?? raw;

        let result: MappedPageResult<TOption>;

        if (mapResponse) {
          result = mapResponse(unwrapped as TRaw);
        } else {
          // When mapResponse is omitted, caller guarantees API returns ListResponse<TOption>
          const typed = unwrapped as ListResponse<TOption>;
          result = {
            totalPages: typed.totalPages,
            pageNumber: typed.pageNumber,
            items: typed.items,
          };
        }

        if (page === 1) {
          // Fresh search — rebuild map, always re-insert internalSelectedItem
          const newMap = new Map<string | number, TOption>();
          const currentSelected = internalSelectedItemRef.current;
          if (currentSelected) {
            newMap.set(currentSelected.id, currentSelected);
          }
          result.items.forEach((item) => newMap.set(item.id, item));
          itemsMapRef.current = newMap;
        } else {
          result.items.forEach((item) => itemsMapRef.current.set(item.id, item));
        }

        setItemsList(Array.from(itemsMapRef.current.values()));
        setTotalPages(result.totalPages);
        setCurrentPage(result.pageNumber);

        if (autoSelectFirst && page === 1 && result.items.length > 0 && !resolvedValue) {
          const firstItem = result.items[0];
          if (firstItem) {
            internalSelectedItemRef.current = firstItem;
            if (!isControlled) setInternalValue(firstItem.id);
            onChange?.(firstItem.id, firstItem);
          }
        }
      } catch (err) {
        console.error('[LazySingleCombobox] fetchOptions error:', err);
        setFetchError('Không thể tải dữ liệu');
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    },
    [
      fetchOptions,
      mapResponse,
      searchKey,
      pageKey,
      pageSizeKey,
      pageSize,
      autoSelectFirst,
      resolvedValue,
      isControlled,
      onChange,
    ],
  );

  // ---------------------------------------------------------------------------
  // Fetch page 1 when dropdown opens or search changes
  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    if (!open) return;
    void fetchPage(debouncedSearch, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, open]);

  // ---------------------------------------------------------------------------
  // Re-fetch when external dependencies change
  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    if (!dependencies) return;
    if (!open) return;
    void fetchPage('', 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies ?? []);

  // ---------------------------------------------------------------------------
  // IntersectionObserver — load next page on scroll to bottom
  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    if (!open) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !isFetchingRef.current && !isLastPage) {
          void fetchPage(debouncedSearch, currentPage + 1);
        }
      },
      { root: scrollRef.current, threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [open, isLastPage, currentPage, debouncedSearch, fetchPage]);

  // ---------------------------------------------------------------------------
  // Label resolution
  // ---------------------------------------------------------------------------

  const itemToStringLabel = React.useCallback(
    (id: string | number): string => {
      const opt = itemsMapRef.current.get(id) ?? internalSelectedItemRef.current;
      if (!opt) return String(id);
      if (selectedCodeOnly) return opt.code;
      return showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name;
    },
    [selectedCodeOnly, showSelectedCode],
  );

  const hasValue = resolvedValue !== undefined && resolvedValue !== null;

  const filteredItemIds = React.useMemo(() => itemsList.map((o) => o.id), [itemsList]);
  const itemsById = React.useMemo(() => new Map(itemsList.map((o) => [o.id, o])), [itemsList]);

  const selectedLabel = React.useMemo(() => {
    if (resolvedValue === undefined || resolvedValue === null) return undefined;
    const opt = itemsById.get(resolvedValue) ?? backupOption;
    if (!opt) return String(resolvedValue);
    if (selectedCodeOnly) return opt.code;
    return showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name;
  }, [resolvedValue, selectedCodeOnly, showSelectedCode, backupOption, itemsById]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setSearchQuery('');
    setOpen(nextOpen);
  };

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleValueChange = (val: string | number | null) => {
    if (val === null || val === undefined) {
      if (!isControlled) setInternalValue(undefined);
      onChange?.(undefined, undefined);
      internalSelectedItemRef.current = undefined;
      return;
    }
    const opt = itemsMapRef.current.get(val);
    if (opt) internalSelectedItemRef.current = opt;
    if (!isControlled) setInternalValue(opt?.id ?? val);
    onChange?.(opt?.id ?? val, opt);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue(undefined);
    onChange?.(undefined, undefined);
    internalSelectedItemRef.current = undefined;
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className={cn('w-full', className)}>
      {label && <FormLabel label={label} htmlFor={inputId} required={required} />}

      <Combobox<string | number>
        open={open}
        value={resolvedValue ?? null}
        onValueChange={handleValueChange}
        disabled={disabled}
        itemToStringLabel={itemToStringLabel}
        filteredItems={filteredItemIds}
        onOpenChange={handleOpenChange}
      >
        {/* Trigger */}
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
          <ComboboxPrimitive.Trigger
            className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-none"
            disabled={disabled}
          />

          <span
            className={cn(
              'pointer-events-none flex-1 truncate',
              comboboxPaddingVariants({ size }),
              selectedLabel ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {selectedLabel ?? placeholder}
          </span>

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
                    onClick={handleClear}
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
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={handleClear}
                >
                  <XCircleIcon />
                </button>
              ) : (
                <ChevronDownIcon className="text-muted-foreground" />
              )
            ) : (
              showArrowIcon && <ChevronDownIcon className="text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Dropdown */}
        <ComboboxContent anchor={anchorRef}>
          <div className="px-2 pt-3">
            <ComboboxInput
              id={inputId}
              placeholder={searchPlaceholder}
              showClear
              formSize="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ComboboxList className="px-2">
            <ComboboxEmpty>
              {fetchError ? (
                <div className="text-destructive">{fetchError}</div>
              ) : !isLoading && itemsList.length === 0 ? (
                emptyMessage
              ) : null}
            </ComboboxEmpty>

            <div ref={scrollRef} className="overflow-y-auto" style={{ maxHeight: 240 }}>
              {itemsList.map((option) => (
                <ComboboxItem
                  key={option.id}
                  value={option.id}
                  className={cn(
                    'mt-px',
                    resolvedValue === option.id && 'bg-accent text-accent-foreground',
                  )}
                >
                  {showMenuCode ? `${option.code} - ${option.name}` : option.name}
                </ComboboxItem>
              ))}

              <div ref={sentinelRef} className="h-1" />

              {isLoading && (
                <div className="text-muted-foreground flex items-center justify-center py-2">
                  <Loader2Icon className="size-4 animate-spin" />
                </div>
              )}
            </div>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && <FormErrorMessage error={error} />}
    </div>
  );
}

export { LazySingleCombobox };
