import React, { useState, ChangeEvent } from "react";
import DataTable from "@app/components/datatable/datatable";
import { columns as fleetColumns, Fleet } from "./partials/columns";
import * as XLSX from "xlsx";
import { Button } from "@app/components/ui/button";

type FileData = Array<Record<string, any>>;
type FleetUploadProps = {
  closeModal: () => void;
};
const EXTENSIONS = ["xlsx", "xls", "csv"];

const FleetUpload: React.FC<FleetUploadProps> = ({ closeModal }) => {
  const [data, setData] = useState<FileData | undefined>([]);
  const [loading, setLoading] = useState(false);

  const getExtension = (file: File): boolean => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  // const convertToJson = (data: any[][]): FileData => {
  //   const rows: FileData = [];

  //   data.forEach((row) => {
  //     let rowData: Record<string, any> = {};

  //     fleetColumns.forEach((column, index) => {
  //       const header = column.accessorKey;
  //       const element = row[index];

  //       rowData[header] = element;
  //     });

  //     rows.push(rowData);
  //   });

  //   return rows;
  // };

  const importExcel = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const bstr = event.target?.result as string;
        const workBook = XLSX.read(bstr, { type: "binary" });

        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];

        const fileData = XLSX.utils.sheet_to_json(workSheet);
        console.log(fileData, "filedata");
        setData(fileData);
      } catch (error) {
        console.error("Error reading or processing Excel file:", error);
        setData([]);
        // Add additional error handling or user feedback if needed
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      if (getExtension(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input. Select Excel or CSV file.");
      }
    } else {
      setData([]);
    }
  };

  return (
    <div>
      <h1 className="font-extrabold">Upload Fleet Excel</h1>
      <p>
        Download the fleet upload from{" "}
        <a
          className="text-blue-500"
          href="https://docs.google.com/spreadsheets/d/12LCHzvNowJAC1IW3mwJdcyvtz_ETvqKO/edit?usp=sharing&ouid=104371721567626693711&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer" }}
        >
          Download Template
        </a>
      </p>

      <div className="flex justify-between">
        <div className="py-3">
          <input
            name="fleet_upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={importExcel}
          />
        </div>
      </div>

      {loading && <div>Loading...</div>}

      <div className="flex flex-col w-full h-full gap-4 pt-2">
        <div className={`text-gray-500 font-medium text-[22px]`}>
          List all Fleets
        </div>
        {console.log(data, "fff")}
        <DataTable data={data} columns={fleetColumns} />
        <div className="flex justify-end space-x-[10px]">
          <Button>Create Fleet</Button>
          <Button onClick={closeModal} variant="destructive">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FleetUpload;
