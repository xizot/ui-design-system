'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultipleCombobox } from '@/components/ui/multiple-combobox';
import { SingleCombobox } from '@/components/ui/single-combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import { getGuide } from '../guide-data';

const guide = getGuide('dialog');

const props = [
  { name: 'open', type: 'boolean', defaultValue: '--' },
  { name: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '--' },
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
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Combobox trong dialog</Button>} />
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Kiểm tra combobox trong dialog</DialogTitle>
          <DialogDescription>
            Mở từng combobox để kiểm tra menu nhiều option và scroll trong dialog.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button variant="outline">Hủy</Button>
          <Button>Áp dụng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: (
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Edit Profile</Button>} />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/components/ui/dialog";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit Profile</Button>} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
  },
  {
    id: 'combobox-scroll',
    label: 'Combobox Scroll',
    preview: <DialogComboboxScrollDemo />,
    code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-system/components/ui/dialog";
import { Button } from "@/design-system/components/ui/button";
import { MultipleCombobox } from "@/design-system/components/ui/multiple-combobox";
import { SingleCombobox } from "@/design-system/components/ui/single-combobox";

const options = Array.from({ length: 60 }, (_, index) => ({
  id: \`option-\${index + 1}\`,
  code: \`OPT\${String(index + 1).padStart(2, "0")}\`,
  name: \`Tùy chọn kiểm tra scroll \${index + 1}\`,
}));

export function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Combobox trong dialog</Button>} />
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Kiểm tra combobox trong dialog</DialogTitle>
          <DialogDescription>
            Mở từng combobox để kiểm tra menu nhiều option và scroll trong dialog.
          </DialogDescription>
        </DialogHeader>
        <SingleCombobox options={options} placeholder="Chọn một tùy chọn" />
        <MultipleCombobox options={options} placeholder="Chọn nhiều tùy chọn" limitTags={4} />
        <DialogFooter>
          <Button variant="outline">Hủy</Button>
          <Button>Áp dụng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
  },
];

export default function DialogGuidePage() {
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
            A modal dialog that overlays the screen with content and requires user interaction.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the dialog components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>Dialog component props.</CardDescription>
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
              <CardDescription>Common dialog patterns and configurations.</CardDescription>
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
