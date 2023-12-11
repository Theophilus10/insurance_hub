"use client";

import React, { use, useContext, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import { columns } from "./partials/columns";
import { ITableRowActionList } from "@app/components/datatable/tableRowActions";
import AlertModal from "@app/components/alerts/alertModal";
import { useRouter } from "next/navigation";
import { InstitutionLayout } from "./layout";

const actions: ITableRowActionList[] = [
  { title: "Edit", icon: "fe:edit", accessor: "edit" },
  // {
  //   title: "Add Branch",
  //   icon: "heroicons:building-office-solid",
  //   accessor: "add_branch",
  // },
  {
    title: "Branches",
    icon: "emojione-monotone:office-building",
    accessor: "branches",
  },
  { title: "Delete", icon: "mdi:trash", accessor: "delete" },
];
const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const { setBreadCrumbOptions, breadCrumbOptions } =
    useContext(InstitutionLayout);
  const router = useRouter();
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
        setAlert({ recordId: row.id, open: true });
        break;

      case "branches":
        setBreadCrumbOptions([...breadCrumbOptions, { title: "Branch List" }]);
        router.replace(
          `/private/general/institution_mgt/institutions/${row.id}`
        );

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
        addButtonLabel="New Institution"
        addButtonFunction={toggleModal}
        onRowAction={onRowAction}
        showActions
        allowCustomRowActionList
        tableRowActionList={actions}
      />
      <Modal
        open={openModal}
        size="lg"
        title={edit ? "Update Institution" : "New Institution"}
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
