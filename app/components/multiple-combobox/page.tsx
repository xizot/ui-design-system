'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { getGuide } from '../guide-data';
import { MultipleCombobox } from '@/components/ui/multiple-combobox';
import {
  MultipleComboboxAutoResizeDemo,
  MultipleComboboxBasicDemo,
  MultipleComboboxLimitTagsDemo,
  MultipleComboboxSelectedCodeOnlyDemo,
  MultipleComboboxWithCodeDemo,
} from './multiple-combobox-demo';

const guide = getGuide('multiple-combobox');

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
  { id: 4, code: 'MKT', name: 'Marketing' },
  { id: 5, code: 'OPS', name: 'Vận hành' },
];

const multipleComboboxProps = [
  { name: 'options', type: 'ComboboxBaseOption[]', defaultValue: '--' },
  { name: 'value', type: '(string | number)[]', defaultValue: '--' },
  { name: 'onChange', type: '(values, options) => void', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: "'Chọn...'" },
  { name: 'label', type: 'string | ReactNode', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'error', type: 'string', defaultValue: '--' },
  { name: 'showMenuCode', type: 'boolean', defaultValue: 'true' },
  { name: 'showSelectedCode', type: 'boolean', defaultValue: 'false' },
  { name: 'selectedCodeOnly', type: 'boolean', defaultValue: 'false' },
  { name: 'searchPlaceholder', type: 'string', defaultValue: "'Tìm kiếm...'" },
  { name: 'emptyMessage', type: 'string', defaultValue: "'Không tìm thấy kết quả'" },
  { name: 'limitTags', type: 'number', defaultValue: '--' },
  { name: 'autoResize', type: 'boolean', defaultValue: 'false' },
  { name: 'size', type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, defaultValue: `'md'` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const multipleUsageSamples = [
  {
    id: 'with-code',
    label: 'Hiện mã',
    preview: <MultipleComboboxWithCodeDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode     {/* hiện "IT - Công nghệ thông tin" trong dropdown */}
  showSelectedCode {/* hiện "IT - Công nghệ thông tin" trong chip */}
/>`,
  },
  {
    id: 'selected-code-only',
    label: 'Chỉ hiện mã',
    preview: <MultipleComboboxSelectedCodeOnlyDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode       {/* dropdown vẫn hiện "IT - Công nghệ thông tin" */}
  selectedCodeOnly   {/* chip chỉ hiện "IT" */}
/>`,
  },
  {
    id: 'auto-resize',
    label: 'Auto resize',
    preview: <MultipleComboboxAutoResizeDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  autoResize  {/* trigger cao lên và chip tự wrap nhiều dòng */}
/>`,
  },
  {
    id: 'limit-tags',
    label: 'Giới hạn badge',
    preview: <MultipleComboboxLimitTagsDemo />,
    code: `<MultipleCombobox
  label="Phòng ban"
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  limitTags={2}  {/* chọn > 2 items sẽ hiện "+N" */}
/>`,
  },
  {
    id: 'error',
    label: 'Error',
    preview: (
      <div className="w-full max-w-sm p-4">
        <MultipleCombobox
          label="Phòng ban"
          required
          options={departments}
          placeholder="Chọn phòng ban..."
          error="Vui lòng chọn ít nhất một phòng ban"
        />
      </div>
    ),
    code: `<MultipleCombobox
  label="Phòng ban"
  required
  options={departments}
  value={values}
  onChange={(v) => setValues(v)}
  placeholder="Chọn phòng ban..."
  error="Vui lòng chọn ít nhất một phòng ban"
/>`,
  },
];

export default function MultipleComboboxGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Chọn nhiều giá trị bằng chip, tìm theo mã hoặc tên và tự mở rộng chiều cao khi cần.
          </p>
        </section>
        <div className="mt-8 space-y-6">
          <Card id="sizes" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Size của trigger và ô tìm kiếm trong dropdown.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid max-w-sm gap-4">
                <MultipleComboboxBasicDemo size="xxs" label="XXS" />
                <MultipleComboboxBasicDemo size="xs" label="XS" />
                <MultipleComboboxBasicDemo size="sm" label="SM" />
                <MultipleComboboxBasicDemo size="md" label="MD" />
                <MultipleComboboxBasicDemo size="lg" label="LG" />
                <MultipleComboboxBasicDemo size="xl" label="XL" />
                <MultipleComboboxBasicDemo size="xxl" label="XXL" />
              </div>
            </CardContent>
          </Card>
          <Card id="multiple-import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Import</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { MultipleCombobox } from "@/design-system/components/ui/multiple-combobox";`}
                id="multiple-import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="multiple-props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>
                Props giống <code className="bg-muted rounded px-1 text-xs">SingleCombobox</code>,
                khác ở kiểu của <code className="bg-muted rounded px-1 text-xs">value</code> và{' '}
                <code className="bg-muted rounded px-1 text-xs">onChange</code>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Prop</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {multipleComboboxProps.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(
                          index !== multipleComboboxProps.length - 1 && 'border-border/70 border-b',
                        )}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                          {prop.type}
                        </td>
                        <td className="text-muted-foreground px-4 py-3">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="multiple-usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Usages</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={multipleUsageSamples[0]?.id} className="gap-6">
                <TabsList variant="line">
                  {multipleUsageSamples.map((sample) => (
                    <TabsTrigger key={sample.id} value={sample.id}>
                      {sample.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {multipleUsageSamples.map((sample) => (
                  <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                    <div className="border-border bg-muted/30 rounded-[20px] border border-dashed p-8">
                      <div className="bg-background flex min-h-56 items-center justify-center rounded-[18px] px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <CodeBlock code={sample.code} id={`multiple-${sample.id}`} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <aside className="hidden xl:block">
        <nav className="border-border/70 bg-card sticky top-24 space-y-3 rounded-[24px] border p-5 text-sm">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.24em] uppercase">
            TOC
          </p>
          <a href="#sizes" className="hover:text-foreground block transition">
            Sizes
          </a>
          <a href="#multiple-import" className="hover:text-foreground block transition">
            Import
          </a>
          <a href="#multiple-props" className="hover:text-foreground block transition">
            Props
          </a>
          <a href="#multiple-usages" className="hover:text-foreground block transition">
            Usages
          </a>
        </nav>
      </aside>
    </div>
  );
}
