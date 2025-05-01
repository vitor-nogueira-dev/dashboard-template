'use client';
import { Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeColorSelector } from '@/components/theme-color-selector';
import { UserNav } from '@/components/user-nav';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { NotificationsPopover, mockNotifications } from '@/components/notifications';

export function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 md:pl-4">
      <Button variant="outline" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <SidebarTrigger className="hidden md:block" />
      <div className="w-full flex items-center md:justify-between justify-end gap-2">
        <div className="relative hidden md:block w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full pl-8" />
        </div>

        <div className="flex items-center gap-2">
          <NotificationsPopover initialNotifications={mockNotifications} />
          <ThemeColorSelector />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
