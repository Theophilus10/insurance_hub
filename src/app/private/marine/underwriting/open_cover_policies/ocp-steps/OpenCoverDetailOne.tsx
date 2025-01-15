import {
  InputFormField,
  TextareaFormField,
} from "@app/components/forms/ShadcnFormFields";
import React from "react";
import { OCPolicySchema } from "./OpenCoverDetailTwo";
import StepperButton from "@app/components/stepper/ui/StepperButton";
import { useRouter, useSearchParams } from "next/navigation";
import {
  STEP_QUERY_PARAM_KEY,
  updateOrAppendUrlQueryParam,
} from "@app/components/stepper/StepperComponents";
import { patchOpenCoverPolicy } from "@app/server/services/policies/marine/open_cover";
import { createOpenCoverPolicy } from "@app/server/services";

interface OpenCoverDetailOneProps extends OCPolicySchema {
  params?: {
    policy_id: string;
  };
}

const OpenCoverDetailOne: React.FC<OpenCoverDetailOneProps> = ({
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
    const isValid = await form.trigger(["inception_date"]);
    if (!isValid) {
      return;
    }
    const formData = {
      inception_date: form.getValues("inception_date"),
      expiry_date: form.getValues("expiry_date"),
      limit_per_shipment: form.getValues("limit_per_shipment"),
      estimated_annual_shipment_value: form.getValues(
        "estimated_annual_shipment_value"
      ),
      declaration: form.getValues("declaration"),
      contracting_clause: form.getValues("contracting_clause"),
      cancellation_clause: form.getValues("cancellation_clause"),
      conveyance: form.getValues("conveyance"),

      current_step_index: 2,
    };

    try {
      const response: any = await patchOpenCoverPolicy(policyId, formData);

      console.log(response, "sending request");

      const id = response?.data?.policy?.id;
      //   const status = response?.status;

      // Check if the request was successful
      if (response?.success) {
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
      <div className="p-10 grid lg:grid-cols-2 gap-8">
        <div className="flex lg:col-span-2 items-center gap-10 md:gap-0 flex-wrap justify-between lg:justify-around">
          <InputFormField
            form={form}
            className="flex flex-col lg:flex-row items-start lg:items-center lg:w-[40%] "
            labelStyle=" lg:w-[40%] 2xl:w-[30%]"
            name="inception_date"
            label="Inception Date:"
            type="date"
          />
          <InputFormField
            form={form}
            className="flex flex-col lg:flex-row items-start lg:items-center lg:w-[40%] "
            labelStyle=" lg:w-[40%] 2xl:w-[30%] "
            name="expiry_date"
            label="Expiry Date:"
            type="date"
          />
        </div>
        <InputFormField
          form={form}
          name="limit_per_shipment"
          label="Limit Per Shipment/Bottom"
          type="number"
        />
        <InputFormField
          form={form}
          name="estimated_annual_shipment_value"
          label="Estimated Annual Shipment Value"
          type="number"
        />
        <TextareaFormField
          form={form}
          name="declaration"
          label="Policy Declaration"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="contracting_clause"
          label="Contracting Clause"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="cancellation_clause"
          label="Cancellation Clause"
          className="lg:col-span-2"
        />
        <TextareaFormField
          form={form}
          name="conveyance"
          label="Conveyance"
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

export default OpenCoverDetailOne;
