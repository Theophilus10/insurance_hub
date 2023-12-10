import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import IconifyIcon from "../icon";

export interface ITableRowActionList {
  title: string;
  accessor?: string;
  icon?: string;
}

interface ITableRowActions {
  showEdit?: boolean;
  showDelete?: boolean;
  showAddBranches?: boolean;
  showViewBranches?: boolean;
  onRowAction?: (action: string) => void;
  actionList?: ITableRowActionList[];
  allowCustomRowActionList?: boolean;
}

const TableRowActions: React.FC<ITableRowActions> = ({
  showEdit = true,
  showDelete = true,
  allowCustomRowActionList = false,
  actionList = [],
  onRowAction,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 bg-gray-200 hover:border hover:border-gray-400 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-2"
        >
          <IconifyIcon icon="tabler:dots" className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {allowCustomRowActionList && actionList?.length ? (
          actionList.map((x, index) => {
            return (
              <React.Fragment key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    onRowAction && onRowAction(x.accessor ?? x.title)
                  }
                >
                  {x.title}
                  <DropdownMenuShortcut>
                    <IconifyIcon
                      icon={x.icon!}
                      fontSize={15}
                      className={
                        x.title.toLowerCase().includes("delete")
                          ? "text-red-600"
                          : ""
                      }
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                {index !== actionList.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            );
          })
        ) : (
          <>
            {showEdit && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onRowAction && onRowAction("edit")}
                >
                  Edit
                  <DropdownMenuShortcut>
                    <IconifyIcon icon="fe:edit" fontSize={15} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {showDelete && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onRowAction && onRowAction("delete")}
                >
                  Delete
                  <DropdownMenuShortcut>
                    <IconifyIcon
                      icon="mdi:trash"
                      fontSize={15}
                      className="text-red-600"
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableRowActions;
