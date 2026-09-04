'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { TimePicker, type TimeValue } from '@/components/ui/time-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('time-picker');

const props = [
  { name: 'value', type: 'TimeValue | undefined', defaultValue: '--' },
  { name: 'onChange', type: '(value: TimeValue | undefined) => void', defaultValue: '--' },
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: "'Chọn thời gian'" },
  { name: 'showSeconds', type: 'boolean', defaultValue: 'true' },
  { name: 'showClearIcon', type: 'boolean', defaultValue: 'true' },
  { name: 'size', type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, defaultValue: `'md'` },
  { name: 'error', type: 'string', defaultValue: '--' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'panelClassName', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <TimePickerExample />
      </div>
    ),
    code: `import { TimePicker, type TimeValue } from "@/design-system/components/ui/time-picker";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<TimeValue | undefined>({
    hour: "09",
    minute: "30",
    second: "00"
  });

  return (
    <TimePicker
      label="Time"
      value={value}
      onChange={setValue}
    />
  );
}`,
  },
  {
    id: 'without-seconds',
    label: 'Without Seconds',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <TimePickerWithoutSecondsExample />
      </div>
    ),
    code: `import { TimePicker, type TimeValue } from "@/design-system/components/ui/time-picker";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<TimeValue | undefined>({
    hour: "14",
    minute: "45",
    second: "00"
  });

  return (
    <TimePicker
      label="Time"
      value={value}
      onChange={setValue}
      showSeconds={false}
    />
  );
}`,
  },
  {
    id: 'panel-height',
    label: 'Panel Height',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <TimePickerCustomHeightExample />
      </div>
    ),
    code: `import { TimePicker, type TimeValue } from "@/design-system/components/ui/time-picker";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<TimeValue | undefined>({
    hour: "18",
    minute: "15",
    second: "30"
  });

  return (
    <TimePicker
      label="Time"
      value={value}
      onChange={setValue}
      panelClassName="h-96"
    />
  );
}`,
  },
];

function TimePickerExample() {
  const [value, setValue] = useState<TimeValue | undefined>({
    hour: '09',
    minute: '30',
    second: '00',
  });

  return <TimePicker label="Time" value={value} onChange={setValue} />;
}

function TimePickerWithoutSecondsExample() {
  const [value, setValue] = useState<TimeValue | undefined>({
    hour: '14',
    minute: '45',
    second: '00',
  });

  return <TimePicker label="Time" value={value} onChange={setValue} showSeconds={false} />;
}

function TimePickerCustomHeightExample() {
  const [value, setValue] = useState<TimeValue | undefined>({
    hour: '18',
    minute: '15',
    second: '30',
  });

  return <TimePicker label="Time" value={value} onChange={setValue} panelClassName="h-96" />;
}

export default function TimePickerGuidePage() {
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
            A time picker component with scrollable columns for hours, minutes, and seconds
            selection. Supports both 12-hour and 24-hour formats with customizable seconds display.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Time Picker component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { TimePicker, type TimeValue } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Time Picker component props.</CardDescription>
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

          <Card id="types" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. Types</CardTitle>
              <CardDescription>Type definitions used by the Time Picker component.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">TimeValue</h4>
                  <CodeBlock
                    code={`export type TimeValue = {
  hour: string;
  minute: string;
  second: string;
};`}
                    id="timevalue-type"
                    className="bg-muted/30"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>4. Usages</CardTitle>
              <CardDescription>Common Time Picker patterns and configurations.</CardDescription>
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
            <a href="#types" className="hover:text-foreground block transition">
              Types
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
