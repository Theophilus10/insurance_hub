import Link from "next/link";
import React from "react";
import IconifyIcon from "../icon";

interface ISideBarNav {
  title: string;
  path: string;
  icon?: string;
}

const SideBarNav: React.FC<ISideBarNav> = ({ title, path, icon }) => {
  return (
    <Link href={path ?? ""} className={`space-x-3 flex items-center`}>
      <IconifyIcon icon={icon!} fontSize={16} />
      <div className={icon! && "hidden"} />
      <span>{title}</span>
    </Link>
  );
};

export default SideBarNav;
