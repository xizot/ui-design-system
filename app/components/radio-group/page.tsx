import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const guide = {
  name: 'Radio Group',
  group: 'ui',
  importPath: '@/design-system/components/ui/radio-group',
} as const;

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

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
  { name: 'size', type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"', defaultValue: '"md"' },
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
        <RadioGroup
          label="Gói dịch vụ"
          required
          defaultValue="pro"
          className="gap-4"
        >
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
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Nhóm lựa chọn một giá trị với API đồng nhất cùng `label`, `error` và kích thước theo
            form token.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import radio group từ design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { RadioGroup, RadioGroupItem } from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="group-props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Group Props</CardTitle>
              <CardDescription>Props dành cho `RadioGroup`.</CardDescription>
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

          <Card id="item-props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. Item Props</CardTitle>
              <CardDescription>Props dành cho `RadioGroupItem`.</CardDescription>
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
                    {itemProps.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(
                          index !== itemProps.length - 1 && 'border-b border-border/70',
                        )}
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
              <CardTitle>4. Usages</CardTitle>
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
                    <div className="rounded-[20px] border border-dashed border-border bg-muted/30 p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-5 text-card-foreground">
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
            <a href="#group-props" className="block transition hover:text-foreground">
              Group Props
            </a>
            <a href="#item-props" className="block transition hover:text-foreground">
              Item Props
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

