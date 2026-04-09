import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from '@/components/ui/native-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const guide = {
  name: 'Native Select',
  group: 'ui',
  importPath: '@/design-system/components/ui/native-select',
} as const;

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

const props = [
  { name: 'size', type: `"sm" | "default"`, defaultValue: `"default"` },
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <NativeSelect>
        <NativeSelectOption value="">Select a fruit</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="orange">Orange</NativeSelectOption>
        <NativeSelectOption value="grape">Grape</NativeSelectOption>
      </NativeSelect>
    ),
    code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/design-system/components/ui/native-select";

export function Example() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="orange">Orange</NativeSelectOption>
      <NativeSelectOption value="grape">Grape</NativeSelectOption>
    </NativeSelect>
  );
}`,
  },
  {
    id: 'small',
    label: 'Small',
    preview: (
      <NativeSelect size="sm">
        <NativeSelectOption value="">Select option</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
        <NativeSelectOption value="2">Option 2</NativeSelectOption>
      </NativeSelect>
    ),
    code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/design-system/components/ui/native-select";

export function Example() {
  return (
    <NativeSelect size="sm">
      <NativeSelectOption value="">Select option</NativeSelectOption>
      <NativeSelectOption value="1">Option 1</NativeSelectOption>
      <NativeSelectOption value="2">Option 2</NativeSelectOption>
    </NativeSelect>
  );
}`,
  },
  {
    id: 'with-optgroup',
    label: 'With Groups',
    preview: (
      <NativeSelect>
        <NativeSelectOption value="">Select a car</NativeSelectOption>
        <NativeSelectOptGroup label="German Cars">
          <NativeSelectOption value="bmw">BMW</NativeSelectOption>
          <NativeSelectOption value="mercedes">Mercedes</NativeSelectOption>
          <NativeSelectOption value="audi">Audi</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Japanese Cars">
          <NativeSelectOption value="toyota">Toyota</NativeSelectOption>
          <NativeSelectOption value="honda">Honda</NativeSelectOption>
          <NativeSelectOption value="nissan">Nissan</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    ),
    code: `import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/design-system/components/ui/native-select";

export function Example() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select a car</NativeSelectOption>
      <NativeSelectOptGroup label="German Cars">
        <NativeSelectOption value="bmw">BMW</NativeSelectOption>
        <NativeSelectOption value="mercedes">Mercedes</NativeSelectOption>
        <NativeSelectOption value="audi">Audi</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Japanese Cars">
        <NativeSelectOption value="toyota">Toyota</NativeSelectOption>
        <NativeSelectOption value="honda">Honda</NativeSelectOption>
        <NativeSelectOption value="nissan">Nissan</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}`,
  },
  {
    id: 'disabled',
    label: 'Disabled',
    preview: (
      <NativeSelect disabled>
        <NativeSelectOption value="">Select option</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
      </NativeSelect>
    ),
    code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/design-system/components/ui/native-select";

export function Example() {
  return (
    <NativeSelect disabled>
      <NativeSelectOption value="">Select option</NativeSelectOption>
      <NativeSelectOption value="1">Option 1</NativeSelectOption>
    </NativeSelect>
  );
}`,
  },
];

export default function NativeSelectGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Native select component styled to match the design system. Uses the native select
            element for maximum compatibility and accessibility.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the native select components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>NativeSelect component props.</CardDescription>
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
              <CardDescription>Common native select patterns and configurations.</CardDescription>
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
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
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
