import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const tableFilter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="border border-teal-400 bg-teal-200 rounded-[5px] px-4 py-1.5 hover:bg-teal-300">
          Filters
        </button>
        <DropdownMenuContent>This will depend on the table</DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default tableFilter;
