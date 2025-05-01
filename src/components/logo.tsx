import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {

  return (
    <Link href="/dashboard">
      <div className={cn('flex items-center gap-2', className)}>
        <div className="size-8 rounded-md bg-sidebar-primary flex items-center justify-center">
          <span className="text-sidebar-primary-foreground font-bold text-lg">D</span>
        </div>
        <span className="font-bold text-xl">Dashboard</span>
      </div>
    </Link>
  );
}
