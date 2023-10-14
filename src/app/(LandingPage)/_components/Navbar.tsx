'use client';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import useScrollTop from '@/hooks/useScrollTop';
import { cn } from '@/lib/utils';
import React from 'react';

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center w-full p-10 pt-6',
        scrolled && 'border-b shadow-sm'
      )}>
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-lg">Notion.</h1>
        <div className="flex items-center gap-[10px]">
          <ThemeSwitcher />
          <Button className="py-2 px-6">Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
