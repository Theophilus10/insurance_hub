"use client";

import DataTable from "@app/components/datatable/datatable";
import React from "react";
import { columns } from "./columns";

import DateWithCompanySelectors from "@app/components/reporting-headers/date-with-company-selectors";
import { read_policy_approve } from "@app/server/services";

const Page = () => {
  const { items, mutate, isLoading, isError } = read_policy_approve();
  return (
    <div className="flex flex-col w-full box-border justify-center items-center   gap-5 ">
      <DateWithCompanySelectors title="Active Policies" />
      <div className="w-full">
        <DataTable
          columns={columns}
          isLoading={isLoading}
          tableLoaderHeaderSize={6}
          data={items ?? []}
          showAddButton={false}
        />
      </div>
    </div>
  );
};

export default Page;
