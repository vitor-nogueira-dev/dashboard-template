'use client';

import { TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { name: 'Product A', value: 400, fill: 'var(--chart-1)' },
  { name: 'Product B', value: 300, fill: 'var(--chart-2)' },
  { name: 'Product C', value: 300, fill: 'var(--chart-3)' },
  { name: 'Product D', value: 200, fill: 'var(--chart-4)' },
  { name: 'Product E', value: 100, fill: 'var(--chart-5)' },
];

const chartConfig = {
  value: {
    label: 'Sales',
  },
  productA: {
    label: 'Product A',
    color: 'hsl(var(--chart-1))',
  },
  productB: {
    label: 'Product B',
    color: 'hsl(var(--chart-2))',
  },
  productC: {
    label: 'Product C',
    color: 'hsl(var(--chart-3))',
  },
  productD: {
    label: 'Product D',
    color: 'hsl(var(--chart-4))',
  },
  productE: {
    label: 'Product E',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function TopProducts() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Distribution of sales by product category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Product A trending up by 12.5% this quarter <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of top 5 products by sales volume
        </div>
      </CardFooter>
    </Card>
  );
}
