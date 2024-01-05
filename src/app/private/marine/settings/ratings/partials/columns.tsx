"use client";

import { IRating } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IRating>[] = [
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
