"use client";

import React, { useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { columns } from "./partials/columns";
import AlertModal from "@app/components/alerts/alertModal";
import { showError, showSuccess } from "@app/lib/utils";
import { IRole, delete_role, read_roles } from "@app/server/services";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState({ recordId: 0, open: false });
  const [alert, setAlert] = useState({ recordId: 0, open: false });
  const [data, setData] = useState<IRole | null>(null);
  const [busy, setBusy] = useState(false);
  const { items, mutate, isError, isLoading } = read_roles();

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
        const d = row as IRole;
        setData(d);
        setEdit({ recordId: row.id, open: true });
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

  const isDone = () => {
    mutate();
    toggleModal();
  };

  const handleDelete = async (id: number) => {
    try {
      setBusy(true);
      const res = await delete_role(id);
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
      <div className={` text-gray-500 font-medium text-[22px]`}>Roles List</div>
      <DataTable
        data={items ?? []}
        columns={columns}
        isLoading={isLoading}
        tableLoaderHeaderSize={5}
        addButtonLabel="New Role"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
      />
      <Modal
        open={openModal}
        size="sm"
        title={edit.open ? "Update Role" : "New Role"}
        closeModal={toggleModal}
      >
        <Editor
          isDone={isDone}
          edit={edit.open}
          id={edit.recordId}
          data={data!}
        />
      </Modal>
      <AlertModal
        open={alert.open}
        onCancel={closeAlert}
        onContinue={() => handleDelete(alert.recordId)}
        busy={busy}
      />
    </div>
  );
};

export default Page;
