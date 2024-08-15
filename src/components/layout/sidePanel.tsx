"use client";
import React, { use, useEffect, useRef, useState } from "react";
import SideBarNav from "./sideBarNav";
import { IMenuItem } from "@app/types/appTypes";
import IconifyIcon from "../icon";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ca } from "date-fns/locale";
import Link from "next/link";

interface ISideBar {
  generalRouteItems: IMenuItem[];
  basicRouteItems: IMenuItem[];
  settingsRouteItems?: IMenuItem[];
  isSideBarClose?: boolean;
}

interface IShowPoup {
  top: string;
  left: string;
  items: Array<any>;
  enable: boolean;
}

const Sidebar: React.FC<ISideBar> = ({
  generalRouteItems,
  basicRouteItems,
  settingsRouteItems,
  isSideBarClose,
}) => {
  // console.log(basicRouteItems, "basic");
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;
  const visibilityTimeout = useRef<NodeJS.Timeout | null>(null);

  const [showProducts, setShowProducts] = useState(false);

  const [showSbPopup, setShowSbPopup] = useState<IShowPoup>({} as IShowPoup);

  const documentTop = window.scrollY || document.documentElement.scrollTop;

  const handleLeave = () => {
    if (visibilityTimeout.current) {
      clearTimeout(visibilityTimeout.current);
    }
    visibilityTimeout.current = setTimeout(() => {
      setShowProducts(false);
      setShowSbPopup({} as IShowPoup);
    }, 200);
  };

  function getAllPaths(menuItems: IMenuItem[]): string[] {
    return menuItems
      .map((item) => item.items?.map((subItem) => subItem.title) || [])
      .flat();
  }
  const sideBarTitles = getAllPaths(generalRouteItems);

  const handleItemClick = (item: any, top: number, scrollHeight: number) => {
    if (item == null) return;
    if (Array.isArray(item) == false) return;
    let calculatedOffesetTop = 0;

    if ((documentTop + top + scrollHeight! ?? 0) >= window.innerHeight) {
      calculatedOffesetTop = window.innerHeight - 2 - scrollHeight! ?? 0;
    } else {
      calculatedOffesetTop = top + documentTop - 4;
    }

    setShowSbPopup({
      left: "60px",
      top: `${calculatedOffesetTop}px`,
      items: item,
      enable: true,
    });
  };

  return (
    <>
      {Boolean(showSbPopup?.enable) && (
        <ul
          onMouseOver={() => {
            if (visibilityTimeout.current) {
              clearTimeout(visibilityTimeout.current);
            }
          }}
          onMouseLeave={() => {
            visibilityTimeout.current = setTimeout(() => {
              setShowProducts(false);
              setShowSbPopup({} as IShowPoup);
            }, 200);
          }}
          style={{
            top: showSbPopup.top,
          }}
          className="flex bg-white flex-col fixed top-5 left-[60px]"
        >
          {showSbPopup.items?.map((item, i) => {
            return (
              <Link href={item.path} className="p-2">
                <li key={i}>{item?.title}</li>
              </Link>
            );
          })}
        </ul>
      )}
      <ul className="flex flex-col side-menu gap-4 overflow-y-auto">
        <span className={`text-sm text-gray-400 font-thin pl-2 `}>
          {isSideBarClose ? (
            <div className="flex justify-center items-center text-black">
              .......
            </div>
          ) : (
            <div>Basics</div>
          )}
        </span>
        <li
          className={`px-4 ml-[1px]  ${
            isActive("/private/dashboard")
              ? "active isActiveRoute"
              : " inactiveRoute "
          }`}
        >
          {isSideBarClose ? (
            <div className="">
              <SideBarNav
                path="/private/dashboard"
                icon="radix-icons:dashboard"
                // iconSize={30}
                className=""
              />
            </div>
          ) : (
            <div>
              <SideBarNav
                title="Home"
                path="/private/dashboard"
                icon="radix-icons:dashboard"
              />
            </div>
          )}
        </li>
        {isSideBarClose ? (
          <ul className="flex flex-col justify-center items-center gap-4">
            {basicRouteItems &&
              basicRouteItems.map((x, index) => (
                <div
                  onClick={(e) => {
                    handleItemClick(
                      x?.items,
                      e.currentTarget.getBoundingClientRect().top,
                      e.currentTarget.scrollHeight
                    );
                  }}
                  onMouseLeave={handleLeave}
                  key={index}
                >
                  {!x.items ? (
                    <Link href={`${x.path}`}>
                      <IconifyIcon
                        className="pointer-events-none"
                        icon={x.icon!}
                      />
                    </Link>
                  ) : (
                    <IconifyIcon
                      className="pointer-events-none"
                      icon={x.icon!}
                    />
                  )}
                </div>
              ))}
          </ul>
        ) : (
          <li>
            <ul className="flex flex-col gap-4">
              {basicRouteItems &&
                basicRouteItems.map((x, index) => (
                  <NestedItems
                    // clearTimeout={clearTimeout}
                    // setShowProducts={setShowProducts}
                    // handleLeave={handleLeave}
                    item={x}
                    key={index}
                    index={index}
                    isSideBarClose={isSideBarClose}
                    showBorder
                  />
                ))}
            </ul>
          </li>
        )}

        {/* <span className={`text-sm text-gray-400 font-thin pl-2 pt-4`}>
          Setups
        </span> */}
        <span className={`text-sm text-gray-400 font-thin pl-2 `}>
          {isSideBarClose ? (
            <div className="flex justify-center items-center text-black">
              .......
            </div>
          ) : (
            <div>Setups</div>
          )}
        </span>
        <li>
          {}
          {isSideBarClose ? (
            <ul className="flex flex-col justify-center items-center gap-4">
              {generalRouteItems &&
                generalRouteItems.map((x, index) => (
                  <div
                    onClick={(e) => {
                      handleItemClick(
                        x?.items,
                        e.currentTarget.getBoundingClientRect().top,
                        e.currentTarget.scrollHeight
                      );
                    }}
                    onMouseLeave={handleLeave}
                    key={index}
                  >
                    <IconifyIcon
                      className=" pointer-events-none"
                      icon={x.icon!}
                    />
                  </div>
                ))}
            </ul>
          ) : (
            <ul className="flex flex-col gap-4">
              {generalRouteItems &&
                generalRouteItems.map((x, index) => (
                  <NestedItems item={x} key={index} index={index} showBorder />
                ))}
            </ul>
          )}
        </li>
        {/* <span className={`text-sm text-gray-400 font-thin pl-2 pt-4`}>
          Settings
        </span> */}

        <span className={`text-sm text-gray-400 font-thin pl-2 `}>
          {isSideBarClose ? (
            <div className="flex justify-center items-center text-black">
              .......
            </div>
          ) : (
            <div>Settings</div>
          )}
        </span>

        <li>
          {}
          {isSideBarClose ? (
            <ul className="flex flex-col justify-center items-center gap-4">
              {settingsRouteItems &&
                settingsRouteItems.map((x, index) => (
                  <div
                    onClick={(e) => {
                      handleItemClick(
                        x?.items,
                        e.currentTarget.getBoundingClientRect().top,
                        e.currentTarget.scrollHeight
                      );
                    }}
                    onMouseLeave={handleLeave}
                    key={index}
                  >
                    <IconifyIcon
                      className=" pointer-events-none"
                      icon={x.icon!}
                    />
                  </div>
                ))}
            </ul>
          ) : (
            <ul className="flex flex-col gap-4">
              {settingsRouteItems &&
                settingsRouteItems.map((x, index) => (
                  <NestedItems item={x} key={index} index={index} showBorder />
                ))}
            </ul>
          )}
        </li>
        {/* <li>
          <ul className="flex flex-col gap-4">
            {settingsRouteItems &&
              settingsRouteItems.map((x, index) => (
                <NestedItems
                  isSideBarClose={isSideBarClose}
                  item={x}
                  key={index}
                  index={index}
                  showBorder
                />
              ))}
          </ul>
        </li> */}
      </ul>
    </>
  );
};

const NestedItems: React.FC<{
  item: IMenuItem;
  index: number;
  showBorder: boolean;
  isSideBarClose?: boolean;
  setShowProducts?: any;
  handleLeave?: any;
}> = ({
  item,
  index,
  showBorder = false,
  isSideBarClose,
  setShowProducts,
  handleLeave,
}) => {
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
        className={`px-4 ml-[1px]} ${
          isActive(item.path!)
            ? showBorder
              ? "active isActiveRoute h-10"
              : " text-black"
            : "hover:text-black"
        }`}
      >
        {/* <SideBarNav
          addPadding={!showBorder}
          title={item.title}
          path={item.path!}
          icon={item.icon}
        /> */}

        {isSideBarClose ? (
          <SideBarNav
            addPadding={!showBorder}
            // title={item.title}
            path={item.path!}
            icon={item.icon}
          />
        ) : (
          <div>
            <SideBarNav
              addPadding={!showBorder}
              title={item.title}
              path={item.path!}
              icon={item.icon}
            />
          </div>
        )}
      </li>
    );
  } else {
    return (
      <li
        className={`flex flex-col gap-2
        ${
          subMenuItem === index && showBorder
            ? "isActiveMenuList open"
            : "closed "
        }
      `}
      >
        <button
          className="flex justify-between items-center w-full pr-2 hover:text-black "
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
          <ul className={`flex flex-col gap-2 ${!showBorder && "pl-5"}`}>
            {item.items.map((child, index) => (
              <NestedItems
                key={index}
                item={child}
                index={index}
                showBorder={false}
              />
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
