"use client";

import React, { useState } from "react";
import { FormItem, FormLabel } from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import { Textarea } from "@app/components/ui/textarea";
import Select from "react-select";
import { Button } from "@app/components/ui/button";
import DataTable from "@app/components/datatable/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type LoadingType = {
  loadings: string;

  loading_rate: number;
};

const columns: ColumnDef<LoadingType>[] = [
  {
    accessorKey: "loadings",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-lg p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loading Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "loading_rate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-lg p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loading Rate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

interface LoadingProps {
  loadings: LoadingType[];
  addLoadings: (loading: LoadingType) => void;
}

const Loadings: React.FC<LoadingProps> = ({
  loadings,
  addLoadings,
}: LoadingProps) => {
  const [loading, setLoading] = useState({
    loadings: "",

    loading_rate: 0,
  });

  const deleteTranshipment = (index: number) => {};
  return (
    <div className="p-3 2xl:px-10 box-border">
      <div className="border-b-[1px] ">
        <div className="grid grid-cols-5 gap-10  ">
          <FormItem className="col-span-2">
            <FormLabel>Loading Type:</FormLabel>
            <Select
              onChange={(e) => {
                if (e) {
                  setLoading((prev) => {
                    return { ...prev, loadings: e.value };
                  });
                }
              }}
              options={[
                { label: "Age Loading", value: "Age Loading" },
                {
                  label: "Cubic Capacity Loading",
                  value: "Cubic Capacity Loading",
                },
              ]}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Loading Rate(%):</FormLabel>
            <Input
              type="number"
              onChange={(e) => {
                setLoading((prev) => {
                  return { ...prev, loading_rate: +e.target.value };
                });
              }}
            />
          </FormItem>
        </div>
        <div className="flex justify-end">
          <Button
            variant="primary"
            className="my-10 font-semibold"
            type="button"
            onClick={() => addLoadings(loading)}
          >
            Add Loading
          </Button>
        </div>
      </div>
      <div className="py-8">
        <DataTable
          columns={columns}
          data={loadings}
          showHeader={false}
          showActions
        />
      </div>
    </div>
  );
};

export default Loadings;
