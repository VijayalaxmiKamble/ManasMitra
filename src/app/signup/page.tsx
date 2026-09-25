'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';
import LanguageRuntime from '@/components/providers/LanguageRuntime';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  useEffect(() => {
    const syncSession = async () => {
      try {
        const response = await fetch('/api/auth/me', { cache: 'no-store' });
        const data = await response.json();

        if (data.user) {
          useStore.getState().setUser({
            name: data.user.name,
            email: data.user.email,
            age: data.user.age,
            caregiverName: data.user.caregiverName,
          });
          useStore.setState({ isAuthenticated: true, isDemoUser: false });
        } else {
          useStore.setState({ isAuthenticated: false, isDemoUser: false });
        }
      } catch {
        useStore.setState({ isAuthenticated: false, isDemoUser: false });
      }
    };

    if (pathname !== '/signup') {
      syncSession();
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/signup' && !isAuthenticated) {
      router.replace('/signup');
    }
  }, [isAuthenticated, pathname, router]);

  if (pathname === '/signup') return <><LanguageRuntime />{children}</>;
  if (!isAuthenticated) return <><LanguageRuntime /><div className="min-h-screen bg-background" /></>;
  return <><LanguageRuntime /><MainLayout>{children}</MainLayout></>;
}
