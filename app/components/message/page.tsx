'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/components/ui/message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect } from 'react';

const guide = {
  name: 'Message',
  group: 'ui',
  importPath: '@/design-system/components/ui/message',
} as const;

const code = `import { Avatar, AvatarFallback } from "@/design-system/components/ui/avatar";
import { Bubble, BubbleContent } from "@/design-system/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/design-system/components/ui/message";

export function Example() {
  return (
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Trợ lý</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>Tôi có thể hỗ trợ gì cho bạn?</BubbleContent>
        </Bubble>
        <MessageFooter>Đã gửi</MessageFooter>
      </MessageContent>
    </Message>
  );
}`;

export default function MessageGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-3xl border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Bố cục một dòng tin nhắn gồm avatar, nội dung, header và footer.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-3xl border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import message component từ design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={`import { Message } from "${guide.importPath}"`} id="import" />
            </CardContent>
          </Card>

          <Card id="usage" className="rounded-3xl border-border/70">
            <CardHeader>
              <CardTitle>2. Usage</CardTitle>
              <CardDescription>Bố cục message kết hợp với Bubble.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="gap-6">
                <TabsList variant="line">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8">
                    <Message>
                      <MessageAvatar>
                        <Avatar>
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                      <MessageContent>
                        <MessageHeader>Trợ lý</MessageHeader>
                        <Bubble variant="muted">
                          <BubbleContent>Tôi có thể hỗ trợ gì cho bạn?</BubbleContent>
                        </Bubble>
                        <MessageFooter>Đã gửi</MessageFooter>
                      </MessageContent>
                    </Message>
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
