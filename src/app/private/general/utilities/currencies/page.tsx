"use client";

import React, { useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { columns } from "./partials/columns";
import {
  ICurrency,
  delete_currency,
  read_currencies,
} from "@app/server/services";
import { showError, showSuccess } from "@app/lib/utils";
import AlertModal from "@app/components/alerts/alertModal";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<ICurrency | null>(null);
  const [edit, setEdit] = useState({
    recordId: 0,
    open: false,
  });
  const [alert, setAlert] = useState({ recordId: 0, open: false });
  const [busy, setBusy] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
    setEdit({ recordId: 0, open: false });
    if (data) {
      setData(null);
    }
  };
  const { items, isError, isLoading, mutate } = read_currencies();
  useEffect(() => {
    if (isError) {
      showError(isError?.message || isError || "Failed to load data");
    }
  }, [isError]);
  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        toggleModal();
        const d = row as ICurrency;
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
      const res = await delete_currency(id);
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
        List of Available Currencies
      </div>
      <DataTable
        data={items ?? []}
        isLoading={isLoading}
        columns={columns}
        addButtonLabel="Add Currency"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
        tableLoaderHeaderSize={4}

      />
      <Modal
        open={openModal}
        size="sm"
        title={edit.open ? "Update Currency" : "New Currency"}
        closeModal={toggleModal}
      >
        <Editor
          isDone={isDone}
          id={edit.recordId}
          edit={edit.open}
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
