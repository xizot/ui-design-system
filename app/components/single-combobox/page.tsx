'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { getGuide } from '../guide-data';
import { SingleCombobox } from '@/components/ui/single-combobox';
import {
  SingleComboboxSelectedCodeOnlyDemo,
  SingleComboboxWithCodeDemo,
} from './single-combobox-demo';

const guide = getGuide('single-combobox');

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
  { id: 4, code: 'MKT', name: 'Marketing' },
  { id: 5, code: 'OPS', name: 'Vận hành' },
];

const singleComboboxProps = [
  { name: 'options', type: 'ComboboxBaseOption[]', defaultValue: '--' },
  { name: 'value', type: 'string | number', defaultValue: '--' },
  { name: 'onChange', type: '(value, option) => void', defaultValue: '--' },
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
  { name: 'size', type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, defaultValue: `'md'` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const singleUsageSamples = [
  {
    id: 'with-code',
    label: 'Hiện mã',
    preview: <SingleComboboxWithCodeDemo />,
    code: `<SingleCombobox
  label="Phòng ban"
  options={departments}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode    {/* hiện "IT - Công nghệ thông tin" trong dropdown */}
  showSelectedCode {/* hiện "IT - Công nghệ thông tin" sau khi chọn */}
/>`,
  },
  {
    id: 'selected-code-only',
    label: 'Chỉ hiện mã',
    preview: <SingleComboboxSelectedCodeOnlyDemo />,
    code: `<SingleCombobox
  label="Phòng ban"
  options={departments}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Chọn phòng ban..."
  showMenuCode       {/* dropdown vẫn hiện "IT - Công nghệ thông tin" */}
  selectedCodeOnly   {/* selected chỉ hiện "IT" */}
/>`,
  },
  {
    id: 'error',
    label: 'Error',
    preview: (
      <div className="w-full max-w-sm p-4">
        <SingleCombobox
          label="Phòng ban"
          required
          options={departments}
          placeholder="Chọn phòng ban..."
          error="Vui lòng chọn phòng ban"
        />
      </div>
    ),
    code: `<SingleCombobox
  label="Phòng ban"
  required
  options={departments}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="Chọn phòng ban..."
  error="Vui lòng chọn phòng ban"
/>`,
  },
];

export default function SingleComboboxGuidePage() {
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
            Chọn một giá trị, tìm theo mã hoặc tên và hiển thị label, lỗi theo size của form.
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
                <SingleCombobox
                  label="XXS"
                  size="xxs"
                  options={departments}
                  placeholder="Chọn phòng ban..."
                />
                <SingleCombobox
                  label="XS"
                  size="xs"
                  options={departments}
                  placeholder="Chọn phòng ban..."
                />
                <SingleCombobox
                  label="SM"
                  size="sm"
                  options={departments}
                  placeholder="Chọn phòng ban..."
                />
                <SingleCombobox
                  label="MD"
                  size="md"
                  options={departments}
                  placeholder="Chọn phòng ban..."
                />
                <SingleCombobox
                  label="LG"
                  size="lg"
                  options={departments}
                  placeholder="Chọn phòng ban..."
                />
                <SingleCombobox
                  label="XL"
                  size="xl"
                  options={departments}
                  placeholder="Chọn phòng ban..."
                />
                <SingleCombobox
                  label="XXL"
                  size="xxl"
                  options={departments}
                  placeholder="Chọn phòng ban..."
                />
              </div>
            </CardContent>
          </Card>
          <Card id="single-import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Import</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { SingleCombobox } from "@/design-system/components/ui/single-combobox";
import type { ComboboxBaseOption } from "@/design-system/components/ui/single-combobox";`}
                id="single-import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="single-type" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>ComboboxBaseOption</CardTitle>
              <CardDescription>
                Kiểu dữ liệu option bắt buộc. Mọi danh sách truyền vào đều phải có đủ 3 trường này.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`type ComboboxBaseOption = {
  id: string | number;
  code: string;
  name: string;
};`}
                id="single-type"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="single-props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>
                Component là generic — TypeScript tự infer kiểu option từ mảng{' '}
                <code className="bg-muted rounded px-1 text-xs">options</code> được truyền vào.
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
                    {singleComboboxProps.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(
                          index !== singleComboboxProps.length - 1 && 'border-border/70 border-b',
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

          <Card id="single-usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Usages</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={singleUsageSamples[0]?.id} className="gap-6">
                <TabsList variant="line">
                  {singleUsageSamples.map((sample) => (
                    <TabsTrigger key={sample.id} value={sample.id}>
                      {sample.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {singleUsageSamples.map((sample) => (
                  <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                    <div className="border-border bg-muted/30 rounded-[20px] border border-dashed p-8">
                      <div className="bg-card flex min-h-56 items-center justify-center rounded-[18px] px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <CodeBlock code={sample.code} id={`single-${sample.id}`} />
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
          <a href="#single-import" className="hover:text-foreground block transition">
            Import
          </a>
          <a href="#single-type" className="hover:text-foreground block transition">
            ComboboxBaseOption
          </a>
          <a href="#single-props" className="hover:text-foreground block transition">
            Props
          </a>
          <a href="#single-usages" className="hover:text-foreground block transition">
            Usages
          </a>
        </nav>
      </aside>
    </div>
  );
}
