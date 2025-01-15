"use client";

import DataTable from "@app/components/datatable/datatable";
import React from "react";
import { columns } from "./columns";
import { data } from "./data";
import DateHeader from "@app/components/reporting-headers/date-header";
import { read_policy_pending } from "@app/server/services";
import { read_fire_policy_pending } from "@app/server/services/policies/fire-policies";

const Page = () => {
  const { items, mutate, isLoading, isError } = read_fire_policy_pending();
  return (
    <div className="flex flex-col w-full box-border justify-center items-center   gap-5 ">
      <DateHeader title="Pending Policies" />
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
