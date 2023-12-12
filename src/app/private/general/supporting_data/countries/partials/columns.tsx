"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type ICustomer = {
  id: number;
  country: string;
  code: string;
  created_at: string;
};

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "code",
    header: "Country Code",
  },
];
