'use client';

import { RHFTextarea } from '@/components/rhf';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const guide = {
  name: 'RHF Textarea',
  group: 'rhf',
  importPath: '@/design-system/components/rhf',
} as const;

const props = [
  { name: 'control', type: 'Control<T>', defaultValue: '--' },
  { name: 'name', type: 'Path<T>', defaultValue: '--' },
  { name: 'register', type: 'UseFormRegister<T>', defaultValue: '--' },
  { name: 'callback', type: '(newValue: string) => void', defaultValue: '--' },
  { name: 'showMaxLength', type: 'boolean', defaultValue: 'true' },
  { name: 'maxLength', type: 'number', defaultValue: '512' },
  { name: 'rows', type: 'number', defaultValue: '5' },
  { name: 'label', type: 'string', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'labelClassName', type: 'string', defaultValue: '--' },
  { name: 'errorClassName', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFTextareaExample />
      </div>
    ),
    code: `import { RHFTextarea } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control, register } = useForm({
    defaultValues: {
      description: "",
    },
  });

  return (
    <RHFTextarea
      control={control}
      register={register}
      name="description"
      label="Description"
      placeholder="Enter a description"
    />
  );
}`,
  },
  {
    id: 'with-maxlength',
    label: 'With Max Length',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFTextareaWithMaxLengthExample />
      </div>
    ),
    code: `import { RHFTextarea } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

function Example() {
  const { control, register } = useForm({
    defaultValues: {
      bio: "",
    },
  });

  return (
    <RHFTextarea
      control={control}
      register={register}
      name="bio"
      label="Bio"
      required
      placeholder="Enter your bio"
      maxLength={512}
      showMaxLength
    />
  );
}`,
  },
];

function RHFTextareaExample() {
  const { control, register } = useForm({
    defaultValues: {
      description: '',
    },
  });

  return (
    <RHFTextarea
      control={control}
      register={register}
      name="description"
      label="Description"
      placeholder="Enter a description"
    />
  );
}

function RHFTextareaWithMaxLengthExample() {
  const { control, register } = useForm({
    defaultValues: {
      bio: '',
    },
  });

  return (
    <RHFTextarea
      control={control}
      register={register}
      name="bio"
      label="Bio"
      required
      placeholder="Enter your bio"
      maxLength={512}
      showMaxLength
    />
  );
}

export default function RHFTextareaGuidePage() {
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
            A React Hook Form textarea component with built-in error handling, validation support,
            and character counter.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the RHF Textarea component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { RHFTextarea } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>RHF Textarea component props.</CardDescription>
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
              <CardDescription>Common RHF Textarea patterns and configurations.</CardDescription>
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
