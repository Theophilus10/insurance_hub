"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import { IPort, create_port, update_port } from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  name: "",
  code: "",
  country_id: 0,
  shipping_type_id: 0,
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: IPort;
  shippingTypes: any[];
  countries: any[];
}

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  code: z.string().min(1, "Code is required"),
  country_id: z
    .number({
      invalid_type_error: "Country is required",
      required_error: "Country is required",
    })
    .refine((value) => value !== 0, {
      message: "Country is required",
    }),
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
  edit = false,
  isDone,
  data,
  shippingTypes = [],
  countries = [],
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        code: data.code,
        country_id: data.country.id,
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
        ? await update_port(id, {
            name: values.name,
            code: values.code,
            shipping_type_id: values.shipping_type_id,
            country_id: values.country_id,
          })
        : await create_port({
            name: values.name,
            code: values.code,
            shipping_type_id: values.shipping_type_id,
            country_id: values.country_id,
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
      className="flex flex-col gap-6 w-full h-full px-2"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6">
        <SelectField
          name="country_id"
          label="Select Country"
          options={countries}
          required
        />
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
