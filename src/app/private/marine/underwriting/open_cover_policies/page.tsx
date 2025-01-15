"use client";

import DataTable from "@app/components/datatable/datatable";
import React from "react";
import { columns } from "./partial/columns";

import DateHeader from "@app/components/reporting-headers/date-header";
import { read_policy_pending } from "@app/server/services";
import { useRouter } from "next/navigation";
import { read_open_cover_policy } from "@app/server/services/policies/marine/open_cover";

const Page = () => {
  const { items, mutate, isLoading, isError } = read_open_cover_policy();
  const router = useRouter();
  const handleLink = () => {
    router.replace("/private/marine/underwriting/open_cover_policies/partial");
  };
  return (
    <div className="flex flex-col w-full box-border justify-center items-center   gap-5 ">
      <DateHeader title="Open Cover Policies" />
      <div className="w-full">
        <DataTable
          columns={columns}
          data={items ?? []}
          addButtonLabel="+ Open Cover Policy"
          addButtonFunction={handleLink}
          isLoading={isLoading}
          tableLoaderHeaderSize={8}
        />
      </div>
    </div>
  );
};

export default Page;
