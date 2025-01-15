"use client";

import DataTable from "@app/components/datatable/datatable";
import React from "react";
import { columns } from "./column";

import DateWithCompanySelectors from "@app/components/reporting-headers/date-with-company-selectors";
import {
  read_policy_approve,
  read_policy_in_progress,
} from "@app/server/services";
import { read_open_cover_policy_in_progress } from "@app/server/services/policies/marine/open_cover";

const Page = () => {
  const { items, mutate, isLoading, isError } =
    read_open_cover_policy_in_progress();
  return (
    <div className="flex flex-col w-full box-border justify-center items-center   gap-5 ">
      <DateWithCompanySelectors title="In Progress. You Can Continue The Underwriting" />
      <div className="w-full">
        <DataTable
          columns={columns}
          data={items ?? []}
          showAddButton={false}
          isLoading={isLoading}
          tableLoaderHeaderSize={8}
        />
      </div>
    </div>
  );
};

export default Page;
