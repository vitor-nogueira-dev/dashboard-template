'use client';

import { Camera } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useAuth } from '@/contexts/auth-context';

export function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.name || 'User'} />
                <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change avatar</span>
              </Button>
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-muted-foreground">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
