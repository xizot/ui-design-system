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
      <div className="border-border/70 bg-card text-card-foreground overflow-x-auto rounded-2xl border p-5">
        <pre className="text-sm leading-6">
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={handleCopy}
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
}
