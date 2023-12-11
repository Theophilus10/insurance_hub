"use client";
import BreadCrumb, { IBreadCrumb } from "@app/components/ui/breadCrumb";
import { useRouter } from "next/navigation";
import React, { createContext, useMemo, useState } from "react";

export const InstitutionLayout = createContext<any>({});

const layout = ({ children }: { children: React.ReactNode }) => {
  const [breadCrumbOptions, setBreadCrumbOptions] = useState<IBreadCrumb[]>([
    { title: "Institutions List", path: "/private/general/institution_mgt/institutions" },
  ]);
  const activeBreadCrumb = useMemo(() => {
    return breadCrumbOptions[breadCrumbOptions.length - 1].title;
  }, [breadCrumbOptions]);
  const router = useRouter();

  const onItemClick = (title: string, path: string, index: number) => {
    setBreadCrumbOptions(breadCrumbOptions.slice(0, index + 1));
    router.replace(path)
    // router.replace('/private/general/institution_mgt')

  };
  return (
    <div className="flex flex-col gap-2 w-full h-full pt-2">
      <InstitutionLayout.Provider
        value={{
          activeBreadCrumb,
          setBreadCrumbOptions,
          breadCrumbOptions,
        }}
      >
        <BreadCrumb
          options={breadCrumbOptions}
          activeBreadCrumb={activeBreadCrumb}
          onItemClick={onItemClick}
          className="text-xl"
        />
        {children}
      </InstitutionLayout.Provider>
    </div>
  );
};

export default layout;
