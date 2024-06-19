"use client";

import { IRating } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IRating>[] = [
  {
    accessorKey: "cover_type.name",
    header: "Cover Type",
  },
  {
    accessorKey: "interest.name",
    header: "Interest",
  },
  {
    accessorKey: "containerized_rate",
    header: "Containerized(%)",
  },
  {
    accessorKey: "non_containerized_rate",
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
