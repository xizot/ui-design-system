'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/constants/common';
import { cn } from '@/lib/utils';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Check, Funnel, Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

export type DataColumnOption = { label: string; value: string };

export function DataColumnHeader<TData>({
  column,
  label,
  filterOptions,
  align = 'left',
  filterClearText = 'Xóa',
  filterApplyText = 'Áp dụng',
  filterSearchPlaceholder = 'Tìm kiếm...',
}: {
  column?: Column<TData, unknown>;
  label: string;
  filterOptions?: DataColumnOption[];
  align?: 'left' | 'right';
  filterClearText?: string;
  filterApplyText?: string;
  filterSearchPlaceholder?: string;
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
    filterOptions?.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())) ?? [];

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
      {column ? (
        <button className="flex items-center gap-1" onClick={handleSortToggle}>
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
          <PopoverTrigger className="flex items-center">
            <Funnel className={cn('size-4', isActiveFiltered ? 'text-primary' : 'opacity-50')} />
          </PopoverTrigger>
          <PopoverContent className="w-52 p-0 gap-0" align="center" sideOffset={8}>
            <div className="px-2 pt-2">
              <InputGroup>
                <InputGroupAddon>
                  <Search className="size-5" />
                </InputGroupAddon>
                <InputGroupInput
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
                    key={option.value}
                    type="button"
                    className={cn(
                      'flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent',
                      pending.includes(option.value) && 'bg-accent',
                    )}
                    onClick={() => handleToggle(option.value)}
                  >
                    <Checkbox
                      checked={pending.includes(option.value)}
                      onCheckedChange={() => handleToggle(option.value)}
                      className="pointer-events-none"
                      wrapperClassName="w-full"
                      labelClassName="font-normal flex w-full"
                      label={
                        <>
                          {option.label}
                          {pending.includes(option.value) && (
                            <Check className="size-4 ml-auto text-primary" />
                          )}
                        </>
                      }
                    />
                  </button>
                ))
              )}
            </div>
            <div className="flex gap-2 border-t border-border/70 p-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={handleClear}>
                {filterClearText}
              </Button>
              <Button size="sm" className="flex-1" onClick={handleApply}>
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
}

export function DataTable<TData>({
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
}: DataTableProps<TData>) {
  const selectionColumn: ColumnDef<TData> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const table = useReactTable({
    data,
    columns: [selectionColumn, ...columns],
    state: {
      sorting,
      columnFilters,
      pagination,
      columnPinning: {
        right: ['actions'],
      },
      ...(rowSelection !== undefined && { rowSelection }),
    },
    onSortingChange,
    onColumnFiltersChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...(rowSelection !== undefined && { enableRowSelection: true }),
    ...(onRowSelectionChange && { onRowSelectionChange }),
  });

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <Table containerClassName={cn('flex-1 min-h-0', containerClassName)}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={header.column.columnDef.meta?.className}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end gap-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
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
                text=""
                size="sm"
                onClick={() => table.nextPage()}
                className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <NativeSelect
          size="sm"
          className="w-fit shrink-0"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {DEFAULT_PAGE_SIZE_OPTIONS.map((size) => (
            <NativeSelectOption key={size} value={size}>
              {size} / trang
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
    </div>
  );
}
