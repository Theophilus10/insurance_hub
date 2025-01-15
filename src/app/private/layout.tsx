"use client";
import PrivateRoute from "@app/components/layout/PrivateRoute";
import React, { createContext, useEffect, useRef, useState } from "react";
import LogoUrl from "@app/assets/images/logo.png";
import LogoUrls from "@app/assets/images/default.png";
import Image from "next/image";
// import Sidebar from "@app/components/layout/sideNav";

import Navbar from "@app/components/layout/Navbar";
import Divider from "@app/components/ui/Divider";
import IconifyIcon from "@app/components/icon";
import useAppMenuContext from "@app/context/useAppMenuContext";
import userContext from "@app/context/userContext";
import { useRouter } from "next/navigation";
import AlertModal from "@app/components/alerts/alertModal";
import { generalMenuItems } from "@app/data/menuItems";
import { signOut } from "next-auth/react";
import Sidebar from "@app/components/layout/sidePanel";
import ScrollSection from "@app/components/ui/scrollSection";
import { motion, AnimatePresence } from "framer-motion";
import { set } from "date-fns";
import Logo from "@app/components/svg/logo";

export const LayoutContext = createContext<any>({});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [hideSidebar, setHideSidebar] = useState(false);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [pageDetails, setPageDetails] = useState<{
    title: string;
    showTitle: boolean;
  }>({
    title: "",
    showTitle: false,
  });
  const {
    menuItems,
    setMenuItems,
    appList,
    activeMenu,
    setActiveAppMenu,
    settingsItems,
  } = useAppMenuContext();
  const { user } = userContext();

  const triggerSignOut = () => {
    setShowAlert(true);
  };

  const [showProducts, setShowProducts] = useState(false); // State to manage visibility of products list

  // <iconify-icon icon="eos-icons:products"></iconify-icon>
  const visibilityTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [sidebarItemLocation, setSidebarItemLocation] = useState({
    top: 0,
    left: "",
  });
  const [currentPopupElement, setCurrentPopupElement] =
    useState<React.JSX.Element | null>(null);

  const handleLeave = () => {
    if (visibilityTimeout.current) {
      clearTimeout(visibilityTimeout.current);
    }
    visibilityTimeout.current = setTimeout(() => {
      setShowProducts(false);
    }, 200);
  };
  // const screenSize = window.screen.width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setHideSidebar(true);
      } else {
        setHideSidebar(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // <PrivateRoute>
    <LayoutContext.Provider value={{ pageDetails, setPageDetails }}>
      <div className="w-screen h-screen overflow-hidden relative">
        <aside
          id="sidebar"
          className={`relative ${
            hideSidebar && "hide"
          } flex flex-col shadow-2xl`}
        >
          <a
            // href="/private/dashboard"
            className="logo-container brand py-4 flex flex-col  gap-1"
          >
            {/* <Image
              src={LogoUrls}
              alt="logo"
              loading="lazy"
              className={hideSidebar ? "w-20" : "w-[100px]"}
            /> */}
            {hideSidebar ? (
              <Logo width="50px" height="40px" />
            ) : (
              <Logo width="80px" height="60px" />
            )}

            <span
              className={`text-[16px] font-extrabold ${
                hideSidebar ? "hidden" : "hidden md:block"
              }`}
            >
              <p className="logo-text">INSURANCE HUB</p>
            </span>
          </a>

          <Divider className="mt-2 bg-gray-200 mx-4" />

          {hideSidebar ? (
            <ul className="flex justify-evenly ">
              <div className="relative">
                <div className="flex justify-center items-center text-center">
                  <div>
                    <button
                      className=" text-blue-600 border-blue-600"
                      onClick={() => setShowProducts(!showProducts)}
                    >
                      <IconifyIcon icon="eos-icons:products" fontSize={30} />
                    </button>
                    {/* <p className="text-[13px]">Products</p> */}
                  </div>
                </div>

                {/* Tooltip-like list */}

                {showProducts && (
                  <div className="absolute top-0 left-10 z-50 bg-white shadow-lg border rounded p-2 whitespace-nowrap">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        onMouseOver={() => {
                          clearTimeout(visibilityTimeout.current!);
                          setShowProducts(true);
                        }}
                        onMouseOut={() => handleLeave()}
                        className=" transition-all add-customer-bezier"
                        style={{
                          position: "fixed",
                          zIndex: "50",
                          left: "10",
                        }}
                      >
                        {appList.map((product) => (
                          <button
                            key={product.name}
                            className="block w-full bg-white text-left p-2 mx-2 text-gray-800 hover:bg-gray-100 "
                            onClick={() => setActiveAppMenu(product)}
                          >
                            <div className="flex gap-5">
                              <IconifyIcon icon={product.icon} fontSize={20} />
                              <span className="teproductt-xs ">
                                {product.name}
                              </span>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className=" fixed  inset-0  block transition-all add-customer-bezier duration-300  z-40 bg-gray-600/60"
                      ></motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </ul>
          ) : (
            <div className="pt-3">
              <AppServices
                appList={appList}
                setActiveMenu={setActiveAppMenu}
                activeMenu={activeMenu}
              />
            </div>
          )}

          <ScrollSection className="mt-5 h-full overflow-y-auto flex-grow">
            <Sidebar
              generalRouteItems={generalMenuItems}
              basicRouteItems={menuItems}
              settingsRouteItems={settingsItems}
              isSideBarClose={hideSidebar}
            />
          </ScrollSection>
        </aside>

        <section id="content" className="w-full h-full">
          <Navbar
            toggleSidebar={() => setHideSidebar(!hideSidebar)}
            triggerSignOut={triggerSignOut}
            hideSidebar={hideSidebar}
            user={user}
          />
          <section className="bg-[#f5e9eb78] w-full h-full flex-grow flex flex-col">
            <div className=" w-full h-full flex-grow overflow-auto px-6 py-3  ">
              {children}
            </div>
          </section>
        </section>
      </div>
      <AlertModal
        open={showAlert}
        onCancel={() => setShowAlert(false)}
        onContinue={async () => {
          await signOut();
          router.replace("/login");
        }}
        message="Are you sure you want to logout?"
        title="Logout"
      />
    </LayoutContext.Provider>
    // </PrivateRoute>
  );
};

export default Layout;

const AppServices = ({
  appList,
  activeMenu,
  setActiveMenu,
}: {
  appList: { name: string; icon: string }[];
  activeMenu: { name: string; icon: string };
  setActiveMenu: (x: any) => void;
}) => {
  return (
    <ul className="flex justify-evenly ">
      {appList.map((x, index) => (
        <li
          key={index}
          className={
            x.name === activeMenu.name
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-600 font-thin"
          }
        >
          <button
            className="flex items-center flex-col gap-1"
            onClick={() => {
              setActiveMenu(x);
            }}
          >
            <IconifyIcon icon={x.icon} fontSize={20} />
            <span className="text-xs ">{x.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
