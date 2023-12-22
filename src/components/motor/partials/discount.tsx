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

export type DiscountType = {
  discounts: string;
  discount_rate: number;
};

const columns: ColumnDef<DiscountType>[] = [
  {
    accessorKey: "discounts",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-lg p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "discount_rate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-lg p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount Rate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

interface DiscountProps {
  discounts: DiscountType[];
  addDiscounts: (discount: DiscountType) => void;
}

const Discounts: React.FC<DiscountProps> = ({
  discounts,
  addDiscounts,
}: DiscountProps) => {
  const [discount, setDiscount] = useState({
    discounts: "",

    discount_rate: 0,
  });

  const deleteTranshipment = (index: number) => {};
  return (
    <div className="p-3 2xl:px-10 box-border">
      <div className="border-b-[1px] ">
        <div className="grid grid-cols-5 gap-10  ">
          <FormItem className="col-span-2">
            <FormLabel>Discount Type:</FormLabel>
            <Select
              onChange={(e) => {
                if (e) {
                  setDiscount((prev) => {
                    return { ...prev, discounts: e.value };
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
            <FormLabel>Discount Rate(%):</FormLabel>
            <Input
              type="number"
              onChange={(e) => {
                setDiscount((prev) => {
                  return { ...prev, discount_rate: +e.target.value };
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
            onClick={() => addDiscounts(discount)}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="py-8">
        <DataTable
          columns={columns}
          data={discounts}
          showHeader={false}
          showActions
        />
      </div>
    </div>
  );
};

export default Discounts;
