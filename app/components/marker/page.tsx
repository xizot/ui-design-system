'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect } from 'react';

const guide = {
  name: 'Marker',
  group: 'ui',
  importPath: '@/design-system/components/ui/marker',
} as const;

const code = `import { Marker, MarkerContent, MarkerIcon } from "@/design-system/components/ui/marker";
import { Spinner } from "@/design-system/components/ui/spinner";

export function Example() {
  return (
    <div className="space-y-4">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Đang xử lý phản hồi...</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Hôm nay</MarkerContent>
      </Marker>
    </div>
  );
}`;

export default function MarkerGuidePage() {
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
            Hiển thị trạng thái, ghi chú hệ thống hoặc dòng phân tách trong hội thoại.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-3xl">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import marker component từ design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={`import { Marker } from "${guide.importPath}"`} id="import" />
            </CardContent>
          </Card>

          <Card id="usage" className="border-border/70 rounded-3xl">
            <CardHeader>
              <CardTitle>2. Usage</CardTitle>
              <CardDescription>Marker trạng thái và separator.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="gap-6">
                <TabsList variant="line">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <div className="border-border bg-muted/30 space-y-4 rounded-2xl border border-dashed p-8">
                    <Marker role="status">
                      <MarkerIcon>
                        <Spinner />
                      </MarkerIcon>
                      <MarkerContent>Đang xử lý phản hồi...</MarkerContent>
                    </Marker>
                    <Marker variant="separator">
                      <MarkerContent>Hôm nay</MarkerContent>
                    </Marker>
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
