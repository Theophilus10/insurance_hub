"use client";

import { ICurrency } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ICurrency>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Currency",
  },
  {
    accessorKey: "is_base",
    cell({ row }) {
      return row.original.is_base ? "YES" : "No";
    },
    header: "Base Currency",
  },
];
