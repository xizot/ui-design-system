'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('progress');

const props = [
  { name: 'value', type: 'number', defaultValue: '0' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: <Progress value={60} />,
    code: `import { Progress } from "@/design-system/components/ui/progress";

export function Example() {
  return <Progress value={60} />;
}`,
  },
  {
    id: 'with-label',
    label: 'With Label',
    preview: (
      <div className="w-full max-w-md">
        <Progress value={60}>
          <ProgressLabel>Uploading...</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
    ),
    code: `import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/design-system/components/ui/progress";

export function Example() {
  return (
    <Progress value={60}>
      <ProgressLabel>Uploading...</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}`,
  },
  {
    id: 'values',
    label: 'Values',
    preview: (
      <div className="w-full max-w-md space-y-4">
        <Progress value={0}>
          <ProgressLabel>0%</ProgressLabel>
          <ProgressValue />
        </Progress>
        <Progress value={25}>
          <ProgressLabel>25%</ProgressLabel>
          <ProgressValue />
        </Progress>
        <Progress value={50}>
          <ProgressLabel>50%</ProgressLabel>
          <ProgressValue />
        </Progress>
        <Progress value={75}>
          <ProgressLabel>75%</ProgressLabel>
          <ProgressValue />
        </Progress>
        <Progress value={100}>
          <ProgressLabel>100%</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
    ),
    code: `import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/design-system/components/ui/progress";

export function Example() {
  return (
    <div className="space-y-4">
      <Progress value={25}>
        <ProgressLabel>25%</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={50}>
        <ProgressLabel>50%</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={75}>
        <ProgressLabel>75%</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  );
}`,
  },
];

export default function ProgressGuidePage() {
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
            Displays an indicator showing the completion progress of a task, typically displayed as
            a progress bar.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the progress components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Progress } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Progress component props.</CardDescription>
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
              <CardDescription>Common progress patterns and configurations.</CardDescription>
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
