import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
} from '@/components/ui/item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MailIcon, BellIcon, SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { getGuide } from '../guide-data';

const guide = getGuide('item');

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

const props = [
  { name: 'variant', type: `"default" | "outline" | "muted"`, defaultValue: `"default"` },
  { name: 'size', type: `"default" | "sm" | "xs"`, defaultValue: `"default"` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const itemMediaProps = [
  { name: 'variant', type: `"default" | "icon" | "image"`, defaultValue: `"default"` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <ItemGroup className="w-full max-w-md">
        <Item>
          <ItemMedia variant="icon">
            <MailIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Email Notifications</ItemTitle>
            <ItemDescription>Receive emails about your account activity</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="icon-xs" variant="ghost">
              <SettingsIcon />
            </Button>
          </ItemActions>
        </Item>
        <Item>
          <ItemMedia variant="icon">
            <BellIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Push Notifications</ItemTitle>
            <ItemDescription>Receive push notifications on your device</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge>Active</Badge>
          </ItemActions>
        </Item>
      </ItemGroup>
    ),
    code: `import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
} from "@/design-system/components/ui/item";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { MailIcon, BellIcon, SettingsIcon } from "lucide-react";

export function Example() {
  return (
    <ItemGroup>
      <Item>
        <ItemMedia variant="icon">
          <MailIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Email Notifications</ItemTitle>
          <ItemDescription>Receive emails about your account activity</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="icon-xs" variant="ghost">
            <SettingsIcon />
          </Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemMedia variant="icon">
          <BellIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Push Notifications</ItemTitle>
          <ItemDescription>Receive push notifications on your device</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge>Active</Badge>
        </ItemActions>
      </Item>
    </ItemGroup>
  );
}`,
  },
  {
    id: 'variants',
    label: 'Variants',
    preview: (
      <ItemGroup className="w-full max-w-md">
        <Item variant="default">
          <ItemContent>
            <ItemTitle>Default Variant</ItemTitle>
            <ItemDescription>Transparent border, clean look</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Outline Variant</ItemTitle>
            <ItemDescription>Visible border around the item</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Muted Variant</ItemTitle>
            <ItemDescription>Subtle background color</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    ),
    code: `import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemGroup,
} from "@/design-system/components/ui/item";

export function Example() {
  return (
    <ItemGroup>
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>Transparent border, clean look</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>Visible border around the item</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>Subtle background color</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <ItemGroup className="w-full max-w-md">
        <Item size="default">
          <ItemContent>
            <ItemTitle>Default Size</ItemTitle>
            <ItemDescription>Standard padding and spacing</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="sm">
          <ItemContent>
            <ItemTitle>Small Size</ItemTitle>
            <ItemDescription>Compact padding and spacing</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="xs">
          <ItemContent>
            <ItemTitle>Extra Small Size</ItemTitle>
            <ItemDescription>Minimal padding for tight spaces</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    ),
    code: `import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemGroup,
} from "@/design-system/components/ui/item";

export function Example() {
  return (
    <ItemGroup>
      <Item size="default">
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>Standard padding and spacing</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>Compact padding and spacing</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="xs">
        <ItemContent>
          <ItemTitle>Extra Small Size</ItemTitle>
          <ItemDescription>Minimal padding for tight spaces</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}`,
  },
];

export default function ItemGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Item component for displaying structured list items with media, content, and actions.
            Composed of multiple sub-components for flexible layouts.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import the item components from the design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Item component sub-components and their props.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium">Item</h3>
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
                <h3 className="mb-3 text-sm font-medium">ItemMedia</h3>
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
                      {itemMediaProps.map((prop, index) => (
                        <tr
                          key={prop.name}
                          className={cn(
                            index !== itemMediaProps.length - 1 && 'border-border/70 border-b',
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
              <CardDescription>Common item patterns and configurations.</CardDescription>
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
