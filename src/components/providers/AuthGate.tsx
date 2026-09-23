'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useStore } from '@/store/useStore';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (pathname !== '/signup' && !isAuthenticated) router.replace('/signup');
  }, [isAuthenticated, pathname, router]);

  if (pathname === '/signup') return <>{children}</>;
  if (!isAuthenticated) return <div className="min-h-screen bg-background" />;
  return <MainLayout>{children}</MainLayout>;
}