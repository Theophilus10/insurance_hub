"use client";

import { IPort } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IPort>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "country.name",
    header: "Country",
  },
  {
    accessorKey: "shipping_type.name",
    header: "Shipping Type",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
  },
];
