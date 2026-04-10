'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { DEFAULT_CHECKBOX_SIZE } from '../../../constants/form-sizes';

const guide = {
  name: 'Checkbox',
  group: 'ui',
  importPath: '@/design-system/components/ui/checkbox',
} as const;

const props = [
  { name: 'checked', type: "boolean | 'indeterminate'", defaultValue: 'false' },
  { name: 'defaultChecked', type: 'boolean', defaultValue: 'false' },
  {
    name: 'onCheckedChange',
    type: "(checked: boolean | 'indeterminate') => void",
    defaultValue: '--',
  },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'error', type: 'string', defaultValue: '--' },
  {
    name: 'size',
    type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`,
    defaultValue: DEFAULT_CHECKBOX_SIZE,
  },
  { name: 'labelClassName', type: 'string', defaultValue: '--' },
  { name: 'errorClassName', type: 'string', defaultValue: '--' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <div>
        <Checkbox id="terms" label="Accept terms and conditions" />
      </div>
    ),
    code: `import { Checkbox } from "@/design-system/components/ui/checkbox";

export function Example() {
  return (
    <Checkbox id="terms" label="Accept terms and conditions" />
  );
}`,
  },
  {
    id: 'disabled',
    label: 'Disabled',
    preview: (
      <div>
        <Checkbox id="disabled" label="Disabled checkbox" disabled />
      </div>
    ),
    code: `import { Checkbox } from "@/design-system/components/ui/checkbox";

export function Example() {
  return (
    <Checkbox id="disabled" label="Disabled checkbox" disabled />
  );
}`,
  },
  {
    id: 'with-error',
    label: 'With Error',
    preview: (
      <div>
        <Checkbox
          id="terms-error"
          label="Accept terms and conditions"
          error="You must accept the terms"
        />
      </div>
    ),
    code: `import { Checkbox } from "@/design-system/components/ui/checkbox";

export function Example() {
  return (
    <Checkbox 
      id="terms-error" 
      label="Accept terms and conditions" 
      error="You must accept the terms" 
    />
  );
}`,
  },
  {
    id: 'required',
    label: 'Required',
    preview: (
      <div>
        <Checkbox id="terms-required" label="Accept terms and conditions" required />
      </div>
    ),
    code: `import { Checkbox } from "@/design-system/components/ui/checkbox";

export function Example() {
  return (
    <Checkbox id="terms-required" label="Accept terms and conditions" required />
  );
}`,
  },
];

export default function CheckboxGuidePage() {
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
            A control that allows the user to toggle between checked and not checked.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the checkbox component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Checkbox } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Checkbox component props.</CardDescription>
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
              <CardDescription>Available sizes for the Checkbox component.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-sm">
                <Checkbox id="xxs-checkbox" size="xxs" label="Extra Small" />
                <Checkbox id="xs-checkbox" size="xs" label="Extra Small" />
                <Checkbox id="sm-checkbox" size="sm" label="Small" />
                <Checkbox id="md-checkbox" size="md" label="Medium" />
                <Checkbox id="lg-checkbox" size="lg" label="Large" />
                <Checkbox id="xl-checkbox" size="xl" label="Extra Large" />
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>4. Usages</CardTitle>
              <CardDescription>Common checkbox patterns and configurations.</CardDescription>
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
