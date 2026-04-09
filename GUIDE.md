# UI Design System Guide

## Mục tiêu

Repo này là source cho một CLI cài design system sang project khác bằng:

```bash
npx github:xizot/ui-design-system
```

## Cấu trúc cài đặt mặc định

CLI tạo folder `design-system` trong project đích, rồi copy source vào:

```text
design-system/
  components/
  constants/
  hooks/
  lib/
```

## Hành vi khi cài

CLI có 2 prompt riêng:

1. Component prompt
2. Dependencies prompt

### Component prompt

Nếu có file trùng trong `design-system`, CLI hỏi:

- `1` - overwrite all
- `2` - skip all
- `3` - review one by one

Nếu chọn `3`, mỗi file trùng sẽ hỏi tiếp:

- `1` - overwrite file đó
- `2` - skip file đó

### Dependencies prompt

Sau khi copy xong, CLI kiểm tra `package.json` ở project đích và chỉ liệt kê dependency còn thiếu.

Nếu đồng ý, CLI tự cài bằng package manager phù hợp:

- `pnpm`
- `yarn`
- `bun`
- `npm`

## Folder được copy

CLI copy toàn bộ nội dung của các folder sau:

- `components`
- `constants`
- `hooks`
- `lib`

Nếu sau này thêm folder mới muốn copy, cập nhật mảng `directoriesToCopy` trong [`bin/install.cjs`](./bin/install.cjs).

## Dependency runtime hiện tại

CLI tự nhận diện và cài các package này khi project đích còn thiếu:

- `@base-ui/react`
- `@tanstack/react-table`
- `class-variance-authority`
- `clsx`
- `cmdk`
- `date-fns`
- `embla-carousel-react`
- `input-otp`
- `lucide-react`
- `next-themes`
- `nuqs`
- `react`
- `react-day-picker`
- `react-dom`
- `react-hook-form`
- `react-resizable-panels`
- `recharts`
- `sonner`
- `tailwind-merge`
- `vaul`
- `zod`

Nếu thêm dependency mới vào source, phải cập nhật cả:

1. `package.json`
2. `bin/install.cjs` trong `runtimeDependencies`

## Constants hiện tại

Folder `constants/` đang có file `common.ts` với các export:

- `DEFAULT_PAGE_INDEX`
- `DEFAULT_PAGE_SIZE`
- `DEFAULT_PAGE_SIZE_OPTIONS`
- `EMPTY_STRING`
- `DEFAULT_SORT_ORDER`
- `ALL_OPTION`

## Quy ước import

Source hiện tại dùng relative import, không dùng alias `@/...`, để an toàn khi copy sang project khác.

## Quy trình thêm mới

### Thêm component mới

1. Tạo file trong `components/`
2. Commit
3. Push lên `xizot/ui-design-system`
4. Chạy lại CLI ở project đích

### Thêm dependency mới

1. Cài dependency vào repo này
2. Nếu component mới cần dependency đó, thêm vào `runtimeDependencies`
3. Push lên GitHub

## Lưu ý

- Project đích đã có file trùng thì CLI sẽ hỏi trước khi ghi đè.
- Project đích chưa có `package.json` thì CLI sẽ bỏ qua bước cài dependencies.
- Summary cuối CLI cho biết số file copy, overwrite, skip.
