'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Input',
  group: 'ui',
  importPath: '@/design-system/components/ui/input',
} as const;

const props = [
  {
    name: 'type',
    type: `React.ComponentProps<"input">["type"]`,
    defaultValue: `"text" | browser default`,
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: '--',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '--',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    name: 'label',
    type: 'string | React.ReactNode',
    defaultValue: '--',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    name: 'error',
    type: 'string',
    defaultValue: '--',
  },
  {
    name: 'size',
    type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`,
    defaultValue: `'md'`,
  },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="grid w-full max-w-md gap-4">
        <Input placeholder="Enter your email" />
        <Input type="password" placeholder="Enter your password" />
      </div>
    ),
    code: `import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Input placeholder="Enter your email" />
      <Input type="password" placeholder="Enter your password" />
    </div>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="grid w-full max-w-md gap-4">
        <Input size="xxs" placeholder="Extra Small" />
        <Input size="xs" placeholder="Extra Small" />
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
        <Input size="xl" placeholder="Extra Large" />
      </div>
    ),
    code: `import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Input size="xxs" placeholder="Extra Small" />
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
    </div>
  );
}`,
  },
  {
    id: 'states',
    label: 'States',
    preview: (
      <div className="grid w-full max-w-md gap-4">
        <Input defaultValue="john@example.com" />
        <Input disabled value="Disabled value" readOnly />
        <Input error="Invalid value" defaultValue="Invalid value" />
      </div>
    ),
    code: `import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Input defaultValue="john@example.com" />
      <Input disabled value="Disabled value" readOnly />
      <Input error="Invalid value" defaultValue="Invalid value" />
    </div>
  );
}`,
  },
  {
    id: 'file',
    label: 'File',
    preview: (
      <div className="w-full max-w-md">
        <Input type="file" />
      </div>
    ),
    code: `import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return <Input type="file" />;
}`,
  },
];

export default function InputGuidePage() {
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
            Text input primitive built on Base UI input, styled for common form states such as
            default, disabled, invalid, and file upload.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the public input component from the installed design system path.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Input } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                The component forwards native input props and adds built-in invalid styling.
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
              <CardDescription>Available sizes for the Input component.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-md gap-4">
                <Input size="xxs" placeholder="Extra Small" />
                <Input size="xs" placeholder="Extra Small" />
                <Input size="sm" placeholder="Small" />
                <Input size="md" placeholder="Medium" />
                <Input size="lg" placeholder="Large" />
                <Input size="xl" placeholder="Extra Large" />
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>4. Usages</CardTitle>
              <CardDescription>
                The guide separates the most common input states into focused usage tabs instead of
                showing a single generic example.
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
