import { Metadata } from 'next';

import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your account
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
