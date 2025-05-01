'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  password?: string;
  passwordOld?: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (data: Partial<User>) => Promise<void>;
  isValidPassword: (newPassword: string, isUpdate: boolean) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('dashboard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock sign in function
  const signIn = useCallback(async (email: string, password: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      id: '1',
      name: 'Demo User',
      email: email,
      bio: "I'm a demo user for this dashboard template.",
      password: password || 'demoPassword',
      passwordOld: password || 'demoPassword',
    };

    setUser(mockUser);
    localStorage.setItem('dashboard_user', JSON.stringify(mockUser));
  }, []);

  // Mock sign up function
  const signUp = useCallback(async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      bio: '',
      password: password,
      passwordOld: password,
    };

    setUser(mockUser);
    localStorage.setItem('dashboard_user', JSON.stringify(mockUser));
  }, []);

  // Sign out function
  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('dashboard_user');
    router.push('/signin');
  }, [router]);

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<User>) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('dashboard_user', JSON.stringify(updatedUser));
    }
  }, [user]);

  // Change password function
  const changePassword = useCallback(async (data: Partial<User>) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (user) {
      const updatedUser = { ...user, password: data.password, passwordOld: data.passwordOld };
      setUser(updatedUser);
      localStorage.setItem('dashboard_user', JSON.stringify(updatedUser));
    }
  }, [user]);

  // Validate password function
  const isValidPassword = useCallback((newPassword: string, isUpdate: boolean) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just check if the newPassword is at least 6 characters long
    if (isUpdate) {
      return newPassword !== '' && newPassword !== user?.password && newPassword.length >= 6;
    }

    return newPassword.length >= 6;
  }, [user]);

  // Memoize context value to prevent unnecessary re-renders
  const context = useMemo(() => {
    return {
      user,
      signIn,
      signUp,
      signOut,
      updateProfile,
      changePassword,
      isValidPassword,
    };
  }, [user, signIn, signUp, signOut, updateProfile, changePassword, isValidPassword]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
