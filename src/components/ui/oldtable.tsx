"use client";

import React, { useReducer } from "react";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
import TableSearchbox from "./tableSearchbox";
import { Button } from "./button";
import SideModal from "./sideModal";
import { ContentSize } from "@app/types/appTypes";
import AlertModal from "../alerts/alertModal";
import TableFilter from "./tableFilter";
import Modal from "./modal";

const data = [
  {
    id: 1,
    name: "Osei Adu",
    customer_type: "Individual",
    identification_type: "National ID",
    idNumber: "GHA-712344944-3",
    customer_category: "Citizen",
    occupation: "Self Employed",
  },
  {
    id: 2,
    name: "John Adu",
    customer_type: "Individual",
    identification_type: "National ID",
    idNumber: "GHA-7123242444-3",
    customer_category: "Citizen",
    occupation: "Public Servant",
  },
  {
    id: 3,
    name: "Alex Blay",
    customer_type: "Individual",
    identification_type: "National ID",
    idNumber: "GHA-871344944-3",
    customer_category: "Citizen",
    occupation: "Self Employed",
  },
  {
    id: 4,
    name: "Osei Adu",
    customer_type: "Individual",
    identification_type: "National ID",
    idNumber: "GHA-712344944-3",
    customer_category: "Citizen",
    occupation: "Self Employed",
  },
  {
    id: 5,
    name: "Osei Adu",
    customer_type: "Individual",
    identification_type: "National ID",
    idNumber: "GHA-712344944-3",
    customer_category: "Citizen",
    occupation: "Self Employed",
  },
];

export type DataRow = Record<string, any>;

interface ITable {
  addNewRecordLabel?: string;
  addButtonLabel?: string;
  updateRecordLabel?: string;
  modalSize?: ContentSize;
  Editor?: any;
  searchPlaceholder?: string;
  showAddButton?: boolean;
  showSearchBox?: boolean;
  tableColumn: TableColumn<DataRow>[];
}

const Table: React.FC<ITable> = ({
  addButtonLabel = "New Record",
  addNewRecordLabel = "Add New Record",
  updateRecordLabel = "Update Record",
  modalSize = "md",
  Editor,
  searchPlaceholder = "Search...",
  showAddButton = true,
  showSearchBox = true,
  tableColumn,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSideModal = () => {
    if (!state.openSideModal)
      dispatch({ type: "SET_EDITOR_HEADING", payload: addNewRecordLabel });
    dispatch({ type: "TOGGLE_SIDE_MODAL", payload: !state.openSideModal });
  };

  const toggleAlertModal = () => {
    dispatch({ type: "TOGGLE_ALERT_MODAL", payload: !state.openAlertModal });
  };

  const handleAlertMutation = () => {
    dispatch({ type: "TOGGLE_LOAD_DELETE", payload: !state.loadDelete });
    setTimeout(() => {
      dispatch({ type: "TOGGLE_ALERT_MODAL", payload: !state.openAlertModal });
      dispatch({ type: "TOGGLE_LOAD_DELETE", payload: !state.loadDelete });
    }, 700);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between">
        <div className={`flex-grow max-w-md ${!showSearchBox && "hidden"}`}>
          <TableSearchbox placeholder={searchPlaceholder} />
        </div>
        <div className="flex items-center gap-4">
          <div>
            <TableFilter />
          </div>
          <div className={`${!showAddButton && "hidden"}`}>
            <Button
              variant="primary"
              label={addButtonLabel}
              onClick={toggleSideModal}
            />
          </div>
        </div>
      </div>
      <DataTable
        columns={tableColumn}
        data={data}
        striped
        pagination
        responsive
        defaultSortFieldId={1}
        defaultSortAsc

        // theme="solarized"
      />
      <Modal
        open={state.openSideModal}
        size={modalSize}
        title={state.editorHeading}
        closeModal={toggleSideModal}
      >
        <Editor />
      </Modal>
      {/* <SideModal
        open={state.openSideModal}
        closeModal={toggleSideModal}
        size={modalSize}
       
      >
        <Editor />
      </SideModal> */}
      <AlertModal
        open={state.openAlertModal}
        onCancel={toggleAlertModal}
        onContinue={handleAlertMutation}
        busy={state.loadDelete}
      />
    </div>
  );
};

export default Table;

const initialState = {
  openSideModal: false,
  addRecord: false,
  updateRecord: false,
  editorHeading: "",
  openAlertModal: false,
  loadDelete: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "TOGGLE_SIDE_MODAL":
      return {
        ...state,
        openSideModal: action.payload,
      };
    case "TOGGLE_ADD_RECORD":
      return {
        ...state,
        addRcord: action.payload,
      };
    case "TOGGLE_UPDATE_RECORD":
      return {
        ...state,
        updateRecord: action.payload,
      };
    case "TOGGLE_LOAD_DELETE":
      return {
        ...state,
        loadDelete: action.payload,
      };
    case "TOGGLE_ALERT_MODAL":
      return {
        ...state,
        openAlertModal: action.payload,
      };
    case "SET_EDITOR_HEADING":
      return {
        ...state,
        editorHeading: action.payload,
      };

    default:
      return state;
  }
};
