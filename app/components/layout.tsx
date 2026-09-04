'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { TypographyH4, TypographyMuted, TypographySmall } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { guides } from './guide-data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { StylePresetCombobox } from '../../internal-components/style-preset-combobox';

export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const filteredGuides = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return guides;
    }

    return guides.filter((guide) => {
      return (
        guide.name.toLowerCase().includes(normalizedSearch) ||
        guide.slug.toLowerCase().includes(normalizedSearch) ||
        guide.group.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search]);

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border/70 bg-background/90 sticky top-0 z-30 border-b backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-[1600px] flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground shrink-0 text-sm font-medium transition"
            >
              Design System
            </Link>
            <span className="bg-border hidden h-4 w-px md:block" />
            <TypographyMuted className="truncate">Component usage guide template</TypographyMuted>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            <div className="hidden lg:block">
              <StylePresetCombobox />
            </div>
            <ThemeToggle />
            <Link
              href="/components"
              className="border-border/70 bg-card hover:border-foreground/20 hover:bg-accent rounded-full border px-4 py-2 text-sm font-medium transition"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 py-6 xl:grid-cols-[280px_minmax(0,1fr)_240px] xl:gap-8">
          <aside className="xl:sticky xl:top-24 xl:h-[calc(100vh-7rem)] xl:min-h-0">
            <div className="border-border/70 bg-card/70 flex h-full min-h-0 flex-col overflow-hidden rounded-[24px] border shadow-sm backdrop-blur">
              <div className="border-border/70 shrink-0 border-b px-4 py-4">
                <TypographySmall className="text-muted-foreground tracking-[0.24em] uppercase">
                  Components
                </TypographySmall>
                <TypographyH4 className="mt-2">Usage Guide</TypographyH4>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Browse docs pages by component or filter the list.
                </p>
              </div>
              <div className="shrink-0 p-4">
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm component..."
                  size="sm"
                  aria-label="Tìm component"
                />
              </div>
              <ScrollArea className="min-h-0 flex-1 px-2 pb-3">
                <nav className="space-y-1 pr-1">
                  {filteredGuides.map((guide) => {
                    const path = `/components/${guide.slug}`;
                    const isActive = pathname === path || pathname.startsWith(`${path}/`);
                    return (
                      <Link
                        key={guide.slug}
                        href={path}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-3 py-2 text-sm transition',
                          isActive
                            ? 'bg-accent text-foreground font-medium shadow-sm'
                            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                        )}
                      >
                        <span className="min-w-0 truncate">{guide.name}</span>
                        <span className="border-border/70 text-muted-foreground shrink-0 rounded-full border px-2 py-0.5 text-[10px] tracking-[0.2em] uppercase">
                          {guide.group}
                        </span>
                      </Link>
                    );
                  })}
                  {filteredGuides.length === 0 ? (
                    <p className="text-muted-foreground px-3 py-2 text-sm">
                      Không tìm thấy component.
                    </p>
                  ) : null}
                </nav>
              </ScrollArea>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
