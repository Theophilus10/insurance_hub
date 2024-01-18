import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
export type IStickerPrices = {
  id: number;
  ["amount"]: string;
  ["start_date"]: string;
  ["end_date"]: string;
  ["comment"]: string;
};

export const columns: ColumnDef<IStickerPrices>[] = [
  {
    accessorKey: "amount", // Corrected accessor key
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },

  {
    accessorKey: "comment",
    header: "Comment",
  },
];
