"use client";
import {
  SelectFormField,
  SelectFormFieldWithOnChange,
} from "@app/components/forms/ShadcnFormFields";
import { convertDataToSelectObject } from "@app/helpers";
import {
  read_countries,
  read_institutions,
  read_branches,
  read_institution_types,
  read_shipping_types,
  read_banks,
  read_ports,
  read_carriers,
  read_currencies,
  IPort,
  IBranch,
  IInstitution,
  read_customer,
  find_customer,
  CustomerParams,
  CustomerDTO,
  ICustomer,
  BranchDTO,
  createSingleTransitPolicy,
  patchSingleTransitPolicy,
  showSingleTransitPolicy,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import { STPolicySchema } from "./CustomerDetailStep";
import { useSession } from "next-auth/react";
import { StepperComponentParam } from "@app/components/stepper/stepperTypeDef";
import StepperButton from "@app/components/stepper/ui/StepperButton";
import { updateOrAppendUrlQueryParam } from "@app/components/stepper/StepperComponents";
import { useRouter, useSearchParams } from "next/navigation";
import { STEP_QUERY_PARAM_KEY } from "@app/components/stepper/StepperComponents";

interface InsuranceCompanyOrIntermediaryStepProps extends STPolicySchema {
  params?: {
    policy_id: string;
  };
}

export const InsuranceCompanyOrIntermediaryStep: React.FC<
  InsuranceCompanyOrIntermediaryStepProps
> = ({ form, params, ...rest }) => {
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  const [branches, setBranches] = useState([]);
  const [intermediaryNames, setIntermediaryNames] = useState([]);
  const [intermediaryBranches, setIntermediaryBranches] = useState([]);

  const { data: session } = useSession();
  const { items, isLoading } = read_institutions();
  const { items: institutionTypes } = read_institution_types();
  const { items: branchesItems, isLoading: branchesLoading } = read_branches();
  const { items: shippingTypes } = read_shipping_types();
  const { items: countries } = read_countries();
  const { items: banks } = read_banks();
  const { items: ports } = read_ports();
  const { items: carriers } = read_carriers();
  const { items: currencies } = read_currencies();
  const { onNextStep, ...withOutOnNextStep } = rest;
  const router = useRouter();

  useEffect(() => {
    if (branchesItems && !branchesLoading) {
      const newBranches = branchesItems.filter(
        (x: IBranch) => x.institution.id === form.watch("institution_id")
      );
      setBranches(newBranches);
    }
  }, [form.watch("institution_id")]);

  useEffect(() => {
    if (branchesItems && !branchesLoading) {
      const newBranches = branchesItems.filter(
        (x: IBranch) => x.institution.id === form.watch("intermediary_id")
      );
      setIntermediaryBranches(newBranches);
    }
  }, [form.watch("intermediary_id")]);

  useEffect(() => {
    if (items && !isLoading) {
      const intermediaryNameValues = items.filter(
        (x: IInstitution) =>
          x["institution_type"]?.id === form.watch("intermediary_type_id")
      );
      setIntermediaryNames(intermediaryNameValues);
    }
  }, [form.watch("intermediary_type_id")]);

  useEffect(() => {
    if (form.watch("distribution_channel") === "direct") {
      form.setValue("intermediary_type_id", null);
      form.setValue("intermediary_id", null);
      form.setValue("intermediary_branch_id", null);
    }
  }, [form.watch("distribution_channel")]);
  const filteredInstitution = items?.filter(
    (item: any) => item?.institution_type?.name === "Insurance Company"
  );

  useEffect(() => {
    if (session?.user?.user?.institution_type?.name == "Insurance Company") {
      const institutionOption = {
        label: session?.user?.user?.institution?.name,
        value: session?.user?.user?.institution?.id,
      };
      const branchOption = {
        label: session?.user?.user?.branch?.name,
        value: session?.user?.user?.branch?.id,
      };
      console.log(institutionOption, "option");
      form.setValue("institution_id", institutionOption.value);
      form.setValue("branch_id", branchOption.value);
    }
  }, [session, form]);

  const distributionChannel = [
    { value: "indirect", label: "INDIRECT" },
    { value: "direct", label: "DIRECT" },
  ];

  //   const handleOnNextStep = async () => {
  //     const validationResult = await form.trigger([
  //       "institution_id",
  //       "branch_id",
  //     ]);

  //     if (validationResult) {
  //       const formData = {
  //         institution_id: form.getValues("institution_id"),
  //         branch_id: form.getValues("branch_id"),
  //         intermediary_type_id: form.getValues("intermediary_type_id"),
  //         intermediary_id: form.getValues("intermediary_id"),
  //         intermediary_branch_id: form.getValues("intermediary_branch_id"),
  //         distribution_channel: form.getValues("distribution_channel"),
  //       };

  //       try {
  //         let response;

  //         if (policyId) {
  //           response = await patchSingleTransitPolicy(policyId, formData);
  //         } else {
  //           response = await createSingleTransitPolicy(formData);
  //         }

  //         console.log(response, "sending request");

  //         const id = response?.data?.policy?.id;
  //         const status = response?.status;

  //         if (status === 201) {
  //           onNextStep();
  //         }

  //         if (status === 201 && id) {
  //           const urlWithId = updateOrAppendUrlQueryParam(
  //             window.location.href,
  //             "policy_id",
  //             id
  //           );

  //           const urlWithNextStep = updateOrAppendUrlQueryParam(
  //             urlWithId,
  //             STEP_QUERY_PARAM_KEY,
  //             "Customer Information"
  //           );

  //           router.push(urlWithNextStep);
  //         }
  //       } catch (error) {
  //         console.error(
  //           error?.message || "An error occurred while processing the request."
  //         );
  //       }
  //     }
  //   };

  const handleOnNextStep = async () => {
    const isValid = await form.trigger(["institution_id", "branch_id"]);

    if (!isValid) {
      return;
    }

    const formData = {
      institution_id: form.getValues("institution_id"),
      branch_id: form.getValues("branch_id"),
      intermediary_type_id: form.getValues("intermediary_type_id"),
      intermediary_id: form.getValues("intermediary_id"),
      intermediary_branch_id: form.getValues("intermediary_branch_id"),
      distribution_channel: form.getValues("distribution_channel"),
    };

    try {
      const response = policyId
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
    } catch (error) {
      console.error(
        error?.message || "An error occurred while processing the request."
      );
    }
  };

  useEffect(() => {
    const fetchDefaultValues = async () => {
      if (!policyId) return;

      try {
        const response = await showSingleTransitPolicy(policyId);
        if (response?.data) {
          form.reset(response?.data);
        } else {
          console.error("Unexpected response format", response);
        }
      } catch (error) {
        console.error("Error fetching policy data", error);
      }
    };
    fetchDefaultValues();
  }, [form.reset, policyId, showSingleTransitPolicy]);

  return (
    <div>
      <div className="p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8   ">
        <SelectFormFieldWithOnChange
          form={form}
          name="institution_id"
          label="Insurance Company"
          options={convertDataToSelectObject(filteredInstitution, "name", "id")}
          isLoading={isLoading}
          placeholder="Select an insurance company"
          // onChange={(value) => {
          //   console.log("Selected value:", value);
          // }}
          disabled={
            session?.user?.user?.institution_type?.name === "Insurance Company"
          }
        />
        <SelectFormFieldWithOnChange
          form={form}
          name="branch_id"
          label="Branch Office"
          options={convertDataToSelectObject(branches, "name", "id")}
          placeholder="Select a branch office"
          // onChange={(value) => {
          //   console.log("Selected value:", value);
          // }}
          disabled={
            session?.user?.user?.institution_type?.name === "Insurance Company"
          }
        />
      </div>
      <div className="p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <SelectFormField
          form={form}
          name="distribution_channel"
          label="Distribution Channel"
          options={distributionChannel}
          placeholder="Select a distribution channel"
        />
        <SelectFormField
          form={form}
          name="intermediary_type_id"
          label="Intermediary Type:"
          options={convertDataToSelectObject(institutionTypes, "name", "id")}
          disabled={form.watch("distribution_channel") === "direct"}
          placeholder="Select an intermediary type"
        />
        <SelectFormField
          form={form}
          name="intermediary_id"
          label="Intermediary Name:"
          options={convertDataToSelectObject(intermediaryNames, "name", "id")}
          disabled={form.watch("distribution_channel") === "direct"}
          placeholder="Select an intermediary name"
        />
        <SelectFormField
          form={form}
          name="intermediary_branch_id"
          label="Branch Office of Intermediary:"
          options={convertDataToSelectObject(
            intermediaryBranches,
            "name",
            "id"
          )}
          disabled={form.watch("distribution_channel") === "direct"}
          placeholder="Select a branch office"
        />
      </div>
      <StepperButton
        onNextStep={() => handleOnNextStep()}
        {...withOutOnNextStep}
      />
    </div>
  );
};

export default InsuranceCompanyOrIntermediaryStep;
