import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
export type ICustomer = {
  id: number;
  ["name"]: string;
  ["start_date"]: string;
  ["end_date"]: string;
  ["basic_premium"]: string;
  ["sticker_fee"]: string;
  ["brown_card_sticker_fee"]: string;
};

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "start_date",
    header: "End Date",
  },
  {
    accessorKey: "basic_premium", // Corrected accessor key
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
    accessorKey: "sticker_fee",
    header: "Sticker Fee",
  },
  {
    accessorKey: "brown_card_sticker_fee",
    header: "Browncard Sticker Fee",
  },
];
