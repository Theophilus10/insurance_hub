"use client";

import DataTable from "@app/components/datatable/datatable";
import React from "react";
import { columns } from "./columns";
// import { data } from '../pending_policies/data';
import DateWithCompanySelectors from "@app/components/reporting-headers/date-with-company-selectors";

const Page = () => {
  return (
    <div className="flex flex-col w-full box-border justify-center items-center   gap-5 ">
      <DateWithCompanySelectors title="Cancelled Policies" />
      <div className="w-full">
        <DataTable columns={columns} data={[]} showAddButton={false} />
      </div>
    </div>
  );
};

export default Page;
