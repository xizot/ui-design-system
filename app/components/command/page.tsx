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
  name: "Command",
  group: "ui",
  importPath: "@/design-system/components/ui/command",
} as const;

const props = [
  { name: "open", type: "boolean", defaultValue: "false" },
  { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "--" },
  { name: "className", type: "string", defaultValue: "--" },
];

const usageSamples = [
  {
    id: "basic",
    label: "Basic",
    preview: (
      <div className="w-full max-w-sm p-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <input
            type="text"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Type a command or search..."
          />
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer">
              <span className="text-sm">New Project</span>
              <span className="ml-auto text-xs text-muted-foreground">⌘N</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer">
              <span className="text-sm">Search</span>
              <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer">
              <span className="text-sm">Settings</span>
              <span className="ml-auto text-xs text-muted-foreground">⌘,</span>
            </div>
          </div>
        </div>
      </div>
    ),
    code: `import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/design-system/components/ui/command";
import { useState } from "react";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup>
          <CommandItem onSelect={() => setOpen(false)}>
            New Project
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            Search
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}`,
  },
];

export default function CommandGuidePage() {
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
            A command palette component for quick actions and navigation with keyboard shortcuts.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the Command component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                Command component props.
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
                Common Command patterns and configurations.
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
