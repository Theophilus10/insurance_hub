"use client";

import React, { useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import { columns } from "./partials/columns";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editorLabel, setEditorLabel] = useState("Add Risk Class");
  const [preValues,setPreValues] = useState({})
  const toggleModal = () => {
    setEditorLabel("Add Risk Class");
    setPreValues({})
    setOpenModal(!openModal);
  };

  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        setEditorLabel("Update Risk Class");
        setOpenModal(true);
        setPreValues(row)
        break;
      case "delete":
        alert("delete");

        break;

      default:
        break;
    }
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        List of Risk Classes
      </div>
      <DataTable
        data={data}
        columns={columns}
        addButtonLabel="Add Risk Class"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
      />
      <Modal
        open={openModal}
        size="md"
        title={editorLabel}
        closeModal={toggleModal}
      >
        <Editor prevalues={preValues}/>
      </Modal>
    </div>
  );
};

export default Page;
