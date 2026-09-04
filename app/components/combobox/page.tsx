'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { SingleCombobox } from '@/components/ui/single-combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import {
  MultipleComboboxAutoResizeDemo,
  MultipleComboboxBasicDemo,
  MultipleComboboxLimitTagsDemo,
  MultipleComboboxSelectedCodeOnlyDemo,
  MultipleComboboxWithCodeDemo,
} from './multiple-combobox-demo';
import {
  SingleComboboxSelectedCodeOnlyDemo,
  SingleComboboxWithCodeDemo,
} from './single-combobox-demo';

const guide = {
  name: 'Combobox',
  group: 'ui',
  importPath: '@/design-system/components/ui/combobox',
} as const;

const props = [
  { name: 'items', type: 'string[]', defaultValue: '--' },
  { name: 'value', type: 'string', defaultValue: '--' },
  { name: 'defaultValue', type: 'string', defaultValue: '--' },
  { name: 'onValueChange', type: '(value: string) => void', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: '--' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

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
        <SingleCombobox
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

export default function ComboboxGuidePage() {
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
            A searchable dropdown component with keyboard navigation support.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Combobox component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Combobox component props.</CardDescription>
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
                    {props.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(index !== props.length - 1 && 'border-border/70 border-b')}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="text-muted-foreground px-4 py-3">{prop.type}</td>
                        <td className="text-muted-foreground px-4 py-3">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="sizes" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. Sizes</CardTitle>
              <CardDescription>Available sizes for the Combobox components.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium">SingleCombobox Sizes</h4>
                  <div className="grid max-w-sm gap-4">
                    <SingleCombobox
                      label="Extra Small"
                      size="xxs"
                      options={departments}
                      placeholder="Chosen department..."
                    />
                    <SingleCombobox
                      label="Small"
                      size="sm"
                      options={departments}
                      placeholder="Chosen department..."
                    />
                    <SingleCombobox
                      label="Medium"
                      size="md"
                      options={departments}
                      placeholder="Chosen department..."
                    />
                    <SingleCombobox
                      label="Large"
                      size="lg"
                      options={departments}
                      placeholder="Chosen department..."
                    />
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-medium">MultipleCombobox Sizes</h4>
                  <div className="grid max-w-sm gap-4">
                    <MultipleComboboxBasicDemo size="xxs" label="Extra Small" />
                    <MultipleComboboxBasicDemo size="sm" label="Small" />
                    <MultipleComboboxBasicDemo size="md" label="Medium" />
                    <MultipleComboboxBasicDemo size="lg" label="Large" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <section
          id="single-combobox"
          className="border-border/70 bg-card mt-12 rounded-[28px] border px-8 py-10 shadow-sm"
        >
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            composed
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">SingleCombobox</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Combobox chọn một giá trị duy nhất. Hỗ trợ tìm kiếm theo cả mã và tên, hiển thị label và
            error tích hợp sẵn.
          </p>
        </section>

        <div className="mt-8 space-y-6">
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

        <section
          id="multiple-combobox"
          className="border-border/70 bg-card mt-12 rounded-[28px] border px-8 py-10 shadow-sm"
        >
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            composed
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">MultipleCombobox</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Combobox chọn nhiều giá trị, hiển thị các lựa chọn dưới dạng chip. Hỗ trợ tìm kiếm theo
            cả mã và tên, xoá từng chip hoặc xoá toàn bộ.
          </p>
        </section>

        <div className="mt-8 space-y-6">
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
                      <div className="bg-card flex min-h-56 items-center justify-center rounded-[18px] px-6 shadow-sm">
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
        <div className="border-border/70 bg-card sticky top-24 rounded-[24px] border p-5">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.24em] uppercase">
            TOC
          </p>
          <nav className="text-muted-foreground mt-4 space-y-3 text-sm">
            <p className="text-foreground/70 font-semibold">Combobox</p>
            <a href="#import" className="hover:text-foreground block pl-3 transition">
              Import
            </a>
            <a href="#props" className="hover:text-foreground block pl-3 transition">
              Props
            </a>
            <a href="#sizes" className="hover:text-foreground block pl-3 transition">
              Sizes
            </a>
            <a href="#usages" className="hover:text-foreground block pl-3 transition">
              Usages
            </a>

            <p className="text-foreground/70 pt-2 font-semibold">SingleCombobox</p>
            <a href="#single-import" className="hover:text-foreground block pl-3 transition">
              Import
            </a>
            <a href="#single-type" className="hover:text-foreground block pl-3 transition">
              ComboboxBaseOption
            </a>
            <a href="#single-props" className="hover:text-foreground block pl-3 transition">
              Props
            </a>
            <a href="#single-usages" className="hover:text-foreground block pl-3 transition">
              Usages
            </a>

            <p className="text-foreground/70 pt-2 font-semibold">MultipleCombobox</p>
            <a href="#multiple-import" className="hover:text-foreground block pl-3 transition">
              Import
            </a>
            <a href="#multiple-props" className="hover:text-foreground block pl-3 transition">
              Props
            </a>
            <a href="#multiple-usages" className="hover:text-foreground block pl-3 transition">
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
