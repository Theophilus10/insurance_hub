"use client";

import React, { useEffect, useState } from "react";
import Editor from "./partials/editor";
import useLayoutContext from "@app/context/useLayoutContext";
import ScrollSection from "@app/components/ui/scrollSection";
import { TableColumn } from "react-data-table-component";
import Modal from "@app/components/ui/modal";

// const columns: TableColumn<DataRow>[] = [
//   {
//     name: <div className="text-base">Name</div>,
//     selector: (row: any) => row.name,
//   },
//   {
//     name: <div className="text-base">Customer Type</div>,
//     selector: (row: any) => row.customer_type,
//   },
//   {
//     name: <div className="text-base">Identification Type</div>,
//     selector: (row: any) => row.identification_type,
//   },
//   {
//     name: <div className="text-base">ID Number</div>,
//     selector: (row: any) => row.idNumber,
//   },
//   {
//     name: <div className="text-base">Customer Category</div>,
//     selector: (row: any) => row.customer_category,
//   },
//   {
//     name: <div className="text-base">Occupation</div>,
//     selector: (row: any) => row.occupation,
//   },
// ];

const page = () => {
  // const { setPageDetails } = useLayoutContext();
  // useEffect(() => {
  //   setPageDetails({ title: "Customers List", showTitle: true });
  // }, []);
  const [openModal, setOpenModal] = useState(true);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="flex flex-col w-full h-full gap-4 pt-2">
      <div className={` text-gray-500 font-medium text-[22px]`}>
        Customer List
      </div>
      {/* <ScrollSection className="bg-white p-4  h-full w-full shadow-sm border "></ScrollSection> */}
      <Modal
        open={openModal}
        size="xl"
        title="New Customer"
        closeModal={toggleModal}
      >
        <Editor />
      </Modal>
    </div>
  );
};

export default page;
