"use client";

import React, { useMemo, useState } from "react";
import DataTable from "@app/components/datatable/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@app/components/ui/button";
import { HeaderWithSorting } from "@app/components/datatable/columnHeaders";
import { InputField, SelectField } from "@app/components/forms/ShadcnFields";
import { read_policy_extensions } from "@app/server/services";
import {
  convertDataToSelectObject,
  convertDataToSelectObjectNameAsValue,
} from "@app/helpers/index";
import { nanoid } from "nanoid";

export type PolicyExtenxionsType = {
  extension: string;
  rate: number;
  id?: string;
};

type SelectType = {
  label: string;
  value: number | string;
};

const columns: ColumnDef<PolicyExtenxionsType>[] = [
  {
    accessorKey: "extension",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Extension" />;
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Rate" />;
    },
  },
];

interface PolicyExtenxionProps {
  policyExtensions: PolicyExtenxionsType[];
  addPolicyExtension: (policyExtension: PolicyExtenxionsType) => void;
  updatePolicyExtension: (policyExtension: PolicyExtenxionsType) => void;
  deletePolicyExtension: (id: string) => void;
}

const PolicyExtenxions = ({
  addPolicyExtension,
  policyExtensions,
  updatePolicyExtension,
  deletePolicyExtension,
}: PolicyExtenxionProps) => {
  const [policyExtension, setPolicyExtension] = useState<PolicyExtenxionsType>({
    rate: 0,
    extension: "",
    id: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [updating, setUpdating] = useState(false);
  const {
    items: policyExtensionItems,
    isLoading: policyExtensionItemsLoading,
  } = read_policy_extensions();

  const policyExtensionSelectItems = useMemo(
    () => convertDataToSelectObjectNameAsValue(policyExtensionItems),
    [policyExtensionItems]
  );

  const reset = () =>
    setPolicyExtension({
      rate: 0,
      extension: "",
      id: "",
    });

  const validateForm = () => {
    let errors = {
      rate: "",
      extension: "",
    };

    // Add your validation logic here
    if (!policyExtension.rate) {
      errors.rate = "Rate is required";
    }

    if (!policyExtension.extension) {
      errors.extension = "Extension is required";
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors, false otherwise
    return Object.values(errors).every((error) => !error);
  };

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case "edit":
        setPolicyExtension(row);
        setUpdating(true);
        break;
      case "delete":
        deletePolicyExtension(row.id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-3 2xl:px-10 box-border">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10 items-center ">
          <SelectField
            label="Policy Extension"
            className="lg:col-span-2"
            onChange={(e) => {
              if (e) {
                setPolicyExtension((prev) => {
                  return { ...prev, extension: e.value };
                });
              }
            }}
            options={policyExtensionSelectItems}
            isLoading={policyExtensionItemsLoading}
            value={
              policyExtensionSelectItems.find(
                (c: SelectType) => c.value === policyExtension.extension
              ) || null
            }
          />
          <InputField
            label="Extension Rate (%)"
            onChange={(e) => {
              if (e) {
                setPolicyExtension((prev) => {
                  return { ...prev, rate: +e.target.value };
                });
              }
            }}
            type="number"
            value={policyExtension.rate}
          />

          <div className="flex  justify-end ">
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
                    if (validateForm()) {
                      updatePolicyExtension(policyExtension);
                      reset();
                    }
                  }}
                >
                  Update
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                className="my-10 font-semibold"
                type="button"
                onClick={() => {
                  if (validateForm()) {
                    addPolicyExtension({ ...policyExtension, id: nanoid() });
                  }
                }}
              >
                Add Item
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-end"></div>
      </div>
      <div className="py-8">
        <DataTable
          columns={columns}
          data={policyExtensions ?? []}
          showHeader={false}
          showActions
          onRowAction={onRowAction}
        />
      </div>
    </div>
  );
};

export default PolicyExtenxions;
