'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const guides = [
  { slug: 'accordion', name: 'Accordion', group: 'ui' as const },
  { slug: 'alert', name: 'Alert', group: 'ui' as const },
  { slug: 'alert-dialog', name: 'Alert Dialog', group: 'ui' as const },
  { slug: 'aspect-ratio', name: 'Aspect Ratio', group: 'ui' as const },
  { slug: 'avatar', name: 'Avatar', group: 'ui' as const },
  { slug: 'badge', name: 'Badge', group: 'ui' as const },
  { slug: 'breadcrumb', name: 'Breadcrumb', group: 'ui' as const },
  { slug: 'button', name: 'Button', group: 'ui' as const },
  { slug: 'button-group', name: 'Button Group', group: 'ui' as const },
  { slug: 'calendar', name: 'Calendar', group: 'ui' as const },
  { slug: 'card', name: 'Card', group: 'ui' as const },
  { slug: 'chart', name: 'Chart', group: 'ui' as const },
  { slug: 'checkbox', name: 'Checkbox', group: 'ui' as const },
  { slug: 'collapsible', name: 'Collapsible', group: 'ui' as const },
  { slug: 'combobox', name: 'Combobox', group: 'ui' as const },
  { slug: 'command', name: 'Command', group: 'ui' as const },
  { slug: 'context-menu', name: 'Context Menu', group: 'ui' as const },
  { slug: 'dialog', name: 'Dialog', group: 'ui' as const },
  { slug: 'direction', name: 'Direction', group: 'ui' as const },
  { slug: 'dropdown-menu', name: 'Dropdown Menu', group: 'ui' as const },
  { slug: 'empty', name: 'Empty', group: 'ui' as const },
  { slug: 'field', name: 'Field', group: 'ui' as const },
  { slug: 'hover-card', name: 'Hover Card', group: 'ui' as const },
  { slug: 'input', name: 'Input', group: 'ui' as const },
  { slug: 'input-group', name: 'Input Group', group: 'ui' as const },
  { slug: 'input-otp', name: 'Input OTP', group: 'ui' as const },
  { slug: 'item', name: 'Item', group: 'ui' as const },
  { slug: 'kbd', name: 'Kbd', group: 'ui' as const },
  { slug: 'label', name: 'Label', group: 'ui' as const },
  { slug: 'menubar', name: 'Menubar', group: 'ui' as const },
  { slug: 'native-select', name: 'Native Select', group: 'ui' as const },
  { slug: 'navigation-menu', name: 'Navigation Menu', group: 'ui' as const },
  { slug: 'pagination', name: 'Pagination', group: 'ui' as const },
  { slug: 'popover', name: 'Popover', group: 'ui' as const },
  { slug: 'progress', name: 'Progress', group: 'ui' as const },
  { slug: 'radio-group', name: 'Radio Group', group: 'ui' as const },
  { slug: 'resizable', name: 'Resizable', group: 'ui' as const },
  { slug: 'scroll-area', name: 'Scroll Area', group: 'ui' as const },
  { slug: 'select', name: 'Select', group: 'ui' as const },
  { slug: 'separator', name: 'Separator', group: 'ui' as const },
  { slug: 'sheet', name: 'Sheet', group: 'ui' as const },
  { slug: 'sidebar', name: 'Sidebar', group: 'ui' as const },
  { slug: 'skeleton', name: 'Skeleton', group: 'ui' as const },
  { slug: 'slider', name: 'Slider', group: 'ui' as const },
  { slug: 'sonner', name: 'Sonner', group: 'ui' as const },
  { slug: 'spinner', name: 'Spinner', group: 'ui' as const },
  { slug: 'switch', name: 'Switch', group: 'ui' as const },
  { slug: 'table', name: 'Table', group: 'ui' as const },
  { slug: 'tabs', name: 'Tabs', group: 'ui' as const },
  { slug: 'tooltip', name: 'Tooltip', group: 'ui' as const },
  { slug: 'toggle', name: 'Toggle', group: 'ui' as const },
  { slug: 'toggle-group', name: 'Toggle Group', group: 'ui' as const },
  { slug: 'textarea', name: 'Textarea', group: 'ui' as const },
  { slug: 'theme-toggle', name: 'Theme Toggle', group: 'ui' as const },
  { slug: 'rhf-checkbox', name: 'RHF Checkbox', group: 'rhf' as const },
  { slug: 'rhf-combobox', name: 'RHF Combobox', group: 'rhf' as const },
  { slug: 'rhf-error-message', name: 'RHF Error Message', group: 'rhf' as const },
  { slug: 'rhf-input', name: 'RHF Input', group: 'rhf' as const },
  { slug: 'rhf-select', name: 'RHF Select', group: 'rhf' as const },
  { slug: 'rhf-switch', name: 'RHF Switch', group: 'rhf' as const },
  { slug: 'rhf-textarea', name: 'RHF Textarea', group: 'rhf' as const },
];

export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_36%),linear-gradient(180deg,var(--background),color-mix(in_oklab,var(--background),var(--muted)_36%))]">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Design System
            </Link>
            <span className="hidden h-4 w-px bg-border md:block" />
            <p className="text-sm text-muted-foreground">Component usage guide template</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/components"
              className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium transition hover:border-foreground/20 hover:bg-accent"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-0 px-4 md:px-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden border-r border-border/70 py-8 xl:block">
          <div className="sticky top-24 pr-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Components
              </p>
              <h2 className="mt-2 text-lg font-semibold">Usage Guide</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <nav className="space-y-1 pr-4">
                {guides.map((guide) => {
                  const path = `/components/${guide.slug}`;
                  const isActive = pathname === path || pathname.startsWith(`${path}/`);
                  return (
                    <Link
                      key={guide.slug}
                      href={path}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-3 py-2 text-sm transition',
                        isActive
                          ? 'bg-accent text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                      )}
                    >
                      <span>{guide.name}</span>
                      <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                        {guide.group}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        <div className="min-w-0 p-8">{children}</div>
      </div>
    </div>
  );
}
