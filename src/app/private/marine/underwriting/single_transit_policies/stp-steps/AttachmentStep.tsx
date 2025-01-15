import React, { useEffect, useState } from "react";
import { STPolicySchema } from "./CustomerDetailStep";
import DocumentUploads from "@app/components/single_transit_policy/partials/document_uploads";
import StepperButton from "@app/components/stepper/ui/StepperButton";
import {
  STEP_QUERY_PARAM_KEY,
  updateOrAppendUrlQueryParam,
} from "@app/components/stepper/StepperComponents";
import {
  createSingleTransitPolicy,
  patchSingleTransitPolicy,
  showSingleTransitPolicy,
} from "@app/server/services";
import { useRouter, useSearchParams } from "next/navigation";

export const AttachmentStep: React.FC<STPolicySchema> = ({ form, ...rest }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  const [items, setItems] = useState<any[]>([]);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const { onNextStep, ...withoutNextStep } = rest;
  useEffect(() => {
    const fetchPolicyItems = async () => {
      const response: any = await showSingleTransitPolicy(policyId);
      setItems(response?.data);
    };

    fetchPolicyItems(); // Only runs after the component mounts
  }, [policyId, uploadSuccessful]);

  const handleUploadSuccess = () => {
    setUploadSuccessful((prev) => !prev);
  };
  const handleOnNextStep = async () => {
    // const isValid = await form.trigger(["transhipments", "transits"]);

    // if (!isValid) {
    //   return;
    // }
    const formData: any = new FormData();

    // Append other form fields to FormData
    formData.append("current_step_index", "5");

    try {
      const response: any = await patchSingleTransitPolicy(policyId, formData);

      console.log(response, "sending request");

      const id = response?.data?.policy?.id;

      if (response?.success || response?.status === 201) {
        // Move to the next step
        // onNextStep();

        router.push("/private/marine/reporting/pending_policies");
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
        <DocumentUploads
          uploaded={items}
          handleUploadSuccess={handleUploadSuccess}
        />
        <StepperButton onNextStep={handleOnNextStep} {...withoutNextStep} />
      </div>
    </div>
  );
};
