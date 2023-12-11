'use client';
import PrivateRoute from '@app/components/layout/PrivateRoute';
import React, { createContext, useState } from 'react';
import LogoUrl from '@app/assets/images/logo.png';
import Image from 'next/image';
// import Sidebar from "@app/components/layout/sideNav";
import Navbar from '@app/components/layout/Navbar';
import Divider from '@app/components/ui/Divider';
import IconifyIcon from '@app/components/icon';
import useAppMenuContext from '@app/context/useAppMenuContext';
import userContext from '@app/context/userContext';
import { useRouter } from 'next/navigation';
import AlertModal from '@app/components/alerts/alertModal';
import { generalMenuItems } from '@app/data/menuItems';
import Sidebar from '@app/components/layout/Sidebar';

export const LayoutContext = createContext<any>({});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [hideSidebar, setHideSidebar] = useState(false);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [pageDetails, setPageDetails] = useState<{
    title: string;
    showTitle: boolean;
  }>({
    title: '',
    showTitle: false,
  });
  const { menuItems, setMenuItems, appList, activeMenu, setActiveAppMenu } =
    useAppMenuContext();
  const { user } = userContext();

  const triggerSignOut = () => {
    setShowAlert(true);
  };

  return (
    <PrivateRoute>
      <LayoutContext.Provider value={{ pageDetails, setPageDetails }}>
        <div className='w-screen h-screen overflow-hidden relative'>
          <aside
            id='sidebar'
            className={`relative ${
              hideSidebar && 'hide'
            } overflow-y-hidden  flex flex-col`}
          >
            <a
              // href="/private/dashboard"
              className='brand py-4 flex flex-col  gap-1'
            >
              <Image
                src={LogoUrl}
                alt='logo'
                loading='lazy'
                className={hideSidebar ? 'w-10' : 'w-[80px]'}
              />
              <span
                className={`font-medium text-[16px]  ${
                  hideSidebar ? 'hidden' : 'hidden md:block'
                }`}
              >
                INSURANCE HUB
              </span>
            </a>
            <Divider className='mt-2 bg-gray-200 mx-4' />
            <div className='pt-3'>
              <AppServices
                appList={appList}
                setActiveMenu={setActiveAppMenu}
                activeMenu={activeMenu}
              />
            </div>
            <div className='mt-5 h-full overflow-y-auto flex-grow'>
              {/* <Sidebar menuItems={menuItems} hideSidebar={hideSidebar} /> */}
              <Sidebar
                generalRouteItems={generalMenuItems}
                basicRouteItems={menuItems}
              />
            </div>
          </aside>
          <section id='content' className='w-full h-full'>
            <Navbar
              toggleSidebar={() => setHideSidebar(!hideSidebar)}
              triggerSignOut={triggerSignOut}
              hideSidebar={hideSidebar}
              user={user}
            />
            <section className='bg-[#f5e9eb78] w-full h-full flex-grow flex flex-col'>
              {/* <div
                className={`px-6 pt-3 text-gray-500 font-medium text-[22px] ${
                  !pageDetails.showTitle && "hidden"
                }`}
              >
                {pageDetails.title}
              </div> */}
              <div className=' w-full h-full flex-grow overflow-auto px-6 py-3  '>
                {children}
              </div>
            </section>
          </section>
        </div>
        <AlertModal
          open={showAlert}
          onCancel={() => setShowAlert(false)}
          onContinue={() => setShowAlert(false)}
          message='Are you sure you want to logout?'
          title='Logout'
        />
      </LayoutContext.Provider>
    </PrivateRoute>
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
    <ul className='flex justify-evenly '>
      {appList.map((x, index) => (
        <li
          key={index}
          className={
            x.name === activeMenu.name
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-blue-600 font-thin'
          }
        >
          <button
            className='flex items-center flex-col gap-1'
            onClick={() => {
              setActiveMenu(x);
            }}
          >
            <IconifyIcon icon={x.icon} fontSize={20} />
            <span className='text-xs '>{x.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
