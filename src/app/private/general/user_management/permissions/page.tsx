"use client";

import React, { useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import { columns } from "./partials/columns";
import IconifyIcon from "@app/components/icon";

const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        Permissions
      </div>
      <DataTable
        data={data}
        columns={columns}
        addButtonLabel="New Customer Type"
        addButtonFunction={toggleModal}
      />
      <Modal
        open={openModal}
        size="md"
        title="New Customer Type"
        closeModal={toggleModal}
      >
        <Editor />
        <IconifyIcon icon="  solar:round-double-alt-arrow-down-bold" fontSize={40} className="text-red-500"/>
      </Modal>
    </div>
  );
};

export default page;
