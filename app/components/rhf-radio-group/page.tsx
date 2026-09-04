'use client';

import { useForm } from 'react-hook-form';

import { RHFRadioGroup } from '@/components/rhf';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { getGuide } from '../guide-data';

const guide = getGuide('rhf-radio-group');

const props = [
  { name: 'control', type: 'Control<T>', defaultValue: '--' },
  { name: 'name', type: 'Path<T>', defaultValue: '--' },
  { name: 'label', type: 'ReactNode', defaultValue: '--' },
  { name: 'required', type: 'boolean', defaultValue: 'false' },
  { name: 'callback', type: '(newValue: string) => void', defaultValue: '--' },
  { name: 'wrapperClassName', type: 'string', defaultValue: '--' },
  { name: 'labelClassName', type: 'string', defaultValue: '--' },
  { name: 'errorClassName', type: 'string', defaultValue: '--' },
];

const usageSamples = [
  {
    id: 'basic',
    label: 'Basic',
    preview: (
      <div className="w-full max-w-md p-4">
        <RHFRadioBasicDemo />
      </div>
    ),
    code: `import { RHFRadioGroup } from "@/design-system/components/rhf";
import { RadioGroupItem } from "@/design-system/components/ui/radio-group";
import { useForm } from "react-hook-form";

function Example() {
  const { control } = useForm({
    defaultValues: {
      density: "comfortable",
    },
  });

  return (
    <RHFRadioGroup control={control} name="density" label="Mật độ hiển thị">
      <RadioGroupItem id="density-default" value="default" label="Mặc định" />
      <RadioGroupItem id="density-comfortable" value="comfortable" label="Thoải mái" />
      <RadioGroupItem id="density-compact" value="compact" label="Thu gọn" />
    </RHFRadioGroup>
  );
}`,
  },
  {
    id: 'validation',
    label: 'Validation',
    preview: (
      <div className="w-full max-w-md p-4">
        <RHFRadioValidationDemo />
      </div>
    ),
    code: `import { RHFRadioGroup } from "@/design-system/components/rhf";
import { RadioGroupItem } from "@/design-system/components/ui/radio-group";
import { useForm } from "react-hook-form";

function Example() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-4">
      <RHFRadioGroup control={control} name="status" label="Trạng thái" required>
        <RadioGroupItem id="status-active" value="active" label="Đang hoạt động" />
        <RadioGroupItem id="status-paused" value="paused" label="Tạm dừng" />
      </RHFRadioGroup>
    </form>
  );
}`,
  },
];

type BasicValues = {
  density: string;
};

type ValidationValues = {
  status: string;
};

function RHFRadioBasicDemo() {
  const { control, watch } = useForm<BasicValues>({
    defaultValues: {
      density: 'comfortable',
    },
  });

  const density = watch('density');

  return (
    <div className="space-y-4">
      <RHFRadioGroup control={control} name="density" label="Mật độ hiển thị">
        <RadioGroupItem id="density-default" value="default" label="Mặc định" />
        <RadioGroupItem id="density-comfortable" value="comfortable" label="Thoải mái" />
        <RadioGroupItem id="density-compact" value="compact" label="Thu gọn" />
      </RHFRadioGroup>
      <div className="border-border/70 bg-muted/30 text-muted-foreground rounded-xl border px-3 py-2 text-sm">
        Giá trị hiện tại: <span className="text-foreground font-medium">{density}</span>
      </div>
    </div>
  );
}

function RHFRadioValidationDemo() {
  const { control, handleSubmit, setError, clearErrors, formState, watch } =
    useForm<ValidationValues>({
      defaultValues: {
        status: '',
      },
    });

  const status = watch('status');

  const onSubmit = (values: ValidationValues) => {
    if (!values.status) {
      setError('status', { type: 'manual', message: 'Vui lòng chọn một trạng thái' });
      return;
    }

    clearErrors('status');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RHFRadioGroup control={control} name="status" label="Trạng thái tài khoản" required>
        <RadioGroupItem id="status-active" value="active" label="Đang hoạt động" />
        <RadioGroupItem id="status-paused" value="paused" label="Tạm dừng" />
        <RadioGroupItem id="status-locked" value="locked" label="Đã khóa" />
      </RHFRadioGroup>

      <div className="flex items-center gap-3">
        <Button type="submit">Kiểm tra</Button>
        <span className="text-muted-foreground text-sm">
          {formState.errors.status?.message ||
            (status ? `Đã chọn: ${status}` : 'Chưa chọn giá trị')}
        </span>
      </div>
    </form>
  );
}

export default function RHFRadioGroupGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Wrapper cho React Hook Form giúp bind `RadioGroup` với `control`, error state và value
            hiện tại.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import RHF radio group từ design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-4">
                <code className="text-sm">{`import { RHFRadioGroup } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Props chính của `RHFRadioGroup`.</CardDescription>
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
              <CardDescription>Các mẫu dùng với React Hook Form.</CardDescription>
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

                    <div className="border-border/70 bg-card text-card-foreground overflow-x-auto rounded-2xl border p-5">
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
