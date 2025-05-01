'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, Info, AlertCircle, CheckCircle, XCircle, X, MoreHorizontal, Eye } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  sender?: {
    name: string;
    avatar?: string;
  };
}

interface NotificationsPopoverProps {
  initialNotifications?: Notification[];
  maxNotifications?: number;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
}

export function NotificationsPopover({
  initialNotifications = [],
  maxNotifications = 5,
  onMarkAllAsRead,
  onClearAll,
}: NotificationsPopoverProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  // Simulate receiving new notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.7 && notifications.length < 20) {
        const newNotification: Notification = {
          id: `notification-${Date.now()}`,
          title: 'New notification',
          description: 'This is a new notification that just arrived.',
          type: ['info', 'warning', 'success', 'error'][Math.floor(Math.random() * 4)] as NotificationType,
          timestamp: new Date(),
          read: false,
          sender: {
            name: 'System',
            avatar: '/placeholder.svg',
          },
        };
        setNotifications((prev) => [newNotification, ...prev]);

        if (!open) {
          toast(
            <div className="flex">
              <div className="mr-2">{getNotificationIcon(newNotification.type, 'h-4 w-4')}</div>
              <div>
                <p className="font-medium">{newNotification.title}</p>
                <p className="text-sm text-muted-foreground">{newNotification.description}</p>
              </div>
            </div>,
          );
        }
      }
    }, 30000); // Every 30 seconds

    return () => clearTimeout(timer);
  }, [notifications, open]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    onMarkAllAsRead?.();
    toast.success('All notifications marked as read');
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    toast.success('Notification removed');
  };

  const handleClearAll = () => {
    setNotifications([]);
    onClearAll?.();
    setOpen(false);
    toast.success('All notifications cleared');
  };

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    handleMarkAsRead(notification.id);
    setDetailsOpen(true);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const handleSaveChanges = () => {
    setSaveChangesOpen(false);
    toast.success('Notification settings saved');
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0" align="center">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium">Notifications</h4>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark all read
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleMarkAllAsRead}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark all as read
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleClearAll} className="text-red-600">
                    <X className="mr-2 h-4 w-4" />
                    Clear all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-4">
              <TabsList className="w-full mb-4">
                <TabsTrigger
                  value="all"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                >
                  Info
                </TabsTrigger>
                <TabsTrigger
                  value="warning"
                >
                  Alerts
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={activeTab} className="m-0">
              {filteredNotifications.length === 0 ? (
                <div className="flex h-[300px] flex-col items-center justify-center p-8 text-center">
                  <Bell className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {activeTab === 'all' ?
                      "You don't have any notifications yet." :
                      activeTab === 'unread' ?
                        "You don't have any unread notifications." :
                        `You don't have any ${activeTab} notifications.`}
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="flex flex-col">
                    {filteredNotifications.slice(0, maxNotifications).map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onRemove={handleRemoveNotification}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                    {filteredNotifications.length > maxNotifications && (
                      <div className="p-4 text-center">
                        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                          View all {filteredNotifications.length} notifications
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
          <Separator />
          <div className="p-4 text-center text-sm text-muted-foreground">
            <Dialog open={saveChangesOpen} onOpenChange={setSaveChangesOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="h-auto p-0">
                  Manage notification settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notification Settings</DialogTitle>
                  <DialogDescription>Configure how you want to receive notifications.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label htmlFor="email-notifications" className="text-sm font-medium">
                      Email Notifications
                    </label>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-notifications" defaultChecked />
                      <Label htmlFor="email-notifications">Enabled</Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label htmlFor="push-notifications" className="text-sm font-medium">
                      Push Notifications
                    </label>
                    <div className="flex items-center space-x-2">
                      <Switch id="push-notifications" defaultChecked />
                      <Label htmlFor="push-notifications">Enabled</Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label htmlFor="sound-notifications" className="text-sm font-medium">
                      Sound Notifications
                    </label>
                    <div className="flex items-center space-x-2">
                      <Switch id="sound-notifications" />
                      <Label htmlFor="sound-notifications">Disabled</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          {selectedNotification && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {getNotificationIcon(selectedNotification.type, 'h-5 w-5')}
                  <DialogTitle>{selectedNotification.title}</DialogTitle>
                </div>
                <DialogDescription>
                  {formatDistanceToNow(selectedNotification.timestamp, { addSuffix: true })}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>{selectedNotification.description}</p>
                {selectedNotification.sender && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary text-white">
                      <span className="text-xs font-medium ">{selectedNotification.sender.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">From: {selectedNotification.sender.name}</p>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                {selectedNotification.actionUrl && (
                  <Button onClick={() => setDetailsOpen(false)}>
                    View Details
                  </Button>
                )}
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog >
    </>
  );
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onRemove: (id: string) => void
  onViewDetails: (notification: Notification) => void
}

function NotificationItem({ notification, onMarkAsRead, onRemove, onViewDetails }: NotificationItemProps) {
  return (
    <div
      className={`relative flex cursor-pointer flex-col gap-1 border-b p-4 transition-colors hover:bg-muted/50 ${!notification.read ? 'bg-muted/30' : ''
      }`}
      onClick={() => onViewDetails(notification)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          {getNotificationIcon(notification.type)}
          <div>
            <p className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>{notification.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(notification);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              {!notification.read && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark as read
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(notification.id);
                }}
                className="text-red-600"
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {!notification.read && <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary" />}
    </div>
  );
}

function getNotificationIcon(type: NotificationType, className = 'h-5 w-5') {
  switch (type) {
  case 'info':
    return <Info className={`${className} text-blue-500`} />;
  case 'warning':
    return <AlertCircle className={`${className} text-yellow-500`} />;
  case 'success':
    return <CheckCircle className={`${className} text-green-500`} />;
  case 'error':
    return <XCircle className={`${className} text-red-500`} />;
  default:
    return <Bell className={className} />;
  }
}

// Mock data for testing
export const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    title: 'New feature available',
    description: 'Check out the new dashboard view. Pages now load faster.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: 'notification-2',
    title: 'Account security alert',
    description: "Your account password was changed. If you didn't do this, please contact support immediately.",
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
  },
  {
    id: 'notification-3',
    title: 'Payment successful',
    description: 'Your payment of $49.99 for the Pro Plan was successful.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: true,
  },
  {
    id: 'notification-4',
    title: 'Error processing order',
    description: 'There was an error processing your order #12345. Please check your payment details.',
    type: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: 'notification-5',
    title: 'New message from support',
    description: 'You have a new message from the support team regarding your recent ticket.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
];
