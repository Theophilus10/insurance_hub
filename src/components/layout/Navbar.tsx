"use client";
import React from "react";
import IconButton from "../ui/IconButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import IconifyIcon from "../icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IUser } from "@app/context/userContext";
import Link from "next/link";

interface INavbar {
  toggleSidebar?: () => void;
  hideSidebar: boolean;
  user: IUser;
  triggerSignOut: () => void;
}

const Navbar: React.FC<INavbar> = ({
  toggleSidebar,
  hideSidebar,
  user,
  triggerSignOut,
}) => {
  return (
    <nav className="py-1.5 flex items-center gap-4 ">
      {/* <IconButton
        icon={hideSidebar ? "mdi:menu-close" : "ic:round-menu-open"}
        color="default"
        onClick={toggleSidebar}
      /> */}
      <div className="flex-grow flex items-center gap-2">
        <IconifyIcon icon="icon-park-outline:building-one" />
        <p className="">{user.institution}</p>
      </div>
      <div className="flex flex-grow sm:hidden" />
      <div className="flex items-center gap-4">
        <div className="user grid place-content-center">
          <div />
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <AvatarButton user={user} />
              <DropdownMenuContent>
                <div className="px-4 py-2 space-y-2">
                  <div className="block text-sm font-bold truncate">
                    {user.fullName}
                  </div>
                  <div className="block truncate text-sm space-x-2">
                    <span className="font-light text-gray-500">Role:</span>
                    <span className="font-bold">{user.role}</span>
                  </div>
                  <div className="block truncate text-sm space-x-1">
                    <span className="font-light text-gray-500">Email:</span>
                    <span className="font-bold">{user.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/private/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={triggerSignOut}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const AvatarButton = ({ user }: { user: IUser }) => {
  return (
    <div className="!p-0 sm:!p-1 h-10  max-w-[150px] flex items-center rounded-[5px] hover:bg-gray-100  active:outline-none active:border-none">
      <Avatar className="sm:mr-2 w-9 h-9 bg-sky-300 text-sm object-cover">
        <AvatarImage
          src={user.profileImage}
          className="rounded-full w-full object-cover h-full"
        />
        <AvatarFallback className="w-full bg-sky-300">
          {user.initials}
        </AvatarFallback>
      </Avatar>
      <div className="hidden sm:block text-left text-xs sm:pr-2">
        <div className="w-20 truncate">
          <span className="font-semibold">{user.firstName}</span>
        </div>
        <div
          className={`text-gray-500 truncate w-20 ${!user.role && "hidden"}`}
        >
          <span>{user.role}</span>
        </div>
        {/* <p className={`text-gray-500 truncate w-20 flex ${!user.email}`}>
          {user.email}
        </p> */}
      </div>
      <IconifyIcon
        icon="ep:arrow-down"
        fontSize={16}
        className="sm:block hidden"
      />
    </div>
  );
};
