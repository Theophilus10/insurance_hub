"use client";

import React, { useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { columns } from "./partials/columns";
import AlertModal from "@app/components/alerts/alertModal";
import {
  ICustomer,
  ICustomerCategory,
  ICustomerType,
  delete_customer,
  read_customer_categories,
  read_customer_types,
  read_customers,
  read_identification_types,
  read_occupations,
} from "@app/server/services";
import { showError, showSuccess } from "@app/lib/utils";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<ICustomer | null>(null);
  const [edit, setEdit] = useState({
    recordId: 0,
    open: false,
  });
  const [alert, setAlert] = useState({ recordId: 0, open: false });
  const [busy, setBusy] = useState(false);
  const { items, mutate, isLoading, isError } = read_customers();
  const customerTypes = read_customer_types();
  const customerCategory = read_customer_categories();
  const identificationType = read_identification_types();
  const occupation = read_occupations();
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
        const d = row as ICustomer;
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
      const res = await delete_customer(id);
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
        Customers List
      </div>
      <DataTable
        data={items ?? []}
        columns={columns}
        addButtonLabel="New Insurer"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
        isLoading={isLoading}
        tableLoaderHeaderSize={8}
      />
      <Modal
        open={openModal}
        size="lg"
        title={edit.open ? "Update Customer" : "New Customer"}
        closeModal={toggleModal}
      >
        <Editor
          id={edit.recordId}
          edit={edit.open}
          data={data!}
          isDone={isDone}
          customerCategory={
            customerCategory.items
              ? customerCategory.items.map((x: ICustomerCategory) => ({
                  value: x.id,
                  label: x.name,
                }))
              : []
          }
          customerType={
            customerTypes.items
              ? customerTypes.items.map((x: ICustomerType) => ({
                  value: x.id,
                  label: x.name,
                }))
              : []
          }
          identificationType={
            identificationType.items
              ? identificationType.items.map((x: ICustomerCategory) => ({
                  value: x.id,
                  label: x.name,
                }))
              : []
          }
          occupation={
            occupation.items
              ? occupation.items.map((x: ICustomerCategory) => ({
                  value: x.id,
                  label: x.name,
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
