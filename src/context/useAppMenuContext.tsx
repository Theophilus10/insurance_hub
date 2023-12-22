import {
  fireMenuItems,
  fireSettings,
  marineMenuItems,
  marineSettings,
  motorMenuItems,
} from "@app/data/menuItems";

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@app/lib/localStorage";
import { IMenuItem } from "@app/types/appTypes";
import { useEffect, useState } from "react";

const appMenuKey = "appMenuKey";

const appList: { name: string; icon: string }[] = [
  { name: "Marine", icon: "carbon:marine-warning" },
  { name: "Fire", icon: "game-icons:fire-bowl" },
  { name: "Motor", icon: "gis:car" },
  { name: "Live", icon: "material-symbols-light:ecg-heart-sharp" },
];
// const x = { title: "", menus: [{ title: "", path: "" }] };

const useAppMenuContext = () => {
  const ret: any = loadFromLocalStorage(appMenuKey);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [activeMenu, setActiveMenu] = useState(appList[0]);
  const [settingsItems, setSettingsItems] = useState<IMenuItem[]>([]);

  const setItems = (key: string) => {
    const d = key;
    switch (d) {
      case "Marine":
        setMenuItems(marineMenuItems);
        setSettingsItems(marineSettings);
        break;
      case "Fire":
        setMenuItems(fireMenuItems);
        setSettingsItems(fireSettings);

        break;
      case "Motor":
        setMenuItems(motorMenuItems);
        setSettingsItems([]);

        break;

      default:
        setMenuItems([]);
        break;
    }
  };

  const setActiveAppMenu = (x: { name: string; icon: string }) => {
    setActiveMenu(x);
    saveToLocalStorage(appMenuKey, x);
  };

  useEffect(() => {
    if (ret) {
      setActiveMenu(ret);
      setItems(ret?.name);
    }
  }, []);

  useEffect(() => {
    if (activeMenu) {
      setItems(activeMenu.name);
    }
  }, [activeMenu]);

  return {
    menuItems,
    setMenuItems,
    appList,
    activeMenu,
    setActiveAppMenu,
    settingsItems,
  };
};

export default useAppMenuContext;
