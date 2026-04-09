import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const guide = {
  name: "RHF Combobox",
  group: "rhf",
  importPath: "@/design-system/components/rhf",
} as const;

const props = [
  { name: "control", type: "Control<T>", defaultValue: "--" },
  { name: "name", type: "Path<T>", defaultValue: "--" },
  { name: "items", type: "string[]", defaultValue: "--" },
  { name: "label", type: "string", defaultValue: "--" },
  { name: "description", type: "string", defaultValue: "--" },
  { name: "required", type: "boolean", defaultValue: "false" },
  { name: "placeholder", type: "string", defaultValue: "--" },
  { name: "callback", type: "(newValue: string) => void", defaultValue: "--" },
  { name: "inputClassName", type: "string", defaultValue: "--" },
  { name: "contentClassName", type: "string", defaultValue: "--" },
  { name: "listClassName", type: "string", defaultValue: "--" },
  { name: "wrapperClassName", type: "string", defaultValue: "--" },
  { name: "labelClassName", type: "string", defaultValue: "--" },
  { name: "descriptionClassName", type: "string", defaultValue: "--" },
  { name: "errorClassName", type: "string", defaultValue: "--" },
];

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

const usageSamples = [
  {
    id: "basic",
    label: "Basic",
    preview: (
      <div className="w-full max-w-md space-y-4 p-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium leading-5">Framework</label>
          <Combobox>
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {frameworks.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    ),
    code: `import { RHFCombobox } from "@/design-system/components/rhf";
import { useForm } from "react-hook-form";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export function ExampleCombobox() {
  const { control } = useForm({
    defaultValues: {
      framework: "",
    },
  });

  return (
    <RHFCombobox
      control={control}
      name="framework"
      items={frameworks}
      label="Framework"
      placeholder="Select a framework"
    />
  );
}`,
  },
];

export default function RHFComboboxGuidePage() {
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
            A React Hook Form combobox component with built-in error handling and validation support.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the RHF Combobox component from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/30 p-4">
                <code className="text-sm">{`import { RHFCombobox } from "${guide.importPath}";`}</code>
              </div>
            </CardContent>
          </Card>

          <Card id="props" className="rounded-[24px] border-border/70">
            <CardHeader>
              <CardTitle>2. Props</CardTitle>
              <CardDescription>
                RHF Combobox component props.
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
                Common RHF Combobox patterns and configurations.
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
