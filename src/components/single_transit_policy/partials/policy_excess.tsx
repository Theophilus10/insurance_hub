import { InputField } from "@app/components/forms/ShadcnFields";
import React from "react";

interface Props {
  policy_excess: string;
  onChange: (value: string) => void;
}
const PolicyExcess = ({ policy_excess, onChange }: Props) => {
  return (
    <div className="py-5">
      <InputField
        label="Policy Excess"
        onChange={(e) => onChange(e.target.value)}
        value={policy_excess}
      />
    </div>
  );
};

export default PolicyExcess;
