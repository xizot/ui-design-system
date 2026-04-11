'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard';

interface CodeBlockProps {
  code: string;
  id: string;
  className?: string;
}

export function CodeBlock({ code, id, className }: CodeBlockProps) {
  const { copyToClipboard } = useCopyToClipboard();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className={`group relative ${className || ''}`}>
      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-5 text-card-foreground">
        <pre className="text-sm leading-6">
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={handleCopy}
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
}
