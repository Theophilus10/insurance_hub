"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import React, { FC, useState } from "react";
import Transhipment, {
  TranshipmentType,
} from "@app/components/single_transit_policy/partials/transhipment";
import Transits, {
  TransitType,
} from "@app/components/single_transit_policy/partials/transits";
import InterestItems, {
  InterestType,
} from "@app/components/single_transit_policy/partials/interests_items";
import PolicyExtenxions, {
  PolicyExtenxionsType,
} from "@app/components/single_transit_policy/partials/policy_extensions";
import PolicyExcess from "@app/components/single_transit_policy/partials/policy_excess";
import {
  convertDataToSelectObject,
  convertDataToSelectObjectNameAsValue,
} from "@app/helpers/index";
import DocumentUploads from "@app/components/single_transit_policy/partials/document_uploads";
import { STPolicySchema } from "./CustomerDetailStep";

export const TabsStepper: React.FC<STPolicySchema> = ({ form }) => {
  const [selectedTab, setSelectedTab] = useState("transhipment");
  const tabsList = [
    "Transhipment",
    "Transit",
    "Interests / Items",
    "Policy Extension",
    "Document uploads",
  ];

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
            transhipments={form.watch("transhipment")}
            addTranshipments={(transhipment: TranshipmentType) =>
              addToTable(transhipment, "transhipment", form)
            }
            updateTranshipment={(transhipment: TranshipmentType) =>
              updateTableValue(transhipment, "transhipment", form)
            }
            deleteTranshipment={(id: string) =>
              deleteTableValue(id, "transhipment", form)
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

        {selectedTab.toLowerCase() === "document uploads" && (
          <DocumentUploads />
        )}
        {/* <div className="ml-auto mr-0 block  p-5 w-[400px] shadow-md rounded-md ">
          <h3>Policy Summary</h3>

          <div className="space-y-4 py-1 my-3 border-b-2 border-t-2">
            <p className={stylesPolicySummaryItemStyles}>
              <span>Sum Insured:</span>{" "}
              <span>
                {selectedCurrencyCode} {totals.sumInsured}
              </span>
            </p>
            <p className={stylesPolicySummaryItemStyles}>
              <span>Basic Premium:</span>{" "}
              <span>
                {selectedCurrencyCode} {totals.basicPremium}
              </span>
            </p>
            <p className={stylesPolicySummaryItemStyles}>
              <span>Loadings(%):</span> <span>{totalLoading} %</span>
            </p>
            <p className={stylesPolicySummaryItemStyles}>
              <span>Total Loadings:</span>{" "}
              <span>
                {selectedCurrencyCode} {loadingAmount}
              </span>
            </p>
            <p className={stylesPolicySummaryItemStyles}>
              <span>Maintenance fee:</span> <span>3000</span>
            </p>
          </div>
          <p className="flex items-center justify-between">
            <span>Premium Payable:</span>{" "}
            <span>
              {selectedCurrencyCode} {premiumPayable}
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default TabsStepper;
