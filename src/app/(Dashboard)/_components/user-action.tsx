"use client";

import Spinner from "@/components/spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsLeftRight, LogOut } from "lucide-react";

const UserActionItem = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return <Spinner />;
  if (!user && isLoaded) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage
                src={user.imageUrl}
                alt={user.fullName + " avatar"}
              />
            </Avatar>
            <span className="text-start font-[600] line-clamp-1">
              {user.fullName}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-auto text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="ml-5">
        <div className="flex flex-col space-y-3 p-2 px-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user.imageUrl}
                alt={user.fullName + " avatar"}
              />
            </Avatar>
            <div className="flex flex-col">
              <p className="text-[13px] font-[600] line-clamp-1">
                {user.fullName}'s Notion
              </p>
              <p className="text-[12px]">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem className="cursor-pointer text-muted-foreground p-2 px-4">
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </div>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionItem;
