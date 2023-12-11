"use client";

import React, { useContext, useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import AlertModal from "@app/components/alerts/alertModal";
import { useRouter } from "next/navigation";
import { columns } from "./partials/columns";
import { InstitutionLayout } from "../layout";

const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const { setBreadCrumbOptions } = useContext(InstitutionLayout);
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({ recordId: 0, open: false });

  const toggleModal = () => {
    setOpenModal(!openModal);
    setEdit(false);
  };

  useEffect(() => {
    setBreadCrumbOptions([
      {
        title: "Institutions List",
        path: "/private/general/institution_mgt/institutions",
      },
      { title: "Branch List" },
    ]);
  }, []);

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
      {/* <div className={` text-gray-500 font-medium text-[22px]`}>
        Institutions List
      </div> */}
      <DataTable
        data={data}
        columns={columns}
        addButtonLabel="New Branch"
        addButtonFunction={toggleModal}
        onRowAction={onRowAction}
        showActions
      />
      <Modal
        open={openModal}
        size="lg"
        title={edit ? "Update Branch" : "New Branch"}
        closeModal={toggleModal}
      >
        <Editor />
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
