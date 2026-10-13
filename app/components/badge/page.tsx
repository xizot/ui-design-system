'use client';

import { Badge, BadgeAvatar, BadgeDismiss, BadgeDot, BadgeIcon } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('badge');

const props = [
  {
    name: 'variant',
    type: "'pill-color' | 'pill-outline' | 'badge-color' | 'badge-modern'",
    defaultValue: "'badge-modern'",
  },
  {
    name: 'color',
    type: "'neutral' | 'brand' | 'error' | 'warning' | 'success' | 'info' | 'purple'",
    defaultValue: "'neutral'",
  },
  { name: 'size', type: "'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'", defaultValue: "'md'" },
  { name: 'shape', type: "'default' | 'icon-only'", defaultValue: "'default'" },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const colors = ['neutral', 'brand', 'error', 'warning', 'success', 'info', 'purple'] as const;
const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

const usageSamples = [
  {
    id: 'variants',
    label: 'Variants',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="pill-color" color="brand">
          Pill color
        </Badge>
        <Badge variant="pill-outline" color="brand">
          Pill outline
        </Badge>
        <Badge variant="badge-color" color="brand">
          Badge color
        </Badge>
        <Badge variant="badge-modern" color="brand">
          Badge modern
        </Badge>
      </div>
    ),
    code: `<Badge variant="pill-color" color="brand">Pill color</Badge>
<Badge variant="pill-outline" color="brand">Pill outline</Badge>
<Badge variant="badge-color" color="brand">Badge color</Badge>
<Badge variant="badge-modern" color="brand">Badge modern</Badge>`,
  },
  {
    id: 'colors',
    label: 'Colors',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color) => (
          <Badge key={color} variant="pill-color" color={color}>
            {color}
          </Badge>
        ))}
      </div>
    ),
    code: `<Badge variant="pill-color" color="success">Success</Badge>
<Badge variant="pill-outline" color="warning">Warning</Badge>
<Badge variant="badge-modern" color="error">Error</Badge>`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <Badge key={size} variant="badge-color" color="info" size={size}>
            {size.toUpperCase()}
          </Badge>
        ))}
      </div>
    ),
    code: `<Badge size="xxs">XXS</Badge>
<Badge size="xs">XS</Badge>
<Badge size="sm">SM</Badge>
<Badge size="md">MD</Badge>
<Badge size="lg">LG</Badge>
<Badge size="xl">XL</Badge>
<Badge size="xxl">XXL</Badge>`,
  },
  {
    id: 'content',
    label: 'Content',
    preview: <BadgeContentDemo />,
    code: `import { Badge, BadgeAvatar, BadgeDismiss, BadgeDot, BadgeIcon } from "@/design-system/components/ui/badge";

<Badge variant="pill-color" color="success"><BadgeDot />Active</Badge>
<Badge variant="badge-modern" color="brand"><BadgeIcon><CheckIcon /></BadgeIcon>Verified</Badge>
<Badge variant="pill-outline"><BadgeAvatar name="Nguyen Van An" />Nguyen Van An</Badge>
<Badge variant="badge-color" color="info">Filter<BadgeDismiss label="Remove filter" onClick={removeFilter} /></Badge>
<Badge variant="pill-color" color="success" shape="icon-only" aria-label="Active"><BadgeDot /></Badge>`,
  },
];

function BadgeContentDemo() {
  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="pill-color" color="success">
        <BadgeDot />
        Active
      </Badge>
      <Badge variant="badge-modern" color="brand">
        <BadgeIcon>
          <CheckIcon />
        </BadgeIcon>
        Verified
      </Badge>
      <Badge variant="pill-outline" color="neutral">
        <BadgeAvatar name="Nguyen Van An" />
        Nguyen Van An
      </Badge>
      {showFilter ? (
        <Badge variant="badge-color" color="info">
          Filter
          <BadgeDismiss label="Remove filter" onClick={() => setShowFilter(false)} />
        </Badge>
      ) : null}
      <Badge variant="pill-color" color="success" shape="icon-only" aria-label="Active">
        <BadgeDot />
      </Badge>
    </div>
  );
}

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
                code={`import { Badge, BadgeAvatar, BadgeDismiss, BadgeDot, BadgeIcon } from "${guide.importPath}"`}
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
                      <div className="bg-background flex min-h-56 items-center justify-center rounded-[18px] px-6 shadow-sm">
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
