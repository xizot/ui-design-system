'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { MultipleCombobox } from '@/components/ui/multiple-combobox';
import {
  SheetPanel,
  SheetPanelClose,
  SheetPanelContent,
  SheetPanelFooter,
  SheetPanelTrigger,
} from '@/components/ui/sheet-panel';
import { SingleCombobox } from '@/components/ui/single-combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('sheet-panel');

const props = [
  { name: 'size', type: `"sm" | "md" | "lg" | "xl"`, defaultValue: `"md"` },
  {
    name: 'side',
    type: `"top" | "right" | "bottom" | "left"`,
    defaultValue: `"right"`,
  },
  { name: 'title', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'description', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'showFooter', type: 'boolean', defaultValue: 'true' },
  { name: 'confirmText', type: 'string', defaultValue: 'Áp dụng' },
  { name: 'cancelText', type: 'string', defaultValue: 'Hủy' },
  { name: 'onConfirm', type: '() => void', defaultValue: '--' },
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
    <SheetPanel>
      <SheetPanelTrigger
        render={<Button variant="outline">Combobox scroll</Button>}
      />
      <SheetPanelContent
        side="right"
        size="lg"
        title="Kiểm tra combobox trong sheet"
        description="Mở từng combobox để kiểm tra menu nhiều option và scroll trong sheet."
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
        <SheetPanelFooter>
          <SheetPanelClose
            render={
              <Button size="sm" className="min-w-25" variant="outline">
                Hủy
              </Button>
            }
          />
          <Button size="sm" className="min-w-25">
            Áp dụng
          </Button>
        </SheetPanelFooter>
      </SheetPanelContent>
    </SheetPanel>
  );
}

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <SheetPanel>
        <SheetPanelTrigger
          render={<Button variant="outline">Mở panel</Button>}
        />
        <SheetPanelContent
          title="Cập nhật hồ sơ"
          description="Dùng layout thống nhất cho side panel."
        >
          <div className="grid gap-3">
            <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
            <Input label="Email" placeholder="name@company.vn" />
          </div>
          <SheetPanelFooter>
            <SheetPanelClose
              render={
                <Button size="sm" className="min-w-25" variant="outline">
                  Hủy
                </Button>
              }
            />
            <Button size="sm" className="min-w-25">
              Lưu thay đổi
            </Button>
          </SheetPanelFooter>
        </SheetPanelContent>
      </SheetPanel>
    ),
    code: `import {
  SheetPanel,
  SheetPanelClose,
  SheetPanelContent,
  SheetPanelFooter,
  SheetPanelTrigger,
} from "@/design-system/components/ui/sheet-panel";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <SheetPanel>
      <SheetPanelTrigger render={<Button variant="outline">Mở panel</Button>} />
      <SheetPanelContent
        title="Cập nhật hồ sơ"
        description="Dùng layout thống nhất cho side panel."
      >
        <div className="grid gap-3">
          <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
          <Input label="Email" placeholder="name@company.vn" />
        </div>
        <SheetPanelFooter>
          <SheetPanelClose render={<Button size="sm" className="min-w-25" variant="outline">Hủy</Button>} />
          <Button size="sm" className="min-w-25">Lưu thay đổi</Button>
        </SheetPanelFooter>
      </SheetPanelContent>
    </SheetPanel>
  );
}`,
  },
  {
    id: 'size-side',
    label: 'Size & Side',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <SheetPanel key={size}>
            <SheetPanelTrigger
              render={<Button variant="outline">{`right ${size}`}</Button>}
            />
            <SheetPanelContent side="right" size={size} title={`Panel ${size}`}>
              <p className="text-muted-foreground text-sm">
                Preset kích thước ${size} cho sheet panel.
              </p>
              <SheetPanelFooter>
                <SheetPanelClose
                  render={
                    <Button size="sm" className="min-w-25" variant="outline">
                      Đóng
                    </Button>
                  }
                />
                <Button size="sm" className="min-w-25">
                  Tiếp tục
                </Button>
              </SheetPanelFooter>
            </SheetPanelContent>
          </SheetPanel>
        ))}
      </div>
    ),
    code: `import {
  SheetPanel,
  SheetPanelClose,
  SheetPanelContent,
  SheetPanelFooter,
  SheetPanelTrigger,
} from "@/design-system/components/ui/sheet-panel";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex gap-3">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <SheetPanel key={size}>
          <SheetPanelTrigger render={<Button variant="outline">{\`right \${size}\`}</Button>} />
          <SheetPanelContent
            side="right"
            size={size}
            title={\`Panel \${size}\`}
          >
            <p className="text-sm text-muted-foreground">
              \`Preset kích thước \${size} cho sheet panel.\`
            </p>
            <SheetPanelFooter>
              <SheetPanelClose render={<Button size="sm" className="min-w-25" variant="outline">Đóng</Button>} />
              <Button size="sm" className="min-w-25">Tiếp tục</Button>
            </SheetPanelFooter>
          </SheetPanelContent>
        </SheetPanel>
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
  SheetPanelClose,
  SheetPanelContent,
  SheetPanelFooter,
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
    <SheetPanel>
      <SheetPanelTrigger render={<Button variant="outline">Combobox scroll</Button>} />
      <SheetPanelContent side="right" size="lg" title="Kiểm tra combobox trong sheet">
        <SingleCombobox options={options} placeholder="Chọn một tùy chọn" />
        <MultipleCombobox options={options} placeholder="Chọn nhiều tùy chọn" limitTags={4} />
      </SheetPanelContent>
    </SheetPanel>
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
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            {guide.name}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            SheetPanel là root; SheetPanelContent chứa header, nội dung cuộn và footer tùy biến.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import root, trigger và panel content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  SheetPanel,
  SheetPanelClose,
  SheetPanelContent,
  SheetPanelFooter,
  SheetPanelTrigger,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. SheetPanelContent props</CardTitle>
              <CardDescription>
                SheetPanelContent nhận size và nội dung. Đặt SheetPanelFooter
                trực tiếp trong content để thay nút mặc định.
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
                        className={cn(
                          index !== props.length - 1 &&
                            'border-border/70 border-b',
                        )}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="text-muted-foreground px-4 py-3">
                          {prop.type}
                        </td>
                        <td className="text-muted-foreground px-4 py-3">
                          {prop.defaultValue}
                        </td>
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
                Các pattern phổ biến cho side panel.
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
                  <TabsContent
                    key={sample.id}
                    value={sample.id}
                    className="space-y-5"
                  >
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
            <a
              href="#import"
              className="hover:text-foreground block transition"
            >
              Import
            </a>
            <a href="#props" className="hover:text-foreground block transition">
              Props
            </a>
            <a
              href="#usages"
              className="hover:text-foreground block transition"
            >
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
