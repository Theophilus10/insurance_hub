"use client";

import { IFinancialInterest } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IFinancialInterest>[] = [
  {
    accessorKey: "code",
    header: " Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
  },
];
