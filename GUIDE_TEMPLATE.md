# Component Usage Guide Template

Dùng template này khi tạo một page mới trong:

```text
app/components/<component-name>/page.tsx
```

Ví dụ:

```text
app/components/button/page.tsx
app/components/input/page.tsx
app/components/select/page.tsx
```

## Page layout

Mỗi page nằm trong layout chung của `app/components`:

- Header ở trên cùng
- Sidebar bên trái
- Usage guide ở giữa
- TOC bên phải

## Cấu trúc nội dung

Mỗi page nên có các block chính:

### 1. Tên component

- Hiển thị tên component rõ ràng
- Có thể thêm mô tả ngắn 1-2 câu

Ví dụ:

```tsx
<p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
  ui
</p>
<h1 className="mt-4 text-4xl font-semibold tracking-tight">Button</h1>
<p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
  Button dùng để trigger action chính hoặc phụ trong giao diện.
</p>
```

### 2. Import

Hiển thị đoạn import ngắn gọn:

```tsx
import { Button } from '@/design-system/components/ui/button';
```

### 3. Props

Render dưới dạng bảng:

- Prop name
- Type
- Default nếu có

Ví dụ:

| Prop        | Type                     | Default     |
| ----------- | ------------------------ | ----------- |
| `variant`   | `"default" \| "outline"` | `"default"` |
| `size`      | `"default" \| "sm"`      | `"default"` |
| `className` | `string`                 | `--`        |

### 4. Usages

Không tách preview và code thành 2 section rời.
Thay vào đó:

- `Usages` là một section duy nhất
- mỗi kiểu sử dụng là một tab
- trong mỗi tab sẽ có:
  - `Preview`
  - `Code`

Ví dụ:

- `Default`
- `Sizes`
- `With icon`
- `Destructive`
- `States`

Lưu ý:

- Không chỉ để một code sample mặc định nếu component có nhiều mode quan trọng
- Nếu component có nhiều `variant`, mỗi variant hoặc nhóm variant nên có tab riêng
- Nếu component có nhiều `size`, nên có một tab riêng cho size
- Nếu component có state đặc biệt như `disabled`, `invalid`, `loading`, nên có tab riêng cho state

## Skeleton page gợi ý

```tsx
export default function ComponentGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section>
          <h1>Component Name</h1>
        </section>

        <section id="import">
          <h2>1. Import</h2>
        </section>

        <section id="props">
          <h2>2. Props</h2>
        </section>

        <section id="usages">
          <h2>3. Usages</h2>
        </section>
      </main>

      <aside>
        <nav>
          <a href="#import">Import</a>
          <a href="#props">Props</a>
          <a href="#usages">Usages</a>
        </nav>
      </aside>
    </div>
  );
}
```

## UI guideline

- Mỗi section nên bọc bằng `Card`
- Header section dùng:
  - `CardHeader`
  - `CardTitle`
  - `CardDescription`
- Nội dung section dùng `CardContent`
- `Usages` nên dùng `Tabs`
- Mỗi tab có:
  - một vùng preview
  - một block code

## Quy ước

- Một component = một page riêng
- Không dùng route động cho docs
- Chỉ tạo page thật, ví dụ `app/components/button/page.tsx`
- Có thể dùng lại layout chung ở `app/components/layout.tsx`
