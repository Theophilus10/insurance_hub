"use client";

import DataTable from "@app/components/datatable/datatable";
import React from "react";
import { columns } from "./columns";
import { data } from "../pending_policies/data";
import DateWithCompanySelectors from "@app/components/reporting-headers/date-with-company-selectors";
import { read_policy_approve } from "@app/server/services";
import { read_fire_policy_approve } from "@app/server/services/policies/fire-policies";

const Page = () => {
  const { items, mutate, isLoading, isError } = read_fire_policy_approve();
  return (
    <div className="flex flex-col w-full box-border justify-center items-center   gap-5 ">
      <DateWithCompanySelectors title="Active Policies" />
      <div className="w-full">
        <DataTable
          columns={columns}
          data={items ?? []}
          showAddButton={false}
          isLoading={isLoading}
          tableLoaderHeaderSize={6}
        />
      </div>
    </div>
  );
};

export default Page;
