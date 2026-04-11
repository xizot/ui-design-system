---
description: Create a new feature with App Router page and feature folder structure
---

# Create Feature

This workflow creates a new feature with both an App Router page and a feature module following the project's architecture.

## Prerequisites

- Understand the feature requirements (name, purpose, data requirements)
- Know which service/endpoints will be used
- Determine if the feature needs: forms, data-table, filters, etc.

## Steps

1. **Create App Router page** at `app/{feature-name}/page.tsx`:
   ```typescript
   import { FeatureName } from '@/features/feature-name';
   
   export default function FeatureNamePage() {
     return <FeatureName />;
   }
   ```

2. **Create feature folder** at `features/{feature-name}/` with minimal required files:

   a. **Main container** `feature-name.tsx`:
      ```typescript
      'use client';
      
      import { useState } from 'react';
      // Import from design-system only
      
      export function FeatureName() {
        return (
          <div className="space-y-4">
            {/* Feature content */}
          </div>
        );
      }
      ```

   b. **Public entry** `index.ts`:
      ```typescript
      export { FeatureName } from './feature-name';
      ```

3. **Create optional folders only when needed**:

   - **`components/`** - Only if feature has reusable local components:
     ```
     features/feature-name/components/
       ComponentName.tsx
       index.ts  (export components)
     ```

   - **`hooks/`** - Only for feature-specific hooks:
     ```
     features/feature-name/hooks/
       use-filters.ts      (use useUrlFilters from design-system)
       use-feature-data.ts
       index.ts
     ```

   - **`data-table/`** - Only for table views:
     ```
     features/feature-name/data-table/
       columns.tsx         (define columns)
       data-table.tsx      (table implementation)
       index.ts
     ```

   - **`forms/`** - Only for forms:
     ```
     features/feature-name/forms/
       create-form.tsx     (RHF + zod + design-system rhf components)
       edit-form.tsx
       index.ts
     ```

   - **`schemas/`** - Only if feature has local Zod schemas:
     ```
     features/feature-name/schemas/
       index.ts
     ```

   - **`types/`** - Only if feature has local types:
     ```
     features/feature-name/types/
       index.ts
     ```

   - **`store/`** - Only if feature needs local state (zustand):
     ```
     features/feature-name/store/
       feature-store.ts
       index.ts
     ```

4. **Example minimal feature structure**:
   ```
   features/driver-list/
   ├── driver-list.tsx          # Main container
   ├── index.ts                 # Public entry
   ├── hooks/
   │   ├── use-filters.ts       # URL state filters
   │   └── index.ts
   └── data-table/
       ├── columns.tsx
       ├── driver-data-table.tsx
       └── index.ts
   ```

## Rules

- **App Router page**: Simple wrapper that imports from `features/`
- **Main container** (`feature-name.tsx`): Contains all feature logic, imports from `design-system/`
- **NO new UI components**: Reuse from `design-system/components/ui/`
- **Combobox**: Use `SingleCombobox` or `MultipleCombobox` from design-system
- **Forms**: Use RHF wrappers from `design-system/components/rhf/`
- **Filters**: Use `useUrlFilters` from `design-system/hooks/use-url-filter`
- **Data fetching**: Use services from `services/` folder
- **Types**: Infer from Zod schemas when possible, avoid duplicating types
- **Optional folders**: Only create when actually needed

## Import Patterns

```typescript
// UI components (from design-system)
import { Button, Card, Table } from '@/design-system/components/ui/button';
import { SingleCombobox } from '@/design-system/components/ui/single-combobox';

// Form components (from design-system)
import { RHFInput, RHFSelect } from '@/design-system/components/rhf/rhf-input';

// Hooks (from design-system or local)
import { useUrlFilters } from '@/design-system/hooks/use-url-filter';
import { useFilters } from './hooks/use-filters';  // local feature hook

// Services
import { driverService } from '@/services/driver-service';
```
