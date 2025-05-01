'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Monthly sales data
const chartData = [
  { month: 'Jan', sales: 4000, fill: 'var(--chart-1)' },
  { month: 'Feb', sales: 3000, fill: 'var(--chart-2)' },
  { month: 'Mar', sales: 5000, fill: 'var(--chart-3)' },
  { month: 'Apr', sales: 2780, fill: 'var(--chart-4)' },
  { month: 'May', sales: 1890, fill: 'var(--chart-5)' },
  { month: 'Jun', sales: 2390, fill: 'var(--chart-1)' },
  { month: 'Jul', sales: 3490, fill: 'var(--chart-2)' },
  { month: 'Aug', sales: 4000, fill: 'var(--chart-3)' },
  { month: 'Sep', sales: 5000, fill: 'var(--chart-4)' },
  { month: 'Oct', sales: 8000, fill: 'var(--chart-5)' },
  { month: 'Nov', sales: 6500, fill: 'var(--chart-1)' },
  { month: 'Dec', sales: 7000, fill: 'var(--chart-2)' },
];

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--chart-1))',
  },
  jan: {
    label: 'Jan',
    color: 'hsl(var(--chart-1))',
  },
  feb: {
    label: 'Feb',
    color: 'hsl(var(--chart-2))',
  },
  mar: {
    label: 'Mar',
    color: 'hsl(var(--chart-3))',
  },
  apr: {
    label: 'Apr',
    color: 'hsl(var(--chart-4))',
  },
  may: {
    label: 'May',
    color: 'hsl(var(--chart-5))',
  },
  jun: {
    label: 'Jun',
    color: 'hsl(var(--chart-1))',
  },
  jul: {
    label: 'Jul',
    color: 'hsl(var(--chart-2))',
  },
  aug: {
    label: 'Aug',
    color: 'hsl(var(--chart-3))',
  },
  sep: {
    label: 'Sep',
    color: 'hsl(var(--chart-4))',
  },
  oct: {
    label: 'Oct',
    color: 'hsl(var(--chart-5))',
  },
  nov: {
    label: 'Nov',
    color: 'hsl(var(--chart-1))',
  },
  dec: {
    label: 'Dec',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function SalesChart() {
  // Find the month with highest sales for active bar
  const highestSalesIndex = chartData.reduce(
    (maxIndex, current, currentIndex, array) =>
      current.sales > array[maxIndex].sales ? currentIndex : maxIndex,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales performance for the current year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} className="stroke-muted" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                className="text-xs text-muted-foreground"
                tickFormatter={(value) => `$${value}`}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="sales"
                strokeWidth={2}
                radius={4}
                activeIndex={highestSalesIndex}
                activeBar={({ ...props }) => {
                  return (
                    <Rectangle
                      {...props}
                      fillOpacity={0.8}
                      stroke={props.payload.fill}
                      strokeDasharray={4}
                      strokeDashoffset={4}
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 18.2% from last year <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for each month of the current year
        </div>
      </CardFooter>
    </Card>
  );
}

