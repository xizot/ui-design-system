'use client';

import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { guideGroups, guides } from '../guide-data';

type GuideNavigationProps = { onNavigate?: () => void };

export function GuideNavigation({ onNavigate }: GuideNavigationProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const filtered = guides.filter((guide) =>
    `${guide.name} ${guide.slug} ${guide.group}`.toLowerCase().includes(query),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="relative shrink-0">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm component..."
          aria-label="Tìm component"
          className="pr-9 pl-9"
          size="sm"
        />
        {search ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="absolute top-1/2 right-1 -translate-y-1/2"
            aria-label="Xóa tìm kiếm"
            onClick={() => setSearch('')}
          >
            <X />
          </Button>
        ) : null}
      </div>
      <nav
        aria-label="Hướng dẫn component"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6"
      >
        <Link
          href="/components"
          onClick={onNavigate}
          aria-current={
            pathname === '/components' || pathname === '/components/' ? 'page' : undefined
          }
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring aria-[current=page]:bg-accent aria-[current=page]:text-foreground mb-5 block rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          Tất cả component
        </Link>
        <div className="space-y-6">
          {guideGroups.map((group) => {
            const entries = filtered.filter((guide) => guide.group === group.id);
            if (!entries.length) return null;
            return (
              <div key={group.id}>
                <p className="text-muted-foreground mb-2 px-3 text-xs font-medium">{group.label}</p>
                <ul className="space-y-0.5">
                  {entries.map((guide) => {
                    const href = `/components/${guide.slug}`;
                    const isActive = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <li key={guide.slug}>
                        <Link
                          href={href}
                          onClick={onNavigate}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'focus-visible:ring-ring flex min-h-9 items-center rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none',
                            isActive
                              ? 'bg-accent text-foreground font-medium'
                              : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                          )}
                        >
                          {guide.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          {!filtered.length ? (
            <p role="status" className="text-muted-foreground px-3 text-sm leading-6">
              Không tìm thấy component. Thử tên khác hoặc xóa tìm kiếm.
            </p>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
