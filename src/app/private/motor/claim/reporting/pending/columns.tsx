"use client";

import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { Checkbox } from "@app/components/ui/checkbox";
import Link from "next/link";
import Modal from "@app/components/ui/modal";
import React, { useEffect, useState } from "react";
import { Textarea } from "@app/components/ui/textarea";
import { ArrowBigLeftDash, Send, Search } from "lucide-react";
import InputField from "@app/components/forms/InputField";
import Form from "@app/components/forms/Form";
// This type is used to define the shape of our data.

export type Pending = {
  claim_number: string;
  customer_name: string;
  car_registration: string;
  createdAt: string;
};

export const columns: ColumnDef<Pending>[] = [
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
    accessorKey: "claim_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Claim #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customer_name",
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
            <p>{row.original.customer_name.split("")[0]}</p>
          </div>
          <div>
            <p>{row.original.customer_name}</p>
            {/* <p className="text-sm text-gray-500 ">
              {row.original.customerEmail}
            </p> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "car_registration",
    header: "Car Registration Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [openModal, setOpenModal] = useState(false);
      const [openModalReject, setOpenModalReject] = useState(false);
      const toggleModal = () => {
        setOpenModal(!openModal);
      };

      const toggleModalReject = () => {
        setOpenModalReject(!openModalReject);
      };
      return (
        <div className="flex items-center gap-3 text-gray-500">
          <Link href="#">
            <Eye />
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleModal} className="focus:outline-none">
              <ThumbsUp className="h-6 w-6 text-green-500" />
            </button>
            <button onClick={toggleModalReject} className="focus:outline-none">
              <ThumbsDown className="h-6 w-6 text-red-500" />
            </button>
          </div>

          <Modal
            open={openModal}
            size="md"
            title="Claim Approval Information"
            closeModal={toggleModal}
          >
            <div>
              <div className="flex gap-2">
                <p>State why you want to approve</p>
                <ThumbsUp className="h-6 w-6 text-green-500" />
              </div>
              <Form>
                <Textarea
                  //   label="State why you want to approve"
                  name="why_approve"
                />
                <InputField
                  type="number"
                  label="Claim Amount"
                  name="claim_amount"
                />
              </Form>

              <div className="flex justify-end py-5">
                <Button
                  label="Submit"
                  leadingIcon={<Send />}
                  className="font-bold text-lg"
                />
                <Button
                  className="bg-red-500 font-bold  ml-4 text-lg"
                  label="Cancel"
                  onClick={toggleModal}
                />
              </div>
            </div>
          </Modal>

          <Modal
            open={openModalReject}
            size="md"
            title="State Why You Want To Reject This Claim"
            closeModal={toggleModalReject}
          >
            <div>
              <div className="flex gap-2">
                <p>State why you want to Reject</p>
                <ThumbsDown className="h-6 w-6 text-red-500" />
              </div>
              <Textarea
                //   label="State why you want to approve"
                name="reject_claim"
              />
              <div className="flex justify-end py-5">
                <Button
                  label="Submit"
                  leadingIcon={<Send />}
                  className="font-bold text-lg"
                />
                <Button
                  className="bg-red-500 font-bold  ml-4 text-lg"
                  label="Cancel"
                  onClick={toggleModalReject}
                />
              </div>
            </div>
          </Modal>
        </div>
      );
    },
  },
];
