import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
export type ICustomer = {
  id: number;
  ["ncd_number"]: string;
  ["date"]: string;
  ["vehicle_registration"]: string;
  insured: string;
};

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "ncd_number", // Corrected accessor key
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NCD Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "vehicle_registration",
    header: "Vehicle Registration",
  },
  {
    accessorKey: "insured",
    header: "Insured",
  },
];
