---
description: Create data-table with filters, sorting, and pagination for a feature
---

# Create Data Table

This workflow creates a complete data-table implementation with URL-synced filters, sorting, and pagination.

## File Structure

```
features/feature-name/data-table/
├── columns.tsx          # Column definitions
├── column-titles.ts     # Header title constants
├── use-filters.ts       # URL filter hook
├── feature-data-table.tsx   # Main data table component
└── index.ts             # Public exports
```

## Steps

1. **Create folder** `features/{feature-name}/data-table/`

2. **Create `column-titles.ts`** - Vietnamese header titles (UPPER_CASE keys):

   ```typescript
   export const COLUMN_TITLES = {
     TRANG_THAI: 'Trạng thái',
     PHUONG_THUC: 'Phương thức',
     SO_TIEN: 'Số tiền',
     NGAY: 'Ngày',
     DANH_MUC: 'Danh mục',
     // Add more columns...
   } as const;
   ```

3. **Create `columns.tsx`** - Column definitions:

   ```typescript
   import type { ColumnDef } from '@tanstack/react-table';
   import { DataColumnHeader } from '@/design-system/components/ui/data-table';
   import { COLUMN_TITLES } from './column-titles';
   import type { YourItemType } from '../types';
   // Import external options/enums (from constants or types)
   import { STATUS_OPTIONS } from '@/constants/options';  // or from '../types/enums'
   import { STATUS_ORDER } from '@/constants/sort-order';

   // Filter options - imported from external sources
   // Example: STATUS_OPTIONS = [{ value: 'pending', label: 'Chờ xử lý' }, ...]
   const STATUS_FILTER_OPTIONS = STATUS_OPTIONS;

   // Sorting order - imported from external sources
   // Example: STATUS_ORDER = { pending: 1, completed: 2, cancelled: 3 }

   export const columns: ColumnDef<YourItemType>[] = [
     {
       accessorKey: 'id',
       header: 'ID',
     },
     {
       accessorKey: 'status',
       meta: { className: 'min-w-[140px]' },
       header: ({ column }) => (
         <DataColumnHeader
           column={column}
           label={COLUMN_TITLES.TRANG_THAI}
           filterOptions={STATUS_FILTER_OPTIONS}
         />
       ),
       cell: ({ row }) => row.original.status,
       // Custom sorting by priority order
       sortingFn: (rowA, rowB, columnId) => {
         const a = STATUS_ORDER[rowA.getValue(columnId) as keyof typeof STATUS_ORDER] ?? 0;
         const b = STATUS_ORDER[rowB.getValue(columnId) as keyof typeof STATUS_ORDER] ?? 0;
         return a - b;
       },
       // Multi-select filter
       filterFn: (row, columnId, filterValues: string[]) => {
         return filterValues.includes(row.getValue(columnId));
       },
       enableSorting: true,
       enableHiding: true,
     },
     {
       accessorKey: 'method',
       header: ({ column }) => (
         <DataColumnHeader column={column} label={COLUMN_TITLES.PHUONG_THUC} />
       ),
       cell: ({ row }) => row.original.method,
     },
     {
       accessorKey: 'amount',
       header: ({ column }) => (
         <DataColumnHeader column={column} label={COLUMN_TITLES.SO_TIEN} align="right" />
       ),
       cell: ({ row }) => (
         <div className="text-right font-medium">
           {(row.getValue('amount') as number).toLocaleString('vi-VN')}đ
         </div>
       ),
     },
     {
       accessorKey: 'date',
       header: COLUMN_TITLES.NGAY,
     },
     {
       accessorKey: 'category',
       header: COLUMN_TITLES.DANH_MUC,
     },
   ];
   ```

4. **Create `use-filters.ts`** - URL filter hook:

   > 📚 **See detailed guide**: [`/create-use-filters-hook`](/.windsurf/workflows/create-use-filters-hook.md)

   Quick setup:

   ```typescript
   import { useUrlFilters } from '@/design-system/hooks/use-url-filter';
   import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs';

   export const SORT_ORDER_ENUM = {
     status_asc: 1,
     status_desc: 2,
     method_asc: 3,
     method_desc: 4,
   } as const;

   export const FILTER_PARSERS = {
     sortOrder: parseAsInteger,
     status: parseAsArrayOf(parseAsString),
   };

   export const useFilters = () => {
     const urlFilters = useUrlFilters(FILTER_PARSERS);
     const { sortingState, handleSortingChange } =
       urlFilters.createSortingHandlers(SORT_ORDER_ENUM);

     return {
       ...urlFilters,
       sortingState,
       handleSortingChange,
     };
   };
   ```

5. **Create `feature-data-table.tsx`** - Main component:

   ```typescript
   'use client';

   import { useMemo, useCallback } from 'react';
   import type { ColumnFiltersState } from '@tanstack/react-table';
   import { DataTable } from '@/design-system/components/ui/data-table';
   import { useFilters, SORT_ORDER_ENUM } from './use-filters';
   import { columns } from './columns';
   import type { YourItemType } from '../types';

   interface FeatureDataTableProps {
     data: YourItemType[];
   }

   export function FeatureDataTable({ data }: FeatureDataTableProps) {
     const {
       filters: urlFilters,
       paginationState,
       setFilter,
       onPaginationChange,
       createSortingHandlers,
     } = useFilters();

     const { sortingState, handleSortingChange } = createSortingHandlers(SORT_ORDER_ENUM);

     // Convert URL filters to column filters
     const columnFilters = useMemo(() => {
       const filters: ColumnFiltersState = [];
       if (urlFilters.status?.length) {
         filters.push({ id: 'status', value: urlFilters.status });
       }
       if (urlFilters.method?.length) {
         filters.push({ id: 'method', value: urlFilters.method });
       }
       if (urlFilters.category?.length) {
         filters.push({ id: 'category', value: urlFilters.category });
       }
       return filters;
     }, [urlFilters]);

     // Sync column filter changes back to URL
     const handleColumnFiltersChange = useCallback(
       (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
         const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
         const getValue = (id: string) =>
           (newFilters.find((f) => f.id === id)?.value as string[]) ?? null;

         setFilter({
           status: getValue('status'),
           method: getValue('method'),
           category: getValue('category'),
         });
       },
       [columnFilters, setFilter]
     );

     return (
       <DataTable
         data={data}
         columns={columns}
         sorting={sortingState}
         columnFilters={columnFilters}
         pagination={paginationState}
         onSortingChange={handleSortingChange}
         onColumnFiltersChange={handleColumnFiltersChange}
         onPaginationChange={onPaginationChange}
       />
     );
   }
   ```

6. **Create `index.ts`**:
   ```typescript
   export { columns } from './columns';
   export { COLUMN_TITLES } from './column-titles';
   export { useFilters, SORT_ORDER_ENUM, FILTER_PARSERS } from './use-filters';
   export { FeatureDataTable } from './feature-data-table';
   ```

## Usage in Feature

```typescript
import { FeatureDataTable, useFilters } from './data-table';

export function FeatureName() {
   const { filters, paginationState } = useFilters();

   // Fetch data with filters
   const { data } = useQuery({
     queryKey: ['items', filters, paginationState],
     queryFn: () => fetchItems(filters, paginationState),
   });

   return (
     <div>
       <FeatureDataTable data={data?.items ?? []} />
     </div>
   );
}
```

## Customization Guide

1. **Update SORT_ORDER_ENUM**: Add/remove sortable columns
2. **Update FILTER_PARSERS**: Add/remove filter fields
3. **Update columnFilters mapping**: Sync URL filter names with column IDs
4. **Update COLUMN_TITLES**: Add Vietnamese titles for new columns

## Rules

- **COLUMN_TITLES** keys must be **UPPER_CASE** (e.g., `TRANG_THAI`, `PHUONG_THUC`)
- **Always use Vietnamese** for COLUMN_TITLES values
- **columns.tsx**: Use `ColumnDef<YourItemType>[]` pattern, NOT `createColumnHelper`
- **DataColumnHeader**: Use for columns that need sorting/filtering UI with `label` prop from COLUMN_TITLES
- Column `accessorKey` must match filter keys in columnFilters mapping
- Use `parseAsArrayOf` for multi-select filters
- Use `parseAsInteger` for single value filters
- Infer types from useFilters when possible
