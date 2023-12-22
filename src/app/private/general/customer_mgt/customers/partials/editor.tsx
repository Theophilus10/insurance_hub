"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  CustomerDTO,
  ICustomer,
  create_customer,
  update_customer,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

interface IEditor {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: ICustomer;
  customerType: any[];
  customerCategory: any[];
  identificationType: any[];
  occupation: any[];
}

const initialValues = {
  name: "",
  identification_type_id: 0,
  identification_number: "",
  tax_id_number: "",
  customer_type_id: 0,
  customer_category_id: 0,
  email: "",
  phone: "",
  digital_address: "",
  postal_address: "",
  residential_address: "",
  occupation_id: 0,
};
const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  identification_type_id: z.number().optional(),
  identification_number: z.string().optional(),
  tax_id_number: z.string().optional(),
  customer_type_id: z
    .number({
      required_error: "Customer Type is required",
      invalid_type_error: "Customer Type is required",
    })
    .refine((value) => value !== 0, {
      message: "Customer Type is required",
    }),
  customer_category_id: z
    .number({
      required_error: "Customer Category is required",
      invalid_type_error: "Customer Category is required",
    })
    .refine((value) => value !== 0, {
      message: "Customer Category is required",
    }),
  email: z.string().email(),
  phone: z
    .string()
    .min(1, "Phone Number is required")
    .min(10, "Enter a valid Phone Number"),
  digital_address: z.string().min(1, "Digital Address is required"),
  postal_address: z.string().min(1, "Postal Address is required"),
  residential_address: z.string().min(1, "Residential Address is required"),
  occupation_id: z
    .number({
      required_error: "Occupation is required",
      invalid_type_error: "Occupation is required",
    })
    .refine((value) => value !== 0, {
      message: "Occupation is required",
    }),
});

const Editor: React.FC<IEditor> = ({
  id = 0,
  edit = false,
  isDone,
  data,
  customerCategory = [],
  identificationType = [],
  customerType = [],
  occupation = [],
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        identification_type_id: data.identification_type.id,
        identification_number: data.identification_number,
        tax_id_number: data.tax_id_number,
        customer_type_id: data.customer_type.id,
        customer_category_id: data.customer_category.id,
        email: data.email,
        phone: data.phone,
        digital_address: data.digital_address,
        postal_address: data.postal_address,
        residential_address: data.residential_address,
        occupation_id: data.occupation.id,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const d = values as CustomerDTO;
      const res = edit
        ? await update_customer(id, d)
        : await create_customer(d);
      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated customer"
            : "Successfully created customer"
        );
        isDone();
      } else {
        showError(res.message || "Failed to perform command");
      }
    } catch (err: any) {
      console.log(err);
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Form
      schema={schema}
      initialValues={formData}
      className="flex flex-col gap-4 w-full h-full px-2"
      onSubmit={handleSubmit}
    >
      <InputField name="name" label="Name" type="text" required />
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="customer_type_id"
          label="Customer Type"
          required
          options={customerType}
        />
        <SelectField
          name="customer_category_id"
          label="Customer Category"
          required
          options={customerCategory}
        />
        <SelectField
          name="identification_type_id"
          label="Identification Type"
          //
          options={identificationType}
        />
        <InputField
          name="identification_number"
          label="Identification Card Number"
          type="text"
        />

        <InputField
          name="tax_id_number"
          label="Tax Identification Number"
          type="text"
        />
        <SelectField
          name="occupation_id"
          required
          label="Occupation"
          options={occupation}
        />
        <InputField name="email" label="Email" type="text" required />
        <InputField name="phone" label="Phone Number" type="text" required />
        <InputField
          name="digital_address"
          label="Digital Address"
          type="text"
          required
        />
        <InputField
          name="postal_address"
          label="Postal Address"
          type="text"
          required
        />
      </div>
      <InputField
        name="residential_address"
        label="Residential Address"
        type="text"
        required
      />
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" busy={busy} type="submit" />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
