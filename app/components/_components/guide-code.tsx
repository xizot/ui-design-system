'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';

type GuideCodeProps = {
  code: string;
  id: string;
  className?: string;
};

export function GuideCode({ code, id, className }: GuideCodeProps) {
  const { copyToClipboard } = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = async () => {
    if (!(await copyToClipboard(code))) return;
    if (timer.current) clearTimeout(timer.current);
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('guide-code', className)} data-example={id}>
      <div className="border-border bg-muted/30 flex items-center justify-between gap-3 border-b px-4 py-2">
        <span className="text-muted-foreground text-xs font-medium">Code</span>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={handleCopy}
          aria-label={copied ? 'Đã sao chép code' : 'Sao chép code'}
        >
          {copied ? <Check /> : <Copy />}
          <span aria-live="polite">{copied ? 'Đã sao chép' : 'Sao chép'}</span>
        </Button>
      </div>
      <pre
        tabIndex={0}
        aria-label="Đoạn code mẫu"
        className="overflow-x-auto p-4 text-[13px] leading-6 sm:p-5"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
