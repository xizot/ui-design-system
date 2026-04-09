import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const guide = {
  name: 'Input Group',
  group: 'ui',
  importPath: '@/design-system/components/ui/input-group',
} as const;

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

function InputGroupExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  );
}

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: <InputGroupExample />,
    code: `import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function InputGroupDemo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  );
}`,
  },
  {
    id: 'prefix',
    label: 'Prefix',
    preview: (
      <div className="flex items-center justify-center">
        <InputGroup className="max-w-xs">
          <InputGroupAddon align="inline-start">https://</InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      </div>
    ),
    code: `import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";

export function Example() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupAddon align="inline-start">https://</InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  );
}`,
  },
  {
    id: 'icon-only',
    label: 'Icon Only',
    preview: (
      <div className="flex items-center justify-center">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
    ),
    code: `import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function Example() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}`,
  },
];

export default function InputGroupGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Input Group component dùng để kết hợp nhiều input hoặc button thành một nhóm thống nhất.
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
                <code className="text-sm">{`import { InputGroup, InputGroupItem } from "${guide.importPath}"`}</code>
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
                      <th className="px-4 py-3 font-medium">Component</th>
                      <th className="px-4 py-3 font-medium">Prop</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        component: 'InputGroup',
                        name: 'className',
                        type: 'string',
                        defaultValue: '--',
                      },
                      {
                        component: 'InputGroupInput',
                        name: 'className',
                        type: 'string',
                        defaultValue: '--',
                      },
                      {
                        component: 'InputGroupButton',
                        name: 'children',
                        type: 'ReactNode',
                        defaultValue: '--',
                      },
                      {
                        component: 'InputGroupText',
                        name: 'children',
                        type: 'ReactNode',
                        defaultValue: '--',
                      },
                    ].map((prop, index, array) => (
                      <tr
                        key={`${prop.component}-${prop.name}`}
                        className={cn(index !== array.length - 1 && 'border-b border-border/70')}
                      >
                        <td className="px-4 py-3 font-medium">{prop.component}</td>
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
