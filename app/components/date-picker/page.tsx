'use client';

import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

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
  { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'" },
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

function DatePickerExample() {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return <DatePicker label="Date" placeholder="Pick a date" value={value} onChange={setValue} />;
}

function DatePickerWithTimeExample() {
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
}

function DatePickerMonthExample() {
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
}

export default function DatePickerGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A date picker component with support for date selection, time selection, and month
            picking.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Date Picker component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { DatePicker } from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Date Picker component props.</CardDescription>
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
                    <div className="rounded-[20px] border border-dashed border-border bg-muted/30 p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-5 text-card-foreground">
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
            <a href="#import" className="block transition hover:text-foreground">
              Import
            </a>
            <a href="#props" className="block transition hover:text-foreground">
              Props
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

