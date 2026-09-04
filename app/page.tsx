import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--foreground)_4%,transparent),transparent_35%),linear-gradient(180deg,var(--background),color-mix(in_oklab,var(--background),var(--muted)_42%))] px-6 py-16">
      <div className="border-border/70 bg-card w-full max-w-4xl rounded-4xl border px-10 py-14 shadow-sm">
        <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
          UI Design System
        </p>
        <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight">
          Component usage guide template
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-7">
          Docs shell cho từng component đã sẵn sàng. Route chính nằm ở{' '}
          <code className="bg-muted rounded px-2 py-1 text-sm">/components</code>.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/components"
            className="bg-foreground text-background rounded-full px-5 py-3 text-sm font-medium transition hover:opacity-90"
          >
            Open Components Guide
          </Link>
        </div>
      </div>
    </main>
  );
}
