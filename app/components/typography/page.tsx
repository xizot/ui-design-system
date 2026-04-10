'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TypographyCode,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Typography',
  group: 'ui',
  importPath: '@/design-system/components/ui/typography',
} as const;

const props = [
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'children', type: 'ReactNode', defaultValue: '--' },
  { name: '...props', type: 'native element props', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'headings',
    label: 'Headings',
    preview: (
      <div className="space-y-3">
        <TypographyH1>Tiêu đề trang chính</TypographyH1>
        <TypographyH2>Tiêu đề section</TypographyH2>
        <TypographyH3>Tiêu đề nhóm nội dung</TypographyH3>
        <TypographyH4>Tiêu đề nhỏ</TypographyH4>
      </div>
    ),
    code: `import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/design-system/components/ui/typography";

export function Example() {
  return (
    <div className="space-y-3">
      <TypographyH1>Tiêu đề trang chính</TypographyH1>
      <TypographyH2>Tiêu đề section</TypographyH2>
      <TypographyH3>Tiêu đề nhóm nội dung</TypographyH3>
      <TypographyH4>Tiêu đề nhỏ</TypographyH4>
    </div>
  );
}`,
  },
  {
    id: 'content',
    label: 'Content',
    preview: (
      <div className="max-w-2xl space-y-3">
        <TypographyLead>
          Typography primitives giúp docs và các màn hình nhiều nội dung giữ cùng một nhịp heading,
          body và caption.
        </TypographyLead>
        <TypographyP>
          Dùng nhóm component này cho docs, article-like content, section intro hoặc những chỗ cần
          text system ổn định theo theme.
        </TypographyP>
        <TypographyMuted>
          Không nên dùng nó để thay thế toàn bộ text bên trong button, label hay form controls.
        </TypographyMuted>
        <TypographySmall>Caption / metadata / supporting text</TypographySmall>
      </div>
    ),
    code: `import {
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@/design-system/components/ui/typography";

export function Example() {
  return (
    <div className="max-w-2xl space-y-3">
      <TypographyLead>
        Typography primitives giúp docs và các màn hình nhiều nội dung giữ cùng một nhịp.
      </TypographyLead>
      <TypographyP>
        Dùng nhóm component này cho docs, article-like content và section intro.
      </TypographyP>
      <TypographyMuted>
        Không nên dùng nó để thay thế text styling của form controls.
      </TypographyMuted>
      <TypographySmall>Caption / metadata / supporting text</TypographySmall>
    </div>
  );
}`,
  },
  {
    id: 'inline-code',
    label: 'Inline Code',
    preview: (
      <TypographyP>
        Import component bằng <TypographyCode>{guide.importPath}</TypographyCode> để reuse trong
        docs layer.
      </TypographyP>
    ),
    code: `import { TypographyCode, TypographyP } from "@/design-system/components/ui/typography";

export function Example() {
  return (
    <TypographyP>
      Import component bằng <TypographyCode>@/design-system/components/ui/typography</TypographyCode>.
    </TypographyP>
  );
}`,
  },
];

export default function TypographyGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <TypographySmall className="text-sm uppercase tracking-[0.24em]">
            {guide.group}
          </TypographySmall>
          <TypographyH1 className="mt-4">{guide.name}</TypographyH1>
          <TypographyLead className="mt-4 max-w-2xl">
            Primitive typography components để đồng bộ heading, body, caption và inline code cho
            docs hoặc các màn hình nhiều nội dung.
          </TypographyLead>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import các primitive typography từ design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
  TypographyCode,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                Mỗi primitive nhận native props của phần tử tương ứng và className.
              </CardDescription>
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
                Dùng typography primitives cho docs, section intro và các khối nội dung dài.
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
                      <div className="rounded-[18px] bg-card px-6 py-8 shadow-sm">
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
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <TypographySmall className="uppercase tracking-[0.24em]">TOC</TypographySmall>
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
