"use client";

import React, { useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import { columns } from "./partials/columns";

const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        Customers List
      </div>
      <DataTable
        data={data}
        columns={columns}
        addButtonLabel="New Customer"
        addButtonFunction={toggleModal}
      />
      <Modal
        open={openModal}
        size="xl"
        title="New Customer"
        closeModal={toggleModal}
      >
        <Editor />
      </Modal>
    </div>
  );
};

export default page;
