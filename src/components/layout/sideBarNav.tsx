import Link from "next/link";
import React from "react";
import IconifyIcon from "../icon";

interface ISideBarNav {
  title: string;
  path: string;
  icon?: string;
  iconSize?: number;
}

const SideBarNav: React.FC<ISideBarNav> = ({
  title,
  path,
  icon,
  iconSize = 16,
}) => {
  return (
    <Link
      href={path ?? ""}
      className={`space-x-3 flex items-center w-full h-full`}
    >
      <IconifyIcon icon={icon!} fontSize={iconSize} />
      {/* <div className={icon! && "hidden"} /> */}
      <span>{title}</span>
    </Link>
  );
};

export default SideBarNav;
