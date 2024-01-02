"use client";

import { ICountry } from "@app/server/services";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.

export const columns: ColumnDef<ICountry>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Country",
  },
  {
    accessorKey: "code",
    header: "Country Code",
  },
];
