import React, { useState } from "react";
import Form from "@app/components/forms/Form";
import { object, string } from "zod";
import { Checkbox } from "@app/components/ui/checkbox";
import { Button } from "@app/components/ui/button";
import SelectField from "@app/components/forms/SelectField";
import InputField from "@app/components/forms/InputField";

const schema = object({
  username: string(),
  password: string().min(8),
});

const options = [
  { value: "Ghana Cedis", label: "Ghana Cedis" },
  { value: "Euro", label: "Euro" },
];

const durationOptions = [
  { value: "One year", label: "One year" },
  { value: "Short Period", label: "Short Period" },
  { value: "Prorata", label: "Prorata" },
];

const CoverTypeOptions = [
  { value: "Comprehensive", label: "Comprehensive" },
  { value: "Third Party Fire and Theft", label: "Third Party Fire and Theft" },
  { value: "Third Party", label: "Third Party" },
];

const scheduleTypeOptions = [
  { value: "PRIVATE INDIVIDUAL", label: "PRIVATE INDIVIDUAL" },
  { value: "HIRING CAR", label: "HIRING CAR" },
];
const excessTypeOptions = [
  { value: "Excess is Applicable", label: "Excess is Applicable" },
  { value: "Excess is Bought", label: "Excess is Bought" },
  { value: "Voluntary Excess is Taken", label: "Voluntary Excess is Taken" },
];
const coInsurerOptions = [
  {
    value: "Activa International Insurance",
    label: "Activa International Insurance",
  },
];
const PolicyInfo = () => {
  return (
    <Form schema={schema}>
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <SelectField
            label="Currency"
            name="currency"
            required
            options={options}
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Exchange Rate"
            name="exchange_rate"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <SelectField
            label="Duration"
            name="duration"
            required
            options={durationOptions}
          />
        </div>
        <div className="flex-1">
          <InputField label="Days" name="exchange_rate" disabled={true} />
        </div>
      </div>
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField
            label="Inception Date"
            name="inception_date"
            type="date"
          />
        </div>
        <div className="flex-1">
          <InputField label="Expiry Date" name="expiry_date" disabled={true} />
        </div>
      </div>
      <SelectField
        label="Cover Type"
        name="cover_type"
        required
        options={CoverTypeOptions}
      />
      <SelectField
        label="Scedule Type"
        name="scedule_type"
        required
        options={scheduleTypeOptions}
      />
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField label="Sum Insured" name="sum_insured" type="number" />
        </div>
        <div className="flex-1">
          <InputField label="Rate" name="rate" disabled={true} />
        </div>
      </div>
      <SelectField
        label="Excess"
        name="excess"
        required
        options={excessTypeOptions}
      />
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField label="Excess Rate" name="excess_rate" type="number" />
        </div>
        <div className="flex-1">
          <InputField
            label="Excess Amount "
            name="rate"
            type="number"
            disabled={true}
          />
        </div>
      </div>
      <SelectField
        label="Co-Insurer"
        name="co_insurer"
        required
        options={coInsurerOptions}
      />
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField
            label="Co-Insure Rate (%)"
            name="co__nsure_rate"
            type="number"
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Co Insure Amount"
            name="co_insure_amount"
            type="number"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField label="TPPD Limit" name="tppd_limit" type="number" />
        </div>
        <div className="flex-1">
          <InputField label="TPPD Rate" name="tppd_rate" type="number" />
        </div>
      </div>
    </Form>
  );
};

export default PolicyInfo;
