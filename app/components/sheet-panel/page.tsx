'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { MultipleCombobox } from '@/components/ui/multiple-combobox';
import { SheetPanel, SheetPanelRoot, SheetPanelTrigger } from '@/components/ui/sheet-panel';
import { SingleCombobox } from '@/components/ui/single-combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('sheet-panel');

const props = [
  { name: 'size', type: `"sm" | "md" | "lg" | "xl" | "auto"`, defaultValue: `"sm"` },
  { name: 'side', type: `"top" | "right" | "bottom" | "left"`, defaultValue: `"right"` },
  { name: 'title', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'description', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'footer', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'showCloseButton', type: 'boolean', defaultValue: 'true' },
];

const comboboxOptions = Array.from({ length: 60 }, (_, index) => {
  const value = index + 1;

  return {
    id: `option-${value}`,
    code: `OPT${String(value).padStart(2, '0')}`,
    name: `Tùy chọn kiểm tra scroll ${value}`,
  };
});

function SheetComboboxScrollDemo() {
  const [singleValue, setSingleValue] = useState<string | number>();
  const [multipleValues, setMultipleValues] = useState<(string | number)[]>([]);

  return (
    <SheetPanelRoot>
      <SheetPanelTrigger render={<Button variant="outline">Combobox scroll</Button>} />
      <SheetPanel
        side="right"
        size="lg"
        title="Kiểm tra combobox trong sheet"
        description="Mở từng combobox để kiểm tra menu nhiều option và scroll trong sheet."
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline">Hủy</Button>
            <Button>Áp dụng</Button>
          </div>
        }
      >
        <div className="grid gap-4">
          <SingleCombobox
            label="SingleCombobox"
            options={comboboxOptions}
            value={singleValue}
            onChange={(nextValue) => setSingleValue(nextValue)}
            placeholder="Chọn một tùy chọn"
            searchPlaceholder="Tìm option..."
          />
          <MultipleCombobox
            label="MultipleCombobox"
            options={comboboxOptions}
            value={multipleValues}
            onChange={(nextValues) => setMultipleValues(nextValues)}
            placeholder="Chọn nhiều tùy chọn"
            searchPlaceholder="Tìm option..."
            limitTags={4}
          />
          <div className="grid gap-3">
            {Array.from({ length: 12 }, (_, index) => (
              <Input
                key={index}
                label={`Dòng nội dung ${index + 1}`}
                placeholder="Nội dung phụ để kiểm tra scroll body"
              />
            ))}
          </div>
        </div>
      </SheetPanel>
    </SheetPanelRoot>
  );
}

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
              <p className="text-muted-foreground text-sm">
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
  {
    id: 'combobox-scroll',
    label: 'Combobox Scroll',
    preview: <SheetComboboxScrollDemo />,
    code: `import { Button } from "@/design-system/components/ui/button";
import {
  SheetPanel,
  SheetPanelRoot,
  SheetPanelTrigger,
} from "@/design-system/components/ui/sheet-panel";
import { MultipleCombobox } from "@/design-system/components/ui/multiple-combobox";
import { SingleCombobox } from "@/design-system/components/ui/single-combobox";

const options = Array.from({ length: 60 }, (_, index) => ({
  id: \`option-\${index + 1}\`,
  code: \`OPT\${String(index + 1).padStart(2, "0")}\`,
  name: \`Tùy chọn kiểm tra scroll \${index + 1}\`,
}));

export function Example() {
  return (
    <SheetPanelRoot>
      <SheetPanelTrigger render={<Button variant="outline">Combobox scroll</Button>} />
      <SheetPanel side="right" size="lg" title="Kiểm tra combobox trong sheet">
        <SingleCombobox options={options} placeholder="Chọn một tùy chọn" />
        <MultipleCombobox options={options} placeholder="Chọn nhiều tùy chọn" limitTags={4} />
      </SheetPanel>
    </SheetPanelRoot>
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
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Wrapper cho Sheet với layout chuẩn hóa, có preset size và vẫn cho phép forward toàn bộ
            props của SheetContent.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
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

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>SheetPanel kế thừa toàn bộ props của SheetContent.</CardDescription>
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
