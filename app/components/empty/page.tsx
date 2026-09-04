import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { InboxIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const guide = {
  name: 'Empty',
  group: 'ui',
  importPath: '@/design-system/components/ui/empty',
} as const;

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

const props = [
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'children', type: 'ReactNode', defaultValue: '--' },
];

const emptyMediaProps = [
  { name: 'variant', type: `"default" | "icon"`, defaultValue: `"default"` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No items found</EmptyTitle>
          <EmptyDescription>Get started by creating your first item.</EmptyDescription>
        </EmptyHeader>
        <Button>
          <PlusIcon />
          Create Item
        </Button>
      </Empty>
    ),
    code: `import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/design-system/components/ui/empty";
import { Button } from "@/design-system/components/ui/button";
import { PlusIcon } from "lucide-react";

export function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first item.
        </EmptyDescription>
      </EmptyHeader>
      <Button>
        <PlusIcon />
        Create Item
      </Button>
    </Empty>
  );
}`,
  },
  {
    id: 'with-icon',
    label: 'With Icon',
    preview: (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>Your inbox is empty. New messages will appear here.</EmptyDescription>
        </EmptyHeader>
        <Button variant="outline">Refresh</Button>
      </Empty>
    ),
    code: `import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/design-system/components/ui/empty";
import { Button } from "@/design-system/components/ui/button";
import { InboxIcon } from "lucide-react";

export function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. New messages will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="outline">Refresh</Button>
    </Empty>
  );
}`,
  },
  {
    id: 'with-content',
    label: 'With Content',
    preview: (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>Advanced Empty State</EmptyTitle>
          <EmptyDescription>
            This example shows how to use the EmptyContent component for more complex layouts.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button variant="outline">Learn more</Button>
            <Button>Get started</Button>
          </div>
        </EmptyContent>
      </Empty>
    ),
    code: `import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/design-system/components/ui/empty";
import { Button } from "@/design-system/components/ui/button";
import { InboxIcon } from "lucide-react";

export function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>Advanced Empty State</EmptyTitle>
        <EmptyDescription>
          This example shows how to use the EmptyContent component for more complex layouts.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="outline">Learn more</Button>
          <Button>Get started</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}`,
  },
];

export default function EmptyGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Empty state component for displaying when there is no data to show. Composed of multiple
            sub-components for flexible layouts.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import the empty components from the design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Empty component sub-components and their props.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium">Empty</h3>
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
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">EmptyMedia</h3>
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
                      {emptyMediaProps.map((prop, index) => (
                        <tr
                          key={prop.name}
                          className={cn(
                            index !== emptyMediaProps.length - 1 && 'border-border/70 border-b',
                          )}
                        >
                          <td className="px-4 py-3 font-medium">{prop.name}</td>
                          <td className="text-muted-foreground px-4 py-3">{prop.type}</td>
                          <td className="text-muted-foreground px-4 py-3">{prop.defaultValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. Usages</CardTitle>
              <CardDescription>Common empty state patterns and layouts.</CardDescription>
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
