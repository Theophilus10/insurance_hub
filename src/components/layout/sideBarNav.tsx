import Link from "next/link";
import React from "react";
import IconifyIcon from "../icon";

interface ISideBarNav {
  title?: string;
  path: string;
  icon?: string;
  iconSize?: number;
  className?: string;
  addPadding?: boolean;
  sidebarStatus?: boolean;
}

const SideBarNav: React.FC<ISideBarNav> = ({
  title,
  path,
  icon,
  iconSize = 16,
  className,
  addPadding = false,
  sidebarStatus,
}) => {
  return (
    <Link
      href={path ?? ""}
      className={`space-x-3 flex items-center w-full h-full ${
        addPadding && "pl-3"
      }`}
    >
      <IconifyIcon icon={icon!} fontSize={iconSize} className={className} />
      {/* <div className={icon! && "hidden"} /> */}
      <span>{title}</span>
    </Link>
  );
};

export default SideBarNav;
