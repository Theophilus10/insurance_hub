"use client";

import React, { useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import { columns } from "./partials/columns";
import IconifyIcon from "@app/components/icon";
import AlertModal from "@app/components/alerts/alertModal";

const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({ recordId: 0, open: false });
  const toggleModal = () => {
    setOpenModal(!openModal);
    setEdit(false);
  };
  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        toggleModal();
        setEdit(true);
        break;
      case "delete":
        setAlert({ open: true, recordId: row.id });
        break;
      default:
        break;
    }
  };

  const closeAlert = () => {
    setAlert({ recordId: 0, open: false });
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        Permissions List
      </div>
      <DataTable
        data={data}
        columns={columns}
        addButtonLabel="New Permission"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
      />
      <Modal
        open={openModal}
        size="sm"
        title={edit ? "Update Permission" : "New Permission"}
        closeModal={toggleModal}
      >
        <Editor />
        <IconifyIcon
          icon="  solar:round-double-alt-arrow-down-bold"
          fontSize={40}
          className="text-red-500"
        />
      </Modal>
      <AlertModal
        open={alert.open}
        onCancel={closeAlert}
        onContinue={closeAlert}
      />
    </div>
  );
};

export default page;
