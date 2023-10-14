'use client';

import Spinner from '@/components/Spinner';
import { useUser } from '@clerk/clerk-react';
import React from 'react';

const Greeting = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <Spinner size="md" />;
  return (
    <h1 className="font-medium text-base">
      Welcome <span className="font-bold">{user?.fullName}!</span> Have a nice
      day.
    </h1>
  );
};

export default Greeting;
