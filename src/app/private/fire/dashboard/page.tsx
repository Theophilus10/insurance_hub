"use client";

import { Alert, AlertDescription, AlertTitle } from "@app/components/ui/alert";
import useLayoutContext from "@app/context/useLayoutContext";
import { Terminal } from "lucide-react";
import React, { useEffect } from "react";

const page = () => {
  const { setPageDetails } = useLayoutContext();
  useEffect(() => {
    setPageDetails({ title: "", showTitle: false });
  }, []);
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Alert className="w-[500px] bg-orange-200">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Anticipate!</AlertTitle>
        <AlertDescription>Dashboard Coming soon</AlertDescription>
      </Alert>
    </div>
  );
};

export default page;
