'use client';

import { useForm } from 'react-hook-form';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { RHFMultipleCombobox } from '@/components/rhf';
import type { ComboboxBaseOption } from '@/components/ui/single-combobox';

import { getGuide } from '../guide-data';

const guide = getGuide('rhf-multiple-combobox');

const props = [
  { name: 'control', type: 'Control<T>', defaultValue: '--' },
  { name: 'name', type: 'Path<T>', defaultValue: '--' },
  { name: 'options', type: 'ComboboxBaseOption[]', defaultValue: '--' },
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'description', type: 'string', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'placeholder', type: 'string', defaultValue: 'Chọn...' },
  { name: 'showMenuCode', type: 'boolean', defaultValue: 'true' },
  { name: 'showSelectedCode', type: 'boolean', defaultValue: 'false' },
  { name: 'selectedCodeOnly', type: 'boolean', defaultValue: 'false' },
  { name: 'searchPlaceholder', type: 'string', defaultValue: 'Tìm kiếm...' },
  { name: 'emptyMessage', type: 'string', defaultValue: 'Không tìm thấy kết quả' },
  { name: 'limitTags', type: 'number', defaultValue: '--' },
  { name: 'autoResize', type: 'boolean', defaultValue: 'false' },
  { name: 'showArrowIcon', type: 'boolean', defaultValue: 'true' },
  { name: 'showClearIcon', type: 'boolean', defaultValue: 'true' },
  {
    name: 'onSelectedRender',
    type: '(selectedId, selectedOption) => React.ReactNode',
    defaultValue: '--',
  },
  {
    name: 'callback',
    type: '(values: (string | number)[], options: TOption[]) => void',
    defaultValue: '--',
  },
  { name: 'wrapperClassName', type: 'string', defaultValue: '--' },
  { name: 'labelClassName', type: 'string', defaultValue: '--' },
  { name: 'descriptionClassName', type: 'string', defaultValue: '--' },
  { name: 'errorClassName', type: 'string', defaultValue: '--' },
];

const departments: ComboboxBaseOption[] = [
  { id: '1', code: 'IT', name: 'Công nghệ thông tin' },
  { id: '2', code: 'FIN', name: 'Tài chính' },
  { id: '3', code: 'HR', name: 'Nhân sự' },
  { id: '4', code: 'MKT', name: 'Marketing' },
  { id: '5', code: 'OPS', name: 'Vận hành' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFMultipleComboboxExample />
      </div>
    ),
    code: `import { RHFMultipleCombobox } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";
import type { ComboboxBaseOption } from "@/design-system/components/ui/single-combobox";

const departments: ComboboxBaseOption[] = [
  { id: '1', code: 'IT', name: 'Công nghệ thông tin' },
  { id: '2', code: 'FIN', name: 'Tài chính' },
  { id: '3', code: 'HR', name: 'Nhân sự' },
];

export function ExampleCombobox() {
  const { control } = useForm({
    defaultValues: {
      departments: [],
    },
  });

  return (
    <RHFMultipleCombobox
      control={control}
      name="departments"
      options={departments}
      label="Phòng ban"
      placeholder="Chọn phòng ban"
    />
  );
}`,
  },
  {
    id: 'with-limit',
    label: 'Limit Tags',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFMultipleComboboxWithLimitExample />
      </div>
    ),
    code: `import { RHFMultipleCombobox } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

export function ExampleCombobox() {
  const { control } = useForm({
    defaultValues: {
      departments: [],
    },
  });

  return (
    <RHFMultipleCombobox
      control={control}
      name="departments"
      options={departments}
      label="Phòng ban"
      placeholder="Chọn phòng ban"
      limitTags={2}
    />
  );
}`,
  },
  {
    id: 'auto-resize',
    label: 'Auto Resize',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFMultipleComboboxAutoResizeExample />
      </div>
    ),
    code: `import { RHFMultipleCombobox } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

export function ExampleCombobox() {
  const { control } = useForm({
    defaultValues: {
      departments: [],
    },
  });

  return (
    <RHFMultipleCombobox
      control={control}
      name="departments"
      options={departments}
      label="Phòng ban"
      placeholder="Chọn phòng ban"
      autoResize={true}
    />
  );
}`,
  },
];

function RHFMultipleComboboxExample() {
  const { control } = useForm({
    defaultValues: {
      departments: [],
    },
  });

  return (
    <RHFMultipleCombobox
      control={control}
      name="departments"
      options={departments}
      label="Phòng ban"
      placeholder="Chọn phòng ban"
    />
  );
}

function RHFMultipleComboboxWithLimitExample() {
  const { control } = useForm({
    defaultValues: {
      departments: [],
    },
  });

  return (
    <RHFMultipleCombobox
      control={control}
      name="departments"
      options={departments}
      label="Phòng ban"
      placeholder="Chọn phòng ban"
      limitTags={2}
    />
  );
}

function RHFMultipleComboboxAutoResizeExample() {
  const { control } = useForm({
    defaultValues: {
      departments: [],
    },
  });

  return (
    <RHFMultipleCombobox
      control={control}
      name="departments"
      options={departments}
      label="Phòng ban"
      placeholder="Chọn phòng ban"
      autoResize
    />
  );
}

export default function RHFMultipleComboboxGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            React Hook Form wrapper cho MultipleCombobox với hỗ trợ validation và error handling
            tích hợp.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import RHFMultipleCombobox component từ design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import { RHFMultipleCombobox } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>RHFMultipleCombobox component props.</CardDescription>
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

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. Usages</CardTitle>
              <CardDescription>
                Các pattern và cấu hình RHFMultipleCombobox phổ biến.
              </CardDescription>
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
                    <div className="border-border bg-muted/30 rounded-[20px] border border-dashed p-8">
                      <div className="bg-card flex min-h-56 items-center justify-center rounded-[18px] px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="border-border/70 bg-card text-card-foreground overflow-x-auto rounded-2xl border p-5">
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
        <div className="border-border/70 bg-card sticky top-24 rounded-[24px] border p-5">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.24em] uppercase">
            TOC
          </p>
          <nav className="text-muted-foreground mt-4 space-y-3 text-sm">
            <a href="#import" className="hover:text-foreground block transition">
              Import
            </a>
            <a href="#props" className="hover:text-foreground block transition">
              Props
            </a>
            <a href="#usages" className="hover:text-foreground block transition">
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
