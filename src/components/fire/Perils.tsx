import React, { useState } from "react";
import DataTable from "@app/components/datatable/datatable";
import { InputField, SelectField } from "@app/components/forms/ShadcnFields";
import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderWithSorting } from "@app/components/datatable/columnHeaders";
import { PerilsType } from "@app/types/policyTypes";
import { validateForm } from "@app/helpers/index";
import { nanoid } from "nanoid";
import { Textarea } from "../ui/textarea";
import { read_fire_peril_class } from "@app/server/services/fire-settings/peril-class";

const perilDefaultValues = {
  id: "",
  rate: 0,
  peril: "",
  description: "",
};

const columns: ColumnDef<PerilsType>[] = [
  {
    accessorKey: "peril",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="ADDITIONAL PERIL" />;
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="RATE" />;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="DEESCRIPTION" />;
    },
  },
];
interface PerilsProps {
  items: PerilsType[];
  addItem: (item: PerilsType) => void;
  updateItem: (item: PerilsType) => void;
  deleteItem: (item: string) => void;
}
const Perils = ({ addItem, deleteItem, items, updateItem }: PerilsProps) => {
  const [perils, setPerils] = useState(perilDefaultValues);
  const [updating, setUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { items: firePerils } = read_fire_peril_class();

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case "edit":
        setPerils(row);
        setUpdating(true);
        break;
      case "delete":
        deleteItem(row.id);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setPerils(perilDefaultValues);
    setUpdating(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setPerils((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex w-full py-5 items-center gap-5">
        {/* <InputField
          label="Additional Perils"
          onChange={(e) => handleInputChange("peril", e.target.value)}
          className="w-full"
          value={perils.peril}
        /> */}

        <SelectField
          label="Additional Perils"
          onChange={(e) => handleInputChange("peril", e.value)}
          options={
            firePerils?.length
              ? firePerils.map((peril: any) => ({
                  label: peril?.name,
                  value: peril?.name,
                }))
              : []
          }
          className="w-full"
        />
        <InputField
          label="Peril Rate"
          onChange={(e) => handleInputChange("rate", +e.target.value)}
          className="w-full"
          value={perils.rate}
          type="number"
        />
      </div>
      <Textarea
        label="Description"
        onChange={(e) => handleInputChange("description", e.target.value)}
        value={perils.description}
      />
      <div>
        {updating ? (
          <div>
            <Button
              variant="link"
              className="text-red-500"
              onClick={() => {
                reset();
                setUpdating(false);
              }}
            >
              Clear
            </Button>
            <Button
              variant="secondary"
              className="my-10 font-semibold"
              type="button"
              onClick={() => {
                if (validateForm(setValidationErrors, perils)) {
                  updateItem(perils);
                  reset();
                }
              }}
            >
              Update Item
            </Button>
          </div>
        ) : (
          <Button
            className="my-3"
            type="button"
            onClick={() => {
              if (validateForm(setValidationErrors, perils)) {
                addItem({ ...perils, id: nanoid() });
                reset();
              }
            }}
          >
            Add Peril
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={items}
        showActions
        onRowAction={onRowAction}
        showHeader={false}
      />
    </div>
  );
};

export default Perils;
