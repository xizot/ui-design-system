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
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-col items-start gap-3">
        <NativeSelect size="sm">
          <NativeSelectOption value="">Small select</NativeSelectOption>
          <NativeSelectOption value="1">Option 1</NativeSelectOption>
          <NativeSelectOption value="2">Option 2</NativeSelectOption>
        </NativeSelect>
        <NativeSelect>
          <NativeSelectOption value="">Default select</NativeSelectOption>
          <NativeSelectOption value="1">Option 1</NativeSelectOption>
          <NativeSelectOption value="2">Option 2</NativeSelectOption>
        </NativeSelect>
      </div>
    ),
    code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/design-system/components/ui/native-select";

export function Example() {
  return (
    <div className="flex flex-col items-start gap-3">
      <NativeSelect size="sm">
        <NativeSelectOption value="">Small select</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
        <NativeSelectOption value="2">Option 2</NativeSelectOption>
      </NativeSelect>
      <NativeSelect>
        <NativeSelectOption value="">Default select</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
        <NativeSelectOption value="2">Option 2</NativeSelectOption>
      </NativeSelect>
    </div>
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
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Native select component styled to match the design system. Uses the native select
            element for maximum compatibility and accessibility.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the native select components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>NativeSelect component props.</CardDescription>
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
