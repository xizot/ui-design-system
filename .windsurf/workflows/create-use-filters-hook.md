---
description: Create use-filters.ts hook for feature-based URL state filtering
---

# Create useFilters Hook

This workflow creates a `useFilters.ts` hook for a feature that uses URL-synced filters with `nuqs` and `useUrlFilters`.

## Prerequisites

- Feature folder already exists at `features/{feature-name}/`
- Enums/types for filter values already defined (if using custom types)

## Steps

1. **Create the hooks folder** (if not exists):

   ```
   features/{feature-name}/hooks/
   ```

2. **Create `use-filters.ts` file** with this structure:

   ```typescript
   import { useUrlFilters } from '@/design-system/hooks/use-url-filter';
   import { parseAsArrayOf, parseAsInteger, parseAsString, parseAsBoolean } from 'nuqs';
   // Import any custom enums/types if needed

   // Sort order enum for createSortingHandlers
   export const SORT_ORDER_ENUM = {
     status_asc: 1,
     status_desc: 2,
     method_asc: 3,
     method_desc: 4,
     amount_asc: 5,
     amount_desc: 6,
     date_asc: 7,
     date_desc: 8,
   } as const;

   // Filter parsers
   export const FILTER_PARSERS = {
     sortOrder: parseAsInteger,
     status: parseAsArrayOf(parseAsInteger),
     method: parseAsArrayOf(parseAsString),
     search: parseAsString.withDefault(''),
   };

   export const useFilters = () => {
     const urlFilters = useUrlFilters(FILTER_PARSERS);

     // Create sorting handlers from SORT_ORDER_ENUM
     const { sortingState, handleSortingChange } =
       urlFilters.createSortingHandlers(SORT_ORDER_ENUM);

     return {
       ...urlFilters,
       sortingState,
       handleSortingChange,
     };
   };

   export type FeatureFilters = ReturnType<typeof useFilters>['filters'];
   export type FeaturePaginationState = ReturnType<typeof useFilters>['paginationState'];
   ```

3. **Available parsers from nuqs**:
   - `parseAsString` - for text search
   - `parseAsInteger` - for numeric IDs
   - `parseAsBoolean` - for true/false flags
   - `parseAsArrayOf(parser)` - for multi-select filters
   - `parseAsTimestamp` - for date values
   - Custom parsers with `.withDefault(value)` for defaults

4. **Usage in component**:

   ```typescript
   import { useFilters } from './hooks/use-filters';

   function FeatureComponent() {
     const { filters, paginationState, setFilter, onPaginationChange } = useFilters();

     // filters.status - current filter value
     // setFilter('status', [1, 2]) - update filter
     // paginationState.page - current page
     // onPaginationChange({ page, pageSize }) - change pagination
   }
   ```

## Rules

- Always export the filters type: `export type FeatureFilters = ReturnType<typeof useFilters>['filters'];`
- Use `parseAsArrayOf` for multi-select filters
- Use `.withDefault()` for default values
- Import custom enums from `../types/enums` or `../types` if using typed filters
- Hook must be placed in `features/{feature-name}/hooks/use-filters.ts`
