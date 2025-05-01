import { ArrowDownIcon, ArrowUpIcon, DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export function AnalyticsStats() {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
      }}>
      <CarouselContent>
        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$124,563</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  +12.5%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.24%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  +0.8%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,482</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 flex items-center">
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                  -2.3%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  +28.4%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        {/* </div> */}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
