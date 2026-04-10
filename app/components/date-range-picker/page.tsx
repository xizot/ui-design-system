'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';

const guide = {
  name: 'Date Range Picker',
  group: 'ui',
  importPath: '@/design-system/components/ui/date-range-picker',
} as const;

const props = [
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'value', type: 'DateRange', defaultValue: '--' },
  { name: 'onChange', type: '(range: DateRange | undefined) => void', defaultValue: '--' },
  {
    name: 'placeholder',
    type: '{ from?: string; to?: string }',
    defaultValue: "{ from: 'From date', to: 'To date' }",
  },
  { name: 'dateFormat', type: 'string', defaultValue: "'dd/MM/yyyy'" },
  { name: 'presets', type: 'DateRangePreset[]', defaultValue: '--' },
  { name: 'showPresets', type: 'boolean', defaultValue: '--' },
  { name: 'error', type: 'string', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'disabledPast', type: 'boolean', defaultValue: 'false' },
  { name: 'disabledFuture', type: 'boolean', defaultValue: 'false' },
  { name: 'onDisabled', type: '(date: Date) => boolean', defaultValue: '--' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'" },
  { name: 'locale', type: 'string | Locale', defaultValue: '--' },
  { name: 'cancelText', type: 'string', defaultValue: '--' },
  { name: 'applyText', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <DateRangePickerExample />
      </div>
    ),
    code: `import { DateRangePicker } from "@/design-system/components/ui/date-range-picker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

function Example() {
  const [value, setValue] = useState<DateRange | undefined>(undefined);

  return (
    <DateRangePicker
      label="Date Range"
      placeholder={{ from: 'From date', to: 'To date' }}
      value={value}
      onChange={setValue}
    />
  );
}`,
  },
  {
    id: 'with-presets',
    label: 'With Presets',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <DateRangePickerPresetsExample />
      </div>
    ),
    code: `import { DateRangePicker } from "@/design-system/components/ui/date-range-picker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

function Example() {
  const [value, setValue] = useState<DateRange | undefined>(undefined);

  return (
    <DateRangePicker
      label="Date Range"
      placeholder={{ from: 'From date', to: 'To date' }}
      value={value}
      onChange={setValue}
      showPresets
    />
  );
}`,
  },
];

function DateRangePickerExample({ size, label }: { size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const [value, setValue] = useState<DateRange | undefined>(undefined);

  return (
    <DateRangePicker
      label={label || 'Date Range'}
      placeholder={{ from: 'From date', to: 'To date' }}
      value={value}
      onChange={setValue}
      size={size}
    />
  );
}

function DateRangePickerPresetsExample() {
  const [value, setValue] = useState<DateRange | undefined>(undefined);

  return (
    <DateRangePicker
      label="Date Range"
      placeholder={{ from: 'From date', to: 'To date' }}
      value={value}
      onChange={setValue}
      showPresets
    />
  );
}

export default function DateRangePickerGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A date range picker component with support for selecting date ranges and preset options.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Date Range Picker component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { DateRangePicker } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Date Range Picker component props.</CardDescription>
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

          <Card id="sizes" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. Sizes</CardTitle>
              <CardDescription>
                Available sizes for the Date Range Picker component.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 max-w-md">
                <DateRangePickerExample size="sm" label="Small" />
                <DateRangePickerExample size="md" label="Medium" />
                <DateRangePickerExample size="lg" label="Large" />
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>4. Usages</CardTitle>
              <CardDescription>
                Common Date Range Picker patterns and configurations.
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
                    <div className="rounded-[20px] border border-dashed border-border bg-muted/30 p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <CodeBlock code={sample.code} id={sample.id} />
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
            <a href="#import" className="block transition hover:text-foreground">
              Import
            </a>
            <a href="#props" className="block transition hover:text-foreground">
              Props
            </a>
            <a href="#sizes" className="block transition hover:text-foreground">
              Sizes
            </a>
            <a href="#usages" className="block transition hover:text-foreground">
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
