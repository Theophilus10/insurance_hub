"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type IRiskClass = {
  id: number;
  code: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  fireRate: number;
  collapseRate: number;
  publicLiabilityRate: number;
  created_at: string;
};

export const columns: ColumnDef<IRiskClass>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    header: "description",
    accessorKey: "Description",
  },
  {
    header: "Min Amount",
    accessorKey: "minAmount",
  },
  {
    header: "Max Amount",
    accessorKey: "maxAmount",
  },
  {
    header: "Fire Rate",
    accessorKey: "fireRate",
  },
  {
    header: "Collapse Rate",
    accessorKey: "collapseRate",
  },
  {
    header: "Public Liability Rate",
    accessorKey: "publicLiabilityRate",
  },
];
