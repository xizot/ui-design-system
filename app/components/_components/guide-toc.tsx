'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type GuideTocItem = { id: string; label: string };

type GuideTocProps = { items: GuideTocItem[] };

export function GuideToc({ items }: GuideTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const ids = items.map((item) => item.id).join('|');

  useEffect(() => {
    const sections = ids
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const updateActive = () => {
      const current =
        sections.findLast((section) => section.getBoundingClientRect().top <= 140) ?? sections[0];
      if (current) setActiveId(current.id);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [ids]);

  const links = items.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={activeId === item.id ? 'location' : undefined}
      className={cn('guide-toc-link', activeId === item.id && 'guide-toc-link-active')}
    >
      {item.label}
    </a>
  ));

  return (
    <aside className="guide-toc" aria-label="Trên trang này">
      <div className="hidden xl:block">
        <p className="mb-3 text-xs font-semibold">Trên trang này</p>
        <nav className="border-border border-l">{links}</nav>
      </div>
      <details className="group border-border rounded-lg border xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          Trên trang này{' '}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <nav className="px-2 pb-3">{links}</nav>
      </details>
    </aside>
  );
}
