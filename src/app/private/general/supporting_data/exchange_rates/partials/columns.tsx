"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type IExchangeRate = {
  id: number;
  currency: string;
  rate: number;
  created_at: string;
};

export const columns: ColumnDef<IExchangeRate>[] = [
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
  },
];
