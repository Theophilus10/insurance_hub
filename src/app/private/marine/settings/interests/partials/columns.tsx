"use client";

import { IInterest } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IInterest>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Interest",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
  },
];
