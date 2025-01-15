"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  create_fire_peril_rate,
  update_fire_peril_rate,
} from "@app/server/services/fire-settings/peril-rating";
import { PerilsType } from "@app/types/policyTypes";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  fire_peril_class_id: 0,
  fire_risk_class_id: 0,
  rate: 0,
  start_date: "",
  end_date: "",
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: any;
  perils: any[];
  riskClass: any[];
}
const schema = z.object({
  fire_risk_class_id: z.number().nonnegative(),
  fire_peril_class_id: z.number().nonnegative(),
  start_date: z.string(),
  end_date: z.string(),
  rate: z.any(),
});
const Editor: React.FC<EditorProps> = ({
  id = 0,
  edit = false,
  isDone,
  data,
  perils = [],
  riskClass = [],
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  useEffect(() => {
    if (data) {
      setFormData({
        fire_risk_class_id: data.fire_risk_class_id,
        fire_peril_class_id: data.fire_peril_class_id,
        start_date: data.start_date,
        end_date: data.end_date,
        rate: data.rate,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<any, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_fire_peril_rate(id, {
            fire_risk_class_id: values.fire_risk_class_id,
            fire_peril_class_id: values.fire_peril_class_id,
            start_date: values.start_date,
            end_date: values.end_date,
            rate: values.rate,
          })
        : await create_fire_peril_rate({
            fire_risk_class_id: values.fire_risk_class_id,
            fire_peril_class_id: values.fire_peril_class_id,
            start_date: values.start_date,
            end_date: values.end_date,
            rate: values.rate,
          });

      if (res.success) {
        showSuccess(
          edit ? "Successfully updated rate" : "Successfully created rate"
        );
        isDone();
      } else {
        showError(res.message || "Failed to perform command");
      }
    } catch (err: any) {
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form
      schema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <div className="grid gap-4">
        <SelectField
          name="fire_peril_class_id"
          label="Select Peril"
          required
          options={perils}
        />
        <SelectField
          name="fire_risk_class_id"
          label="Select Risk Class"
          required
          options={riskClass}
        />
        <InputField name="rate" label="Rate" type="number" />

        <div className="grid grid-cols-2 gap-4">
          <InputField name="start_date" label="Start Date" type="date" />

          <InputField name="end_date" label="End Date" type="date" />
        </div>
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" />
      </div>
    </Form>
  );
};

export default Editor;
