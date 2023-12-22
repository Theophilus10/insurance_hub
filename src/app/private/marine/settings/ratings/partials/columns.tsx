"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export type ICustomer = {
  id: number;
  coverType: string;
  interest: string;
  containerized: string;
  nonContainerized: string;
  exclusions: string;
  remarks: string;
  created_at: string;
};

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "coverType",
    header: "Cover Type",
  },
  {
    accessorKey: "interest",
    header: "Interest",
  },
  {
    accessorKey: "containerized",
    header: "Containerized(%)",
  },
  {
    accessorKey: "nonContainerized",
    header: "Non-Containerized(%)",
  },
  {
    accessorKey: "exclusions",
    header: "Exclusions",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
  },
];
