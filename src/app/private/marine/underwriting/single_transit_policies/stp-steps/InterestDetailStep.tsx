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
  PolicyExtensionsType,
} from "@app/components/single_transit_policy/partials/policy_extensions";
import StepperButton from "@app/components/stepper/ui/StepperButton";
import {
  createSingleTransitPolicy,
  patchSingleTransitPolicy,
} from "@app/server/services";
import {
  STEP_QUERY_PARAM_KEY,
  updateOrAppendUrlQueryParam,
} from "@app/components/stepper/StepperComponents";
import { useRouter, useSearchParams } from "next/navigation";

interface InterestAndPolicyExtentionStepProps extends STPolicySchema {
  params?: {
    policy_id: string;
  };
}

export const InterestAndPolicyExtentionDetailStep: React.FC<
  InterestAndPolicyExtentionStepProps
> = ({ form, params, ...rest }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  const { onNextStep, ...withoutOnNextStep } = rest;
  const [selectedTab, setSelectedTab] = useState("Interests / Items");
  const tabsList = ["Interests / Items", "Policy Extension"];
  const addToTable = (value: any, watchValue: string, form: any) =>
    form.setValue(watchValue, [value, ...form?.watch(watchValue)]);

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

  console.log(form.watch("policy_extensions"), "watch");
  const handleOnNextStep = async () => {
    // const isValid = await form.trigger(["transhipments", "transits"]);

    // if (!isValid) {
    //   return;
    // }

    const formData: any = {
      interests: form.getValues("interests"),
      policy_extensions: form.getValues("policy_extensions"),
      current_step_index: 4,
    };

    console.log(formData, "tranship");

    try {
      const response: any = policyId
        ? await patchSingleTransitPolicy(policyId, formData)
        : await createSingleTransitPolicy(formData);

      console.log(response, "sending request");

      const id = response?.data?.policy?.id;
      //   const status = response?.status;

      // Check if the request was successful
      if (response?.success || response?.status === 201) {
        // Move to the next step
        onNextStep();

        if (id) {
          // Update URL with policy ID and next step query parameter
          const urlWithId = updateOrAppendUrlQueryParam(
            window.location.href,
            "policy_id",
            id
          );

          const urlWithNextStep = updateOrAppendUrlQueryParam(
            urlWithId,
            STEP_QUERY_PARAM_KEY,
            "Customer Information"
          );

          // Redirect to the updated URL
          router.push(urlWithNextStep);
        }
      }
    } catch (error: any) {
      console.error(
        error?.message || "An error occurred while processing the request."
      );
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
            addPolicyExtensions={(policyExtensions: PolicyExtensionsType) =>
              addToTable(policyExtensions, "policy_extensions", form)
            }
            policyExtensions={form.watch("policy_extensions")}
            deletePolicyExtension={(id: string) =>
              deleteTableValue(id, "policy_extensions", form)
            }
            updatePolicyExtensions={(policy_extension: PolicyExtensionsType) =>
              updateTableValue(policy_extension, "policy_extensions", form)
            }
          />
        )}
      </div>
      <StepperButton onNextStep={handleOnNextStep} {...withoutOnNextStep} />
    </div>
  );
};
