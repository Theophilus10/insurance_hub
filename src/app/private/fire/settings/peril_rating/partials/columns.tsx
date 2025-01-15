"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type ICustomer = {
  peril: string;
  riskClass: string;
  rate: number;
  startDate: string;
  endDate: string;
  created_at: string;
};

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "fire_peril_class.name",
    header: "Peril",
  },
  {
    accessorKey: "fire_risk_class.description",
    header: "Risk Class",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
  },
];
