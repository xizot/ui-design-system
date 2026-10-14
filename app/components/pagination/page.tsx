'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { PaginationControl } from '@/components/ui/pagination-control';

import { getGuide } from '../guide-data';

const guide = getGuide('pagination');

const props = [
  { name: 'isActive', type: 'boolean', defaultValue: 'false' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const controlProps = [
  ['totalCount', 'number', 'Required; total records, not current page length'],
  ['pageSize', 'number', 'Required; positive integer'],
  ['pageIndex', 'number', 'Required; zero-based current page'],
  ['onPageChange', '(pageIndex: number) => void', 'Required; update parent state or fetch data'],
  ['siblingCount', 'number', '1; neighboring pages on each side'],
  ['disabled', 'boolean', 'false; disable navigation while loading'],
  ['previousText / nextText', 'string', 'Previous / Next; empty string for icons only'],
  ['className', 'string', 'Optional; applied to the navigation container'],
];

const controlCode = `'use client';

import { useState } from 'react';
import { PaginationControl } from '@/design-system/components/ui/pagination-control';

export function Example() {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <PaginationControl
      totalCount={250}
      pageSize={20}
      pageIndex={pageIndex}
      onPageChange={setPageIndex}
      previousText="Trước"
      nextText="Sau"
    />
  );
}`;

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    code: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/design-system/components/ui/pagination";

export function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`,
  },
  {
    id: 'compact',
    label: 'Compact',
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    code: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/design-system/components/ui/pagination";

export function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`,
  },
  {
    id: 'with-ellipsis',
    label: 'With Ellipsis',
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>11</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>20</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    code: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/design-system/components/ui/pagination";

export function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>11</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>20</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`,
  },
];

export default function PaginationGuidePage() {
  const [pageIndex, setPageIndex] = useState(0);
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
            Pagination component with page navigation controls including previous/next buttons, page
            links, and ellipsis for large page counts.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="pagination-control" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>PaginationControl — automatic pagination</CardTitle>
              <CardDescription>
                Pass totals and controlled page state to generate page buttons, ellipses and
                Previous/Next controls. Use the primitives below for custom composition.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="border-border bg-muted/30 space-y-3 rounded-2xl border p-4">
                <PaginationControl
                  totalCount={250}
                  pageSize={20}
                  pageIndex={pageIndex}
                  onPageChange={setPageIndex}
                  previousText="Trước"
                  nextText="Sau"
                />
                <p className="text-muted-foreground text-sm" aria-live="polite">
                  Page {pageIndex + 1} / 13 · pageIndex = {pageIndex}
                </p>
              </div>
              <CodeBlock code={controlCode} id="pagination-control-example" />
              <p className="text-muted-foreground text-sm leading-6">
                Hover or focus an ellipsis to show double chevrons. Click, Enter or Space jumps 2
                pages in that direction, clamped to the first/last page. On containers narrower than
                320px, only the first, current and last page numbers are shown, with jump controls
                for gaps. The disabled prop also disables these jump controls.
              </p>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="px-4 py-3">Prop</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Behavior / default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {controlProps.map(([name, type, description]) => (
                      <tr key={name} className="border-t">
                        <td className="px-4 py-3 font-medium">{name}</td>
                        <td className="px-4 py-3">{type}</td>
                        <td className="px-4 py-3">{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground text-sm leading-6">
                pageIndex starts at 0; displayed page numbers start at 1. totalCount = 0 renders
                nothing. Previous/Next are disabled at the first/last page. Counts and indexes must
                be non-negative integers; pageSize must be positive.
              </p>
              <p className="text-muted-foreground text-sm leading-6">
                The component does not fetch or slice data. For server pagination, use pageIndex ×
                pageSize as the offset and pass disabled while loading. Reset pageIndex to 0 when
                changing filters or pageSize. If totals shrink, the UI displays the last valid page
                without updating parent state or calling onPageChange.
              </p>
            </CardContent>
          </Card>

          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the pagination components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Pagination component props.</CardDescription>
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
              <CardDescription>Common pagination patterns and configurations.</CardDescription>
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
                      <div className="bg-background flex min-h-56 items-center justify-center rounded-[18px] px-6 shadow-sm">
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
            <a href="#pagination-control" className="hover:text-foreground block transition">
              PaginationControl
            </a>
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
