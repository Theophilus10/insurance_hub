// utils/excelUtils.ts

import * as XLSX from "xlsx";

export const generateExcelTemplate = (): { url: string; filename: string } => {
  // Sample data
  const sampleData = [
    [
      "Vehicle Registration",
      "Make/Model",
      "Inception Date",
      "Expiry Date",
      "Created at",
    ],
    [
      "ABC123",
      "Toyota Camry",
      "2022-01-01",
      "2023-01-01",
      "2022-01-01T12:34:56",
    ],
    [
      "XYZ789",
      "Honda Accord",
      "2022-02-01",
      "2023-02-01",
      "2022-02-01T08:45:30",
    ],
    // Add more rows as needed
  ];

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  const sheetName = "FleetData";

  // Add the data to a new worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Create a Blob from the workbook
  const blob = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "blob" as "string" | undefined,
  });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  return {
    url,
    filename: "fleet_template.xlsx",
  };
};
