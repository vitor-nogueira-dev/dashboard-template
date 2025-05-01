import type React from 'react';

import { Logo } from '@/components/logo';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeColorSelector } from '@/components/theme-color-selector';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 w-full justify-center mx-auto">
      <div className="hidden md:flex bg-muted/40 items-center justify-center p-8">
        <div className="max-w-md">
          <Logo className="h-12 w-auto mb-8" />
          <h1 className="text-3xl font-bold mb-4">Welcome to our Dashboard Template</h1>
          <p className="text-muted-foreground">
            A comprehensive dashboard solution with authentication, charts, tables, and customizable themes. Built with
            Next.js 15 and shadcn/ui.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-4 right-4 space-x-2">
          <ModeToggle />
          <ThemeColorSelector />
        </div>
        <div className="md:hidden mb-8">
          <Logo className="h-10 w-auto" />
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
