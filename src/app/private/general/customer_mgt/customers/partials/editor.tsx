"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
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
  //   .min(1, "Name is ")
  //   .min(3, "Enter a valid name")
  //   .max(7, "Name too long"),
  // email: z.string().min(1, "Email is ").email(),
  // gender: z.string().min(1, "Gender is "),
  // dob: z.string().min(1, "Date of Birth is "),
});

const editor = () => {
  return (
    <Form
      schema={schema}
      initialValues={initialValues}
      className="flex flex-col gap-4 w-full h-full px-2"
    >
      <div className="grid grid-cols-2 gap-4">
        <InputField name="name" label="Name" type="text" />

        <SelectField
          name="customerType"
          label="Customer Type"
          //
          options={[]}
        />
        <SelectField
          name="customerCategory"
          label="Customer Category"
          //
          options={[]}
        />
        <SelectField
          name="identificationType"
          label="Identification Type"
          //
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
        <SelectField name="occupation" label="Occupation" options={[]} />
        <InputField name="email" label="Email" type="text" />
        <InputField name="phone" label="Phone Number" type="text" />
        <InputField name="digitalAddress" label="Digital Address" type="text" />
        <InputField name="postalAddress" label="Postal Address" type="text" />
        <InputField
          name="residential Address"
          label="Residential Address"
          type="text"
        />
        <SelectField name="occupation" label="Occupation" options={[]} />
        <InputField name="email" label="Email" type="text" />
        <InputField name="phone" label="Phone Number" type="text" />
        <InputField name="digitalAddress" label="Digital Address" type="text" />
        <InputField name="postalAddress" label="Postal Address" type="text" />
        <InputField
          name="residential Address"
          label="Residential Address"
          type="text"
        />
        <SelectField name="occupation" label="Occupation" options={[]} />
        <InputField name="email" label="Email" type="text" />
        <InputField name="phone" label="Phone Number" type="text" />
        <InputField name="digitalAddress" label="Digital Address" type="text" />
        <InputField name="postalAddress" label="Postal Address" type="text" />
        <InputField
          name="residential Address"
          label="Residential Address"
          type="text"
        />
        <SelectField name="occupation" label="Occupation" options={[]} />
        <InputField name="email" label="Email" type="text" />
        <InputField name="phone" label="Phone Number" type="text" />
        <InputField name="digitalAddress" label="Digital Address" type="text" />
        <InputField name="postalAddress" label="Postal Address" type="text" />
        <InputField
          name="residential Address"
          label="Residential Address"
          type="text"
        />
        <SelectField name="occupation" label="Occupation" options={[]} />
        <InputField name="email" label="Email" type="text" />
        <InputField name="phone" label="Phone Number" type="text" />
        <InputField name="digitalAddress" label="Digital Address" type="text" />
        <InputField name="postalAddress" label="Postal Address" type="text" />
        <InputField
          name="residential Address"
          label="Residential Address"
          type="text"
        />
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" />
        <Button label="Reset" variant="outline" />
      </div>
    </Form>
  );
};

export default editor;
