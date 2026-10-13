'use client';

import { BookOpen, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { SheetPanel, SheetPanelRoot, SheetPanelTrigger } from '@/components/ui/sheet-panel';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { StylePresetCombobox } from '@/internal-components/style-preset-combobox';
import { GuideNavigation } from './_components/guide-navigation';
import './guides.css';

type ComponentsLayoutProps = { children: ReactNode };

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <div className="docs-shell bg-background text-foreground">
      <a
        href="#guide-main"
        className="bg-background focus-visible:ring-ring sr-only z-50 rounded-md p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus-visible:ring-2"
      >
        Đến nội dung chính
      </a>
      <header className="border-border bg-background/95 sticky top-0 z-30 h-16 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <SheetPanelRoot open={navigationOpen} onOpenChange={setNavigationOpen}>
              <SheetPanelTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="lg:hidden"
                    aria-label="Mở danh mục component"
                  />
                }
              >
                <Menu />
              </SheetPanelTrigger>
              <SheetPanel
                title="Components"
                description="Tìm và mở hướng dẫn sử dụng."
                side="left"
                size="sm"
                showFooter={false}
              >
                <div className="flex h-full min-h-0 flex-col">
                  <GuideNavigation onNavigate={() => setNavigationOpen(false)} />
                </div>
              </SheetPanel>
            </SheetPanelRoot>
            <Link
              href="/"
              className="focus-visible:ring-ring flex shrink-0 items-center gap-2.5 rounded-md font-semibold tracking-tight focus-visible:ring-2 focus-visible:outline-none"
            >
              <BookOpen className="size-5" aria-hidden="true" />
              Xizot
            </Link>
            <span className="text-border hidden sm:inline" aria-hidden="true">
              /
            </span>
            <Link
              href="/components"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring hidden rounded-md text-sm focus-visible:ring-2 focus-visible:outline-none sm:block"
            >
              Documentation
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden md:block">
              <StylePresetCombobox />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="docs-frame">
        <aside className="docs-navigation">
          <GuideNavigation />
        </aside>
        <main id="guide-main" tabIndex={-1} className="docs-main focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
