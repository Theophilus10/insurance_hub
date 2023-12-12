"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type ICustomer = {
  id: number;
  code: string;
  currency: string;
  symbol: string;
  exchangeRate: number;
  created_at: string;
};

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "exchangeRate",
    header: "Exchange Rate",
  },
];
