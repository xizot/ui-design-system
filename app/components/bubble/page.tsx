'use client';

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@/components/ui/bubble';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect } from 'react';

const guide = {
  name: 'Bubble',
  group: 'ui',
  importPath: '@/design-system/components/ui/bubble',
} as const;

const code = `import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/design-system/components/ui/bubble";

export function Example() {
  return (
    <BubbleGroup>
      <Bubble variant="muted">
        <BubbleContent>Tin nhắn hỗ trợ nhiều biến thể.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Phản hồi từ người dùng.</BubbleContent>
        <BubbleReactions>👍</BubbleReactions>
      </Bubble>
    </BubbleGroup>
  );
}`;

export default function BubbleGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-3xl border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Hiển thị nội dung hội thoại trong dạng bong bóng tin nhắn.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-3xl">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import bubble component từ design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={`import { Bubble } from "${guide.importPath}"`} id="import" />
            </CardContent>
          </Card>

          <Card id="usage" className="border-border/70 rounded-3xl">
            <CardHeader>
              <CardTitle>2. Usage</CardTitle>
              <CardDescription>Cấu hình bubble phổ biến.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="gap-6">
                <TabsList variant="line">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <div className="border-border bg-muted/30 rounded-2xl border border-dashed p-8">
                    <BubbleGroup>
                      <Bubble variant="muted">
                        <BubbleContent>Tin nhắn hỗ trợ nhiều biến thể.</BubbleContent>
                      </Bubble>
                      <Bubble align="end">
                        <BubbleContent>Phản hồi từ người dùng.</BubbleContent>
                        <BubbleReactions>👍</BubbleReactions>
                      </Bubble>
                    </BubbleGroup>
                  </div>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={code} id="usage-code" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
