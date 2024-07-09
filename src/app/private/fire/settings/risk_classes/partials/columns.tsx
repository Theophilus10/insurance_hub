"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type IRiskClass = {
  id: number;
  code: string;
  description: string;
  min_amount: number;
  max_amount: number;
  fire_rate: number;
  collapse_rate: number;
  public_liability_rate: number;
  created_at: string;
};

export const columns: ColumnDef<IRiskClass>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Min Amount",
    accessorKey: "min_amount",
  },
  {
    header: "Max Amount",
    accessorKey: "max_amount",
  },
  {
    header: "Fire Rate",
    accessorKey: "fire_rate",
  },
  {
    header: "Collapse Rate",
    accessorKey: "collapse_rate",
  },
  {
    header: "Public Liability Rate",
    accessorKey: "public_liability_rate",
  },
];
