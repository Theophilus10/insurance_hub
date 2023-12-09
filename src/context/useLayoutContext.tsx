"use client";
import { LayoutContext } from "@app/app/private/layout";
import { useContext } from "react";

const useLayoutContext = () => {
  const { pageDetails, setPageDetails } = useContext(LayoutContext);

  return { pageDetails, setPageDetails };
};

export default useLayoutContext;
