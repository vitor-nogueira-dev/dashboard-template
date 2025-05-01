import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import type { Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';

import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';

import { AuthProvider } from '@/contexts/auth-context';
import { ThemeColorProvider } from '@/contexts/theme-color-context';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard Template - Next.js & ShadcnUI',
  description: 'A modern, open-source dashboard template built with Next.js 15, ShadcnUI, TypeScript, and Tailwind CSS. Perfect for scalable web applications.',
  keywords: [
    'dashboard template',
    'Next.js',
    'ShadcnUI',
    'TypeScript',
    'Tailwind CSS',
    'React',
    'open-source',
    'web development',
    'UI components',
    'Context API',
  ],
  authors: [{ name: 'Vitor Nogueira', url: 'https://github.com/vitor-nogueira-dev' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Dashboard Template - Next.js & ShadcnUI',
    description: 'Build scalable dashboards with this open-source template featuring Next.js 15, ShadcnUI, TypeScript, and Tailwind CSS.',
    url: 'https://github.com/vitor-nogueira-dev/dashboard-template',
    siteName: 'Dashboard Template',
    images: [
      {
        url: '/example-application.png',
        width: 1200,
        height: 630,
        alt: 'Dashboard Template Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/apple-touch-icon.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeColorProvider>
            <AuthProvider>
              <SidebarProvider>
                {children}
                <Toaster position="top-right" richColors />
                <Analytics />
              </SidebarProvider>
            </AuthProvider>
          </ThemeColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}