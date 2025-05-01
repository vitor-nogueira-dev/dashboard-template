'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ChevronDown, ExternalLink, Mail, MessageSquare, Package, RefreshCw } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

// Extended activity data with more details
const activities = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    action: 'purchased',
    target: 'Product A',
    date: '2 hours ago',
    details: {
      orderNumber: 'ORD-2023-04-29-001',
      amount: '$129.99',
      paymentMethod: 'Credit Card',
      status: 'Completed',
      items: [{ name: 'Product A', quantity: 1, price: '$129.99' }],
    },
    type: 'purchase',
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    action: 'subscribed to',
    target: 'Premium Plan',
    date: '5 hours ago',
    details: {
      planType: 'Premium Annual',
      amount: '$199.99/year',
      startDate: 'April 29, 2025',
      nextBillingDate: 'April 29, 2026',
      features: ['Unlimited access', 'Priority support', 'Custom exports'],
    },
    type: 'subscription',
  },
  {
    id: 3,
    user: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    action: 'commented on',
    target: 'Product B',
    date: '1 day ago',
    details: {
      comment:
        'This product exceeded my expectations! The quality is outstanding and customer service was very helpful when I had questions about installation.',
      productRating: 5,
      commentId: 'CMT-2023-04-28-003',
      productPage: '/products/product-b',
    },
    type: 'comment',
  },
  {
    id: 4,
    user: {
      name: 'Emily Davis',
      email: 'emily@example.com',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    action: 'requested a refund for',
    target: 'Product C',
    date: '2 days ago',
    details: {
      orderNumber: 'ORD-2023-04-27-042',
      refundReason: 'Item arrived damaged',
      refundAmount: '$89.99',
      refundStatus: 'Pending approval',
      requestDate: 'April 27, 2025',
    },
    type: 'refund',
  },
  {
    id: 5,
    user: {
      name: 'Michael Wilson',
      email: 'michael@example.com',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    action: 'upgraded to',
    target: 'Enterprise Plan',
    date: '3 days ago',
    details: {
      previousPlan: 'Business Plan',
      newPlan: 'Enterprise Plan',
      additionalSeats: 15,
      additionalFeatures: ['API access', 'Dedicated support', 'Custom integrations'],
      effectiveDate: 'April 26, 2025',
    },
    type: 'upgrade',
  },
];

export function RecentActivity() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAction = (activity: (typeof activities)[0], action: string) => {
    switch (action) {
    case 'contact':
      toast.success(`Email sent to ${activity.user.email}`);
      break;
    case 'view':
      toast.info(`Viewing details for ${activity.target}`);
      break;
    case 'approve':
      toast.success(`Refund approved for ${activity.user.name}`);
      break;
    case 'reply':
      toast.info(`Replying to ${activity.user.name}'s comment`);
      break;
    default:
      toast.info(`Action performed: ${action}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest user activities and transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="overflow-hidden rounded-lg border transition-all duration-200">
              <div
                className={cn(
                  'flex items-center gap-4 p-3 cursor-pointer hover:bg-muted/50 transition-colors duration-200',
                  expandedId === activity.id && 'border-b',
                )}
                onClick={() => toggleExpand(activity.id)}
              >
                <Avatar>
                  <AvatarImage src={activity.user.avatar || '/placeholder.svg'} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ActivityBadge type={activity.type} />
                  <div className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">{activity.date}</div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-muted-foreground transition-transform duration-200',
                      expandedId === activity.id && 'rotate-180',
                    )}
                  />
                </div>
              </div>

              {expandedId === activity.id && (
                <div className="p-4 bg-muted/30 animate-in slide-in-from-top-2 duration-200">
                  <ActivityDetails activity={activity} onAction={handleAction} />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityBadge({ type }: { type: string }) {
  switch (type) {
  case 'purchase':
    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
          Purchase
      </Badge>
    );
  case 'subscription':
    return (
      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">
          Subscription
      </Badge>
    );
  case 'comment':
    return (
      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
          Comment
      </Badge>
    );
  case 'refund':
    return (
      <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
          Refund
      </Badge>
    );
  case 'upgrade':
    return (
      <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-200">
          Upgrade
      </Badge>
    );
  default:
    return <Badge variant="outline">Activity</Badge>;
  }
}

function ActivityDetails({
  activity,
  onAction,
}: {
  activity: (typeof activities)[0]
  onAction: (activity: (typeof activities)[0], action: string) => void
}) {
  switch (activity.type) {
  case 'purchase':
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Order Number</p>
            <p className="font-medium">{activity.details.orderNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-medium">{activity.details.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Payment Method</p>
            <p className="font-medium">{activity.details.paymentMethod}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium">{activity.details.status}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end flex-col sm:flex-row">
          <Button size="sm" variant="outline" onClick={() => onAction(activity, 'contact')}>
            <Mail className="mr-2 h-4 w-4" />
              Contact Customer
          </Button>
          <Button size="sm" variant="accent" onClick={() => onAction(activity, 'view')}>
            <Package className="mr-2 h-4 w-4" />
              View Order
          </Button>
        </div>
      </div>
    );

  case 'subscription':
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Plan Type</p>
            <p className="font-medium">{activity.details.planType}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-medium">{activity.details.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Start Date</p>
            <p className="font-medium">{activity.details.startDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Next Billing</p>
            <p className="font-medium">{activity.details.nextBillingDate}</p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">Features</p>
          <div className="flex flex-wrap gap-2">
            {activity.details.features?.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end flex-col sm:flex-row">
          <Button size="sm" variant="outline" onClick={() => onAction(activity, 'contact')}>
            <Mail className="mr-2 h-4 w-4" />
              Contact Customer
          </Button>
          <Button size="sm" variant="accent" onClick={() => onAction(activity, 'view')}>
            <ExternalLink className="mr-2 h-4 w-4" />
              View Subscription
          </Button>
        </div>
      </div>
    );

  case 'comment':
    return (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground text-sm mb-1">Comment</p>
          <p className="text-sm italic border-l-2 pl-3 py-1">{activity.details.comment}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Product Rating</p>
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < (activity.details.productRating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground">Comment ID</p>
            <p className="font-medium">{activity.details.commentId}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end flex-col sm:flex-row">
          <Button size="sm" variant="default" onClick={() => onAction(activity, 'view')}>
            <ExternalLink className="mr-2 h-4 w-4" />
              View Product
          </Button>
          <Button size="sm" onClick={() => onAction(activity, 'reply')}>
            <MessageSquare className="mr-2 h-4 w-4" />
              Reply to Comment
          </Button>
        </div>
      </div>
    );

  case 'refund':
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Order Number</p>
            <p className="font-medium">{activity.details.orderNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Refund Amount</p>
            <p className="font-medium">{activity.details.refundAmount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Request Date</p>
            <p className="font-medium">{activity.details.requestDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium">{activity.details.refundStatus}</p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">Reason</p>
          <p className="text-sm">{activity.details.refundReason}</p>
        </div>
        <div className="flex gap-2 justify-end flex-col sm:flex-row">
          <Button size="sm" variant="outline" onClick={() => onAction(activity, 'contact')}>
            <Mail className="mr-2 h-4 w-4" />
              Contact Customer
          </Button>
          <Button size="sm" onClick={() => onAction(activity, 'approve')}>
            <RefreshCw className="mr-2 h-4 w-4" />
              Approve Refund
          </Button>
        </div>
      </div>
    );

  case 'upgrade':
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Previous Plan</p>
            <p className="font-medium">{activity.details.previousPlan}</p>
          </div>
          <div>
            <p className="text-muted-foreground">New Plan</p>
            <p className="font-medium">{activity.details.newPlan}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Additional Seats</p>
            <p className="font-medium">{activity.details.additionalSeats}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Effective Date</p>
            <p className="font-medium">{activity.details.effectiveDate}</p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">Additional Features</p>
          <div className="flex flex-wrap gap-2">
            {activity.details.additionalFeatures?.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end flex-col sm:flex-row">
          <Button size="sm" variant="outline" onClick={() => onAction(activity, 'contact')}>
            <Mail className="mr-2 h-4 w-4" />
              Contact Customer
          </Button>
          <Button size="sm" onClick={() => onAction(activity, 'view')}>
            <ExternalLink className="mr-2 h-4 w-4" />
              View Account
          </Button>
        </div>
      </div>
    );

  default:
    return <p>No additional details available</p>;
  }
}
