'use client';

import Spinner from '@/components/Spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@clerk/clerk-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserActionItem = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return <Spinner />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
          <div className="gap-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage
                src={user.imageUrl}
                alt={user.fullName + ' avatar'}
              />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user.fullName}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionItem;
