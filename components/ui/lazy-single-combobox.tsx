'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronDownIcon, Loader2Icon, XCircleIcon } from 'lucide-react';
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
import { type ComboboxBaseOption } from './single-combobox';

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

  // --- UI ---
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
      } catch (err) {
        console.error('[LazySingleCombobox] fetchOptions error:', err);
        setFetchError('Không thể tải dữ liệu');
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    },
    [fetchOptions, mapResponse, searchKey, pageKey, pageSizeKey, pageSize],
  );

  // ---------------------------------------------------------------------------
  // Reset search when menu closes
  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);

  // ---------------------------------------------------------------------------
  // Fetch page 1 when dropdown opens or search changes
  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    void fetchPage(debouncedSearch, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // ---------------------------------------------------------------------------
  // Re-fetch when external dependencies change
  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    if (!dependencies) return;
    setSearchQuery('');
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
  // Virtualizer — dynamic row height
  // ---------------------------------------------------------------------------

  const virtualizer = useVirtualizer({
    count: itemsList.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 36,
    measureElement: (el) => el.getBoundingClientRect().height,
    overscan: 5,
  });

  // ---------------------------------------------------------------------------
  // Label resolution
  // ---------------------------------------------------------------------------

  const itemToStringLabel = React.useCallback(
    (id: string | number): string => {
      const opt = itemsMapRef.current.get(id) ?? internalSelectedItemRef.current;
      if (!opt) return String(id);
      return showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name;
    },
    [showSelectedCode],
  );

  const selectedLabel = React.useMemo(() => {
    if (resolvedValue === undefined || resolvedValue === null) return undefined;
    const opt = itemsMapRef.current.get(resolvedValue) ?? internalSelectedItemRef.current;
    if (!opt) return String(resolvedValue);
    return showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name;
    // backupOption and itemsList trigger re-compute when data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedValue, showSelectedCode, backupOption, itemsList]);

  const hasValue = resolvedValue !== undefined && resolvedValue !== null;

  const filteredItemIds = React.useMemo(() => itemsList.map((o) => o.id), [itemsList]);

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
        onOpenChange={setOpen}
      >
        {/* Trigger */}
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
          <ComboboxPrimitive.Trigger
            className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-none"
            disabled={disabled}
          />

          <span
            className={cn(
              'pointer-events-none flex-1 truncate',
              FORM_SIZE_STYLES[size].paddingX,
              selectedLabel ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {selectedLabel ?? placeholder}
          </span>

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
                  className="flex size-4 cursor-pointer items-center justify-center rounded text-muted-foreground hover:text-foreground"
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

            {/* Scroll container */}
            <div ref={scrollRef} className="overflow-y-auto" style={{ maxHeight: 240 }}>
              {/* Virtual height spacer */}
              <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
                {virtualizer.getVirtualItems().map((vItem) => {
                  const option = itemsList[vItem.index];
                  if (!option) return null;
                  return (
                    <div
                      key={option.id}
                      data-index={vItem.index}
                      ref={virtualizer.measureElement}
                      style={{
                        position: 'absolute',
                        top: 0,
                        transform: `translateY(${vItem.start}px)`,
                        width: '100%',
                      }}
                    >
                      <ComboboxItem
                        value={option.id}
                        className={cn(
                          'mt-px',
                          resolvedValue === option.id && 'bg-accent text-accent-foreground',
                        )}
                      >
                        {showMenuCode ? `${option.code} - ${option.name}` : option.name}
                      </ComboboxItem>
                    </div>
                  );
                })}
              </div>

              {/* Sentinel — triggers next page */}
              <div ref={sentinelRef} className="h-1" />

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center justify-center py-2 text-muted-foreground">
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
