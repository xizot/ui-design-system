'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Check, ChevronDownIcon, Loader2Icon, XCircleIcon, XIcon } from 'lucide-react';
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
import type { FetchOptionsFunction, MappedPageResult, ListResponse } from './lazy-single-combobox';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LazyMultipleComboboxProps<
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
> = {
  // --- Core ---
  value?: (string | number)[];
  onChange?: (values: (string | number)[], options: TOption[]) => void;

  // --- Fetch ---
  fetchOptions: FetchOptionsFunction;
  /**
   * Map raw API response → MappedPageResult<TOption>.
   * Omit when API already returns ListResponse<TOption>.
   */
  mapResponse?: (raw: TRaw) => MappedPageResult<TOption>;

  // --- Backup options ---
  /**
   * Pre-selected options for form edit mode.
   * Used to display badges/labels before options appear in the paged list.
   * Must extend ComboboxBaseOption.
   */
  backupOptions?: TOption[];

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
  requireApply?: boolean;
  clearText?: string;
  applyText?: string;
  limitTags?: number;
  autoResize?: boolean;
  showArrowIcon?: boolean;
  showClearIcon?: boolean;
  /**
   * Custom renderer cho từng badge đã chọn.
   * `selectedOption` được typed là `TOption` — có thể access các field mở rộng.
   */
  onSelectedRender?: (selectedId: string | number, selectedOption: TOption) => React.ReactNode;
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

function LazyMultipleCombobox<
  TRaw = unknown,
  TOption extends ComboboxBaseOption = ComboboxBaseOption,
>({
  value,
  onChange,
  fetchOptions,
  mapResponse,
  backupOptions,
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
  dependencies,
}: LazyMultipleComboboxProps<TRaw, TOption>) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const isUserScrollingRef = React.useRef(false);
  const userScrollTimerRef = React.useRef<NodeJS.Timeout>(null);
  const isApplyingRef = React.useRef(false);

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Map<id, TOption> — dedup + O(1) lookup, persists across pages
  const itemsMapRef = React.useRef<Map<string | number, TOption>>(new Map());
  const [itemsList, setItemsList] = React.useState<TOption[]>([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const isFetchingRef = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  const isLastPage = currentPage >= totalPages;

  // Support uncontrolled mode
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<(string | number)[]>([]);
  const resolvedValue = isControlled ? value : internalValue;

  // Internal selected ids — tracks pending selection before Apply
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<Set<string | number>>(
    () => new Set(resolvedValue),
  );

  // ---------------------------------------------------------------------------
  // Seed itemsMap with backupOptions so labels resolve immediately
  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    if (!backupOptions?.length) return;
    backupOptions.forEach((opt) => itemsMapRef.current.set(opt.id, opt));
    setItemsList(Array.from(itemsMapRef.current.values()));
  }, [backupOptions]);

  // Prevent base-ui from hijacking scroll when user is scrolling.
  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      isUserScrollingRef.current = true;
      clearTimeout(userScrollTimerRef.current as NodeJS.Timeout);
      userScrollTimerRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 500);
    };

    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (this: Element, ...args) {
      if (isUserScrollingRef.current && container.contains(this)) return;
      originalScrollIntoView.apply(this, args);
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
      Element.prototype.scrollIntoView = originalScrollIntoView;
      clearTimeout(userScrollTimerRef.current as NodeJS.Timeout);
    };
  }, [open]);

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

        // Unwrap AxiosResponse if needed
        const unwrapped = (raw as { data?: unknown })?.data ?? raw;

        let result: MappedPageResult<TOption>;

        if (mapResponse) {
          result = mapResponse(unwrapped as TRaw);
        } else {
          // Caller guarantees API returns ListResponse<TOption> when mapResponse is omitted
          const typed = unwrapped as ListResponse<TOption>;
          result = {
            totalPages: typed.totalPages,
            pageNumber: typed.pageNumber,
            items: typed.items,
          };
        }

        if (page === 1) {
          // Rebuild map on fresh search — always keep backupOptions + selected items
          const newMap = new Map<string | number, TOption>();

          // Re-insert backup options
          backupOptions?.forEach((opt) => newMap.set(opt.id, opt));

          // Re-insert currently selected items (survive search reset)
          internalSelectedIds.forEach((id) => {
            const existing = itemsMapRef.current.get(id);
            if (existing) newMap.set(id, existing);
          });

          result.items.forEach((item) => newMap.set(item.id, item));
          itemsMapRef.current = newMap;
        } else {
          result.items.forEach((item) => itemsMapRef.current.set(item.id, item));
        }

        setItemsList(Array.from(itemsMapRef.current.values()));
        setTotalPages(result.totalPages);
        setCurrentPage(result.pageNumber);
      } catch (err) {
        console.error('[LazyMultipleCombobox] fetchOptions error:', err);
        setFetchError('Không thể tải dữ liệu');
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    },
    // internalSelectedIds intentionally omitted — read via closure ref pattern below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchOptions, mapResponse, searchKey, pageKey, pageSizeKey, pageSize, backupOptions],
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
  // Virtualizer — fixed row height (no measureElement to avoid scroll jumps)
  // ---------------------------------------------------------------------------

  const virtualizer = useVirtualizer({
    count: itemsList.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  // ---------------------------------------------------------------------------
  // Label / option resolution
  // ---------------------------------------------------------------------------

  const itemToStringLabel = React.useCallback(
    (id: string | number): string => {
      const opt = itemsMapRef.current.get(id);
      if (!opt) return String(id);
      return showSelectedCode ? `${opt.code} - ${opt.name}` : opt.name;
    },
    [showSelectedCode],
  );

  const resolveOptions = React.useCallback(
    (ids: (string | number)[]): TOption[] =>
      ids.map((id) => itemsMapRef.current.get(id)).filter((o): o is TOption => o !== undefined),
    [],
  );

  // ---------------------------------------------------------------------------
  // Open / close
  // ---------------------------------------------------------------------------

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setInternalSelectedIds(new Set(resolvedValue));
    } else if (!isApplyingRef.current) {
      setInternalSelectedIds(new Set(resolvedValue));
    }
    if (!nextOpen) setSearchQuery('');
    isApplyingRef.current = false;
    setOpen(nextOpen);
  };

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleInternalValueChange = (vals: (string | number)[]) => {
    const newSet = new Set(vals);
    setInternalSelectedIds(newSet);
    if (!requireApply) {
      if (!isControlled) setInternalValue(vals);
      onChange?.(vals, resolveOptions(vals));
    }
  };

  const handleApply = () => {
    isApplyingRef.current = true;
    const vals = Array.from(internalSelectedIds);
    if (!isControlled) setInternalValue(vals);
    onChange?.(vals, resolveOptions(vals));
    setOpen(false);
  };

  const handleCancel = () => {
    setInternalSelectedIds(new Set());
    if (!isControlled) setInternalValue([]);
    if (!requireApply) setOpen(false);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue([]);
    onChange?.([], []);
    setInternalSelectedIds(new Set());
  };

  const handleRemoveSingle = (e: React.MouseEvent, removeId: string | number) => {
    e.stopPropagation();
    const newValues = resolvedValue.filter((v) => v !== removeId);
    if (!isControlled) setInternalValue(newValues);
    onChange?.(newValues, resolveOptions(newValues));
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(removeId);
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // Derived
  // ---------------------------------------------------------------------------

  const externalValues = resolvedValue;
  const filteredItemIds = React.useMemo(() => itemsList.map((o) => o.id), [itemsList]);
  const internalValuesArray = React.useMemo(
    () => Array.from(internalSelectedIds),
    [internalSelectedIds],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

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
        {/* Trigger */}
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
                  const opt = itemsMapRef.current.get(id);
                  if (!opt) return null;
                  return (
                    <Badge
                      key={id}
                      variant="outline"
                      className="flex min-w-0 max-w-fit flex-1 items-center gap-1 rounded-sm border-border pr-0.5 font-normal"
                    >
                      {onSelectedRender ? (
                        // opt is TOption — caller gets full typed access
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

          {/* Clear-all + Chevron */}
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

        {/* Dropdown */}
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
                  const isSelected = internalSelectedIds.has(option.id);
                  return (
                    <div
                      key={option.id}
                      data-index={vItem.index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        transform: `translateY(${vItem.start}px)`,
                        width: '100%',
                      }}
                    >
                      <ComboboxPrimitive.Item
                        value={option.id}
                        className={cn(
                          'relative mt-px flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden',
                          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                          'data-disabled:pointer-events-none data-disabled:opacity-50',
                          isSelected && 'bg-accent text-accent-foreground',
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => {}}
                          tabIndex={-1}
                          aria-hidden={true}
                          className="pointer-events-none"
                          wrapperClassName="w-full"
                          label={
                            <span className="flex w-full items-center">
                              <span className="flex-1 truncate">
                                {showMenuCode ? `${option.code} - ${option.name}` : option.name}
                              </span>
                              {/* Always reserve space — opacity instead of conditional render to avoid height shift */}
                              <Check
                                className={cn(
                                  'ml-auto h-4 w-4 shrink-0 text-primary transition-opacity',
                                  isSelected ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                            </span>
                          }
                          labelClassName="font-normal flex w-full"
                        />
                      </ComboboxPrimitive.Item>
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

          {requireApply && (
            <div className="flex items-center gap-2 border-t border-border/70 p-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={handleCancel}>
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

export { LazyMultipleCombobox };
export type { LazyMultipleComboboxProps };
