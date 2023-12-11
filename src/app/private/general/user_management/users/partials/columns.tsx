"use client";

import { Button } from "@app/components/ui/button";
import { IUser } from "@app/context/userContext";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "full_name",
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="bg-[#D6D1F7] text-[#2406F5] rounded-full w-8 h-8 flex items-center justify-center">
            <p>{row.original.initials}</p>
          </div>
          <div>
            <p>{row.original.full_name}</p>
            <p className="text-sm text-gray-500 ">{row.original.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "contact_phone",
    header: "Contact Phone",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
  },
];
