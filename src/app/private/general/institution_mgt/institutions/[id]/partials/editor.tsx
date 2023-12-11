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
      className="flex flex-col gap-4 w-full h-full"
    >
      <InputField
        name="name"
        label="Branch Name"
        type="text"
        required
        placeholder="Enter branch name"
      />

      <InputField
        name="identificationCardNumber"
        label="Contact Person"
        type="text"
        placeholder="John Doe"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputField
          name="identificationCardNumber"
          label="Position of Person"
          type="text"
          placeholder="Managing Director"
        />

        <InputField
          name="taxIdentificationNumber"
          label="Region"
          type="text"
          placeholder="Enter Region"
        />
        <InputField
          name="email"
          label="Website"
          type="text"
          placeholder="www.domainname.com"
        />
        <InputField
          name="phone"
          label="Email"
          type="text"
          placeholder="johndoe@email.com"
        />
      </div>
      <InputField
        name="taxIdentificationNumber"
        label="Office Location"
        type="text"
        placeholder="Enter office location"
      />
      <InputField
        name="digitalAddress"
        label="Contact Phone"
        type="text"
        placeholder="233501234567"
        helpText={`Start with country code without ("+"). Example 233501234567 for Ghana(233)`}
      />

      <div className="ml-auto flex gap-4 pt-2">
        <Button label="Submit" variant="primary" type="submit" />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default editor;
