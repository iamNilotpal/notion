"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const clerkPublishableKey = process.env
  .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const ConvexProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      signInUrl="/"
      signUpUrl="/"
      afterSignUpUrl="/"
      afterSignInUrl="/documents"
      publishableKey={clerkPublishableKey}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexProvider;
