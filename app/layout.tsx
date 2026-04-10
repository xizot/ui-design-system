import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { STYLE_PRESET_CSS } from '@/constants/style-preset-css';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UI Design System',
  description:
    'A comprehensive design system with reusable UI components built with Next.js, TypeScript, and Tailwind CSS',
  keywords: ['UI', 'Design System', 'Components', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Design System Team' }],
  openGraph: {
    title: 'UI Design System',
    description: 'A comprehensive design system with reusable UI components',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI Design System',
    description: 'A comprehensive design system with reusable UI components',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <Script
          id="style-preset-data"
          type="application/json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STYLE_PRESET_CSS) }}
        />
        <Script id="style-preset-bootstrap" strategy="beforeInteractive">{`
          (() => {
            try {
              const presetKey = 'design-system-style-preset';
              const styleId = 'design-system-style-preset';
              const presetDataElement = document.getElementById('style-preset-data');
              const preset = window.localStorage.getItem(presetKey);
              const presetMap = presetDataElement ? JSON.parse(presetDataElement.textContent ?? '{}') : {};
              const cssText = preset ? presetMap[preset] : '';

              if (!preset || !cssText) {
                return;
              }

              document.documentElement.dataset.stylePreset = preset;

              let styleElement = document.getElementById(styleId);

              if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                document.head.appendChild(styleElement);
              }

              styleElement.textContent = cssText;
            } catch (error) {}
          })();
        `}</Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
