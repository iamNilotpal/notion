'use client';

import Spinner from '@/components/Spinner';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import React from 'react';
import Navigation from './_components/Navigation';

export enum RedirectType {
  push = 'push',
  replace = 'replace',
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading)
    return (
      <main className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </main>
    );

  if (!isAuthenticated) return redirect('/', RedirectType.replace);

  return (
    <div className="h-screen flex">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
