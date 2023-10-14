'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[400px] h-[100px] md:w-[400px] md:h-[250px] lg:w-[500px] lg:h-[200px]">
          <Image
            fill
            alt="Hero image"
            src="/home-hero.svg"
            className={cn(
              'object-contain',
              resolvedTheme === 'dark' && ' bg-white rounded-sm'
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
