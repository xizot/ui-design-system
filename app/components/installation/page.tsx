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
      <div className="border-border/70 bg-card text-card-foreground overflow-x-auto rounded-2xl border p-5">
        <pre className="text-sm leading-6">
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={() => handleCopy(code, id)}
        className="bg-card hover:bg-accent absolute top-3 right-3 rounded-lg p-2 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copiedId === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="text-muted-foreground h-4 w-4" />
        )}
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <TypographySmall className="text-sm tracking-[0.24em] uppercase">guide</TypographySmall>
          <TypographyH1 className="mt-4">Installation</TypographyH1>
          <TypographyLead className="mt-4 max-w-2xl">
            Hướng dẫn cài design system bằng CLI. Phần này là điểm vào chính cho consumer trước khi
            xem từng component riêng lẻ.
          </TypographyLead>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="cli" className="border-border/70 rounded-[24px]">
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

          <Card id="structure" className="border-border/70 rounded-[24px]">
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

          <Card id="behavior" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. CLI sẽ làm gì</CardTitle>
              <CardDescription>
                Flow cài đặt hiện tại tập trung vào copy file và cài dependency cần thiết.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4 text-sm">
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

          <Card id="usage" className="border-border/70 rounded-[24px]">
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
        <div className="border-border/70 bg-card sticky top-24 rounded-[24px] border p-5">
          <TypographySmall className="tracking-[0.24em] uppercase">TOC</TypographySmall>
          <nav className="text-muted-foreground mt-4 space-y-3 text-sm">
            <a href="#cli" className="hover:text-foreground block transition">
              Cài bằng CLI
            </a>
            <a href="#structure" className="hover:text-foreground block transition">
              Cấu trúc thư mục
            </a>
            <a href="#behavior" className="hover:text-foreground block transition">
              CLI behavior
            </a>
            <a href="#usage" className="hover:text-foreground block transition">
              Import path
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
