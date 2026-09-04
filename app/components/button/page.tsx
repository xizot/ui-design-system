'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ChevronRightIcon, PlusIcon } from 'lucide-react';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('button');

export default function ButtonGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
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
    {
      id: 'loading',
      label: 'Loading',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button loading>Đang lưu</Button>
          <Button loading variant="outline">
            Đang tải dữ liệu
          </Button>
          <Button loading variant="secondary" size="sm">
            Đang xử lý
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button loading>Đang lưu</Button>
      <Button loading variant="outline">
        Đang tải dữ liệu
      </Button>
      <Button loading variant="secondary" size="sm">
        Đang xử lý
      </Button>
    </div>
  );
}`,
    },
  ];

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Template page cho usage guide của Button. Sau này mỗi component sẽ có một page riêng
            theo cùng bố cục này.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import trực tiếp từ source path của component.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Button } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                Props quan trọng nên phản ánh đúng khả năng chính của component hiện tại.
              </CardDescription>
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
                        name: 'loading',
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
                        className={cn(index !== array.length - 1 && 'border-border/70 border-b')}
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
              <CardDescription>Available sizes for the Button component.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="xxs">Extra Small</Button>
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>4. Usages</CardTitle>
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
                    <div className="border-border bg-muted/30 rounded-[20px] border border-dashed p-8">
                      <div className="bg-card flex min-h-56 items-center justify-center rounded-[18px] shadow-sm">
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
