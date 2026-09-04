'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Label',
  group: 'ui',
  importPath: '@/design-system/components/ui/label',
} as const;

const props = [
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'htmlFor', type: 'string', defaultValue: '--' },
  { name: 'children', type: 'ReactNode', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter your email" className="w-64" />
      </div>
    ),
    code: `import { Label } from "@/design-system/components/ui/label";
import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Enter your email" />
    </div>
  );
}`,
  },
  {
    id: 'with-checkbox',
    label: 'With Checkbox',
    preview: (
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="cursor-pointer">
          Accept terms and conditions
        </Label>
      </div>
    ),
    code: `import { Label } from "@/design-system/components/ui/label";
import { Checkbox } from "@/design-system/components/ui/checkbox";

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        Accept terms and conditions
      </Label>
    </div>
  );
}`,
  },
  {
    id: 'with-switch',
    label: 'With Switch',
    preview: (
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <Label htmlFor="airplane" className="cursor-pointer">
          Airplane Mode
        </Label>
      </div>
    ),
    code: `import { Label } from "@/design-system/components/ui/label";
import { Switch } from "@/design-system/components/ui/switch";

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane" className="cursor-pointer">
        Airplane Mode
      </Label>
    </div>
  );
}`,
  },
];

export default function LabelGuidePage() {
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
            Label component for form elements. Renders an accessible label element associated with
            form controls.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import the label component from the design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Label } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Label component props.</CardDescription>
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
              <CardDescription>Common label patterns with form elements.</CardDescription>
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
            <a href="#usages" className="hover:text-foreground block transition">
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
