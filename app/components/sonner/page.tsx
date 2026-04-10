'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Sonner',
  group: 'ui',
  importPath: '@/design-system/components/ui/sonner',
} as const;

const props = [
  {
    name: 'position',
    type: `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`,
    defaultValue: `"bottom-right"`,
  },
  { name: 'richColors', type: 'boolean', defaultValue: 'false' },
  { name: 'closeButton', type: 'boolean', defaultValue: 'false' },
  { name: 'duration', type: 'number', defaultValue: '4000' },
];

const usageSamples = [
  {
    id: 'simple',
    label: 'Simple Toast',
    preview: (
      <Button variant="outline" onClick={() => toast('Event has been created')}>
        Show Toast
      </Button>
    ),
    code: `import { toast } from "sonner";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Button
      variant="outline"
      onClick={() => toast("Event has been created")}
    >
      Show Toast
    </Button>
  );
}`,
  },
  {
    id: 'with-description',
    label: 'With Description',
    preview: (
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Monday, January 3rd at 6:00pm',
          })
        }
      >
        Show Toast
      </Button>
    ),
    code: `import { toast } from "sonner";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm",
        })
      }
    >
      Show Toast
    </Button>
  );
}`,
  },
  {
    id: 'success',
    label: 'Success',
    preview: (
      <Button variant="outline" onClick={() => toast.success('Event has been created')}>
        Success Toast
      </Button>
    ),
    code: `import { toast } from "sonner";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Event has been created")}
    >
      Success Toast
    </Button>
  );
}`,
  },
  {
    id: 'error',
    label: 'Error',
    preview: (
      <Button variant="outline" onClick={() => toast.error('Event has not been created')}>
        Error Toast
      </Button>
    ),
    code: `import { toast } from "sonner";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.error("Event has not been created")}
    >
      Error Toast
    </Button>
  );
}`,
  },
];

export default function SonnerGuidePage() {
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
            An opinionated toast component for React. Built on top of sonner with theming support.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the toaster component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { Toaster } from "${guide.importPath}"`}</code>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { toast } from "sonner"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="setup" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Setup</CardTitle>
              <CardDescription>
                Add the Toaster component to your app layout with proper configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-5 text-card-foreground">
                <pre className="text-sm leading-6">
                  <code>{`<Toaster
  theme={theme as ToasterProps["theme"]}
  className="toaster group"
  icons={{
    success: <CircleCheckIcon className="size-4" />,
    info: <InfoIcon className="size-4" />,
    warning: <TriangleAlertIcon className="size-4" />,
    error: <OctagonXIcon className="size-4" />,
    loading: <Loader2Icon className="size-4 animate-spin" />,
  }}
  style={{
    "--normal-bg": "var(--popover)",
    "--normal-text": "var(--popover-foreground)",
    "--normal-border": "var(--border)",
    "--border-radius": "var(--radius)",
  } as React.CSSProperties}
  toastOptions={{
    classNames: {
      toast: "cn-toast",
    },
  }}
  {...props}
/>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. Props</CardTitle>
              <CardDescription>Toaster component props.</CardDescription>
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
              <CardTitle>4. Usages</CardTitle>
              <CardDescription>Common toast patterns and configurations.</CardDescription>
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

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-5 text-card-foreground">
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
            <a href="#setup" className="block transition hover:text-foreground">
              Setup
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

