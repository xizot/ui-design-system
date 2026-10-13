'use client';

import { Button } from '@/components/ui/button';

import { GuideCode as CodeBlock } from '../_components/guide-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ChevronRightIcon, PlusIcon } from 'lucide-react';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';
import {
  GuidePage,
  GuideSection,
  GuideSectionHeader,
  GuideSectionTitle,
  GuideSectionDescription,
  GuideSectionContent,
} from '../_components/guide-page';

const guide = getGuide('button');

export default function ButtonGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  const usageSamples = [
    {
      id: 'variants',
      label: 'Variants',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`,
    },
    {
      id: 'sizes',
      label: 'Sizes',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add item">
            <PlusIcon />
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";
import { PlusIcon } from "lucide-react";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add item">
        <PlusIcon />
      </Button>
    </div>
  );
}`,
    },
    {
      id: 'with-icon',
      label: 'With Icon',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button>
            Continue
            <ChevronRightIcon />
          </Button>
          <Button variant="outline">
            <PlusIcon />
            Create item
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";
import { ChevronRightIcon, PlusIcon } from "lucide-react";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button>
        Continue
        <ChevronRightIcon />
      </Button>
      <Button variant="outline">
        <PlusIcon />
        Create item
      </Button>
    </div>
  );
}`,
    },
    {
      id: 'states',
      label: 'States',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button>Ready</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" aria-invalid>
            Invalid
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button>Ready</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" aria-invalid>
        Invalid
      </Button>
    </div>
  );
}`,
    },
    {
      id: 'loading',
      label: 'Loading',
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button loading>Đang lưu</Button>
          <Button loading variant="outline">
            Đang tải dữ liệu
          </Button>
          <Button loading variant="secondary" size="sm">
            Đang xử lý
          </Button>
        </div>
      ),
      code: `import { Button } from "@/design-system/components/ui/button";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button loading>Đang lưu</Button>
      <Button loading variant="outline">
        Đang tải dữ liệu
      </Button>
      <Button loading variant="secondary" size="sm">
        Đang xử lý
      </Button>
    </div>
  );
}`,
    },
  ];

  return (
    <GuidePage
      category={<>{guide.group}</>}
      title={<>{guide.name}</>}
      description={
        <>
          Template page cho usage guide của Button. Sau này mỗi component sẽ có một page riêng theo
          cùng bố cục này.
        </>
      }
      toc={[
        { id: 'import', label: 'Import' },
        { id: 'props', label: 'Props' },
        { id: 'sizes', label: 'Sizes' },
        { id: 'usages', label: 'Usages' },
      ]}
    >
      <div className="space-y-12">
        <GuideSection id="import">
          <GuideSectionHeader>
            <GuideSectionTitle>Import</GuideSectionTitle>
            <GuideSectionDescription>
              Import trực tiếp từ source path của component.
            </GuideSectionDescription>
          </GuideSectionHeader>
          <GuideSectionContent>
            <CodeBlock
              code={`import { Button } from "${guide.importPath}"`}
              id="import"
              className="bg-muted/30"
            />
          </GuideSectionContent>
        </GuideSection>

        <GuideSection id="props">
          <GuideSectionHeader>
            <GuideSectionTitle>Props</GuideSectionTitle>
            <GuideSectionDescription>
              Props quan trọng nên phản ánh đúng khả năng chính của component hiện tại.
            </GuideSectionDescription>
          </GuideSectionHeader>
          <GuideSectionContent>
            <div className="border-border overflow-x-auto rounded-xl border">
              <table className="guide-props-table">
                <thead className="bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Prop</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: 'variant',
                      type: `"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"`,
                      defaultValue: `"default"`,
                    },
                    {
                      name: 'size',
                      type: `"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
                      defaultValue: `"default"`,
                    },
                    { name: 'className', type: 'string', defaultValue: '--' },
                    {
                      name: 'disabled',
                      type: 'boolean',
                      defaultValue: 'false',
                    },
                    {
                      name: 'loading',
                      type: 'boolean',
                      defaultValue: 'false',
                    },
                    {
                      name: 'aria-invalid',
                      type: 'boolean',
                      defaultValue: 'false',
                    },
                    {
                      name: 'children',
                      type: 'ReactNode',
                      defaultValue: '--',
                    },
                  ].map((prop, index, array) => (
                    <tr
                      key={prop.name}
                      className={cn(index !== array.length - 1 && 'border-border/70 border-b')}
                    >
                      <td className="px-4 py-3 font-medium">{prop.name}</td>
                      <td className="text-muted-foreground px-4 py-3">{prop.type}</td>
                      <td className="text-muted-foreground px-4 py-3">{prop.defaultValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GuideSectionContent>
        </GuideSection>

        <GuideSection id="sizes">
          <GuideSectionHeader>
            <GuideSectionTitle>Sizes</GuideSectionTitle>
            <GuideSectionDescription>
              Available sizes for the Button component.
            </GuideSectionDescription>
          </GuideSectionHeader>
          <GuideSectionContent>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="xxs">Extra Small</Button>
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </GuideSectionContent>
        </GuideSection>

        <GuideSection id="usages">
          <GuideSectionHeader>
            <GuideSectionTitle>Usages</GuideSectionTitle>
            <GuideSectionDescription>
              Mỗi cách dùng quan trọng nên có tab riêng, để preview và code bám đúng use case thay
              vì dùng một snippet chung.
            </GuideSectionDescription>
          </GuideSectionHeader>
          <GuideSectionContent>
            <Tabs defaultValue={usageSamples[0]?.id} className="gap-6">
              <div className="guide-example-tabs">
                <TabsList variant="line">
                  {usageSamples.map((sample) => (
                    <TabsTrigger key={sample.id} value={sample.id}>
                      {sample.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {usageSamples.map((sample) => (
                <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                  <div className="guide-preview">
                    <div className="guide-preview-content">{sample.preview}</div>
                  </div>

                  <CodeBlock code={sample.code} id={sample.id} />
                </TabsContent>
              ))}
            </Tabs>
          </GuideSectionContent>
        </GuideSection>
      </div>
    </GuidePage>
  );
}
