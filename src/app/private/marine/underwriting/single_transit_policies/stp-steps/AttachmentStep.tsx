import React from "react";
import { STPolicySchema } from "./CustomerDetailStep";
import DocumentUploads from "@app/components/single_transit_policy/partials/document_uploads";

export const AttachmentStep: React.FC<STPolicySchema> = ({ form, ...rest }) => {
  const { onNextStep, ...withoutNextStep } = rest;

  return (
    <div>
      <div className="border-b-[1px] p-10">
        <DocumentUploads />
      </div>
    </div>
  );
};
