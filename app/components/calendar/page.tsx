'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('calendar');

const props = [
  { name: 'mode', type: `"single" | "range" | "multiple"`, defaultValue: `"single"` },
  { name: 'selected', type: 'Date | Date[]', defaultValue: '--' },
  { name: 'defaultSelected', type: 'Date | Date[]', defaultValue: '--' },
  { name: 'onSelect', type: '(date: Date | Date[]) => void', defaultValue: '--' },
  { name: 'disabled', type: '(date: Date) => boolean', defaultValue: '--' },
  { name: 'numberOfMonths', type: 'number', defaultValue: '1' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'single',
    label: 'Single',
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="border-border bg-card rounded-lg border p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">January 2026</span>
              <div className="flex gap-1">
                <button className="hover:bg-accent rounded p-1">←</button>
                <button className="hover:bg-accent rounded p-1">→</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <span className="text-muted-foreground">Su</span>
              <span className="text-muted-foreground">Mo</span>
              <span className="text-muted-foreground">Tu</span>
              <span className="text-muted-foreground">We</span>
              <span className="text-muted-foreground">Th</span>
              <span className="text-muted-foreground">Fr</span>
              <span className="text-muted-foreground">Sa</span>
              <span className="text-muted-foreground p-2">29</span>
              <span className="text-muted-foreground p-2">30</span>
              <span className="text-muted-foreground p-2">31</span>
              <span className="p-2">1</span>
              <span className="p-2">2</span>
              <span className="p-2">3</span>
              <span className="p-2">4</span>
              <span className="p-2">5</span>
              <span className="p-2">6</span>
              <span className="p-2">7</span>
              <span className="p-2">8</span>
              <span className="p-2">9</span>
              <span className="bg-primary text-primary-foreground rounded p-2">10</span>
              <span className="p-2">11</span>
              <span className="p-2">12</span>
              <span className="p-2">13</span>
              <span className="p-2">14</span>
              <span className="p-2">15</span>
              <span className="p-2">16</span>
              <span className="p-2">17</span>
              <span className="p-2">18</span>
              <span className="p-2">19</span>
              <span className="p-2">20</span>
              <span className="p-2">21</span>
              <span className="p-2">22</span>
              <span className="p-2">23</span>
              <span className="p-2">24</span>
              <span className="p-2">25</span>
              <span className="p-2">26</span>
              <span className="p-2">27</span>
              <span className="p-2">28</span>
              <span className="p-2">29</span>
              <span className="p-2">30</span>
              <span className="p-2">31</span>
              <span className="text-muted-foreground p-2">1</span>
            </div>
          </div>
        </div>
      </div>
    ),
    code: `import { Calendar } from "@/design-system/components/ui/calendar";
import { useState } from "react";

function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}`,
  },
];

export default function CalendarGuidePage() {
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
            A calendar component for date selection with support for single, range, and multiple
            modes.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Calendar component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Calendar } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Calendar component props.</CardDescription>
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
              <CardDescription>Common Calendar patterns and configurations.</CardDescription>
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
