import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const guide = {
  name: "Aspect Ratio",
  group: "ui",
  importPath: "@/design-system/components/ui/aspect-ratio",
} as const;

const props = [
  { name: "ratio", type: "number", defaultValue: "1" },
  { name: "asChild", type: "boolean", defaultValue: "false" },
  { name: "className", type: "string", defaultValue: "--" },
];

const usageSamples = [
  {
    id: "16-9",
    label: "16:9",
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="relative w-full overflow-hidden rounded-lg bg-muted">
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        </div>
      </div>
    ),
    code: `import { AspectRatio } from "@/design-system/components/ui/aspect-ratio";

function Example() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <img
        src="https://example.com/image.jpg"
        alt="Image"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  );
}`,
  },
  {
    id: "4-3",
    label: "4:3",
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="relative w-full overflow-hidden rounded-lg bg-muted">
          <div className="aspect-[4/3] w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        </div>
      </div>
    ),
    code: `import { AspectRatio } from "@/design-system/components/ui/aspect-ratio";

function Example() {
  return (
    <AspectRatio ratio={4 / 3} className="bg-muted">
      <img
        src="https://example.com/image.jpg"
        alt="Image"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  );
}`,
  },
  {
    id: "1-1",
    label: "1:1",
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="relative w-full overflow-hidden rounded-lg bg-muted">
          <div className="aspect-square w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        </div>
      </div>
    ),
    code: `import { AspectRatio } from "@/design-system/components/ui/aspect-ratio";

function Example() {
  return (
    <AspectRatio ratio={1 / 1} className="bg-muted">
      <img
        src="https://example.com/image.jpg"
        alt="Image"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  );
}`,
  },
];

export default function AspectRatioGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            {guide.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Displays content within a specific aspect ratio, useful for images, videos, and other media.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Aspect Ratio component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { AspectRatio } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                Aspect Ratio component props.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/70">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Prop</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={cn(
                          index !== props.length - 1 && "border-b border-border/70",
                        )}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {prop.type}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {prop.defaultValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>3. Usages</CardTitle>
              <CardDescription>
                Common Aspect Ratio patterns and configurations.
              </CardDescription>
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
                  <TabsContent
                    key={sample.id}
                    value={sample.id}
                    className="space-y-5"
                  >
                    <div className="rounded-[20px] border border-dashed border-border bg-[linear-gradient(135deg,rgba(0,0,0,0.02),transparent)] p-8">
                      <div className="flex min-h-56 items-center justify-center rounded-[18px] bg-card px-6 shadow-sm">
                        {sample.preview}
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-[#111111] p-5 text-white">
                      <pre className="text-sm leading-6">
                        <code>{sample.code}</code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            TOC
          </p>
          <nav className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a
              href="#import"
              className="block transition hover:text-foreground"
            >
              Import
            </a>
            <a href="#props" className="block transition hover:text-foreground">
              Props
            </a>
            <a
              href="#usages"
              className="block transition hover:text-foreground"
            >
              Usages
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
