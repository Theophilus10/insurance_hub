"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@app/components/ui/button";
import DataTable from "@app/components/datatable/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderWithSorting } from "@app/components/datatable/columnHeaders";
import {
  InputField,
  SelectField,
  TextAreaField,
} from "@app/components/forms/ShadcnFields";
import { nanoid } from "nanoid";
import {
  read_cover_types,
  read_interest_rate,
  read_interests,
} from "@app/server/services";
import {
  convertDataToSelectObject,
  convertDataToSelectObjectNameAsValue,
} from "@app/helpers/index";

export type InterestType = {
  cover_type: string | null;
  interest: string | null;
  package_type: string | null;
  rate: number;
  cost: number;
  freight: number;
  markup_rate: number;
  duty_rate: number;
  sum_insured: number;
  markup: number;
  duty_amount: number;
  basic_premium: number;
  item_description: string;
  id: string;
};

type SelectType = {
  label: string;
  value: number | string;
};

const columns: ColumnDef<InterestType>[] = [
  {
    accessorKey: "cover_type",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Cover Type" />;
    },
  },
  {
    accessorKey: "interest",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Interest" />;
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Rate (%)" />;
    },
  },
  {
    accessorKey: "sum_insured",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Sum insured" />;
    },
  },
  {
    accessorKey: "duty_amount",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Duty amount" />;
    },
  },
  {
    accessorKey: "basic_premium",
    header: ({ column }) => {
      return <HeaderWithSorting column={column} label="Basic Premium" />;
    },
  },
];

interface InteresProps {
  interests: InterestType[];
  addInterests: (interest: InterestType) => void;
  updateInterets: (interest: InterestType) => void;
  deleteInterest: (id: string) => void;
}

const packageTypes = [
  { label: "containerized", value: "CONTAINERIZED" },
  { label: "non-containerized", value: "NON-CONTAINERIZED" },
];

const InterestItems = ({
  interests,
  addInterests,
  updateInterets,
  deleteInterest,
}: InteresProps) => {
  const { items: coverTypes, isLoading: coverTypesIsLoading } =
    read_cover_types();
  const { items: interestItems, isLoading: interestsLoading } =
    read_interest_rate();
  const [interest, setInterests] = useState<InterestType>({
    cover_type: "",
    interest: "",
    package_type: "",
    rate: 0,
    cost: 0,
    freight: 0,
    markup_rate: 0,
    duty_rate: 0,
    sum_insured: 0,
    markup: 0,
    duty_amount: 0,
    basic_premium: 0,
    item_description: "",
    id: "",
  });
  const [updating, setUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const reset = () => {
    setInterests({
      cover_type: "",
      interest: "",
      package_type: "",
      rate: 0,
      cost: 0,
      freight: 0,
      markup_rate: 0,
      duty_rate: 0,
      sum_insured: 0,
      markup: 0,
      duty_amount: 0,
      basic_premium: 0,
      item_description: "",
      id: "",
    });
  };

  const cover_type = useMemo(
    () => convertDataToSelectObjectNameAsValue(coverTypes),
    [coverTypes]
  );
  const interestValues = useMemo(
    () => convertDataToSelectObjectNameAsValue(interestItems),
    [interestItems]
  );

  const onRowAction = (action: string, row: any) => {
    switch (action) {
      case "edit":
        setInterests(row);
        setUpdating(true);
        break;
      case "delete":
        deleteInterest(row.id);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Calculate markup amount
    interest.markup =
      (interest.markup_rate / 100) * (interest.cost + interest.freight);

    // Calculate duty amount
    interest.duty_amount =
      (interest.duty_rate / 100) * (interest.cost + interest.freight);

    // Calculate sum insured
    const { cost, freight, markup, duty_amount } = interest;
    interest.sum_insured = cost + freight + markup + duty_amount;
  }, [
    interest.markup_rate,
    interest.duty_rate,
    interest.cost,
    interest.freight,
    interest.duty_amount,
  ]);

  useEffect(() => {
    // Calculate basic premium
    const { sum_insured, rate } = interest;
    interest.basic_premium = sum_insured * (rate / 100);
  }, [interest.rate, interest.sum_insured]);

  const validateInterests = () => {
    const errors = {
      cover_type: "",
      interest: "",
      package_type: "",
      rate: "",
      cost: "",
      freight: "",
      markup_rate: "",
      duty_rate: "",
      sum_insured: "",
      markup: "",
      duty_amount: "",
      basic_premium: "",
      item_description: "",
      id: "",
    };

    // Validate cover_type
    if (typeof interest.cover_type !== "string") {
      errors.cover_type = "Cover type must be a string.";
    }

    // Validate interest
    if (typeof interest.interest !== "string") {
      errors.interest = "Interest must be a string.";
    }

    // Validate package_type
    if (
      typeof interest.package_type !== "string" ||
      interest.package_type.trim() === ""
    ) {
      errors.package_type = "Package type must be a non-empty string.";
    }

    // Validate rate
    if (typeof interest.rate !== "number") {
      errors.rate = "Rate must be a number.";
    }

    // Validate cost
    if (typeof interest.cost !== "number") {
      errors.cost = "Item cost must be a number.";
    }

    // Validate freight
    if (typeof interest.freight !== "number") {
      errors.freight = "Freight amount must be a number.";
    }

    // Validate markup_rate
    if (typeof interest.markup_rate !== "number") {
      errors.markup_rate = "Markup rate must be a number.";
    }

    // Validate duty_rate
    if (typeof interest.duty_rate !== "number") {
      errors.duty_rate = "Duty rate must be a number.";
    }

    // Validate sum_insured
    if (typeof interest.sum_insured !== "number") {
      errors.sum_insured = "Sum insured must be a number.";
    }

    // Validate markup
    if (typeof interest.markup !== "number") {
      errors.markup = "Markup amount must be a number.";
    }

    // Validate duty_amount
    if (typeof interest.duty_amount !== "number") {
      errors.duty_amount = "Duty amount must be a number.";
    }

    // Validate basic_premium
    if (typeof interest.basic_premium !== "number") {
      errors.basic_premium = "Basic premium must be a number.";
    }

    // Validate item_description
    if (typeof interest.item_description !== "string") {
      errors.item_description = "Description must be a string.";
    }

    // Validate id
    if (typeof interest.id !== "string") {
      errors.id = "ID must be a string.";
    }
    setValidationErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Previous rate:", interest);
    console.log("Event object:", e);
    setInterests({
      ...interest,
      rate: +e.target.value,
    });
  };

  // const handleInterestChange = (e: any) => {
  //   if (e) {
  //     setInterests((prev) => {
  //       console.log("Previous state:", prev);
  //       console.log("Event object:", e);
  //       return { ...prev, interest: e.value };
  //     });
  //   }
  // };

  const handleInterestChange = (e: any) => {
    if (e) {
      const selectedInterest = interestItems.find(
        (item: any) => item.name === e.value
      );

      console.log(selectedInterest, "selectedInterest");
      const rateKey =
        interest.package_type === "CONTAINERIZED"
          ? "containerized_rate"
          : "non_containerized_rate";
      const selectedRate = selectedInterest?.rates?.[0]?.[rateKey] || 0;

      setInterests((prev) => ({
        ...prev,
        interest: e.value,
        rate: +selectedRate,
      }));
    }
  };

  useEffect(() => {
    console.log("Current state:", interest);
  }, [interest]);

  return (
    <div className="p-3 2xl:px-10 box-border">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-10  ">
          <SelectField
            label="Cover Type"
            className=" lg:col-span-2"
            onChange={(e) => {
              if (e) {
                setInterests((prev) => {
                  return { ...prev, cover_type: e.value };
                });
              }
            }}
            options={cover_type}
            value={
              cover_type.find(
                (c: SelectType) => c.value === interest.cover_type
              ) || null
            }
            isLoading={coverTypesIsLoading}
          />
          <SelectField
            label="Interest/Item:"
            className="lg:col-span-2 "
            options={interestValues}
            onChange={handleInterestChange}
            value={
              interestValues.find(
                (c: SelectType) => c.value === interest.interest
              ) || null
            }
            isLoading={interestsLoading}
          />
          <SelectField
            label="Package Type:"
            options={packageTypes}
            onChange={(e) => {
              if (e) {
                setInterests((prev) => {
                  const updatedInterest = { ...prev, package_type: e.value };
                  const selectedInterest = interestItems.find(
                    (item: any) => item.name === updatedInterest.interest
                  );

                  const rateKey =
                    updatedInterest.package_type === "CONTAINERIZED"
                      ? "containerized_rate"
                      : "non_containerized_rate";
                  const selectedRate =
                    selectedInterest?.rates?.[0]?.[rateKey] || 0;

                  return { ...updatedInterest, rate: +selectedRate };
                });
              }
            }}
            value={
              packageTypes.find(
                (c: SelectType) => c.value === interest.package_type
              ) || null
            }
            isLoading={interestsLoading}
          />

          <InputField
            label="Rate(%):"
            type="number"
            onChange={handleRateChange}
            value={interest.rate}
          />
          <InputField
            label="Item Cost:"
            type="number"
            className="lg:col-span-2"
            onChange={(e) => {
              setInterests((prev) => {
                return { ...prev, cost: +e.target.value };
              });
            }}
            value={interest.cost}
          />
          <InputField
            label="Fraight Amount:"
            className="lg:col-span-2"
            type="number"
            onChange={(e) => {
              setInterests((prev) => {
                return { ...prev, freight: +e.target.value };
              });
            }}
            value={interest.freight}
          />
          <InputField
            label="Markup Rate(%):"
            type="number"
            onChange={(e) => {
              setInterests((prev) => {
                return { ...prev, markup_rate: +e.target.value };
              });
            }}
            value={interest.markup_rate}
          />
          <InputField
            label="Duty Rate(%):"
            type="number"
            onChange={(e) => {
              setInterests((prev) => {
                return { ...prev, duty_rate: +e.target.value };
              });
            }}
            value={interest.duty_rate}
          />
          <TextAreaField
            label="Item Description:"
            className="lg:col-span-6"
            onChange={(e) => {
              if (e) {
                setInterests((prev) => {
                  return { ...prev, item_description: e.target.value };
                });
              }
            }}
            value={interest.item_description}
          />
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
                  if (validateInterests()) {
                    updateInterets(interest);
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
                if (validateInterests()) {
                  addInterests({ ...interest, id: nanoid() });
                }
              }}
            >
              Add Item
            </Button>
          )}
        </div>
      </div>
      <div className="py-8">
        <DataTable
          columns={columns}
          data={interests ?? []}
          showHeader={false}
          showActions
          onRowAction={onRowAction}
        />
      </div>
    </div>
  );
};

export default InterestItems;
