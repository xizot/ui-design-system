import Link from "next/link";

import { getAllComponentGuides } from "@/lib/component-guides";

export default function ComponentsIndexPage() {
  const guides = getAllComponentGuides();

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Usage Guide
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">Component documentation template</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Đây là khung docs cho từng component. Mỗi page sẽ có tên component, import, props, và các section
            usage gồm preview và code.
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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">TOC</p>
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
