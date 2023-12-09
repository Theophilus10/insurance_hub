"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import React from "react";
import * as z from "zod";

const initialValues = {
  customerType: "",
  name: "",
  customerCategory: "",
  identificationType: "",
  identificationCardNumber: "",
  taxIdentificationNumber: "",
  occupation: "",
  email: "",
  phone: "",
  digitalAddress: "",
  postalAddress: "",
  residentialAddress: "",
};
const schema = z.object({
  // name: z
  //   .string()
  //   .min(1, "Name is required")
  //   .min(3, "Enter a valid name")
  //   .max(7, "Name too long"),
  // email: z.string().min(1, "Email is required").email(),
  // gender: z.string().min(1, "Gender is required"),
  // dob: z.string().min(1, "Date of Birth is required"),
});

const editor = () => {
  return (
    <Form
      schema={schema}
      initialValues={initialValues}
      className="flex flex-col gap-2 w-full h-full"
    >
      <InputField name="name" label="Name" type="text" />

      <SelectField
        name="customerType"
        label="Customer Type"
        required
        options={[]}
      />
      <SelectField
        name="customerCategory"
        label="Customer Category"
        required
        options={[]}
      />
      <SelectField
        name="identificationType"
        label="Identification Type"
        required
        options={[]}
      />
      <InputField
        name="identificationCardNumber"
        label="Identification Card Number"
        type="text"
      />

      <InputField
        name="taxIdentificationNumber"
        label="Tax Identification Number"
        type="text"
      />
      <SelectField name="occupation" label="Occupation" required options={[]} />
      <InputField name="email" label="Email" type="text" />
      <InputField name="phone" label="Phone Number" type="text" />
      <InputField name="digitalAddress" label="Digital Address" type="text" />
      <InputField name="postalAddress" label="Postal Address" type="text" />
      <InputField
        name="residential Address"
        label="Residential Address"
        type="text"
      />
    </Form>
  );
};

export default editor;
