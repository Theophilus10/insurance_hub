"use client";

import React, { useEffect, useState } from "react";
import Editor from "./partials/editor";
import Modal from "@app/components/ui/modal";
import DataTable from "@app/components/datatable/datatable";
import { columns } from "./partials/columns";
import AlertModal from "@app/components/alerts/alertModal";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IInstitutionType,
  IRole,
  IUser,
  delete_user,
  read_branches,
  read_institution_types,
  read_institutions,
  read_roles,
  read_users,
} from "@app/server/services";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<IUser | null>(null);
  const [edit, setEdit] = useState({
    recordId: 0,
    open: false,
  });
  const [alert, setAlert] = useState({ recordId: 0, open: false });
  const [busy, setBusy] = useState(false);
  const { items, isError, isLoading, mutate } = read_users();
  const branch = read_branches();
  const instituitons = read_institutions();
  const role = read_roles();
  const institutionType = read_institution_types();

  const toggleModal = () => {
    setOpenModal(!openModal);
    setEdit({ recordId: 0, open: false });
    if (data) {
      setData(null);
    }
  };
  useEffect(() => {
    if (isError) {
      showError(isError?.message || isError || "Failed to load data");
    }
  }, [isError]);

  const onRowAction = (action: string, row: Record<string, any>) => {
    switch (action) {
      case "edit":
        toggleModal();
        const d = row as IUser;
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
      const res = await delete_user(id);
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
      <div className={` text-gray-500 font-medium text-[22px]`}>Users List</div>
      <DataTable
        data={items ?? []}
        columns={columns}
        isLoading={isLoading}
        tableLoaderHeaderSize={6}
        addButtonLabel="New User"
        addButtonFunction={toggleModal}
        showActions
        onRowAction={onRowAction}
      />
      <Modal
        open={openModal}
        size="lg"
        title={edit.open ? "Update User" : "New User"}
        closeModal={toggleModal}
      >
        <Editor
          edit={edit.open}
          id={edit.recordId}
          data={data!}
          isDone={isDone}
          role={
            role.items
              ? role.items.map((x: IRole) => ({
                  value: x.id,
                  label: x.name,
                }))
              : []
          }
          institution={instituitons ? instituitons.items : []}
          institutionType={
            institutionType.items
              ? institutionType.items.map((x: IInstitutionType) => ({
                  value: x.id,
                  label: x.name,
                }))
              : []
          }
          branch={branch ? branch.items : []}
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
