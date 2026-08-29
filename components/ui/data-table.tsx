'use client';

import { Fragment, useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  ChevronDown,
  Funnel,
  InboxIcon,
  Loader2,
  Search,
} from 'lucide-react';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '../../constants/common';
import { cn, hasValue } from '../../lib/utils';
import { Button } from './button';
import { Checkbox } from './checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ComboboxBaseOption } from './single-combobox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string;
    headerTestId?: string;
    cellTestId?: (row: Row<TData>) => string | undefined;
  }
}

export function DataColumnHeader<TData>({
  column,
  label,
  filterOptions,
  align = 'left',
  filterClearText = 'Xóa',
  filterApplyText = 'Áp dụng',
  filterSearchPlaceholder = 'Tìm kiếm...',
  sortTestId,
  filterTriggerTestId,
  filterSearchInputTestId,
  filterClearTestId,
  filterApplyTestId,
  filterOptionTestIdPrefix,
}: {
  column?: Column<TData, unknown>;
  label: string;
  filterOptions?: ComboboxBaseOption[];
  align?: 'left' | 'right';
  filterClearText?: string;
  filterApplyText?: string;
  filterSearchPlaceholder?: string;
  sortTestId?: string;
  filterTriggerTestId?: string;
  filterSearchInputTestId?: string;
  filterClearTestId?: string;
  filterApplyTestId?: string;
  filterOptionTestIdPrefix?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pending, setPending] = useState<string[]>([]);

  const sorted = column?.getIsSorted() ?? false;
  const isActiveSorted = sorted !== false;

  const filterValues = (column?.getFilterValue() as string[]) ?? [];
  const isActiveFiltered = filterValues.length > 0;
  const hasFilterOptions = filterOptions && filterOptions.length > 0;

  const handleSortToggle = () => {
    if (!column) return;
    const s = column.getIsSorted();
    if (s === 'desc') column.clearSorting();
    else column.toggleSorting(s === 'asc');
  };

  const filteredOptions =
    filterOptions?.filter(
      (o) =>
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.code.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toString().includes(search),
    ) ?? [];

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setPending([...filterValues]);
    else setSearch('');
    setOpen(nextOpen);
  };

  const handleToggle = (value: string) => {
    setPending((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleApply = () => {
    column?.setFilterValue(pending.length ? pending : undefined);
    setOpen(false);
    setSearch('');
  };

  const handleClear = () => {
    setPending([]);
  };

  return (
    <div className={cn('flex items-center gap-1', align === 'right' && 'justify-end')}>
      {column?.getCanSort() ? (
        <button
          data-testid={sortTestId}
          className="flex items-center gap-1 text-left"
          onClick={handleSortToggle}
        >
          {label}
          {sorted === 'asc' ? (
            <ArrowUp className={cn('size-4', isActiveSorted && 'text-primary')} />
          ) : sorted === 'desc' ? (
            <ArrowDown className={cn('size-4', isActiveSorted && 'text-primary')} />
          ) : (
            <ArrowUpDown className="size-4 opacity-50" />
          )}
        </button>
      ) : (
        <span>{label}</span>
      )}

      {hasFilterOptions && (
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger data-testid={filterTriggerTestId} className="flex items-center">
            <Funnel className={cn('size-4', isActiveFiltered ? 'text-primary' : 'opacity-50')} />
          </PopoverTrigger>
          <PopoverContent className="w-60 p-0 gap-0" align="center" sideOffset={8}>
            <div className="px-2 pt-2">
              <InputGroup>
                <InputGroupAddon>
                  <Search className="size-5" />
                </InputGroupAddon>
                <InputGroupInput
                  data-testid={filterSearchInputTestId}
                  className="px-2 text-sm"
                  placeholder={filterSearchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="max-h-48 overflow-y-auto px-2 py-1 space-y-px">
              {filteredOptions.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">Không tìm thấy</p>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    data-testid={
                      filterOptionTestIdPrefix
                        ? `${filterOptionTestIdPrefix}-${option.code}`
                        : undefined
                    }
                    className={cn(
                      'w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent',
                      pending.includes(option.code) && 'bg-accent',
                    )}
                    onClick={() => handleToggle(option.code)}
                  >
                    <Checkbox
                      checked={pending.includes(option.code)}
                      onCheckedChange={() => handleToggle(option.code)}
                      className="pointer-events-none"
                      wrapperClassName="w-full"
                      labelClassName="font-normal flex w-full"
                      label={
                        <>
                          {option.name}
                          <Check
                            className={cn(
                              'size-4 ml-auto text-primary shrink-0 opacity-0',
                              pending.includes(option.code) && 'opacity-100',
                            )}
                          />
                        </>
                      }
                    />
                  </button>
                ))
              )}
            </div>
            <div className="flex gap-2 border-t border-border/70 p-2">
              <Button
                data-testid={filterClearTestId}
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleClear}
              >
                {filterClearText}
              </Button>
              <Button
                data-testid={filterApplyTestId}
                size="sm"
                className="flex-1"
                onClick={handleApply}
              >
                {filterApplyText}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

function getPageRange(currentPage: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i);

  const delta = 1;
  const left = Math.max(1, currentPage - delta);
  const right = Math.min(pageCount - 2, currentPage + delta);
  const result: (number | 'ellipsis')[] = [0];

  if (left > 1) result.push('ellipsis');
  for (let i = left; i <= right; i++) result.push(i);
  if (right < pageCount - 2) result.push('ellipsis');
  result.push(pageCount - 1);

  return result;
}

interface DataTableProps<TData> {
  loading?: boolean;
  data: TData[];
  columns: ColumnDef<TData>[];
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
  containerClassName?: string;
  onSortingChange: OnChangeFn<SortingState>;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  onPaginationChange: OnChangeFn<PaginationState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowCanSelect?: (row: Row<TData>) => boolean;
  getRowId?: (originalRow: TData, index: number) => string;
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode;
  totalCount?: number | null;
  testId?: string;
  getRowTestId?: (row: Row<TData>) => string | undefined;
}

export function DataTable<TData>({
  loading,
  data,
  columns,
  sorting,
  columnFilters,
  pagination,
  containerClassName,
  onColumnFiltersChange,
  onSortingChange,
  onPaginationChange,
  rowSelection,
  onRowSelectionChange,
  getRowCanSelect,
  getRowId,
  renderExpandedRow,
  totalCount,
  testId,
  getRowTestId,
}: DataTableProps<TData>) {
  const selectionColumn: ColumnDef<TData> = {
    id: 'select',
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) =>
      row.getCanSelect() ? (
        <div className="flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ) : null,
    meta: { className: 'w-10 min-w-10 max-w-10 text-center' },
    enableSorting: false,
    enableHiding: false,
  };

  const table = useReactTable({
    data,
    columns: onRowSelectionChange ? [selectionColumn, ...columns] : columns,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      pagination,
      columnPinning: {
        right: ['actions'],
      },
      ...(rowSelection !== undefined && { rowSelection }),
    },
    manualPagination: true,
    manualSorting: true,
    onSortingChange,
    onColumnFiltersChange,
    onPaginationChange,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(rowSelection !== undefined && { enableRowSelection: true }),
    ...(onRowSelectionChange && { onRowSelectionChange }),
    ...(getRowCanSelect && { enableRowSelection: getRowCanSelect }),
    ...(hasValue(totalCount) && { rowCount: totalCount }),
  });

  return (
    <div data-testid={testId} className="flex min-h-0 w-full flex-col gap-3 h-full relative">
      <div className="relative min-h-0" aria-busy={loading ? true : undefined}>
        <Table containerClassName={cn('h-full', containerClassName)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    data-testid={header.column.columnDef.meta?.headerTestId}
                    className={cn(
                      'bg-muted whitespace-normal',
                      header.column.columnDef.meta?.className,
                      header.column.getIsPinned() === 'right' &&
                        'sticky right-0 bg-muted z-30 pinned-right-column min-w-10',
                    )}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const expandedContent = renderExpandedRow?.(row);

              return (
                <Fragment key={row.id}>
                  <TableRow data-testid={getRowTestId?.(row)} className="group">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        data-testid={cell.column.columnDef.meta?.cellTestId?.(row)}
                        className={cn(
                          cell.column.columnDef.meta?.className,
                          cell.column.getIsPinned() === 'right' &&
                            'sticky right-0 pinned-right-column w-0 bg-card group-hover:bg-muted z-20',
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedContent ? (
                    <TableRow className="bg-background hover:bg-background hover:[&_td]:bg-background">
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="bg-background p-0"
                      >
                        {expandedContent}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>

        {loading && <LoadingState />}

        {data.length === 0 && !loading && <EmptyState hasFilters={columnFilters.length > 0} />}
      </div>

      {hasValue(totalCount) && totalCount > DEFAULT_PAGE_SIZE_OPTIONS[0] && (
        <div className="flex items-center justify-end gap-4 mt-auto">
          <Pagination data-testid={testId ? `${testId}-pagination` : undefined}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  data-testid={testId ? `${testId}-pagination-prev` : undefined}
                  text=""
                  size="sm"
                  onClick={() => table.previousPage()}
                  className={!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {getPageRange(table.getState().pagination.pageIndex, table.getPageCount()).map(
                (page, i) =>
                  page === 'ellipsis' ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        data-testid={testId ? `${testId}-pagination-page-${page + 1}` : undefined}
                        size="sm"
                        isActive={table.getState().pagination.pageIndex === page}
                        onClick={() => table.setPageIndex(page)}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ),
              )}
              <PaginationItem>
                <PaginationNext
                  data-testid={testId ? `${testId}-pagination-next` : undefined}
                  text=""
                  size="sm"
                  onClick={() => table.nextPage()}
                  className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  data-testid={testId ? `${testId}-page-size-trigger` : undefined}
                  size="sm"
                  variant="outline"
                  className="w-fit shrink-0 gap-1"
                >
                  {table.getState().pagination.pageSize}/trang
                  <ChevronDown className="size-4" />
                </Button>
              }
            ></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit p-1 space-y-px">
              {DEFAULT_PAGE_SIZE_OPTIONS.map((size) => (
                <DropdownMenuItem
                  key={size}
                  data-testid={testId ? `${testId}-page-size-${size}` : undefined}
                  onClick={() => table.setPageSize(size)}
                  className={cn(
                    'justify-start text-sm',
                    table.getState().pagination.pageSize === size && 'bg-accent',
                  )}
                >
                  {size}/trang
                  <Check
                    className={cn(
                      'size-4 opacity-0 ml-auto text-primary',
                      table.getState().pagination.pageSize === size && 'opacity-100',
                    )}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

type EmptyStateProps = {
  hasFilters: boolean;
  emptyMessage?: string;
  emptyFilterMessage?: string;
};
const EmptyState = ({
  hasFilters,
  emptyMessage = 'Không có dữ liệu',
  emptyFilterMessage = 'Không tìm thấy dữ liệu',
}: EmptyStateProps) => {
  const title = hasFilters ? emptyFilterMessage : emptyMessage;

  return (
    <div className="absolute top-10 inset-x-0 z-10 flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-20 bottom-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
      <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground shadow-sm">
        <Loader2 className="size-4 animate-spin" />
        <span>Đang tải...</span>
      </div>
    </div>
  );
};
