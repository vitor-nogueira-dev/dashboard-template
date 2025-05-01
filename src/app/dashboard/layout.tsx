import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen">
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </div>
  );
}
