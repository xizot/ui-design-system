'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Hover Card',
  group: 'ui',
  importPath: '@/design-system/components/ui/hover-card',
} as const;

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
              <p className="text-sm text-muted-foreground">
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
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            For sighted users to preview content available behind a link. Displays a card when
            hovering over the trigger element.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
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

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>HoverCardContent component props.</CardDescription>
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

          <Card id="usages" className="rounded-[24px] border-border/70">
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
            <a href="#usages" className="block transition hover:text-foreground">
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
