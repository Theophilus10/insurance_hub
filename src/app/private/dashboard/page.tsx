"use client";

// import DataTable from "@app/components/datatable/datatable";
import { Alert, AlertDescription, AlertTitle } from "@app/components/ui/alert";
// import useLayoutContext from "@app/context/useLayoutContext";
import { Terminal } from "lucide-react";
import React, { useEffect } from "react";
// import { columns } from "./columns";
// import { data } from "./data";

const Page = () => {
  // const { setPageDetails } = useLayoutContext();
  // useEffect(() => {
  //   setPageDetails({ title: "", showTitle: false });
  // }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Alert className="w-[500px] bg-orange-200">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Anticipate!</AlertTitle>
        <AlertDescription>Dashboard Coming soon</AlertDescription>
      </Alert>
      {/* <DataTable
        columns={columns}
        data={data}
        addButtonLabel="New Users"
        addButtonFunction={() => alert("Test works")}
      /> */}
    </div>
  );
};

export default Page;
