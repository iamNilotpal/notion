import React from 'react';
import Navbar from './_components/navigation';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default LandingPageLayout;
