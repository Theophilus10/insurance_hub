"use client";

import React, { useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { data } from "./partials/data";
import { columns } from "./partials/columns";
import { read_fire_peril_class } from "@app/server/services/fire-settings/peril-class";
import { ExcessType, PerilsType } from "@app/types/policyTypes";
import {
  delete_fire_peril_rate,
  read_fire_peril_rate,
} from "@app/server/services/fire-settings/peril-rating";
import { showError, showSuccess } from "@app/lib/utils";
import {
  read_fire_risk_class,
  RiskClassType,
} from "@app/server/services/fire-settings/risk-classes";
import AlertModal from "@app/components/alerts/alertModal";
import { read_excesses } from "@app/server/services";
import { read_fire_excess_rate } from "@app/server/services/fire-settings/excess-rate";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<any | null>(null);
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
  const { items: excesses } = read_excesses();
  const { items, isError, mutate } = read_fire_excess_rate();
  const { items: riskClass } = read_fire_risk_class();

  useEffect(() => {
    if (isError) {
      showError(isError?.message || isError || "Failed to load data");
    }
  }, [isError]);
  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        toggleModal();
        const d = row as any;
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
      const res = await delete_fire_peril_rate(id);
      if (res.success) {
        showSuccess("Successfully deleted record");
        mutate();
        closeAlert();
      } else {
        showError(res.message || "Failed to delete record");
      }
    } catch (err: any) {
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        List of Excess Rates
      </div>
      <DataTable
        data={items ?? []}
        columns={columns}
        addButtonLabel="Add Excess Rate"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
      />
      <Modal
        open={openModal}
        size="md"
        title={edit.open ? "Update Excess Rate" : "New Excess Rate"}
        closeModal={toggleModal}
      >
        <Editor
          isDone={isDone}
          id={edit.recordId}
          edit={edit.open}
          data={data!}
          excesses={
            excesses
              ? excesses.map((excess: ExcessType) => ({
                  value: excess.id,
                  label: `${excess.code} - ${excess.name}`,
                }))
              : []
          }
          riskClass={
            riskClass
              ? riskClass.map((classItem: any) => ({
                  value: classItem.id,
                  label: classItem.description,
                }))
              : []
          }
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
