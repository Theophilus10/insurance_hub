"use client";

import React, { useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import { columns } from "./partials/columns";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        List of Countries
      </div>
      <DataTable
        data={data}
        columns={columns}
        addButtonLabel="Add Country"
        addButtonFunction={toggleModal}
      />
      <Modal
        open={openModal}
        size="md"
        title="Add a Country"
        closeModal={toggleModal}
      >
        <Editor />
      </Modal>
    </div>
  );
};

export default Page;
