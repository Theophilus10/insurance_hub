"use client";
import React, { useState } from "react";
import { STPolicySchema } from "./CustomerDetailStep";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import Transhipment, {
  TranshipmentType,
} from "@app/components/single_transit_policy/partials/transhipment";
import Transits, {
  TransitType,
} from "@app/components/single_transit_policy/partials/transits";
import StepperButton from "@app/components/stepper/ui/StepperButton";

// <STPolicySchema>: This part is a TypeScript type annotation.
// It specifies the shape of the props that the TabsStepper component will receive.

export const TranshipmentAndTransitStep: React.FC<STPolicySchema> = ({
  form,
  ...rest
}) => {
  const { onNextStep, ...withoutOnNextStep } = rest;
  const [selectedTab, setSelectedTab] = useState("transhipment");
  const tabsList = ["Transhipment", "Transit"];

  const addToTable = (value: any, watchValue: string, form: any) =>
    form.setValue(watchValue, [value, ...form.watch(watchValue)]);

  const updateTableValue = (value: any, watchValue: string, form: any) => {
    const withoutValue = form
      .watch(watchValue)
      .filter((t: any) => t.id !== value.id);

    form.setValue(watchValue, [value, ...withoutValue]);
  };

  const deleteTableValue = (id: string, watchValue: any, form: any) => {
    const filteredValues = form
      .watch(watchValue)
      .filter((t: any) => t.id !== id);
    form.setValue(watchValue, filteredValues);
  };

  const handleOnNextStep = async () => {
    const validationResult = await form.trigger(["transhipment", "transits"]);
    if (validationResult) {
      onNextStep();
    }
  };
  return (
    <div>
      <div className="border-b-[1px] p-10">
        <div className="lg:flex items-center hidden  gap-1  ">
          {tabsList.map((tab) => (
            <button
              type="button"
              className={`${
                tab.toLowerCase() === selectedTab.toLowerCase() &&
                "bg-blue-900 font-medium text-white"
              } px-4 py-2 rounded-md text-center`}
              key={tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <Select onValueChange={(e) => setSelectedTab(e)}>
          <SelectTrigger className="w-[180px] lg:hidden">
            <SelectValue placeholder="Select a tab" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tabsList.map((tab) => (
                <SelectItem key={tab} value={tab}>
                  {tab}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedTab.toLowerCase() === "transhipment" && (
          <Transhipment
            transhipments={form.watch("transhipments") || []}
            addTranshipment={(transhipment: TranshipmentType) =>
              addToTable(transhipment, "transhipments", form)
            }
            updateTranshipment={(transhipment: TranshipmentType) =>
              updateTableValue(transhipment, "transhipments", form)
            }
            deleteTranshipment={(id: string) =>
              deleteTableValue(id, "transhipments", form)
            }
          />
        )}
        {selectedTab.toLowerCase() === "transit" && (
          <Transits
            transits={form.watch("transits") || []}
            addTransit={(transit: TransitType) =>
              addToTable(transit, "transits", form)
            }
            updateTransit={(transit: TransitType) =>
              updateTableValue(transit, "transits", form)
            }
            deleteTransit={(id: string) =>
              deleteTableValue(id, "transits", form)
            }
          />
        )}
      </div>
      <StepperButton onNextStep={handleOnNextStep} {...withoutOnNextStep} />
    </div>
  );
};
