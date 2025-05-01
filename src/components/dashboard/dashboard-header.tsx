'use client';

import { useAuth } from '@/contexts/auth-context';

export function DashboardHeader() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, {user?.name || 'User'}! Here&apos;s an overview of your account.
      </p>
    </div>
  );
}
