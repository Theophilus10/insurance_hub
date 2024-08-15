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
import InterestItems, {
  InterestType,
} from "@app/components/single_transit_policy/partials/interests_items";
import PolicyExtenxions, {
  PolicyExtenxionsType,
} from "@app/components/single_transit_policy/partials/policy_extensions";
import StepperButton from "@app/components/stepper/ui/StepperButton";

export const InterestAndPolicyExtentionDetailStep: React.FC<STPolicySchema> = ({
  form,
  ...rest
}) => {
  const { onNextStep, ...withoutOnNextStep } = rest;
  const [selectedTab, setSelectedTab] = useState("Interests / Items");
  const tabsList = ["Interests / Items", "Policy Extension"];
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
    const validationResult = await form.trigger([
      "interests",
      "policy_extensions",
    ]);
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

        {selectedTab.toLowerCase() === "interests / items" && (
          <InterestItems
            addInterests={(interests: InterestType) =>
              addToTable(interests, "interests", form)
            }
            interests={form.watch("interests")}
            deleteInterest={(id: string) =>
              deleteTableValue(id, "interests", form)
            }
            updateInterets={(interest: InterestType) =>
              updateTableValue(interest, "interests", form)
            }
          />
        )}
        {selectedTab.toLowerCase() === "policy extension" && (
          <PolicyExtenxions
            addPolicyExtension={(policyExtenxion: PolicyExtenxionsType) =>
              addToTable(policyExtenxion, "policy_extensions", form)
            }
            policyExtensions={form.watch("policy_extensions")}
            deletePolicyExtension={(id: string) =>
              deleteTableValue(id, "policy_extensions", form)
            }
            updatePolicyExtension={(policy_extensions: PolicyExtenxionsType) =>
              updateTableValue(policy_extensions, "policy_extensions", form)
            }
          />
        )}
      </div>
      <StepperButton onNextStep={handleOnNextStep} {...withoutOnNextStep} />
    </div>
  );
};
