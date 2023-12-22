"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/ui-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataTablePagination } from "./pagination";
import { useState } from "react";
import { Button } from "../ui/button";
// import { Input } from "../ui/input";
import TableSearchbox from "../ui/tableSearchbox";
import TableRowActions, { ITableRowActionList } from "./tableRowActions";
import TableLoader from "./tableLoader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showAddButton?: boolean;
  addButtonLabel?: string;
  addButtonFunction?: () => void;
  searchPlaceholder?: string;
  onRowAction?: (action: string, row: Record<string, any>) => void;
  tableRowActionList?: ITableRowActionList[];
  allowCustomRowActionList?: boolean;
  showActions?: boolean;
  showHeader?: boolean;
  isLoading?: boolean;
  tableLoaderHeaderSize?: number;
  tableLoaderBodySize?: number;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  showAddButton = true,
  addButtonLabel = "New Record",
  addButtonFunction,
  searchPlaceholder = "Search...",
  onRowAction,
  tableRowActionList = [],
  allowCustomRowActionList = false,
  showActions = false,
  showHeader = true,
  isLoading = false,
  tableLoaderBodySize = 6,
  tableLoaderHeaderSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  return (
    <div className="rounded-md border p-4 bg-white">
      {showHeader && (
        <div className="flex items-center justify-between mb-5">
          <div className="w-3/12">
            <TableSearchbox placeholder={searchPlaceholder} />
          </div>
          <div className="flex items-center gap-3">
            {showAddButton && (
              <Button
                label={addButtonLabel}
                variant="primary"
                onClick={() => addButtonFunction && addButtonFunction()}
              />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto border-teal-300 bg-teal-50"
                >
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize cursor-pointer"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
      {isLoading ? (
        <TableLoader
          headerSize={tableLoaderHeaderSize}
          bodySize={tableLoaderBodySize}
        />
      ) : (
        <>
          <Table className="mb-5">
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="h-7 whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                  {showActions && <TableHead>Actions</TableHead>}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell>
                        <TableRowActions
                          actionList={tableRowActionList}
                          allowCustomRowActionList={allowCustomRowActionList}
                          onRowAction={(action) =>
                            onRowAction && onRowAction(action, row.original!)
                          }
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DataTablePagination table={table} />
        </>
      )}
    </div>
  );
}
