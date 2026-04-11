---
description: Create form with Zod schema and RHF components for a feature
---

# Create Form

This workflow creates a form implementation with Zod validation and React Hook Form.

## File Structure

```
features/feature-name/
├── schemas/
│   └── [form-name].ts      # Zod schema + types
├── forms/
│   └── [form-name]-form.tsx   # Form component
└── index.ts                # Public exports
```

## Steps

1. **Create schema file** at `features/{feature-name}/schemas/{form-name}.ts`:

   ```typescript
   import { z } from 'zod';
   import { zString, zNumber } from '@/design-system/lib/validate';

   export const driverCreateSchema = z.object({
     // Use zString for string fields (covers required, min, max, optional, nullable)
     fullName: zString({ min: 1 }),
     phone: zString({ min: 10, max: 15 }),
     email: zString({ optional: true }),

     // Use zNumber for number fields (covers int, positive, min, max)
     departmentId: zNumber({ min: 1, int: true }),
     age: zNumber({ optional: true, min: 18, max: 100 }),
     salary: zNumber({ positive: true }),

     // Standard zod for enums
     status: z.enum(['active', 'inactive']).default('active'),

     // Add more fields...
   });

   export type DriverCreateFormValues = z.infer<typeof driverCreateSchema>;
   ```

2. **Create form component** at `features/{feature-name}/forms/{form-name}-form.tsx`:

   ```typescript
   'use client';

   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   import { RHFInput, RHFSelect, RHFSingleCombobox } from '@/design-system/components/rhf';
   import { Button } from '@/design-system/components/ui/button';
   import { driverCreateSchema, type DriverCreateFormValues } from '../schemas/driver-create';

   interface DriverCreateFormProps {
     onSubmit: (data: DriverCreateFormValues) => void;
     defaultValues?: Partial<DriverCreateFormValues>;
     isSubmitting?: boolean;
   }

   export function DriverCreateForm({
     onSubmit,
     defaultValues,
     isSubmitting
   }: DriverCreateFormProps) {
     const form = useForm<DriverCreateFormValues>({
       resolver: zodResolver(driverCreateSchema),
       defaultValues: {
         fullName: '',
         phone: '',
         email: '',
         departmentId: undefined,
         status: 'active',
         ...defaultValues,
       },
     });

     return (
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
         <RHFInput
           control={form.control}
           name="fullName"
           label="Họ tên"
           placeholder="Nhập họ tên"
         />

         <RHFInput
           control={form.control}
           name="phone"
           label="Số điện thoại"
           placeholder="Nhập số điện thoại"
         />

         <RHFInput
           control={form.control}
           name="email"
           label="Email"
           placeholder="Nhập email (không bắt buộc)"
         />

         {/* Using RHFSingleCombobox for department selection */}
         <RHFSingleCombobox
           control={form.control}
           name="departmentId"
           label="Phòng ban"
           options={departments}
           placeholder="Chọn phòng ban"
         />

         <div className="flex justify-end gap-2 pt-4">
           <Button type="submit" disabled={isSubmitting}>
             {isSubmitting ? 'Đang lưu...' : 'Lưu'}
           </Button>
         </div>
       </form>
     );
   }
   ```

3. **Update exports** in `features/{feature-name}/forms/index.ts`:

   ```typescript
   export { DriverCreateForm } from './driver-create-form';
   export { DriverEditForm } from './driver-edit-form';
   ```

   And in `features/{feature-name}/schemas/index.ts`:

   ```typescript
   export { driverCreateSchema, type DriverCreateFormValues } from './driver-create';
   export { driverEditSchema, type DriverEditFormValues } from './driver-edit';
   ```

4. **Usage in feature component**:

   ```typescript
   import { DriverCreateForm } from './forms';
   import { ToastUtils } from '@/utils/toast-utils';

   export function DriverFeature() {
     const handleCreate = async (data: DriverCreateFormValues) => {
       try {
         await driverService.create(data);
         ToastUtils.success({ title: 'Tạo tài xế thành công' });
       } catch {
         ToastUtils.error({ title: 'Không thể tạo tài xế' });
       }
     };

     return (
       <DriverCreateForm onSubmit={handleCreate} />
     );
   }
   ```

## Available RHF Components

From `@/design-system/components/rhf/`:

| Component             | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `RHFInput`            | Text input                                           |
| `RHFSingleCombobox`   | Dropdown select , Single-select combobox with search |
| `RHFMultipleCombobox` | Multi-select combobox with search                    |
| `RHFDatePicker`       | Single date picker                                   |
| `RHFDateRangePicker`  | Date range picker                                    |
| `RHFCheckbox`         | Checkbox                                             |
| `RHFRadioGroup`       | Radio buttons                                        |
| `RHFTextarea`         | Multi-line text                                      |

## When to Create Custom RHF Component

Only create new RHF wrapper if:

1. Component UI không tồn tại trong `design-system/components/ui/`
2. Component cần logic validation đặc biệt không có sẵn
3. Đã confirm với team lead

**Pattern for custom RHF component**:

```typescript
import { useController, type FieldValues, type Path } from 'react-hook-form';

interface RHFCustomProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function RHFCustom<T extends FieldValues>({
  control,
  name,
  label
}: RHFCustomProps<T>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <div>
      {label && <label>{label}</label>}
      <CustomComponent
        value={field.value}
        onChange={field.onChange}
        error={fieldState.error?.message}
      />
    </div>
  );
}
```

## Rules

- **Schema naming**: `{feature}{Action}Schema` (e.g., `driverCreateSchema`, `orderEditSchema`)
- **Use** `zString` from `@/design-system/lib/validate` for string fields (covers required, min, max, optional, nullable)
- **Use** `zNumber` from `@/design-system/lib/validate` for number fields (covers int, positive, min, max)
- **Type naming**: `{Feature}{Action}FormValues` (e.g., `DriverCreateFormValues`)
- **Always use** `zodResolver` from `@hookform/resolvers/zod`
- **Always infer** form value type from Zod schema: `z.infer<typeof schema>`
- **Do NOT** duplicate manual types
- **Use** RHF components from `design-system/components/rhf/` first
- **Combobox** → dùng `RHFSingleCombobox` / `RHFMultipleCombobox` từ `design-system/components/rhf/`
- **Toast** → dùng `ToastUtils` từ `@/utils/toast-utils`

## Form Validation Patterns

```typescript
import { zString, zNumber } from '@/design-system/lib/validate';

// Required string field (auto has "Thông tin bắt buộc" message)
zString(); // equivalent to z.string().min(1, 'Thông tin bắt buộc')

// String with min/max
zString({ min: 2, max: 50 });

// Optional string
zString({ optional: true });

// Nullable string
zString({ nullable: true });

// Optional nullable
zString({ optional: true, nullable: true });

// Required number (integer)
zNumber({ int: true });

// Number with min/max
zNumber({ min: 1, max: 100 });

// Positive number
zNumber({ positive: true });

// Optional number
zNumber({ optional: true });

// Enum (use standard zod)
z.enum(['active', 'inactive']);

// Date (use standard zod)
z.date().refine((val) => val <= new Date(), 'Ngày không được ở tương lai');

// Array (use standard zod)
z.array(z.string()).min(1, 'Chọn ít nhất 1 mục');

// Conditional validation (use standard zod)
z.object({
  hasLicense: z.boolean(),
  licenseNumber: zString({ optional: true }),
}).refine((data) => !data.hasLicense || data.licenseNumber?.length > 0, {
  message: 'Vui lòng nhập số GPLX',
  path: ['licenseNumber'],
});
```

## Available Validate Utils

From `@/design-system/lib/validate`:

| Util                 | Purpose              | Options                                                                                                        |
| -------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `zString()`          | String validation    | `min`, `max`, `optional`, `nullable`, `requiredMessage`, `tooBigMessage`, `tooSmallMessage`                    |
| `zNumber()`          | Number validation    | `min`, `max`, `int`, `positive`, `optional`, `nullable`, `requiredMessage`, `tooBigMessage`, `tooSmallMessage` |
| `zStringArrayFilter` | Array filter parsing | For URL filter arrays                                                                                          |
| `FORM_MESSAGES`      | Standard messages    | `REQUIRED`, `POSITIVE`, `MIN_VALUE()`, `MAX_VALUE()`                                                           |
