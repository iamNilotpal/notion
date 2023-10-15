'use client';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <header className="max-w-3xl space-y-4">
      <h1 className="text-3xl md:text-6xl font-bold">
        Your wiki, docs, & projects. Together.
      </h1>
      <p className="text-base md:text-2xl font-medium">
        Notion is the connected workspace where better, faster work happens.
      </p>
      {isLoading && <Spinner className="mx-auto" />}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <Button>
            <span className="mr-1">Get Notion For Free</span>
            <ArrowRight size={20} />
          </Button>
        </SignInButton>
      )}
      {!isLoading && isAuthenticated && (
        <Button>
          <Link href="/documents">Your Documents</Link>
          <ArrowRight size={20} className="ml-1" />
        </Button>
      )}
    </header>
  );
};

export default Header;
