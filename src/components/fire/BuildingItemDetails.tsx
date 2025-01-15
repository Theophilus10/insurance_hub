import React, { useState } from "react";
import {
  InputField,
  SelectField,
  TextAreaField,
} from "@app/components/forms/ShadcnFields";
import { Button } from "@app/components/ui/button";
import DataTable from "@app/components/datatable/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderWithSorting } from "@app/components/datatable/columnHeaders";
import { nanoid } from "nanoid";
import { BuildingItemDetailsType } from "@app/types/policyTypes";
import { validateForm } from "@app/helpers/index";

const regions = [
  { label: "Ahafo", value: "Ahafo" },
  { label: "Ashanti", value: "Ashanti" },
  { label: "Bono", value: "Bono" },
  { label: "Bono East", value: "Bono East" },
  { label: "Central", value: "Central" },
  { label: "Eastern", value: "Eastern" },
  { label: "Greater Accra", value: "Greater Accra" },
  { label: "North East", value: "North East" },
  { label: "Northern", value: "Northern" },
  { label: "Oti", value: "Oti" },
  { label: "Savannah", value: "Savannah" },
  { label: "Upper East", value: "Upper East" },
  { label: "Upper West", value: "Upper West" },
  { label: "Volta", value: "Volta" },
  { label: "Western", value: "Western" },
  { label: "Western North", value: "Western North" },
];

const columns: ColumnDef<BuildingItemDetailsType>[] = [
  {
    accessorKey: "item_description",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="ITEM DESCRIPTION" />;
    },
  },
  {
    accessorKey: "item_location",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="LOCATION" />;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="VALUE" />;
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="REGION" />;
    },
  },
];

const initialBuildingItemState = {
  id: "",
  item_description: "",
  value: 0,
  region: "",
  collapse_rate: 0,
  fire_rate: 0,
  public_liability_rate: 0,
  digital_address: "",
  item_location: "",
};

interface BuildingItemDetailsProps {
  items: BuildingItemDetailsType[];
  addItem: (item: BuildingItemDetailsType) => void;
  updateItem: (item: BuildingItemDetailsType) => void;
  deleteItem: (id: string) => void;
}
const BuildingItemDetails = ({
  addItem,
  deleteItem,
  items,
  updateItem,
}: BuildingItemDetailsProps) => {
  const [buildingItems, setBuildingItems] = useState<BuildingItemDetailsType>(
    initialBuildingItemState
  );
  const [validationErrors, setValidationErrors] = useState({});
  const [updating, setUpdating] = useState(false);

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case "edit":
        setBuildingItems(row);
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
    setBuildingItems(initialBuildingItemState);
    setUpdating(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setBuildingItems((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="grid py-5  lg:grid-cols-2 gap-5 ">
        <TextAreaField
          label="Item Description:"
          placeholder="Description"
          className="lg:col-span-2"
          onChange={(e) =>
            handleInputChange("item_description", e.target.value)
          }
          value={buildingItems.item_description}
        />
        <InputField
          label="Item Value:"
          onChange={(e) => handleInputChange("value", +e.target.value)}
          type="number"
          value={buildingItems.value}
        />
        <InputField
          label="Fire Rate:"
          onChange={(e) => handleInputChange("fire_rate", +e.target.value)}
          type="number"
          value={buildingItems.fire_rate}
        />
        <InputField
          label="Collapse Rate:"
          onChange={(e) => handleInputChange("collapse_rate", +e.target.value)}
          type="number"
          value={buildingItems.collapse_rate}
        />
        <InputField
          label="Public Liabilty Rate:"
          onChange={(e) =>
            handleInputChange("public_liability_rate", +e.target.value)
          }
          type="number"
          value={buildingItems.public_liability_rate}
        />
        <SelectField
          label="Region"
          onChange={(e) => handleInputChange("region", e.value)}
          value={regions.find((c) => c.value === buildingItems.region) || null}
          options={regions}
        />
        <InputField
          label="Digital Address"
          onChange={(e) => handleInputChange("digital_address", e.target.value)}
          value={buildingItems.digital_address}
        />
        <TextAreaField
          label="Location of item (include nearest landmark):"
          placeholder="Description"
          className="lg:col-span-2"
          onChange={(e) => handleInputChange("item_location", e.target.value)}
          value={buildingItems.item_location}
        />
      </div>
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
              if (validateForm(setValidationErrors, buildingItems)) {
                updateItem(buildingItems);
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
            if (validateForm(setValidationErrors, buildingItems)) {
              addItem({ ...buildingItems, id: nanoid() });
              reset();
            }
          }}
        >
          Add Item
        </Button>
      )}
      <DataTable
        columns={columns}
        data={items}
        showHeader={false}
        showActions
        onRowAction={onRowAction}
      />
    </div>
  );
};

export default BuildingItemDetails;
