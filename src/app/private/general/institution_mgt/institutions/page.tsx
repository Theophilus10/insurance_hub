"use client";

import React, { useContext, useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { columns } from "./partials/columns";
import { ITableRowActionList } from "@app/components/datatable/tableRowActions";
import AlertModal from "@app/components/alerts/alertModal";
import { useRouter } from "next/navigation";
import {
  IInstitution,
  IInstitutionType,
  delete_instituition,
  read_institution_types,
  read_institutions,
} from "@app/server/services";
import { showError, showSuccess } from "@app/lib/utils";

const actions: ITableRowActionList[] = [
  { title: "Edit", icon: "fe:edit", accessor: "edit" },
  { title: "Delete", icon: "mdi:trash", accessor: "delete" },
];
const page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState({ recordId: 0, open: false });
  const [alert, setAlert] = useState({ recordId: 0, open: false });
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState<IInstitution | null>(null);

  const { items, isError, isLoading, mutate } = read_institutions();
  const institutionsTypes = read_institution_types();

  useEffect(() => {
    if (isError) {
      showError(isError?.message || isError || "Failed to load data");
    }
  }, [isError]);

  const toggleModal = () => {
    setOpenModal(!openModal);
    setEdit({ recordId: 0, open: false });
    if (data) {
      setData(null);
    }
  };
  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        toggleModal();
        const d = row as IInstitution;
        setData(d);
        setEdit({ recordId: row.id, open: true });
        break;
      case "delete":
        setAlert({ recordId: row.id, open: true });
        break;

      default:
        break;
    }
  };

  const closeAlert = () => {
    setAlert({ recordId: 0, open: false });
  };

  const isDone = () => {
    mutate();
    toggleModal();
  };

  const handleDelete = async (id: number) => {
    try {
      setBusy(true);
      const res = await delete_instituition(id);
      if (res.success) {
        showSuccess("Successfully deleted record");
        mutate();
        closeAlert();
      } else {
        showError(res.message || "Failed to delete record");
      }
    } catch (err: any) {
      console.log(err);
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        Institutions List
      </div>
      <DataTable
        data={items ?? []}
        columns={columns}
        isLoading={isLoading}
        tableLoaderHeaderSize={6}
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
        title={edit.open ? "Update Institution" : "New Institution"}
        closeModal={toggleModal}
      >
        <Editor
          data={data!}
          edit={edit.open}
          id={edit.recordId}
          institutionTypes={
            institutionsTypes.items
              ? institutionsTypes.items.map((x: IInstitutionType) => ({
                  value: x.id,
                  label: x.name,
                }))
              : []
          }
          isDone={isDone}
        />
      </Modal>
      <AlertModal
        open={alert.open}
        onCancel={closeAlert}
        busy={busy}
        onContinue={() => handleDelete(alert.recordId)}
      />
    </div>
  );
};

export default page;
