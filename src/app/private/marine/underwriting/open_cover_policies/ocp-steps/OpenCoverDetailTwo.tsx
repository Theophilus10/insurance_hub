import { TextareaFormField } from "@app/components/forms/ShadcnFormFields";
import {
  Step,
  StepperComponentParam,
} from "@app/components/stepper/stepperTypeDef";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { OpenCoverFormSchema } from "../partial/page";
import { useRouter, useSearchParams } from "next/navigation";
import {
  STEP_QUERY_PARAM_KEY,
  updateOrAppendUrlQueryParam,
} from "@app/components/stepper/StepperComponents";
import {
  CustomerDetailStep,
  InsuranceCompanyOrIntermediaryStep,
} from "../../single_transit_policies/stp-steps";
import OpenCoverDetailOne from "./OpenCoverDetailOne";
import StepperButton from "@app/components/stepper/ui/StepperButton";
import { patchOpenCoverPolicy } from "@app/server/services/policies/marine/open_cover";
import { createOpenCoverPolicy } from "@app/server/services";

export type OCPolicySchema = StepperComponentParam<
  UseFormReturn<z.infer<typeof OpenCoverFormSchema>>
>;

interface OpenCoverDetailStepProps extends OCPolicySchema {
  params?: {
    policy_id: string;
  };
}

const OpenCoverDetailTwo: React.FC<OpenCoverDetailStepProps> = ({
  form,
  params,
  ...rest
}) => {
  const { onNextStep, ...withOutOnNextStep } = rest;
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;

  const handleOnNextStep = async () => {
    // const isValid = await form.trigger(["voyages"]);
    // if (!isValid) {
    //   return;
    // }
    const formData: any = {
      voyages: form.getValues("voyages"),
      conditions: form.getValues("conditions"),
      policies_of_cover: form.getValues("policies_of_cover"),
      interest: form.getValues("interest"),
      basis_of_valuation: form.getValues("basis_of_valuation"),
      rates: form.getValues("rates"),
      deductible: form.getValues("deductible"),

      current_step_index: 3,
    };

    try {
      const response: any = policyId
        ? await patchOpenCoverPolicy(policyId, formData)
        : await createOpenCoverPolicy(formData);

      console.log(response, "sending request");

      const id = response?.data?.policy?.id;
      //   const status = response?.status;

      // Check if the request was successful
      if (response?.success) {
        // Move to the next step
        // onNextStep();

        // if (id) {
        //   // Update URL with policy ID and next step query parameter
        //   const urlWithId = updateOrAppendUrlQueryParam(
        //     window.location.href,
        //     "policy_id",
        //     id
        //   );

        //   const urlWithNextStep = updateOrAppendUrlQueryParam(
        //     urlWithId,
        //     STEP_QUERY_PARAM_KEY,
        //     "Customer Information"
        //   );

        // Redirect to the updated URL
        router.push("/private/marine/underwriting/open_cover_policies");
      }
    } catch (error: any) {
      console.error(
        error?.message || "An error occurred while processing the request."
      );
    }
  };

  return (
    <div>
      <div className="p-10 grid lg:grid-cols-2 gap-8">
        <TextareaFormField
          form={form}
          name="voyages"
          label="Voyages"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="conditions"
          label="Conditions"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="policies_of_cover"
          label="Policies"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="interest"
          label="Interest"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="basis_of_valuation"
          label="Base Of Valuations"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="rates"
          label="Rates"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="deductible"
          label="Dedcuctible"
          className="lg:col-span-2"
        />
      </div>
      <StepperButton
        onNextStep={() => handleOnNextStep()}
        {...withOutOnNextStep}
      />
    </div>
  );
};

export default OpenCoverDetailTwo;
