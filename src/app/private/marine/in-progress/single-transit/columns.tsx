"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Award, Edit2Icon, XCircle } from "lucide-react";
import { Checkbox } from "@app/components/ui/checkbox";
import Link from "next/link";
import { STPolicySteps } from "../../underwriting/single_transit_policies/page";
import { Step } from "@app/components/stepper/stepperTypeDef";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.

export type Policies = {
  policyNumber: string;
  customerName: string;
  customerEmail: string;
  openCoverNumber: string;
  createdAt: string;
};

function getInitials(name: string): string {
  const words = name?.split(" ");
  const initials = words?.map((word) => word.charAt(0)).join("");
  return initials;
}

export const columns: ColumnDef<Policies>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "policy_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Policy Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const policyNumber = row?.original?.policy_number;

      return (
        <Link
          href={{
            pathname: `/private/marine/underwriting/single_transit_policies/preview/${policyNumber}`,
            query: {
              policyId: `${row?.original?.id}`,
            },
          }}
        >
          <div className="text-blue-500 hover:underline">{policyNumber}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "customer.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-2">
          <div className="bg-[#D6D1F7] text-[#2406F5] rounded-full w-8 h-8 flex items-center justify-center">
            <p>{getInitials(row.original?.customer?.name)}</p>
          </div>
          <div>
            <p>{row?.original?.customer?.name}</p>
            <p className="text-sm text-gray-500 ">
              {row?.original?.customer?.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "openCoverNumber",
    header: "Open Cover Number",
  },
  {
    accessorKey: "issue_date",
    header: "Inception Date",
  },
  {
    accessorKey: "intermediary.name",
    header: "Intermediary",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const router = useRouter();
      const stepIndex = row?.original?.current_step_index;

      const lastStep = STPolicySteps?.find(
        (step: Step, index) => index == Number(stepIndex) + 1
      )?.label;

      console.log(lastStep, "last");

      const myUrl = "/private/marine/underwriting/single_transit_policies";
      const url = `${myUrl}?policy_id=${
        row?.original?.id
      }&step=${encodeURIComponent(lastStep!)}`;
      const handleClick = () => {
        router.push(url);
      };
      return (
        <button
          onClick={() => handleClick()}
          className="flex justify-center items-center gap-3 text-white bg-blue-500 hover:bg-blue-600 border border-blue-500 hover:border-blue-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out h-10 w-28"
        >
          Continue
        </button>
      );
    },
  },
];
