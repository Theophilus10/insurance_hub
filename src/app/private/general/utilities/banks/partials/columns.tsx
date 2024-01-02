"use client";

import { IBank } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IBank>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Bank",
  },
  {
    accessorKey: "code",
    header: "Bank Code",
  },
];
