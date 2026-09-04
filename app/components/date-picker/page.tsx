'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { DatePicker } from '@/components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const guide = {
  name: 'Date Picker',
  group: 'ui',
  importPath: '@/design-system/components/ui/date-picker',
} as const;

const props = [
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'value', type: 'Date', defaultValue: '--' },
  { name: 'onChange', type: '(date: Date | undefined) => void', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: "'Pick a date'" },
  { name: 'dateFormat', type: 'string', defaultValue: "'dd/MM/yyyy'" },
  { name: 'showTime', type: 'boolean', defaultValue: 'false' },
  { name: 'timeOnly', type: 'boolean', defaultValue: 'false' },
  { name: 'mode', type: "'single' | 'month'", defaultValue: "'single'" },
  { name: 'error', type: 'string', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'disabledPast', type: 'boolean', defaultValue: 'false' },
  { name: 'disabledFuture', type: 'boolean', defaultValue: 'false' },
  { name: 'onDisabled', type: '(date: Date) => boolean', defaultValue: '--' },
  { name: 'size', type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, defaultValue: `'md'` },
  { name: 'locale', type: 'string | Locale', defaultValue: '--' },
  { name: 'cancelText', type: 'string', defaultValue: '--' },
  { name: 'applyText', type: 'string', defaultValue: '--' },
  { name: 'monthNames', type: 'string[]', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <DatePickerExample />
      </div>
    ),
    code: `import { DatePicker } from "@/design-system/components/ui/date-picker";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      label="Date"
      placeholder="Pick a date"
      value={value}
      onChange={setValue}
    />
  );
}`,
  },
  {
    id: 'with-time',
    label: 'With Time',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <DatePickerWithTimeExample />
      </div>
    ),
    code: `import { DatePicker } from "@/design-system/components/ui/date-picker";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      label="Date and Time"
      placeholder="Pick a date and time"
      showTime
      value={value}
      onChange={setValue}
    />
  );
}`,
  },
  {
    id: 'month-picker',
    label: 'Month Picker',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <DatePickerMonthExample />
      </div>
    ),
    code: `import { DatePicker } from "@/design-system/components/ui/date-picker";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      label="Month"
      placeholder="Pick a month"
      mode="month"
      value={value}
      onChange={setValue}
    />
  );
}`,
  },
];

function DatePickerExample({ size, label }: { size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const [value, setValue] = useState<string | undefined>(new Date().toISOString());

  return (
    <DatePicker
      label={label || 'Date'}
      placeholder="Pick a date"
      value={value}
      onChange={setValue}
      size={size}
    />
  );
}

function DatePickerWithTimeExample() {
  const [value, setValue] = useState<string | undefined>(new Date().toISOString());

  return (
    <DatePicker
      label="Date and Time"
      placeholder="Pick a date and time"
      showTime
      value={value}
      onChange={setValue}
    />
  );
}

function DatePickerMonthExample() {
  const [value, setValue] = useState<string | undefined>(new Date().toISOString());

  return (
    <DatePicker
      label="Month"
      placeholder="Pick a month"
      mode="month"
      value={value}
      onChange={setValue}
    />
  );
}

export default function DatePickerGuidePage() {
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
            A date picker component with support for date selection, time selection, and month
            picking.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Date Picker component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { DatePicker } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Date Picker component props.</CardDescription>
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
              <CardDescription>Available sizes for the Date Picker component.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid max-w-md gap-4">
                <DatePickerExample size="sm" label="Small" />
                <DatePickerExample size="md" label="Medium" />
                <DatePickerExample size="lg" label="Large" />
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>4. Usages</CardTitle>
              <CardDescription>Common Date Picker patterns and configurations.</CardDescription>
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

                    <CodeBlock code={sample.code} id={sample.id} />
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
            <a href="#sizes" className="hover:text-foreground block transition">
              Sizes
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
