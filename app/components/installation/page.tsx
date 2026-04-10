'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TypographyCode,
  TypographyH1,
  TypographyLead,
  TypographySmall,
} from '@/components/ui/typography';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export default function InstallationGuidePage() {
  const { copyToClipboard } = useCopyToClipboard();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (code: string, id: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="group relative">
      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-5 text-card-foreground">
        <pre className="text-sm leading-6">
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={() => handleCopy(code, id)}
        className="absolute right-3 top-3 rounded-lg bg-card p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent"
        aria-label="Copy code"
      >
        {copiedId === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <TypographySmall className="text-sm uppercase tracking-[0.24em]">guide</TypographySmall>
          <TypographyH1 className="mt-4">Installation</TypographyH1>
          <TypographyLead className="mt-4 max-w-2xl">
            Hướng dẫn cài design system bằng CLI. Phần này là điểm vào chính cho consumer trước khi
            xem từng component riêng lẻ.
          </TypographyLead>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="cli" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Cài bằng CLI</CardTitle>
              <CardDescription>
                Chạy lệnh init để copy design system vào project của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock code="npx github:xizot/ui-design-system init" id="cli-init" />
              <CodeBlock code="npx github:xizot/ui-design-system" id="cli-default" />
              <CodeBlock code="npx github:xizot/ui-design-system help" id="cli-help" />
            </CardContent>
          </Card>

          <Card id="structure" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Cấu trúc được copy vào project</CardTitle>
              <CardDescription>
                CLI cài design system vào một thư mục đích riêng để dễ quản lý.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`design-system/
  components/
  constants/
  hooks/
  lib/`}
                id="structure"
              />
            </CardContent>
          </Card>

          <Card id="behavior" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. CLI sẽ làm gì</CardTitle>
              <CardDescription>
                Flow cài đặt hiện tại tập trung vào copy file và cài dependency cần thiết.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                CLI kiểm tra file đã tồn tại trong thư mục đích và hỏi bạn muốn overwrite, skip hay
                review từng conflict.
              </p>
              <p>
                Sau đó CLI kiểm tra <TypographyCode>package.json</TypographyCode> của project để cài
                thêm dependency runtime còn thiếu.
              </p>
              <p>Package manager hỗ trợ: pnpm, yarn, bun, npm.</p>
            </CardContent>
          </Card>

          <Card id="usage" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>4. Import sau khi cài</CardTitle>
              <CardDescription>
                Docs nên hướng dẫn consumer import từ thư mục đã được CLI copy vào.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { Button } from '@/design-system/components/ui/button';`}
                id="import"
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <TypographySmall className="uppercase tracking-[0.24em]">TOC</TypographySmall>
          <nav className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a href="#cli" className="block transition hover:text-foreground">
              Cài bằng CLI
            </a>
            <a href="#structure" className="block transition hover:text-foreground">
              Cấu trúc thư mục
            </a>
            <a href="#behavior" className="block transition hover:text-foreground">
              CLI behavior
            </a>
            <a href="#usage" className="block transition hover:text-foreground">
              Import path
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
