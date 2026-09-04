'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Button Group',
  group: 'ui',
  importPath: '@/design-system/components/ui/button-group',
} as const;

const props = [
  { name: 'orientation', type: `"horizontal" | "vertical"`, defaultValue: `"horizontal"` },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    ),
    code: `import { ButtonGroup } from "@/design-system/components/ui/button-group";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-col items-start gap-4">
        <ButtonGroup>
          <Button size="xs">XS</Button>
          <Button size="xs" variant="outline">
            XS
          </Button>
          <Button size="xs" variant="outline">
            XS
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="sm">Small</Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button>Default</Button>
          <Button variant="outline">Default</Button>
          <Button variant="outline">Default</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="lg">Large</Button>
          <Button size="lg" variant="outline">
            Large
          </Button>
          <Button size="lg" variant="outline">
            Large
          </Button>
        </ButtonGroup>
      </div>
    ),
    code: `import { ButtonGroup } from "@/design-system/components/ui/button-group";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button size="xs">XS</Button>
        <Button size="xs" variant="outline">XS</Button>
        <Button size="xs" variant="outline">XS</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="sm">Small</Button>
        <Button size="sm" variant="outline">Small</Button>
        <Button size="sm" variant="outline">Small</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Default</Button>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Default</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="lg">Large</Button>
        <Button size="lg" variant="outline">Large</Button>
        <Button size="lg" variant="outline">Large</Button>
      </ButtonGroup>
    </div>
  );
}`,
  },
  {
    id: 'outline',
    label: 'Outline',
    preview: (
      <ButtonGroup>
        <Button variant="outline">Button 1</Button>
        <Button variant="outline">Button 2</Button>
        <Button variant="outline">Button 3</Button>
      </ButtonGroup>
    ),
    code: `import { ButtonGroup } from "@/design-system/components/ui/button-group";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Button 1</Button>
      <Button variant="outline">Button 2</Button>
      <Button variant="outline">Button 3</Button>
    </ButtonGroup>
  );
}`,
  },
];

export default function ButtonGroupGuidePage() {
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
            Groups related buttons together in a single container.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the button group components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { ButtonGroup } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>ButtonGroup component props.</CardDescription>
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
              <CardDescription>Common button group patterns and configurations.</CardDescription>
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
