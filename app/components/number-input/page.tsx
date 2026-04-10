'use client';

import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const guide = {
  name: 'Number Input',
  group: 'ui',
  importPath: '@/design-system/components/ui/number-input',
} as const;

const props = [
  { name: 'label', type: 'string | React.ReactNode', defaultValue: '--' },
  { name: 'format', type: "'integer' | 'decimal'", defaultValue: "'integer'" },
  { name: 'max', type: 'number', defaultValue: '999999999999' },
  { name: 'allowNegative', type: 'boolean', defaultValue: 'false' },
  { name: 'decimalMaxFractionDigits', type: 'number', defaultValue: '3' },
  { name: 'placeholder', type: 'string', defaultValue: '--' },
  { name: 'value', type: 'number', defaultValue: '--' },
  {
    name: 'onChange',
    type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
    defaultValue: '--',
  },
  { name: 'wrapperClassName', type: 'string', defaultValue: '--' },
  { name: 'inputClassName', type: 'string', defaultValue: '--' },
  { name: 'rightOutside', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'error', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <NumberInputExample />
      </div>
    ),
    code: `import { NumberInput } from "@/design-system/components/ui/number-input";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <NumberInput
      label="Amount"
      placeholder="Enter amount"
      value={value}
      onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
    />
  );
}`,
  },
  {
    id: 'integer',
    label: 'Integer',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <NumberInputIntegerExample />
      </div>
    ),
    code: `import { NumberInput } from "@/design-system/components/ui/number-input";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <NumberInput
      label="Quantity"
      placeholder="Enter quantity"
      format="integer"
      value={value}
      onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
    />
  );
}`,
  },
  {
    id: 'decimal',
    label: 'Decimal',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <NumberInputDecimalExample />
      </div>
    ),
    code: `import { NumberInput } from "@/design-system/components/ui/number-input";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <NumberInput
      label="Price"
      placeholder="Enter price"
      format="decimal"
      decimalMaxFractionDigits={2}
      value={value}
      onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
    />
  );
}`,
  },
  {
    id: 'with-error',
    label: 'With Error',
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <NumberInputErrorExample />
      </div>
    ),
    code: `import { NumberInput } from "@/design-system/components/ui/number-input";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value ? parseFloat(e.target.value) : undefined;
    setValue(num);
    if (num !== undefined && num > 1000) {
      setError('Value cannot exceed 1000');
    } else {
      setError('');
    }
  };

  return (
    <NumberInput
      label="Amount"
      placeholder="Enter amount"
      value={value}
      onChange={handleChange}
      error={error}
    />
  );
}`,
  },
];

function NumberInputExample() {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <NumberInput
      label="Amount"
      placeholder="Enter amount"
      value={value}
      onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
    />
  );
}

function NumberInputIntegerExample() {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <NumberInput
      label="Quantity"
      placeholder="Enter quantity"
      format="integer"
      value={value}
      onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
    />
  );
}

function NumberInputDecimalExample() {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <NumberInput
      label="Price"
      placeholder="Enter price"
      format="decimal"
      decimalMaxFractionDigits={2}
      value={value}
      onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
    />
  );
}

function NumberInputErrorExample() {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value ? parseFloat(e.target.value) : undefined;
    setValue(num);
    if (num !== undefined && num > 1000) {
      setError('Value cannot exceed 1000');
    } else {
      setError('');
    }
  };

  return (
    <NumberInput
      label="Amount"
      placeholder="Enter amount"
      value={value}
      onChange={handleChange}
      error={error}
    />
  );
}

export default function NumberInputGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A formatted number input component with support for integer and decimal formats,
            automatic number formatting, and validation.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Number Input component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { NumberInput } from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Number Input component props.</CardDescription>
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
              <CardDescription>Common Number Input patterns and configurations.</CardDescription>
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
