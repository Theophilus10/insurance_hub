"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import { ICarrier, create_carrier, update_carrier } from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  name: "",
  code: "",
  shipping_type_id: 0,
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: ICarrier;
  shippingTypes: any[];
}

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  code: z.string().min(1, "Code is required"),
  shipping_type_id: z
    .number({
      invalid_type_error: "Shipping type is required",
      required_error: "Shipping type is required",
    })
    .refine((value) => value !== 0, {
      message: "Shipping type is required",
    }),
});

const Editor: React.FC<EditorProps> = ({
  id = 0,
  isDone,
  edit = false,
  data,
  shippingTypes = [],
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        code: data.code,
        shipping_type_id: data.shipping_type.id,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_carrier(id, {
            name: values.name,
            code: values.code,
            shipping_type_id: values.shipping_type_id,
          })
        : await create_carrier({
            name: values.name,
            code: values.code,
            shipping_type_id: values.shipping_type_id,
          });

      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated cover type"
            : "Successfully created a cover type"
        );
        isDone();
      } else {
        showError(res.message || "Failed to perform command");
      }
    } catch (err: any) {
      console.log("here", err);
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form
      schema={schema}
      initialValues={formData}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <div className="grid gap-6">
        <SelectField
          name="shipping_type_id"
          label="Select Shipping Type"
          options={shippingTypes}
          required
        />
        <InputField name="code" label="Code" type="text" required />
        <InputField name="name" label="Name" type="text" required />
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
