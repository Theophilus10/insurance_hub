"use client";

import { IExchangeRate } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IExchangeRate>[] = [
  {
    accessorKey: "currency.name",
    header: "Currency",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
  },
];
