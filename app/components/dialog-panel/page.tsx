'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { DialogPanel, DialogPanelRoot, DialogPanelTrigger } from '@/components/ui/dialog-panel';
import { Input } from '@/components/ui/input';
import { MultipleCombobox } from '@/components/ui/multiple-combobox';
import { SingleCombobox } from '@/components/ui/single-combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const guide = {
  name: 'Dialog Panel',
  group: 'ui',
  importPath: '@/design-system/components/ui/dialog-panel',
} as const;

const props = [
  { name: 'size', type: `"sm" | "md" | "lg" | "xl" | "auto"`, defaultValue: `"md"` },
  { name: 'title', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'description', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'footer', type: 'React.ReactNode', defaultValue: '--' },
  { name: 'showCloseButton', type: 'boolean', defaultValue: 'true' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const comboboxOptions = Array.from({ length: 60 }, (_, index) => {
  const value = index + 1;

  return {
    id: `option-${value}`,
    code: `OPT${String(value).padStart(2, '0')}`,
    name: `Tùy chọn kiểm tra scroll ${value}`,
  };
});

function DialogComboboxScrollDemo() {
  const [singleValue, setSingleValue] = useState<string | number>();
  const [multipleValues, setMultipleValues] = useState<(string | number)[]>([]);

  return (
    <DialogPanelRoot>
      <DialogPanelTrigger render={<Button variant="outline">Combobox scroll</Button>} />
      <DialogPanel
        size="lg"
        title="Kiểm tra combobox trong dialog"
        description="Mở từng combobox để kiểm tra menu nhiều option và scroll trong dialog."
        footer={
          <>
            <Button variant="outline">Hủy</Button>
            <Button>Áp dụng</Button>
          </>
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
      </DialogPanel>
    </DialogPanelRoot>
  );
}

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <DialogPanelRoot>
        <DialogPanelTrigger render={<Button variant="outline">Mở dialog</Button>} />
        <DialogPanel
          title="Cập nhật hồ sơ"
          description="Dùng wrapper thống nhất cho dialog center."
          footer={
            <>
              <Button variant="outline">Hủy</Button>
              <Button>Lưu thay đổi</Button>
            </>
          }
        >
          <div className="grid gap-3">
            <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
            <Input label="Email" placeholder="name@company.vn" />
          </div>
        </DialogPanel>
      </DialogPanelRoot>
    ),
    code: `import {
  DialogPanel,
  DialogPanelRoot,
  DialogPanelTrigger,
} from "@/design-system/components/ui/dialog-panel";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";

export function Example() {
  return (
    <DialogPanelRoot>
      <DialogPanelTrigger render={<Button variant="outline">Mở dialog</Button>} />
      <DialogPanel
        title="Cập nhật hồ sơ"
        description="Dùng wrapper thống nhất cho dialog center."
        footer={
          <>
            <Button variant="outline">Hủy</Button>
            <Button>Lưu thay đổi</Button>
          </>
        }
      >
        <div className="grid gap-3">
          <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
          <Input label="Email" placeholder="name@company.vn" />
        </div>
      </DialogPanel>
    </DialogPanelRoot>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <DialogPanelRoot key={size}>
            <DialogPanelTrigger render={<Button variant="outline">{size}</Button>} />
            <DialogPanel
              size={size}
              title={`Dialog ${size}`}
              footer={
                <>
                  <Button variant="outline">Hủy</Button>
                  <Button>Lưu</Button>
                </>
              }
            >
              <p className="text-muted-foreground text-sm">Preset kích thước {size} cho dialog.</p>
            </DialogPanel>
          </DialogPanelRoot>
        ))}
      </div>
    ),
    code: `import {
  DialogPanel,
  DialogPanelRoot,
  DialogPanelTrigger,
} from "@/design-system/components/ui/dialog-panel";
import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex gap-3">
      {(["sm", "md", "lg", "xl", "auto"] as const).map((size) => (
        <DialogPanelRoot key={size}>
          <DialogPanelTrigger render={<Button variant="outline">{size}</Button>} />
          <DialogPanel
            size={size}
            title={\`Dialog \${size}\`}
            footer={
              <>
                <Button variant="outline">Hủy</Button>
                <Button>Lưu</Button>
              </>
            }
          >
            <p className="text-sm text-muted-foreground">
              \`Preset kích thước \${size} cho dialog\`
            </p>
          </DialogPanel>
        </DialogPanelRoot>
      ))}
    </div>
  );
}`,
  },
  {
    id: 'combobox-scroll',
    label: 'Combobox Scroll',
    preview: <DialogComboboxScrollDemo />,
    code: `import { Button } from "@/design-system/components/ui/button";
import {
  DialogPanel,
  DialogPanelRoot,
  DialogPanelTrigger,
} from "@/design-system/components/ui/dialog-panel";
import { MultipleCombobox } from "@/design-system/components/ui/multiple-combobox";
import { SingleCombobox } from "@/design-system/components/ui/single-combobox";

const options = Array.from({ length: 60 }, (_, index) => ({
  id: \`option-\${index + 1}\`,
  code: \`OPT\${String(index + 1).padStart(2, "0")}\`,
  name: \`Tùy chọn kiểm tra scroll \${index + 1}\`,
}));

export function Example() {
  return (
    <DialogPanelRoot>
      <DialogPanelTrigger render={<Button variant="outline">Combobox scroll</Button>} />
      <DialogPanel size="lg" title="Kiểm tra combobox trong dialog">
        <SingleCombobox options={options} placeholder="Chọn một tùy chọn" />
        <MultipleCombobox options={options} placeholder="Chọn nhiều tùy chọn" limitTags={4} />
      </DialogPanel>
    </DialogPanelRoot>
  );
}`,
  },
];

export default function DialogPanelGuidePage() {
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
            Wrapper cho Dialog với layout chuẩn hóa, preset size và khả năng forward toàn bộ props
            của DialogContent.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import root, trigger và dialog panel wrapper.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  DialogPanel,
  DialogPanelRoot,
  DialogPanelTrigger,
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
                DialogPanel kế thừa toàn bộ props của DialogContent.
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
              <CardDescription>Các pattern phổ biến cho dialog wrapper.</CardDescription>
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
