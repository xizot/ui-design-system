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

import { getGuide } from '../guide-data';

const guide = getGuide('typography');

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
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <TypographySmall className="text-sm tracking-[0.24em] uppercase">
            {guide.group}
          </TypographySmall>
          <TypographyH1 className="mt-4">{guide.name}</TypographyH1>
          <TypographyLead className="mt-4 max-w-2xl">
            Primitive typography components để đồng bộ heading, body, caption và inline code cho
            docs hoặc các màn hình nhiều nội dung.
          </TypographyLead>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
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

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                Mỗi primitive nhận native props của phần tử tương ứng và className.
              </CardDescription>
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
                    <div className="border-border bg-muted/30 rounded-[20px] border border-dashed p-8">
                      <div className="bg-card rounded-[18px] px-6 py-8 shadow-sm">
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
          <TypographySmall className="tracking-[0.24em] uppercase">TOC</TypographySmall>
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
