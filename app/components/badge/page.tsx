'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('badge');

const props = [
  {
    name: 'variant',
    type: `"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"`,
    defaultValue: `"default"`,
  },
  {
    name: 'size',
    type: `"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"`,
    defaultValue: `"sm"`,
  },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
    code: `import { Badge } from "@/design-system/components/ui/badge";

export function Example() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge>XXS</Badge>
        <Badge>XS</Badge>
        <Badge>SM</Badge>
        <Badge>MD</Badge>
        <Badge>LG</Badge>
        <Badge>XL</Badge>
        <Badge>XXL</Badge>
      </div>
    ),
    code: `import { Badge } from "@/design-system/components/ui/badge";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="xxs">XXS</Badge>
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
      <Badge size="xl">XL</Badge>
      <Badge size="xxl">XXL</Badge>
    </div>
  );
}`,
  },
  {
    id: 'custom',
    label: 'Custom Variants',
    preview: (
      <div className="flex gap-2">
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">Success</Badge>
        <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          Warning
        </Badge>
        <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">Info</Badge>
      </div>
    ),
    code: `import { Badge } from "@/design-system/components/ui/badge";

export function Example() {
  return (
    <div className="flex gap-2">
      <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">Success</Badge>
      <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
        Warning
      </Badge>
      <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">Info</Badge>
    </div>
  );
}`,
  },
];

export default function BadgeGuidePage() {
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
            Displays a badge or label component for categorizing and highlighting information.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import the badge component from the design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Badge } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Badge component props.</CardDescription>
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
              <CardDescription>Common badge patterns and configurations.</CardDescription>
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
