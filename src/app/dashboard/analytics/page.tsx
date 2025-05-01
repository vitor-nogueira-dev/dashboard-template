import type { Metadata } from 'next';

import { AnalyticsHeader } from '@/components/analytics/analytics-header';
import { AnalyticsStats } from '@/components/analytics/analytics-stats';
import { AnalyticsTable } from '@/components/analytics/analytics-table';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Detailed analytics and sales performance metrics',
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <div className=" flex items-center justify-center">
        <AnalyticsStats />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <AnalyticsTable />
      </div>
    </div>
  );
}
