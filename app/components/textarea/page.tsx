'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Textarea',
  group: 'ui',
  importPath: '@/design-system/components/ui/textarea',
} as const;

const props = [
  { name: 'value', type: 'string', defaultValue: '--' },
  { name: 'defaultValue', type: 'string', defaultValue: '--' },
  { name: 'placeholder', type: 'string', defaultValue: '--' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
  { name: 'rows', type: 'number', defaultValue: '3' },
  { name: 'cols', type: 'number', defaultValue: '--' },
  { name: 'size', type: `'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, defaultValue: `'md'` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

function TextareaExample() {
  return <Textarea placeholder="Type your message here..." rows={4} />;
}

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: <TextareaExample />,
    code: `import { Textarea } from "@/components/ui/textarea";

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here..." rows={4} />;
}`,
  },
  {
    id: 'disabled',
    label: 'Disabled',
    preview: <Textarea placeholder="Disabled textarea" disabled rows={3} />,
    code: `import { Textarea } from "@/components/ui/textarea";

export function Example() {
  return (
    <Textarea 
      placeholder="Disabled textarea" 
      disabled 
      rows={3}
    />
  );
}`,
  },
  {
    id: 'with-value',
    label: 'With Value',
    preview: (
      <Textarea
        defaultValue="This is a default value in the textarea. You can edit this text."
        rows={4}
      />
    ),
    code: `import { Textarea } from "@/components/ui/textarea";

export function Example() {
  return (
    <Textarea 
      defaultValue="This is a default value in the textarea. You can edit this text."
      rows={4}
    />
  );
}`,
  },
];

export default function TextareaGuidePage() {
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
            A textarea component for multi-line text input with customizable rows and styling.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Textarea component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Textarea } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Textarea component props.</CardDescription>
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
              <CardDescription>Available sizes for the Textarea component.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid max-w-md gap-4">
                <Textarea size="xxs" placeholder="Extra Small textarea" rows={3} />
                <Textarea size="xs" placeholder="Extra Small textarea" rows={3} />
                <Textarea size="sm" placeholder="Small textarea" rows={3} />
                <Textarea size="md" placeholder="Medium textarea" rows={3} />
                <Textarea size="lg" placeholder="Large textarea" rows={3} />
                <Textarea size="xl" placeholder="Extra Large textarea" rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>4. Usages</CardTitle>
              <CardDescription>Common Textarea patterns and configurations.</CardDescription>
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
