'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { RHFDateRangePicker } from '@/components/rhf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { getGuide } from '../guide-data';

const guide = getGuide('rhf-date-range-picker');

const props = [
  { name: 'control', type: 'Control<T>', defaultValue: '--' },
  { name: 'name', type: 'Path<T>', defaultValue: '--' },
  {
    name: 'callback',
    type: '(value: { from?: Date; to?: Date } | undefined) => void',
    defaultValue: '--',
  },
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'error', type: 'string', defaultValue: '--' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFDateRangePickerExample />
      </div>
    ),
    code: `import { RHFDateRangePicker } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      dateRange: undefined,
    },
  });

  return (
    <RHFDateRangePicker
      control={control}
      name="dateRange"
      label="Date Range"
      placeholder={{ from: 'From date', to: 'To date' }}
    />
  );
}`,
  },
  {
    id: 'with-presets',
    label: 'With Presets',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFDateRangePickerWithPresetsExample />
      </div>
    ),
    code: `import { RHFDateRangePicker } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      dateRange: undefined,
    },
  });

  const presets = [
    { label: 'Today', range: { from: new Date(), to: new Date() } },
    { label: 'Last 7 days', range: { from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), to: new Date() } },
    { label: 'Last 30 days', range: { from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), to: new Date() } },
  ];

  return (
    <RHFDateRangePicker
      control={control}
      name="dateRange"
      label="Date Range"
      placeholder={{ from: 'From date', to: 'To date' }}
      presets={presets}
      showPresets
    />
  );
}`,
  },
];

function RHFDateRangePickerExample() {
  const { control } = useForm({
    defaultValues: {
      dateRange: undefined,
    },
  });

  return (
    <RHFDateRangePicker
      control={control}
      name="dateRange"
      label="Date Range"
      placeholder={{ from: 'From date', to: 'To date' }}
    />
  );
}

function RHFDateRangePickerWithPresetsExample() {
  const { control } = useForm({
    defaultValues: {
      dateRange: undefined,
    },
  });

  const presets = [
    { label: 'Today', range: { from: new Date(), to: new Date() } },
    {
      label: 'Last 7 days',
      range: { from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), to: new Date() },
    },
    {
      label: 'Last 30 days',
      range: { from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), to: new Date() },
    },
  ];

  return (
    <RHFDateRangePicker
      control={control}
      name="dateRange"
      label="Date Range"
      placeholder={{ from: 'From date', to: 'To date' }}
      presets={presets}
      showPresets
    />
  );
}

export default function RHFDateRangePickerGuidePage() {
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
            React Hook Form wrapper cho DateRangePicker với hỗ trợ validation và error handling tích
            hợp.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the RHF Date Range Picker component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import { RHFDateRangePicker } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>RHF Date Range Picker component props.</CardDescription>
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
                Các pattern và cấu hình RHFDateRangePicker phổ biến.
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
