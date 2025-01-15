"use client";

import { Alert, AlertDescription, AlertTitle } from "@app/components/ui/alert";
import { Terminal } from "lucide-react";
import React from "react";
import HeaderStats from "./Headers";

const Page = () => {
  return (
    <div className="w-full h-full ">
      <div className="">
        <HeaderStats />
      </div>
      {/* <Alert className="w-[500px] bg-orange-200">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Anticipate!</AlertTitle>
        <AlertDescription>Marine Dashboard Coming soon</AlertDescription>
      </Alert> */}
    </div>
  );
};

export default Page;
