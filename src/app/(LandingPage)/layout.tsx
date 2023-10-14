import React from 'react';
import Navbar from './_components/Navbar';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default LandingPageLayout;
