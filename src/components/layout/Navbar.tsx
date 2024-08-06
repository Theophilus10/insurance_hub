"use client";
import React, { useEffect } from "react";
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
// import { IUser } from "@app/context/userContext";
import Link from "next/link";
import { User } from "next-auth";
import { getInitials } from "@app/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";

interface INavbar {
  toggleSidebar?: () => void;
  hideSidebar: boolean;
  user?: User;
  triggerSignOut: () => void;
}

const Navbar: React.FC<INavbar> = ({
  toggleSidebar,
  hideSidebar,
  user = {} as User,
  triggerSignOut,
}) => {
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  function getInitials(name: string): string {
    const words = name?.split(" ");
    const initials = words?.map((word) => word.charAt(0)).join("");
    return initials;
  }

  // const userName = "Obed Bamfo";

  const { data: session } = useSession();
  console.log(session, "session");
  const userName = session?.user?.user?.name;
  return (
    <nav className="py-1.5 flex items-center">
      <IconButton
        icon={hideSidebar ? "mdi:menu-close" : "ic:round-menu-open"}
        color="default"
        onClick={toggleSidebar}
      />
      <div className="flex-grow flex items-center gap-2">
        {/* <IconifyIcon icon="icon-park-outline:building-one" /> */}
        <p className="">{session?.user?.user?.institution?.name}</p>
      </div>
      <div className="flex flex-grow sm:hidden" />
      <div className="flex items-center gap-4">
        <div className="user grid place-content-center">
          <div />
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <AvatarButton user={user} />
              <DropdownMenuContent>
                <div className="px-4 py-2 space-y-2 max-w-[300px]">
                  <div className="block text-sm font-bold truncate">
                    {`${user?.first_name} ${user?.last_name}`}
                  </div>
                  <div className="block truncate text-sm space-x-2">
                    <span className="font-light text-gray-500">Role:</span>
                    <span className="font-bold">{user?.role?.name!}</span>
                  </div>
                  <div className="block truncate text-sm space-x-1">
                    <span className="font-light text-gray-500">Email:</span>
                    <span className="font-bold">{user?.email}</span>
                  </div>
                  <div className="block truncate text-sm space-x-1">
                    <span className="font-light text-gray-500">
                      Institution:
                    </span>
                    <span className="font-bold">{user?.name}</span>
                  </div>
                  <div className="block truncate text-sm space-x-1">
                    <span className="font-light text-gray-500">Branch:</span>
                    <span className="font-bold">{user?.branch?.name}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/private/profile" className="w-full px-2">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer px-4"
                  onClick={triggerSignOut}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild className=" ml-auto">
              <button className="flex items-center focus:outline-none  gap-1 min-w-[5rem] min-h-[3rem]  bg-gray-50/40 px-1 py-[1px] rounded-3xl">
                <nav className="flex items-center bg-white/90 border shadow focus:outline-none  gap-1 p-2 rounded-3xl">
                  <IconifyIcon
                    icon="ic:baseline-account-circle"
                    fontSize={"2rem"}
                    color="#4169E1"
                  />
                  <span className=" font-medium text-gray-500 text-sm">
                    {session?.user?.user?.name}
                  </span>
                  <IconifyIcon icon="mdi:chevron-down" className="" />
                </nav>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white z-40 min-w-[16rem] mr-4">
              <div className="text-center p-6  border-b">
                <div className="h-24 w-24 mx-auto rounded-full text-3xl grid place-items-center text-white bg-[#4169E1] uppercase">
                  {getInitials(userName)}
                </div>
                <p className="pt-2 text-base font-semibold">
                  {session?.user?.user?.name}
                </p>
                <p className="text-sm text-gray-600">
                  {session?.user?.user?.role}
                </p>
                <p className="text-sm text-gray-600">
                  {session?.user?.user?.email}
                </p>
              </div>

              <div className="border-b">
                <Link
                  href="/user/all"
                  className="px-4 py-2 hover:bg-gray-100 flex"
                >
                  <div className="text-gray-800">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium text-gray-800 leading-none">
                      User Management
                    </p>
                    <p className="text-xs text-gray-500">Add/remove users</p>
                  </div>
                </Link>
                <Link
                  href="/profile"
                  className="px-4 py-2 hover:bg-gray-100 flex"
                >
                  <div className="text-gray-800">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium text-gray-800 leading-none">
                      Personal Settings
                    </p>
                    <p className="text-xs text-gray-500">
                      Email, profile,password
                    </p>
                  </div>
                </Link>
              </div>
              <div className=" mt-1">
                <button
                  // href="/logout"
                  onClick={() => signOut()}
                  className="px-4 py-3 w-full  bg-red-200/70 rounded-xl text-white flex gap-4 items-center justify between "
                >
                  <nav className="p-1 h-5 w-5 aspect-square rounded-full text-gray-500  flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      height="15"
                      width="15"
                      viewBox="0 0 512 512"
                    >
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                  </nav>
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    Logout
                  </p>
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const AvatarButton = ({ user }: { user: User }) => {
  return (
    <div className="!p-0 sm:!p-1 h-10  max-w-[150px] flex items-center rounded-[5px] hover:bg-gray-100  active:outline-none active:border-none">
      <Avatar className="sm:mr-2 w-9 h-9 bg-sky-300 text-sm object-cover">
        <AvatarImage
          src={""}
          className="rounded-full w-full object-cover h-full"
        />
        <AvatarFallback className="w-full bg-sky-300">
          {`${getInitials(user?.first_name)}${getInitials(user?.last_name)}`}
        </AvatarFallback>
      </Avatar>
      <div className="hidden sm:block text-left text-xs sm:pr-2">
        <div className="w-20 truncate">
          <span className="font-semibold">{user?.first_name}</span>
        </div>
        <div
          className={`text-gray-500 truncate w-20 ${
            !user?.role?.name && "hidden"
          }`}
        >
          <span>{user?.role?.name}</span>
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
