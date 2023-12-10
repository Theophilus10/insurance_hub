"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type ICustomer = {
  id: number;
  ["customer_type"]: string;
  ["full_name"]: string;
  ["customer_category"]: string;
  ["created_at"]: string;
  occupation: string;
  phone: string;
};

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "customer_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customer_category",
    header: "Customer Category",
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
  },
  {
    accessorKey: "phone",
    header: "Contact Phone",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
  },
];
