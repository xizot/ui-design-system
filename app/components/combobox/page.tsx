import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { SingleCombobox } from '@/components/ui/single-combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { SingleComboboxBasicDemo, SingleComboboxWithCodeDemo } from './single-combobox-demo';
import {
  MultipleComboboxBasicDemo,
  MultipleComboboxWithCodeDemo,
  MultipleComboboxLimitTagsDemo,
} from './multiple-combobox-demo';

const guide = {
  name: 'Combobox',
  group: 'ui',
  importPath: '@/design-system/components/ui/combobox',
} as const;

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

const props = [
  { name: 'items', type: 'string[]', defaultValue: '--' },
  { name: 'value', type: 'string', defaultValue: '--' },
  { name: 'defaultValue', type: 'string', defaultValue: '--' },
  { name: 'onValueChange', type: '(value: string) => void', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: '--' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

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
  { name: 'searchPlaceholder', type: 'string', defaultValue: "'Tìm kiếm...'" },
  { name: 'emptyMessage', type: 'string', defaultValue: "'Không tìm thấy kết quả'" },
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
  { name: 'searchPlaceholder', type: 'string', defaultValue: "'Tìm kiếm...'" },
  { name: 'emptyMessage', type: 'string', defaultValue: "'Không tìm thấy kết quả'" },
  { name: 'requireApply', type: 'boolean', defaultValue: 'true' },
  { name: 'cancelText', type: 'string', defaultValue: "'Hủy'" },
  { name: 'applyText', type: 'string', defaultValue: "'Áp dụng'" },
  { name: 'limitTags', type: 'number', defaultValue: '--' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const singleUsageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: <SingleComboboxBasicDemo />,
    code: `'use client';
import { useState } from 'react';
import { SingleCombobox } from '@/design-system/components/ui/single-combobox';

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
];

export function Example() {
  const [value, setValue] = useState<string | number | undefined>();

  return (
    <SingleCombobox
      label="Phòng ban"
      required
      options={departments}
      value={value}
      onChange={(v) => setValue(v)}
      placeholder="Chọn phòng ban..."
    />
  );
}`,
  },
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
    id: 'basic',
    label: 'Basic',
    preview: <MultipleComboboxBasicDemo />,
    code: `'use client';
import { useState } from 'react';
import { MultipleCombobox } from '@/design-system/components/ui/multiple-combobox';

const departments = [
  { id: 1, code: 'IT', name: 'Công nghệ thông tin' },
  { id: 2, code: 'HR', name: 'Nhân sự' },
  { id: 3, code: 'FIN', name: 'Tài chính' },
];

export function Example() {
  const [values, setValues] = useState<(string | number)[]>([]);

  return (
    <MultipleCombobox
      label="Phòng ban"
      required
      options={departments}
      value={values}
      onChange={(v) => setValues(v)}
      placeholder="Chọn phòng ban..."
    />
  );
}`,
  },
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

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium leading-5">Framework</label>
          <Combobox>
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {frameworks.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    ),
    code: `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/design-system/components/ui/combobox";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export function ExampleCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}`,
  },
];

export default function ComboboxGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A searchable dropdown component with keyboard navigation support.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Combobox component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Combobox component props.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/70">
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
                        className={cn(index !== props.length - 1 && 'border-b border-border/70')}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. Usages</CardTitle>
              <CardDescription>Common Combobox patterns and configurations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={usageSamples[0]?.id} className="gap-6">
                <TabsList variant="line">
                  {usageSamples.map((sample) => (
                    <TabsTrigger key={sample.id} value={sample.id}>
                      {sample.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {usageSamples.map((sample) => (
                  <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                    <div className="rounded-[20px] border border-dashed border-border bg-[linear-gradient(135deg,rgba(0,0,0,0.02),transparent)] p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[#111111] p-5 text-white">
                      <pre className="text-sm leading-6">
                        <code>{sample.code}</code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <section
          id="single-combobox"
          className="mt-12 rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            composed
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">SingleCombobox</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Combobox chọn một giá trị duy nhất. Hỗ trợ tìm kiếm theo cả mã và tên, hiển thị label và
            error tích hợp sẵn.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="single-import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>Import</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { SingleCombobox } from "@/design-system/components/ui/single-combobox";
import type { ComboboxBaseOption } from "@/design-system/components/ui/single-combobox";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="single-type" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>ComboboxBaseOption</CardTitle>
              <CardDescription>
                Kiểu dữ liệu option bắt buộc. Mọi danh sách truyền vào đều phải có đủ 3 trường này.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`type ComboboxBaseOption = {
  id: string | number;
  code: string;
  name: string;
};`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="single-props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>
                Component là generic — TypeScript tự infer kiểu option từ mảng{' '}
                <code className="rounded bg-muted px-1 text-xs">options</code> được truyền vào.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/70">
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
                          index !== singleComboboxProps.length - 1 && 'border-b border-border/70',
                        )}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                          {prop.type}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="single-usages" className="rounded-[24px] border-border/70">
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
                    <div className="rounded-[20px] border border-dashed border-border bg-[linear-gradient(135deg,rgba(0,0,0,0.02),transparent)] p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[#111111] p-5 text-white">
                      <pre className="text-sm leading-6">
                        <code>{sample.code}</code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <section
          id="multiple-combobox"
          className="mt-12 rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            composed
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">MultipleCombobox</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Combobox chọn nhiều giá trị, hiển thị các lựa chọn dưới dạng chip. Hỗ trợ tìm kiếm theo
            cả mã và tên, xoá từng chip hoặc xoá toàn bộ.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="multiple-import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>Import</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { MultipleCombobox } from "@/design-system/components/ui/multiple-combobox";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="multiple-props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>
                Props giống <code className="rounded bg-muted px-1 text-xs">SingleCombobox</code>,
                khác ở kiểu của <code className="rounded bg-muted px-1 text-xs">value</code> và{' '}
                <code className="rounded bg-muted px-1 text-xs">onChange</code>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/70">
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
                          index !== multipleComboboxProps.length - 1 && 'border-b border-border/70',
                        )}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                          {prop.type}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="multiple-usages" className="rounded-[24px] border-border/70">
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
                    <div className="rounded-[20px] border border-dashed border-border bg-[linear-gradient(135deg,rgba(0,0,0,0.02),transparent)] p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[#111111] p-5 text-white">
                      <pre className="text-sm leading-6">
                        <code>{sample.code}</code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            TOC
          </p>
          <nav className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground/70">Combobox</p>
            <a href="#import" className="block pl-3 transition hover:text-foreground">
              Import
            </a>
            <a href="#props" className="block pl-3 transition hover:text-foreground">
              Props
            </a>
            <a href="#usages" className="block pl-3 transition hover:text-foreground">
              Usages
            </a>

            <p className="pt-2 font-semibold text-foreground/70">SingleCombobox</p>
            <a href="#single-import" className="block pl-3 transition hover:text-foreground">
              Import
            </a>
            <a href="#single-type" className="block pl-3 transition hover:text-foreground">
              ComboboxBaseOption
            </a>
            <a href="#single-props" className="block pl-3 transition hover:text-foreground">
              Props
            </a>
            <a href="#single-usages" className="block pl-3 transition hover:text-foreground">
              Usages
            </a>

            <p className="pt-2 font-semibold text-foreground/70">MultipleCombobox</p>
            <a href="#multiple-import" className="block pl-3 transition hover:text-foreground">
              Import
            </a>
            <a href="#multiple-props" className="block pl-3 transition hover:text-foreground">
              Props
            </a>
            <a href="#multiple-usages" className="block pl-3 transition hover:text-foreground">
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
