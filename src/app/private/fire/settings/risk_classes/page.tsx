"use client";

import React, { useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { columns } from "./partials/columns";
import {
  ICountry,
  IPort,
  IShippingType,
  delete_excess,
  delete_port,
  read_countries,
  read_excesses,
  read_ports,
  read_shipping_types,
} from "@app/server/services";
import { showError, showSuccess } from "@app/lib/utils";
import AlertModal from "@app/components/alerts/alertModal";
import {
  delete_fire_peril_class,
  read_fire_peril_class,
} from "@app/server/services/fire-settings/peril-class";
import {
  read_fire_risk_class,
  RiskClassType,
} from "@app/server/services/fire-settings/risk-classes";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<RiskClassType | null>(null);
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
  const { items, isError, isLoading, mutate } = read_fire_risk_class();

  useEffect(() => {
    if (isError) {
      showError(isError?.message || isError || "Failed to load data");
    }
  }, [isError]);
  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        toggleModal();
        const d = row as IPort;
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
      const res = await delete_fire_peril_class(id);
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
        List of Risk Classes
      </div>
      <DataTable
        data={items ?? []}
        isLoading={isLoading}
        tableLoaderHeaderSize={6}
        columns={columns}
        addButtonLabel="Add Risk Class"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
      />
      <Modal
        open={openModal}
        size="md"
        title={edit.open ? "Update Risk Class" : "New Risk Class"}
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
