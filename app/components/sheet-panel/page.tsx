'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { SheetPanel, SheetPanelRoot, SheetPanelTrigger } from '@/components/ui/sheet-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const guide = {
  name: 'Sheet Panel',
  group: 'ui',
  importPath: '@/design-system/components/ui/sheet-panel',
} as const;

const props = [
  { name: 'size', type: `"sm" | "md" | "lg" | "xl" | "auto"`, defaultValue: `"sm"` },
  { name: 'side', type: `"top" | "right" | "bottom" | "left"`, defaultValue: `"right"` },
  { name: 'title', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'description', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'footer', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'showCloseButton', type: 'boolean', defaultValue: 'true' },
];

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <SheetPanelRoot>
        <SheetPanelTrigger render={<Button variant="outline">Mở panel</Button>} />
        <SheetPanel
          title="Cập nhật hồ sơ"
          description="Dùng layout thống nhất cho side panel."
          footer={
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline">Hủy</Button>
              <Button>Lưu thay đổi</Button>
            </div>
          }
        >
          <div className="grid gap-3">
            <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
            <Input label="Email" placeholder="name@company.vn" />
          </div>
        </SheetPanel>
      </SheetPanelRoot>
    ),
    code: `import {
  SheetPanel,
  SheetPanelRoot,
  SheetPanelTrigger,
} from "@/design-system/components/ui/sheet-panel";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <SheetPanelRoot>
      <SheetPanelTrigger render={<Button variant="outline">Mở panel</Button>} />
      <SheetPanel
        title="Cập nhật hồ sơ"
        description="Dùng layout thống nhất cho side panel."
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline">Hủy</Button>
            <Button>Lưu thay đổi</Button>
          </div>
        }
      >
        <div className="grid gap-3">
          <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
          <Input label="Email" placeholder="name@company.vn" />
        </div>
      </SheetPanel>
    </SheetPanelRoot>
  );
}`,
  },
  {
    id: 'size-side',
    label: 'Size & Side',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <SheetPanelRoot key={size}>
            <SheetPanelTrigger render={<Button variant="outline">{`right ${size}`}</Button>} />
            <SheetPanel
              side="right"
              size={size}
              title={`Panel ${size}`}
              footer={
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline">Đóng</Button>
                  <Button>Tiếp tục</Button>
                </div>
              }
            >
              <p className="text-sm text-muted-foreground">
                Preset kích thước ${size} cho sheet panel.
              </p>
            </SheetPanel>
          </SheetPanelRoot>
        ))}
      </div>
    ),
    code: `import {
  SheetPanel,
  SheetPanelRoot,
  SheetPanelTrigger,
} from "@/design-system/components/ui/sheet-panel";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex gap-3">
      {(["sm", "md", "lg", "xl", "auto"] as const).map((size) => (
        <SheetPanelRoot key={size}>
          <SheetPanelTrigger render={<Button variant="outline">{\`right \${size}\`}</Button>} />
          <SheetPanel
            side="right"
            size={size}
            title={\`Panel \${size}\`}
            footer={
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline">Đóng</Button>
                <Button>Tiếp tục</Button>
              </div>
            }
          >
            <p className="text-sm text-muted-foreground">
              \`Preset kích thước \${size} cho sheet panel.\`
            </p>
          </SheetPanel>
        </SheetPanelRoot>
      ))}
    </div>
  );
}`,
  },
];

export default function SheetPanelGuidePage() {
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
            Wrapper cho Sheet với layout chuẩn hóa, có preset size và vẫn cho phép forward toàn bộ
            props của SheetContent.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import root, trigger và panel content.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  SheetPanel,
  SheetPanelRoot,
  SheetPanelTrigger,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>SheetPanel kế thừa toàn bộ props của SheetContent.</CardDescription>
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
              <CardDescription>Các pattern phổ biến cho side panel.</CardDescription>
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
