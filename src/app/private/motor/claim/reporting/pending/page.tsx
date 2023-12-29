"use client";
import DateHeader from "@app/components/reporting-headers/date-header";
import DataTable from "@app/components/datatable/datatable";
import React, { useEffect, useState } from "react";
import { policiesData } from "./data";
import { columns } from "./columns";
import Modal from "@app/components/ui/modal";
import { useRouter } from "next/navigation";

const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const router = useRouter();
  const handleClaimRegister = () => {
    router.push("/private/motor/claim/register");
  };
  return (
    <div>
      <DateHeader title="Pending Policies" />
      <div className="w-full">
        <DataTable
          columns={columns}
          data={policiesData}
          addButtonLabel="Register Claim"
          addButtonFunction={handleClaimRegister}
        />
        <Modal
          open={openModal}
          size="lg"
          title="State Why You Want To Approve This Claim"
          closeModal={toggleModal}
        />
      </div>
    </div>
  );
};

export default page;
