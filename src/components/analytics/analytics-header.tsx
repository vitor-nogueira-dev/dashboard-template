'use client';

import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { toast } from 'sonner';
import { CalendarIcon, Download, FileText, LineChart, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function AnalyticsHeader() {
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const handleExport = (type: string) => {
    toast.success(`Exporting data as ${type}`);
  };

  const handleRefresh = () => {
    toast.success('Data refreshed successfully');
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your sales performance and customer behavior</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => range && setDate(range as { from: Date, to: Date })}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh data</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('CSV')}>
              <FileText className="mr-2 h-4 w-4" />
              <span>CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('Excel')}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Excel</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('PDF')}>
              <FileText className="mr-2 h-4 w-4" />
              <span>PDF</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('Chart')}>
              <LineChart className="mr-2 h-4 w-4" />
              <span>Chart Image</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
