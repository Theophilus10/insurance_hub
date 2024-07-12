"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, ThumbsUp } from "lucide-react";
import { Checkbox } from "@app/components/ui/checkbox";
import Link from "next/link";
import Modal from "../Modal";
import Approve from "@app/components/svg/approve";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { approve_policy } from "@app/server/services";
import toast from "react-hot-toast";
import { approve_fire_policy } from "@app/server/services/policies/fire-policies";

// This type is used to define the shape of our data.

export type Policies = {
  policy_number: string;
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
    cell: ({ row }) => {
      const policyNumber = row.original.policy_number;

      return (
        <Link
          href={{
            pathname: `/private/fire/policies/preview/${policyNumber}`,
            query: {
              policyId: `${row.original.id}`,
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="bg-[#D6D1F7] text-[#2406F5] rounded-full w-8 h-8 flex items-center justify-center">
            <p>{getInitials(row.original?.customer.name)}</p>
          </div>
          <div>
            <p>{row?.original?.customer.name}</p>
            <p className="text-sm text-gray-500 ">
              {row.original.customer.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "property_type",
    header: "Policy Class",
  },
  {
    accessorKey: "inception_date",
    header: "Inception Date",
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
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
    cell: ({ row }) => {
      const router = useRouter();
      const [openModal, setOpenModal] = useState(false);
      const handleLinkClick = () => {
        setOpenModal(true);
      };

      const toggleModal = () => {
        setOpenModal(!openModal);
      };

      const handleApprove = async () => {
        try {
          const response = await approve_fire_policy(row.original.id);
          console.log(response, "response");
          if (response.success !== false) {
            toast.success("Policy successfully approved.");
            toggleModal();
            router.replace("/private/fire/reporting/approved_policies");
          } else {
            toast.error("Failed to approve policy. Please try again later.");
          }
        } catch (error) {
          console.error("Failed to approve policy:", error);
          toast.error("Failed to approve policy. Please try again later.");
        }
      };
      return (
        <div className="flex items-center gap-3 text-gray-500">
          {/* <Link
            href={{
              pathname: `/private/commission/preview/${row?.original?.id}`,
              query: {
                commissionId: `${row.original.id}`,
              },
            }}
          >
            <EyeIcon />
          </Link> */}
          <div className="">
            <div
              onClick={handleLinkClick}
              className="inline-flex items-center text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <ThumbsUp />
            </div>
            <Modal
              show={openModal}
              onClose={toggleModal}
              methods={handleApprove}
              action="Approve"
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <Approve />
                <h2 className="font-bold text-black text-2xl">
                  Approving Policy?
                </h2>
                <p className="mb-4 px-6">
                  By clicking "Approve", you confirm that you have reviewed and
                  agree to approve this policy.
                </p>
                <p>Policy Number: {row.original.policy_number}</p>
                <p>Customer: {row.original.customer.name}</p>
                <p>Currency: {row.original.currency.code}</p>
                {/* <p>
                  Sum Insured: {row.original.currency.symbol}
                  {row.original.sum_insured}
                </p>
                <p>
                  Premium Payable: {row.original.currency.symbol}
                  {row.original.premium_payable}
                </p> */}
              </div>
            </Modal>
          </div>

          <Edit />
        </div>
      );
    },
  },
];
