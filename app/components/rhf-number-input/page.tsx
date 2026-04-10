'use client';

import { useForm } from 'react-hook-form';

import { RHFNumberInput } from '@/components/rhf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const guide = {
  name: 'RHF Number Input',
  group: 'rhf',
  importPath: '@/design-system/components/rhf',
} as const;

const props = [
  { name: 'control', type: 'Control<T>', defaultValue: '--' },
  { name: 'name', type: 'Path<T>', defaultValue: '--' },
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'format', type: "'integer' | 'decimal'", defaultValue: "'integer'" },
  { name: 'max', type: 'number', defaultValue: '999999999999' },
  { name: 'allowNegative', type: 'boolean', defaultValue: 'false' },
  { name: 'decimalMaxFractionDigits', type: 'number', defaultValue: '3' },
  { name: 'placeholder', type: 'string', defaultValue: '--' },
  { name: 'callback', type: '(value: string) => void', defaultValue: '--' },
  { name: 'wrapperClassName', type: 'string', defaultValue: '--' },
  { name: 'inputClassName', type: 'string', defaultValue: '--' },
  { name: 'rightOutside', type: 'React.ReactNode', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFNumberInputExample />
      </div>
    ),
    code: `import { useForm } from "react-hook-form";
import RHFNumberInput from "@/design-system/components/rhf/rhf-number-input";

function Example() {
  const { control } = useForm({
    defaultValues: {
      amount: undefined,
    },
  });

  return (
    <RHFNumberInput
      control={control}
      name="amount"
      label="Amount"
      placeholder="Enter amount"
    />
  );
}`,
  },
  {
    id: 'integer',
    label: 'Integer',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFNumberInputIntegerExample />
      </div>
    ),
    code: `import { useForm } from "react-hook-form";
import RHFNumberInput from "@/design-system/components/rhf/rhf-number-input";

function Example() {
  const { control } = useForm({
    defaultValues: {
      quantity: undefined,
    },
  });

  return (
    <RHFNumberInput
      control={control}
      name="quantity"
      label="Quantity"
      placeholder="Enter quantity"
      format="integer"
    />
  );
}`,
  },
  {
    id: 'decimal',
    label: 'Decimal',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <RHFNumberInputDecimalExample />
      </div>
    ),
    code: `import { useForm } from "react-hook-form";
import RHFNumberInput from "@/design-system/components/rhf/rhf-number-input";

function Example() {
  const { control } = useForm({
    defaultValues: {
      price: undefined,
    },
  });

  return (
    <RHFNumberInput
      control={control}
      name="price"
      label="Price"
      placeholder="Enter price"
      format="decimal"
      decimalMaxFractionDigits={2}
    />
  );
}`,
  },
];

function RHFNumberInputExample() {
  const { control } = useForm({
    defaultValues: {
      amount: undefined,
    },
  });

  return (
    <RHFNumberInput control={control} name="amount" label="Amount" placeholder="Enter amount" />
  );
}

function RHFNumberInputIntegerExample() {
  const { control } = useForm({
    defaultValues: {
      quantity: undefined,
    },
  });

  return (
    <RHFNumberInput
      control={control}
      name="quantity"
      label="Quantity"
      placeholder="Enter quantity"
      format="integer"
    />
  );
}

function RHFNumberInputDecimalExample() {
  const { control } = useForm({
    defaultValues: {
      price: undefined,
    },
  });

  return (
    <RHFNumberInput
      control={control}
      name="price"
      label="Price"
      placeholder="Enter price"
      format="decimal"
      decimalMaxFractionDigits={2}
    />
  );
}

export default function RHFNumberInputGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A React Hook Form wrapper for Number Input component with automatic number formatting
            and validation support.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the RHF Number Input component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import RHFNumberInput from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>RHF Number Input component props.</CardDescription>
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
              <CardDescription>
                Common RHF Number Input patterns and configurations.
              </CardDescription>
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

