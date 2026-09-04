'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { RHFTimePicker } from '@/components/rhf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const guide = {
  name: 'RHF Time Picker',
  group: 'rhf',
  importPath: '@/design-system/components/rhf',
} as const;

const props = [
  { name: 'control', type: 'Control<T>', defaultValue: '--' },
  { name: 'name', type: 'Path<T>', defaultValue: '--' },
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: "'Chọn thời gian'" },
  { name: 'showSeconds', type: 'boolean', defaultValue: 'true' },
  { name: 'size', type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, defaultValue: `'md'` },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'panelClassName', type: 'string', defaultValue: '--' },
  { name: 'callback', type: '(value: string) => void', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFTimePickerExample />
      </div>
    ),
    code: `import { RHFTimePicker } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      time: "09:30:00",
    },
  });

  return (
    <RHFTimePicker
      control={control}
      name="time"
      label="Time"
    />
  );
}`,
  },
  {
    id: 'without-seconds',
    label: 'Without Seconds',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFTimePickerWithoutSecondsExample />
      </div>
    ),
    code: `import { RHFTimePicker } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      time: "14:45",
    },
  });

  return (
    <RHFTimePicker
      control={control}
      name="time"
      label="Time"
      showSeconds={false}
    />
  );
}`,
  },
];

function RHFTimePickerExample() {
  const { control } = useForm({
    defaultValues: {
      time: '09:30:00',
    },
  });

  return <RHFTimePicker control={control} name="time" label="Time" />;
}

function RHFTimePickerWithoutSecondsExample() {
  const { control } = useForm({
    defaultValues: {
      time: '14:45',
    },
  });

  return <RHFTimePicker control={control} name="time" label="Time" showSeconds={false} />;
}

export default function RHFTimePickerGuidePage() {
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
            React Hook Form wrapper cho Time Picker với hỗ trợ validation và error handling tích
            hợp.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the RHF Time Picker component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import { RHFTimePicker } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>RHF Time Picker component props.</CardDescription>
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
              <CardDescription>Các pattern và cấu hình RHFTimePicker phổ biến.</CardDescription>
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
