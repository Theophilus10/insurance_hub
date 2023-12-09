import React from "react";
import IconifyIcon from "../icon";

interface ITableSearchBox {
  placeholder?: string;
  readOnly?: boolean;
}

const TableSearchbox: React.FC<ITableSearchBox> = ({
  placeholder = "Search...",
  readOnly = false,
}) => {
  return (
    //   <script lang="ts">
    //   export let placeholder = '';
    //   export let value = '';
    //   export let readOnly = false
    // </script>

    <section className="bg-gray-100 rounded-md flex items-center  p-2  border border-blue-200">
      <IconifyIcon
        icon="eva:search-outline"
        className="text-xl text-gray-500"
      />
      <input
        className="outline-none px-2 border-none bg-transparent placeholder:text-sm text-sm w-full"
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </section>
  );
};

export default TableSearchbox;
