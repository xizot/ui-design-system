'use client';

import { Check, Copy } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TypographyH1,
  TypographyLead,
  TypographyMuted,
  TypographySmall,
} from '@/components/ui/typography';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useColorSchema, type ColorSchema, type ColorSchemaId } from '@/hooks/use-color-schema';

function formatVariables(variables: Record<string, string>) {
  return Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
}

function getSchemaConfig(schema: ColorSchema) {
  return `:root {\n${formatVariables(schema.light)}\n}\n\n.dark {\n${formatVariables(schema.dark)}\n}`;
}

function getSchemaName(schema: ColorSchema) {
  return schema.name.replace(/^\d+\.\s*/, '');
}

const colorRoles = [
  ['--background', 'Background', 'bg-background'],
  ['--card', 'Card', 'bg-card'],
  ['--primary', 'Primary', 'bg-primary'],
  ['--secondary', 'Secondary', 'bg-secondary'],
  ['--muted', 'Muted', 'bg-muted'],
  ['--accent', 'Accent', 'bg-accent'],
  ['--destructive', 'Destructive', 'bg-destructive'],
  ['--border', 'Border', 'bg-border'],
  ['--ring', 'Ring', 'bg-ring'],
] as const;

export default function ColorGuideClient() {
  const { schemaId, schema: selectedSchema, schemas, setColorSchema } = useColorSchema();
  const { copyToClipboard } = useCopyToClipboard();
  const [copiedId, setCopiedId] = useState<ColorSchemaId | null>(null);
  const schema = selectedSchema ?? schemas[0];
  const schemaConfig = useMemo(() => getSchemaConfig(schema), [schema]);

  const copySchema = useCallback(
    async (entry: ColorSchema) => {
      const success = await copyToClipboard(getSchemaConfig(entry));
      if (!success) {
        return;
      }

      setCopiedId(entry.id);
      window.setTimeout(() => setCopiedId(null), 2000);
    },
    [copyToClipboard],
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <TypographySmall className="text-muted-foreground tracking-[0.24em] uppercase">
            guide
          </TypographySmall>
          <TypographyH1 className="mt-4">Color schema</TypographyH1>
          <TypographyLead className="mt-4 max-w-2xl">
            Chọn một schema để áp dụng cho toàn bộ documentation site, hoặc copy cặp token
            light/dark để dùng trong ứng dụng.
          </TypographyLead>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="schemas" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>Color schemas</CardTitle>
              <CardDescription>
                Click vào tên schema để áp dụng ngay cho tất cả page. Schema đang dùng được đánh dấu
                bằng badge Primary.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {schemas.map((entry) => {
                  const selected = entry.id === schemaId;
                  return (
                    <div
                      key={entry.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      onClick={() => setColorSchema(entry.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setColorSchema(entry.id);
                        }
                      }}
                      className={`border-border/70 hover:bg-accent/50 flex items-center gap-2 rounded-xl border px-3 py-2.5 transition ${
                        selected
                          ? 'border-primary bg-primary/10 ring-primary/20 ring-2'
                          : 'focus-visible:ring-ring/50 cursor-pointer focus-visible:ring-2'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="text-muted-foreground w-6 text-xs tabular-nums">
                          {entry.code}
                        </span>
                        <span className="flex min-w-0 items-center gap-1.5" aria-hidden="true">
                          <span
                            className="size-3 rounded-full"
                            style={{ backgroundColor: entry.light['--primary'] }}
                          />
                          <span
                            className="size-3 rounded-full"
                            style={{ backgroundColor: entry.light['--chart-2'] }}
                          />
                          <span
                            className="size-3 rounded-full"
                            style={{ backgroundColor: entry.light['--chart-3'] }}
                          />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {getSchemaName(entry)}
                        </span>
                        {selected ? (
                          <span className="bg-primary text-primary-foreground shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase">
                            Active
                          </span>
                        ) : null}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={(event) => {
                          event.stopPropagation();
                          void copySchema(entry);
                        }}
                        aria-label={`Copy ${getSchemaName(entry)} configuration`}
                        title={`Copy ${getSchemaName(entry)} configuration`}
                      >
                        {copiedId === entry.id ? <Check /> : <Copy />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card id="configuration" className="border-border/70 rounded-[24px]">
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>
                  {selectedSchema ? getSchemaName(schema) : `Preview: ${getSchemaName(schema)}`}
                </CardTitle>
                <CardDescription className="mt-1">
                  Light: {schema.lightName} · Dark: {schema.name}
                </CardDescription>
              </div>
              <Button type="button" size="sm" variant="outline" onClick={() => copySchema(schema)}>
                {copiedId === schema.id ? (
                  <Check data-icon="inline-start" />
                ) : (
                  <Copy data-icon="inline-start" />
                )}
                {copiedId === schema.id ? 'Copied' : 'Copy config'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {colorRoles.map(([token, label, className]) => (
                  <div
                    key={token}
                    className="border-border/70 flex items-center gap-3 rounded-xl border p-3"
                  >
                    <span
                      className={`size-9 shrink-0 rounded-lg border ${className}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{label}</p>
                      <code className="text-muted-foreground text-xs">{token}</code>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-border/70 bg-muted/30 overflow-x-auto rounded-2xl border p-5">
                <pre className="text-sm leading-6">
                  <code>{schemaConfig}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="border-border/70 bg-card sticky top-24 rounded-[24px] border p-5">
          <TypographySmall className="text-muted-foreground tracking-[0.24em] uppercase">
            Selected schema
          </TypographySmall>
          <p className="mt-3 text-lg font-semibold">
            {selectedSchema ? getSchemaName(schema) : 'Mặc định'}
          </p>
          <TypographyMuted className="mt-1 text-sm">
            {selectedSchema ? schema.lightName : 'Theme của ứng dụng đang được áp dụng.'}
          </TypographyMuted>
          {selectedSchema ? (
            <div className="mt-4 flex gap-2" aria-hidden="true">
              <span
                className="size-8 rounded-lg"
                style={{ backgroundColor: schema.light['--primary'] }}
              />
              <span
                className="size-8 rounded-lg"
                style={{ backgroundColor: schema.light['--chart-2'] }}
              />
              <span
                className="size-8 rounded-lg"
                style={{ backgroundColor: schema.light['--chart-3'] }}
              />
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
