import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppSidebar as AppSidebar04 } from '@/internal-components/sidebar-04/app-sidebar';
import { AppSidebar as AppSidebar07 } from '@/internal-components/sidebar-07/app-sidebar';
import { AppSidebar as AppSidebar08 } from '@/internal-components/sidebar-08/app-sidebar';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

import { getGuide } from '../guide-data';

const guide = getGuide('sidebar');

export const metadata: Metadata = {
  title: `${guide.name} - UI Design System`,
  description: `${guide.name} component documentation`,
};

const props = [
  { name: 'className', type: 'string', defaultValue: '--' },
  { name: 'variant', type: `"sidebar" | "floating" | "inset"`, defaultValue: `"sidebar"` },
  { name: 'side', type: `"left" | "right"`, defaultValue: `"left"` },
  { name: 'collapsible', type: `"offcanvas" | "icon" | "none"`, defaultValue: `"offcanvas"` },
];

const starterCode = `import type { ReactNode } from "react"
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger,
} from "@/design-system/components/ui/sidebar"

const links = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Settings", href: "/settings" },
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarMenu>
                  {links.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton render={<a href={link.href} />}>
                        {link.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center px-4">
              <SidebarTrigger />
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}`;

const sidebar07Code = `"use client"

import * as React from "react"
import {
  AudioLinesIcon, BookOpenIcon, ChevronRightIcon, GalleryVerticalEndIcon,
  Settings2Icon, TerminalIcon, TerminalSquareIcon,
} from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider,
  SidebarRail, SidebarTrigger,
} from "@/design-system/components/ui/sidebar"

const teams = [
  { name: "Acme Inc", icon: GalleryVerticalEndIcon },
  { name: "Acme Corp.", icon: AudioLinesIcon },
  { name: "Evil Corp.", icon: TerminalIcon },
]
const navigation = [
  { title: "Playground", icon: TerminalSquareIcon, items: ["History", "Starred", "Settings"] },
  { title: "Documentation", icon: BookOpenIcon, items: ["Introduction", "Get Started"] },
  { title: "Settings", icon: Settings2Icon, items: ["General", "Team"] },
]

function AppSidebar() {
  const [team, setTeam] = React.useState(teams[0])
  const TeamIcon = team.icon
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip={team.name}>
              <TeamIcon className="size-5" />
              <span className="truncate">{team.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {teams.filter((item) => item.name !== team.name).map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton onClick={() => setTeam(item)} tooltip={item.name}>
                <item.icon className="size-4" />{item.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((section) => (
              <SidebarMenuItem key={section.title}>
                <SidebarMenuButton tooltip={section.title}>
                  <section.icon className="size-4" />
                  <span>{section.title}</span><ChevronRightIcon className="ml-auto size-4" />
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item}>
                      <SidebarMenuSubButton render={<a href="#" />}>{item}</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu><SidebarMenuItem>
          <SidebarMenuButton tooltip="Account">shadcn · m@example.com</SidebarMenuButton>
        </SidebarMenuItem></SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center px-4"><SidebarTrigger /></header>
        <main className="p-4">Page content</main>
      </SidebarInset>
    </SidebarProvider>
  )
}`;

const sidebar08Code = `"use client"

import {
  BookOpenIcon, FrameIcon, LifeBuoyIcon, MapIcon, PieChartIcon,
  SendIcon, Settings2Icon, TerminalIcon, TerminalSquareIcon,
} from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider,
  SidebarTrigger,
} from "@/design-system/components/ui/sidebar"

const navigation = [
  { title: "Playground", icon: TerminalSquareIcon, items: ["History", "Starred", "Settings"] },
  { title: "Documentation", icon: BookOpenIcon, items: ["Introduction", "Get Started"] },
  { title: "Settings", icon: Settings2Icon, items: ["General", "Team"] },
]
const projects = [
  { title: "Design Engineering", icon: FrameIcon },
  { title: "Sales & Marketing", icon: PieChartIcon },
  { title: "Travel", icon: MapIcon },
]

function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu><SidebarMenuItem>
          <SidebarMenuButton size="lg" render={<a href="#" />}>
            <TerminalIcon className="size-5" />
            <span className="grid text-left"><strong>Acme Inc</strong><small>Enterprise</small></span>
          </SidebarMenuButton>
        </SidebarMenuItem></SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((section) => (
              <SidebarMenuItem key={section.title}>
                <SidebarMenuButton>
                  <section.icon className="size-4" />{section.title}
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item}>
                      <SidebarMenuSubButton render={<a href="#" />}>{item}</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.title}>
                <SidebarMenuButton render={<a href="#" />}>
                  <project.icon className="size-4" />{project.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem><SidebarMenuButton render={<a href="#" />}>
              <LifeBuoyIcon className="size-4" />Support
            </SidebarMenuButton></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuButton render={<a href="#" />}>
              <SendIcon className="size-4" />Feedback
            </SidebarMenuButton></SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu><SidebarMenuItem>
          <SidebarMenuButton>shadcn · m@example.com</SidebarMenuButton>
        </SidebarMenuItem></SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center px-4"><SidebarTrigger /></header>
        <main className="p-4">Page content</main>
      </SidebarInset>
    </SidebarProvider>
  )
}`;

const usageSamples = [
  {
    id: 'sidebar-04',
    label: 'Sidebar 04',
    description:
      'Floating sidebar variant for documentation-style navigation with nested sub-items.',
    preview: (
      <div
        className="border-border/70 overflow-hidden rounded-[18px] border"
        style={{ height: 500, transform: 'translateZ(0)' }}
      >
        <SidebarProvider style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
          <AppSidebar04 />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100px] flex-1 rounded-xl" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    ),
    files: [
      {
        name: 'page.tsx',
        code: `import { AppSidebar } from "./app-sidebar"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/design-system/components/ui/breadcrumb"
import { Separator } from "@/design-system/components/ui/separator"
import {
  SidebarInset, SidebarProvider, SidebarTrigger,
} from "@/design-system/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* page content */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}`,
      },
      {
        name: 'app-sidebar.tsx',
        code: `"use client"

import * as React from "react"
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from "@/design-system/components/ui/sidebar"
import { GalleryVerticalEndIcon } from "lucide-react"

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        { title: "Installation", url: "#" },
        { title: "Project Structure", url: "#" },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        { title: "Routing", url: "#" },
        { title: "Data Fetching", url: "#", isActive: true },
        { title: "Rendering", url: "#" },
        // ...more items
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEndIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Documentation</span>
                <span>v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton render={<a href={item.url} className="font-medium" />}>
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton isActive={sub.isActive} render={<a href={sub.url} />}>
                          {sub.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}`,
      },
    ],
  },
  {
    id: 'sidebar-07',
    label: 'Sidebar 07',
    description: 'Collapsible icon sidebar with team switcher and rail.',
    preview: (
      <div
        className="border-border/70 overflow-hidden rounded-[18px] border"
        style={{ height: 500, transform: 'translateZ(0)' }}
      >
        <SidebarProvider>
          <AppSidebar07 />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100px] flex-1 rounded-xl" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    ),
    files: [{ name: 'page.tsx', code: sidebar07Code }],
  },
  {
    id: 'sidebar-08',
    label: 'Sidebar 08',
    description:
      'Inset sidebar with app logo header, collapsible nav, projects, secondary nav, and user footer.',
    preview: (
      <div
        className="border-border/70 overflow-hidden rounded-[18px] border"
        style={{ height: 500, transform: 'translateZ(0)' }}
      >
        <SidebarProvider>
          <AppSidebar08 />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100px] flex-1 rounded-xl" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    ),
    files: [{ name: 'page.tsx', code: sidebar08Code }],
  },
];

export default function SidebarGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="border-border/70 bg-card rounded-[28px] border px-8 py-10 shadow-sm">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.24em] uppercase">
            {guide.group}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{guide.name}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            A composable, themeable and customizable sidebar component.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <Card id="import" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>1. Import</CardTitle>
              <CardDescription>
                Import the sidebar components from the design system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                id="sidebar-import"
                code={`import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "${guide.importPath}";`}
              />
            </CardContent>
          </Card>

          <Card id="quick-start" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>2. Quick start after installation</CardTitle>
              <CardDescription>
                The installer copies the sidebar primitives, not an application navigation menu.
                Copy this single-file example into your Next.js root layout, then replace the
                example links with your routes. The import path is for Source mode with the default
                <code className="mx-1">@/design-system</code> alias.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                If you already have a root layout, keep its existing HTML, providers, and global CSS; place
                <code className="mx-1">SidebarProvider</code> inside its body around the
                sidebar and page content. For Package mode, change the sidebar imports to
                <code className="mx-1">ui-design-system/components/ui/sidebar</code> and follow
                the package CSS setup in Installation.
              </p>
              <p className="text-muted-foreground text-xs font-medium">app/layout.tsx</p>
              <CodeBlock id="sidebar-quick-start" code={starterCode} />
              <p className="text-muted-foreground text-sm">
                <code>SidebarProvider</code> owns open state; <code>SidebarTrigger</code> toggles
                desktop and mobile views. Add <code>collapsible=&quot;icon&quot;</code> to
                <code className="mx-1">Sidebar</code> only when menu items have icons and
                tooltips. The component also supports Ctrl/Cmd+B.
              </p>
            </CardContent>
          </Card>

          <Card id="props" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>3. Props</CardTitle>
              <CardDescription>Sidebar component props.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/70 overflow-hidden rounded-2xl border">
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
                        className={cn(index !== props.length - 1 && 'border-border/70 border-b')}
                      >
                        <td className="px-4 py-3 font-medium">{prop.name}</td>
                        <td className="text-muted-foreground px-4 py-3">{prop.type}</td>
                        <td className="text-muted-foreground px-4 py-3">{prop.defaultValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card id="usages" className="border-border/70 rounded-[24px]">
            <CardHeader>
              <CardTitle>4. Advanced examples</CardTitle>
              <CardDescription>
                These previews use application files under internal-components in this repository.
                The installer does not copy them. Start with the single-file example above, then
                adapt these patterns to your own navigation.
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
                  <TabsContent key={sample.id} value={sample.id} className="space-y-5">
                    {sample.description && (
                      <p className="text-muted-foreground text-sm">{sample.description}</p>
                    )}

                    <div className="border-border bg-muted/30 rounded-[20px] border border-dashed p-4">
                      {sample.preview}
                    </div>

                    <Tabs defaultValue={sample.files[0]?.name} className="gap-0">
                      <div className="border-border/70 bg-muted/30 flex items-center rounded-t-2xl border px-4 pt-3">
                        <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
                          {sample.files.map((file) => (
                            <TabsTrigger
                              key={file.name}
                              value={file.name}
                              className="text-muted-foreground data-selected:border-foreground data-selected:text-foreground rounded-none border-b-2 border-transparent px-3 pb-3 text-xs"
                            >
                              {file.name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>
                      {sample.files.map((file) => (
                        <TabsContent key={file.name} value={file.name} className="mt-0">
                          <CodeBlock
                            id={`sidebar-${sample.id}-${file.name}`}
                            code={file.code}
                            className="[&>div:first-child]:rounded-t-none [&>div:first-child]:border-t-0"
                          />
                        </TabsContent>
                      ))}
                    </Tabs>
                  </TabsContent>
                ))}
              </Tabs>
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
            <a href="#quick-start" className="hover:text-foreground block transition">
              Quick start
            </a>
            <a href="#props" className="hover:text-foreground block transition">
              Props
            </a>
            <a href="#usages" className="hover:text-foreground block transition">
              Advanced examples
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
