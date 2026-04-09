import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Components - UI Design System',
  description: 'Browse all UI components in the design system',
};

const guides = [
  {
    slug: 'accordion',
    name: 'Accordion',
    group: 'ui',
    importPath: '@/design-system/components/ui/accordion',
  },
  {
    slug: 'alert',
    name: 'Alert',
    group: 'ui',
    importPath: '@/design-system/components/ui/alert',
  },
  {
    slug: 'alert-dialog',
    name: 'Alert Dialog',
    group: 'ui',
    importPath: '@/design-system/components/ui/alert-dialog',
  },
  {
    slug: 'aspect-ratio',
    name: 'Aspect Ratio',
    group: 'ui',
    importPath: '@/design-system/components/ui/aspect-ratio',
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    group: 'ui',
    importPath: '@/design-system/components/ui/avatar',
  },
  {
    slug: 'badge',
    name: 'Badge',
    group: 'ui',
    importPath: '@/design-system/components/ui/badge',
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    group: 'ui',
    importPath: '@/design-system/components/ui/breadcrumb',
  },
  {
    slug: 'button',
    name: 'Button',
    group: 'ui',
    importPath: '@/design-system/components/ui/button',
  },
  {
    slug: 'button-group',
    name: 'Button Group',
    group: 'ui',
    importPath: '@/design-system/components/ui/button-group',
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    group: 'ui',
    importPath: '@/design-system/components/ui/calendar',
  },
  {
    slug: 'card',
    name: 'Card',
    group: 'ui',
    importPath: '@/design-system/components/ui/card',
  },
  {
    slug: 'chart',
    name: 'Chart',
    group: 'ui',
    importPath: '@/design-system/components/ui/chart',
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    group: 'ui',
    importPath: '@/design-system/components/ui/checkbox',
  },
  {
    slug: 'collapsible',
    name: 'Collapsible',
    group: 'ui',
    importPath: '@/design-system/components/ui/collapsible',
  },
  {
    slug: 'combobox',
    name: 'Combobox',
    group: 'ui',
    importPath: '@/design-system/components/ui/combobox',
  },
  {
    slug: 'command',
    name: 'Command',
    group: 'ui',
    importPath: '@/design-system/components/ui/command',
  },
  {
    slug: 'context-menu',
    name: 'Context Menu',
    group: 'ui',
    importPath: '@/design-system/components/ui/context-menu',
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    group: 'ui',
    importPath: '@/design-system/components/ui/dialog',
  },
  {
    slug: 'direction',
    name: 'Direction',
    group: 'ui',
    importPath: '@/design-system/components/ui/direction',
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    group: 'ui',
    importPath: '@/design-system/components/ui/dropdown-menu',
  },
  {
    slug: 'empty',
    name: 'Empty',
    group: 'ui',
    importPath: '@/design-system/components/ui/empty',
  },
  {
    slug: 'field',
    name: 'Field',
    group: 'ui',
    importPath: '@/design-system/components/ui/field',
  },
  {
    slug: 'hover-card',
    name: 'Hover Card',
    group: 'ui',
    importPath: '@/design-system/components/ui/hover-card',
  },
  {
    slug: 'input',
    name: 'Input',
    group: 'ui',
    importPath: '@/design-system/components/ui/input',
  },
  {
    slug: 'input-group',
    name: 'Input Group',
    group: 'ui',
    importPath: '@/design-system/components/ui/input-group',
  },
  {
    slug: 'input-otp',
    name: 'Input OTP',
    group: 'ui',
    importPath: '@/design-system/components/ui/input-otp',
  },
  {
    slug: 'item',
    name: 'Item',
    group: 'ui',
    importPath: '@/design-system/components/ui/item',
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    group: 'ui',
    importPath: '@/design-system/components/ui/kbd',
  },
  {
    slug: 'label',
    name: 'Label',
    group: 'ui',
    importPath: '@/design-system/components/ui/label',
  },
  {
    slug: 'menubar',
    name: 'Menubar',
    group: 'ui',
    importPath: '@/design-system/components/ui/menubar',
  },
  {
    slug: 'native-select',
    name: 'Native Select',
    group: 'ui',
    importPath: '@/design-system/components/ui/native-select',
  },
  {
    slug: 'navigation-menu',
    name: 'Navigation Menu',
    group: 'ui',
    importPath: '@/design-system/components/ui/navigation-menu',
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    group: 'ui',
    importPath: '@/design-system/components/ui/pagination',
  },
  {
    slug: 'popover',
    name: 'Popover',
    group: 'ui',
    importPath: '@/design-system/components/ui/popover',
  },
  {
    slug: 'progress',
    name: 'Progress',
    group: 'ui',
    importPath: '@/design-system/components/ui/progress',
  },
  {
    slug: 'radio-group',
    name: 'Radio Group',
    group: 'ui',
    importPath: '@/design-system/components/ui/radio-group',
  },
  {
    slug: 'resizable',
    name: 'Resizable',
    group: 'ui',
    importPath: '@/design-system/components/ui/resizable',
  },
  {
    slug: 'scroll-area',
    name: 'Scroll Area',
    group: 'ui',
    importPath: '@/design-system/components/ui/scroll-area',
  },
  {
    slug: 'select',
    name: 'Select',
    group: 'ui',
    importPath: '@/design-system/components/ui/select',
  },
  {
    slug: 'separator',
    name: 'Separator',
    group: 'ui',
    importPath: '@/design-system/components/ui/separator',
  },
  {
    slug: 'sheet',
    name: 'Sheet',
    group: 'ui',
    importPath: '@/design-system/components/ui/sheet',
  },
  {
    slug: 'sidebar',
    name: 'Sidebar',
    group: 'ui',
    importPath: '@/design-system/components/ui/sidebar',
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    group: 'ui',
    importPath: '@/design-system/components/ui/skeleton',
  },
  {
    slug: 'slider',
    name: 'Slider',
    group: 'ui',
    importPath: '@/design-system/components/ui/slider',
  },
  {
    slug: 'sonner',
    name: 'Sonner',
    group: 'ui',
    importPath: '@/design-system/components/ui/sonner',
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    group: 'ui',
    importPath: '@/design-system/components/ui/spinner',
  },
  {
    slug: 'switch',
    name: 'Switch',
    group: 'ui',
    importPath: '@/design-system/components/ui/switch',
  },
  {
    slug: 'table',
    name: 'Table',
    group: 'ui',
    importPath: '@/design-system/components/ui/table',
  },
  {
    slug: 'rhf-checkbox',
    name: 'RHF Checkbox',
    group: 'rhf',
    importPath: '@/design-system/components/rhf',
  },
  {
    slug: 'rhf-combobox',
    name: 'RHF Combobox',
    group: 'rhf',
    importPath: '@/design-system/components/rhf',
  },
  {
    slug: 'rhf-error-message',
    name: 'RHF Error Message',
    group: 'rhf',
    importPath: '@/design-system/components/rhf',
  },
  {
    slug: 'rhf-input',
    name: 'RHF Input',
    group: 'rhf',
    importPath: '@/design-system/components/rhf',
  },
  {
    slug: 'rhf-select',
    name: 'RHF Select',
    group: 'rhf',
    importPath: '@/design-system/components/rhf',
  },
  {
    slug: 'rhf-switch',
    name: 'RHF Switch',
    group: 'rhf',
    importPath: '@/design-system/components/rhf',
  },
  {
    slug: 'rhf-textarea',
    name: 'RHF Textarea',
    group: 'rhf',
    importPath: '@/design-system/components/rhf',
  },
];

export default function ComponentsIndexPage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Usage Guide
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
            Component documentation template
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Đây là khung docs cho từng component. Mỗi page sẽ có tên component, import, props, và
            các section usage gồm preview và code.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/components/${guide.slug}`}
              className="group rounded-[24px] border border-border/70 bg-background px-5 py-5 transition hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{guide.name}</h2>
                <span className="rounded-full border border-border/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {guide.group}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{guide.importPath}</p>
              <p className="mt-5 text-sm font-medium text-foreground/80 transition group-hover:text-foreground">
                Open guide
              </p>
            </Link>
          ))}
        </section>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            TOC
          </p>
          <nav className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a href="#overview" className="block transition hover:text-foreground">
              Overview
            </a>
            <a href="#structure" className="block transition hover:text-foreground">
              Page structure
            </a>
            <a href="#next-step" className="block transition hover:text-foreground">
              Next step
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
