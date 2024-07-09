import { useState } from "react";
import { InputField, SelectField } from "@app/components/forms/ShadcnFields";
import { Button } from "@app/components/ui/button";
import DataTable from "@app/components/datatable/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderWithSorting } from "@app/components/datatable/columnHeaders";
import { ExcessType } from "@app/types/policyTypes";
import { validateForm } from "@app/helpers/index";
import { nanoid } from "nanoid";
import { Textarea } from "../ui/textarea";

import { read_excesses } from "@app/server/services";

const defaultValues = { id: "", rate: 0, excess: "", description: "" };

const columns: ColumnDef<ExcessType>[] = [
  {
    accessorKey: "excess",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="EXCESS" />;
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
      return <HeaderWithSorting column={column} label="DESCRIPTION" />;
    },
  },
];

interface ExcessesProps {
  items: ExcessType[];
  addItem: (item: ExcessType) => void;
  updateItem: (item: ExcessType) => void;
  deleteItem: (item: string) => void;
}

const Excesses = ({
  addItem,
  deleteItem,
  items,
  updateItem,
}: ExcessesProps) => {
  const [excesses, setExcesses] = useState(defaultValues);
  const [updating, setUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { items: fireExesses } = read_excesses();

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case "edit":
        setExcesses(row);
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
    setExcesses(defaultValues);
    setUpdating(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setExcesses((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex w-full py-5 items-center gap-5">
        {/* <InputField
          label="Policy Excesses"
          onChange={(e) => handleInputChange("excess", e.target.value)}
          className="w-full"
          value={excesses.excess}
        /> */}

        <SelectField
          label="Policy Excesses"
          onChange={(e) => handleInputChange("excess", e.value)}
          options={
            fireExesses?.length
              ? fireExesses.map((excess: any) => ({
                  label: excess?.name,
                  value: excess?.name,
                }))
              : []
          }
          className="w-full"
        />
        <InputField
          label="Excess Rate"
          onChange={(e) => handleInputChange("rate", +e.target.value)}
          className="w-full"
          type="number"
          value={excesses.rate}
        />
      </div>
      <Textarea
        label="Description"
        onChange={(e) => handleInputChange("description", e.target.value)}
        value={excesses.description}
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
                if (validateForm(setValidationErrors, excesses)) {
                  updateItem(excesses);
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
              if (validateForm(setValidationErrors, excesses)) {
                addItem({ ...excesses, id: nanoid() });
                reset();
              }
            }}
          >
            Add Excess
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={items}
        onRowAction={onRowAction}
        showActions
        showHeader={false}
      />
    </div>
  );
};

export default Excesses;
