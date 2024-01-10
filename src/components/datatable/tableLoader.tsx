import React from "react";

interface TableProps {
  bodySize: number;
  headerSize: number;
}

const TableLoader: React.FC<TableProps> = ({ bodySize, headerSize }) => {
  return (
    <table className="animate-pulse w-full">
      <thead>
        <tr>
          {[...Array(headerSize)].map((_, index) => (
            <th key={index} className="px-6 py-2 whitespace-nowrap">
              <div className="h-7 bg-gray-300 rounded-md" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border-t border-gray-300 divide-y">
        {[...Array(bodySize)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(headerSize)].map((_, colIndex) => (
              <td key={colIndex} className="px-6 py-2 whitespace-nowrap">
                <div className="h-7 bg-gray-300 rounded-md" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableLoader;
