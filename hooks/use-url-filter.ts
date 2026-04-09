import { ALL_OPTION, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../constants/common';
import { hasValue } from '../lib/utils';
import { PaginationState, SortingState, Updater } from '@tanstack/react-table';
import type { inferParserType, ParserMap } from 'nuqs';
import { createParser, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useCallback, useMemo } from 'react';

export type BaseKeyNames = {
  page: string;
  pageSize?: string;
  searchTerm: string;
  sortOrder: string;
};

const DEFAULT_BASE_KEYS = {
  page: 'page',
  pageSize: 'pageSize',
  searchTerm: 'searchTerm',
  sortOrder: 'sortOrder',
} as const;

type DefaultBaseKeys = typeof DEFAULT_BASE_KEYS;

type ResolvedKeys<K extends BaseKeyNames> = {
  page: K['page'];
  pageSize: K extends { pageSize: string } ? K['pageSize'] : DefaultBaseKeys['pageSize'];
  searchTerm: K['searchTerm'];
  sortOrder: K['sortOrder'];
};

type BaseFilters<
  R extends { page: string; pageSize: string; searchTerm: string; sortOrder: string },
> = { [P in R['page']]: number } & { [P in R['pageSize']]: number } & {
  [P in R['searchTerm']]: string;
} & { [P in R['sortOrder']]: number | null };

type MergedFilters<T extends ParserMap, K extends BaseKeyNames> = inferParserType<T> &
  BaseFilters<ResolvedKeys<K>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFilters = Record<string, any>;
type AnySetFilters = (values: AnyFilters | null) => Promise<URLSearchParams>;

export const baseParsers = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE_INDEX),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  searchTerm: parseAsString.withDefault(''),
  sortOrder: parseAsInteger,
};

function createBaseParsers(keys: {
  page: string;
  pageSize: string;
  searchTerm: string;
  sortOrder: string;
}) {
  return {
    [keys.page]: parseAsInteger.withDefault(DEFAULT_PAGE_INDEX),
    [keys.pageSize]: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
    [keys.searchTerm]: parseAsString.withDefault(''),
    [keys.sortOrder]: parseAsInteger,
  };
}

export interface UseUrlFiltersOptions<
  T extends ParserMap,
  K extends BaseKeyNames = DefaultBaseKeys,
> {
  keys?: K;
  excludeKeys?: Array<keyof MergedFilters<T, K> | string>;
}

export function useUrlFilters<T extends ParserMap, K extends BaseKeyNames = DefaultBaseKeys>(
  parsers: T,
  options?: UseUrlFiltersOptions<T, K> | Array<keyof MergedFilters<T, K>>,
) {
  const opts = (
    Array.isArray(options) ? { excludeKeys: options } : (options ?? {})
  ) as UseUrlFiltersOptions<T, K>;

  const resolvedKeys = {
    page: (opts.keys?.page ?? DEFAULT_BASE_KEYS.page) as string,
    pageSize: (opts.keys?.pageSize ?? DEFAULT_BASE_KEYS.pageSize) as string,
    searchTerm: (opts.keys?.searchTerm ?? DEFAULT_BASE_KEYS.searchTerm) as string,
    sortOrder: (opts.keys?.sortOrder ?? DEFAULT_BASE_KEYS.sortOrder) as string,
  };

  const runtimeBaseParsers = useMemo(
    () => (opts.keys ? createBaseParsers(resolvedKeys) : baseParsers),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [rawFilters, rawSetFilters] = useQueryStates(
    { ...runtimeBaseParsers, ...parsers } as unknown as T,
    { shallow: true, history: 'replace' },
  );

  const f = rawFilters as AnyFilters;
  const setFilters = rawSetFilters as unknown as AnySetFilters;

  const page = (f[resolvedKeys.page] as number) ?? DEFAULT_PAGE_INDEX;
  const pageSize = (f[resolvedKeys.pageSize] as number) ?? DEFAULT_PAGE_SIZE;
  const sortOrder = f[resolvedKeys.sortOrder] as number | null | undefined;

  const defaultExcluded = useMemo(
    () => [resolvedKeys.page, resolvedKeys.pageSize, resolvedKeys.sortOrder, 'tab'],
    [resolvedKeys.page, resolvedKeys.pageSize, resolvedKeys.sortOrder],
  );

  const excluded = useMemo(
    () => [...defaultExcluded, ...(opts.excludeKeys ?? [])] as string[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [opts.excludeKeys],
  );

  const isActiveFilter = (key: string, val: unknown, excludedKeys: string[]) =>
    !excludedKeys.includes(key) &&
    val !== null &&
    val !== '' &&
    val !== false &&
    !(Array.isArray(val) && val.length === 0);

  const hasActiveFilters = useMemo(
    () => Object.entries(f).some(([key, val]) => isActiveFilter(key, val, excluded)),
    [f, excluded],
  );

  const showQueryTags = useMemo(
    () =>
      Object.entries(f).some(([key, val]) =>
        isActiveFilter(key, val, [...defaultExcluded, resolvedKeys.searchTerm]),
      ),
    [f, defaultExcluded, resolvedKeys.searchTerm],
  );

  const paginationState = useMemo(() => ({ pageIndex: page - 1, pageSize }), [page, pageSize]);

  const stateToSortBy = useCallback(
    <E>(sorting: SortingState | undefined, sortOrderEnum: E): number | undefined => {
      if (!sorting?.length) return undefined;
      const { id, desc } = sorting[0];
      return (sortOrderEnum as Record<string, number>)[`${id}_${desc ? 'desc' : 'asc'}`];
    },
    [],
  );

  const sortByToState = useCallback(
    <E>(order: number | null | undefined, sortOrderEnum: E): SortingState => {
      if (!hasValue(order)) return [];
      const enumRecord = sortOrderEnum as Record<string, number>;
      const enumKey = Object.keys(enumRecord).find((k) => enumRecord[k] === order);
      if (!enumKey) return [];
      const [id, direction] = enumKey.split('_');
      return [{ id, desc: direction === 'desc' }];
    },
    [],
  );

  const setFilter = useCallback(
    <FK extends keyof MergedFilters<T, K>>(
      keyOrValues: FK | Partial<MergedFilters<T, K>>,
      value?: MergedFilters<T, K>[FK] | null,
    ) => {
      const translateKey = (k: string): string =>
        k in DEFAULT_BASE_KEYS ? (resolvedKeys[k as keyof typeof resolvedKeys] ?? k) : k;

      const rawUpdates: AnyFilters =
        typeof keyOrValues === 'object'
          ? Object.fromEntries(Object.entries(keyOrValues).map(([k, v]) => [k, v ?? null]))
          : { [keyOrValues as string]: value ?? null };

      const updates: AnyFilters = Object.fromEntries(
        Object.entries(rawUpdates).map(([k, v]) => [translateKey(k), v]),
      );

      const isChangingPage =
        typeof keyOrValues === 'object'
          ? resolvedKeys.page in updates || 'page' in (keyOrValues as object)
          : keyOrValues === 'page' || keyOrValues === resolvedKeys.page;

      setFilters({
        ...updates,
        ...(!isChangingPage && { [resolvedKeys.page]: DEFAULT_PAGE_INDEX }),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFilters, resolvedKeys.page],
  );

  const onPaginationChange = useCallback(
    (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const next = typeof updater === 'function' ? updater(paginationState) : updater;
      setFilters({
        [resolvedKeys.page]: next.pageIndex + 1,
        [resolvedKeys.pageSize]: next.pageSize,
      });
    },
    [paginationState, setFilters, resolvedKeys.page, resolvedKeys.pageSize],
  );

  const createSortingHandlers = useCallback(
    <E>(sortOrderEnum: E) => {
      const sortingState = sortByToState(sortOrder, sortOrderEnum);
      const handleSortingChange = (updater: Updater<SortingState>) => {
        const newSorting = typeof updater === 'function' ? updater(sortingState) : updater;
        setFilters({ [resolvedKeys.sortOrder]: stateToSortBy(newSorting, sortOrderEnum) ?? null });
      };
      return { sortingState, handleSortingChange };
    },
    [sortOrder, setFilters, resolvedKeys.sortOrder, sortByToState, stateToSortBy],
  );

  return {
    filters: f as unknown as MergedFilters<T, K>,
    hasActiveFilters,
    showQueryTags,
    paginationState,
    setFilter,
    onPaginationChange,
    createSortingHandlers,
    resetFilters: () => setFilters(null),
    setSearchTerm: (searchTerm: string) => {
      setFilters({
        [resolvedKeys.searchTerm]: searchTerm,
        [resolvedKeys.page]: DEFAULT_PAGE_INDEX,
      });
    },
    stateToSortBy,
    sortByToState,
    baseKeys: resolvedKeys as Readonly<Required<BaseKeyNames>>,
  };
}

export const parseAsIntOrAll = createParser({
  parse(value: string) {
    if (value === ALL_OPTION.id) return ALL_OPTION.id;
    const n = parseInt(value, 10);
    return isNaN(n) ? null : n;
  },
  serialize(value: number | typeof ALL_OPTION.id) {
    return String(value);
  },
});

export const parseAsBooleanOrAll = createParser({
  parse(value: string) {
    if (value === ALL_OPTION.id) return ALL_OPTION.id;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  },
  serialize(value: boolean | typeof ALL_OPTION.id) {
    return String(value);
  },
});

export const isCollapsedToAll = (values: unknown): boolean => {
  if (Array.isArray(values)) return values.includes(ALL_OPTION.id);
  return values === ALL_OPTION.id;
};

type FilterTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
};

export const getFilterValues = <T extends keyof FilterTypeMap = 'number'>(
  values: (string | number | boolean | typeof ALL_OPTION.id)[],
  type?: T,
): FilterTypeMap[T][] | undefined => {
  if (isCollapsedToAll(values)) return undefined;

  return values
    .filter((v) => v !== ALL_OPTION.id)
    .map((v) => {
      if (type === 'string') return String(v);
      if (type === 'boolean') return v === 'true' || v === true;
      return Number(v);
    }) as FilterTypeMap[T][];
};
