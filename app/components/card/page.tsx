'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect } from 'react';

import { getGuide } from '../guide-data';
import { CardApiReferenceContent, cardApiReferenceLinks } from './card-api-reference';
import { CardSpacingExample, cardSpacingCode } from './card-spacing-example';
import { CardWithImageExample, cardWithImageCode } from './card-with-image-example';
import { DefaultCardExample, defaultCardCode } from './default-card-example';

const guide = getGuide('card');

const usageSamples = [
  {
    id: 'default',
    label: 'Default',
    preview: <DefaultCardExample />,
    code: defaultCardCode,
  },
  {
    id: 'spacing',
    label: 'Spacing',
    preview: <CardSpacingExample />,
    code: cardSpacingCode,
  },
  {
    id: 'with-image',
    label: 'With Image',
    preview: <CardWithImageExample />,
    code: cardWithImageCode,
  },
];

export default function CardGuidePage() {
  useEffect(() => {
    document.title = `${guide.name} - UI Design System`;
  }, []);
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            Displays content and actions on a single topic with optional header, footer, and image.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 scroll-mt-20 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>Import the card components from the design system.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "${guide.importPath}"`}
                id="import"
                className="bg-muted/30"
              />
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 scroll-mt-20 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Usages</CardTitle>
              <CardDescription>Common card patterns and configurations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={usageSamples[0]?.id} className="gap-6">
                <TabsList variant="line">
                  {usageSamples.map((sample) => (
                    <TabsTrigger key={sample.id} value={sample.id}>
                      {sample.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {usageSamples.map((sample) => (
                  <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                    <div className="border-border bg-muted/30 rounded-[20px] border border-dashed p-8">
                      <div className="bg-card flex min-h-56 items-center justify-center rounded-[18px] p-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <CodeBlock code={sample.code} id={sample.id} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card id="api-reference" className="border-border/70 scroll-mt-20 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. API Reference</CardTitle>
              <CardDescription>Props and responsibilities for each card component.</CardDescription>
            </CardHeader>
            <CardContent className="gap-10">
              <CardApiReferenceContent />
            </CardContent>
          </Card>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="border-border/70 bg-card sticky top-24 rounded-[24px] border p-5">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.24em] uppercase">
            TOC
          </p>
          <nav className="text-muted-foreground mt-4 space-y-3 text-sm">
            <a href="#import" className="hover:text-foreground block transition">
              Import
            </a>
            <a href="#usages" className="hover:text-foreground block transition">
              Usages
            </a>
            <div className="space-y-2">
              <a href="#api-reference" className="hover:text-foreground block transition">
                API Reference
              </a>
              <div className="border-border/70 space-y-2 border-l pl-3 text-xs">
                {cardApiReferenceLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="hover:text-foreground block transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
