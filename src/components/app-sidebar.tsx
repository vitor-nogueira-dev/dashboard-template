'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, ChevronDown, FileText, LayoutDashboard, Settings, User } from 'lucide-react';

import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from './ui/button';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export function AppSidebar() {
  const pathname = usePathname();

  const { resolvedTheme } = useTheme();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isSubActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center px-2 py-2">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard')}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen={isSubActive('/dashboard/components-guide')} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isSubActive('/dashboard/components-guide')}>
                      <FileText />
                      <span>UI Components</span>
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={isActive('/dashboard/components-guide')}>
                          <Link href="/dashboard/components-guide" className="mt-2">Overview</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={isActive('/dashboard/components-guide/forms')}>
                          <Link href="/dashboard/components-guide/forms">Forms & Inputs</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={isActive('/dashboard/components-guide/display')}>
                          <Link href="/dashboard/components-guide/display">Data Display</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/analytics')}>
                  <Link href="/dashboard/analytics">
                    <BarChart3 />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/profile')}>
                  <Link href="/dashboard/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/settings')}>
                  <Link href="/dashboard/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Authentication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/signin')}>
                  <Link href="/signin">
                    <User />
                    <span>Signin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/signup')}>
                  <Link href="/signup">
                    <Settings />
                    <span>Signup</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/reset-password')}>
                  <Link href="/reset-password">
                    <Settings />
                    <span>Reset Password</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-6">
        <Button variant="outline">
          <Link href="https://github.com/vitor-nogueira-dev/dashboard-template" className='flex items-center' target='_blank'>
            View on GitHub

            <Image
              src={(resolvedTheme === 'dark' || resolvedTheme === 'system') ? '/icons/github-light.svg' : '/icons/github-dark.svg'}
              alt="GitHub Logo"
              width={20}
              height={20}
              className="ml-2 h-4 w-4"
            />
          </Link>
        </Button>
        <div className="p-2 text-xs text-muted-foreground text-center">
          <p>
            Dashboard Template v1.0.0 © {new Date().getFullYear()}</p>
          <p>By <Link target='_blank' href="https://www.linkedin.com/in/vitor-nogueira-dev/" className="hover:text-primary dark:hover:text-primary transition-colors text-foreground dark:text-white underline">@onogueiradev</Link></p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
