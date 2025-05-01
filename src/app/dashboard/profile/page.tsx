import { Metadata } from 'next';

import { ProfileForm } from '@/components/profile/profile-form';
import { ProfileHeader } from '@/components/profile/profile-header';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Manage your profile settings',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <div className="grid grid-cols-1">
        <ProfileForm />
      </div>
    </div>
  );
}
