"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import TextAreaField from "@app/components/forms/TextAreaField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { IRiskClass } from "./columns";
import { showError, showSuccess } from "@app/lib/utils";
import {
  create_fire_risk_class,
  RiskClassType,
  update_fire_risk_class,
} from "@app/server/services/fire-settings/risk-classes";

const initialValues = {
  code: "",
  description: "",
  min_amount: 0,
  max_amount: 0,
  fire_rate: "",
  collapse_rate: "",
  public_liability_rate: "",
  start_date: "",
  end_date: "",
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: RiskClassType;
}

const schema = z.object({
  code: z.string().min(1, "Code is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(3, "Enter a valid Description"),
  min_amount: z.any(),
  max_amount: z.any(),
  fire_rate: z.string(),
  collapse_rate: z.string(),
  public_liability_rate: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

const Editor: React.FC<EditorProps> = ({
  id = 0,
  edit = false,
  isDone,
  data,
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  console.log(formData, "formData");

  useEffect(() => {
    if (data) {
      setFormData({
        code: data.code,
        description: data.description,
        min_amount: data.min_amount,
        max_amount: data.max_amount,
        fire_rate: data.fire_rate,
        collapse_rate: data.collapse_rate,
        public_liability_rate: data.public_liability_rate,
        start_date: data.start_date,
        end_date: data.end_date,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_fire_risk_class(id, {
            code: values.code,
            description: values.description,
            min_amount: values.min_amount,
            max_amount: values.max_amount,
            fire_rate: values.fire_rate,
            collapse_rate: values.collapse_rate,
            public_liability_rate: values.public_liability_rate,
            start_date: values.start_date,
            end_date: values.end_date,
          })
        : await create_fire_risk_class({
            code: values.code,
            description: values.description,
            min_amount: values.min_amount,
            max_amount: values.max_amount,
            fire_rate: values.fire_rate,
            collapse_rate: values.collapse_rate,
            public_liability_rate: values.public_liability_rate,
            start_date: values.start_date,
            end_date: values.end_date,
          });

      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated risk class"
            : "Successfully created risk class"
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
      initialValues={formData}
      className="flex flex-col gap-6 w-full h-full px-2"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-4">
        <span className="col-span-2">
          <InputField name="code" label="Code" type="text" />
          <TextAreaField
            name="description"
            label="Description"
            rows={2}
            className=""
          />
        </span>
        <InputField name="min_amount" label="Minimum Amount" type="number" />
        <InputField name="max_amount" label="maximum Amount" type="number" />
        <span className="col-span-2">
          <InputField
            name="fire_rate"
            label="Fire Rate"
            type="text"
            className=""
          />
        </span>
        <InputField
          name="public_liability_rate"
          label="Public Liability Rate"
          type="text"
        />
        <InputField name="collapse_rate" label="Collapse Rate" type="text" />
        <InputField name="start_date" label="Start Date" type="date" />
        <InputField name="end_date" label="End Date" type="date" />
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
