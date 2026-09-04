'use client';

import { useForm } from 'react-hook-form';

import { RHFInput } from '@/components/rhf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const guide = {
  name: 'RHF Input',
  group: 'rhf',
  importPath: '@/design-system/components/rhf',
} as const;

const props = [
  { name: 'control', type: 'Control<T>', defaultValue: '--' },
  { name: 'name', type: 'Path<T>', defaultValue: '--' },
  { name: 'register', type: 'UseFormRegister<T>', defaultValue: '--' },
  { name: 'callback', type: '(newValue: string) => void', defaultValue: '--' },
  { name: 'label', type: 'string', defaultValue: '--' },
  { name: 'description', type: 'string', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'wrapperClassName', type: 'string', defaultValue: '--' },
  { name: 'labelClassName', type: 'string', defaultValue: '--' },
  { name: 'descriptionClassName', type: 'string', defaultValue: '--' },
  { name: 'errorClassName', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFInputExample />
      </div>
    ),
    code: `import { RHFInput } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <RHFInput
      control={control}
      register={register}
      name="email"
      type="email"
      placeholder="Enter your email"
    />
  );
}`,
  },
  {
    id: 'with-label',
    label: 'With Label',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFInputWithLabelExample />
      </div>
    ),
    code: `import { RHFInput } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <RHFInput
      control={control}
      register={register}
      name="email"
      label="Email"
      type="email"
      placeholder="Enter your email"
    />
  );
}`,
  },
  {
    id: 'with-error',
    label: 'With Error',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFInputWithErrorExample />
      </div>
    ),
    code: `import { RHFInput } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  return (
    <RHFInput
      control={control}
      register={register}
      name="email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      required
    />
  );
}`,
  },
];

function RHFInputExample() {
  const { control, register } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <RHFInput
      control={control}
      register={register}
      name="email"
      type="email"
      placeholder="Enter your email"
    />
  );
}

function RHFInputWithLabelExample() {
  const { control, register } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <RHFInput
      control={control}
      register={register}
      name="email"
      label="Email"
      type="email"
      placeholder="Enter your email"
    />
  );
}

function RHFInputWithErrorExample() {
  const { control, register } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  return (
    <RHFInput
      control={control}
      register={register}
      name="email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      required
    />
  );
}

export default function RHFInputGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            A React Hook Form input component with built-in error handling and validation support.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the RHF Input component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import { RHFInput } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>RHF Input component props.</CardDescription>
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
              <CardDescription>Common RHF Input patterns and configurations.</CardDescription>
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
