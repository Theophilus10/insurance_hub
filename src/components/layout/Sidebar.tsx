import React, { use, useEffect, useState } from "react";
import SideBarNav from "./sideBarNav";
import { IMenuItem } from "@app/types/appTypes";
import IconifyIcon from "../icon";
import { usePathname } from "next/navigation";

interface ISideBar {
  generalRouteItems: IMenuItem[];
  basicRouteItems: IMenuItem[];
}

const Sidebar: React.FC<ISideBar> = ({
  generalRouteItems,
  basicRouteItems,
}) => {
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;
  return (
    <ul className="flex flex-col side-menu gap-4 overflow-y-auto">
      <span className={`text-sm text-gray-400 font-thin pl-2 `}>Basics</span>
      <li
        className={`px-4 ml-[1px] ${
          isActive("/private/dashboard")
            ? "active isActiveRoute h-10"
            : " inactiveRoute "
        }`}
      >
        <SideBarNav
          title="Dashboard"
          path="/private/dashboard"
          icon="radix-icons:dashboard"
        />
      </li>
      <li>
        <ul className="flex flex-col gap-4">
          {basicRouteItems &&
            basicRouteItems.map((x, index) => (
              <NestedItems item={x} key={index} index={index} />
            ))}
        </ul>
      </li>
      <span className={`text-sm text-gray-400 font-thin pl-2 pt-4`}>
        Setups
      </span>
      <li>
        <ul className="flex flex-col gap-4">
          {generalRouteItems &&
            generalRouteItems.map((x, index) => (
              <NestedItems item={x} key={index} index={index} />
            ))}
        </ul>
      </li>
    </ul>
  );
};

const NestedItems: React.FC<{
  item: IMenuItem;
  index: number;
}> = ({ item, index }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [subMenuItem, setSubMenuItem] = useState(-1);
  const pathName = usePathname();
  const header = pathName.split("/")[3];
  const isActive = (path: string) => pathName === path;

  const showSideBorder = checkName(header, item.title);

  useEffect(() => {
    if (showSideBorder) {
      toggleSubMenu(index);
    }
  }, []);

  // const toggleExpand = () => {
  //   setExpanded(!isExpanded);
  // };
  const toggleSubMenu = (index: any) => {
    setSubMenuItem(subMenuItem === index ? -1 : index);
  };

  if (!item.items) {
    return (
      <li
        className={`px-4 ml-[1px] ${
          isActive(item.path!) ? "text-blue-600" : "hover:text-blue-600"
        }`}
      >
        <SideBarNav title={item.title} path={item.path!} icon={item.icon} />
      </li>
    );
  } else {
    return (
      <li
        className={`flex flex-col gap-2
        ${subMenuItem === index ? "isActiveMenuList open" : "closed "}
      `}
      >
        <button
          className="flex justify-between items-center w-full pr-2 hover:text-blue-600 "
          onClick={() => toggleSubMenu(index)}
        >
          <div className="flex items-center gap-3 pl-4">
            <IconifyIcon icon={item.icon!} />
            <div className={item.icon && "hidden"} />
            <span>{item.title}</span>
          </div>
          <IconifyIcon
            icon={subMenuItem === index ? "ep:arrow-up" : "ep:arrow-down"}
            fontSize={16}
          />
        </button>
        {subMenuItem === index && (
          <ul className="flex flex-col gap-2">
            {item.items.map((child, index) => (
              <NestedItems key={index} item={child} index={index} />
            ))}
          </ul>
        )}
      </li>
    );
  }
};

export default Sidebar;

const checkName = (pathName: string, title: string) => {
  if (pathName) {
    const transformedString = pathName
      .replace(/_/g, " ")
      .replace(/(^|\s)\S/g, (match) => match.toUpperCase());

    const finalResult = transformedString + ".";
    // console.log(finalResult, title);

    return title.includes(".")
      ? finalResult === title
      : transformedString === title;
  } else {
    return false;
  }
};
