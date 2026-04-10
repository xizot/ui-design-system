import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theme Toggle - UI Design System',
  description: 'Theme toggle component documentation',
};

export default function ThemeToggleGuidePage() {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <section className="rounded-[28px] border border-border/70 bg-card px-8 py-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            ui
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Theme Toggle</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A button component that allows users to toggle between light and dark themes.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <div className="rounded-[24px] border border-border/70 bg-card px-8 py-6">
            <h2 className="text-2xl font-semibold">Installation</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium">1. Install next-themes</h3>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                  <pre className="text-sm text-card-foreground">
                    <code>npm install next-themes</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">2. Create ThemeProvider</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create a provider component at{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">
                    components/providers/theme-provider.tsx
                  </code>
                  :
                </p>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                  <pre className="text-sm text-card-foreground">
                    <code>{`'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">3. Add ThemeProvider to root layout</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Update your <code className="bg-muted px-1 py-0.5 rounded">app/layout.tsx</code>:
                </p>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                  <pre className="text-sm text-card-foreground">
                    <code>{`import { ThemeProvider } from '@/components/providers/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">4. Create ThemeToggle component</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create the toggle component at{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">
                    components/ui/theme-toggle.tsx
                  </code>
                  :
                </p>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                  <pre className="text-sm text-card-foreground">
                    <code>{`'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">5. Add CSS variables for dark mode</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Update your <code className="bg-muted px-1 py-0.5 rounded">app/globals.css</code>{' '}
                  with dark mode variables:
                </p>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                  <pre className="text-sm text-card-foreground">
                    <code>{`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-card px-8 py-6">
            <h2 className="text-2xl font-semibold">Usage</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium">Import and use</h3>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                  <pre className="text-sm text-card-foreground">
                    <code>{`import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Header() {
  return (
    <header>
      <div className="container mx-auto flex items-center justify-between">
        <h1>My App</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">In navigation</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add the theme toggle to your navigation or header component:
                </p>
                <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                  <pre className="text-sm text-card-foreground">
                    <code>{`import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Contact</Button>
      </div>
      <ThemeToggle />
    </nav>
  )
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-card px-8 py-6">
            <h2 className="text-2xl font-semibold">ThemeProvider Props</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border/70">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Prop</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Default</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/70">
                    <td className="px-4 py-3 font-medium">attribute</td>
                    <td className="px-4 py-3 text-muted-foreground">string</td>
                    <td className="px-4 py-3 text-muted-foreground">"class"</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      HTML attribute to apply theme to
                    </td>
                  </tr>
                  <tr className="border-b border-border/70">
                    <td className="px-4 py-3 font-medium">defaultTheme</td>
                    <td className="px-4 py-3 text-muted-foreground">string</td>
                    <td className="px-4 py-3 text-muted-foreground">"system"</td>
                    <td className="px-4 py-3 text-muted-foreground">Default theme to use</td>
                  </tr>
                  <tr className="border-b border-border/70">
                    <td className="px-4 py-3 font-medium">enableSystem</td>
                    <td className="px-4 py-3 text-muted-foreground">boolean</td>
                    <td className="px-4 py-3 text-muted-foreground">true</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Enable system theme detection
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">disableTransitionOnChange</td>
                    <td className="px-4 py-3 text-muted-foreground">boolean</td>
                    <td className="px-4 py-3 text-muted-foreground">false</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Disable transitions when changing theme
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-card px-8 py-6">
            <h2 className="text-2xl font-semibold">useTheme Hook</h2>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                The <code className="bg-muted px-1 py-0.5 rounded">useTheme</code> hook from
                next-themes provides access to theme state and controls:
              </p>
              <div className="mt-2 overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 text-card-foreground">
                <pre className="text-sm text-card-foreground">
                  <code>{`'use client'

import { useTheme } from 'next-themes'

export function ThemeInfo() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>System theme: {systemTheme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}`}</code>
                </pre>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border/70">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Property</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/70">
                      <td className="px-4 py-3 font-medium">theme</td>
                      <td className="px-4 py-3 text-muted-foreground">string</td>
                      <td className="px-4 py-3 text-muted-foreground">Current theme value</td>
                    </tr>
                    <tr className="border-b border-border/70">
                      <td className="px-4 py-3 font-medium">setTheme</td>
                      <td className="px-4 py-3 text-muted-foreground">function</td>
                      <td className="px-4 py-3 text-muted-foreground">Function to set theme</td>
                    </tr>
                    <tr className="border-b border-border/70">
                      <td className="px-4 py-3 font-medium">systemTheme</td>
                      <td className="px-4 py-3 text-muted-foreground">string</td>
                      <td className="px-4 py-3 text-muted-foreground">System's preferred theme</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">resolvedTheme</td>
                      <td className="px-4 py-3 text-muted-foreground">string</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        Actual theme being applied
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block">
        <div className="sticky top-24 rounded-[24px] border border-border/70 bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            TOC
          </p>
          <nav className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a href="#installation" className="block transition hover:text-foreground">
              Installation
            </a>
            <a href="#usage" className="block transition hover:text-foreground">
              Usage
            </a>
            <a href="#themeprovider-props" className="block transition hover:text-foreground">
              ThemeProvider Props
            </a>
            <a href="#usetheme-hook" className="block transition hover:text-foreground">
              useTheme Hook
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}

