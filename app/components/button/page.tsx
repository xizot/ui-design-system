import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRightIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const guide = {
  name: 'Button',
  group: 'ui',
  importPath: '@/design-system/components/ui/button',
} as const;

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

export default function ButtonGuidePage() {
  const usageSamples = [
    {
      id: 'variants',
      label: 'Variants',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`,
    },
    {
      id: 'sizes',
      label: 'Sizes',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add item">
            <PlusIcon />
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";
import { PlusIcon } from "lucide-react";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add item">
        <PlusIcon />
      </Button>
    </div>
  );
}`,
    },
    {
      id: 'with-icon',
      label: 'With Icon',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button>
            Continue
            <ChevronRightIcon />
          </Button>
          <Button variant="outline">
            <PlusIcon />
            Create item
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";
import { ChevronRightIcon, PlusIcon } from "lucide-react";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button>
        Continue
        <ChevronRightIcon />
      </Button>
      <Button variant="outline">
        <PlusIcon />
        Create item
      </Button>
    </div>
  );
}`,
    },
    {
      id: 'states',
      label: 'States',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button>Ready</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" aria-invalid>
            Invalid
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button>Ready</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" aria-invalid>
        Invalid
      </Button>
    </div>
  );
}`,
    },
  ];

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Template page cho usage guide của Button. Sau này mỗi component sẽ có một page riêng
            theo cùng bố cục này.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import trực tiếp từ source path của component.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { Button } from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                Props quan trọng nên phản ánh đúng khả năng chính của component hiện tại.
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
                    {[
                      {
                        name: 'variant',
                        type: `"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"`,
                        defaultValue: `"default"`,
                      },
                      {
                        name: 'size',
                        type: `"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
                        defaultValue: `"default"`,
                      },
                      { name: 'className', type: 'string', defaultValue: '--' },
                      {
                        name: 'disabled',
                        type: 'boolean',
                        defaultValue: 'false',
                      },
                      {
                        name: 'aria-invalid',
                        type: 'boolean',
                        defaultValue: 'false',
                      },
                      {
                        name: 'children',
                        type: 'ReactNode',
                        defaultValue: '--',
                      },
                    ].map((prop, index, array) => (
                      <tr
                        key={prop.name}
                        className={cn(index !== array.length - 1 && 'border-b border-border/70')}
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
              <CardDescription>
                Mỗi cách dùng quan trọng nên có tab riêng, để preview và code bám đúng use case thay
                vì dùng một snippet chung.
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
                    <div className="rounded-[20px] border border-dashed border-border bg-[linear-gradient(135deg,rgba(0,0,0,0.02),transparent)] p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[#111111] p-5 text-white">
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
