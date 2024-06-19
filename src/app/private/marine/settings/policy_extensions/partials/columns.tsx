"use client";

import { IPolicyExtension } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.

export const columns: ColumnDef<IPolicyExtension>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
  },
];
