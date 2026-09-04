'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('hover-card');

const props = [
  {
    name: 'side',
    type: `"top" | "right" | "bottom" | "left"`,
    defaultValue: `"bottom"`,
  },
  { name: 'sideOffset', type: 'number', defaultValue: '4' },
  {
    name: 'align',
    type: `"start" | "center" | "end"`,
    defaultValue: `"center"`,
  },
  { name: 'alignOffset', type: 'number', defaultValue: '4' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <HoverCard>
        <HoverCardTrigger render={<Button variant="link">@johndoe</Button>} />
        <HoverCardContent className="w-80">
          <div className="flex gap-4">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@johndoe</h4>
              <p className="text-muted-foreground text-sm">
                Software Engineer at Company. Building open-source software.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
    code: `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/design-system/components/ui/hover-card";
import { Button } from "@/design-system/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/design-system/components/ui/avatar";

export function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@johndoe</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@johndoe</h4>
            <p className="text-sm text-muted-foreground">
              Software Engineer at Company. Building open-source software.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}`,
  },
  {
    id: 'positions',
    label: 'Positions',
    preview: (
      <div className="flex flex-wrap gap-4">
        <HoverCard>
          <HoverCardTrigger>
            <Button variant="outline">Top</Button>
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <p className="text-sm">This content appears on top</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Button variant="outline">Right</Button>
          </HoverCardTrigger>
          <HoverCardContent side="right">
            <p className="text-sm">This content appears on the right</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Button variant="outline">Bottom</Button>
          </HoverCardTrigger>
          <HoverCardContent side="bottom">
            <p className="text-sm">This content appears on bottom</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Button variant="outline">Left</Button>
          </HoverCardTrigger>
          <HoverCardContent side="left">
            <p className="text-sm">This content appears on the left</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
    code: `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/design-system/components/ui/hover-card";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex flex-wrap gap-4">
      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Top</Button>} />
        <HoverCardContent side="top">
          <p className="text-sm">This content appears on top</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Right</Button>} />
        <HoverCardContent side="right">
          <p className="text-sm">This content appears on the right</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Bottom</Button>} />
        <HoverCardContent side="bottom">
          <p className="text-sm">This content appears on bottom</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Left</Button>} />
        <HoverCardContent side="left">
          <p className="text-sm">This content appears on the left</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}`,
  },
];

export default function HoverCardGuidePage() {
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
            For sighted users to preview content available behind a link. Displays a card when
            hovering over the trigger element.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the hover card components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>HoverCardContent component props.</CardDescription>
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
              <CardDescription>Common hover card patterns and configurations.</CardDescription>
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
