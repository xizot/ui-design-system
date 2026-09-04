'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { DEFAULT_RADIO_SIZE } from '../../../constants/form-sizes';

import { getGuide } from '../guide-data';

const guide = getGuide('radio-group');

const props = [
  { name: 'label', type: 'ReactNode', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'error', type: 'string', defaultValue: '--' },
  { name: 'wrapperClassName', type: 'string', defaultValue: '--' },
  { name: 'labelClassName', type: 'string', defaultValue: '--' },
  { name: 'errorClassName', type: 'string', defaultValue: '--' },
  { name: 'value', type: 'string', defaultValue: '--' },
  { name: 'defaultValue', type: 'string', defaultValue: '--' },
  { name: 'onValueChange', type: '(value: string) => void', defaultValue: '--' },
];

const itemProps = [
  { name: 'label', type: 'ReactNode', defaultValue: '--' },
  {
    name: 'size',
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"',
    defaultValue: DEFAULT_RADIO_SIZE,
  },
  { name: 'labelClassName', type: 'string', defaultValue: '--' },
  { name: 'containerClassName', type: 'string', defaultValue: '--' },
  { name: 'className', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <RadioGroup label="Mật độ hiển thị" defaultValue="comfortable" className="w-fit">
        <RadioGroupItem id="density-default" value="default" label="Mặc định" />
        <RadioGroupItem id="density-comfortable" value="comfortable" label="Thoải mái" />
        <RadioGroupItem id="density-compact" value="compact" label="Thu gọn" />
      </RadioGroup>
    ),
    code: `import { RadioGroup, RadioGroupItem } from "@/design-system/components/ui/radio-group";

export function Example() {
  return (
    <RadioGroup label="Mật độ hiển thị" defaultValue="comfortable" className="w-fit">
      <RadioGroupItem id="density-default" value="default" label="Mặc định" />
      <RadioGroupItem id="density-comfortable" value="comfortable" label="Thoải mái" />
      <RadioGroupItem id="density-compact" value="compact" label="Thu gọn" />
    </RadioGroup>
  );
}`,
  },
  {
    id: 'states',
    label: 'State',
    preview: (
      <div className="grid w-full max-w-md gap-6">
        <RadioGroup label="Gói dịch vụ" required defaultValue="pro" className="gap-4">
          <RadioGroupItem id="plan-basic" value="basic" label="Cơ bản" />
          <RadioGroupItem id="plan-pro" value="pro" label="Chuyên nghiệp" />
          <RadioGroupItem id="plan-enterprise" value="enterprise" label="Doanh nghiệp" />
        </RadioGroup>

        <RadioGroup
          label="Trạng thái tài khoản"
          error="Vui lòng chọn một trạng thái"
          className="gap-4"
        >
          <RadioGroupItem id="status-active" value="active" label="Đang hoạt động" />
          <RadioGroupItem id="status-paused" value="paused" label="Tạm dừng" />
        </RadioGroup>
      </div>
    ),
    code: `import { RadioGroup, RadioGroupItem } from "@/design-system/components/ui/radio-group";

export function Example() {
  return (
    <RadioGroup
      label="Trạng thái tài khoản"
      error="Vui lòng chọn một trạng thái"
      className="gap-4"
    >
      <RadioGroupItem id="status-active" value="active" label="Đang hoạt động" />
      <RadioGroupItem id="status-paused" value="paused" label="Tạm dừng" />
    </RadioGroup>
  );
}`,
  },
  {
    id: 'sizes',
    label: 'Sizes',
    preview: (
      <div className="grid w-full max-w-md gap-5">
        <RadioGroup label="Kích thước nhỏ" defaultValue="a">
          <RadioGroupItem id="sm-a" value="a" size="sm" label="Tùy chọn A" />
          <RadioGroupItem id="sm-b" value="b" size="sm" label="Tùy chọn B" />
        </RadioGroup>
        <RadioGroup label="Kích thước lớn" defaultValue="a">
          <RadioGroupItem id="lg-a" value="a" size="lg" label="Tùy chọn A" />
          <RadioGroupItem id="lg-b" value="b" size="lg" label="Tùy chọn B" />
        </RadioGroup>
      </div>
    ),
    code: `import { RadioGroup, RadioGroupItem } from "@/design-system/components/ui/radio-group";

export function Example() {
  return (
    <RadioGroup label="Kích thước lớn" defaultValue="a">
      <RadioGroupItem id="lg-a" value="a" size="lg" label="Tùy chọn A" />
      <RadioGroupItem id="lg-b" value="b" size="lg" label="Tùy chọn B" />
    </RadioGroup>
  );
}`,
  },
];

export default function RadioGroupGuidePage() {
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
            Nhóm lựa chọn một giá trị với API đồng nhất cùng `label`, `error` và kích thước theo
            form token.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import radio group từ design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { RadioGroup, RadioGroupItem } from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="group-props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Group Props</CardTitle>
              <CardDescription>Props dành cho `RadioGroup`.</CardDescription>
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

          <Card id="item-props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. Item Props</CardTitle>
              <CardDescription>Props dành cho `RadioGroupItem`.</CardDescription>
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
                    {itemProps.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(
                          index !== itemProps.length - 1 && 'border-border/70 border-b',
                        )}
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

          <Card id="sizes" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>4. Sizes</CardTitle>
              <CardDescription>Available sizes for the RadioGroupItem components.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium">RadioGroupItem Sizes</h4>
                  <div className="max-w-sm space-y-4">
                    {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((size) => (
                      <RadioGroup key={size} label={size.toUpperCase()} defaultValue="option1">
                        <RadioGroupItem
                          id={`${size}-option1`}
                          value="option1"
                          size={size}
                          label="Option 1"
                        />
                        <RadioGroupItem
                          id={`${size}-option2`}
                          value="option2"
                          size={size}
                          label="Option 2"
                        />
                      </RadioGroup>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>5. Usages</CardTitle>
              <CardDescription>Các mẫu dùng phổ biến.</CardDescription>
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
            <a href="#group-props" className="hover:text-foreground block transition">
              Group Props
            </a>
            <a href="#item-props" className="hover:text-foreground block transition">
              Item Props
            </a>
            <a href="#sizes" className="hover:text-foreground block transition">
              Sizes
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
