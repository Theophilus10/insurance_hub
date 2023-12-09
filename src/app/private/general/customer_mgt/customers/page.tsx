"use client";
import Table from "@app/components/ui/Table";
import React, { useEffect } from "react";
import Editor from "./partials/editor";
import useLayoutContext from "@app/context/useLayoutContext";
import ScrollSection from "@app/components/ui/scrollSection";

const page = () => {
  const { setPageDetails } = useLayoutContext();
  useEffect(() => {
    setPageDetails({ title: "Customers List", showTitle: true });
  }, []);
  return (
    <ScrollSection className="bg-white p-4  h-full w-full shadow-sm border">
      <Table
        Editor={Editor}
        addButtonLabel="New Customer"
        addNewRecordLabel="New Customer"
        updateRecordLabel="Update Customer"
      />
    </ScrollSection>
  );
};

export default page;
