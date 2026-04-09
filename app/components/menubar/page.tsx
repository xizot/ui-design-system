import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const guide = {
  name: "Menubar",
  group: "ui",
  importPath: "@/design-system/components/ui/menubar",
} as const;

const props = [
  { name: "className", type: "string", defaultValue: "--" },
];

const usageSamples = [
  {
    id: "default",
    label: "Default",
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>Reload</MenubarItem>
            <MenubarItem inset>Force Reload</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    code: `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
} from "@/design-system/components/ui/menubar";

export function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>Reload</MenubarItem>
          <MenubarItem inset>Force Reload</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`,
  },
  {
    id: "with-submenu",
    label: "With Submenu",
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Document 1</MenubarItem>
                <MenubarItem>Document 2</MenubarItem>
                <MenubarItem>Document 3</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    code: `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/design-system/components/ui/menubar";

export function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Document 1</MenubarItem>
              <MenubarItem>Document 2</MenubarItem>
              <MenubarItem>Document 3</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`,
  },
  {
    id: "radio-group",
    label: "Radio Group",
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Zoom</MenubarLabel>
            <MenubarRadioGroup value="100%">
              <MenubarRadioItem value="50%">50%</MenubarRadioItem>
              <MenubarRadioItem value="75%">75%</MenubarRadioItem>
              <MenubarRadioItem value="100%">100%</MenubarRadioItem>
              <MenubarRadioItem value="125%">125%</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    code: `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarLabel,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "@/design-system/components/ui/menubar";

export function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Zoom</MenubarLabel>
          <MenubarRadioGroup value="100%">
            <MenubarRadioItem value="50%">50%</MenubarRadioItem>
            <MenubarRadioItem value="75%">75%</MenubarRadioItem>
            <MenubarRadioItem value="100%">100%</MenubarRadioItem>
            <MenubarRadioItem value="125%">125%</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`,
  },
];

export default function MenubarGuidePage() {
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
            A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the menubar components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "${guide.importPath}"`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                Menubar component props.
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
                Common menubar patterns and configurations.
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
