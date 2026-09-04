'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Sheet',
  group: 'ui',
  importPath: '@/design-system/components/ui/sheet',
} as const;

const props = [
  { name: 'side', type: `"top" | "right" | "bottom" | "left"`, defaultValue: `"right"` },
  { name: 'showCloseButton', type: 'boolean', defaultValue: 'true' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default (Right)',
    preview: (
      <Sheet>
        <SheetTrigger render={<Button variant="outline">Open Sheet</Button>} />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4">
            <Input id="name" value="Pedro Duarte" className="col-span-3" label="Name" />
            <Input id="username" value="@peduarte" className="col-span-3" label="Username" />
          </div>
        </SheetContent>
      </Sheet>
    ),
    code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/design-system/components/ui/sheet";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}`,
  },
  {
    id: 'left',
    label: 'Left Side',
    preview: (
      <Sheet>
        <SheetTrigger render={<Button variant="outline">Open Left</Button>} />
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Panel</SheetTitle>
            <SheetDescription>This sheet slides in from the left side.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
    code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/design-system/components/ui/sheet";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Left</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Panel</SheetTitle>
          <SheetDescription>
            This sheet slides in from the left side.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}`,
  },
  {
    id: 'top',
    label: 'Top Side',
    preview: (
      <Sheet>
        <SheetTrigger render={<Button variant="outline">Open Top</Button>} />
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Panel</SheetTitle>
            <SheetDescription>This sheet slides in from the top.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
    code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/design-system/components/ui/sheet";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Top</Button>} />
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Panel</SheetTitle>
          <SheetDescription>
            This sheet slides in from the top.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}`,
  },
  {
    id: 'bottom',
    label: 'Bottom Side',
    preview: (
      <Sheet>
        <SheetTrigger render={<Button variant="outline">Open Bottom</Button>} />
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Panel</SheetTitle>
            <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
    code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/design-system/components/ui/sheet";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Bottom</Button>} />
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Panel</SheetTitle>
          <SheetDescription>
            This sheet slides in from the bottom.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}`,
  },
];

export default function SheetGuidePage() {
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
            Extends the Dialog component to display content that complements the main content of the
            screen.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import the sheet components from the design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>SheetContent component props.</CardDescription>
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
              <CardDescription>Common sheet patterns and configurations.</CardDescription>
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
