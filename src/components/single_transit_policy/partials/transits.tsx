"use client";

import React, { useState } from "react";
import DataTable from "@app/components/datatable/datatable";
import { FormItem, FormLabel } from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderWithSorting } from "@app/components/datatable/columnHeaders";
import { nanoid } from "nanoid";
import { Textarea } from "@app/components/ui/textarea";

export type TransitType = {
  transit_from: string;
  transit_to: string;
  transit_description: string;
  rate: number;
  id: string;
};

const columns: ColumnDef<TransitType>[] = [
  {
    accessorKey: "transit_from",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="From" />;
    },
  },
  {
    accessorKey: "transit_to",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="To" />;
    },
  },
  {
    accessorKey: "transit_description",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Description" />;
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Transit Rate(%)" />;
    },
  },
];

interface TransitProps {
  transits: TransitType[];
  addTransit: (transit: TransitType) => void;
  updateTransit: (transit: TransitType) => void;
  deleteTransit: (id: string) => void;
}

const Transits = ({
  transits,
  addTransit,
  deleteTransit,
  updateTransit,
}: TransitProps) => {
  const [transit, setTransit] = useState({
    transit_from: "",
    transit_to: "",
    transit_description: "",
    rate: 0,
    id: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    transit_from: "",
    transit_to: "",
    // transit_description: "",
    rate: "",
  });

  const [updating, setUpdating] = useState(false);

  const reset = () => {
    setTransit({
      transit_from: "",
      transit_to: "",
      transit_description: "",
      rate: 0,
      id: "",
    });
  };

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case "edit":
        setTransit(row);
        setUpdating(true);
        break;
      case "delete":
        deleteTransit(row.id);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    let errors = {
      transit_from: "",
      transit_to: "",
      rate: "",
    };

    // Add your validation logic here
    if (!transit.transit_from) {
      errors.transit_from = "Origin Country is required";
    }

    if (!transit.transit_to) {
      errors.transit_to = "Destination Country is required";
    }

    if (transit.rate <= 0) {
      errors.rate = "Rate must be a positive number";
    }

    // if (!transit.transit_description) {
    //   errors.transit_to = "Destination Country is required";
    // }

    setValidationErrors(errors);

    // Return true if there are no validation errors, false otherwise
    return Object.values(errors).every((error) => !error);
  };

  return (
    <div className="p-3 2xl:px-10 box-border">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10  ">
          <FormItem className="lg:col-span-2">
            <FormLabel>From:</FormLabel>
            <Input
              onChange={(e) => {
                setTransit((prev) => {
                  return { ...prev, transit_from: e.target.value };
                });
              }}
              value={transit.transit_from}
            />
          </FormItem>
          <FormItem className="lg:col-span-2">
            <FormLabel>To:</FormLabel>
            <Input
              onChange={(e) => {
                setTransit((prev) => {
                  return { ...prev, transit_to: e.target.value };
                });
              }}
              value={transit.transit_to}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Transit Rate(%):</FormLabel>
            <Input
              type="number"
              onChange={(e) => {
                setTransit((prev) => {
                  return { ...prev, rate: +e.target.value };
                });
              }}
              value={transit.rate}
            />
          </FormItem>
          <FormItem className="lg:col-span-5">
            <FormLabel>Transit Description:</FormLabel>
            <Textarea
              onChange={(e) => {
                if (e) {
                  setTransit((prev) => {
                    return { ...prev, transit_description: e.target.value };
                  });
                }
              }}
              value={transit.transit_description}
            />
          </FormItem>
        </div>
        <div className="flex justify-end">
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
                    updateTransit(transit);
                    setUpdating(false);
                    reset();
                  }
                }}
              >
                Update Transhipment
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              className="my-10 font-semibold"
              type="button"
              onClick={() => {
                if (validateForm()) {
                  addTransit({ ...transit, id: nanoid() });
                }
              }}
            >
              Add Transit
            </Button>
          )}
        </div>
      </div>
      <div className="py-8">
        <DataTable
          columns={columns}
          data={transits ?? []}
          showHeader={false}
          showActions
          onRowAction={onRowAction}
        />
      </div>
    </div>
  );
};

export default Transits;
