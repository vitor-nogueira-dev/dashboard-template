import { ArrowDownIcon, ArrowUpIcon, DollarSign, Users, CreditCard, Activity } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export function DashboardStats() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}>
      <CarouselContent>

        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  +20.1%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  +180.1%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 flex items-center">
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                  -19.5%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem className="basis-1/2 sm:basis-1/3 xl:basis-1/4 cursor-grab">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Now
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  +201
                </span>{' '}
                since last hour
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
