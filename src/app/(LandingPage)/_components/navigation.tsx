"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-10 pt-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-lg">
          <Link href="/">Notion.</Link>
        </h1>
        <div className="flex items-center gap-[10px]">
          {isLoading && <Spinner className="mr-2" />}
          {!isLoading && !isAuthenticated && (
            <SignInButton mode="modal">
              <Button className="py-2 px-6">Login</Button>
            </SignInButton>
          )}
          {isAuthenticated && !isLoading && (
            <UserButton showName afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
