"use client";

import { Button } from "@app/components/ui/button";
import { ICustomer } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "customer_type.name",
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
    accessorKey: "customer_category.name",
    header: "Customer Category",
  },
  {
    accessorKey: "occupation.name",
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
