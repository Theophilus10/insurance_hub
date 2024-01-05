"use client";
import DateInput from "@app/components/forms/DateField";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import TextAreaField from "@app/components/forms/TextAreaField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import { IRating, create_rating, update_rating } from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  cover_type_id: 0,
  interest_id: 0,
  containerized_rate: "",
  non_containerized_rate: "",
  exclusions: "",
  remarks: "",
  start_date: "",
  end_date: "",
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: IRating;
  coverTypes: any[];
  interests: any[];
}

const schema = z.object({
  cover_type_id: z
    .number({
      invalid_type_error: "Cover Type is required",
      required_error: "Cover Type is required",
    })
    .refine((value) => value !== 0, {
      message: "Cover Type is required",
    }),
  interest_id: z
    .number({
      invalid_type_error: "Interest is required",
      required_error: "Interest is required",
    })
    .refine((value) => value !== 0, {
      message: "Interest is required",
    }),
  containerized_rate: z
    .string()
    .min(1, "Containerized Rate is required")
    .refine((value) => parseFloat(value) !== 0, {
      message: "Containerized Rate is required",
    })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Containerized Rate must be a valid number",
    })
    .transform((value) => parseFloat(value)),
  non_containerized_rate: z
    .string()
    .min(1, "Non-Containerized Rate is required")
    .refine((value) => parseFloat(value) !== 0, {
      message: "Non-Containerized Rate is required",
    })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Non-Containerized Rate must be a valid number",
    })
    .transform((value) => parseFloat(value)),
  exclusions: z
    .string()
    .min(1, "Exclusion is required")
    .min(3, "Enter a valid exclusion"),
  remarks: z
    .string()
    .min(1, "Remarks is required")
    .min(3, "Enter a valid Remarks"),
  start_date: z.string().min(1, "Start Date is required"),
  end_date: z.string().min(1, "End Date is required"),
});

const Editor: React.FC<EditorProps> = ({
  id = 0,
  edit = false,
  isDone,
  data,
  coverTypes = [],
  interests = [],
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormData({
        cover_type_id: data.cover_type.id,
        interest_id: data.interest.id,
        containerized_rate: data.containerized_rate.toString(),
        non_containerized_rate: data.non_containerized_rate.toString(),
        exclusions: data.exclusions,
        remarks: data.remarks,
        start_date: data.start_date,
        end_date: data.end_date,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: any) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_rating(id, values)
        : await create_rating(values);

      if (res.success) {
        showSuccess(
          edit ? "Successfully updated rating" : "Successfully created rating"
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

  function handleChange(values: any) {
    console.log(values);
  }

  return (
    <Form
      schema={schema}
      initialValues={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <div className="flex flex-col gap-4 relative">
        <SelectField
          name="cover_type_id"
          required
          label="Cover Type"
          options={coverTypes}
        />
        <SelectField
          name="interest_id"
          label="Interest"
          required
          options={interests}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="containerized_rate"
            label="Containerized Rate"
            type="number"
            required
          />
          <InputField
            name="non_containerized_rate"
            label="Non-Containerized Rate"
            type="number"
            required
          />
        </div>
        <TextAreaField name="exclusions" label="Exclusions" required rows={3} />
        <TextAreaField name="remarks" label="Remarks" required rows={3} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {/* <DateInput name="start_date" label="Start Date" required />
          <DateInput name="end_date" label="End Date" required /> */}
          <InputField
            name="start_date"
            label="Start Date"
            required
            type="date"
            placeholder="Date..."
          />
          <InputField
            name="end_date"
            label="End Date"
            required
            type="date"
            placeholder="Date..."
          />
        </div>
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
