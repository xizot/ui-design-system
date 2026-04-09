import Link from "next/link";

import { cn } from "@/lib/utils";

const guides = [
  { slug: "button", name: "Button", group: "ui" as const },
  { slug: "input", name: "Input", group: "ui" as const },
  { slug: "combobox", name: "Combobox", group: "ui" as const },
  { slug: "accordion", name: "Accordion", group: "ui" as const },
];

export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <p className="text-sm text-muted-foreground">
              Component usage guide template
            </p>
          </div>
          <Link
            href="/components"
            className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium transition hover:border-foreground/20 hover:bg-accent"
          >
            Browse Components
          </Link>
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
            <nav className="space-y-1">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/components/${guide.slug}`}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                    "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <span>{guide.name}</span>
                  <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                    {guide.group}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 p-8">{children}</div>
      </div>
    </div>
  );
}
